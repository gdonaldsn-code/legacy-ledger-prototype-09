-- Private storage bucket for selfie / government ID verification uploads.
-- Files are stored at `${user_id}/selfie.<ext>` and `${user_id}/government-id.<ext>`
-- so the RLS-style storage policies below can key off the folder name.

insert into storage.buckets (id, name, public)
values ('verification-documents', 'verification-documents', false)
on conflict (id) do nothing;

create policy "verification_docs_select_own" on storage.objects
  for select using (
    bucket_id = 'verification-documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "verification_docs_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'verification-documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "verification_docs_update_own" on storage.objects
  for update using (
    bucket_id = 'verification-documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
