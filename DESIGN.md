# DESIGN — Lumen "dot direction"

The source of truth is the approved canvas: https://claude.ai/artifact/S5HXEpQWm6jxG2p5dKVnFn. The website artboard is `design/canvas/GroupSite.dc.html`; porting means matching that file. `Brand.dc.html` is the brand guide, `DotMark.dc.html` the pixel logo, and `Quiz.dc.html` / `Result.dc.html` the product screens (reference only).

> The `.dc.html` files are Claude Design components: markup with inline styles plus a small `class Component` script. `{{x}}` holes are filled by `renderVals()`; `<sc-for>` is a loop and `<sc-if>` a conditional. Port the result, not the mechanism: Tailwind classes instead of inline styles, React state instead of `setState`.

## Concept

**"See AI clearly."** AI feels like a black box; Lumen lights it up little by little. The site is dark ink with soft cotton-pink light. Structure is drawn with hairlines and dots: a 1280px column bordered by thin rules, mono labels, numbered boxes, dotted timelines, halftone dots. One accent (rose) marks the thing that matters in each view. No glassmorphism, no gradient washes (the only gradients are the hero scrim and the caption fade on team cards).

## Color tokens (`src/app/globals.css` → `@theme`)

| Token | Hex | Use |
|---|---|---|
| `ink` | #011C27 | Page ground |
| `ink-raised` | #04202D | Phase cards |
| `cotton` | #F7CACD | Body text, lines (at alpha), ring of the logo |
| `white` | #FFFFFF | Headings, emphasized text |
| `rose` | #DE4D86 | Accent: progress line, highlighted tiles, icon chips, logo dots |
| `rose-text` | #EE6F9F | Rose when used as text on ink (passes AA) |
| `candy` | #F29CA3 | Tagline, secondary accent |
| `violet` | #64113F | Team card tint |
| `teal-deep` | #0B3446 / #163F52 | Team card tints |
| `plum` | #4A0F30 | Team card tint |

Alpha scale for cotton on ink (use as `cotton/18` etc. in Tailwind 4):

| Alpha | Use |
|---|---|
| 0.18 | Section rules, card inner dividers |
| 0.25 | Card borders |
| 0.35 | Connector lines, dotted timeline |
| 0.45 | Number boxes, chips, link icon boxes |
| 0.72 | Muted text (labels, attribution) |

Text on rose is always ink (`#011C27`), never white (white on rose fails AA).

## Type

| Role | Font | Spec |
|---|---|---|
| Display / headings | Plus Jakarta Sans 800 | Hero h1 `clamp(2.5rem, 7vw, 6rem)`, tracking -0.06em, leading 0.92 · Section h2 `clamp(2.25rem, 4.5vw, 3.5rem)`, tracking -0.045em · Process h2 up to 4rem |
| Body | Plus Jakarta Sans 400–700 | 17–18px, leading 1.55–1.6, max ~62ch |
| Labels, UI, numbers | JetBrains Mono 400–700 | 11–15px; uppercase labels with 0.04–0.14em tracking |

Load both through `next/font/google`.

## Layout

- Content column `max-w-[1280px] mx-auto`, gutters 24px (16px under 400px).
- Sections are separated by a 1px `cotton/18` rule. The hero has no bottom rule (removed by the user).
- Section header: h2 left, optional mono label right, `pt-24 pb-10`.
- Breakpoint `md` (768px).

## Sections

### Header
Pixel version of the mark (16×16 grid, 2px cells, see `DotMark.dc.html` with `shape="pixel"`) + "lumen" 26px/800, tracking -0.055em. Pre-render the pixel mark as a static SVG; it never changes.

### Hero
- `min-h-[760px]`, content centered.
- Background: `<video autoPlay muted loop playsInline poster=… aria-hidden>` with `object-cover`, plus a radial scrim `radial-gradient(ellipse 50% 45% at 50% 50%, rgba(1,28,39,.6), transparent 80%)`.
- h1 is two lines ("User-Centered" / "AI Learning Platform"), width capped at 1202px and `max-w-[calc(100vw-32px)]`.
- Tagline under it: mono, uppercase, 0.14em tracking, candy, `clamp(0.95rem, 1.4vw, 1.15rem)`, pulled up 8px.

### About Project
Two columns (`flex-wrap`, each `basis-[400px]`), divided by a vertical rule. Left: mono label "Problem Domain" + paragraph. Right: rose-text label "POINT OF VIEW" + statement at `clamp(1.3rem, 2.4vw, 1.75rem)`/700 white, with the key phrase in rose-text.

### Our Team (accordion)
- Row of six `<button>` cards, `h-[520px]`, `gap-3`, `rounded-3xl`, `min-w-24`, container `min-w-[640px]` inside an `overflow-x-auto` wrapper.
- Flex grow: open card 3.5, others 1; `transition-[flex-grow] duration-500`.
- Card layers, back to front:
  1. Tint color.
  2. Halftone dots (`radial-gradient(cotton/28 1.2px, transparent 1.4px)` at 10px).
  3. Photo (`object-cover` with a per-member focus point and zoom).
  4. Initials (96px/800) when there is no photo.
  5. On the open card only, the caption: fade from transparent through `ink/70` to `ink/95` with a text shadow, name 26px/800 white, role 13px semibold candy, "Student ID ##########" 13px mono white.
- Open on hover, focus or click. Default open: Anastasia.

### Design Thinking Process (Sui stack)
- Centered h2 "Design Thinking Process".
- Timeline: an absolutely positioned 2px dotted `cotton/35` line at `left-1/2` over the whole list, a 2px solid rose line on top of it from the first card to the last, and a 12px white square marking the end.
- Cards alternate: 01 and 03 right-aligned, 02 and 04 left-aligned. Width `min(100%, 580px)`, `gap-14` between rows. On phones they stack full width over the line.
- **Card anatomy:**
  - Header: 34px number box, title (15px mono 700 white), "DONE" chip.
  - Body: padded `pl-16`, with a 1px vertical connector at `left-9` running from the header to the footer. Contains the 240×150 illustration, the summary, then phase-specific content.
  - Footer: the link rows. Each row is ≥ 52px tall with an elbow connector (`border-l` + `border-b`, 20px wide, top half), then a 32px icon box, the label, and either "↗" or a `[LINK]` badge.
  - The last row is the primary one: rose icon box with an ink icon, and no continuation line below its elbow.
- **Illustration animations** (CSS keyframes; all disabled under reduced motion):

| Phase | Motion | Meaning |
|---|---|---|
| 01 Empathize | 5 tiles blink in sequence (`opacity .8 → .15`, 3s, delays 0–2.4s), dashed drops flow (`stroke-dashoffset` → -16, 1.4s linear), rose tile floats ±8px (3.2s) | Listening to people one by one, one insight surfaces |
| 02 Define | Two planes sink toward the core (`translateY -8 → 6px`, opacity .25 → .9, 4s, second plane +1.2s), converging lines flow, end dot pulses (scale 1 → 1.9) | Many findings narrowing to one POV |
| 03 Ideate | 9 scattered tiles blink at staggered delays, links flow, 3 rose tiles float together | Many ideas, three chosen |
| 04 Prototype | Lower planes' dashes flow, rose top plate lifts 16px and settles (3.6s, `cubic-bezier(.5,0,.3,1)`) | Assembling three parts into one product |

  Keep the SVG paths exactly as in the canvas (copy them into small components under `components/process/illustrations/`).

### Footer (ASCII logo)
- **Lockup:** an ASCII mark on the left and the "lumen" wordmark on the right (`clamp(5rem, 15vw, 13rem)`/800, tracking -0.065em, leading 0.8, white).
- **Two-layer `<pre>`:**
  - Ring layer in cotton; the dots layer (core and spark) is absolutely positioned on top in rose.
  - Both use JetBrains Mono 700, `font-size: clamp(4.5px, 1.9vw, 11px)`, `leading-none`, `tracking-normal`.
  - Wrapped in `role="img" aria-label="Lumen logo"`.
- **Renderer:** port `lumenFrame(t)` from the canvas script, also in `design/lumen-ascii.reference.js` (runnable with `node`, prints two frames).
  - Grid 72×36 with luminance ramp `.,-~:;=!*#$@`.
  - Open torus: R2 = 2, R1 = 0.55, gap between 15° and 75°, sphere caps on both ends.
  - Spheres: core r = 0.78, spark r = 0.36 at 45°.
  - Rotation: spin around y = `t`, tilt around x = `0.35·sin(0.6t)`.
  - Light direction: (0, .7071, -.7071).
- **Motion:**
  - The initial angle is t = 0.6.
  - While the logo is on screen, `t` advances by about 1 rad/s, drawn at up to 30fps. It stops off-screen and then resumes from the same angle.
  - Drive it with `requestAnimationFrame` and write `pre.textContent` through refs, so React never re-renders.
  - Under reduced motion it never spins.
- **Bottom bar:** a `cotton/18` rule, then "© LUMEN · GROUP 2 · DESIGN THINKING" on the left and "WEBSITE BY GROUP 2" on the right, 13px mono at `cotton/72`.

## Accessibility

- Focus ring: 2px rose outline with 3px offset on every interactive element. Never `outline-none` without a replacement.
- All decorative SVG, video, scrims, dots and connector lines get `aria-hidden`.
- Hover-only behaviours (team cards, logo spin) also work with keyboard focus, or are purely decorative.
