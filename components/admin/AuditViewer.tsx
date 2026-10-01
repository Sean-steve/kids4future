"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminSectionNav } from "./AdminSectionNav";
import { useAdminSession } from "./useAdminSession";

type AuditRow = {
  id: number;
  actor_id: string | null;
  action: string;
  resource_type: string;
  resource_id: string | null;
  summary: Record<string, unknown>;
  correlation_id: string | null;
  created_at: string;
};

const formatDate = (value: string) => new Intl.DateTimeFormat("en-KE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

export function AuditViewer() {
  const { client, userId, profile, loading, error } = useAdminSession();
  const [rows, setRows] = useState<AuditRow[]>([]);
  const [notice, setNotice] = useState("");

  const loadAudit = useCallback(async () => {
    if (!client || profile?.role !== "admin") return;
    const { data, error: readError } = await client
      .from("audit_events")
      .select("id,actor_id,action,resource_type,resource_id,summary,correlation_id,created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (readError) setNotice(`Could not load audit log: ${readError.message}`);
    else setRows((data ?? []) as AuditRow[]);
  }, [client, profile]);

  useEffect(() => {
    if (!client || profile?.role !== "admin") return;
    void loadAudit();
  }, [client, profile, loadAudit]);

  if (!client) return <div className="admin-state"><strong>Backend not connected.</strong><p>The audit trail activates with the FutureRise Supabase deployment.</p></div>;
  if (loading) return <div className="admin-state">Checking staff access…</div>;
  if (!userId || !profile) return <div className="admin-state"><strong>Staff sign-in required.</strong><p>{error || "Sign in from the Admin overview first."}</p></div>;
  if (profile.role !== "admin") return <div className="admin-state"><strong>Administrator access required.</strong><p>Audit history is restricted to the admin role.</p></div>;

  return <div className="admin-console">
    <AdminSectionNav />
    <div className="admin-toolbar"><div><span className="eyebrow">Audit trail</span><h2>Security and operational change history</h2><p>Audit summaries intentionally exclude full inquiry text, beneficiary details and payment payloads.</p></div><button className="button button-ghost" type="button" onClick={() => void loadAudit()}>Refresh</button></div>
    {notice ? <div className="alert" role="status">{notice}</div> : null}
    <div className="admin-table">
      {rows.length ? rows.map((row) => <div className="admin-content-row" key={row.id}>
        <div><strong>{row.action}</strong><span>{row.resource_type}{row.resource_id ? ` · ${row.resource_id}` : ""}</span><small>{Object.entries(row.summary ?? {}).map(([key, value]) => `${key}: ${String(value)}`).join(" · ") || "No summary metadata"}</small></div>
        <div><small>{formatDate(row.created_at)}</small><small>{row.actor_id ? `actor ${row.actor_id.slice(0, 8)}…` : "server/system"}</small></div>
      </div>) : <div className="empty-state"><strong>No audit events yet.</strong><p>Operational changes will appear after the backend is deployed and staff workflows begin.</p></div>}
    </div>
  </div>;
}
