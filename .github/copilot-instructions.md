# GitHub Copilot Instructions — David Morgan-Gumm Portfolio

## Project Overview
This is David Morgan-Gumm's personal portfolio site — a **Next.js 15 single-page application** using the App Router. It is a professional showcase for David's work as a Data Platform Manager at Oliver James, featuring his projects, career history, skills, AI tooling, and a contact form.

- **Owner:** David Morgan-Gumm (`DaiGumms`)
- **Hosted:** Firebase App Hosting (Cloud Run backend)
- **Dev server:** `npm run dev` — runs on **port 9002** with Turbopack

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v3 + shadcn/ui (Radix UI) |
| Font | Public Sans (Google Fonts) |
| AI | Genkit 1.8 + Google AI (Gemini 2.0 Flash) |
| Email | Nodemailer + Gmail OAuth2 + googleapis |
| Forms | react-hook-form + Zod (`@hookform/resolvers/zod`) |
| Icons | Lucide React |
| Deployment | Firebase App Hosting / Cloud Run |
| Secrets | Firebase Secret Manager |

---

## Directory Structure

```
src/
  app/
    page.tsx              ← renders all visible sections in order
    layout.tsx            ← root layout: metadata, font, ThemeProvider, Navbar, Footer
    globals.css           ← ALL CSS custom property definitions (light + dark themes)
    api/contact/route.ts  ← POST handler for contact form (Gmail OAuth2)
  ai/
    genkit.ts             ← Genkit AI singleton (Gemini 2.0 Flash)
    dev.ts                ← Genkit dev entrypoint
    flows/
      improve-summary.ts  ← 'use server' Genkit flow for AI summary tool
  components/
    theme-provider.tsx    ← Custom ThemeProvider (NOT next-themes)
    layout/
      navbar.tsx          ← Sticky nav + AI tool Dialog trigger
      footer.tsx          ← Social links (GitHub, LinkedIn, X)
      floating-theme-toggle.tsx
    sections/             ← One component per page section
    ui/                   ← shadcn/ui primitives (avoid editing)
  lib/
    contact-utils.ts      ← Email validation, sanitization, rate limiting
    utils.ts              ← cn() helper
  types/
    nodemailer.d.ts
```

---

## Page Sections

Sections are rendered in `src/app/page.tsx`. Each has an `id` used for in-page navigation.

| Component | Section ID | Nav Label | Notes |
|---|---|---|---|
| `HeroSection` | `#home` | Home | Profile image, CTA buttons |
| `AboutMeSection` | `#about` | About | Skills carousel, experience timeline, education |
| `TechLeadershipSection` | `#leadership` | Leadership | Scroll-animated leadership pillars |
| `ProjectsSection` | `#projects` | Projects | Cards + sql_squared feature block |
| `CommunitySection` | `#community` | Community | Social/community links |
| `ContactSection` | `#contact` | Contact | React Hook Form + API route |
| `ResumeDownloadSection` | `#resume` | Resume | Links to `/DavidMorganGumm-Resume.pdf` |

> **Unused sections** (exist in `src/components/sections/` but NOT in `page.tsx`):
> `BlogAndEventsSection`, `AchievementsSection`, `TestimonialsSection`, `TechnicalArticlesSection`
> These can be added to `page.tsx` when ready.

---

## Theme System

**Do NOT use `next-themes`.** This project has a custom `ThemeProvider`.

- Located at `src/components/theme-provider.tsx`
- Exports: `ThemeProvider` (wraps app), `useTheme()` hook
- Reads/writes `localStorage.getItem('theme')`; falls back to `prefers-color-scheme`
- Applies `.dark` class to `<html>` element
- Usage: `const { theme, toggleTheme } = useTheme();`
- For theme-sensitive images (e.g., logos), use `useTheme()` to switch `src`

---

## Color Palette & Styling

All colors are defined as CSS custom properties in `src/app/globals.css` and consumed via Tailwind semantic classes. **Never hardcode hex values in components.**

### Light Mode
- Background: `bg-background` (white)
- Primary: `bg-primary` / `text-primary` (soft lavender ~#D0BFFF) — used for subtle highlights
- Accent: `text-accent` / `bg-accent` (muted violet ~#9e72c3) — headings, icons, CTA
- Muted: `text-muted-foreground` — secondary text

### Dark Mode
- Background: deep dark purple (`#0F0529`)
- Card: slightly lighter dark purple (`#1F0F36`)
- Primary/Accent shift to lighter purples for legibility

### Layout Patterns
- Container: `container mx-auto px-4 md:px-6`
- Section padding: `py-16 md:py-24`
- Alternating section backgrounds: `bg-background` / `bg-muted/50`
- Cards: `bg-card shadow-lg hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300`
- Hover interactions: `hover:scale-105`, `transition-all duration-300`
- Conditional classes: always use `cn()` from `@/lib/utils`

---

## Component Conventions

### Section Components
- Static data (arrays of objects — skills, projects, experience items) live as `const` arrays at the **top of the file**, before the component function
- Use `'use client'` only when the component needs browser APIs, state, or effects
- Purely static/server-rendered sections do NOT need `'use client'`
- Use `IntersectionObserver` + `useState(false)` for scroll-triggered fade/slide animations (see `TechLeadershipSection`, `ProjectsSection`)

### Forms
- Use `react-hook-form` with `zodResolver` from `@hookform/resolvers/zod`
- Define Zod schema before the component
- Include honeypot field for bot protection
- Use shadcn `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` components

### Icons
- All icons from `lucide-react`
- Standard sizes: `h-4 w-4` (inline), `h-5 w-5` (nav), `h-6 w-6` (medium), `h-10 w-10` / `h-12 w-12` (feature icons)

### Images
- Use `next/image` `<Image>` component — never `<img>` tags
- Profile image: `/images/hero_profile.png`
- Project images: `/images/projects/[name].jpg`
- Logo variants: `/images/logo-square_light.png` and `/images/logo-square_dark.png`
- Remote images: `placehold.co` is allowlisted in `next.config.ts`

---

## AI Feature (Genkit)

- Genkit configured in `src/ai/genkit.ts` — exports `ai` singleton
- Model: `googleai/gemini-2.0-flash`
- All flows must be in `src/ai/flows/` and start with `'use server'`
- Flows use `ai.defineFlow()` and `ai.definePrompt()`
- Input/output schemas defined with Zod via `genkit`'s `z`
- AI Summary Tool is triggered from a `Dialog` in `Navbar` (Wand2 icon button)
- Dev mode: `npm run genkit:dev` or `npm run genkit:watch`
- Requires `GOOGLE_GENAI_API_KEY` environment variable

---

## Contact Form & API Route

- **Endpoint:** `POST /api/contact`
- **File:** `src/app/api/contact/route.ts`
- **Email transport:** Gmail OAuth2 via `nodemailer` + `googleapis`
- **Required env vars** (set via Firebase Secret Manager in prod):
  - `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`
  - `GMAIL_SENDER_EMAIL`, `GMAIL_RECIPIENT_EMAIL`
- **Server-side protections:** IP rate limiting (5 req/hr), input sanitization, field validation
- **Client-side protections:** honeypot field, submission rate limit (3 attempts), timing check
- Utilities in `src/lib/contact-utils.ts`

---

## Deployment

- **Platform:** Firebase App Hosting (`firebase.json`, `apphosting.yaml`)
- Backend ID: `personalportfolio-h48sk26`
- Cloud Run config: `minInstances: 0` (cold starts possible)
- Secrets mapped in `apphosting.yaml` under `env:` with `secret:` key
- To add a new secret: add it to `apphosting.yaml` AND to Firebase Secret Manager

---

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server, port 9002, Turbopack |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run typecheck` | TypeScript check (no emit) |
| `npm run lint` | ESLint |
| `npm run genkit:dev` | Genkit dev UI |
| `npm run genkit:watch` | Genkit dev UI with file watching |

---

## Important Caveats

- `next.config.ts` has `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true` — build will succeed even with TS/lint errors. Use `npm run typecheck` and `npm run lint` manually.
- The `rateLimitMap` in `contact-utils.ts` is in-memory — it resets on server restart. This is acceptable for the current Cloud Run setup.
- The `BlogAndEventsSection` uses `placehold.co` placeholder images — it needs real images and content before being added to `page.tsx`.

---

## Personal Details (for content decisions)

- **Name:** David Morgan-Gumm
- **Title:** Data Platform Manager
- **Employer:** Oliver James
- **Experience:** 6+ years in data engineering / analytics / technical leadership
- **Community:** Founder of `sql_squared` — podcasts, blogs, events at sqlsquared.co.uk
- **Education:** BSc Computer Science 2:1, University of Liverpool (2018)
- **Certifications:** Azure Fundamentals (AZ-900), CMI Level 5 Management & Leadership (in progress)
- **Social:**
  - GitHub: https://github.com/DaiGumms
  - LinkedIn: https://www.linkedin.com/in/david-morgan-gumm-450751133/
  - X/Twitter: https://x.com/David_MGumm
  - Blog/Community: https://www.sqlsquared.co.uk
