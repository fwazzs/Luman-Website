# PRD — Lumen, Group 2 project website

**Status:** Design approved 2026-10-16 · Build not started
**Design source:** [Claude Design canvas](https://claude.ai/artifact/S5HXEpQWm6jxG2p5dKVnFn), artboard "Website kelompok: halaman proyek" (mirrored in `design/canvas/GroupSite.dc.html`)
**Research source:** Obsidian vault, `Agent-Skill/Design-Thinking/05 Projects/AI Learning Path - Zero to Hero/`

## 1. Summary

A one-page English website for **Group 2's Design Thinking project, Lumen**. Lumen is a user-centered AI learning platform for students and fresh graduates. The site tells the project's story: the problem and point of view, the team, and the four Design Thinking phases completed so far, with a link to every document the team produced. The lecturer requires a website; the reference format is a Stanford CS147 project page (About, Team, Design Process, Prototypes).

## 2. Goals

| Goal | Measure |
|---|---|
| Show the full Design Thinking process at a glance | All four completed phases (Empathize, Define, Ideate, Prototype) visible in one section, each with a summary and its documents |
| Make every artifact reachable | Every phase card links to its documents; no dead `#` links at launch |
| Introduce the team | All six members shown with name, student ID and photo (initials until a photo exists) |
| Feel crafted, on-brand | Matches the canvas and the Lumen brand guide; passes `/apple-design` review |
| Work everywhere | Usable from 360px phones to large desktops; keyboard and screen-reader friendly |
| Fast | Lighthouse ≥ 90 in all categories; LCP < 2.5s, CLS < 0.1, INP < 200ms |

## 3. Audience

- **Lecturer and teaching assistants** — grade the process; need to find each phase's evidence quickly.
- **Classmates** — compare approaches; skim the story in under a minute.
- **The team** — a shareable record of the project.

## 4. Page structure (in scroll order)

1. **Header.** Lumen pixel mark + "lumen" wordmark, linking to `#top`. No navigation links (removed by the user).
2. **Hero** (`#top`). Full-bleed looping video background (`puzzle-hero.webm`: puzzle pieces assemble outline by outline, then disassemble). Centered headline "User-Centered AI Learning Platform" and the tagline "Everyone can learn AI". No buttons.
3. **About Project** (`#about`). Two columns: "Problem Domain" paragraph and "Point of View" statement with the key phrase highlighted.
4. **Our Team** (`#team`). Horizontal accordion of six tall portrait cards (pattern from the Lovable "creative photographer" template). Hover, focus or click expands a card; the expanded card shows name and student ID. Anastasia's card starts open.
5. **Design Thinking Process** (`#process`). "Stack" layout from sui.io ("The stack autonomous systems run on"): a dotted center timeline with a rose progress line and a square end marker; four phase cards alternate right and left. Each card has a numbered header, an animated isometric illustration, a summary and a footer list of document links joined to the number box by connector lines.
6. **Footer.** Full logo: a donut.c-style rotating ASCII render of the Lumen mark (spins on its own while on screen) next to the large "lumen" wordmark. Bottom bar: "© LUMEN · GROUP 2 · DESIGN THINKING" and "WEBSITE BY GROUP 2".

All copy is in `CONTENT.md`.

## 5. Functional requirements

- **FR1** All content comes from typed data in `src/data/site.ts`. A missing value (photo, link) renders a visible placeholder, never fake data.
- **FR2** Test phase is **not shown** until the team finishes testing. Adding it later must be a data change plus one card, not a redesign.
- **FR3** Every document link opens in a new tab with `rel="noopener noreferrer"`. A link without a URL renders as a non-interactive row with a `[LINK]` badge, not `href="#"`.
- **FR4** Team cards are real `<button>`s with `aria-expanded`; keyboard focus expands a card exactly like hover.
- **FR5** `prefers-reduced-motion`: the hero video shows its poster frame instead of playing, phase illustrations are static, and the footer logo does not spin.
- **FR6** The hero video is muted, looped, `playsInline`, decorative (`aria-hidden`), and has a poster so the first frame is never blank.
- **FR7** Every image has alt text; decorative layers are `aria-hidden`.

## 6. Non-functional requirements

- Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS 4, Vitest. Statically prerendered; deploy to Vercel.
- No animation library. CSS keyframes for illustrations; one `requestAnimationFrame` loop for the ASCII logo that writes `textContent` through refs (React does not re-render per frame).
- Mobile-first, breakpoint `md` (768px). Touch targets ≥ 44px. Text contrast WCAG 2.1 AA.
- Main JS < 500KB gzipped. Team photos through `next/image`, lazy below the fold.
- No secrets, no user input, no backend.
- Privacy: the page lists names and student IDs. Set `robots: noindex` unless the group agrees to be indexed.

## 7. Content still needed (blocks launch, not the build)

| Item | Status |
|---|---|
| MP4 version of the hero video (Safari < 14 / older iOS cannot play WebM) | Missing (poster shown) |
| Sharing settings of every document link (Google Drive files and folder) set to "anyone with the link" | To confirm |
| Test phase content | After testing |

## 8. Out of scope (v1)

- The Lumen product itself (level quiz, AI handbook, learning path). The site only documents it; the Prototype card links to the prototype document.
- Navigation menu, dark/light toggle, CMS, i18n (the site is English only), analytics.

## 9. Milestones

1. Design canvas approved ✅ 2026-10-16
2. Scaffold, docs, data contract (`types`, `site.ts`, tokens)
3. Sections: header + hero · about + team · process · footer (ASCII logo)
4. Integrate and evaluate: build, lint, tests, mobile, reduced motion, Lighthouse
5. Reviews: `/apple-design`, `/security-review`, `/code-review`
6. Real content (photos, links, MP4), then deploy
