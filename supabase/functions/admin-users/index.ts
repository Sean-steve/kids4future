import { createAdminClient, json } from "../_shared/server.ts";

const roles = new Set(["admin", "content_editor", "safeguarding_reviewer", "finance_reviewer", "viewer"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  if (req.method !== "POST") return json(405, { ok: false, error: "method_not_allowed" });

  const authorization = req.headers.get("authorization") ?? "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (!token) return json(401, { ok: false, error: "unauthorized" });

  const admin = createAdminClient();
  const { data: userResult, error: userError } = await admin.auth.getUser(token);
  const actor = userResult.user;
  if (userError || !actor) return json(401, { ok: false, error: "unauthorized" });

  const { data: actorProfile } = await admin.from("admin_profiles").select("role,is_active").eq("user_id", actor.id).maybeSingle();
  if (!actorProfile?.is_active || actorProfile.role !== "admin") return json(403, { ok: false, error: "forbidden" });

  let payload: Record<string, unknown> = {};
  try { payload = await req.json(); } catch { return json(400, { ok: false, error: "invalid_json" }); }
  const action = typeof payload.action === "string" ? payload.action : "";

  if (action === "list") {
    const { data: userList, error: listError } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    if (listError) return json(503, { ok: false, error: "user_list_failed" });
    const { data: profiles, error: profileError } = await admin.from("admin_profiles").select("user_id,role,display_name,is_active,created_at,updated_at");
    if (profileError) return json(503, { ok: false, error: "profile_list_failed" });
    const profileMap = new Map((profiles ?? []).map((profile) => [profile.user_id, profile]));
    const users = userList.users
      .filter((user) => profileMap.has(user.id))
      .map((user) => ({
        id: user.id,
        email: user.email ?? null,
        last_sign_in_at: user.last_sign_in_at ?? null,
        ...profileMap.get(user.id),
      }));
    return json(200, { ok: true, users });
  }

  if (action === "invite") {
    const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
    const role = typeof payload.role === "string" ? payload.role : "";
    const displayName = typeof payload.displayName === "string" ? payload.displayName.trim().slice(0, 160) : "";
    if (!emailPattern.test(email) || !roles.has(role)) return json(400, { ok: false, error: "invalid_invite" });

    const { data: inviteResult, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
      data: displayName ? { display_name: displayName } : undefined,
    });
    const invitedUser = inviteResult.user;
    if (inviteError || !invitedUser) return json(400, { ok: false, error: "invite_failed", detail: inviteError?.message ?? "unknown" });

    const { error: upsertError } = await admin.from("admin_profiles").upsert({
      user_id: invitedUser.id,
      role,
      display_name: displayName || null,
      is_active: true,
    });
    if (upsertError) return json(503, { ok: false, error: "profile_write_failed" });

    await admin.from("audit_events").insert({
      actor_id: actor.id,
      action: "staff.invite",
      resource_type: "admin_profile",
      resource_id: invitedUser.id,
      summary: { role },
    });
    return json(200, { ok: true, userId: invitedUser.id });
  }

  if (action === "update") {
    const userId = typeof payload.userId === "string" ? payload.userId : "";
    const role = typeof payload.role === "string" ? payload.role : "";
    const displayName = typeof payload.displayName === "string" ? payload.displayName.trim().slice(0, 160) : "";
    const isActive = typeof payload.isActive === "boolean" ? payload.isActive : true;
    if (!userId || !roles.has(role)) return json(400, { ok: false, error: "invalid_update" });
    if (userId === actor.id && (!isActive || role !== "admin")) return json(409, { ok: false, error: "cannot_remove_own_admin_access" });

    const { error: updateError } = await admin.from("admin_profiles").update({
      role,
      display_name: displayName || null,
      is_active: isActive,
    }).eq("user_id", userId);
    if (updateError) return json(503, { ok: false, error: "profile_update_failed" });

    await admin.from("audit_events").insert({
      actor_id: actor.id,
      action: "staff.update",
      resource_type: "admin_profile",
      resource_id: userId,
      summary: { role, is_active: isActive },
    });
    return json(200, { ok: true });
  }

  return json(400, { ok: false, error: "unsupported_action" });
});
