-- Executor verification: the actual hard/regulated part of the posthumous
-- discovery flow. A death certificate (and ideally Letters Testamentary/
-- Administration) is required before Legacy Ledger acts on someone else's
-- accounts. This tracks upload + a manual review status — there is
-- deliberately no auto-approval; a real person needs to confirm authority
-- before any account-closure action is taken on a user's behalf.

alter table public.profiles
  add column verification_status text not null default 'not_started'
    check (verification_status in ('not_started', 'pending_review', 'verified', 'rejected')),
  add column death_certificate_path text,
  add column letters_testamentary_path text,
  add column verification_notes text,
  add column verification_submitted_at timestamptz;

-- Private bucket for executor documents, separate from the selfie/ID bucket
-- used at registration so the two document types stay clearly scoped.
insert into storage.buckets (id, name, public)
values ('executor-documents', 'executor-documents', false)
on conflict (id) do nothing;

create policy "executor_docs_select_own" on storage.objects
  for select using (
    bucket_id = 'executor-documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "executor_docs_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'executor-documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "executor_docs_update_own" on storage.objects
  for update using (
    bucket_id = 'executor-documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
