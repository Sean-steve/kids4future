"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminSectionNav } from "./AdminSectionNav";
import { useAdminSession } from "./useAdminSession";

type DonationRow = { id: string; public_reference: string; amount: number; currency: string; status: string; donor_name: string | null; donor_email: string | null; provider_reference: string | null; created_at: string };
type ReceiptRow = { id: string; receipt_number: string; amount: number; currency: string; recipient_email: string | null; delivery_status: string; issued_at: string };
type RunRow = { id: string; status: string; window_start: string; window_end: string; started_at: string; completed_at: string | null };
type ReconciliationItem = { id: string; provider_reference: string | null; expected_status: string | null; observed_status: string | null; resolution_status: string; resolution_note: string | null; created_at: string };

const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat("en-KE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "—";

export function FinanceManager() {
  const { client, userId, profile, loading, error } = useAdminSession();
  const [donations, setDonations] = useState<DonationRow[]>([]);
  const [receipts, setReceipts] = useState<ReceiptRow[]>([]);
  const [runs, setRuns] = useState<RunRow[]>([]);
  const [items, setItems] = useState<ReconciliationItem[]>([]);
  const [reference, setReference] = useState("");
  const [resolutionNotes, setResolutionNotes] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const loadFinance = useCallback(async () => {
    if (!client || !profile || !["admin", "finance_reviewer", "viewer"].includes(profile.role)) return;
    const [donationResult, receiptResult] = await Promise.all([
      client.from("donations").select("id,public_reference,amount,currency,status,donor_name,donor_email,provider_reference,created_at").order("created_at", { ascending: false }).limit(100),
      client.from("receipts").select("id,receipt_number,amount,currency,recipient_email,delivery_status,issued_at").order("issued_at", { ascending: false }).limit(100),
    ]);
    if (donationResult.error || receiptResult.error) setNotice(`Could not load finance records: ${(donationResult.error || receiptResult.error)?.message}`);
    else {
      setDonations((donationResult.data ?? []) as DonationRow[]);
      setReceipts((receiptResult.data ?? []) as ReceiptRow[]);
    }

    if (["admin", "finance_reviewer"].includes(profile.role)) {
      const [runResult, itemResult] = await Promise.all([
        client.from("reconciliation_runs").select("id,status,window_start,window_end,started_at,completed_at").order("started_at", { ascending: false }).limit(30),
        client.from("reconciliation_items").select("id,provider_reference,expected_status,observed_status,resolution_status,resolution_note,created_at").order("created_at", { ascending: false }).limit(100),
      ]);
      if (!runResult.error) setRuns((runResult.data ?? []) as RunRow[]);
      if (!itemResult.error) setItems((itemResult.data ?? []) as ReconciliationItem[]);
    }
  }, [client, profile]);

  useEffect(() => {
    if (!client || !profile || !["admin", "finance_reviewer", "viewer"].includes(profile.role)) return;
    void loadFinance();
  }, [client, profile, loadFinance]);

  async function reconcile() {
    if (!client || !profile || !["admin", "finance_reviewer"].includes(profile.role)) return;
    setBusy(true);
    setNotice("");
    const body = reference.trim() ? { reference: reference.trim() } : {};
    const { data, error: invokeError } = await client.functions.invoke("mpesa-reconcile", { body });
    if (invokeError) setNotice(`Reconciliation failed: ${invokeError.message}`);
    else setNotice(`Reconciliation complete: ${data?.checked ?? 0} checked, ${data?.unresolved ?? 0} requiring review.`);
    await loadFinance();
    setBusy(false);
  }

  async function dispatchReceipts(receiptId?: string) {
    if (!client || !profile || !["admin", "finance_reviewer"].includes(profile.role)) return;
    setBusy(true);
    setNotice("");
    const { data, error: invokeError } = await client.functions.invoke("receipt-dispatch", { body: receiptId ? { receiptId } : {} });
    if (invokeError) setNotice(`Receipt dispatch failed: ${invokeError.message}`);
    else setNotice(`Receipt dispatch processed ${data?.processed ?? 0}: ${data?.sent ?? 0} sent, ${data?.failed ?? 0} failed, ${data?.skipped ?? 0} skipped.`);
    await loadFinance();
    setBusy(false);
  }

  async function resolveItem(id: string) {
    if (!client || !profile || !["admin", "finance_reviewer"].includes(profile.role)) return;
    const note = (resolutionNotes[id] ?? "").trim();
    if (!note) {
      setNotice("Add a finance review note before resolving a reconciliation item.");
      return;
    }
    setBusy(true);
    const { error: updateError } = await client.from("reconciliation_items").update({ resolution_status: "resolved", resolution_note: note }).eq("id", id);
    if (updateError) setNotice(`Could not resolve reconciliation item: ${updateError.message}`);
    else {
      setNotice("Reconciliation item marked resolved with a review note.");
      await loadFinance();
    }
    setBusy(false);
  }

  if (!client) return <div className="admin-state"><strong>Backend not connected.</strong><p>Finance operations activate after the FutureRise Supabase project and payment functions are deployed.</p></div>;
  if (loading) return <div className="admin-state">Checking staff access…</div>;
  if (!userId || !profile) return <div className="admin-state"><strong>Staff sign-in required.</strong><p>{error || "Sign in from the Admin overview first."}</p></div>;
  if (!["admin", "finance_reviewer", "viewer"].includes(profile.role)) return <div className="admin-state"><strong>Access restricted.</strong><p>Your role does not include finance records.</p></div>;

  const canOperate = ["admin", "finance_reviewer"].includes(profile.role);

  return <div className="admin-console">
    <AdminSectionNav />
    <div className="admin-toolbar"><div><span className="eyebrow">Finance operations</span><h2>Donations, receipts and reconciliation</h2><p>Provider events—not browser success screens—determine donation status and receipts.</p></div><button className="button button-ghost" type="button" onClick={() => void loadFinance()}>Refresh</button></div>
    {notice ? <div className="alert" role="status">{notice}</div> : null}

    {canOperate ? <section className="admin-panel"><h3>M-Pesa reconciliation</h3><div className="admin-action-bar"><div className="field"><label htmlFor="reconcile-reference">Optional donation reference</label><input id="reconcile-reference" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="FR-…"/></div><button className="button" disabled={busy} onClick={() => void reconcile()}>Run reconciliation</button><button className="button button-ghost" disabled={busy} onClick={() => void dispatchReceipts()}>Dispatch pending receipts</button></div><p className="form-help">A blank reference checks up to 25 pending/review M-Pesa donations. Receipt delivery only operates on issued pending/failed receipt records.</p></section> : null}

    <section className="admin-panel"><h3>Recent donations</h3><div className="admin-table">{donations.length ? donations.map((row) => <div className="admin-content-row" key={row.id}><div><strong>{row.public_reference}</strong><span>{row.currency} {Number(row.amount).toLocaleString("en-KE")} · {row.status}</span><small>{row.donor_name || "Anonymous donor"}{row.donor_email ? ` · ${row.donor_email}` : ""}</small></div><div><span className="badge">{row.provider_reference || "provider ref pending"}</span><small>{formatDate(row.created_at)}</small></div></div>) : <div className="empty-state">No donations yet.</div>}</div></section>

    <section className="admin-panel"><h3>Receipts</h3><div className="admin-table">{receipts.length ? receipts.map((row) => <div className="admin-content-row" key={row.id}><div><strong>{row.receipt_number}</strong><span>{row.currency} {Number(row.amount).toLocaleString("en-KE")} · {row.delivery_status}</span><small>{row.recipient_email || "No email requested"} · {formatDate(row.issued_at)}</small></div>{canOperate && ["pending", "failed"].includes(row.delivery_status) ? <button className="button button-small" disabled={busy} onClick={() => void dispatchReceipts(row.id)}>Send</button> : null}</div>) : <div className="empty-state">No receipts yet.</div>}</div></section>

    {canOperate ? <><section className="admin-panel"><h3>Reconciliation runs</h3><div className="admin-table">{runs.length ? runs.map((run) => <div className="admin-row" key={run.id}><div><strong>{run.status}</strong><span>{formatDate(run.window_start)} → {formatDate(run.window_end)}</span></div><small>{formatDate(run.completed_at || run.started_at)}</small></div>) : <div className="empty-state">No reconciliation runs yet.</div>}</div></section>

    <section className="admin-panel"><h3>Reconciliation review queue</h3><div className="admin-table">{items.filter((item) => item.resolution_status !== "resolved").length ? items.filter((item) => item.resolution_status !== "resolved").map((item) => <div className="admin-inquiry" key={item.id}><div className="admin-inquiry-head"><div><strong>{item.provider_reference || "Provider reference unavailable"}</strong><p>Expected {item.expected_status || "—"} · observed {item.observed_status || "—"}</p></div><span className="badge">{item.resolution_status}</span></div>{item.resolution_note ? <p>{item.resolution_note}</p> : null}<div className="admin-row-actions"><input aria-label="Resolution note" placeholder="Finance resolution note" value={resolutionNotes[item.id] ?? ""} onChange={(e) => setResolutionNotes((current) => ({ ...current, [item.id]: e.target.value }))}/><button className="button button-small" disabled={busy} onClick={() => void resolveItem(item.id)}>Mark reviewed</button></div></div>) : <div className="empty-state">No unresolved reconciliation items.</div>}</div></section></> : null}
  </div>;
}
