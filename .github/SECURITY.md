# Security Notes

This is a private personal portfolio site. This document records the security measures in place for reference.

## Secrets & Credentials

- All sensitive credentials (Gmail OAuth2 tokens, API keys) are stored in **Firebase Secret Manager**
- Secrets are mapped into the runtime via `apphosting.yaml` — they are **never committed to source control**
- For local development, use a `.env.local` file (gitignored)

## Contact Form Protections

- **Server-side:** IP-based rate limiting (5 requests/hr via in-memory `rateLimitMap`), Zod schema validation, and input sanitisation on `/api/contact`
- **Client-side:** Honeypot field for bot detection, 3-submission rate limit, and rapid-submission timing check
- **Content policy:** Messages containing `<script>`, `javascript:`, or `on*=` event handler patterns are rejected

## Dependencies

- Review and update dependencies periodically with `npm audit` to address known CVEs
- `next.config.ts` intentionally has `ignoreBuildErrors: true` — run `npm run typecheck` and `npm run lint` manually before deploying

## Deployment

- Hosted on Firebase App Hosting (Cloud Run) — environment is managed by Google
- `minInstances: 0` means cold starts are possible but there is no persistent server state between requests (except for the in-memory rate limit map, which resets on restart — acceptable for this use case)
