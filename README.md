# David Morgan-Gumm — Personal Portfolio

Personal portfolio site built with **Next.js 15** and deployed on **Firebase App Hosting**. A single-page application showcasing my work as a Data Platform Manager, including projects, career history, skills, an AI-powered summary tool, and a contact form.

🌐 **Live site:** [davidmorgangumm.com](https://davidmorgangumm.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v3 + shadcn/ui |
| AI | Genkit 1.8 + Google AI (Gemini 2.0 Flash) |
| Email | Nodemailer + Gmail OAuth2 |
| Deployment | Firebase App Hosting (Cloud Run) |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/DaiGumms/PersonalPortfolioSite.git
cd PersonalPortfolioSite
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Gmail OAuth2 — required for contact form
GMAIL_CLIENT_ID=
GMAIL_CLIENT_SECRET=
GMAIL_REFRESH_TOKEN=
GMAIL_SENDER_EMAIL=
GMAIL_RECIPIENT_EMAIL=

# Google AI — required for AI summary tool
GOOGLE_GENAI_API_KEY=
```

### Development

```bash
npm run dev          # Next.js dev server on http://localhost:9002
npm run genkit:dev   # Genkit AI dev UI (separate terminal)
```

### Other Scripts

| Command | Purpose |
|---|---|
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run typecheck` | TypeScript check (no emit) |
| `npm run lint` | ESLint |
| `npm run genkit:watch` | Genkit dev UI with file watching |

---

## Project Structure

```
src/
  app/                  # Next.js App Router (pages, API routes, global styles)
  ai/                   # Genkit flows and configuration
  components/
    layout/             # Navbar, Footer, FloatingThemeToggle
    sections/           # One component per page section
    ui/                 # shadcn/ui primitives
  lib/                  # Shared utilities
```

---

## Deployment

The site is deployed via **Firebase App Hosting** (backed by Cloud Run).

Secrets are managed through **Firebase Secret Manager** and mapped in `apphosting.yaml`. To deploy, push to the `master` branch — Firebase App Hosting handles the rest via `alwaysDeployFromSource: true`.

To add a new secret:
1. Add it to Firebase Secret Manager in the Firebase Console
2. Map it in `apphosting.yaml` under `env:`

---

## Community

I founded and run **sql_squared** — a data & AI community with podcasts, blogs, and events.

🔗 [sqlsquared.co.uk](https://www.sqlsquared.co.uk)

---

## Connect

- **LinkedIn:** [david-morgan-gumm](https://www.linkedin.com/in/david-morgan-gumm-450751133/)
- **GitHub:** [DaiGumms](https://github.com/DaiGumms)
- **X:** [@David_MGumm](https://x.com/David_MGumm)

## License

MIT © David Morgan-Gumm
