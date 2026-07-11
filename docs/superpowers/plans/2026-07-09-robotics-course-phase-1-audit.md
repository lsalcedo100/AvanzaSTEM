# Robotics & Automation Course — Phase 1 Audit & Implementation Plan

**Date:** 2026-07-09
**Scope:** Turn the existing *Robotics & Automation* curriculum card (currently a redirect to a single LEGO project) into a complete 8-week course for grades 4–6.
**Status:** Investigation only. No curriculum implementation started. Verification-only actions documented below.

---

## 1. Current "Start Learning" behavior (traced to source)

The Robotics card lives in the curriculum grid, **not** as its own course yet.

- **Card definition:** [curriculums-page-content.tsx:64-75](../../../components/pages/curriculums-page-content.tsx#L64-L75). The robotics entry sets `href: "/projects/lego-robot-builder"`, `grades: grades46`, `duration: duration8Weeks`, `progress: 15`.
- **Rendering / click logic:** [curriculums-page-content.tsx:207-274](../../../components/pages/curriculums-page-content.tsx#L207-L274). Because the card has an `href`, `status` resolves to `"available"`, so it renders a `next/link` "Start Learning" arrow (line 260-266) pointing at that href. (Cards without `href` fall back to a "Get launch updates" anchor to the newsletter signup.)
- **Redirect target:** `/projects/lego-robot-builder` — a **single project guide**, not a course. Route: [app/projects/lego-robot-builder/page.tsx](../../../app/projects/lego-robot-builder/page.tsx), rendered by `LegoRobotGuide` from project data in [features/projects/data.ts](../../../features/projects/data.ts). Category key `"robotics"` exists in the project taxonomy.
- **Live verification (dev server):** the rendered `/curriculums` HTML contains `href="/projects/lego-robot-builder"`; that project returns **200**; `/courses/robotics` returns **404** (no course route exists yet).

**So "Start Learning" today = jump to one LEGO build guide.** There is no robotics hub, no weekly modules, no lessons, no progress, no data file.

---

## 2. Framework & tooling baseline

| Concern | Finding |
|---|---|
| Framework | Next.js `^16.2.7`, App Router, React 19.2 |
| Language | TypeScript 5.7.3, strict (see `tsconfig.json`) |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`), CSS custom-prop tokens in [app/globals.css](../../../app/globals.css) (`--avanza-green/-teal/-purple/-orange/-dark`), `tw-animate-css`. `cn()` merge helper in `lib/utils.ts`. |
| UI primitives | Radix (`accordion`, `progress`, `tabs`), `lucide-react` icons, local wrappers in `components/ui/`. |
| Physics/sim libs installed | `matter-js ^0.20` (+ types), `leaflet` (workshop map), `cloudinary`. **No Blockly, no Scratch-blocks, no react-dnd, no drag-drop lib, no state-management lib, no schema-validation lib (no zod), no PDF lib.** |
| Print | Browser `window.print()` via [components/ui/print-button.tsx](../../../components/ui/print-button.tsx) + `.print-hidden` / print CSS in globals. No PDF generation. |
| Commands | `npm run dev` (webpack), `npm run build`, `npm run start`, `npm run lint` (= `eslint . && tsc --noEmit`). **No test runner script.** |
| Tests present | Ad-hoc `*.test.ts` files (`circuit-levels.test.ts`, `density-model.test.ts`) but **no configured runner** in `package.json` — they are not executed by any npm script. |

### Commands run & results (this phase)
- `npm run lint` (eslint + `tsc --noEmit`): **exit 0 — 0 errors, 37 warnings.** All 37 warnings are pre-existing `react-hooks/set-state-in-effect` in the progress hooks' hydration pattern (e.g. `useScienceProgress.ts:80`). **Not caused by this phase.**
- `npm run build`: **exit 0.** Full static/SSG build succeeds; `/projects/lego-robot-builder` prerenders `○ (Static)`.
- Dev server + curl: robotics card href, project 200, `/courses/robotics` 404 all confirmed (§1).
- Note: `timeout` is not installed on this macOS host — initial wrapped runs no-op'd; commands were re-run without it.

---

## 3. Existing course architecture (the pattern to follow)

There are **two conventions**; the three newest courses use the newer one.

### Route conventions
- **NEW (preferred):** `/courses/<slug>` with `/courses/<slug>/[lesson]` lesson pages, and **per-lesson** sub-routes `/[lesson]/worksheet` and `/[lesson]/teacher-guide`. Used by **engineering-fundamentals, math-adventures, science-experiments**.
- **LEGACY:** `/curriculums/intro-to-python` with `[week]` numeric slugs and **course-level** `/teacher-guide` + `/worksheets`. Only intro-to-python uses this. **Do not use for robotics.**

Lesson routes use `export const dynamicParams = false`, `generateStaticParams()` from a slug list, `generateMetadata()` from a per-slug metadata helper, and `notFound()` when the slug misses. Reference: [app/courses/engineering-fundamentals/[lesson]/page.tsx](../../../app/courses/engineering-fundamentals/%5Blesson%5D/page.tsx) and its `worksheet/page.tsx`.

### Data model (single source of truth per course)
Each course is one data file in `features/curriculums/` that owns types, the curriculum object, path helpers, and lookups. Reference: [features/curriculums/engineering-fundamentals.ts](../../../features/curriculums/engineering-fundamentals.ts). Exports pattern:
- Types: `EngineeringConcept`, `EngineeringTest`, `EngineeringTeacherGuide`, `EngineeringLesson`, `EngineeringCurriculum`, `EngineeringDiagramKind`.
- Object: `engineeringFundamentalsCurriculum` (`slug`, `title`, `gradeRange`, `lessons[]`, materials/props).
- Path helpers: `engineeringFundamentalsPath` = `` `/courses/${slug}` ``, `engineeringLessonPath(slug)`, `engineeringWorksheetPath(slug)`, `engineeringTeacherGuidePath(slug)`.
- Lookups: `getEngineeringLesson`, `engineeringLessonSlugs`, `previousEngineeringLesson`, `nextEngineeringLesson`.

Lesson pages compose from this data (design brief, concepts, constraints, materials, testing table, redesign prompts, optional `diagram` → `EngineeringDiagram`, `comparedMaterials` → `EngineeringMaterialComparison`). Reference: [components/pages/engineering-fundamentals-lesson-content.tsx](../../../components/pages/engineering-fundamentals-lesson-content.tsx).

### Metadata & sitemap
- Per-course metadata generators live in [features/curriculums/metadata.ts](../../../features/curriculums/metadata.ts) (`generate<Course>Metadata`, `generate<Course>LessonMetadata`, worksheet/teacher-guide variants). All use `languageAlternates(path)`.
- Courses are registered in [app/sitemap.ts](../../../app/sitemap.ts): imported, lesson/resource path arrays built, added to `ENGLISH_ONLY_PATHS`, a `staticRoutes` hub entry added, and per-lesson `buildRouteEntries` appended to the return array.

### Localization
- Dictionary: [i18n/translations.ts](../../../i18n/translations.ts) — one large key-based object with `en`/`es`/`zh` mirrors. `VALID_LANGUAGES = ["en","es","zh"]`. Robotics **card** strings already exist (`roboticsTitle`, `roboticsDesc`, `roboticsTopics`, `grades46`, `duration8Weeks`) at translations.ts:302-321 (en), 1833-1852 (es), 3359-3378 (zh).
- `middleware.ts` only routes `/`, `/projects`, `/blog`, and the `/curriculums` **index** through the localized `app/[locale]` tree. **All `/courses/*` pages are English-only** (middleware rewrites `/es|/zh/courses/...` to the English route with an `x-locale` header; content stays English). The three shipped courses are English-only and marked so in the sitemap. Robotics should follow suit for Phase 2 and defer full es/zh lesson translation.

---

## 4. Progress & persistence systems

- **All progress is localStorage-only. No accounts, no server, no DB.** Only `/api/contact` and `/api/subscribe` exist.
- Each course **re-implements the same hook** (copy-paste, not a shared factory): `useEngineeringProgress`, `useScienceProgress`, `useIntroToPythonProgress`, `useMathProgress`. Shape: `{ completed[], started[], ... }` under a versioned key `avanza-<course>-progress-v1`.
- Hydration-safe pattern: `useState(emptyProgress)` + `useRef` mirror + `loaded` flag set inside a `useEffect` that reads localStorage (this is the source of the 37 lint warnings). UI gates status display on `loaded`.
- **Two unlock strategies:** fully-open (Engineering, Science — every lesson clickable) vs. sequential (Python `showAll`, Math `unlockAll`) with a **teacher/parent override** toggle. Math has a dedicated "Parent & teacher controls" panel with unlock-all + reset ([math-adventures-progress-ui.tsx](../../../components/pages/math-adventures-progress-ui.tsx)).
- **Resume behavior:** linear scan for first incomplete (open courses) or first unlocked-incomplete (sequential courses).
- **Games** (`useDensityProgress`, `useCircuitProgress`, `useLogicGameProgress`) track richer per-level records (`unlockedUpTo`, stars, attempts, best). Only `useCircuitProgress` has a v1→v2 **migration** — a model for versioning.
- **No design-journal / saved-results / saved-artifact persistence exists anywhere.** Science shows on-paper tables and print certificates; nothing is saved. This is a genuine gap the robotics course must build (saved block programs, saved simulator results, journal entries).
- `code-path-robot.tsx` is the outlier: it persists to a **cookie**, not localStorage.

---

## 5. Interactive/simulation assets (reuse analysis for block editor + robot sim)

| Component | Model | Reuse for Robotics |
|---|---|---|
| **`components/ui/code-path-robot.tsx`** | Grid robot (5×5–8×8), walls/stars/goal, **hand-rolled drag-drop** block sequencing (`forward`/`left`/`right`), step simulation (`STEP_MS`), undo/redo, level unlock, cookie progress | **Primary base for BOTH the block editor and the robot-on-a-grid simulator.** Already ~90% of an unplugged/simulator robot lesson. Needs: extend block set (loop, if/sensor, wait), add sensors, migrate cookie→versioned localStorage. |
| `logic-game/*` | Guided levels + evaluator + hints + progress hook, dropdown (not DnD) | Reuse the **level/challenge + hints + evaluation data model** and `useLogicGameProgress` shape for knowledge-checks. |
| `marble-run*`, `circuit-builder` | Grid placement + rule/path simulation, tool palette, localStorage best-scores | Reuse **grid-placement + level model + tool-palette** patterns; circuit's tool selection informs block palette UX. |
| `python-workspace` / `python-playground.worker` | **Pyodide in a web worker** (CDN, SRI-pinned), custom textarea editor, `input()` support, output cap/timeout | Reuse only if a *text-code* path is wanted for older/advanced learners; **not** needed for block programming. Good execution-sandbox reference. |
| `matter-js` via `jenga-tower.tsx`, custom physics in `catapult-*`/`gravity-sandbox` | 2D physics | Not needed for grid navigation. Reserve matter-js only if a free-motion robot is desired later. |
| `EngineeringDiagram`, `math/science-diagrams` | SVG figure components keyed by enum | Reuse the **`diagram?: Kind` on lesson data → `<Diagram kind>`** pattern for robot/sensor/flowchart figures. |

**Key facts:** all drag-drop is hand-rolled with pointer events + pointer capture (`code-path-robot.tsx` `computeDropIndex`, `beginDrag`; `marble-run`). **No Blockly.** Recommendation: **do not add Blockly** — extend `code-path-robot`'s proven DnD + step engine into a reusable block-program component.

---

## 6. Risks to shared components / other courses

1. **`curriculums-page-content.tsx` card edit** (change robotics `href` `/projects/lego-robot-builder` → `/courses/robotics`) touches the shared grid all six cards render from. Low risk (one field), but re-verify all cards after.
2. **`i18n/translations.ts`** is a single 4,600-line object typed as `typeof en`; adding robotics keys means adding parallel `es`/`zh` keys or TS breaks. Any missing mirror key fails `tsc`.
3. **`sitemap.ts`** is hand-assembled; forgetting the robotics block silently drops SEO coverage. Follow the existing 6-step registration.
4. **Copy-paste progress hooks** mean no shared abstraction to break — but also that a new `useRoboticsProgress` won't benefit others. Introducing a *generalized* course/progress system would touch 4 shipped courses (higher risk) — **not recommended for Phase 2**.
5. **Pre-existing 37 lint warnings** are the accepted hydration pattern; a new robotics hook will add more of the same. Keep the pattern to stay consistent; don't "fix" others' hooks in this work.
6. The `"robotics"` project category and the LEGO project guide must **keep working** — Phase 2 should *add* a course, not delete the project (the course can link to it as its hardware track).

---

## 7. Technical gaps to build in Phase 2

- **No block-based programming editor** (must extend `code-path-robot` into a reusable component).
- **No robot simulator abstraction** beyond the single `code-path-robot` widget (needs sensors, richer blocks, multiple maps).
- **No saved-artifact persistence** (block programs, simulator results, design-journal entries) — new versioned-localStorage schema required.
- **No robotics data file, no `/courses/robotics` routes, no robotics metadata generators, no sitemap entries.**
- **No es/zh lesson content** (acceptable: courses are English-only today).
- **No configured test runner** — pure-logic modules (simulator step function, unlock logic) should ship with `*.test.ts` mirroring existing test files, but a runner (e.g. `vitest`/`node --test`) must be wired if we want them executed.

---

## 8. Recommended architecture

**Extend the existing `/courses` system; do NOT build a new generalized course framework** (too much blast radius across 4 shipped courses for no Phase-2 benefit). Mirror engineering-fundamentals structurally, and add robotics-specific interactive + persistence layers.

### Recommended routes
```
/courses/robotics                              → course hub (overview, 8-week schedule, progress, resume, teacher controls)
/courses/robotics/[module]                     → weekly module (1 of 8; concepts, paths, lesson(s), knowledge check)
/courses/robotics/[module]/[lesson]            → individual lesson  (only if modules hold multiple lessons)
/courses/robotics/[module]/worksheet           → printable worksheet (per module)
/courses/robotics/[module]/teacher-guide       → teacher/parent guide (per module)
/courses/robotics/journal                      → design-journal (saved localStorage entries, print)
/courses/robotics/final-project                → final-project planner (saved plan)
```
Simplest faithful mapping: treat each **week = one `[lesson]` slug** (`week-1`…`week-8` or descriptive slugs) exactly like engineering, with per-lesson worksheet + teacher-guide, plus two extra top-level routes for journal and final project. Add a "review area" as a section on the hub or a `/review` route. Decide module-vs-lesson nesting when scoping Phase 2 content depth.

### Recommended data model (`features/curriculums/robotics.ts`)
Follow engineering's shape, add robotics fields:
- `RoboticsCurriculum { slug:"robotics", title, gradeRange:"Grades 4-6", weeks:8, lessons: RoboticsModule[] }`.
- `RoboticsModule { slug, order, isFinal?, title, summary, estimatedTime, concepts[], paths: {hardware, simulator, unplugged}, knowledgeCheck: Quiz, teacherGuide, worksheet fields, diagram?, blockChallenge?, prerequisites? }`.
- `paths` encodes the **hardware / simulator / unplugged** tri-track requirement per module.
- `knowledgeCheck` reuses the logic-game level/hint/answer-explanation shape (question, options, correct, explanation shown immediately).
- Path helpers `roboticsPath`, `roboticsLessonPath`, `roboticsWorksheetPath`, `roboticsTeacherGuidePath`; lookups mirroring engineering.

### Recommended progress model (`components/ui/useRoboticsProgress.ts`)
Copy the established hook pattern (hydration-safe, versioned key `avanza-robotics-progress-v1`), extended:
```
{ completed:string[], started:string[], unlockAll:boolean,          // like Math (sequential + teacher override)
  lastVisited:string|null,
  savedPrograms: Record<challengeId, BlockProgram>,                 // saved block programs
  savedSimResults: Record<challengeId, SimResult>,                  // saved simulator results
  journal: JournalEntry[], finalProjectPlan: FinalProjectPlan|null } // design journal + final project
```
Use **module prerequisites + `unlockAll` teacher toggle** (Math pattern) since robotics concepts build sequentially. Add a v1→v2 migration stub from day one (circuit precedent).

### Block editor & robot simulator approach
- Extract a reusable `RobotProgram` component from `code-path-robot.tsx`: keep its DnD (`computeDropIndex`/`beginDrag`) and step engine; parameterize blocks (add `repeat`, `if sensor`, `wait`) and maps via the data file. **No Blockly.**
- Simulator = the same grid+step engine, extended with sensor reads (front-distance, line) and a win/goal spec per module. Keep step animation (~380 ms) for readability.
- Migrate its cookie persistence to the course's versioned localStorage so saved programs/results live with the rest of progress.

### Visual direction (per house style)
Follow the shipped courses: typography + spacing hierarchy, restrained bordered cards, Radix `Progress` bar, SVG diagrams, `PrintButton` for handouts. **Avoid** points/coins/streaks/trophies, emoji, confetti-as-reward, badge walls, glass panels, gradient overload, decorative-only illustrations. (Note: `code-path-robot` currently uses confetti + level-up sounds — tone these down / make optional when generalizing, to match the workshop-syllabus aesthetic.)

---

## 9. Recommended implementation order (Phase 2)

1. **Data file** `features/curriculums/robotics.ts` — types, curriculum object with all 8 modules (content-complete, no placeholders), path helpers, lookups. Unit-test the pure lookups/unlock logic.
2. **Metadata generators** in `features/curriculums/metadata.ts`.
3. **Routes**: hub `page.tsx`, `[lesson]/page.tsx`, `[lesson]/worksheet`, `[lesson]/teacher-guide`, plus `journal` + `final-project`. Mirror engineering route files.
4. **Progress hook** `useRoboticsProgress.ts` + progress UI (hub panel, resume, teacher unlock controls) modeled on Math.
5. **Reusable block-program + simulator** component extracted from `code-path-robot`; wire saved programs/results into progress.
6. **Content components**: module content, knowledge-check with immediate explanations, worksheet, teacher-guide, journal, final-project planner.
7. **Flip the card**: change robotics `href` to `/courses/robotics` in `curriculums-page-content.tsx`; keep LEGO project as the linked hardware track.
8. **Sitemap** registration (6-step pattern).
9. **Verify**: `npm run lint`, `npm run build`, dev-server viewport check of hub + a lesson at mobile/tablet/desktop; confirm other 5 cards unaffected.

---

## 10. Files inspected (key)

- `package.json`, `tsconfig.json`, `middleware.ts`, `next.config.mjs`, `app/globals.css`
- `components/pages/curriculums-page-content.tsx` (robotics card + click logic)
- `app/projects/lego-robot-builder/page.tsx`, `features/projects/data.ts` (redirect target)
- `features/curriculums/engineering-fundamentals.ts`, `features/curriculums/metadata.ts` (data-model + metadata reference)
- `app/courses/engineering-fundamentals/page.tsx` + `[lesson]/page.tsx` + `[lesson]/worksheet/page.tsx` (route conventions)
- `components/pages/engineering-fundamentals-lesson-content.tsx` (lesson composition)
- `components/ui/print-button.tsx` (print system)
- Progress hooks & UIs (`useEngineeringProgress/useMathProgress/useScienceProgress/useIntroToPythonProgress`, `math-adventures-progress-ui.tsx`, etc.)
- Interactive: `code-path-robot.tsx`, `logic-game/*`, `marble-run*`, `circuit-builder.tsx`, `python-workspace.tsx`/worker, `jenga-tower.tsx`, `catapult-*`, `gravity-sandbox.tsx`
- `i18n/translations.ts` (robotics keys), `lib/i18n-routes.ts`, `lib/get-language.ts`, `app/sitemap.ts`

## 11. Files changed
- **This document only** (`docs/superpowers/plans/2026-07-09-robotics-course-phase-1-audit.md`). No code changed. No placeholder routes/pages/components added.

## 12. Assumptions
- Robotics course targets **grades 4–6, 8 weeks** (matches existing card metadata).
- Course should be **English-only initially** (consistent with the 3 shipped `/courses` courses); es/zh lesson content deferred.
- The LEGO project guide **stays** and becomes the course's hardware track rather than being replaced.
- No accounts/DB will be introduced — progress remains device-local localStorage.

## 13. Phase-2 decisions

**Resolved (confirmed 2026-07-09):**
1. **Granularity → one lesson per week.** Each of the 8 weeks is a single `/courses/robotics/[lesson]` page, exactly like engineering-fundamentals. No module/sub-lesson nesting. Data model collapses to a flat `lessons[]` of 8 (+ optional final); drop the `[module]/[lesson]` route from §8.
2. **Learning paths → shared content + path callouts.** One lesson body per week with hardware / simulator / unplugged **callout boxes**, not three separate content sets. `RoboticsModule` carries a single body plus a `paths: { hardware, simulator, unplugged }` callout object.
3. **Tests → wire a runner.** Add `vitest` (or `node --test`) + a `test` npm script; ship real executed tests for simulator step logic and unlock/prereq rules.

**Still to confirm during Phase 2:**
4. **Card flip timing** — flip robotics `href` to `/courses/robotics` as the final step vs. gating until content is complete (recommend: flip last, once all 8 lessons are content-complete).
5. **Simulator scope** — recommend the extended `code-path-robot` grid; confirm no free-motion/matter-js physics is expected.
