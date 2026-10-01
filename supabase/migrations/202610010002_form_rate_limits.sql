begin;

create table public.form_submission_windows (
  id bigint generated always as identity primary key,
  fingerprint_hash text not null,
  kind public.inquiry_kind not null,
  created_at timestamptz not null default now()
);

create index form_submission_windows_lookup
  on public.form_submission_windows(fingerprint_hash, kind, created_at desc);

alter table public.form_submission_windows enable row level security;

-- Intentionally no browser-facing policies. This table is accessed only by
-- trusted server-side functions using a service-role client.

commit;
