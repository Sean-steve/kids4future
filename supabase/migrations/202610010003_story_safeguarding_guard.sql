begin;

create or replace function public.guard_story_safeguarding_approval()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  actor_role public.admin_role;
begin
  select role into actor_role
  from public.admin_profiles
  where user_id = auth.uid() and is_active = true;

  if new.safeguarding_approved_at is distinct from old.safeguarding_approved_at
     or new.safeguarding_approved_by is distinct from old.safeguarding_approved_by
     or new.consent_reference is distinct from old.consent_reference then
    if actor_role not in ('admin','safeguarding_reviewer') then
      raise exception 'Safeguarding approval fields require safeguarding reviewer or admin role';
    end if;
  end if;

  if new.status = 'published' and old.status is distinct from 'published' and new.safeguarding_required then
    if new.safeguarding_approved_at is null
       or new.safeguarding_approved_by is null
       or new.consent_reference is null then
      raise exception 'Story cannot be published before safeguarding approval and consent reference';
    end if;
  end if;

  return new;
end;
$$;

create trigger cms_stories_safeguarding_guard
before update on public.cms_stories
for each row execute function public.guard_story_safeguarding_approval();

revoke all on function public.guard_story_safeguarding_approval() from public;

commit;
