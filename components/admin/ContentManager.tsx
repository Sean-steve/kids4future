"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { AdminSectionNav } from "./AdminSectionNav";
import { useAdminSession } from "./useAdminSession";

type ContentStatus = "draft" | "review" | "published" | "archived";
type StoryRow = { id: string; title: string; status: ContentStatus; safeguarding_required: boolean; safeguarding_approved_at: string | null; consent_reference: string | null; published_at: string | null; updated_at: string };
type EventRow = { id: string; title: string; status: ContentStatus; starts_at: string | null; published_at: string | null; updated_at: string };
type ReportRow = { id: string; title: string; status: ContentStatus; report_type: string; document_url: string | null; updated_at: string };
type CampaignRow = { id: string; title: string; status: ContentStatus; target_amount: number | null; currency: string; updated_at: string };

type TableName = "cms_stories" | "cms_events" | "cms_reports" | "cms_campaigns";

const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat("en-KE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "—";

export function ContentManager() {
  const { client, userId, profile, loading, error } = useAdminSession();
  const [stories, setStories] = useState<StoryRow[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [reports, setReports] = useState<ReportRow[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignRow[]>([]);
  const [consentRefs, setConsentRefs] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const loadContent = useCallback(async () => {
    if (!client || !profile) return;
    const [storyResult, eventResult, reportResult, campaignResult] = await Promise.all([
      client.from("cms_stories").select("id,title,status,safeguarding_required,safeguarding_approved_at,consent_reference,published_at,updated_at").order("updated_at", { ascending: false }).limit(100),
      client.from("cms_events").select("id,title,status,starts_at,published_at,updated_at").order("updated_at", { ascending: false }).limit(100),
      client.from("cms_reports").select("id,title,status,report_type,document_url,updated_at").order("updated_at", { ascending: false }).limit(100),
      client.from("cms_campaigns").select("id,title,status,target_amount,currency,updated_at").order("updated_at", { ascending: false }).limit(100),
    ]);
    const firstError = storyResult.error || eventResult.error || reportResult.error || campaignResult.error;
    if (firstError) setNotice(`Could not load CMS records: ${firstError.message}`);
    else {
      setStories((storyResult.data ?? []) as StoryRow[]);
      setEvents((eventResult.data ?? []) as EventRow[]);
      setReports((reportResult.data ?? []) as ReportRow[]);
      setCampaigns((campaignResult.data ?? []) as CampaignRow[]);
    }
  }, [client, profile]);

  useEffect(() => {
    if (!client || !profile) return;
    void loadContent();
  }, [client, profile, loadContent]);

  async function updateStatus(table: TableName, id: string, status: ContentStatus) {
    if (!client || !userId || !profile) return;
    setBusy(true);
    setNotice("");
    const update: Record<string, unknown> = { status, updated_by: userId };
    if (status === "published") update.published_at = new Date().toISOString();
    const { error: updateError } = await client.from(table).update(update).eq("id", id);
    if (updateError) setNotice(`Could not update content: ${updateError.message}`);
    else {
      setNotice(`Content moved to ${status}.`);
      await loadContent();
    }
    setBusy(false);
  }

  async function approveStory(story: StoryRow) {
    if (!client || !userId || !profile || !["admin", "safeguarding_reviewer"].includes(profile.role)) return;
    const consentReference = (consentRefs[story.id] || story.consent_reference || "").trim();
    if (!consentReference) {
      setNotice("A documented consent reference is required before safeguarding approval.");
      return;
    }
    setBusy(true);
    const { error: approvalError } = await client.from("cms_stories").update({
      safeguarding_approved_at: new Date().toISOString(),
      safeguarding_approved_by: userId,
      consent_reference: consentReference,
      status: "review",
      updated_by: userId,
    }).eq("id", story.id);
    if (approvalError) setNotice(`Could not approve story: ${approvalError.message}`);
    else {
      setNotice("Safeguarding approval recorded. The story is ready for publication review.");
      await loadContent();
    }
    setBusy(false);
  }

  async function createReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client || !userId || !profile || !["admin", "content_editor", "finance_reviewer"].includes(profile.role)) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const title = String(data.get("title") ?? "").trim();
    const slug = String(data.get("slug") ?? "").trim().toLowerCase();
    const summary = String(data.get("summary") ?? "").trim();
    const reportType = String(data.get("report_type") ?? "").trim();
    const documentUrl = String(data.get("document_url") ?? "").trim();
    if (!title || !slug || !summary || !reportType) return;
    setBusy(true);
    const { error: insertError } = await client.from("cms_reports").insert({ title, slug, summary, report_type: reportType, document_url: documentUrl || null, created_by: userId, updated_by: userId, status: "draft" });
    if (insertError) setNotice(`Could not create report: ${insertError.message}`);
    else { form.reset(); setNotice("Report draft created."); await loadContent(); }
    setBusy(false);
  }

  async function createCampaign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client || !userId || !profile || !["admin", "content_editor", "finance_reviewer"].includes(profile.role)) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const title = String(data.get("title") ?? "").trim();
    const slug = String(data.get("slug") ?? "").trim().toLowerCase();
    const summary = String(data.get("summary") ?? "").trim();
    const programKey = String(data.get("program_key") ?? "").trim();
    const currency = String(data.get("currency") ?? "KES").trim().toUpperCase();
    const targetRaw = String(data.get("target_amount") ?? "").trim();
    const targetAmount = targetRaw ? Number(targetRaw) : null;
    if (!title || !slug || !summary || (targetAmount !== null && (!Number.isFinite(targetAmount) || targetAmount < 0))) return;
    setBusy(true);
    const { error: insertError } = await client.from("cms_campaigns").insert({ title, slug, summary, program_key: programKey || null, target_amount: targetAmount, currency, created_by: userId, updated_by: userId, status: "draft" });
    if (insertError) setNotice(`Could not create campaign: ${insertError.message}`);
    else { form.reset(); setNotice("Campaign draft created."); await loadContent(); }
    setBusy(false);
  }

  if (!client) return <div className="admin-state"><strong>Backend not connected.</strong><p>Provision the FutureRise Supabase project to activate CMS operations.</p></div>;
  if (loading) return <div className="admin-state">Checking staff access…</div>;
  if (!userId || !profile) return <div className="admin-state"><strong>Staff sign-in required.</strong><p>{error || "Sign in from the Admin overview first."}</p></div>;

  const canEditGeneral = ["admin", "content_editor"].includes(profile.role);
  const canEditFinanceContent = ["admin", "content_editor", "finance_reviewer"].includes(profile.role);
  const canReviewStories = ["admin", "safeguarding_reviewer"].includes(profile.role);

  return <div className="admin-console">
    <AdminSectionNav />
    <div className="admin-toolbar"><div><span className="eyebrow">CMS workflow</span><h2>Draft → review → published → archived</h2><p>Story publication remains blocked at database level until safeguarding and consent requirements are met.</p></div><button className="button button-ghost" type="button" onClick={() => void loadContent()}>Refresh</button></div>
    {notice ? <div className="alert" role="status">{notice}</div> : null}

    <section className="admin-panel"><h3>Stories</h3><div className="admin-table">{stories.length ? stories.map((story) => <div className="admin-content-row" key={story.id}><div><strong>{story.title}</strong><span>{story.status} · updated {formatDate(story.updated_at)}</span><small>{story.safeguarding_required ? (story.safeguarding_approved_at ? `Safeguarding approved · consent ${story.consent_reference || "recorded"}` : "Safeguarding approval pending") : "Safeguarding approval not required"}</small></div><div className="admin-row-actions">{canEditGeneral && story.status === "draft" ? <button className="button button-small" disabled={busy} onClick={() => void updateStatus("cms_stories", story.id, "review")}>Send to review</button> : null}{canReviewStories && story.safeguarding_required && !story.safeguarding_approved_at ? <><input aria-label={`Consent reference for ${story.title}`} placeholder="Consent reference" value={consentRefs[story.id] ?? ""} onChange={(e) => setConsentRefs((current) => ({ ...current, [story.id]: e.target.value }))}/><button className="button button-small" disabled={busy} onClick={() => void approveStory(story)}>Approve safeguarding</button></> : null}{canReviewStories && story.status !== "published" && (!story.safeguarding_required || story.safeguarding_approved_at) ? <button className="button button-small" disabled={busy} onClick={() => void updateStatus("cms_stories", story.id, "published")}>Publish</button> : null}{["admin", "content_editor", "safeguarding_reviewer"].includes(profile.role) && story.status !== "archived" ? <button className="button button-ghost button-small" disabled={busy} onClick={() => void updateStatus("cms_stories", story.id, "archived")}>Archive</button> : null}</div></div>) : <div className="empty-state">No stories yet.</div>}</div></section>

    <section className="admin-panel"><h3>Events</h3><div className="admin-table">{events.length ? events.map((row) => <div className="admin-content-row" key={row.id}><div><strong>{row.title}</strong><span>{row.status} · starts {formatDate(row.starts_at)}</span></div>{canEditGeneral ? <div className="admin-row-actions">{row.status === "draft" ? <button className="button button-small" disabled={busy} onClick={() => void updateStatus("cms_events", row.id, "review")}>Review</button> : null}{row.status !== "published" ? <button className="button button-small" disabled={busy} onClick={() => void updateStatus("cms_events", row.id, "published")}>Publish</button> : null}{row.status !== "archived" ? <button className="button button-ghost button-small" disabled={busy} onClick={() => void updateStatus("cms_events", row.id, "archived")}>Archive</button> : null}</div> : null}</div>) : <div className="empty-state">No events yet.</div>}</div></section>

    <section className="admin-panel"><h3>Reports</h3><div className="admin-table">{reports.length ? reports.map((row) => <div className="admin-content-row" key={row.id}><div><strong>{row.title}</strong><span>{row.report_type} · {row.status}</span></div>{canEditFinanceContent ? <div className="admin-row-actions">{row.status === "draft" ? <button className="button button-small" disabled={busy} onClick={() => void updateStatus("cms_reports", row.id, "review")}>Review</button> : null}{row.status !== "published" ? <button className="button button-small" disabled={busy} onClick={() => void updateStatus("cms_reports", row.id, "published")}>Publish</button> : null}{row.status !== "archived" ? <button className="button button-ghost button-small" disabled={busy} onClick={() => void updateStatus("cms_reports", row.id, "archived")}>Archive</button> : null}</div> : null}</div>) : <div className="empty-state">No reports yet.</div>}</div></section>

    <section className="admin-panel"><h3>Campaigns</h3><div className="admin-table">{campaigns.length ? campaigns.map((row) => <div className="admin-content-row" key={row.id}><div><strong>{row.title}</strong><span>{row.status} · {row.target_amount === null ? "No public target" : `${row.currency} ${Number(row.target_amount).toLocaleString("en-KE")}`}</span></div>{canEditFinanceContent ? <div className="admin-row-actions">{row.status === "draft" ? <button className="button button-small" disabled={busy} onClick={() => void updateStatus("cms_campaigns", row.id, "review")}>Review</button> : null}{row.status !== "published" ? <button className="button button-small" disabled={busy} onClick={() => void updateStatus("cms_campaigns", row.id, "published")}>Publish</button> : null}{row.status !== "archived" ? <button className="button button-ghost button-small" disabled={busy} onClick={() => void updateStatus("cms_campaigns", row.id, "archived")}>Archive</button> : null}</div> : null}</div>) : <div className="empty-state">No campaigns yet.</div>}</div></section>

    {canEditFinanceContent ? <div className="content-grid admin-editors">
      <form className="admin-panel" onSubmit={createReport}><h3>New report draft</h3><div className="field"><label>Title</label><input name="title" required maxLength={180}/></div><div className="field"><label>Slug</label><input name="slug" required pattern="[a-z0-9-]+"/></div><div className="field"><label>Summary</label><textarea name="summary" required maxLength={600}/></div><div className="field"><label>Report type</label><input name="report_type" required placeholder="Annual report, audit, governance…"/></div><div className="field"><label>Document URL</label><input name="document_url" type="url" placeholder="https://…"/></div><button className="button" disabled={busy}>Create report draft</button></form>
      <form className="admin-panel" onSubmit={createCampaign}><h3>New campaign draft</h3><div className="field"><label>Title</label><input name="title" required maxLength={180}/></div><div className="field"><label>Slug</label><input name="slug" required pattern="[a-z0-9-]+"/></div><div className="field"><label>Summary</label><textarea name="summary" required maxLength={600}/></div><div className="field"><label>Program key</label><input name="program_key" placeholder="kids4future"/></div><div className="form-grid"><div className="field"><label>Target amount</label><input name="target_amount" type="number" min="0" step="0.01"/></div><div className="field"><label>Currency</label><input name="currency" defaultValue="KES" maxLength={3}/></div></div><button className="button" disabled={busy}>Create campaign draft</button></form>
    </div> : null}
  </div>;
}
