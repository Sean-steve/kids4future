"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type AdminRole = "admin" | "content_editor" | "safeguarding_reviewer" | "finance_reviewer" | "viewer";
type Profile = { role: AdminRole; display_name: string | null; is_active: boolean };
type Inquiry = { id: string; kind: string; name: string; email: string; status: string; created_at: string };
type Donation = { id: string; public_reference: string; amount: number; currency: string; status: string; created_at: string };
type CmsRow = { id: string; title: string; status: string; updated_at: string };

const formatDate = (value: string) => new Intl.DateTimeFormat("en-KE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

export function AdminConsole() {
  const client = useMemo(() => getSupabaseBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(() => Boolean(client));
  const [message, setMessage] = useState("");
  const [counts, setCounts] = useState<Record<string, number | null>>({});
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stories, setStories] = useState<CmsRow[]>([]);
  const [events, setEvents] = useState<CmsRow[]>([]);

  const loadDashboard = useCallback(async (uid: string) => {
    if (!client) return;
    setLoading(true);
    setMessage("");

    const { data: profileData, error: profileError } = await client
      .from("admin_profiles")
      .select("role,display_name,is_active")
      .eq("user_id", uid)
      .single();

    if (profileError || !profileData?.is_active) {
      setProfile(null);
      setMessage("This account is authenticated but is not an active FutureRise administrator.");
      setLoading(false);
      return;
    }

    const typedProfile = profileData as Profile;
    setProfile(typedProfile);

    const nextCounts: Record<string, number | null> = {};

    if (["admin", "viewer"].includes(typedProfile.role)) {
      const [{ count: inquiryCount }, { data: inquiryRows }] = await Promise.all([
        client.from("inquiries").select("id", { count: "exact", head: true }),
        client.from("inquiries").select("id,kind,name,email,status,created_at").order("created_at", { ascending: false }).limit(8),
      ]);
      nextCounts.inquiries = inquiryCount ?? 0;
      setInquiries((inquiryRows ?? []) as Inquiry[]);
    } else {
      setInquiries([]);
    }

    if (["admin", "content_editor", "safeguarding_reviewer"].includes(typedProfile.role)) {
      const [storyCountResult, eventCountResult, storyRowsResult, eventRowsResult] = await Promise.all([
        client.from("cms_stories").select("id", { count: "exact", head: true }),
        client.from("cms_events").select("id", { count: "exact", head: true }),
        client.from("cms_stories").select("id,title,status,updated_at").order("updated_at", { ascending: false }).limit(8),
        client.from("cms_events").select("id,title,status,updated_at").order("updated_at", { ascending: false }).limit(8),
      ]);
      nextCounts.stories = storyCountResult.count ?? 0;
      nextCounts.events = eventCountResult.count ?? 0;
      setStories((storyRowsResult.data ?? []) as CmsRow[]);
      setEvents((eventRowsResult.data ?? []) as CmsRow[]);
    } else {
      setStories([]);
      setEvents([]);
    }

    if (["admin", "finance_reviewer", "viewer"].includes(typedProfile.role)) {
      const [{ count: donationCount }, { data: donationRows }] = await Promise.all([
        client.from("donations").select("id", { count: "exact", head: true }),
        client.from("donations").select("id,public_reference,amount,currency,status,created_at").order("created_at", { ascending: false }).limit(8),
      ]);
      nextCounts.donations = donationCount ?? 0;
      setDonations((donationRows ?? []) as Donation[]);
    } else {
      setDonations([]);
    }

    setCounts(nextCounts);
    setLoading(false);
  }, [client]);

  useEffect(() => {
    if (!client) return;

    client.auth.getSession().then(({ data }) => {
      const id = data.session?.user.id ?? null;
      setUserId(id);
      if (id) void loadDashboard(id);
      else setLoading(false);
    });

    const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
      const id = session?.user.id ?? null;
      setUserId(id);
      if (id) void loadDashboard(id);
      else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [client, loadDashboard]);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    if (!client) return;
    setLoading(true);
    setMessage("");
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage("Sign-in failed. Check the credentials or account status.");
      setLoading(false);
    }
  }

  async function signOut() {
    if (!client) return;
    await client.auth.signOut();
    setUserId(null);
    setProfile(null);
    setCounts({});
    setInquiries([]);
    setDonations([]);
    setStories([]);
    setEvents([]);
  }

  async function createStory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client || !userId) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const title = String(data.get("title") ?? "").trim();
    const slug = String(data.get("slug") ?? "").trim().toLowerCase();
    const summary = String(data.get("summary") ?? "").trim();
    const bodyText = String(data.get("body") ?? "").trim();
    if (!title || !slug || !summary || !bodyText) return;

    const { error } = await client.from("cms_stories").insert({
      title,
      slug,
      summary,
      body: { blocks: [{ type: "paragraph", text: bodyText }] },
      safeguarding_required: true,
      created_by: userId,
      updated_by: userId,
      status: "draft",
    });

    if (error) setMessage(`Could not create story draft: ${error.message}`);
    else {
      form.reset();
      setMessage("Story draft created. Safeguarding approval is still required before publication.");
      await loadDashboard(userId);
    }
  }

  async function createEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client || !userId) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const title = String(data.get("title") ?? "").trim();
    const slug = String(data.get("slug") ?? "").trim().toLowerCase();
    const summary = String(data.get("summary") ?? "").trim();
    const startsAt = String(data.get("starts_at") ?? "").trim();
    if (!title || !slug || !summary) return;

    const { error } = await client.from("cms_events").insert({
      title,
      slug,
      summary,
      starts_at: startsAt ? new Date(startsAt).toISOString() : null,
      created_by: userId,
      updated_by: userId,
      status: "draft",
    });

    if (error) setMessage(`Could not create event draft: ${error.message}`);
    else {
      form.reset();
      setMessage("Event draft created.");
      await loadDashboard(userId);
    }
  }

  if (!client) {
    return <div className="admin-state"><strong>FutureRise admin backend is not connected yet.</strong><p>Provision the dedicated Supabase project and set the public project URL and publishable key at build time. No secret key belongs in the browser.</p></div>;
  }

  if (!userId) {
    return <form className="admin-login" onSubmit={signIn}>
      <h2>Staff sign in</h2>
      <div className="field"><label htmlFor="admin-email">Email</label><input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username"/></div>
      <div className="field"><label htmlFor="admin-password">Password</label><input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password"/></div>
      <button className="button" type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
      {message ? <p className="danger-note" role="alert">{message}</p> : null}
    </form>;
  }

  if (loading) return <div className="admin-state">Loading authorized workspace…</div>;
  if (!profile) return <div className="admin-state"><strong>Access not granted.</strong><p>{message}</p><button className="button" onClick={signOut}>Sign out</button></div>;

  return <div className="admin-console">
    <div className="admin-toolbar"><div><span className="eyebrow">Authenticated workspace</span><h2>{profile.display_name || "FutureRise staff"}</h2><p>Role: <strong>{profile.role}</strong></p></div><button className="button button-ghost" onClick={signOut}>Sign out</button></div>
    {message ? <div className="alert" role="status">{message}</div> : null}
    <div className="stat-grid admin-stats">
      {Object.entries(counts).map(([label, value]) => <article className="stat-card" key={label}><strong>{value ?? "—"}</strong><span>{label}</span></article>)}
    </div>

    {inquiries.length ? <section className="admin-panel"><h3>Recent enquiries</h3><div className="admin-table">{inquiries.map((row) => <div className="admin-row" key={row.id}><div><strong>{row.name}</strong><span>{row.kind} · {row.email}</span></div><div><span>{row.status}</span><small>{formatDate(row.created_at)}</small></div></div>)}</div></section> : null}
    {donations.length ? <section className="admin-panel"><h3>Recent donations</h3><div className="admin-table">{donations.map((row) => <div className="admin-row" key={row.id}><div><strong>{row.public_reference}</strong><span>{row.currency} {Number(row.amount).toLocaleString("en-KE")}</span></div><div><span>{row.status}</span><small>{formatDate(row.created_at)}</small></div></div>)}</div></section> : null}
    {stories.length ? <section className="admin-panel"><h3>Story workflow</h3><div className="admin-table">{stories.map((row) => <div className="admin-row" key={row.id}><div><strong>{row.title}</strong><span>{row.status}</span></div><small>{formatDate(row.updated_at)}</small></div>)}</div></section> : null}
    {events.length ? <section className="admin-panel"><h3>Event workflow</h3><div className="admin-table">{events.map((row) => <div className="admin-row" key={row.id}><div><strong>{row.title}</strong><span>{row.status}</span></div><small>{formatDate(row.updated_at)}</small></div>)}</div></section> : null}

    {["admin", "content_editor"].includes(profile.role) ? <div className="content-grid admin-editors">
      <form className="admin-panel" onSubmit={createStory}><h3>New story draft</h3><div className="field"><label>Title</label><input name="title" required maxLength={180}/></div><div className="field"><label>Slug</label><input name="slug" required pattern="[a-z0-9-]+"/></div><div className="field"><label>Summary</label><textarea name="summary" required maxLength={600}/></div><div className="field"><label>Draft body</label><textarea name="body" required maxLength={8000}/></div><button className="button" type="submit">Create draft</button><p className="form-help">New beneficiary stories remain drafts until safeguarding review and consent requirements are satisfied.</p></form>
      <form className="admin-panel" onSubmit={createEvent}><h3>New event draft</h3><div className="field"><label>Title</label><input name="title" required maxLength={180}/></div><div className="field"><label>Slug</label><input name="slug" required pattern="[a-z0-9-]+"/></div><div className="field"><label>Summary</label><textarea name="summary" required maxLength={600}/></div><div className="field"><label>Start date/time</label><input name="starts_at" type="datetime-local"/></div><button className="button" type="submit">Create event draft</button></form>
    </div> : null}
  </div>;
}
