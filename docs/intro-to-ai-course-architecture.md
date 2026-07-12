# Intro to Artificial Intelligence course — architecture plan (Phase 1 audit)

A six-week "Intro to Artificial Intelligence" course for **grades 5–8**, replacing the
current blog redirect on the Curriculums page with a full, data-driven course built on
the site's existing Next.js App Router, Tailwind v4, and localStorage progress patterns.

This document is the **Phase 1 output**: a current-state audit plus the concrete
implementation architecture. No course-building work has started. The only foundational
observation that requires action before Phase 2 is a pre-existing type-check failure
(see [Known risks](#known-risks-and-unresolved-limitations)).

The design deliberately mirrors the existing **Robotics & Automation course**
(`/courses/robotics`), which is the most complete course in the repo and already
implements every subsystem this course needs (hub, weekly lessons, worksheets, teacher
guides, journal, review, final project, quizzes, versioned localStorage progress with
migrations, and unit tests). See `docs/robotics-course.md` for that course's reference.

---

## 1. Current-state audit

### 1.1 The AI course card, metadata, and current destination

The Curriculums page renders a hard-coded array of six course cards.

- **Card + grid + "Start Learning" button:**
  `components/pages/curriculums-page-content.tsx`
  - Course array is defined inline in `CurriculumsPageContent()` (lines 15–88). The AI
    entry is lines 76–87:
    ```ts
    {
      title: t.curriculumsPage.aiTitle,          // "Intro to Artificial Intelligence"
      description: t.curriculumsPage.aiDesc,
      image: "/images/curriculums/ai.jpg",
      grades: t.curriculumsPage.grades58,        // "Grades 5-8"
      duration: t.curriculumsPage.duration6Weeks,// "6 weeks"
      topics: t.curriculumsPage.aiTopics,        // ["What is AI?","Training a Model","Image Recognition","AI Ethics"]
      color: "bg-avanza-purple",
      borderColor: "border-avanza-purple",
      progress: 10,
      href: "/blog/what-is-ai-explaining-to-kids",   // <-- current destination
    }
    ```
  - The `CurriculumCard` component (lines 173–279) derives its status purely from the
    presence of `href`: `const status = href ? "available" : progress >= 25 ? "in-development" : "coming-soon"` (line 207). Because the AI card **has** an `href`, it currently
    renders as **"available"** and its "Start Learning" link (lines 260–266) points at the
    blog article. There is **no** analytics/tracking/progress behavior attached to the
    button — it is a plain `next/link`.

- **Card metadata source:** title/description/grades/duration/topics are **translated**
  keys in `i18n/translations.ts` under the `curriculumsPage` namespace, present in all
  three locales (`en`/`es`/`zh`). The image path, colors, `progress` number, and `href`
  are **hard-coded** in the component, not translated.
  - English keys (`i18n/translations.ts` ~lines 309–327): `aiTitle`, `aiDesc`, `aiTopics`,
    `grades58`, `duration6Weeks`.
  - Spanish (~lines 1847–1865) and Chinese (~lines 3380–3398) equivalents exist.

- **Current destination (blog article):**
  `app/blog/what-is-ai-explaining-to-kids/page.tsx`, whose content lives in
  `features/blog/posts.ts` (post id/slug `what-is-ai-explaining-to-kids`). This is a
  general "what is AI for kids" explainer — **not** a course. It stays in place; only the
  card's `href` will change.

- **There is currently no `/courses/artificial-intelligence` (or any AI course) route.**
  Confirmed by directory listing of `app/` — the only `/courses/*` trees are `robotics`,
  `science-experiments`, `math-adventures`, and `engineering-fundamentals`.

### 1.2 Framework, tooling, and conventions

| Concern | Finding |
|---|---|
| Framework | Next.js `^16.2.7`, App Router, React `19.2.4` |
| Package manager | **npm** (`package-lock.json`; no yarn/pnpm lockfiles) — do not introduce a second |
| Language | TypeScript `5.7.3`, `strict: true`, `noEmit`, `allowImportingTsExtensions` (imports use explicit `.ts`/`.tsx`), path alias `@/*` → repo root |
| Rendering | Mostly Server Components + `generateStaticParams` for dynamic segments; interactive pieces are `"use client"` leaf components |
| Styling | Tailwind v4 (`@tailwindcss/postcss`), brand tokens in `app/globals.css` (`--avanza-green/teal/purple/orange/dark`, `--chart-1..5`), `cn()` = `clsx` + `tailwind-merge` in `lib/utils.ts` |
| UI primitives | Radix (`@radix-ui/react-accordion`, `-progress`, `-tabs`), `lucide-react` icons |
| State | Local component state + custom localStorage hooks; **no** global store, no server DB, no auth |
| Localization | Custom dictionary in `i18n/translations.ts` + `LanguageProvider` (cookie `avanza-lang`); locale-prefixed routes only for a small allow-list (`/`, `/curriculums`, `/projects`, `/blog`) via `app/[locale]/**` + `middleware.ts` |
| Tests | Node's built-in test runner: `node --test "features/curriculums/**/*.test.ts"` (type-stripped, no type-check) |
| Lint / type-check | `npm run lint` = `eslint . && tsc --noEmit` |
| Build | `npm run build` = `next build` |
| Responsive | Tailwind default breakpoints; grids use `md:grid-cols-2 lg:grid-cols-3` patterns; mobile-first |

### 1.3 The reuse template — Robotics course (exact file map)

**Routes** (`app/courses/robotics/**`), all English-only (a `/es` or `/zh` prefix is
rewritten to the English route by `middleware.ts`):

| Route | File | Component type |
|---|---|---|
| `/courses/robotics` (hub) | `app/courses/robotics/page.tsx` | Server; `generateMetadata()` |
| `/courses/robotics/[lesson]` | `app/courses/robotics/[lesson]/page.tsx` | Server; `dynamicParams=false`, `generateStaticParams()` over `roboticsModuleSlugs()`, `notFound()` on miss |
| `.../[lesson]/worksheet` | `app/courses/robotics/[lesson]/worksheet/page.tsx` | Server → client print content |
| `.../[lesson]/teacher-guide` | `app/courses/robotics/[lesson]/teacher-guide/page.tsx` | Server → client print content |
| `/courses/robotics/journal` | `app/courses/robotics/journal/page.tsx` | Client |
| `/courses/robotics/final-project` | `app/courses/robotics/final-project/page.tsx` | Client |
| `/courses/robotics/review` | `app/courses/robotics/review/page.tsx` | Client |
| Course-scoped 404 | `app/courses/robotics/not-found.tsx` | Server |

**Curriculum data (single source of truth):** `features/curriculums/robotics.ts`
(`roboticsCurriculum: RoboticsCurriculum`, `modules: RoboticsModule[]`, all typed content
+ helper functions `getRoboticsModule(slug)`, `roboticsModuleSlugs()`, `roboticsPath`,
`roboticsLessonPath()`, `validateRoboticsCurriculum()`). Supporting logic files:
`robotics-quiz.ts` (pure grading), `robotics-progress.ts` (pure persistence + migrations),
`robotics-program.ts` / `robotics-missions.ts` / `robotics-sim.ts` (block-program AST +
simulator — robotics-specific, **not** reused here), `metadata.ts` (SEO generators).

**Presentation** (`components/pages/robotics-*.tsx`): `robotics-course-content`,
`robotics-lesson-content`, `robotics-lesson-steps`, `robotics-lesson-interactions`,
`robotics-knowledge-check`, `robotics-test-record`, `robotics-journal-content`,
`robotics-review-content`, `robotics-final-project-content`, `robotics-worksheet-content`,
`robotics-teacher-guide-content`, `robotics-progress-ui`, plus interactive widgets. All are
**data-driven** — they receive curriculum objects and render them; no lesson strings are
hard-coded in components.

### 1.4 How other courses are represented (structural fit)

| Course | Route root | Data file | Progress key | Structure |
|---|---|---|---|---|
| Robotics | `/courses/robotics` | `robotics.ts` | `avanza-robotics-progress-v2` | **Rich** — weeks→lessonFlow steps, activities, quizzes, journal, final project, migrations |
| Engineering | `/courses/engineering-fundamentals` | `engineering-fundamentals.ts` | `avanza-engineering-fundamentals-progress-v1` | Lesson list + interactions |
| Science | `/courses/science-experiments` | `science-experiments.ts` | `avanza-science-experiments-progress-v1` | Lesson list + completion/certificate |
| Math | `/courses/math-adventures` | `math-adventures.ts` | `avanza-math-adventures-progress-v1` | Lesson list + final project |
| Intro to Python | `/curriculums/intro-to-python` | `intro-to-python.ts` | `avanza-intro-to-python-progress-v1` | Week list (older `/curriculums/*` home) |

**Decision:** the AI course belongs under `/courses/*` and should reuse the **Robotics**
architecture. It is the only course whose data model already contains weeks, per-week
lesson flow steps, objectives, materials, vocabulary, worked examples, activities, a
discriminated-union knowledge-check, reflections, a final project, completion
requirements, teacher guidance, and a versioned+migratable progress schema. The AI
curriculum maps onto `RoboticsModule` almost 1:1, minus the robot-hardware-specific pieces
(equipment paths, block-program AST, simulator).

### 1.5 Progress & persistence (current state)

- **All** progress is **device-local `localStorage` only.** No cookies (except the
  language cookie), no `sessionStorage`, no URL state, no database, no auth, no `/api`
  persistence. SSR-safe: hooks read storage only in a post-mount `useEffect`, and every
  pure function guards `typeof window`.
- **Key convention:** `avanza-<course-slug>-progress-v<N>`. Keys are course-scoped, so
  courses never collide. Within Robotics, nested records are composite-keyed
  (`"${moduleId}:${promptId}"`, etc.) using **stable content ids**, never display text.
- **Versioning + migration exists only in Robotics** (`ROBOTICS_PROGRESS_VERSION = 2`,
  `avanza-robotics-progress-v2`, legacy `-v1`) via `migrateRoboticsProgress()` in
  `features/curriculums/robotics-progress.ts` — routes by `version`, coerces field-by-field
  with defaults, migrates v1→v2, and best-effort-coerces unknown/newer versions instead of
  wiping. This is the pattern to copy.
- **Free-text persistence already exists** (Robotics): `predictions`, `reflections`,
  `journal` entries, per-activity `notes`, and generic `activityData` (serialized JSON per
  interactive widget). Resume behavior exists via `lastVisited` + per-module `currentStep`.
- **Tests** cover storage round-trips, migrations, corruption recovery, and SSR safety:
  `robotics-progress.test.ts`, `robotics-program-persistence.test.ts`,
  `robotics-completion.test.ts`.

### 1.6 Localization (current state)

- Card/chrome strings are translated via `i18n/translations.ts` + `useLanguage().t`.
- **Course lesson content is English-only.** Every `/courses/*` course authors its lesson
  content as plain English strings inside its `features/curriculums/*.ts` data file, **not**
  through translation keys. `robotics.ts` documents this explicitly and notes a future
  localization pass could wrap records in `Record<Language, …>` (as `features/projects/data.ts`
  does) without moving content.
- Course routes are **not** locale-prefixed; `middleware.ts` rewrites `/es/courses/...`
  and `/zh/courses/...` to the English route and sets an `x-locale` header. `app/sitemap.ts`
  emits these paths as English-only (`enOnlyAlternates`, `en` + `x-default`).

---

## 2. Existing systems worth reusing

| Need | Reuse (as-is or by-pattern) | File |
|---|---|---|
| Course hub / weekly lesson / worksheet / teacher-guide / review / journal routing | **Copy the Robotics route tree** | `app/courses/robotics/**` |
| Curriculum data model & helpers | **Adapt `RoboticsModule`/`RoboticsCurriculum` types** (drop hardware fields) | `features/curriculums/robotics.ts` |
| Quiz / knowledge-check (single, multiple, true-false, ordering, matching, short, scenario) + immediate per-option feedback, aria-live status, keyboard-only ordering | **Reuse the discriminated-union model + pure grader + renderer** | `robotics.ts` (types), `robotics-quiz.ts`, `components/pages/robotics-knowledge-check.tsx` |
| Progress persistence + versioning + migrations + resume | **Copy the pure-logic pattern** | `robotics-progress.ts`, hook `components/ui/useRoboticsProgress.ts` |
| Editable data tables (datasets, confusion matrices, test logs) | **Reuse `TestRunsTable` / `RoboticsTestRecord` pattern** | `components/pages/robotics-test-record.tsx`, `robotics-final-project-content.tsx` |
| SVG diagrams (decision trees, confusion matrices, before/after, simple bar charts) | **Reuse the `Figure`/`ArrowMarker`/`Leader` SVG helper pattern** | `components/ui/science-diagrams.tsx`, `math-diagrams.tsx`, `engineering-diagrams.tsx` |
| Notes / reflections / journal input (blur-to-save, hydration-safe) | **Reuse the journal input pattern** | `components/pages/robotics-journal-content.tsx` |
| Completion screen + printable certificate (`@media print`) | **Reuse the Science certificate pattern** | `components/pages/science-progress-ui.tsx` |
| Print / download flow | **Reuse `PrintButton`** (tones green/purple/orange) | `components/ui/print-button.tsx` |
| Reduced motion / reveal-on-scroll / count-up | **Reuse hooks/components as-is** | `useReducedMotion.ts`, `hooks/use-in-view.ts`, `animate.tsx`, `count-up.tsx` |
| Accordion / Tabs / Progress bar | **Reuse Radix wrappers as-is** | `components/ui/{accordion,tabs,progress}.tsx` |
| Lightbox images | **Reuse `LightboxImage`** | `components/ui/lightbox-image.tsx` |
| SEO metadata generators | **Copy the generator pattern** | `features/curriculums/metadata.ts` |
| Card status/badge styling | **Keep `CurriculumCard`; just change the AI `href`** | `components/pages/curriculums-page-content.tsx` |

**Class/token conventions to reuse:** brand colors (`avanza-green/teal/purple/orange/dark`),
`--chart-1..5`, the shared button/input class strings, `focus-visible:ring-2` focus
convention, `.print-hidden` / print-scoped CSS, `cn()` for class merging.

---

## 3. Reuse-vs-new-build decision per system

| System | Decision | Notes |
|---|---|---|
| Route tree (hub, `[lesson]`, worksheet, teacher-guide, review, journal, final-project, not-found) | **Reuse (copy Robotics)** | New files under `app/courses/artificial-intelligence/**` |
| Curriculum types (`Course`, `Week`, `Lesson`, `LessonSection`, objective, material, vocab, worked example, activity, question, feedback, reflection, extension, final project, skill) | **Reuse w/ adaptation** | Fork the Robotics types into `ai-course.ts`; drop `EquipmentPath`, block AST, simulator, safety notes; add grades-7–8 `extension` + AI-specific activity kinds |
| Knowledge-check model + grader + renderer | **Reuse as-is** | The 8 question kinds already cover scenario/ordering/matching needs |
| Progress schema + persistence + migrations + hook | **Reuse (copy pattern)** | New key `avanza-artificial-intelligence-progress-v1`; new pure module + hook |
| Interactive activities (AI Detective, rule-builder, dataset-repair, image-classifier confidence demo, decision-tree walker, recommendation/filter-bubble demo, confusion-matrix reader, AI Design Studio) | **New build on reusable primitives** | Each is a `"use client"` leaf saving to `activityData` via the hook; built from existing table/SVG/quiz primitives. **No fake/mock model-training UIs, no placeholder buttons.** All processing is local & deterministic. |
| Dataset tables / confusion matrix | **New components, reusing table + SVG patterns** | |
| Decision tree / before-after / simple charts | **New SVG figures, reusing `Figure` helpers** | |
| Certificate / completion page | **Reuse (Science pattern)** | |
| Localization of lesson content | **Follow existing convention: English strings in the data file** | Card chrome stays in `translations.ts` (keys already exist) |
| Card `href` swap | **Small edit** | Blog → `/courses/artificial-intelligence` |

---

## 4. Proposed route structure

Course slug: **`artificial-intelligence`** (parallel to `science-experiments`,
`engineering-fundamentals`, `math-adventures`, `robotics`; matches the workshop label
"Artificial Intelligence"). English-only, like all `/courses/*`.

```
app/courses/artificial-intelligence/
  page.tsx                         # Hub: intro, outcomes, resume, 6-week list, review/final links
  not-found.tsx                    # Course-scoped 404 → hub
  [week]/page.tsx                  # Weekly lesson (dynamicParams=false, generateStaticParams, notFound on miss)
  [week]/worksheet/page.tsx        # Printable student worksheet
  [week]/teacher-guide/page.tsx    # Teacher/parent guide + answer key
  studio/page.tsx                  # Week 6 "AI Design Studio" final-project workspace
  assessment/page.tsx              # Final assessment (course-wide knowledge check)
  review/page.tsx                  # Review & resources: progress, scores, saved work, vocab, printables
  complete/page.tsx                # Completion page + printable certificate
```

Route/URL notes:
- Segment name `[week]` (the course is one lesson per week); alternatively `[lesson]` to
  match Robotics verbatim. Either is fine — **recommend `[week]`** for reader clarity.
- Six week slugs (kebab-case, stable, used as URL params and never renamed):
  `what-ai-is-and-is-not`, `data-and-model-training`, `image-recognition`,
  `text-ai-and-recommendations`, `responsible-ai`, `ai-design-studio`.
- **Individual lesson-steps** are **not** separate routes; they are `lessonFlow` steps
  rendered within a single `[week]` page with in-page anchors + a step sidebar (exactly as
  Robotics does with `robotics-lesson-steps.tsx`). This keeps deep-linking simple and
  static generation cheap. (If per-step routes are later desired, `[week]/[step]` can be
  added without breaking `[week]`.)
- **Final project studio** = `/studio` (Week 6 workspace). **Final assessment** =
  `/assessment`. **Completion** = `/complete`.
- **Invalid routes:** `dynamicParams = false` + `generateStaticParams()` over the six week
  slugs; unknown slugs call `notFound()` → `not-found.tsx`.
- **Migration/compat:** there is **no existing public AI course route to preserve**, so no
  redirects are required. The only change to existing behavior is the Curriculums card
  `href` (blog → course). The blog article stays live at its current URL. Register all new
  paths in `app/sitemap.ts` as English-only (hub + 6 weeks + 6 worksheets + 6 teacher
  guides + studio + assessment + review + complete).

---

## 5. Proposed TypeScript content model

New file **`features/curriculums/ai-course.ts`** (single source of truth), forked from the
Robotics types and trimmed. Content = data here; presentation/logic = components + pure
helpers. Every id is stable and used as a progress key.

```ts
export const AI_COURSE_ID = "artificial-intelligence" as const

export type GradeBand = "5-6" | "7-8" | "all"

export type Skill = { id: string; label: string; description: string }

export type LearningObjective = { id: string; text: string; skillId?: string }

export type VocabularyTerm = { term: string; definition: string }        // kid-friendly, accurate

export type Material = { id: string; name: string; optional?: boolean; note?: string }

export type WorkedExample = {
  id: string
  title: string
  steps: string[]            // walk-through, one idea per step
  takeaway: string
}

// Reused verbatim from Robotics — the 8-kind discriminated union already covers our needs.
export type AnswerOption = { id: string; text: string; correct: boolean; feedback: string }
export type KnowledgeCheckQuestion =
  | SingleChoiceQuestion | MultipleChoiceQuestion | TrueFalseQuestion
  | OrderingQuestion | MatchingQuestion | ShortResponseQuestion | ScenarioQuestion
  // (ProgramTracingQuestion from Robotics is dropped; not needed here)
export type KnowledgeCheck = {
  id: string
  instructions: string
  questions: KnowledgeCheckQuestion[]
  passThreshold: number      // engagement/score threshold for completion
}

// AI-specific interactive activities. Marker only — logic lives in a client component.
export type AiActivityKind =
  | "ai-detective"           // W1: classify everyday things as AI / not AI, with reasons
  | "rule-builder"           // W1: build if/then rules vs. learned patterns
  | "dataset-repair"         // W2: fix unbalanced / mislabeled / duplicate rows in a table
  | "image-classifier"       // W3: confidence, accuracy, false pos/neg on unseen examples
  | "confusion-matrix"       // W3: read/interpret a 2x2 (or NxN) matrix
  | "decision-tree"          // W4: walk a rule-based chatbot / decision tree
  | "next-text-predict"      // W4: fluent vs. factual next-text prediction
  | "recommendation"         // W4: recommendations + filter bubbles / limited data
  | "bias-explorer"          // W5: representation / bias in a dataset
  | "source-check"           // W5: verify source/context; deepfake/misinformation
  | "design-studio"          // W6: end-to-end AI design brief

export type Activity = {
  id: string
  kind: AiActivityKind
  title: string
  goal: string               // the point, one sentence
  instructions: string[]     // guided-but-open steps (tap + keyboard friendly)
  successCriteria: string[]  // observable checklist
  interactive?: AiActivityKind  // present => renders the client widget
  gradeBand?: GradeBand
}

export type ReflectionPrompt = { id: string; prompt: string }

export type Extension = {    // optional grades 7–8 stretch
  id: string
  title: string
  body: string[]
  gradeBand: "7-8"
}

export type LessonSectionKind =
  | "learn" | "explore" | "worked-example" | "activity"
  | "knowledge-check" | "reflection" | "extension"

export type LessonSection = {
  id: string
  kind: LessonSectionKind
  title: string
  focus: string              // one line
  body?: string[]            // prose for "learn"/"explore"
  activityId?: string        // for "activity"
  minutes?: number
}

export type CompletionRequirement = { id: string; label: string; sectionKind?: LessonSectionKind }
export type CourseWeekCompletion = { requirements: CompletionRequirement[]; summary: string }

export type NextWeekConnection = { weekId: string | null; teaser: string; prepare: string[] }

export type TeacherGuidance = {
  setup: string[]
  facilitation: string[]
  commonMisconceptions: string[]
  questionsToAsk: string[]
  easierVersion: string
  harderVersion: string
}

export type CourseWeek = {                 // == "Lesson" (one lesson per week)
  id: string                                // e.g. "week-1" (stable forever)
  slug: string                              // e.g. "what-ai-is-and-is-not" (URL param)
  week: number                              // 1..6
  isFinal?: boolean                         // Week 6
  title: string
  subtitle: string
  summary: string
  mainQuestion: string                      // driving question, one sentence
  estimatedTime: string                     // "45-60 minutes"
  objectives: LearningObjective[]
  vocabulary: VocabularyTerm[]
  materials: Material[]
  concepts: { id: string; title: string; body: string[]; examples?: string[] }[]
  workedExamples: WorkedExample[]
  sections: LessonSection[]                 // ordered lesson flow (the "steps")
  activities: Activity[]
  knowledgeCheck: KnowledgeCheck
  reflection: ReflectionPrompt[]
  extensions: Extension[]                   // grades 7–8
  completion: CourseWeekCompletion
  teacherGuidance: TeacherGuidance
  nextWeek: NextWeekConnection
  finalProject?: FinalProject               // Week 6 only
}

export type FinalProjectRequirement = {
  id: string; label: string; description: string
  category: "problem" | "appropriateness" | "io-design" | "prototype" | "responsibility" | "presentation"
  required: boolean
}
export type RubricLevel = { label: "Beginning" | "Developing" | "Proficient" | "Exemplary"; descriptor: string }
export type RubricCategory = { id: string; name: string; description: string; weightPercent: number; levels: RubricLevel[] }
export type FinalProject = {
  id: string
  title: string
  overview: string
  brief: { id: string; label: string; hint: string }[]   // planning-brief fields
  requirements: FinalProjectRequirement[]
  rubric: RubricCategory[]                                // weights sum to 100
}

export type AiCourse = {
  slug: typeof AI_COURSE_ID
  title: string; subtitle: string; description: string
  gradeRange: string                        // "Grades 5-8"
  totalWeeks: number                        // 6
  duration: string                          // "6 weeks"
  summary: string
  format: string[]
  skills: Skill[]                           // course-wide skills
  learningGoals: string[]
  weeks: CourseWeek[]                       // the six weeks, flat, in order
}

// Helpers (mirror robotics.ts):
export function getAiWeek(slug: string): CourseWeek | undefined
export function aiWeekSlugs(): string[]
export const aiCoursePath = "/courses/artificial-intelligence"
export function aiWeekPath(slug: string): string
export function validateAiCourse(course?: AiCourse): string[]   // asserted empty by tests
```

**Content-vs-logic split:** all strings, objectives, vocab, worked examples, activity
copy, questions/feedback, reflections, extensions, teacher guidance, rubric text → live in
`ai-course.ts` (and possibly split per-week into `ai-course-week-N.ts` for file size, as
Robotics does). All rendering, grading, persistence, and widget behavior → components +
pure helpers (`ai-quiz.ts` may simply re-export the Robotics grader if the union matches;
otherwise fork it).

---

## 6. Proposed progress & persistence model

New pure module **`features/curriculums/ai-progress.ts`** + thin hook
**`components/ui/useAiCourseProgress.ts`**, copying the Robotics pattern. Storage key:
**`avanza-artificial-intelligence-progress-v1`** (course-scoped → no collision with the
existing seven keys). Include a `version` field from day one so migrations are cheap later.

```ts
export const AI_PROGRESS_VERSION = 1 as const
export const AI_STORAGE_KEY = `avanza-artificial-intelligence-progress-v${AI_PROGRESS_VERSION}`

export type KnowledgeCheckAttempt = {
  checkId: string
  selectedAnswers: Record<string, string>   // questionId -> answer
  score: number; total: number
  reviewed: boolean; attempts: number
  savedAt: string
}

export type ActivityState = {                 // generic per-activity saved state
  activityId: string
  completed: boolean
  data: string                                // serialized widget state (JSON string)
  notes: string
  savedAt: string
}

export type SavedResponse = { id: string; value: string; savedAt: string }  // reflections/predictions/brief fields

export type StudentNote = { id: string; value: string; savedAt: string }

export type CertificateInfo = {
  earned: boolean
  earnedAt: string | null
  studentName: string                         // typed locally, never transmitted
}

export type FinalProjectProgress = {
  brief: Record<string, string>               // fieldId -> text
  selfEvaluation: Record<string, string>      // rubricCategoryId -> chosen level
  savedAt: string | null
}

export type AiCourseProgress = {
  courseId: typeof AI_COURSE_ID
  version: number
  completed: string[]                         // week ids
  started: string[]                           // week ids
  lastVisited: string | null                  // week id (resume)
  currentStep: Record<string, string>         // weekId -> last section id
  startedAt: Record<string, string>
  completedAt: Record<string, string>
  unlockAll: boolean                          // teacher override
  knowledgeChecks: Record<string, KnowledgeCheckAttempt>
  assessment: KnowledgeCheckAttempt | null    // final assessment
  activities: Record<string, ActivityState>   // key: activityId
  reflections: Record<string, string>         // promptId -> text
  notes: Record<string, StudentNote>          // free-text student notes
  finalProject: FinalProjectProgress
  certificate: CertificateInfo
  updatedAt: string | null
}

export function emptyAiProgress(): AiCourseProgress
export function migrateAiProgress(data: unknown): AiCourseProgress   // version-routed, default-coercing
export function loadAiProgress(storage: StorageLike | undefined): AiCourseProgress
export function saveAiProgress(storage: StorageLike | undefined, p: AiCourseProgress): void
// pure mutators (return new state): markWeekStarted/Complete, setCurrentStep,
// saveQuizAttempt, saveAssessment, saveActivityState, saveReflection, saveNote,
// saveBriefField, saveSelfEval, setUnlockAll, earnCertificate, resetWeek, resetCourse
export function canAccessWeek(p: AiCourseProgress, weekId: string, course: AiCourse): boolean
export function weekCompletionPercent(p: AiCourseProgress, week: CourseWeek): number
```

Collision & safety: distinct key; content-id keys (never display text); SSR-guarded;
try/catch JSON with field-by-field coercion; unknown/newer versions coerced, not wiped.
Progress belonging to other courses is untouched.

---

## 7. Localization strategy

- **Card chrome** (title, description, grade range, duration, topics): already translated
  in `i18n/translations.ts` (`curriculumsPage.aiTitle/aiDesc/aiTopics/grades58/duration6Weeks`,
  en/es/zh). Keep using these keys; **do not** duplicate English strings in components.
- **Course lesson content** (`ai-course.ts`): authored as **English strings in the data
  file**, consistent with every other `/courses/*` course. Do not route lesson content
  through `translations.ts`. A future localization pass can wrap records in
  `Record<Language, …>` without moving content (same note as `robotics.ts`).
- **UI status labels** inside course components (buttons like "Start Learning", status
  badges) that already exist as `curriculumsPage.*` keys should reuse those keys.
- **Routing:** English-only; rely on `middleware.ts` rewrite for `/es` and `/zh`. Register
  new paths as English-only in `app/sitemap.ts` (`enOnlyAlternates`).

---

## 8. Activity architecture

Each interactive activity is a small **`"use client"` leaf component** under
`components/pages/ai/` that:
1. receives a typed `Activity` (+ any dataset it needs) from the curriculum data,
2. reads/writes only its slice of progress via `useAiCourseProgress().saveActivityState(activityId, …)`,
3. is built from **existing primitives** (editable tables, SVG `Figure`s, the
   knowledge-check renderer, blur-to-save inputs), and
4. is **fully local and deterministic** — no network calls, no model training, no camera
   or microphone requirement, no upload reuse.

Planned widgets (mapped to the six weeks) and their reused primitives:

| Week | Activity | Built from |
|---|---|---|
| 1 | **AI Detective** (sort examples: AI vs ordinary software, w/ reasons) | knowledge-check `scenario`/`single` renderer + notes |
| 1 | **Rule-builder challenge** (compose if/then rules; compare to learned patterns) | editable list + deterministic evaluator + SVG flow |
| 2 | **Dataset-repair challenge** (balance classes, fix mislabels, remove duplicates) | editable `TestRunsTable`-style grid; local validation |
| 3 | **Image-classifier demo** (accuracy, confidence, false pos/neg on unseen set) | dataset table + bar-chart SVG (fixed sample data, no real model) |
| 3 | **Confusion matrix reader** | NxN SVG grid `Figure` + text summary |
| 4 | **Decision-tree walker** (rule-based chatbot) | SVG tree `Figure` + stepper |
| 4 | **Next-text prediction** (fluent vs factual) | choice UI + feedback, canned examples |
| 4 | **Recommendation / filter bubble** | list + toggles + before/after SVG |
| 5 | **Bias explorer** + **Source-check** (verify source/context; human oversight/appeals) | dataset table + scenario questions + notes |
| 6 | **AI Design Studio** (problem → is-AI-appropriate → I/O/labels/features/rules → prototype plan → responsibility → presentation) | multi-field brief + rubric self-eval (Science/Robotics final-project pattern) + print |

Every widget: keyboard-operable, tap alternative to any drag, `aria-live` status, visible
focus rings, reduced-motion aware, high-contrast text, and a text summary alongside any
chart/matrix.

---

## 9. Testing strategy

- **Unit tests** (`features/curriculums/**/*.test.ts`, run via `npm test` / Node test
  runner — type-stripped, framework-free):
  - `ai-course.test.ts` — `validateAiCourse()` returns empty; six weeks; unique
    slugs/ids; every `activityId`/`checkId` referenced by a section resolves; rubric
    weights sum to 100; slugs are stable kebab-case.
  - `ai-quiz.test.ts` — grading across all question kinds (or reuse `robotics-quiz`
    tests if the grader is shared).
  - `ai-progress.test.ts` — empty state, mark started/complete, resume target,
    quiz/assessment/activity/reflection/note round-trips, certificate earn, unlock-all,
    corruption recovery, SSR-safe (`undefined` storage), and `version` migration
    scaffold.
- **Type-check:** `npm run lint` (`eslint . && tsc --noEmit`).
- **Build:** `npm run build`.
- **Route smoke:** confirm `generateStaticParams` prerenders six week slugs and unknown
  slugs 404 (matches Robotics behavior already verified by build output).
- Keep the same npm scripts; **do not** add a test framework or a second package manager.

---

## 10. Accessibility & privacy strategy

**Accessibility** (reuse existing patterns — the repo already does most of this):
- Keyboard-only operation for every control; **no** hover-only instructions; ordering via
  arrow buttons (existing pattern), not mouse drag; tap alternative to any drag.
- Semantic headings/forms; `role="group"`, `aria-live="polite"` status regions,
  `aria-pressed`/`aria-label` on stateful buttons (reuse knowledge-check patterns).
- `useReducedMotion()` respected; no confetti for routine step completion (a single,
  optional, reduced-motion-aware celebration only on final certificate).
- High-contrast brand tokens; supports browser zoom; responsive mobile/tablet/desktop
  (mobile-first Tailwind grids), targeting school Chromebooks/tablets/laptops.
- **Text summary next to every chart/diagram/confusion matrix**; dataset tables are real
  `<table>`/`<dl>` semantics, not divs-only.
- Slow-network/unsupported-browser: content is static + local; interactive widgets
  degrade to readable static content (feature-detect `localStorage`/`matchMedia`, no hard
  dependency on exotic APIs).

**Privacy:**
- **No** required personal information, **no** account, **no** microphone, camera optional
  with an upload/typed alternative.
- All processing is **local and deterministic**; **no** student uploads or inputs are sent
  anywhere or used for "training." No new `/api` calls. Progress + any typed name live only
  in `localStorage` on the device and are disclosed as such.

---

## 11. Ordered implementation plan (Phases 2+)

1. **Card swap (tiny):** change the AI card `href` from `/blog/what-is-ai-explaining-to-kids`
   to `/courses/artificial-intelligence` in `curriculums-page-content.tsx`. (Do this only
   once the hub route exists, to avoid a dead link.)
2. **Types + validation:** author `features/curriculums/ai-course.ts` (types + helpers +
   `validateAiCourse`) and `ai-course.test.ts` with an empty/stub course that validates.
3. **Progress:** `ai-progress.ts` + `useAiCourseProgress.ts` + `ai-progress.test.ts`
   (copy Robotics, trim).
4. **Grader:** reuse or fork `ai-quiz.ts`; tests.
5. **Routing shells:** hub, `[week]`, worksheet, teacher-guide, review, studio, assessment,
   complete, not-found — wired to data + metadata generators; register in `sitemap.ts`.
6. **Presentation:** `components/pages/ai/*` (course content, lesson content + step
   sidebar, knowledge check, review, worksheet, teacher guide, progress UI, certificate).
7. **Week content:** author Weeks 1–6 content in the data file(s).
8. **Activity widgets:** build the interactive activities (Section 8) on reused primitives.
9. **Final project studio + assessment + completion/certificate.**
10. **Full pass:** `npm run lint`, `npm test`, `npm run build`; manual route + a11y smoke.

Content stays in data files; presentation/activity logic stays in components — separation
preserved throughout.

---

## 12. Known risks and unresolved limitations

- **Pre-existing type-check failure (blocks `npm run lint`).** On the untouched baseline,
  `npm run lint` exits **2** because `tsc --noEmit` reports:
  `features/curriculums/robotics-journey.test.ts(32,8): error TS2724: '"./robotics-progress.ts"' has no exported member named 'RoboticsProgress'`.
  `RoboticsProgress` is exported from `features/curriculums/robotics.ts`, not from
  `robotics-progress.ts` (which only imports it). This is **unrelated to the AI course**
  and was present before any Phase 1 change. It does **not** break `npm run build` (exit 0
  — Next.js doesn't compile test files) or `npm test` (exit 0, 114/114 — Node strips types
  without checking). **Recommended one-line fix** (defer to Phase 2 unless you want it
  now): change the import in `robotics-journey.test.ts` to pull `RoboticsProgress` from
  `./robotics.ts`, or re-export the type from `robotics-progress.ts`. Left unfixed in Phase
  1 to respect the audit-only scope and avoid touching an unrelated course.
- **Lint warnings (46, 0 errors):** pre-existing React `set-state-in-effect` and
  "value cannot be modified" warnings across unrelated files; not introduced here.
- **English-only content:** consistent with the repo, but means the AI course is not
  translated at launch; the card chrome is. Wrapping content later is a known follow-up.
- **No account-based persistence:** progress is device-local; clearing browser storage or
  switching devices loses progress. This matches every existing course (acceptable, but
  worth stating to stakeholders). A schema `version` is included to ease any future move.
- **"Image recognition" / "image classifier" activities use fixed sample data**, not a
  real trained model, to honor the privacy and "no fake model-training UI" constraints.
  This is a deliberate scope choice, not a limitation to fix.
- **Slug choice** (`artificial-intelligence` vs `intro-to-ai`) and segment name
  (`[week]` vs `[lesson]`) are the two open naming decisions; both are low-risk and do not
  affect the architecture.

---

## Appendix — commands & baseline results (Phase 1)

Run with the repo's existing npm scripts:

| Command | Result |
|---|---|
| `npm run build` | ✅ exit 0 — full production build succeeds |
| `npm test` | ✅ exit 0 — 114/114 pass (114 tests, 0 fail) |
| `npm run lint` (`eslint . && tsc --noEmit`) | ❌ exit 2 — eslint passes (46 warnings, **0 errors**); `tsc` fails on the **pre-existing** `robotics-journey.test.ts` import error above (not introduced by this audit) |
