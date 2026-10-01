"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminSectionNav } from "./AdminSectionNav";
import { useAdminSession } from "./useAdminSession";

type InquiryStatus = "new" | "reviewing" | "closed" | "spam";
type InquiryRow = {
  id: string;
  kind: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  interest: string | null;
  message: string;
  status: InquiryStatus;
  created_at: string;
};

const statuses: InquiryStatus[] = ["new", "reviewing", "closed", "spam"];
const formatDate = (value: string) => new Intl.DateTimeFormat("en-KE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

export function InquiryManager() {
  const { client, userId, profile, loading, error } = useAdminSession();
  const [rows, setRows] = useState<InquiryRow[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const loadRows = useCallback(async () => {
    if (!client || !profile || !["admin", "viewer"].includes(profile.role)) return;
    const { data, error: readError } = await client
      .from("inquiries")
      .select("id,kind,name,email,phone,organization,interest,message,status,created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (readError) setNotice(`Could not load inquiries: ${readError.message}`);
    else setRows((data ?? []) as InquiryRow[]);
  }, [client, profile]);

  useEffect(() => {
    if (!client || !profile || !["admin", "viewer"].includes(profile.role)) return;
    void loadRows();
  }, [client, profile, loadRows]);

  async function updateStatus(id: string, status: InquiryStatus) {
    if (!client || profile?.role !== "admin") return;
    setBusyId(id);
    setNotice("");
    const { error: updateError } = await client.from("inquiries").update({ status }).eq("id", id);
    if (updateError) setNotice(`Could not update inquiry: ${updateError.message}`);
    else {
      setRows((current) => current.map((row) => row.id === id ? { ...row, status } : row));
      setNotice("Inquiry status updated and audit metadata recorded.");
    }
    setBusyId(null);
  }

  if (!client) return <div className="admin-state"><strong>Backend not connected.</strong><p>Provision the FutureRise Supabase project and rebuild with its public URL and publishable key.</p></div>;
  if (loading) return <div className="admin-state">Checking staff access…</div>;
  if (!userId || !profile) return <div className="admin-state"><strong>Staff sign-in required.</strong><p>{error || "Sign in from the Admin overview first."}</p></div>;
  if (!["admin", "viewer"].includes(profile.role)) return <div className="admin-state"><strong>Access restricted.</strong><p>Your role does not include inquiry records.</p></div>;

  return <div className="admin-console">
    <AdminSectionNav />
    <div className="admin-toolbar">
      <div><span className="eyebrow">Inquiry operations</span><h2>Contact, volunteer and partner intake</h2><p>Showing the latest 100 submissions. Only administrators can change status.</p></div>
      <button className="button button-ghost" type="button" onClick={() => void loadRows()}>Refresh</button>
    </div>
    {notice ? <div className="alert" role="status">{notice}</div> : null}
    <div className="admin-table">
      {rows.length ? rows.map((row) => <article className="admin-inquiry" key={row.id}>
        <div className="admin-inquiry-head">
          <div><span className="badge">{row.kind}</span><h3>{row.name}</h3><p>{row.email}{row.phone ? ` · ${row.phone}` : ""}</p></div>
          <small>{formatDate(row.created_at)}</small>
        </div>
        {(row.organization || row.interest) ? <p><strong>Context:</strong> {[row.organization, row.interest].filter(Boolean).join(" · ")}</p> : null}
        <p className="admin-message">{row.message}</p>
        <div className="admin-row-actions">
          {profile.role === "admin" ? <label className="field compact"><span>Status</span><select value={row.status} disabled={busyId === row.id} onChange={(event) => void updateStatus(row.id, event.target.value as InquiryStatus)}>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label> : <span className="badge">{row.status}</span>}
        </div>
      </article>) : <div className="empty-state"><strong>No inquiries yet.</strong><p>New website submissions will appear here after the backend is deployed.</p></div>}
    </div>
  </div>;
}
