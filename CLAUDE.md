# CLAUDE.md

Guidance for Claude Code when working in this repo.

## Project

Legacy Ledger — a prototype marketing/product site for a service that helps
families discover and manage the financial accounts of a deceased loved one
(unclaimed assets, account closures, etc.).

Originally scaffolded and built in Lovable, then migrated to a normal
git workflow. No Lovable-specific tooling remains (see "Migration notes" below).

## Stack

- Vite 5 + React 18 + TypeScript
- shadcn-ui components (Radix primitives) in `src/components/ui` — generated
  code; prefer composing over hand-editing these unless fixing a real bug
- Tailwind CSS for styling (see `tailwind.config.ts`)
- react-router-dom for routing (`src/App.tsx`)
- @tanstack/react-query for async state (no real API calls yet — prototype uses
  local/mock state)
- react-hook-form + zod for forms
- recharts for charts, lucide-react for icons

There is currently **no backend** — no Supabase, no API layer. All data in
`src/components/discovery`, `src/components/rewards`, and the pages is local
component state / mock data. If you add a real backend, document it here.

## Structure

```
src/
  pages/          route-level views (Index, Registration, Dashboard, RewardsPerks, NotFound)
  components/     marketing sections (Hero, Pricing, CTA, etc.)
  components/discovery/   account-discovery flow (scanning, modal, results)
  components/rewards/     rewards/perks/legal-docs tabs
  components/ui/  shadcn-generated primitives — treat as vendored
  hooks/          use-mobile, use-toast
  lib/            utils.ts (cn() helper etc.)
```

Routes are registered in `src/App.tsx`. New routes go above the catch-all `*` route.

## Commands

- `npm i` — install deps
- `npm run dev` — dev server on port 8080
- `npm run build` — production build
- `npm run lint` — eslint
- `npm run preview` — preview a production build

## Conventions

- Path alias `@/` maps to `src/` (see `vite.config.ts` / `tsconfig.json`)
- Use existing shadcn components from `src/components/ui` instead of adding new
  UI libraries
- Keep new page-level components in `src/pages`, feature components grouped by
  domain (mirror `discovery/` and `rewards/` pattern) rather than one flat folder

## Migration notes (from Lovable)

- Removed `lovable-tagger` dependency and the `componentTagger()` Vite plugin
  (dev-only, tags DOM nodes for Lovable's visual editor — not needed outside
  Lovable).
- Removed Lovable OG-image / twitter:site references from `index.html` —
  replace the `TODO` comments with your own social preview image before
  deploying.
- Removed a stray `bun.lock` / `bun.lockb` pair; this project uses npm
  (`package-lock.json`).
- No Supabase or other Lovable-managed backend was present in this repo, so
  there's no database/env migration needed. If that changes, add credentials
  to a local `.env` (gitignored) and document required vars here.
- Deployment was previously via Lovable's "Publish". Pick a host (Vercel,
  Netlify, Cloudflare Pages, etc.) and wire up CI/deploy separately.
