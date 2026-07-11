# Robotics & Automation course — architecture & maintenance

An 8-week robotics course for grades 4–6, built on the site's existing Next.js App
Router, Tailwind v4, and localStorage progress patterns. This is the developer
reference for the whole system (Phases 1–15).

## Route structure

All under `/courses/robotics` (English-only, like the other `/courses/*` courses;
`/es` and `/zh` are rewritten to the English route by `middleware.ts`).

| Route | Page | Notes |
|---|---|---|
| `/courses/robotics` | Hub | Intro, outcomes, path picker, resume, module list, review links, final-project preview |
| `/courses/robotics/[lesson]` | Weekly lesson (= module; one lesson per week) | `dynamicParams=false`, `generateStaticParams` over `roboticsModuleSlugs()`, `notFound()` on miss |
| `/courses/robotics/[lesson]/worksheet` | Printable student worksheet | `window.print()` friendly |
| `/courses/robotics/[lesson]/teacher-guide` | Parent & teacher guide + answer key | print-friendly |
| `/courses/robotics/review` | Review & resources | progress, scores, saved work, vocabulary, printables index |
| `/courses/robotics/journal` | Design journal | saved journal entries |
| `/courses/robotics/final-project` | Final-project workspace | mission choice (incl. student-proposed), 13-field planning brief, embedded block editor, 3-run test table, weighted rubric self-eval (15/20/25/15/20/5), "Print project brief" |
| `/courses/robotics/not-found.tsx` | Course-scoped 404 | link back to hub |

The course card in `components/pages/curriculums-page-content.tsx` links to
`/courses/robotics` (the old `/projects/lego-robot-builder` redirect was removed;
the LEGO project guide still exists as an optional hardware reference).

Sitemap: registered in `app/sitemap.ts` (hub + 8 lessons + worksheets/teacher-guides
+ review/journal/final-project).

## Curriculum architecture

Single source of truth: `features/curriculums/robotics.ts`.
- `roboticsCurriculum: RoboticsCurriculum` with `modules: RoboticsModule[]` (8 weeks, flat).
- Each `RoboticsModule` holds identity, `learningGoals`, `vocabulary`, `prerequisites`,
  `concepts`, `materials`, `activities` (each with three `EquipmentVariantSet` variants
  and an optional `interactive` widget marker), `predictionPrompts`, `testRecords`,
  `debuggingMissions`, `knowledgeCheck`, `reflection`, `journalPrompts`, `savedPrograms`,
  `simulatorMissions`, `lessonFlow`, `safetyNotes`, `printableResources`, `completion`,
  `teacherGuidance`, `nextWeek`, and (Week 8) `finalProject`.
- Metadata generators: `features/curriculums/metadata.ts`.
- Runtime validation: `validateRoboticsCurriculum()` (in `robotics.ts`) — asserted empty by tests.

### Knowledge-check question kinds
Discriminated union `KnowledgeCheckQuestion` on `kind`: `single`, `multiple`,
`true-false`, `ordering`, `matching`, `short`, `trace` (program tracing), `scenario`.
Rendered by one component (`robotics-knowledge-check.tsx`); graded by the pure
`robotics-quiz.ts`.

## Progress schema

`RoboticsProgress` (in `robotics.ts`), persisted to `localStorage` key
`avanza-robotics-progress-v2` by `components/ui/useRoboticsProgress.ts`.
- Pure logic in `features/curriculums/robotics-progress.ts` (framework-free, testable).
- Fields: equipment path, started/completed, per-module step + timestamps, `unlockAll`,
  `knowledgeChecks`, `predictions`, `activityResults`, `activityData` (generic interactive
  state), `testRecords`, `debugFindings`, `savedPrograms` (legacy) + `savedProgramAsts`
  (block editor), `savedSimulatorResults` (full run records), `journal`, `reflections`,
  `finalProject`, `updatedAt`.
- **Migrations:** `migrateRoboticsProgress` routes by `version`: current (`coerceV2`,
  field-by-field defaulting), v1/legacy → `migrateV1toV2`, unknown → best-effort coerce.
  Corrupt JSON → fresh state (never throws). Program ASTs and sim results are re-validated
  on load. Bump `ROBOTICS_PROGRESS_VERSION` and add a migration branch when the shape changes.
- Hydration-safe: reads run only inside a `useEffect`; server + first client render use the
  empty state (the source of the accepted `set-state-in-effect` lint warnings, matching the
  other course hooks).

## Equipment paths

Three paths — `kit`, `simulator`, `unplugged` — modelled as `variants` on each activity
(shared framing + path-specific materials/setup/instructions/safety/expected result/
success criteria/troubleshooting/extension). The path picker saves the choice; switching
never clears saved work. No path is a "reduced" version. Per-week `safetyNotes` render on the
lesson ("Stay safe") and worksheet; `ROBOTICS_SAFETY` (in `robotics.ts`) is the course-wide
four-family briefing (batteries/circuits, motors/gears, moving robots, tools/materials) shown
in every teacher guide. Materials are kit-agnostic — no specific product is required.

## Block-program model

`features/curriculums/robotics-program.ts` — a typed, serializable, versioned AST
(`Program` = `{ version, variables, body: Statement[] }`), independent of visual block ids.
- `execute(program, world, {maxSteps})` — generator interpreter with a hard step budget
  (`ExecutionLimitError`, infinite-loop protection); no `eval`.
- `parseProgram` safely rejects malformed input; `validateProgram` gives specific,
  non-solution feedback.
- Editor: `components/pages/robotics-block-editor.tsx` — a keyboard-first structured block
  editor (the accessible alternative; no drag required) + execution controls + SVG grid.
  Insert via palette buttons, reorder with ↑/↓, edit values in labeled selects/inputs, delete
  with ✕; an `aria-live` "Robot state" panel exposes every sensor value as text; a full-screen
  Expand mode closes on Escape and returns focus. Reduced motion jumps the run to its end.
- Persistence: `savedProgramAsts` (revision-tracked, keyed by spec id).

## Simulator architecture

`features/curriculums/robotics-sim.ts` (engine) + `robotics-missions.ts` (worlds).
- `traceRun` records poses/collisions/sensor readings; `runMission` = trace + checks +
  likely-cause feedback; `feedbackFor` produces specific diagnostics (never the full answer).
- `readSensors` (in `robotics-program.ts`) is the shared sensor read (distance/touch/line/
  light/color) used by the sim, the block editor, and the Week 4 Sensor Lab.
- 10 missions (timed-delivery, maze, obstacle-detection, `debug-stopper` (a deliberately
  broken starter students fix), obstacle-avoidance, line-following, counting, stop-in-zone,
  autonomous-mission, final-project). Tests assert every `example` passes all its checks and
  every `starter` does not, so a broken/incomplete mission fails CI. `buildResultRecord` → the
  full saved result (mission, spec, trial, time, collisions, sensor events, final position,
  notes, revision).
- Deterministic (no randomness), so students can debug logically. Page-hide pauses the run;
  reduced motion jumps to the final state instead of animating.

## Interactive lesson activities

Data-driven: set `interactive: <kind>` on an `Activity` in `robotics.ts`; the lesson
renderer (`robotics-lesson-interactions.tsx` → `InteractiveActivity`) renders the matching
client widget, which saves to `activityData` via `saveActivityData(key, value)` (key =
`<kind>:<activityId>`) and marks the activity done via `saveActivityResult`.
Widgets: `robot-or-not`, `system-mapper`, `helpful-robot`, `chassis-lab`, `sensor-lab`.
The Week 2 chassis model lives in `components/ui/chassis-model.ts` (pure, testable).

## How to…

- **Add/edit a lesson:** edit the module record in `robotics.ts` (types + `validateRoboticsCurriculum`
  keep it honest). Routes/metadata/sitemap are already generic over `roboticsModuleSlugs()`.
- **Add a mission:** add a `MissionKind` + entry in `robotics-missions.ts` (world, starter,
  example, checks — keep the invariant that `example` passes and `starter` does not). Then make
  it playable in `robotics-lesson-content.tsx`: add a `savedPrograms` spec on the week and map
  its `spec.id` in `PROGRAM_MISSION` (each week's first program falls back to `MODULE_MISSION`;
  additional programs must be listed explicitly). Optionally restrict its palette with
  `PROGRAM_ALLOWED_BLOCKS` (e.g. sequence-only weeks). A debugging mission is just a mission
  whose `starter` is broken in one diagnosable way.
- **Add an interactive activity:** add a kind to `InteractiveActivityKind`, build a client
  widget that reads/saves `progress.activityData["<kind>:<id>"]`, wire it in
  `InteractiveActivity`, and set `interactive` on the activity.
- **Add a printable:** add a print-friendly page/section; the browser Print dialog is the
  document system (no PDF generation). Link it from the review printables index.

## Known limitations

- Course content is English-only (like the other `/courses/*` courses); records are
  centralized so a future `Record<Language, …>` wrap is possible without moving content.
- The simulator is a deterministic grid model (no continuous physics), sufficient for the
  curriculum; motor-speed effects use a documented grid approximation.
- Printables use the browser Print dialog rather than server-generated PDFs.
- Legacy `components/ui/*.test.ts` (density/circuit) use a hand-rolled runner and are not part
  of `npm test` (which runs the `node:test` suites under `features/curriculums/`).

## Testing commands

- `npm test` — `node --test` over `features/curriculums/**/*.test.ts` (curriculum validation,
  progress, completion gating, quiz grading, program interpreter/validation, simulator,
  missions, persistence, routes, chassis model, the course-safety reference, and the
  `robotics-journey.test.ts` end-to-end progress journey: new student → all eight weeks with
  real unlock gating → final project → refresh restore → resume → unlock-all → corrupt-storage
  recovery).
- `npm run lint` — `eslint .` + `tsc --noEmit`.
- `npm run build` — production build.
