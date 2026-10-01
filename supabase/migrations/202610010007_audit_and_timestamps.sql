begin;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public;

create or replace function public.audit_resource_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  resource_key text;
  safe_summary jsonb;
begin
  resource_key := coalesce(
    case when tg_op = 'DELETE' then to_jsonb(old)->>'id' else to_jsonb(new)->>'id' end,
    case when tg_op = 'DELETE' then to_jsonb(old)->>'user_id' else to_jsonb(new)->>'user_id' end
  );

  safe_summary := jsonb_build_object('operation', lower(tg_op));

  if tg_table_name = 'inquiries' and tg_op = 'UPDATE' then
    safe_summary := safe_summary || jsonb_build_object(
      'old_status', to_jsonb(old)->>'status',
      'new_status', to_jsonb(new)->>'status'
    );
  elsif tg_table_name in ('cms_stories','cms_events','cms_reports','cms_campaigns') and tg_op = 'UPDATE' then
    safe_summary := safe_summary || jsonb_build_object(
      'old_status', to_jsonb(old)->>'status',
      'new_status', to_jsonb(new)->>'status'
    );
  elsif tg_table_name = 'admin_profiles' then
    safe_summary := safe_summary || jsonb_build_object(
      'role', case when tg_op = 'DELETE' then to_jsonb(old)->>'role' else to_jsonb(new)->>'role' end,
      'is_active', case when tg_op = 'DELETE' then to_jsonb(old)->>'is_active' else to_jsonb(new)->>'is_active' end
    );
  elsif tg_table_name in ('donations','receipts') and tg_op = 'UPDATE' then
    safe_summary := safe_summary || jsonb_build_object(
      'old_status', coalesce(to_jsonb(old)->>'status', to_jsonb(old)->>'delivery_status'),
      'new_status', coalesce(to_jsonb(new)->>'status', to_jsonb(new)->>'delivery_status')
    );
  end if;

  insert into public.audit_events(actor_id, action, resource_type, resource_id, summary)
  values (
    auth.uid(),
    tg_table_name || '.' || lower(tg_op),
    tg_table_name,
    resource_key,
    safe_summary
  );

  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

revoke all on function public.audit_resource_change() from public;

-- Canonical timestamps for browser/admin writes.
create trigger inquiries_set_updated_at before update on public.inquiries for each row execute function public.set_updated_at();
create trigger admin_profiles_set_updated_at before update on public.admin_profiles for each row execute function public.set_updated_at();
create trigger cms_stories_set_updated_at before update on public.cms_stories for each row execute function public.set_updated_at();
create trigger cms_events_set_updated_at before update on public.cms_events for each row execute function public.set_updated_at();
create trigger cms_reports_set_updated_at before update on public.cms_reports for each row execute function public.set_updated_at();
create trigger cms_campaigns_set_updated_at before update on public.cms_campaigns for each row execute function public.set_updated_at();
create trigger donations_set_updated_at before update on public.donations for each row execute function public.set_updated_at();
create trigger reconciliation_items_set_updated_at before update on public.reconciliation_items for each row execute function public.set_updated_at();

-- Minimal, privacy-safe audit metadata. Full beneficiary/contact text is deliberately excluded.
create trigger inquiries_audit after update on public.inquiries for each row execute function public.audit_resource_change();
create trigger admin_profiles_audit after insert or update or delete on public.admin_profiles for each row execute function public.audit_resource_change();
create trigger cms_stories_audit after insert or update or delete on public.cms_stories for each row execute function public.audit_resource_change();
create trigger cms_events_audit after insert or update or delete on public.cms_events for each row execute function public.audit_resource_change();
create trigger cms_reports_audit after insert or update or delete on public.cms_reports for each row execute function public.audit_resource_change();
create trigger cms_campaigns_audit after insert or update or delete on public.cms_campaigns for each row execute function public.audit_resource_change();
create trigger donations_audit after update on public.donations for each row execute function public.audit_resource_change();
create trigger receipts_audit after update on public.receipts for each row execute function public.audit_resource_change();

commit;
