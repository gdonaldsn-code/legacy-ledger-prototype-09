-- Storage for AI-generated content: a cached per-account closure checklist
-- (so we don't re-call the model every time an account is viewed) and an AI
-- read of the executor's uploaded death certificate, shown alongside — never
-- instead of — the human verification_notes/verification_status review.

alter table public.discovered_accounts
  add column closure_checklist jsonb,
  add column closure_checklist_generated_at timestamptz;

alter table public.profiles
  add column verification_ai_summary text;
