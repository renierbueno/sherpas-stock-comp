# Design tokens

**TL;DR:** the colours, type and spacing the platform's client view uses, read on 2026-10-03, so the prototype can imitate the look where something changes. Values only, no code copied.

Values read from the client view of the demo platform on 2026-10-03 (CSS custom properties and computed styles). Values only, for our prototype to imitate the look; no code copied. [FACT: captures/client/_tokens]

## Colour

Colours are defined in OKLCH. Hex values are converted from OKLCH (sRGB, rounded).

| Role | Value | Hex | Seen on |
|---|---|---|---|
| Text / primary | `oklch(20% .0082 274.49)` | #15161a | Body text, headings, active tab |
| Text secondary | `oklch(32% .0217 274.11)` | #2f323e | Paragraphs, bullets |
| Muted text | `oklch(51% .0448 276.79)` | #5f6480 | Labels, captions |
| Page background | `oklch(96.42% 0 0)` | #f3f3f3 | Surface base, recommendation box |
| Card / raised surface | `oklch(100% 0 0)` | #ffffff | Cards, panels |
| Border | `oklch(92% .0087 264.52)` | #e2e5eb | Cards, dividers |
| Border strong | `oklch(87% .0089 264.52)` | #d1d4da | Recommendation box |
| Muted / accent fill | `oklch(95.79% .005 264.52)` | #eff1f4 | Hover, row headers |
| Link / brand blue | `oklch(55% .1772 268.11)` | #4666d7 | "View more", section subheads, bar fills |
| Destructive / red | `oklch(64% .2078 25.33)` | #f04545 | Gaps, "No coverage", Critical/Vulnerable |
| Score amber | `oklch(73% .164 64.65)` | #ed8e00 | Score 55-69 "Stable", areas below max |
| Positive green | `oklch(66% .1743 149.75)` | #1eae53 | Net worth, positive returns, Strong/Excellent |
| Hero background | Light indigo-lavender gradient with fine line pattern (image, not measured) | about #d6dbf5 | Tab headers |
| Footer | Near-black with line pattern (image, not measured) | about #111111 | Footer |

Score colour by range [brief]: 85-100 and 70-84 green, 55-69 amber, 40-54 and 0-39 red. Area points use the same idea (blue when full, amber when partial, red when low). [FACT: captures/client/02-score-breakdown]

Full scales present: gray, blue, indigo, orange, amber, green, red, yellow, emerald (Tailwind-style 50-950 steps).

## Type

| Use | Font | Size / line height | Weight | Letter spacing |
|---|---|---|---|---|
| Page and section titles | Poppins | 48 / 60 px | 600 | -2.4 px |
| Score number | Inter | 72 / 72 px | 600 | -1.8 px |
| Panel subhead | Inter | 18 / 28 px | 600 | -0.4 px |
| Body | Inter | 16 / 24 px | 400 | -0.4 px |
| Paragraph in report | Inter | 14 / 20 px | 400 | -0.35 px |
| Tabs | Inter | 14 / 16 px | 600 active, 400 inactive | -0.35 px |
| Labels (caps) | Inter | about 12 px (from screenshots, not measured) | medium | wide |

Other families loaded: DM Sans, DM Mono, Instrument Serif, Playfair Display (not seen in use on these screens).

Type scale: 12, 14, 16, 18, 20, 24, 30, 36, 48 px.

## Spacing, radius, shadow

- Spacing unit: 4 px.
- Radius: base 10 px; summary cards 14 px; recommendation box 24 px; small 2 px.
- Cards: 1 px border, no shadow, padding 12-16 px. Recommendation box: padding 24 px.
- Shadows are subtle: `0 6px 2px -4px` at 4% black plus a 1 px inset bottom line on raised controls.

## Component notes

From the screenshots of the client view. [FACT: captures/client/01-financial-health, 02-score-breakdown, 04-statements-balance]

- Top bar: centred tabs (Financial health, Investment analysis, Statements), active tab underlined; right side has a reports icon and an initials avatar.
- Hero: household name and date, large title, one or two sentences of explanation.
- Sticky secondary nav with section anchors.
- Side panels slide in from the right and are resizable, with a close button; rows inside are accordions with "points / available" on the right.
- Tables: light grey header row, caps labels, chevron expand on the left, small inline bars for share of total.
- Narrative paragraphs are bullets with a bold lead phrase ("Taking risk in the wrong bucket — ...").
