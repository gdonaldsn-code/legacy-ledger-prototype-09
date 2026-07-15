-- Per-user tables for discovered accounts, the "rolodex" of important contacts,
-- and legal documents. All protected by RLS keyed on auth.uid() = user_id.

create table public.discovered_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  institution text not null,
  account_type text not null,
  account_number_mask text,
  balance numeric(14, 2) not null default 0,
  last_activity_at timestamptz,
  status text not null default 'active' check (status in ('active', 'dormant', 'forgotten')),
  risk text not null default 'low' check (risk in ('low', 'medium', 'high')),
  created_at timestamptz not null default now()
);

alter table public.discovered_accounts enable row level security;

create policy "discovered_accounts_select_own" on public.discovered_accounts
  for select using (auth.uid() = user_id);
create policy "discovered_accounts_insert_own" on public.discovered_accounts
  for insert with check (auth.uid() = user_id);
create policy "discovered_accounts_update_own" on public.discovered_accounts
  for update using (auth.uid() = user_id);
create policy "discovered_accounts_delete_own" on public.discovered_accounts
  for delete using (auth.uid() = user_id);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  role text,
  category text not null check (category in ('legal', 'financial', 'insurance', 'medical', 'personal')),
  firm text,
  phone text,
  email text,
  address text,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.contacts enable row level security;

create policy "contacts_select_own" on public.contacts
  for select using (auth.uid() = user_id);
create policy "contacts_insert_own" on public.contacts
  for insert with check (auth.uid() = user_id);
create policy "contacts_update_own" on public.contacts
  for update using (auth.uid() = user_id);
create policy "contacts_delete_own" on public.contacts
  for delete using (auth.uid() = user_id);

create table public.legal_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  doc_type text not null check (doc_type in ('poa', 'will', 'healthcare', 'trust', 'contract')),
  status text not null default 'current' check (status in ('current', 'needs-review', 'expired')),
  last_updated date,
  next_review text,
  attorney text,
  location text,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.legal_documents enable row level security;

create policy "legal_documents_select_own" on public.legal_documents
  for select using (auth.uid() = user_id);
create policy "legal_documents_insert_own" on public.legal_documents
  for insert with check (auth.uid() = user_id);
create policy "legal_documents_update_own" on public.legal_documents
  for update using (auth.uid() = user_id);
create policy "legal_documents_delete_own" on public.legal_documents
  for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Starter data seeding
--
-- The product's real discovery/rolodex/legal-doc features don't exist yet
-- (see CLAUDE.md migration notes) — until they do, every new user is seeded
-- with the same illustrative rows the old static mock used, but now as real,
-- editable, per-user data instead of a hardcoded array shown to everyone.
-- Replace this trigger's contents once real account-linking / data entry ships.
-- ---------------------------------------------------------------------------
create function public.seed_starter_data()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.discovered_accounts
    (user_id, institution, account_type, account_number_mask, balance, last_activity_at, status, risk)
  values
    (new.id, 'Chase Bank', 'Checking Account', '****1234', 12450.00, now() - interval '3 days', 'active', 'low'),
    (new.id, 'Fidelity Investments', '401(k) Account', '****5678', 127890.00, now() - interval '7 days', 'active', 'low'),
    (new.id, 'Coinbase', 'Cryptocurrency Wallet', '****9012', 8750.00, now() - interval '2 months', 'dormant', 'medium'),
    (new.id, 'Old National Bank', 'Savings Account', '****3456', 2100.00, now() - interval '6 months', 'forgotten', 'high');

  insert into public.contacts (user_id, name, role, category, firm, phone, email, address, notes)
  values
    (new.id, 'Margaret Chen, CPA', 'Certified Public Accountant', 'financial', 'Chen & Associates Tax Advisory', '(555) 234-5678', 'm.chen@chenassociates.com', '450 Financial Plaza, Suite 300, New York, NY 10005', 'Handles annual tax filings and quarterly estimates.'),
    (new.id, 'Robert A. Whitfield, Esq.', 'Estate Planning Attorney', 'legal', 'Whitfield & Grant LLP', '(555) 876-5432', 'rwhitfield@whitfieldgrant.com', '200 Legal Center Dr, Suite 1200, New York, NY 10006', 'Last will update: March 2025. Trust review scheduled for Q3.'),
    (new.id, 'David Kim', 'Financial Advisor (CFP®)', 'financial', 'Vanguard Wealth Management', '(555) 345-6789', 'david.kim@vanguardwm.com', '800 Investment Blvd, Suite 500, New York, NY 10007', 'Quarterly portfolio review. Manages retirement and brokerage accounts.'),
    (new.id, 'Sarah Mitchell', 'Insurance Agent', 'insurance', 'Northwestern Mutual', '(555) 456-7890', 's.mitchell@northwesternmutual.com', null, 'Handles life insurance, umbrella policy. Annual review in September.'),
    (new.id, 'Dr. James Patterson', 'Primary Care Physician', 'medical', 'NYC Medical Group', '(555) 567-8901', 'jpatterson@nycmedgroup.com', '125 Health Ave, New York, NY 10010', 'Annual physical due in June. Has complete medical history on file.'),
    (new.id, 'Linda Vasquez', 'Power of Attorney / Executor', 'personal', null, '(555) 678-9012', 'linda.vasquez@email.com', null, 'Designated POA and estate executor. Emergency contact.');

  insert into public.legal_documents (user_id, name, doc_type, status, last_updated, next_review, attorney, location, notes)
  values
    (new.id, 'Durable Power of Attorney', 'poa', 'current', '2025-01-15', 'January 2026', 'Robert A. Whitfield, Esq.', 'Safe deposit box at Chase Bank, Main St. branch', 'Designates Linda Vasquez as agent. Covers financial and legal matters.'),
    (new.id, 'Healthcare Power of Attorney', 'healthcare', 'current', '2025-01-15', 'January 2026', 'Robert A. Whitfield, Esq.', 'Safe deposit box at Chase Bank; copy with Dr. Patterson', 'Designates Linda Vasquez as healthcare proxy. Includes HIPAA authorization.'),
    (new.id, 'Last Will & Testament', 'will', 'current', '2025-03-10', 'March 2027', 'Robert A. Whitfield, Esq.', 'Whitfield & Grant LLP office vault', 'Updated to include new beneficiary designations. Executor: Linda Vasquez.'),
    (new.id, 'Advance Healthcare Directive', 'healthcare', 'needs-review', '2023-06-05', 'Overdue — review recommended', 'Robert A. Whitfield, Esq.', 'Safe deposit box; copy with Dr. Patterson and hospital', 'Living will with end-of-life care preferences. Needs update per new state laws.'),
    (new.id, 'Revocable Living Trust', 'trust', 'current', '2025-03-10', null, 'Robert A. Whitfield, Esq.', 'Whitfield & Grant LLP office vault; digital copy on secure drive', 'Includes real estate, investment accounts, and life insurance proceeds. Successor trustee: Linda Vasquez.'),
    (new.id, 'Property Deed & Title', 'contract', 'current', '2022-08-20', null, null, 'County Recorder''s Office; copy in safe deposit box', 'Primary residence. Title held in trust.'),
    (new.id, 'Long-Term Care Insurance Policy', 'contract', 'current', '2024-11-01', 'November 2025', null, 'Home filing cabinet; digital copy with insurance agent', 'Policy with Northwestern Mutual. $200/day benefit, 3-year coverage period.'),
    (new.id, 'Prenuptial Agreement', 'contract', 'current', '2010-05-12', null, 'Whitfield & Grant LLP', 'Attorney''s office vault', 'Outlines asset division and spousal support terms.');

  return new;
end;
$$;

create trigger on_profile_created_seed_starter_data
  after insert on public.profiles
  for each row execute procedure public.seed_starter_data();
