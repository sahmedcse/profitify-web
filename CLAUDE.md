# Profitify Web

Next.js 16 frontend for the Profitify financial analytics platform. Statically exported (SSG) and deployed to S3 + CloudFront.

## Tech Stack

- **Next.js 16** — App Router, static export (`output: 'export'`)
- **React 19** — UI library
- **TypeScript 5.9** — strict mode enabled
- **Tailwind CSS v4** — utility-first CSS (config in CSS, not JS)
- **shadcn/ui** — component library (New York style)
- **TanStack Query v5** — async state management / data fetching
- **Recharts 3** — general charts (area, bar, line, pie)
- **TradingView Lightweight Charts 5** — financial candlestick charts
- **pnpm** — package manager

## Directory Structure

```
src/
  app/                    Next.js App Router pages
    page.tsx              Homepage (/) — hero + CTA
    (app)/                Dashboard app pages with sidebar layout
      dashboard/          /dashboard — metric cards
      analytics/          /analytics — charts
      portfolio/          /portfolio — holdings
      settings/           /settings — account
    layout.tsx            Root layout with providers
    globals.css           Tailwind v4 theme + shadcn CSS variables
  components/
    ui/                   shadcn/ui generated components (do not edit manually)
    charts/               Recharts + TradingView wrapper components
    layouts/              Dashboard sidebar and header
  hooks/                  Custom React hooks
  lib/                    Utilities: api-client, query-client, cn(), constants
  providers/              React context providers (QueryClient, Theme)
  types/                  Shared TypeScript types
public/                   Static assets, robots.txt
```

## Build & Run

```bash
pnpm install              # Install dependencies
pnpm dev                  # Start dev server (http://localhost:3000)
pnpm build                # Build static export -> out/
pnpm lint                 # Run ESLint
pnpm lint:fix             # Fix ESLint issues
pnpm format               # Format with Prettier
pnpm format:check         # Check formatting
pnpm type-check           # TypeScript type checking
```

## Architecture Constraints

- **Static export only** — no API routes, no middleware, no ISR, no server-side headers/cookies
- **APIs are external** — Go backend at `NEXT_PUBLIC_API_URL`. No Next.js API routes.
- **Auth is external** — AWS Cognito (future). No auth logic in this repo yet.
- **Images are unoptimized** — no Next.js image optimization server; use unoptimized or external loader

## Conventions

### TypeScript

- Strict mode. No `any` types. Use `unknown` and narrow.
- Use `import type` for type-only imports.
- Interfaces for API response shapes live in `src/types/`.

### Components

- shadcn/ui components: `pnpm dlx shadcn@latest add <component>` — do NOT manually edit `src/components/ui/`.
- Custom components go in `src/components/` (outside `ui/`).
- Client components (`'use client'`) only when needed (hooks, browser APIs, interactivity).

### Styling

- Tailwind v4 — all theme config in `src/app/globals.css` via `@theme`.
- No `tailwind.config.js`. Tailwind v4 does not use a JS config file.
- Use `cn()` from `src/lib/utils.ts` for conditional classes.
- Semantic colors: `text-profit` (green), `text-loss` (red) for financial data.

### Data Fetching

- TanStack Query for all API calls. No raw `useEffect` + `fetch`.
- API client at `src/lib/api-client.ts` — thin fetch wrapper.
- Query client config at `src/lib/query-client.ts`.

### Routes

- `(app)` group: dashboard pages with sidebar layout.
- Homepage at `/` uses root layout directly.
- Each page exports `metadata` for SEO.

## Environment Variables

All client-side variables must use `NEXT_PUBLIC_` prefix:

| Variable               | Required | Default                 | Description        |
| ---------------------- | -------- | ----------------------- | ------------------ |
| `NEXT_PUBLIC_API_URL`  | Yes      | `http://localhost:8080` | Go backend URL     |
| `NEXT_PUBLIC_APP_ENV`  | No       | `development`           | Environment name   |
| `NEXT_PUBLIC_SITE_URL` | No       | `http://localhost:3000` | Canonical site URL |

## Branch & Commit Conventions

- **Branches**: `feature/`, `bug/`, `hotfix/`, `chore/`
- **Commits**: Conventional Commits format
  - `feat: add dashboard overview page`
  - `fix: correct chart resize behavior`
  - `chore: update dependencies`
  - `refactor: extract api client`
