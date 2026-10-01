"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { AdminSectionNav } from "./AdminSectionNav";
import { AdminRole, useAdminSession } from "./useAdminSession";

type StaffRow = {
  id: string;
  email: string | null;
  role: AdminRole;
  display_name: string | null;
  is_active: boolean;
  last_sign_in_at: string | null;
};

const roles: AdminRole[] = ["admin", "content_editor", "safeguarding_reviewer", "finance_reviewer", "viewer"];
const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat("en-KE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "Never";

export function StaffManager() {
  const { client, userId, profile, loading, error } = useAdminSession();
  const [users, setUsers] = useState<StaffRow[]>([]);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const loadUsers = useCallback(async () => {
    if (!client || profile?.role !== "admin") return;
    const { data, error: invokeError } = await client.functions.invoke("admin-users", { body: { action: "list" } });
    if (invokeError) setNotice(`Could not load staff: ${invokeError.message}`);
    else setUsers((data?.users ?? []) as StaffRow[]);
  }, [client, profile]);

  useEffect(() => {
    if (!client || profile?.role !== "admin") return;
    void loadUsers();
  }, [client, profile, loadUsers]);

  async function invite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client || profile?.role !== "admin") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const displayName = String(data.get("display_name") ?? "").trim();
    const role = String(data.get("role") ?? "viewer") as AdminRole;
    setBusy(true);
    setNotice("");
    const { data: result, error: invokeError } = await client.functions.invoke("admin-users", { body: { action: "invite", email, displayName, role } });
    if (invokeError || !result?.ok) setNotice(`Could not invite staff member: ${invokeError?.message || result?.detail || result?.error || "unknown error"}`);
    else {
      form.reset();
      setNotice("Staff invitation sent and role profile created.");
      await loadUsers();
    }
    setBusy(false);
  }

  async function updateStaff(row: StaffRow, patch: Partial<Pick<StaffRow, "role" | "is_active">>) {
    if (!client || profile?.role !== "admin") return;
    setBusy(true);
    setNotice("");
    const next = { ...row, ...patch };
    const { data: result, error: invokeError } = await client.functions.invoke("admin-users", {
      body: { action: "update", userId: row.id, role: next.role, displayName: next.display_name || "", isActive: next.is_active },
    });
    if (invokeError || !result?.ok) setNotice(`Could not update staff member: ${invokeError?.message || result?.error || "unknown error"}`);
    else {
      setUsers((current) => current.map((item) => item.id === row.id ? next : item));
      setNotice("Staff access updated and audited.");
    }
    setBusy(false);
  }

  if (!client) return <div className="admin-state"><strong>Backend not connected.</strong><p>Staff administration activates with the FutureRise Supabase deployment.</p></div>;
  if (loading) return <div className="admin-state">Checking administrator access…</div>;
  if (!userId || !profile) return <div className="admin-state"><strong>Staff sign-in required.</strong><p>{error || "Sign in from the Admin overview first."}</p></div>;
  if (profile.role !== "admin") return <div className="admin-state"><strong>Administrator access required.</strong><p>Only administrators can invite staff or change roles.</p></div>;

  return <div className="admin-console">
    <AdminSectionNav />
    <div className="admin-toolbar"><div><span className="eyebrow">Identity & access</span><h2>FutureRise staff accounts</h2><p>Invitations and role changes are executed by a server-side admin function. No service credential is exposed to the browser.</p></div><button className="button button-ghost" type="button" onClick={() => void loadUsers()}>Refresh</button></div>
    {notice ? <div className="alert" role="status">{notice}</div> : null}

    <form className="admin-panel" onSubmit={invite}>
      <h3>Invite staff member</h3>
      <div className="form-grid">
        <div className="field"><label>Email</label><input name="email" type="email" required/></div>
        <div className="field"><label>Display name</label><input name="display_name" maxLength={160}/></div>
        <div className="field"><label>Role</label><select name="role" defaultValue="viewer">{roles.map((role) => <option value={role} key={role}>{role}</option>)}</select></div>
      </div>
      <button className="button" disabled={busy}>Send invitation</button>
    </form>

    <section className="admin-panel"><h3>Active staff directory</h3><div className="admin-table">
      {users.length ? users.map((row) => <div className="admin-content-row" key={row.id}>
        <div><strong>{row.display_name || row.email || "Staff member"}</strong><span>{row.email || "Email unavailable"}</span><small>Last sign-in: {formatDate(row.last_sign_in_at)}</small></div>
        <div className="admin-row-actions">
          <label className="field compact"><span>Role</span><select value={row.role} disabled={busy} onChange={(event) => void updateStaff(row, { role: event.target.value as AdminRole })}>{roles.map((role) => <option key={role} value={role}>{role}</option>)}</select></label>
          <label className="consent-row"><input type="checkbox" checked={row.is_active} disabled={busy || row.id === userId} onChange={(event) => void updateStaff(row, { is_active: event.target.checked })}/><span>Active</span></label>
        </div>
      </div>) : <div className="empty-state"><strong>No staff profiles found.</strong><p>The first administrator profile is normally bootstrapped during backend provisioning.</p></div>}
    </div></section>
  </div>;
}
