# NexWave design system — foundation

This design-system record describes the accessibility and appearance upgrade branch. The approved logo reference was supplied as a 92×92 raster image; it is not yet integrated because a crisp production-ready asset and repository binary upload are still needed. Do not treat the existing geometric wordmark placeholder as the official logo.

## Colour tokens

| Token | Value | Use |
| --- | --- | --- |
| Deep green | `#174B3B` | Primary actions, brand emphasis |
| Deep green | `#10382D` | Dark sections and high-contrast surfaces |
| Charcoal | `#202A26` | Main text |
| Muted text | `#63706A` | Secondary copy |
| White | `#FFFFFF` | Main surface |
| Soft neutral | `#F5F7F3` | Quiet section backgrounds |
| Border | `#DCE3DD` | Dividers and outlines |
| Pale lime | `#D4E5A2` | Small accent on dark green |

## Typography

- Display and headings: Manrope, 500–600 weight.
- Body and controls: DM Sans, 400–700 weight.
- Heading letter spacing is tight; body line-height is generous.
- Font loading uses Google Fonts at this stage; a self-hosted font option can be evaluated for performance and privacy before release.

## Layout

- Maximum content width: 1200px.
- Responsive outer gutter: clamp(22px, 5.4vw, 84px).
- Section spacing: clamp(76px, 10vw, 136px), reduced for small screens.
- Breakpoints: 900px and 680px.
- Grid and CSS illustration are used intentionally; no generic stock or AI imagery is required for the homepage foundation.

## Interaction and accessibility

- Native anchors for navigation and native buttons for state changes.
- Skip-to-content link and visible keyboard focus.
- Responsive menu with an explicit expanded state.
- Motion reduced when the visitor requests reduced motion.
- Mobile layout targets a 320px minimum width and should be tested at 390px.
- Contrast and assistive-technology checks remain part of milestone QA; this document is not a claim of certified WCAG conformance.


## Appearance modes

- The appearance selector offers Light, Dark and System.
- Explicit selection is stored in local storage under `nexwave-appearance`; storage errors are handled without breaking the page.
- A small early head script applies the stored/system preference before React mounts to reduce theme flash.
- System mode listens for operating-system appearance changes while active.
- Theme styles are implemented using root-level CSS tokens and dark-mode component overrides. Contrast must still be measured for every interactive state before claiming WCAG 2.2 AA conformance.

## Motion

- Existing transitions are brief and decorative.
- The reduced-motion media query disables transitions and animations and prevents smooth scrolling.
- Content does not depend on animation to convey meaning.

## Image and licence register

| Asset | Source / rights evidence | Licence / attribution | Status |
| --- | --- | --- | --- |
| Homepage geometric CSS illustration | Authored in project CSS; no external image file | No external licence or attribution required | Existing decorative illustration, not client-work evidence |
| NexWave logo reference | User-supplied upload in conversation, 92×92 PNG | Supplied by site owner; confirm original ownership/approved-use scope before publication | Not yet integrated; request high-resolution SVG or transparent PNG |
| External stock / service photography | None added in this milestone branch | Not applicable | No external image licence has been assumed |

## QA status

- Automated typecheck, tests and build: pending after these changes.
- Real browser route/theme/keyboard/zoom/mobile/contrast checks: pending because an authorized preview deployment is not available.
- WCAG 2.2 AA conformance is not claimed until measured contrast and interaction tests are complete.


## Selar store handoff

- Added the `/store` route and main/footer navigation entry.
- The page links to the known storefront URL: `https://selar.com/m/nexwave-digital-solutions1952019`.
- Individual product cards, titles, covers, prices and direct product URLs are intentionally not fabricated. The store page directs visitors to Selar for current catalogue details and checkout.
- No payment-card information is collected by NexWave; Selar handles its own checkout and delivery.
- No product image has been copied from Selar into this repository, so no external image licence is assumed. Verify product data and image-use rights before adding locally rendered product cards.

## Responsive refinements

- Body copy targets 18px desktop and 16–17px on mobile; key navigation and form controls are enlarged.
- Additional breakpoints are defined around 900px, 680px and 360px, with a single-column mobile layout for the store and major content grids.
- CSS illustration remains decorative and is not evidence of client work.
- Source-level checks cover route metadata, store handoff, mobile breakpoints and reduced motion. They do not replace browser QA at 320, 360, 390, 430, tablet, desktop or 200% zoom.

## Current verification state

- Previous commit `f99c30e20e2b1f33b727b2a46b359280feea1039` passed GitHub Actions run #24.
- Combined upgrade requires a fresh passing run on its final commit.
- Real-browser QA remains pending until an authorized preview deployment is available.
- No production domain, DNS, old repository or production deployment has been changed.
