# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

David Morgan-Gumm's personal portfolio site: a Next.js 15 (App Router) multi-page site styled with Tailwind CSS + shadcn/ui, deployed on Firebase App Hosting (Cloud Run). Showcases projects, career journey, community involvement, and a contact form backed by a Gmail OAuth2 mailer.

## Commands

```bash
npm run dev          # Dev server on http://localhost:9002 (Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
```

There is no unit test runner configured. `tests/contact-form.spec.ts` is a Playwright spec but `@playwright/test` config/runner is not wired into `package.json` scripts — run it directly with `npx playwright test` if needed, after `npm install -D @playwright/test` (see the comment header in that file).

`next.config.ts` sets `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true` — **`npm run build` succeeds even with type or lint errors.** Always run `typecheck` and `lint` manually before considering a change done.

## Architecture

### Routing: one page component per route, sections are shared building blocks

This is **not** a single-page scrolling site — it's a multi-page App Router site where each route composes one or more section components:

| Route | File | Sections used |
|---|---|---|
| `/` | `src/app/page.tsx` | `HeroSection`, `AboutMeSection`, `ResumeDownloadSection` |
| `/journey` | `src/app/journey/page.tsx` | `TechLeadershipSectionVision`, `ExperienceEducationSection` (aliased from `tech-leadership-section.tsx`), `AchievementsSection` |
| `/projects` | `src/app/projects/page.tsx` | `ProjectsSection` |
| `/community` | `src/app/community/page.tsx` | `CommunitySection` |
| `/contact` | `src/app/contact/page.tsx` | `ContactSection`, `ResumeDownloadSection` |

Section components live in `src/components/sections/` (one per page section) and are composed into page files — a page file itself contains no markup, just a list of sections. `src/components/sections/testimonials-section.tsx` and `technical-articles-section.tsx` (if present) are not wired into any route; check before assuming a section file is live.

Top-level nav is centralized in `src/components/layout/navbar.tsx` (`navItems` array) — updating routes/labels there is the single source of truth for nav links and active-state highlighting (via `usePathname`).

### Theme system — custom, not `next-themes`

`src/components/theme-provider.tsx` implements a from-scratch light/dark theme context:
- Reads/writes `localStorage['theme']`, falls back to `prefers-color-scheme`
- Toggles the `.dark` class on `<html>`
- Consume via `const { theme, toggleTheme } = useTheme();`

Do not introduce `next-themes` — it will conflict with this provider.

### Styling

All design tokens are CSS custom properties in `src/app/globals.css` (HSL triples consumed by Tailwind's `hsl(var(--x))` convention), not hardcoded hex in components. Current design language ("soft tech"): primary purple `hsl(260 65% 53%)`, layered `--surface-lowest/low/surface/high` background steps instead of borders (global border-color is forced transparent — borders are opt-in per element), soft shadows via `.shadow-ambient` / `.shadow-ambient-lg` utility classes, and `.glass` / `.glass-card` for glassmorphism. `src/components/ui/` is shadcn/ui-generated — treat as vendor code, avoid hand-editing beyond what shadcn regeneration would produce.

### Contact form flow

`ContactSection` (react-hook-form + Zod) posts to `POST /api/contact` (`src/app/api/contact/route.ts`), which sends mail via `nodemailer` using Gmail OAuth2 (`googleapis`). Shared validation/sanitization/rate-limiting helpers live in `src/lib/contact-utils.ts`. The route sends two emails per submission: a notification to the site owner and an auto-reply to the sender. `shouldRateLimit`'s in-memory `rateLimitMap` resets on server restart — acceptable given Cloud Run's stateless instances.

Required env vars (`.env.local` for dev, Firebase Secret Manager + `apphosting.yaml` `env:` mapping for prod): `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `GMAIL_SENDER_EMAIL`, `GMAIL_RECIPIENT_EMAIL`.

### No AI/Genkit feature currently

Earlier versions of this project included a Genkit + Gemini "AI summary" tool (`src/ai/`, a Genkit dev script, a Navbar dialog trigger). That code has been removed — there is no `src/ai/` directory and no `genkit`/`googleai` dependency in `package.json`. `README.md`, `.vscode/tasks.json` (GenKit tasks), and `.vscode/launch.json` still reference it and are stale; don't reintroduce or rely on those references without checking `package.json` first. `apphosting.yaml` still maps a `GOOGLE_API_KEY` secret, also a holdover.

### Deployment

Firebase App Hosting, backend id `personalportfolio-h48sk26` (`firebase.json`, `apphosting.yaml`), `minInstances: 0` (cold starts possible). Pushing to `master` auto-deploys (`alwaysDeployFromSource: true`). To add a new secret: add it to Firebase Secret Manager, then map it under `env:` in `apphosting.yaml`.

## Conventions

- Path alias `@/*` → `src/*` (see `tsconfig.json`).
- Section components: static data (skills, projects, experience arrays) as `const` arrays at the top of the file, before the component. Add `'use client'` only when the component needs state/effects/browser APIs; purely presentational sections stay server components.
- Forms: `react-hook-form` + `zodResolver`, schema defined above the component, shadcn `Form`/`FormField`/`FormItem`/`FormLabel`/`FormControl`/`FormMessage`, honeypot field for bot protection (see `ContactSection`).
- Images: always `next/image`, never `<img>`. `next.config.ts` allowlists `placehold.co` as a remote image host.
- Icons: `lucide-react` throughout.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:

- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
