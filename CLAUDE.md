# CLAUDE.md — Lumen, Group 3 project website

The parent `D:\AI\Project\CLAUDE.md` applies too (stack rules, git workflow, security, performance baselines). This file covers what is specific to this project. The sibling `D:\AI\Project\Design-Thinking-Class-Website` is a finished site with the same stack and patterns; copy its setup (Next config, CSP, `useFrame`, `useReducedMotion`, `safeUrl`, Vitest) instead of reinventing it.

## Overview

A one-page English site for Group 3's Design Thinking project, **Lumen** ("User-Centered AI Learning Platform"). Sections, in order: header, hero (video), About Project, Our Team (accordion), Design Thinking Process (Sui-style stack), footer (ASCII logo).

| What | Where |
|---|---|
| Requirements | `PRD.md` |
| Visual and motion spec | `DESIGN.md` |
| Every string, link and team datum | `CONTENT.md` |
| Approved canvas | https://claude.ai/artifact/S5HXEpQWm6jxG2p5dKVnFn (artboard "Website kelompok: halaman proyek") |
| Canvas source to port | `design/canvas/GroupSite.dc.html` |
| Brand guide | `design/canvas/Brand.dc.html` |
| Pixel logo | `design/canvas/DotMark.dc.html` |
| ASCII logo renderer | `design/lumen-ascii.reference.js` (run with `node design/lumen-ascii.reference.js` to print two frames) |
| Media | `design/assets/` → copy to `public/media/` and `public/team/` |

## Stack

Next.js 16 (App Router; read `node_modules/next/dist/docs/` before using unfamiliar APIs), React 19, TypeScript strict, Tailwind CSS 4 (`@theme` tokens in `src/app/globals.css`), Vitest. Fonts via `next/font/google` (Plus Jakarta Sans, JetBrains Mono). Deploy target: Vercel, fully static. No animation library.

## Commands

```bash
npm run dev     # dev server
npm run build   # production build (static)
npm run lint    # tsc --noEmit + eslint
npm test        # vitest run
```

On a fresh clone, run `npm run build` (or `npm run dev`) once before `npm run lint`. `tsc` needs the `LayoutProps` route types that Next generates in `.next/types`.

## Target architecture

```
src/
├── app/            layout.tsx (fonts, metadata, noindex), page.tsx (section order), globals.css (tokens)
├── components/
│   ├── layout/     SiteHeader, SiteFooter
│   ├── hero/       HeroSection (video + scrim + h1)
│   ├── about/      AboutSection
│   ├── team/       TeamSection, TeamCard
│   ├── process/    ProcessSection, PhaseCard, DocLink, illustrations/{Empathize,Define,Ideate,Prototype}Art.tsx
│   ├── logo/       PixelMark (static SVG), AsciiLogo (client; rAF + refs)
│   └── ui/         Placeholder
├── data/site.ts    ALL content from CONTENT.md
├── hooks/          useReducedMotion
├── lib/            lumenAscii.ts (pure renderer + tests), safeUrl.ts
└── types/index.ts  TeamMember, Phase, DocLink, SiteContent
```

## Rules

- Content comes only from `src/data/site.ts`. Missing photo → initials; missing link → `[LINK]` badge on a non-link row. Never `href="#"`, never fake text.
- External links go through `safeUrl()` and open with `target="_blank" rel="noopener noreferrer"`.
- No `style` prop in JSX except values that are truly per-item data (team photo focus/zoom, tint), or values written through refs during animation. Everything else is Tailwind.
- Pure logic lives in `lib/` with a unit test: `lumenAscii.ts` (check frame size is 72×36, the gap is empty at t = 0, and the core is drawn in the dots layer).
- The ASCII logo must not re-render React per frame. Compute in rAF, write `textContent` to the two `<pre>` refs, and pause when off-screen or when motion is paused.
- Decorative layers get `aria-hidden`. Team cards are `<button aria-pressed>` (they control no separate region). Focus behaves like hover.
- Section ids `top`, `about`, `team` and `process` are a contract.
- Do not show the Test phase until the user provides its content.
- Keep components under 300 lines; port SVG paths verbatim from the canvas.

## Phase plan

| Phase | Scope | Status |
|---|---|---|
| 0 | Design canvas approved | ✅ 2026-10-16 |
| 1 | Scaffold (copy sibling's config), tokens, types, `site.ts`, assets into `public/` | ✅ 2026-10-16 (build, lint, 6 tests pass) |
| 2 | Sections: header + hero · about + team · process (+ illustrations) · footer (+ ASCII logo) | ✅ 2026-10-16 (desktop + 375px checked in browser) |
| 3 | Integrate and evaluate: build, lint, tests, 360px mobile, reduced motion, Lighthouse | ✅ 2026-10-16 (mobile median of 5: Perf 93, A11y 100, BP 96; SEO 63 by design) |
| 4 | `/apple-design`, `/security-review`, `/code-review`, apply fixes | ✅ 2026-10-16 (see decisions log) |
| 5 | Missing content, then deploy | ⏳ Still missing: photos of Anastasia and Jessica; the Persona Dinda link; the MP4 hero fallback. Already filled in: Empathize (2 links), Define report, Ideate (2 canvases), Prototype (1 link). |

## Decisions log

- **2026-10-16:**
  - Design approved in Claude Design (dot direction of the Lumen brand).
  - **English only.**
  - **Navigation removed** from the header by the user.
  - **Hero:**
    - A Remotion-rendered puzzle video replaces the CSS puzzle animation.
    - The hero has no buttons and no bottom rule.
  - **Prototype section** ("Try the prototype", with the glossary) removed by the user. The glossary data is kept in the canvas script only.
  - **Stats row** (6 interviews, ~40 HMW…) removed. The canvas still has an empty bordered `<section>` there; do not port it.
  - **Team:** the accordion follows the Lovable creative-photographer template. Members show student IDs; roles are not shown. Naufal's photo is zoomed to 1.7×.
  - **Process:** the stack layout follows sui.io. Test is hidden until done. Every phase card links to its documents.
  - **Footer:** a donut.c-style ASCII logo. Under it, only the wordmark (the tagline lines were removed by the user). The logo was hover-only at first; per later user feedback it spins on its own while on screen, and stops off-screen and under reduced motion.
  - **Folder name:** the project folder is `Luman`, but the product name is **Lumen**.
  - **Phase 3 evaluation:**
    - **Checks that passed:**
      - Hover spin (spins on enter, stops and keeps its angle on leave).
      - Keyboard: logical tab order, visible rose focus ring, and focus opens a team card. Rows without a URL are not focusable.
      - Reduced motion, checked in headless Chrome with `--force-prefers-reduced-motion`: the hero shows only the poster and there is no `<video>`.
      - No horizontal overflow at 375px.
    - **Lighthouse (mobile), first run:** Perf 86, A11y 100, BP 93. Fixes:
      - The ASCII logo's resting frame is computed on the server and passed as a prop (it was being computed in the client bundle at load).
      - Team cards no longer use `aria-label`; their name comes from an always-rendered caption (`sr-only` when closed). This fixes the label-content-name mismatch.
      - Added `app/icon.svg` (the favicon 404 was a console error).
      - Variable fonts: one file per family instead of 7.
      - The process animations pause while off-screen (`PauseOffscreen`, `[data-offscreen]` in globals.css).
      - The hero poster is a `priority` `next/image` under the video, and the video only fetches and plays after `load` + idle.
    - **Result:** median of 5 runs, Perf 93 (87–94), TBT ~140ms, CLS 0. SEO 63 is by design (`noindex`, and the tiny decorative ASCII text fails "legible font size").
    - **Open issue:** simulated LCP is still ~3.0s (the h1 render delay on 4× CPU), above the 2.5s target. It's the remaining Perf headroom.
    - **Measurement tip:** stop any `next dev` server first. Running it alongside skewed the Lighthouse runs by 10–20 points.
  - **Phase 4 reviews:**
    - **Tailwind only:**
      - The animations moved from hand-written CSS classes into `@theme` (`--animate-dt-*` + `@keyframes`), used as `animate-dt-*` with Tailwind variants for delay, pause and reduced motion (`MOTION_GUARD`, `DELAY` in `IsoFrame.tsx`).
      - `globals.css` now holds only tokens, two `@utility` backgrounds and `@layer base` (html background, focus ring).
      - The old vanilla prototype moved to `design/legacy/lumen-site.html`; it isn't part of the app.
    - **`/apple-design`:**
      - *Critical:* looping video and illustrations with no way to stop them (HIG `accessibility.md › Motion`, WCAG 2.2.2). It was fixed with a "Pause motion" button in the hero, **which the user later asked to remove** (it was deleted together with `useMotionPaused` and every `data-motion` hook). Motion control now comes only from `prefers-reduced-motion` and from pausing off-screen. Known trade-off: a visitor who can't turn on reduced motion has no way to stop the looping hero video. Revisit if the lecturer's accessibility rubric asks for it.
      - *Medium:* "PROBLEM DOMAIN" now uppercase like the other labels. 11px chips raised to 12px.
      - *Low:* header link at least 44px tall.
      - All text contrast passes (lowest pair 4.6:1).
    - **`/code-review`** (8 findings):
      - The ASCII logo stops when off-screen (touch devices may never send mouseleave) and is throttled to 30fps.
      - The hero video pauses off-screen.
      - Motion state is a single store.
      - `DocLinkRow` uses `isExternal()`, so only external links get a new tab.
      - Team cards use `aria-pressed`.
      - All components declare `JSX.Element` return types.
      - The pause-button label was judged correct as is: it reflects the visitor's choice, which also covers the illustrations.
    - **Security:**
      - `/security-review` needs a git branch, so the check was done by hand.
      - Results: CSP and security headers served, `npm audit --omit=dev` finds 0 vulnerabilities, no HTML-injection sinks or env secrets, and every link goes through `safeHref`.
    - **Verification:** the hidden browser pane gets no IntersectionObserver callbacks, so scroll-dependent behaviour was checked in headless Chrome over CDP. Results: the video plays at the top, pauses when away, and resumes; the illustrations run only in view; the pause button stops both.
  - **Scroll animations (in & out), added at the user's request before Phase 5:**
    - **`components/ui/Reveal.tsx`:**
      - Toggles `data-shown` through a ref while the element is in view, so items animate in, and back out when scrolled away.
      - Children use the named group `group-data-[shown]/reveal:`.
      - Shared strings live in `lib/revealClasses.ts`. Easing and duration come from the `reveal-ease` utility.
    - **Process cards, in sequence:**
      1. The card slides in from its timeline side.
      2. The body unrolls downward out of the title (`grid-rows-[0fr]` → `[1fr]`).
      3. The document links drop in staggered.
    - **`TimelineProgress`:**
      - The rose line grows with scroll, its tip following 60% of the viewport (`lib/scrollProgress.ts`, tested).
      - It observes the track, not the line: a `scaleY(0)` line has no area, so it would never intersect.
      - It measures with `offsetTop`/`offsetHeight`.
    - **Other sections:**
      - Headings rise in. The About columns rise in staggered.
      - Team cards rise in staggered: per-property `transition-delay` delays opacity/translate only, so hover-open stays instant.
      - Footer: the mark scales in, then the wordmark slides.
      - Hero: only the tagline fades in. The h1 is the LCP element and stays static.
    - **Process section (user feedback, final):**
      - **Two stages:**
        1. The title box slides in from its side when the card enters, and out when it leaves (`<Reveal threshold={0.02}>`).
        2. As the reader scrolls further, the content drawer slides down from behind the title (`ScrollUnroll`). It is scroll-scrubbed via `lib/scrollProgress.ts › unrollProgress`: it starts when the drawer's top passes 80% of the viewport, is fully open at 40%, and closes again on the way back up.
      - **Drawer structure:**
        - The drawer is a `translateY` inside an `overflow-hidden` frame that always keeps the content's full height.
        - The title and the content have separate borders and backgrounds, so no empty box shows before the drawer opens.
      - **Why not grid-rows:** an earlier version changed the cards' height while animating. That pushed the cards below in and out of view, and the in/out reveals flickered.
      - Gap between phases: `gap-16`, and `md:gap-24` on desktop.
      - **Checked in CDP:**
        - Card top at 85%: title in, drawer 0%.
        - 70%: drawer 5%. 55%: 43%. 40%: 80%. 25%: 100%.
        - Reverses on the way up. Layout stable.
    - **Timeline marker (user feedback):**
      - The white square used to sit still at the bottom while the line grew. Now it rides on the line's tip: `TimelineProgress` owns the track, the line and the marker, and both follow one progress value. Checked in CDP: the marker is centred on the tip at every scroll position.
      - **Gotcha:** for elements whose `transform` is written from JS, set the initial state with `[transform:…]`, not `scale-y-*` or `translate-y-*`. Tailwind 4 puts those on the separate `scale`/`translate` properties, which stack on top of the JS value.
    - **Horizontal overflow (found while adding photos):**
      - Cards waiting 40px to the side (`translate-x-10`) widened the whole page. At 375px it was 391px wide, so the earlier "no overflow at 375px" check was stale.
      - Fix: `overflow-x-clip` on `#process`. The hero container is `w-full`, so the h1 uses `max-w-full` instead of `100vw − 32px`, which ignored the container padding.
      - Now `scrollWidth == clientWidth` at 1280, 1440, 768 and 375.
      - Any element that starts shifted sideways needs a clipping ancestor.
    - **Photo caching:** `next/image` caches optimized images by URL. When a team photo is replaced, give the new file a new name (`naufal-yellow.jpg`), or the old picture keeps showing.
    - **Gotcha:** never build Tailwind class names with `${…}` (e.g. `${SHOWN}:grid-rows-[1fr]`). The scanner can't see them and the rule silently isn't generated. Write each class out in full.
    - **Verified in headless Chrome (CDP):** in, out and timeline growth all work. Reduced motion shows every final state instantly. Lighthouse mobile median of 5: Perf 94, A11y 100, CLS 0, TBT ~100ms.
