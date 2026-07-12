# Curriculums Page Redesign — Phase 1: Architecture Audit & Implementation Plan

This is the **Phase 1 output**: a current-state audit of how the Curriculums page is built
today, plus a concrete, phased implementation plan for a full visual + structural redesign.
**No visual/structural changes have been made yet.** The goal of this phase is to understand
the existing architecture, identify what to reuse, flag data-model and asset gaps, and set a
baseline.

Precedent: this follows the same audit-first pattern as
[`docs/intro-to-ai-course-architecture.md`](./intro-to-ai-course-architecture.md).

---

## 0. Baseline (established this phase)

Run before any change; all three currently pass:

| Command | Result |
|---|---|
| `npm run lint` (`eslint . && tsc --noEmit`) | **0 errors, 69 warnings** — `tsc` clean |
| `npm test` (`node --test "features/curriculums/**/*.test.ts"`) | **273 pass / 0 fail** |
| `npm run build` | not run this phase (not required for audit); run before shipping |

The 69 lint warnings are **pre-existing** and unrelated to the redesign — mostly
`react-hooks/set-state-in-effect` in the localStorage progress hooks
(`useRoboticsProgress.ts`, `useScienceProgress.ts`, etc.) plus two `no-unused-vars` /
`no-unused-expressions` in `intro-to-ai-*` files. **The redesign must not increase this count.**

> Note: `docs/intro-to-ai-course-architecture.md` recorded a pre-existing `tsc` failure
> (`robotics-journey.test.ts` importing a non-exported `RoboticsProgress`). That is **now
> fixed** — `tsc --noEmit` exits clean today.

---

## 1. Current architecture

### 1.1 Routes

Two route entry points render the **same** component:

- [`app/curriculums/page.tsx`](../app/curriculums/page.tsx) — canonical **English** `/curriculums`.
  Calls `generateCurriculumsMetadata("en")`, returns `<CurriculumsPageContent />`.
- [`app/[locale]/curriculums/page.tsx`](../app/[locale]/curriculums/page.tsx) — statically
  pre-rendered **`/es/curriculums`** and **`/zh/curriculums`** (`generateStaticParams` → `es`,`zh`).
- [`app/curriculums/layout.tsx`](../app/curriculums/layout.tsx) — injects `WebPage` JSON-LD;
  wraps the English route **and** the nested `intro-to-python` course sub-routes.
- Locale routing: English is unprefixed; `es`/`zh` live under `/es`,`/zh`.
  [`middleware.ts`](../middleware.ts) passes `/es|/zh` + `curriculums` straight through to the
  `[locale]` tree; all other localized paths get rewritten to the English route with an
  `x-locale` header. See [`lib/i18n-routes.ts`](../lib/i18n-routes.ts).

> Route inconsistency to preserve carefully: Intro to Python lives under
> **`/curriculums/intro-to-python`**, while every other course lives under **`/courses/*`**
> (`/courses/robotics`, `/courses/intro-to-artificial-intelligence`, etc.). The redesign must
> keep these exact hrefs.

### 1.2 Main page component

[`components/pages/curriculums-page-content.tsx`](../components/pages/curriculums-page-content.tsx)
(`"use client"`, 312 lines). Reads translations via `useLanguage()`. Renders, in order:

1. **Hero** (L95–116) — full-bleed `bg-gradient-to-br from-avanza-green to-avanza-teal py-20`,
   centered `<h1>`, description, and a `rounded-2xl … backdrop-blur shadow-sm` "launch banner"
   card with a **"Join the Newsletter" CTA** anchoring to `#curriculum-launch-signup`.
2. **Curriculum grid** (L118–137) — `grid gap-8 md:grid-cols-2 lg:grid-cols-3`, six
   `<CurriculumCard>`s wrapped in staggered `<FadeIn>`.
3. **"How These Paths Grow"** (L139–163, coded as "How It Works") — heading
   `t.curriculumsPage.howItWorks`, three numbered `<StepCard>`s.
4. **Newsletter** (L165–171) — `<NewsletterSignup sectionId="curriculum-launch-signup">`.

Two local sub-components: `CurriculumCard` (L176–291), `StepCard` (L293–311).

### 1.3 Listing data source (this is a redesign focus)

The card list is a **hard-coded inline array** in the page component (L16–91) — **not** sourced
from `features/curriculums/`. Each entry:

```ts
{
  title, description,               // from t.curriculumsPage.*  (translated)
  image: "/images/curriculums/*.jpg",
  grades, duration,                 // translated strings ("Grades 3-6", "8 weeks")
  topics: [...],                    // translated string[] → renders as pills
  color, borderColor,               // per-course brand tint (bg-avanza-purple, etc.)
  progress: 65,                     // hard-coded number, drives status
  href,                             // destination
  illustration?: "ai-journey",      // AI card only → swaps image for <JourneyDiagram>
}
```

The six entries and their live routes:

| Course | Grades | Duration | href |
|---|---|---|---|
| Intro to Python | 3–6 | 8 weeks | `/curriculums/intro-to-python` |
| Engineering Fundamentals | 2–5 | 6 weeks | `/courses/engineering-fundamentals` |
| Science Experiments | 2–4 | 6 weeks | `/courses/science-experiments` |
| Math Adventures | 2–5 | 10 weeks | `/courses/math-adventures` |
| Robotics & Automation | 4–6 | 8 weeks | `/courses/robotics` |
| Intro to Artificial Intelligence | 5–8 | 6 weeks | `/courses/intro-to-artificial-intelligence` |

Card copy (titles/descriptions/topics/grades/durations) lives in
[`i18n/translations.ts`](../i18n/translations.ts) under `curriculumsPage` (en ~L266–328,
es ~L1810, zh ~L3343). `image`/`color`/`progress`/`href`/`illustration` are hard-coded in the
component.

The **rich per-course data model** (drives the actual course pages, not the listing) is the
`Curriculum` type in `features/curriculums/intro-to-python.ts` (L114–139): `slug, title,
subtitle, description, gradeRange, totalWeeks, estimatedTimePerWeek, requirement, summary,
format[], outcomes[], lessonFlow[], facilitator, weeks[]`. Instances:
`introToPythonCurriculum`, `engineeringFundamentalsCurriculum`, `scienceExperimentsCurriculum`,
`mathAdventuresCurriculum`, `roboticsCurriculum`, `introToAiCourse`. There is **no central
registry** joining the listing to these objects — `features/curriculums/metadata.ts` imports
them only for SEO metadata.

### 1.4 The redesign problems, mapped to code

| # | Problem (brief) | Where it lives |
|---|---|---|
| 1 | Generic AI course-directory feel | whole page composition |
| 2 | Over-reliance on rounded cards / pills / badges / soft shadows | `CurriculumCard` L225 (`rounded-2xl border-2 shadow-sm`), topic pills L256–264, status badge L269 |
| 3 | Every card identical | `curriculums.map` L122–134 |
| 4 | Oversized generic hero | Hero L95–116 (`py-20`, full green gradient, centered) |
| 5 | Newsletter over-weighted at top | hero "launch banner" CTA L104–113 + `#curriculum-launch-signup` |
| 6 | Vague descriptions (don't say what students build) | `t.curriculumsPage.*Desc` in `translations.ts` |
| 7 | Inconsistent imagery (stock + illustration + generated) | `/public/images/curriculums/*` — see §5 |
| 8 | "How These Paths Grow" describes internal process | L139–163 + `step1..3` copy in `translations.ts` |
| 9 | No preview of a real lesson | *missing entirely* |
| 10 | Crowded nav, equal weight | [`components/layout/navbar.tsx`](../components/layout/navbar.tsx) L56–65 (8 equal pills) |
| 11 | Too centered/symmetrical | `text-center` + symmetric grid throughout |
| 12 | Card typography too small, weak hierarchy | `text-sm`/`text-xs` bodies (L242–260) |

---

## 2. Reusable systems & components (do NOT rebuild)

These are solid and should be **reused as-is or lightly restyled**, not replaced:

**Localization**
- `useLanguage()` / `LanguageProvider` (`components/providers/language-provider.tsx`) — the
  `{ language, setLanguage, t }` context. All new copy goes through `t.curriculumsPage.*` keys
  added to **all three** locales in `i18n/translations.ts` (structural type-match is enforced
  by `Translations = typeof en`, so a missing es/zh key fails `tsc`).
- `lib/i18n-routes.ts`, `middleware.ts`, `app/[locale]` tree — leave untouched.

**Layout & chrome**
- `Navbar` (`components/layout/navbar.tsx`) — reuse; **refine hierarchy only** (see Phase 2).
  Inline language switcher (desktop L157–203, mobile L208–253) stays.
- `Footer` (`components/layout/footer.tsx`) — reuse as the existing site footer (structure item
  #10). Already modified in git (added a "Courses" column) — keep that.
- Root layout, skip link, `<main id="main-content">` — untouched.

**UI primitives / helpers**
- `cn()` (`lib/utils.ts`), `FadeIn` (`components/ui/animate.tsx`, reduced-motion aware),
  `CountUp`, `LightboxImage` (requires `alt`), `PrintButton`, Radix `accordion`/`tabs`/`progress`.
- `NewsletterSignup` (`components/blog/newsletter-signup.tsx`) + `POST /api/subscribe`
  (Resend-backed, honeypot, no-JS fallback) — **reuse unchanged**; just move it down the page
  and drop the hero CTA (structure item #9).
- `JourneyDiagram` (`components/pages/intro-to-ai/journey-diagram.tsx`) — purposeful in-course
  SVG; good candidate to keep for the AI card / lesson-preview instead of the generated `ai.jpg`.

**Lesson-experience source for the "preview" section (item #6 in target structure)**
- The as-built AI course is the richest, most authentic thing to preview:
  `components/pages/intro-to-ai/lesson-content.tsx` renders a `LessonSection[]` discriminated
  union derived by `lessonSections(lesson)` (`features/curriculums/intro-to-ai.ts` L348–365):
  `objectives → opening → prediction → vocabulary → concept → worked-example → visual →
  activity → knowledge-check → challenge → reflection → recap → extension`.
- Section sub-components already exist and are reusable/screenshottable: `prediction.tsx`,
  `worked-example.tsx`, `knowledge-check.tsx`, `vocabulary.tsx`, `shared.tsx`
  (`VisualBlock`, `Breadcrumbs`), plus live activity widgets in
  `components/pages/intro-to-ai/activities/`.
- **Preview strategy:** build a compact, static, non-interactive excerpt of one real lesson
  (e.g. Week 1 "AI or Not") using the existing section components or a faithful screenshot —
  no new lesson content invented.

**Design tokens (reuse; see §4 for the small additions)**
- Brand: `avanza-green #2ecc71` (primary), `avanza-green-dark #1b7e44`, `avanza-dark #1a1a2e`
  (navy text/foreground), section tint `--secondary #f0faf4`, page frame
  `--avanza-navbar #dbf2a5`. Accents: teal `#1abc9c`, purple `#8b5cf6`, orange `#f97316`.
  All defined in [`app/globals.css`](../app/globals.css) `:root` + `@theme inline`.
- Fonts: **Nunito** (`font-sans`) + Roboto Mono (`font-mono`) via `next/font`.
- Containers: `mx-auto max-w-7xl px-6` (wide) / `max-w-3xl px-6` (reading). Sections `py-20`.
- Existing focus ring: `focus-visible:ring-2 ring-avanza-green ring-offset-2`.
- Accessibility patterns are strong (skip link, focus rings, `aria-live` save states, reduced
  motion double-covered, semantic `<section>/<figure>/<nav aria-label>`); **match them**.

---

## 3. What to build new (per target structure)

Target page order → build status:

| # | Section | Status | Notes |
|---|---|---|---|
| 1 | Refined site navigation | **restyle** `navbar.tsx` | reduce visual crowding, introduce hierarchy/primary action; do not change link set behavior/routes |
| 2 | Compact, left-aligned hero | **new** | replace green-gradient centered hero; warm off-white bg, navy text, left-aligned, authentic copy; **remove** the newsletter launch-banner CTA |
| 3 | Grade / duration / setting filters | **new** | simple client-side filter over the card list; needs a `learningSetting` data field (see §4) |
| 4 | One featured curriculum | **new** | promote one course (e.g. Robotics or Intro to AI — the two most complete) to an editorial featured block |
| 5 | Full curriculum catalog | **restructure** existing grid | keep 6 courses; break card monotony, larger type, thin borders, ≤12px radius, minimal shadow, no topic pills, no per-card status badges |
| 6 | Preview of a real lesson | **new** | static excerpt of one AI-course lesson (reuse §2 section components) |
| 7 | "What every curriculum includes" | **new** | replace "How These Paths Grow"; describe the shared learning model (weekly lessons, hands-on activity, knowledge check, reflection, worksheets/teacher guides, offline options, local progress) — all real, derivable from the course data |
| 8 | Real workshop / student-work section | **new** | use authentic photos from `/public/images/workshops` + `/about` (see §5) |
| 9 | Newsletter signup near bottom | **move** existing `NewsletterSignup` | unchanged component, relocated; drop hero CTA |
| 10 | Existing footer | **reuse** `footer.tsx` | as-is |

---

## 4. Data-model changes needed

The listing is currently an inline array; the redesign adds filtering and a featured item.
Recommended changes (small, additive):

1. **Extract the listing into a typed source.** Create a `CurriculumCardEntry[]` (e.g. a new
   `features/curriculums/catalog.ts` or a `const` in the page) with an explicit type instead of
   the inline object. This makes filtering and the featured pick clean.

2. **Add a `learningSetting` field** to each entry — required for the filter in structure item
   #3. Values should be real and honest, e.g. `"online-self-paced" | "workshop" | "unplugged"`
   (several courses explicitly support unplugged / kit / simulator / library-workshop modes per
   their `format[]` and facilitator data). Derive from each course's existing `format[]` where
   possible rather than inventing.

3. **Add structured `gradeMin`/`gradeMax` and `weeks` numbers** (instead of only the display
   strings `grades36` / `duration8Weeks`) so grade and duration filters can compare numerically.
   Keep the translated display strings for rendering.

4. **Drop / repurpose the fabricated `progress` number.** The `progress: 65/40/30/...` values
   are not real completion data and currently only feed a status heuristic where **all six
   cards resolve to "Available"** anyway. Remove it, or replace with a real per-course
   readiness flag if one is genuinely needed. Do **not** surface fabricated percentages.

5. **Add a `featured: boolean`** (or a single `FEATURED_SLUG` constant) for structure item #4.

6. **Descriptions (item #6):** rewrite the vague `*Desc` strings in `translations.ts` to say
   what students actually build/learn, sourced from each course's real `summary` / `outcomes`
   in `features/curriculums/*`. This is a **copy** change across en/es/zh, not a schema change.
   (Also fix the stale es/zh `curriculumsPage` metadata that still says "curriculums in
   development" while en describes them as live.)

No changes are needed to the per-course `Curriculum` model, the progress/localStorage systems,
or the course/lesson/project pages themselves.

---

## 5. Assets

### 5.1 Real Avanza STEM assets available (verified by inspection)

**Authentic workshop photography — `/public/images/workshops/`** (confirmed real, in-the-room
library/community-space photos of Avanza sessions):
- `AI Workshop Description.JPG` — teen instructors, "Today's topic — Artificial Intelligence" on screen
- `Building Workshop Description.jpeg`, `Coding Workshop Description.png`
- `past-coding.jpg` — kids with laptops in a library room (verified real)
- `past-engineering.jpg`, `past-science.jpg`
- `roseland-free-public-library-coding.jpeg` — "Activity: Human Robots" session (verified real)
- `upcoming-bridge-building.jpg`, `upcoming-python.jpg`, `upcoming-robotics.jpg`

**Real team / people photos — `/public/images/about/`**: named headshots (Alejandro Villafana,
Dilan Valencia, Elijah Morales, Jacobo Velez, Logan Smith, Thomas Flick, Enqi, Liam),
`liam-and-enqi.jpg`. Real, but people-portraits — use for an about/team context, not as course art.

**Real project photography — `/public/images/projects/`**: `baking-soda-volcano/cover.jpg`,
`popsicle-stick-bridge/cover.jpg` (+ `diagram.png`, `template.svg`),
`simple-circuit-light/cover.jpg` (+ `step-6-lit-circuit.jpg`), `coke-mentos-experiment/cover.jpg`,
`elephant-toothpaste-experiment/cover.jpg`, `making-oobleck/cover.jpg`,
`my-first-python-program/cover.jpeg`, plus balloon/rubber-band/lemon-battery images. These are
authentic hands-on project shots — good for a "student work / what they build" band.

**Shared**: `/public/images/shared/ai-workshop.jpg`, `lego-robotics.jpeg`;
`/public/childrenworkingtogether.png`.

**In-product visuals (authentic, not stock)**: `JourneyDiagram` and the SVG diagram helpers in
`components/pages/intro-to-ai/` — real course visuals, ideal for the AI course and the lesson
preview.

**Course screenshots**: none exist as static files, but the lesson/hub/activity pages render
real UI that can be **screenshotted** for the preview section (item #6) — no fabrication needed.

### 5.2 Weak / inauthentic assets to replace (verified)

`/public/images/curriculums/` is exactly the "inconsistent mixture" the brief flags:
- **`ai.jpg`** — **AI-generated composite** (humanoid robot, lab-coat figure, drone, glowing
  network mesh). The single worst "generic AI platform" offender. The page already side-steps
  it via `illustration: "ai-journey"` → `JourneyDiagram`. **Do not use `ai.jpg`.**
- **`robotics.jpg`** — studio **stock** photo (child + toy robots, staged lighting).
- **`python.jpg`** — generic **stock** (Python logo over blurred code).
- `engineering.jpg`, `math.jpg`, `science.png`, `ai.png` — same folder; treat as
  stock/placeholder pending verification, replace with real workshop/project photos.

### 5.3 Missing assets (do NOT invent — flag for the client to supply)

- **Per-course authentic cover images** for Python, Engineering, Math, Science, Robotics to
  replace the stock/generated `/curriculums/*` set. Until supplied, prefer **reusing real
  workshop/project photos** already in-repo (§5.1) over any stock/generated image.
- **Static course screenshots** for the lesson-preview section, if a screenshot is preferred
  over rendering live components.
- Any **captions/consent** context for workshop photos (who/where/when) — do not fabricate
  participation numbers, dates, partner names, or student quotes. Only use details the client
  confirms.
- The redesign must not add testimonials, headcounts, partner logos, or workshop stats that
  aren't backed by a real, client-provided source.

---

## 6. Implementation order (phases)

Each phase ends by re-running the §0 baseline (`npm run lint && npm test`) and must keep
warnings at ≤ 69 and tests at 273/0.

- **Phase 1 — Audit & plan (this document).** ✅ Complete. No visual changes.
- **Phase 2 — Design foundation (no page rewrite yet).**
  Extract shared `Button` / `Card` / `Container` primitives from the repeated utility strings
  (§ design audit found none exist), settle the redesign tokens (thin borders, ≤12px radius,
  minimal shadow, larger card type), and refine `navbar.tsx` hierarchy. Small, isolated diffs.
- **Phase 3 — Data model.**
  Extract the typed `CurriculumCardEntry[]` catalog, add `learningSetting` / numeric
  grade+duration / `featured`, remove fabricated `progress`, and rewrite the en/es/zh
  descriptions to concrete "what you build" copy (fixing the stale es/zh metadata).
- **Phase 4 — Page structure.**
  Rebuild `curriculums-page-content.tsx` to the 10-section target order: compact left-aligned
  hero → filters → featured → catalog → lesson preview → "what every curriculum includes" →
  real workshop/student-work → newsletter (moved down) → footer. Restyle cards (kill pills,
  per-card badges, heavy shadows; larger type; break symmetry).
- **Phase 5 — Assets & content.**
  Swap stock/generated `/curriculums/*` imagery for real workshop/project photos (or
  client-supplied covers), wire the lesson-preview excerpt/screenshot, and finalize copy. Flag
  any still-missing client assets rather than substituting stock.
- **Phase 6 — QA.**
  Responsive check (design is `md`-centric — verify `sm`/`md`/`lg`), a11y pass (focus order,
  alt text on every new image, filter controls keyboard-operable + `aria`), reduced-motion,
  three-locale check (es/zh render + no missing keys), then `npm run build`.

---

## 7. Key file reference

| Concern | Path |
|---|---|
| Listing page component (rebuild target) | `components/pages/curriculums-page-content.tsx` |
| English route + JSON-LD layout | `app/curriculums/page.tsx`, `app/curriculums/layout.tsx` |
| Localized route | `app/[locale]/curriculums/page.tsx` |
| Listing SEO metadata | `features/curriculums/metadata.ts` |
| Card copy (en/es/zh) | `i18n/translations.ts` → `curriculumsPage` |
| Per-course data model + instances | `features/curriculums/{intro-to-python,engineering-fundamentals,science-experiments,math-adventures,robotics,intro-to-ai}.ts` |
| Lesson experience (preview source) | `components/pages/intro-to-ai/lesson-content.tsx` + `intro-to-ai-types.ts` / `intro-to-ai.ts` |
| Nav + inline language switcher | `components/layout/navbar.tsx` |
| Footer | `components/layout/footer.tsx` |
| Newsletter + API | `components/blog/newsletter-signup.tsx`, `app/api/subscribe/route.ts` |
| i18n context / routing | `components/providers/language-provider.tsx`, `lib/i18n-routes.ts`, `middleware.ts` |
| Design tokens | `app/globals.css` (`:root` + `@theme inline`) |
| Class-merge helper | `lib/utils.ts` (`cn()`) |
| Real assets | `public/images/{workshops,about,projects,shared}/` |
| Stock/generated to replace | `public/images/curriculums/*` |
