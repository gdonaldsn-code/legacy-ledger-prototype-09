# CLAUDE.md

Guidance for Claude Code when working in this repo.

## Project

Legacy Ledger — a product for helping families discover and manage the
financial accounts of a deceased loved one (unclaimed assets, account
closures, beneficiary tracking), plus proactive digital estate planning for
people getting their own affairs in order. Two personas are served from
separate landing pages: "I Need Help Now" (discovery/executor) and "I'm
Planning Ahead" (planning).

Originally scaffolded in Lovable, then migrated to a normal git workflow and
built out with a real Supabase backend and Stripe payments. No Lovable
tooling remains (see "Migration notes" below).

Live: https://legacy-ledger-henna.vercel.app

## Stack

- Vite 5 + React 18 + TypeScript
- shadcn-ui components (Radix primitives) in `src/components/ui` — generated
  code; prefer composing over hand-editing these unless fixing a real bug
- Tailwind CSS for styling, warm/calm design tokens in `src/index.css`
- react-router-dom for routing (`src/App.tsx`)
- Supabase: Postgres + Auth + Storage (see "Backend" below)
- Stripe Checkout for payments (see "Payments" below)
- react-hook-form + zod for forms
- recharts for charts, lucide-react for icons

## Backend (Supabase)

Project ref: `lkecjuriszwkxrjjkrzg`. Client init in
`src/integrations/supabase/client.ts`, reading `VITE_SUPABASE_URL` /
`VITE_SUPABASE_PUBLISHABLE_KEY` from `.env` (gitignored — see `.env.example`).

- `supabase/migrations/*.sql` — schema, RLS policies, and triggers. Apply with
  `npx supabase db push` after linking (`npx supabase link`).
- Tables: `profiles` (incl. `intent`, executor `verification_status` +
  document paths), `discovered_accounts` (incl. beneficiary tracking fields),
  `contacts`, `legal_documents`, `rewards_accounts`. All RLS-scoped to
  `auth.uid() = user_id`.
- Storage buckets: `verification-documents` (selfie/gov ID at registration),
  `executor-documents` (death certificate / Letters Testamentary) — both
  private, folder-scoped RLS via `storage.foldername(name)`.
- Triggers: `handle_new_user()` provisions a profile row on signup;
  `seed_starter_data()` seeds illustrative demo accounts/contacts/docs/rewards
  for new users.
- `src/integrations/supabase/types.ts` is hand-maintained. Regenerate once
  linked: `npx supabase gen types typescript --linked > src/integrations/supabase/types.ts`
- `src/hooks/useAuth.tsx` / `useProfile.ts` — session and profile row access.

## Payments (Stripe)

`src/integrations/stripe/client.ts` wraps `@stripe/stripe-js`, reading
`VITE_STRIPE_PUBLISHABLE_KEY` from `.env`.

Checkout Sessions are created server-side by the Supabase Edge Function at
`supabase/functions/create-checkout-session/index.ts` — the Stripe **secret**
key never reaches the client. Plan names/prices are defined inline in that
function (mirrors `src/components/PricingSection.tsx`); there are no
pre-created Stripe Price objects to keep in sync.

Deploy/config (one-time, run by a human with dashboard access):
```
npx supabase secrets set STRIPE_SECRET_KEY=sk_test_...
npx supabase functions deploy create-checkout-session
```

`PricingSection.tsx`'s CTA buttons call this function via
`supabase.functions.invoke` for logged-in users and redirect to the returned
Checkout URL; logged-out users are sent to `/register` first.

No webhook handler exists yet — nothing currently marks a `profiles` row as
"paid" after a successful checkout. Add a `stripe-webhook` Edge Function
listening for `checkout.session.completed` if/when entitlements need to gate
app features.

## Structure

```
src/
  pages/          route-level views (Index, Registration, Login, Dashboard,
                   RewardsPerks, Pricing, PlanAhead, FindAccounts, NotFound)
  components/     marketing sections (Hero, Pricing, PersonaFork, Footer, etc.)
  components/discovery/   account-discovery flow (scanning, modal, results,
                          beneficiary tracker)
  components/rewards/     rewards/perks/legal-docs tabs
  components/ui/  shadcn-generated primitives — treat as vendored
  hooks/          useAuth, useProfile, use-mobile, use-toast
  integrations/   supabase/ and stripe/ clients
  lib/            utils.ts (cn() helper etc.)
supabase/
  migrations/     schema SQL, applied in filename order
  functions/      Deno Edge Functions (create-checkout-session)
```

Routes are registered in `src/App.tsx`, wrapped in `AuthProvider`. New routes
go above the catch-all `*` route. `/dashboard` and `/rewards` are behind
`ProtectedRoute`.

## Commands

- `npm i` — install deps
- `npm run dev` — dev server on port 8080
- `npm run build` — production build
- `npm run lint` — eslint
- `npm run preview` — preview a production build
- `npx supabase db push` — apply pending migrations to the linked project
- `npx supabase functions deploy <name>` — deploy an Edge Function
- `npx vercel --prod` — deploy to production

## Conventions

- Path alias `@/` maps to `src/` (see `vite.config.ts` / `tsconfig.json`)
- Use existing shadcn components from `src/components/ui` instead of adding new
  UI libraries
- Keep new page-level components in `src/pages`, feature components grouped by
  domain (mirror `discovery/` and `rewards/` pattern) rather than one flat folder
- Never commit real Stripe/Supabase secret keys. Only the Supabase
  *publishable* anon key and Stripe *publishable* key belong in `.env`/client
  code — secret keys live in Supabase's secret store, set via `supabase secrets set`.

## Migration notes (from Lovable)

- Removed `lovable-tagger` dependency and the `componentTagger()` Vite plugin
  (dev-only, tags DOM nodes for Lovable's visual editor — not needed outside
  Lovable).
- Removed Lovable OG-image / twitter:site references from `index.html` —
  replace the `TODO` comments with your own social preview image before
  deploying.
- Removed a stray `bun.lock` / `bun.lockb` pair; this project uses npm
  (`package-lock.json`).
- Deployed via Vercel (`npx vercel --prod`), connected to this GitHub repo.
