begin;

create table public.api_rate_limits (
  id bigint generated always as identity primary key,
  endpoint text not null,
  fingerprint_hash text not null,
  created_at timestamptz not null default now()
);

create index api_rate_limits_lookup
  on public.api_rate_limits(endpoint, fingerprint_hash, created_at desc);

alter table public.api_rate_limits enable row level security;

create sequence public.receipt_number_seq start 1;

create or replace function public.issue_receipt_for_donation(target_donation_id uuid)
returns public.receipts
language plpgsql
security definer
set search_path = public
as $$
declare
  d public.donations;
  r public.receipts;
  receipt_code text;
begin
  select * into d from public.donations where id = target_donation_id for update;
  if d.id is null then
    raise exception 'Donation not found';
  end if;
  if d.status <> 'paid' then
    raise exception 'Receipt can only be issued for a paid donation';
  end if;

  select * into r from public.receipts where donation_id = d.id;
  if r.id is not null then
    return r;
  end if;

  receipt_code := 'FRR-' || to_char(now() at time zone 'Africa/Nairobi', 'YYYY') || '-' || lpad(nextval('public.receipt_number_seq')::text, 7, '0');

  insert into public.receipts (
    receipt_number,
    donation_id,
    recipient_name,
    recipient_email,
    amount,
    currency,
    delivery_status
  ) values (
    receipt_code,
    d.id,
    d.donor_name,
    d.donor_email,
    d.amount,
    d.currency,
    case when d.donor_email is null then 'not_requested' else 'pending' end
  ) returning * into r;

  return r;
end;
$$;

revoke all on function public.issue_receipt_for_donation(uuid) from public;
grant execute on function public.issue_receipt_for_donation(uuid) to service_role;

commit;
