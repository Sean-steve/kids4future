import { createAdminClient, json, sha256 } from "../_shared/server.ts";
import { queryStkPush } from "../_shared/mpesa.ts";

const allowedRoles = new Set(["admin", "finance_reviewer"]);

Deno.serve(async (req) => {
  if (req.method !== "POST") return json(405, { ok: false, error: "method_not_allowed" });

  const authorization = req.headers.get("authorization") ?? "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (!token) return json(401, { ok: false, error: "unauthorized" });

  const admin = createAdminClient();
  const { data: userResult, error: userError } = await admin.auth.getUser(token);
  const user = userResult.user;
  if (userError || !user) return json(401, { ok: false, error: "unauthorized" });

  const { data: profile } = await admin
    .from("admin_profiles")
    .select("role,is_active")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!profile?.is_active || !allowedRoles.has(profile.role)) return json(403, { ok: false, error: "forbidden" });

  let payload: Record<string, unknown> = {};
  try { payload = await req.json(); } catch { /* optional body */ }
  const reference = typeof payload.reference === "string" ? payload.reference.trim() : "";

  let query = admin
    .from("donations")
    .select("id,public_reference,checkout_reference,provider_reference,status,amount,currency,created_at")
    .eq("provider", "mpesa")
    .in("status", ["pending", "requires_review"])
    .not("checkout_reference", "is", null)
    .order("created_at", { ascending: true })
    .limit(25);
  if (reference) query = query.eq("public_reference", reference);

  const { data: donations, error: donationError } = await query;
  if (donationError) return json(503, { ok: false, error: "service_unavailable" });

  const startedAt = new Date();
  const { data: run, error: runError } = await admin.from("reconciliation_runs").insert({
    provider: "mpesa",
    window_start: new Date(startedAt.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    window_end: startedAt.toISOString(),
    status: "running",
    started_by: user.id,
  }).select("id").single();
  if (runError || !run) return json(503, { ok: false, error: "service_unavailable" });

  const results: Array<{ reference: string; observed: string; resolution: string }> = [];

  for (const donation of donations ?? []) {
    const checkoutReference = String(donation.checkout_reference ?? "");
    let observed = "unknown";
    let resolution = "unresolved";
    let note = "";

    try {
      const response = await queryStkPush(checkoutReference);
      const resultCode = Number(response.body.ResultCode);
      const responseCode = String(response.body.ResponseCode ?? "");
      const eventKey = `stk-query:${checkoutReference}:${Date.now()}`;

      await admin.from("payment_events").insert({
        provider: "mpesa",
        provider_event_key: eventKey,
        event_type: "stk_query",
        verified: response.ok,
        payload_checksum: await sha256(JSON.stringify(response.body)),
        payload: response.body,
        processing_status: "processed",
        donation_id: donation.id,
        processed_at: new Date().toISOString(),
      });

      if (response.ok && (resultCode === 0 || responseCode === "0" && resultCode === 0)) {
        observed = "paid";
        if (donation.provider_reference) {
          await admin.from("donations").update({ status: "paid", updated_at: new Date().toISOString() }).eq("id", donation.id);
          await admin.rpc("issue_receipt_for_donation", { target_donation_id: donation.id });
          resolution = "matched";
        } else {
          await admin.from("donations").update({ status: "requires_review", updated_at: new Date().toISOString() }).eq("id", donation.id);
          resolution = "receipt_reference_missing";
          note = "STK query indicates success, but no M-Pesa receipt number was captured. Finance review is required before final reconciliation.";
        }
      } else if (response.ok && Number.isFinite(resultCode) && resultCode !== 0) {
        observed = "failed";
        await admin.from("donations").update({ status: "failed", updated_at: new Date().toISOString() }).eq("id", donation.id);
        resolution = "matched_failure";
      } else {
        note = `Status query could not establish a final state (HTTP ${response.status}).`;
      }
    } catch (error) {
      note = error instanceof Error ? error.message : "M-Pesa query failed";
    }

    await admin.from("reconciliation_items").insert({
      run_id: run.id,
      donation_id: donation.id,
      provider_reference: donation.provider_reference,
      expected_status: donation.status,
      observed_status: observed,
      resolution_status: resolution,
      resolution_note: note || null,
    });

    results.push({ reference: donation.public_reference, observed, resolution });
  }

  const unresolved = results.filter((item) => !["matched", "matched_failure"].includes(item.resolution)).length;
  await admin.from("reconciliation_runs").update({
    status: unresolved ? "completed_with_review" : "completed",
    completed_at: new Date().toISOString(),
  }).eq("id", run.id);

  await admin.from("audit_events").insert({
    actor_id: user.id,
    action: "mpesa.reconcile",
    resource_type: "reconciliation_run",
    resource_id: run.id,
    summary: { checked: results.length, unresolved },
  });

  return json(200, { ok: true, runId: run.id, checked: results.length, unresolved, results });
});
