-- Core schema for Legacy Ledger: profiles + auth wiring.
-- Mirrors the pattern used in the house-account project: RLS keyed on auth.uid(),
-- with a trigger that provisions a profile (and starter data) on signup.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  estate_planning_status text check (estate_planning_status in ('estate', 'will', 'both', 'neither')),
  credit_pull_authorized boolean not null default false,
  selfie_path text,
  government_id_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- Auto-create a profile (and seed starter data — see following migrations)
-- whenever a new auth user signs up. Registration.tsx passes estate_planning_status,
-- credit_pull_authorized via signUp's options.data (raw_user_meta_data).
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, estate_planning_status, credit_pull_authorized)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'estate_planning_status',
    coalesce((new.raw_user_meta_data ->> 'credit_pull_authorized')::boolean, false)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
