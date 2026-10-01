begin;

create extension if not exists pgcrypto;

create type public.inquiry_kind as enum ('contact','volunteer','partner');
create type public.inquiry_status as enum ('new','reviewing','closed','spam');
create type public.content_status as enum ('draft','review','published','archived');
create type public.payment_provider as enum ('mpesa','paypal','other');
create type public.donation_status as enum ('created','pending','paid','failed','reversed','refunded','requires_review');
create type public.admin_role as enum ('admin','content_editor','safeguarding_reviewer','finance_reviewer','viewer');

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  kind public.inquiry_kind not null,
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200),
  phone text check (phone is null or char_length(phone) <= 40),
  organization text check (organization is null or char_length(organization) <= 160),
  interest text check (interest is null or char_length(interest) <= 200),
  message text not null check (char_length(message) between 1 and 3000),
  privacy_version text not null default '2026-10-01',
  consent_at timestamptz not null default now(),
  source text not null default 'futurerise-web',
  status public.inquiry_status not null default 'new',
  assigned_to uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.admin_role not null default 'viewer',
  display_name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cms_stories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  body jsonb not null default '{}'::jsonb,
  status public.content_status not null default 'draft',
  safeguarding_required boolean not null default true,
  safeguarding_approved_at timestamptz,
  safeguarding_approved_by uuid references auth.users(id) on delete set null,
  consent_reference text,
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint story_publish_guard check (
    status <> 'published'
    or safeguarding_required = false
    or (safeguarding_approved_at is not null and safeguarding_approved_by is not null and consent_reference is not null)
  )
);

create table public.cms_events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  body jsonb not null default '{}'::jsonb,
  starts_at timestamptz,
  ends_at timestamptz,
  location_label text,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cms_reports (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  report_type text not null,
  document_url text,
  reporting_period_start date,
  reporting_period_end date,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cms_campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  program_key text,
  target_amount numeric(14,2) check (target_amount is null or target_amount >= 0),
  currency text not null default 'KES',
  status public.content_status not null default 'draft',
  starts_at timestamptz,
  ends_at timestamptz,
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.donations (
  id uuid primary key default gen_random_uuid(),
  public_reference text unique not null default ('FR-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,12))),
  provider public.payment_provider not null,
  provider_reference text,
  checkout_reference text,
  donor_name text,
  donor_email text,
  donor_phone text,
  amount numeric(14,2) not null check (amount > 0),
  currency text not null default 'KES',
  campaign_id uuid references public.cms_campaigns(id) on delete set null,
  program_key text,
  status public.donation_status not null default 'created',
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index donations_provider_reference_unique
  on public.donations(provider, provider_reference)
  where provider_reference is not null;

create unique index donations_checkout_reference_unique
  on public.donations(provider, checkout_reference)
  where checkout_reference is not null;

create table public.payment_events (
  id uuid primary key default gen_random_uuid(),
  provider public.payment_provider not null,
  provider_event_key text not null,
  event_type text not null,
  verified boolean not null default false,
  payload_checksum text not null,
  payload jsonb,
  processing_status text not null default 'received',
  donation_id uuid references public.donations(id) on delete set null,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  unique(provider, provider_event_key)
);

create table public.receipts (
  id uuid primary key default gen_random_uuid(),
  receipt_number text unique not null,
  donation_id uuid unique not null references public.donations(id) on delete restrict,
  recipient_name text,
  recipient_email text,
  amount numeric(14,2) not null,
  currency text not null,
  document_url text,
  delivery_status text not null default 'pending',
  issued_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.reconciliation_runs (
  id uuid primary key default gen_random_uuid(),
  provider public.payment_provider not null,
  window_start timestamptz not null,
  window_end timestamptz not null,
  status text not null default 'running',
  started_by uuid references auth.users(id) on delete set null,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table public.reconciliation_items (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references public.reconciliation_runs(id) on delete cascade,
  donation_id uuid references public.donations(id) on delete set null,
  provider_reference text,
  expected_status text,
  observed_status text,
  resolution_status text not null default 'unresolved',
  resolution_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_events (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id text,
  summary jsonb not null default '{}'::jsonb,
  correlation_id text,
  created_at timestamptz not null default now()
);

create function public.current_admin_role()
returns public.admin_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.admin_profiles where user_id = auth.uid() and is_active = true
$$;

revoke all on function public.current_admin_role() from public;
grant execute on function public.current_admin_role() to authenticated;

alter table public.inquiries enable row level security;
alter table public.admin_profiles enable row level security;
alter table public.cms_stories enable row level security;
alter table public.cms_events enable row level security;
alter table public.cms_reports enable row level security;
alter table public.cms_campaigns enable row level security;
alter table public.donations enable row level security;
alter table public.payment_events enable row level security;
alter table public.receipts enable row level security;
alter table public.reconciliation_runs enable row level security;
alter table public.reconciliation_items enable row level security;
alter table public.audit_events enable row level security;

-- Published CMS content is intentionally public-safe.
create policy stories_public_read on public.cms_stories for select to anon, authenticated using (status = 'published');
create policy events_public_read on public.cms_events for select to anon, authenticated using (status = 'published');
create policy reports_public_read on public.cms_reports for select to anon, authenticated using (status = 'published');
create policy campaigns_public_read on public.cms_campaigns for select to anon, authenticated using (status = 'published');

-- Authenticated staff may read CMS records according to role.
create policy cms_stories_staff_read on public.cms_stories for select to authenticated using (public.current_admin_role() is not null);
create policy cms_events_staff_read on public.cms_events for select to authenticated using (public.current_admin_role() is not null);
create policy cms_reports_staff_read on public.cms_reports for select to authenticated using (public.current_admin_role() is not null);
create policy cms_campaigns_staff_read on public.cms_campaigns for select to authenticated using (public.current_admin_role() is not null);

create policy cms_stories_editor_write on public.cms_stories for all to authenticated
using (public.current_admin_role() in ('admin','content_editor','safeguarding_reviewer'))
with check (public.current_admin_role() in ('admin','content_editor','safeguarding_reviewer'));
create policy cms_events_editor_write on public.cms_events for all to authenticated
using (public.current_admin_role() in ('admin','content_editor'))
with check (public.current_admin_role() in ('admin','content_editor'));
create policy cms_reports_editor_write on public.cms_reports for all to authenticated
using (public.current_admin_role() in ('admin','content_editor','finance_reviewer'))
with check (public.current_admin_role() in ('admin','content_editor','finance_reviewer'));
create policy cms_campaigns_editor_write on public.cms_campaigns for all to authenticated
using (public.current_admin_role() in ('admin','content_editor','finance_reviewer'))
with check (public.current_admin_role() in ('admin','content_editor','finance_reviewer'));

create policy inquiries_staff_read on public.inquiries for select to authenticated
using (public.current_admin_role() in ('admin','viewer'));
create policy inquiries_admin_update on public.inquiries for update to authenticated
using (public.current_admin_role() = 'admin') with check (public.current_admin_role() = 'admin');

create policy admin_profiles_self_read on public.admin_profiles for select to authenticated using (user_id = auth.uid());
create policy admin_profiles_admin_all on public.admin_profiles for all to authenticated
using (public.current_admin_role() = 'admin') with check (public.current_admin_role() = 'admin');

create policy donations_finance_read on public.donations for select to authenticated
using (public.current_admin_role() in ('admin','finance_reviewer','viewer'));
create policy payment_events_finance_read on public.payment_events for select to authenticated
using (public.current_admin_role() in ('admin','finance_reviewer'));
create policy receipts_finance_read on public.receipts for select to authenticated
using (public.current_admin_role() in ('admin','finance_reviewer','viewer'));
create policy reconciliation_runs_finance_all on public.reconciliation_runs for all to authenticated
using (public.current_admin_role() in ('admin','finance_reviewer'))
with check (public.current_admin_role() in ('admin','finance_reviewer'));
create policy reconciliation_items_finance_all on public.reconciliation_items for all to authenticated
using (public.current_admin_role() in ('admin','finance_reviewer'))
with check (public.current_admin_role() in ('admin','finance_reviewer'));
create policy audit_admin_read on public.audit_events for select to authenticated
using (public.current_admin_role() = 'admin');

-- No anon insert policies are created. Public writes flow through validated Edge Functions.
-- No browser policy exists for payment_events, receipts, donation mutation, or audit writes.

commit;
