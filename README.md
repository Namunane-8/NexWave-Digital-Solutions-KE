# NexWave Digital Solutions

A responsive React + TypeScript website for NexWave Digital Solutions, built with Vite.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Local development

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Checks and production build

```bash
npm run typecheck
npm test
npm run build
npm run preview
```

The production build is generated in `dist/`. GitHub Actions runs type-checking, source smoke tests and the production build on pushes to `main` and pull requests.

## Pages

- Home: `/`
- Services: `/services`
- About: `/about`
- Our Developing Story: `/our-story`
- Contact: `/contact`
- Privacy: `/privacy`
- Branded not-found view for unknown routes

## Contact delivery

The contact form validates required fields in the browser and prepares a message in the visitor's configured email application. **Automated server-side delivery is not configured or tested yet.** The page explains this limitation. Direct email and WhatsApp links are available as alternatives.

For real automated delivery, choose and authorize an email provider, configure its API key only as a server-side environment variable, implement server-side validation and abuse protection, and test a real preview submission end-to-end. Do not expose private credentials in client-side variables or commit them to Git.

## Deployment

The project includes a Vercel SPA route fallback. Connect this repository to a separate preview project before considering production. The existing official domain and production deployment must not be changed without explicit owner approval.

## Design system and brand assets

The initial foundation uses the established NexWave deep green (`#174b3b`), charcoal (`#202a26`), white, soft neutral surfaces and restrained pale-lime accents. The design tokens and interface principles are documented in `docs/DESIGN-SYSTEM.md`. Original approved brand assets still need to be verified before final publication; the homepage's geometric hero composition is CSS artwork and is not presented as a client project or photograph.

## Release safeguards

- Keep secrets in hosting environment variables, never in source control.
- Run type checks, tests and the production build before release.
- Test keyboard navigation and responsive layouts at mobile and desktop sizes.
- Use an isolated preview for review.
- Do not connect the official domain, change DNS, or replace the current production site without explicit owner approval.

## Build verification checkpoint

The live site clock uses the visitor's local timezone and displays the full weekday, day, month, year, and 12-hour time. Its formatting is covered by the smoke tests.
