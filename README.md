# NexWave Digital Solutions

A React + TypeScript website for NexWave Digital Solutions, built with Vite.

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
npm run build
npm run preview
```

The production build is generated in `dist/`.

## Environment variables

The initial homepage does not require secrets or external API keys. Enquiry actions currently open email or WhatsApp. A server-backed contact form and automated delivery will only be enabled after an approved provider is configured and its delivery is tested. Never put private credentials in client-side variables or commit them to Git.

## Deployment

This project is compatible with Vite static hosting. Connect this repository to a separate preview project before considering production. The existing official domain and production deployment must not be changed without explicit owner approval.

## Design system

The initial foundation uses the established NexWave deep green (`#174b3b`), charcoal (`#202a26`), white, soft neutral surfaces and restrained pale-lime accents. Original brand assets must be verified before replacing any approved mark. The homepage's geometric hero composition is CSS artwork and is not presented as a client project or photograph.

## Release safeguards

- Keep secrets in hosting environment variables, never in source control.
- Run type checks and the production build before release.
- Test mobile navigation and keyboard focus.
- Use an isolated preview for review.
- Do not connect the official domain, change DNS, or replace the current production site without explicit owner approval.
