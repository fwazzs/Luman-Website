# CONTENT — every string on the page

Copy this into `src/data/site.ts` as typed data. The text is final (English, approved in the canvas). `null` means the value is still missing: render the placeholder described in PRD FR1/FR3, never invent it.

## Meta

- Title: `Lumen · Group 2 · Design Thinking`
- Description: `Lumen is a user-centered AI learning platform. This is Group 2's Design Thinking project: problem, team, and every phase so far.`
- `robots: noindex` (see PRD §6, privacy)

## Header

- Wordmark: `lumen`, linking to `#top`, `aria-label="Lumen, back to top"`

## Hero (`#top`)

- h1: `User-Centered` / `AI Learning Platform` (two lines)
- Tagline: `Everyone can learn AI`
- Video: `/media/puzzle-hero.webm`, poster `/media/puzzle-hero-poster.jpg`, MP4 fallback `null`

## About Project (`#about`)

- h2: `About Project`
- Label: `Problem Domain`
- Paragraph: `AI is moving faster than anyone expected, some jobs are already being taken over, and many people don't know where to start learning. We assumed they needed a roadmap. After six interviews, we found they already use AI every day. What they haven't learned yet is how to judge whether its output is correct and safe.`
- Label: `POINT OF VIEW`
- Statement: `People are stressed about AI so much because they can't find a ` + **highlight** `reliable source of truth` + ` to learn more about how AI works, how to use AI properly, and what AI can and cannot do.`

## Our Team (`#team`)

h2: `Our Team` · group `aria-label="Team members"` · default open: index 1 (Anastasia)

| # | Name | Student ID | Photo | Focus (object-position) | Zoom | Tint |
|---|---|---|---|---|---|---|
| 0 | Alfaira M. | 5026261221 | `team/alfaira.jpg` | 48% 42% | 1 | #0B3446 |
| 1 | Anastasia A. | 5026261173 | `team/anastasia.jpg` | 55% 40% | 1 | #64113F |
| 2 | Ezar H. | 5026261086 | `team/ezar.jpg` | 62% 42% | 1 | #163F52 |
| 3 | Muhammad M. | 5026261098 | `team/muhammad.jpg` | 52% 32% | 1 | #4A0F30 |
| 4 | Naufal R. | 5026261197 | `team/naufal-yellow.jpg` | 50% 48% | 1.5 | #0B3446 |
| 5 | Jessica K. | 5026261031 | `team/jessica.jpg` | 50% 22% | 1 | #64113F |

- Initials are derived from the name (`AM`, `AA`, …).
- Caption on the open card: name, then `Student ID 5026261221`.
- Button `aria-label`: `Alfaira M., student ID 5026261221`.

## Design Thinking Process (`#process`)

h2: `Design Thinking Process`. Status chip on every card: `DONE`.

### 01 · Empathize · needfinding
- Summary: `Six interviews: three high school students, one undergraduate, one fresh graduate, and one professional as an extreme user.`
- Quote: `“I really don't look things up... but once someone shows me, then I want to.”` — `Bryan`
- Interviewee chips: `DEMITRIA` `NALA` `FIKRI` `BRYAN` `KAYLA` `ALVIN`
- Links:
  1. `Transcripts of 6 interviews` → https://claude.ai/artifact/RAde59eGLsmQddq7PjywJ1#57d6b452-09c6.mq589se0499.848 (icon: document)
  2. **primary** `Empathy map` → https://claude.ai/artifact/RXLfgNRFEmnaWt2oJK7Qqd#page-dcb81aee8d83 (icon: grid)

### 02 · Define · insight, persona & POV
- Statement (18px/700 white): `Students and fresh graduates who fear being replaced by AI need to ` + **highlight** `build the ability to direct and check AI's work` + `.`
- Points (mono label + text):
  - `INSIGHT · ` `The career risk is in judging AI output, not in prompting.`
  - `INSIGHT · ` `Fear of being replaced makes people avoid AI instead of learning it.`
  - `PERSONA · ` `Dinda, 18, a vocational software-engineering student who builds projects for clients.`
- Links:
  1. `Persona Dinda` → https://drive.google.com/file/d/1aKses4MIcfdFkR2dtYcVgTvtvuICa2A_/view?usp=sharing (icon: person)
  2. **primary** `Written report: POV & HMW` → https://drive.google.com/file/d/1mdllPSRCHJwUyjf6fvvWQnjL-DconcDb/view?usp=sharing (icon: download)

### 03 · Ideate · from 25 ideas to one site
- Funnel (28px/800): `~40 HMW` → `~25 ideas` → `3 chosen` (last one in rose-text)
- Summary: `The chosen ideas were checked again against four criteria: they build the ability to judge AI output, spread from person to person, turn fear into practice, and can be tested with a cheap prototype.`
- Links:
  1. `Brainstorming Canvas (HMW)` → https://drive.google.com/file/d/1pi4r2-yG54bKU6GkPgobVi1UaJ6qTE3l/view?usp=sharing (icon: board)
  2. **primary** `Brainstorming Canvas (Solution)` → https://drive.google.com/file/d/1J9oPQAbsVF8YFyFn2YTVaQK4sx-wjt34/view?usp=sharing (icon: board)

### 04 · Prototype · three parts, one product
- List (bold name · description):
  - `Level quiz` · `places your level instead of picking a career for you`
  - `AI Handbook` · `AI terms plus what to check`
  - `Step-by-step path` · `use it first, then understand it, with practice at every level`
- Links:
  1. **primary** `Prototype` → https://drive.google.com/file/d/1N1v5pGaCDgt40lIJjFAEmsnNzK3C4mWE/view?usp=sharing (icon: document). This is the card's only link.

### 05 · Test — not shown yet
Data shape stays the same; add it when testing is done (PRD FR2).

## Footer

- Logo: ASCII mark (`aria-label="Lumen logo"`) + wordmark `lumen`
- Bottom bar: `© LUMEN · GROUP 2 · DESIGN THINKING` · `WEBSITE BY GROUP 2`

## Brand voice (for any new copy)

- Say "Let's find out why the AI answered that way." Not "Master AI in 7 days or fall behind!"
- Say "Check the output first; you decide." Not "Let AI do everything."
- Values: **Clarity** (simple words, no scary jargon) · **Adaptive** (meets each level) · **Empowering** (the person keeps the judgment, not the AI).
