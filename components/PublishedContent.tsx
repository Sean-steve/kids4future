"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type Kind = "stories" | "events" | "reports";
type PublishedRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  published_at: string | null;
  starts_at?: string | null;
  location_label?: string | null;
  report_type?: string | null;
  document_url?: string | null;
};

const tableByKind: Record<Kind, string> = {
  stories: "cms_stories",
  events: "cms_events",
  reports: "cms_reports",
};

export function PublishedContent({ kind }: { kind: Kind }) {
  const client = useMemo(() => getSupabaseBrowserClient(), []);
  const [rows, setRows] = useState<PublishedRow[]>([]);
  const [state, setState] = useState<"unconfigured" | "loading" | "ready" | "error">(client ? "loading" : "unconfigured");

  useEffect(() => {
    if (!client) return;
    let active = true;

    const columns = kind === "events"
      ? "id,slug,title,summary,published_at,starts_at,location_label"
      : kind === "reports"
        ? "id,slug,title,summary,published_at,report_type,document_url"
        : "id,slug,title,summary,published_at";

    client
      .from(tableByKind[kind])
      .select(columns)
      .eq("status", "published")
      .order(kind === "events" ? "starts_at" : "published_at", { ascending: kind === "events" })
      .limit(24)
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          console.error(`Could not load published ${kind}`, error.message);
          setState("error");
          return;
        }
        setRows((data ?? []) as unknown as PublishedRow[]);
        setState("ready");
      });

    return () => { active = false; };
  }, [client, kind]);

  if (state === "loading") return <div className="empty-state"><strong>Loading published {kind}…</strong></div>;
  if (state === "error") return <div className="empty-state"><strong>Published content is temporarily unavailable.</strong><p>Please use the contact page if you need an update.</p></div>;
  if (state === "unconfigured" || rows.length === 0) {
    return <div className="empty-state"><strong>No published {kind} are available yet.</strong><p>FutureRise only shows records that have completed the relevant review and publishing workflow.</p></div>;
  }

  return <div className="content-grid three">
    {rows.map((row) => <article className="info-card" key={row.id}>
      <span className="eyebrow">{kind === "reports" ? row.report_type || "Report" : kind === "events" ? "Event" : "Story"}</span>
      <h3>{row.title}</h3>
      <p>{row.summary}</p>
      {kind === "events" && row.starts_at ? <p className="form-help"><strong>{new Intl.DateTimeFormat("en-KE", { dateStyle: "full", timeStyle: "short" }).format(new Date(row.starts_at))}</strong>{row.location_label ? ` · ${row.location_label}` : ""}</p> : null}
      {kind === "reports" && row.document_url ? <a className="text-link" href={row.document_url} target="_blank" rel="noreferrer">Open report →</a> : null}
    </article>)}
  </div>;
}
