# NexWave design system — foundation

This is the initial implementation baseline. Confirm the original approved logo and brand assets before final publication; no unverified logo asset is being represented as official.

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
