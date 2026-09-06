-- =============================================================================
-- Apollo Labs — initial schema and row level security foundation
--
-- Scope: tables, constraints, indexes, triggers, helper functions, RLS
-- policies, and a private storage bucket. No seed data, no auth UI, no
-- frontend wiring.
--
-- Security model in one line: every application table denies by default, and
-- every privilege escalation path (role changes, status changes, timestamp
-- forgery, self-approval) is blocked by a trigger rather than by RLS alone.
-- =============================================================================

-- =============================================================================
-- 1. TABLES
-- =============================================================================

-- One row per auth user. Created automatically by a trigger on auth.users.
create table if not exists public.profiles (
  id              uuid primary key references auth.users (id) on delete cascade,
  full_name       text        not null,
  email           text,
  graduation_year integer,
  bio             text,
  avatar_url      text,
  role            text        not null default 'member',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint profiles_role_check
    check (role in ('member', 'reviewer', 'admin')),
  constraint profiles_full_name_not_blank
    check (length(btrim(full_name)) > 0),
  constraint profiles_graduation_year_range
    check (graduation_year is null or graduation_year between 1900 and 2100)
);

comment on table public.profiles is
  'Public-facing user record, one per auth.users row. role is trigger-protected.';

-- Projects. `status` is the authorization-relevant column and is protected by
-- public.guard_project_status(); do not relax that trigger.
create table if not exists public.projects (
  id              uuid primary key default gen_random_uuid(),
  slug            text        not null unique,
  title           text        not null,
  summary         text        not null,
  abstract        text,
  discipline      text        not null,
  project_type    text        not null,
  status          text        not null default 'draft',
  cover_image_url text,
  created_by      uuid        not null references public.profiles (id) on delete restrict,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  submitted_at    timestamptz,
  published_at    timestamptz,
  constraint projects_status_check
    check (status in ('draft', 'submitted', 'changes_requested',
                      'approved', 'published', 'archived')),
  constraint projects_type_check
    check (project_type in ('Research Paper', 'Engineering', 'Software', 'Experiment')),
  -- Discipline is intentionally free text: the taxonomy is expected to grow.
  constraint projects_discipline_not_blank
    check (length(btrim(discipline)) > 0),
  constraint projects_title_not_blank
    check (length(btrim(title)) > 0),
  constraint projects_summary_not_blank
    check (length(btrim(summary)) > 0),
  constraint projects_slug_format
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint projects_published_needs_timestamp
    check (status <> 'published' or published_at is not null)
);

comment on column public.projects.status is
  'Lifecycle state. Transitions are enforced by public.guard_project_status().';

-- Many-to-many authorship/collaboration.
create table if not exists public.project_members (
  project_id   uuid        not null references public.projects (id) on delete cascade,
  user_id      uuid        not null references public.profiles (id) on delete cascade,
  member_role  text        not null default 'author',
  author_order integer,
  created_at   timestamptz not null default now(),
  primary key (project_id, user_id),
  constraint project_members_role_check
    check (member_role in ('author', 'collaborator', 'mentor')),
  constraint project_members_author_order_check
    check (author_order is null or author_order >= 0)
);

-- Metadata only. Bytes live in Supabase Storage; storage_path points at them.
create table if not exists public.project_files (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid        not null references public.projects (id) on delete cascade,
  uploaded_by  uuid        not null references public.profiles (id) on delete restrict,
  file_name    text        not null,
  storage_path text        not null unique,
  file_type    text,
  mime_type    text,
  file_size    bigint,
  created_at   timestamptz not null default now(),
  constraint project_files_name_not_blank
    check (length(btrim(file_name)) > 0),
  constraint project_files_size_check
    check (file_size is null or file_size >= 0)
);

comment on table public.project_files is
  'Storage metadata only. Never store file bytes in Postgres.';

-- Append-only audit log of review decisions.
create table if not exists public.project_reviews (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid        not null references public.projects (id) on delete cascade,
  reviewer_id uuid        not null references public.profiles (id) on delete restrict,
  action      text        not null,
  comment     text,
  created_at  timestamptz not null default now(),
  constraint project_reviews_action_check
    check (action in ('submitted', 'changes_requested', 'approved',
                      'published', 'archived'))
);

comment on table public.project_reviews is
  'Append-only. Status transitions are logged automatically by trigger.';

-- =============================================================================
-- 2. INDEXES
-- =============================================================================

create index if not exists projects_status_idx        on public.projects (status);
create index if not exists projects_created_by_idx    on public.projects (created_by);
create index if not exists projects_discipline_idx    on public.projects (discipline);
-- Partial: the public gallery only ever reads published rows, newest first.
create index if not exists projects_published_at_idx
  on public.projects (published_at desc) where status = 'published';

create index if not exists project_members_user_id_idx on public.project_members (user_id);
create index if not exists project_files_project_id_idx on public.project_files (project_id);
create index if not exists project_reviews_project_id_idx
  on public.project_reviews (project_id, created_at desc);

-- =============================================================================
-- 3. HELPER FUNCTIONS
--
-- All are SECURITY DEFINER so they bypass RLS. That is deliberate: policies on
-- projects reference project_members and vice versa, which would otherwise
-- recurse. Each is STABLE, pinned to an empty search_path, and returns only a
-- boolean about the *calling* user — no row data leaks through them.
-- =============================================================================

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.role = 'admin'
  );
$$;

create or replace function public.is_reviewer_or_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.role in ('reviewer', 'admin')
  );
$$;

create or replace function public.is_project_owner(p_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.projects p
    where p.id = p_project_id and p.created_by = (select auth.uid())
  );
$$;

create or replace function public.is_project_member(p_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.project_members m
    where m.project_id = p_project_id and m.user_id = (select auth.uid())
  );
$$;

create or replace function public.is_project_published(p_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.projects p
    where p.id = p_project_id and p.status = 'published'
  );
$$;

-- Owner or member, and the project is still in a member-editable state.
create or replace function public.can_edit_project(p_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.projects p
    where p.id = p_project_id
      and p.status in ('draft', 'changes_requested')
      and (
        p.created_by = (select auth.uid())
        or exists (
          select 1 from public.project_members m
          where m.project_id = p.id and m.user_id = (select auth.uid())
        )
      )
  );
$$;

create or replace function public.can_view_project(p_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.is_reviewer_or_admin() or exists (
    select 1 from public.projects p
    where p.id = p_project_id
      and (
        p.status = 'published'
        or p.created_by = (select auth.uid())
        or exists (
          select 1 from public.project_members m
          where m.project_id = p.id and m.user_id = (select auth.uid())
        )
      )
  );
$$;

-- =============================================================================
-- 4. TRIGGER FUNCTIONS
-- =============================================================================

-- Shared updated_at stamp for every table that has the column.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Provision a profile when an auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  v_year integer;
begin
  begin
    v_year := nullif(v_meta ->> 'graduation_year', '')::integer;
  exception when others then
    v_year := null;   -- never block signup on a malformed metadata value
  end;

  insert into public.profiles (id, full_name, email, graduation_year)
  values (
    new.id,
    coalesce(
      nullif(btrim(v_meta ->> 'full_name'), ''),
      nullif(btrim(v_meta ->> 'name'), ''),
      nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
      'Apollo Member'
    ),
    new.email,
    v_year
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Nobody promotes themselves. auth.uid() is null for service_role and for the
-- SQL editor, which is how the first admin is bootstrapped.
create or replace function public.guard_profile_changes()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.id is distinct from old.id then
    raise exception 'profiles.id cannot be changed';
  end if;

  if new.role is distinct from old.role
     and (select auth.uid()) is not null
     and not public.is_admin() then
    raise exception 'Only an administrator can change a profile role'
      using errcode = '42501';
  end if;

  return new;
end;
$$;

-- The core authorization guard. RLS decides which rows are visible; this
-- decides which state changes are legal, so a permissive policy cannot on its
-- own let a member publish their own work.
create or replace function public.guard_project_status()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor      uuid    := (select auth.uid());
  v_privileged boolean := public.is_reviewer_or_admin();
  v_admin      boolean := public.is_admin();
begin
  -- v_actor is null for service_role / SQL editor: trusted server context.
  if tg_op = 'INSERT' then
    if v_actor is not null and not v_privileged and new.status <> 'draft' then
      raise exception 'New projects must start in draft status'
        using errcode = '42501';
    end if;
    if new.status = 'submitted' and new.submitted_at is null then
      new.submitted_at := now();
    end if;
    if new.status = 'published' and new.published_at is null then
      new.published_at := now();
    end if;
    return new;
  end if;

  if new.id is distinct from old.id then
    raise exception 'projects.id cannot be changed';
  end if;

  if new.created_by is distinct from old.created_by
     and v_actor is not null and not v_admin then
    raise exception 'projects.created_by cannot be reassigned'
      using errcode = '42501';
  end if;

  if new.status is distinct from old.status then
    if v_actor is null then
      null;                                     -- trusted server context

    elsif v_privileged then
      -- A reviewer may not sign off on work they authored. Admins are exempt
      -- so a small founding team is not deadlocked; tighten by removing the
      -- `not v_admin` term below.
      if not v_admin
         and new.status in ('approved', 'published')
         and (old.created_by = v_actor or public.is_project_member(old.id)) then
        raise exception 'Reviewers cannot approve or publish their own project'
          using errcode = '42501';
      end if;

      if not (
           (old.status = 'draft'             and new.status in ('submitted', 'archived'))
        or (old.status = 'submitted'         and new.status in ('changes_requested', 'approved', 'archived'))
        or (old.status = 'changes_requested' and new.status in ('submitted', 'archived'))
        or (old.status = 'approved'          and new.status in ('published', 'changes_requested', 'archived'))
        or (old.status = 'published'         and new.status in ('archived'))
        or (old.status = 'archived'          and new.status in ('draft'))
      ) then
        raise exception 'Invalid status transition: % -> %', old.status, new.status
          using errcode = '22023';
      end if;

    else
      -- Ordinary member: submit and resubmit, nothing else.
      if not (
           (old.status = 'draft'             and new.status = 'submitted')
        or (old.status = 'changes_requested' and new.status = 'submitted')
      ) then
        raise exception
          'Members may only submit a draft or resubmit after changes were requested (attempted % -> %)',
          old.status, new.status
          using errcode = '42501';
      end if;
    end if;

    if new.status = 'submitted' then
      new.submitted_at := now();
    end if;
    if new.status = 'published' and old.status <> 'published' then
      new.published_at := coalesce(new.published_at, now());
    end if;
  end if;

  -- Lifecycle timestamps are server-managed; members never write them.
  if v_actor is not null and not v_privileged then
    new.published_at := old.published_at;
    if new.status is not distinct from old.status then
      new.submitted_at := old.submitted_at;
    end if;
  end if;

  return new;
end;
$$;

-- Audit entries are written by the database, not by the client.
create or replace function public.log_project_status_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.status is distinct from old.status
     and new.status in ('submitted', 'changes_requested', 'approved',
                        'published', 'archived') then
    insert into public.project_reviews (project_id, reviewer_id, action)
    values (new.id, coalesce((select auth.uid()), new.created_by), new.status);
  end if;
  return null;
end;
$$;

-- =============================================================================
-- 5. TRIGGERS
-- =============================================================================

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

drop trigger if exists guard_profile_changes on public.profiles;
create trigger guard_profile_changes
  before update on public.profiles
  for each row execute function public.guard_profile_changes();

drop trigger if exists guard_project_status on public.projects;
create trigger guard_project_status
  before insert or update on public.projects
  for each row execute function public.guard_project_status();

drop trigger if exists log_project_status_change on public.projects;
create trigger log_project_status_change
  after update on public.projects
  for each row execute function public.log_project_status_change();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================================================
-- 6. PRIVILEGES
--
-- Supabase default privileges grant broadly to anon/authenticated, so revoke
-- first and re-grant the minimum. RLS is the gate; this is the second lock.
-- =============================================================================

revoke all on public.profiles        from anon, authenticated;
revoke all on public.projects        from anon, authenticated;
revoke all on public.project_members from anon, authenticated;
revoke all on public.project_files   from anon, authenticated;
revoke all on public.project_reviews from anon, authenticated;

-- Anonymous visitors read published work and nothing else.
grant select on public.projects      to anon;
grant select on public.project_files to anon;

grant select, insert, update         on public.profiles        to authenticated;
grant select, insert, update, delete on public.projects        to authenticated;
grant select, insert, update, delete on public.project_members to authenticated;
grant select, insert, update, delete on public.project_files   to authenticated;
grant select, insert                 on public.project_reviews to authenticated;

grant execute on function public.is_admin()                  to anon, authenticated;
grant execute on function public.is_reviewer_or_admin()      to anon, authenticated;
grant execute on function public.is_project_owner(uuid)      to anon, authenticated;
grant execute on function public.is_project_member(uuid)     to anon, authenticated;
grant execute on function public.is_project_published(uuid)  to anon, authenticated;
grant execute on function public.can_edit_project(uuid)      to anon, authenticated;
grant execute on function public.can_view_project(uuid)      to anon, authenticated;

-- =============================================================================
-- 7. ROW LEVEL SECURITY
-- =============================================================================

alter table public.profiles        enable row level security;
alter table public.projects        enable row level security;
alter table public.project_members enable row level security;
alter table public.project_files   enable row level security;
alter table public.project_reviews enable row level security;

-- ---------- profiles --------------------------------------------------------
-- No anon policies: the profile directory is not public.

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select to authenticated
  using (id = (select auth.uid()));

drop policy if exists profiles_select_staff on public.profiles;
create policy profiles_select_staff on public.profiles
  for select to authenticated
  using (public.is_reviewer_or_admin());

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles
  for insert to authenticated
  with check (id = (select auth.uid()));

-- Role changes are rejected by guard_profile_changes(), not by this policy.
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

drop policy if exists profiles_update_admin on public.profiles;
create policy profiles_update_admin on public.profiles
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------- projects --------------------------------------------------------

drop policy if exists projects_select_public on public.projects;
create policy projects_select_public on public.projects
  for select to anon
  using (status = 'published');

drop policy if exists projects_select_authenticated on public.projects;
create policy projects_select_authenticated on public.projects
  for select to authenticated
  using (
    status = 'published'
    or created_by = (select auth.uid())
    or public.is_project_member(id)
    or public.is_reviewer_or_admin()
  );

drop policy if exists projects_insert_own on public.projects;
create policy projects_insert_own on public.projects
  for insert to authenticated
  with check (created_by = (select auth.uid()));

-- Members edit only while the project is theirs to edit. The resulting status
-- is bounded here and the transition itself is validated by trigger.
drop policy if exists projects_update_member on public.projects;
create policy projects_update_member on public.projects
  for update to authenticated
  using (
    status in ('draft', 'changes_requested')
    and (created_by = (select auth.uid()) or public.is_project_member(id))
  )
  with check (
    status in ('draft', 'submitted', 'changes_requested')
    and (created_by = (select auth.uid()) or public.is_project_member(id))
  );

drop policy if exists projects_update_staff on public.projects;
create policy projects_update_staff on public.projects
  for update to authenticated
  using (public.is_reviewer_or_admin())
  with check (public.is_reviewer_or_admin());

drop policy if exists projects_delete_own_draft on public.projects;
create policy projects_delete_own_draft on public.projects
  for delete to authenticated
  using (status = 'draft' and created_by = (select auth.uid()));

drop policy if exists projects_delete_admin on public.projects;
create policy projects_delete_admin on public.projects
  for delete to authenticated
  using (public.is_admin());

-- ---------- project_members -------------------------------------------------

drop policy if exists project_members_select on public.project_members;
create policy project_members_select on public.project_members
  for select to authenticated
  using (public.can_view_project(project_id));

-- Only the project creator manages the roster, so no one can add themselves
-- to a project they do not own.
drop policy if exists project_members_insert_owner on public.project_members;
create policy project_members_insert_owner on public.project_members
  for insert to authenticated
  with check (
    public.is_project_owner(project_id)
    and public.can_edit_project(project_id)
  );

drop policy if exists project_members_update_owner on public.project_members;
create policy project_members_update_owner on public.project_members
  for update to authenticated
  using (public.is_project_owner(project_id) and public.can_edit_project(project_id))
  with check (public.is_project_owner(project_id) and public.can_edit_project(project_id));

drop policy if exists project_members_delete_owner on public.project_members;
create policy project_members_delete_owner on public.project_members
  for delete to authenticated
  using (public.is_project_owner(project_id) and public.can_edit_project(project_id));

drop policy if exists project_members_delete_admin on public.project_members;
create policy project_members_delete_admin on public.project_members
  for delete to authenticated
  using (public.is_admin());

-- ---------- project_files ---------------------------------------------------

drop policy if exists project_files_select_public on public.project_files;
create policy project_files_select_public on public.project_files
  for select to anon
  using (public.is_project_published(project_id));

drop policy if exists project_files_select_authenticated on public.project_files;
create policy project_files_select_authenticated on public.project_files
  for select to authenticated
  using (public.can_view_project(project_id));

drop policy if exists project_files_insert_member on public.project_files;
create policy project_files_insert_member on public.project_files
  for insert to authenticated
  with check (
    public.can_edit_project(project_id)
    and uploaded_by = (select auth.uid())
  );

drop policy if exists project_files_update_member on public.project_files;
create policy project_files_update_member on public.project_files
  for update to authenticated
  using (public.can_edit_project(project_id))
  with check (public.can_edit_project(project_id));

drop policy if exists project_files_delete_member on public.project_files;
create policy project_files_delete_member on public.project_files
  for delete to authenticated
  using (public.can_edit_project(project_id));

drop policy if exists project_files_delete_admin on public.project_files;
create policy project_files_delete_admin on public.project_files
  for delete to authenticated
  using (public.is_admin());

-- ---------- project_reviews -------------------------------------------------
-- Read is narrower than can_view_project(): review notes on a published
-- project stay between its team and staff, not every signed-in user.

drop policy if exists project_reviews_select on public.project_reviews;
create policy project_reviews_select on public.project_reviews
  for select to authenticated
  using (
    public.is_reviewer_or_admin()
    or public.is_project_owner(project_id)
    or public.is_project_member(project_id)
  );

-- Only staff may write review events, and only in their own name. Ordinary
-- transitions are recorded automatically by log_project_status_change().
drop policy if exists project_reviews_insert_staff on public.project_reviews;
create policy project_reviews_insert_staff on public.project_reviews
  for insert to authenticated
  with check (
    public.is_reviewer_or_admin()
    and reviewer_id = (select auth.uid())
  );

-- No update or delete policies: the audit log is append-only.

-- =============================================================================
-- 8. STORAGE FOUNDATION
--
-- A private bucket only. With no policies on storage.objects, nothing but the
-- service role can read or write it — object policies land in a later step,
-- alongside the upload flow.
-- =============================================================================

insert into storage.buckets (id, name, public)
values ('project-files', 'project-files', false)
on conflict (id) do nothing;
