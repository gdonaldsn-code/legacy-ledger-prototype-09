-- Captures which persona path a user came in through (the PersonaFork on the
-- homepage / the /plan-ahead vs /find-accounts landing pages), so Registration
-- and Dashboard can tailor the experience instead of treating every signup
-- identically. Passed through supabase.auth.signUp's options.data.

alter table public.profiles
  add column intent text check (intent in ('planning', 'discovery'));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, estate_planning_status, credit_pull_authorized, intent)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'estate_planning_status',
    coalesce((new.raw_user_meta_data ->> 'credit_pull_authorized')::boolean, false),
    new.raw_user_meta_data ->> 'intent'
  );
  return new;
end;
$$;
