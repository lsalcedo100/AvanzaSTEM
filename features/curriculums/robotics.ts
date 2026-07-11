/**
 * Robotics & Automation - an 8-week course for grades 4-6.
 *
 * This file is the single source of truth for the curriculum. Like the other
 * courses in `features/curriculums/`, it is intentionally data-driven: the course
 * hub, the per-week lesson pages, worksheets, teacher guides, and the interactive
 * block editor / robot simulator all read from this structure, so content can be
 * reviewed and edited here without touching layout code.
 *
 * Design decisions (see docs/superpowers/plans/2026-07-09-robotics-course-phase-1-audit.md):
 * - One lesson per week: eight `RoboticsModule` records, flat, mirroring the
 *   engineering-fundamentals shape rather than nesting sub-lessons.
 * - Three equipment paths (physical kit / browser simulator / unplugged) are
 *   modelled as `variants` on each major activity, NOT as three separate content
 *   sets. The shared framing lives once; only the hands-on detail differs per path.
 * - The course is authored in English here (consistent with the other three
 *   `/courses/*` courses, which are English-only). All display strings live in
 *   this file rather than being scattered through page components, so a future
 *   localization pass can wrap these records in `Record<Language, ...>` (the
 *   approach used by features/projects/data.ts) without moving content.
 *
 * Stability contract:
 * - `id` and `slug` fields are stable identifiers. Saved student progress (block
 *   programs, simulator results, journal entries, completion) is keyed off these
 *   ids, never off display titles. Do not renumber or rename ids to reorder
 *   content - change `order`/`week` instead.
 *
 * Editing guidance:
 * - Keep explanations accurate and readable for grades 4-6: concrete, not babyish,
 *   and no marketing language.
 * - Every major build/program activity must define all three equipment variants.
 * - Concepts build across weeks; do not use an idea in an activity before the week
 *   that teaches it (e.g. conditions arrive in Week 5, so Week 3 programs are
 *   straight sequences).
 */

import type { Program as RoboticsProgramData } from "./robotics-program.ts"

/* -------------------------------------------------------------------------- */
/* Shared vocabulary                                                          */
/* -------------------------------------------------------------------------- */

/** The three ways a student can do the hands-on work of the course. */
export type EquipmentPathId = "kit" | "simulator" | "unplugged"

/** A learning path: a physical robot kit, the browser simulator, or household materials. */
export type EquipmentPath = {
  id: EquipmentPathId
  /** Short label, e.g. "Robot kit". */
  label: string
  /** One sentence on what this path is and who it suits. */
  description: string
  /** What a family/teacher needs to use this path at all. */
  needs: string
}

/**
 * The kinds of section a lesson can contain. These double as the "lesson types"
 * the course supports, so a lesson's `lessonFlow` reads as a real pedagogical
 * sequence (learn -> explore -> build -> program -> predict -> test -> debug ->
 * knowledge check -> reflection -> review), plus the capstone `final-project`.
 */
export type LessonSectionKind =
  | "learn"
  | "explore"
  | "build"
  | "program"
  | "predict"
  | "test"
  | "debug"
  | "knowledge-check"
  | "reflection"
  | "review"
  | "final-project"

/** The kinds of hands-on activity, a subset of section kinds that carry path variants. */
export type ActivityKind = "explore" | "build" | "program" | "predict" | "test" | "debug" | "design"

/** Block types the simple in-browser block editor understands, referenced by saved programs. */
export type BlockKind =
  | "move-forward"
  | "move-backward"
  | "turn-left"
  | "turn-right"
  | "wait"
  | "repeat"
  | "repeat-until"
  | "forever"
  | "if"
  | "if-else"
  | "read-sensor"
  | "set-variable"
  | "stop"

/* -------------------------------------------------------------------------- */
/* Small content records                                                      */
/* -------------------------------------------------------------------------- */

/** One concrete, observable skill a student should have by the end of a week. */
export type LearningGoal = {
  /** Stable id, unique within its module, e.g. "w1-g1". */
  id: string
  text: string
}

/** A single vocabulary term and its kid-friendly, accurate definition. */
export type VocabularyTerm = {
  term: string
  definition: string
}

/** A dependency on an earlier module, with the reason it matters. */
export type Prerequisite = {
  /** The `id` of the module that must come first, e.g. "week-1". */
  moduleId: string
  /** Why this week needs the earlier one, in plain language. */
  reason: string
}

/** One "Learn" explanation: a titled idea covering part of the week's topic list. */
export type ConceptExplanation = {
  /** Stable id, unique within its module, e.g. "w1-c1". */
  id: string
  /** The idea being taught, e.g. "Machines vs robots". */
  title: string
  /** One or two short paragraphs explaining it for grades 4-6. */
  body: string[]
  /** Optional everyday examples that make the idea concrete. */
  examples?: string[]
}

/** A material, and which paths actually need it. */
export type Material = {
  /** Stable id, unique within its module, e.g. "w2-m1". */
  id: string
  name: string
  /** Which equipment paths require this item. */
  paths: EquipmentPathId[]
  /** Optional note, e.g. an everyday substitution. */
  note?: string
  /** True when the material is a nice-to-have rather than required. */
  optional?: boolean
}

/** A specific safety point, optionally scoped to certain paths. */
export type SafetyNote = {
  id: string
  text: string
  /** How important it is, so pages can order/emphasize. */
  severity: "info" | "caution"
  /** Paths this applies to; omit for all paths. */
  paths?: EquipmentPathId[]
}

/** One fix for a common problem, shown in an activity's troubleshooting list. */
export type TroubleshootingTip = {
  problem: string
  fix: string
}

/** The path-specific half of an activity: what actually differs by equipment. */
export type ActivityVariant = {
  pathId: EquipmentPathId
  /** Path-specific title, e.g. "Build a rolling base from a kit". */
  title: string
  /** Materials needed for this path (ids of this module's materials, or plain items). */
  materials: string[]
  /** Step-by-step, guided-but-open instructions. */
  instructions: string[]
  /** Path-specific safety points. */
  safetyNotes: string[]
  /** What success looks/reads like when it works. */
  expectedResult: string
  /** Observable criteria a student (or adult) can check off. */
  successCriteria: string[]
  /** Common problems and fixes for this path. */
  troubleshooting: TroubleshootingTip[]
  /** Optional stretch task for this path. */
  extension?: string
}

/** A set of the three equipment variants for one activity. */
export type EquipmentVariantSet = Record<EquipmentPathId, ActivityVariant>

/**
 * An interactive widget that can be attached to an activity. The lesson renderer
 * shows the matching component (which saves real student work) in addition to
 * the path-specific instructions.
 */
export type InteractiveActivityKind =
  | "robot-or-not"
  | "system-mapper"
  | "helpful-robot"
  | "chassis-lab"
  | "sensor-lab"

/** A major hands-on activity: shared framing plus one variant per equipment path. */
export type Activity = {
  /** Stable id, unique within its module, e.g. "w1-a-robot-or-not". */
  id: string
  kind: ActivityKind
  /** Path-agnostic title, e.g. "Robot-or-Not investigation". */
  title: string
  /** The point of the activity in one sentence. */
  goal: string
  /** Shared instructions/framing that apply to every path (the "callout" model). */
  shared: string[]
  /** The three path-specific variants. */
  variants: EquipmentVariantSet
  /** Optional interactive widget rendered with this activity (saves real work). */
  interactive?: InteractiveActivityKind
}

/** A predict-then-test prompt: students commit to a guess before running something. */
export type PredictionPrompt = {
  id: string
  prompt: string
  /** What students do to check the prediction. */
  howToCheck: string
}

/** A reusable reflection prompt shown at the end of a week. */
export type ReflectionPrompt = {
  id: string
  prompt: string
}

/** A structured test table: students run trials and record measurable results. */
export type TestRecord = {
  id: string
  /** Name of the test, e.g. "Three-run reliability test". */
  title: string
  /** How to run one trial. */
  instructions: string
  /** Column headers for the recording table. */
  columns: string[]
  /** How many trial rows the table should have. */
  rows: number
  /** What number or result to write down. */
  measure: string
}

/** A find-and-fix debugging mission: a robot misbehaves on purpose. */
export type DebuggingMission = {
  id: string
  title: string
  /** The situation the robot is in. */
  scenario: string
  /** What the robot does wrong (the observable symptom). */
  symptom: string
  /** A hint that points at the kind of bug without giving the answer. */
  hint: string
  /** Whether the bug is mechanical, programming, or sensor-related. */
  bugType: "mechanical" | "programming" | "sensor"
  /** Plausible causes to investigate, in order. */
  likelyCauses: string[]
  /** The fix, kept separate so pages can hide it behind a reveal. */
  fix: string
}

/* -------------------------------------------------------------------------- */
/* Assessment                                                                 */
/* -------------------------------------------------------------------------- */

/** One selectable answer, marked correct or not, with optional per-option feedback. */
export type AnswerOption = {
  id: string
  text: string
  correct: boolean
  /** Why this option is right or wrong, shown immediately after answering. */
  feedback: string
}

/** Fields shared by every knowledge-check question kind. */
export type QuizQuestionBase = {
  id: string
  prompt: string
  /** The correct reasoning, shown after answering (right or wrong) - never just "Correct". */
  explanation: string
}

/** Pick one correct option from a list. */
export type SingleChoiceQuestion = QuizQuestionBase & {
  kind: "single"
  options: AnswerOption[]
  /** The id of the correct option (mirrors the option with correct: true). */
  correctOptionId: string
}

/** Select every correct option (used only where more than one answer is genuinely right). */
export type MultipleChoiceQuestion = QuizQuestionBase & {
  kind: "multiple"
  options: AnswerOption[]
  /** The ids of all correct options (mirror the options with correct: true). */
  correctOptionIds: string[]
}

/** Decide whether a statement is true or false. */
export type TrueFalseQuestion = QuizQuestionBase & {
  kind: "true-false"
  statement: string
  answer: boolean
}

/** Put steps into the correct order. */
export type OrderingQuestion = QuizQuestionBase & {
  kind: "ordering"
  items: { id: string; text: string }[]
  /** The item ids in their correct order. */
  correctOrder: string[]
}

/** Match each left item to its correct right item. */
export type MatchingQuestion = QuizQuestionBase & {
  kind: "matching"
  /** Each pair's `left` matches its own `right`; the UI shuffles the rights. */
  pairs: { id: string; left: string; right: string }[]
}

/** Write a short free-text answer, self-checked against a sample and keywords. */
export type ShortResponseQuestion = QuizQuestionBase & {
  kind: "short"
  sampleAnswer: string
  /** Lower-case keywords a good answer usually contains (lightweight auto-check). */
  keywords: string[]
}

/** Trace a short program and choose what it does. */
export type ProgramTracingQuestion = QuizQuestionBase & {
  kind: "trace"
  /** The program to trace, one instruction per line. */
  program: string[]
  options: AnswerOption[]
  correctOptionId: string
}

/** Read a scenario and diagnose the cause (e.g. which kind of bug). */
export type ScenarioQuestion = QuizQuestionBase & {
  kind: "scenario"
  scenario: string
  options: AnswerOption[]
  correctOptionId: string
}

/**
 * A knowledge-check question. A discriminated union on `kind` so one reusable
 * renderer can show single/multiple choice, true-false, ordering, matching,
 * short response, program tracing, and scenario diagnosis.
 */
export type KnowledgeCheckQuestion =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | OrderingQuestion
  | MatchingQuestion
  | ShortResponseQuestion
  | ProgramTracingQuestion
  | ScenarioQuestion

/** Question kinds that present a fixed list of options with correct flags. */
export type OptionQuestion =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | ProgramTracingQuestion
  | ScenarioQuestion

/** A short end-of-week knowledge check with immediate answer explanations. */
export type KnowledgeCheck = {
  id: string
  /** One line telling the student what the check is for. */
  instructions: string
  questions: KnowledgeCheckQuestion[]
  /** How many correct answers count as passing (used by completion rules). */
  passThreshold: number
}

/* -------------------------------------------------------------------------- */
/* Saved-artifact metadata (consumed by the Phase-3 progress hook)            */
/* -------------------------------------------------------------------------- */

/** Metadata describing a block program a student saves for a mission. */
export type SavedProgramSpec = {
  /** Stable id used as the localStorage key suffix for this saved program. */
  id: string
  /** The mission this program is written for. */
  missionId: string
  title: string
  description: string
  /** Block types the student is expected to use (drives the editor palette). */
  expectedBlocks: BlockKind[]
}

/** Metadata for one browser-simulator mission (grid map + goal). */
export type SimulatorMission = {
  /** Stable id used to key saved simulator results. */
  id: string
  title: string
  objective: string
  /** Grid size for the simulator map, e.g. { cols: 6, rows: 6 }. */
  grid: { cols: number; rows: number }
  /** Observable criteria the simulator checks for a win. */
  successCriteria: string[]
}

/** A prompt the design journal captures and saves for a week. */
export type JournalPrompt = {
  /** Stable id used to key the saved journal entry. */
  id: string
  prompt: string
  /** What kind of answer this captures, so the UI can pick an input. */
  captures: "text" | "sketch" | "number" | "checklist"
}

/** A printable handout this week generates. */
export type PrintableResource = {
  id: string
  kind: "worksheet" | "teacher-guide" | "journal-page" | "flowchart" | "rubric"
  title: string
  description: string
}

/* -------------------------------------------------------------------------- */
/* Requirements & completion                                                  */
/* -------------------------------------------------------------------------- */

/** A single checkable requirement (used for lesson and module completion). */
export type CompletionRequirement = {
  id: string
  label: string
  /** The section kind that satisfies this requirement, if it maps to one. */
  sectionKind?: LessonSectionKind
}

/** What a student must do to count a week as complete. */
export type ModuleCompletion = {
  /** The requirements that must all be met. */
  requirements: CompletionRequirement[]
  /** Plain-language summary of the bar for "done". */
  summary: string
}

/* -------------------------------------------------------------------------- */
/* Lesson flow                                                                */
/* -------------------------------------------------------------------------- */

/** One ordered step in a week's lesson, tagged with its kind. */
export type LessonFlowStep = {
  id: string
  kind: LessonSectionKind
  title: string
  /** One line on what happens in this step. */
  focus: string
  /** Optional reference to an activity in this module, by activity id. */
  activityId?: string
  /** Rough minutes for this step. */
  minutes?: number
}

/** The link forward to the next week, shown at the end of a lesson. */
export type NextWeekConnection = {
  /** The next module's id, or null on the final week. */
  moduleId: string | null
  /** What to look forward to / how to prepare. */
  teaser: string
  /** Concrete prep a student or adult can do before next week. */
  prepare: string[]
}

/* -------------------------------------------------------------------------- */
/* Teacher / parent guidance                                                  */
/* -------------------------------------------------------------------------- */

/** Structured facilitator guidance for a week (per-lesson teacher guide page). */
export type TeacherGuidance = {
  /** How to set up before students arrive. */
  setup: string[]
  /** What to prepare or pre-build from materials ahead of time. */
  prep: string[]
  /** How to run the session, in order. */
  facilitation: string[]
  /** Ideas students commonly get wrong this week, so adults can spot them. */
  commonMisconceptions: string[]
  /** Questions to ask instead of giving answers. */
  questionsToAsk: string[]
  /** How to make the week more accessible. */
  easierVersion: string
  /** How to stretch students who need more. */
  harderVersion: string
}

/* -------------------------------------------------------------------------- */
/* Module                                                                     */
/* -------------------------------------------------------------------------- */

/** One week of the course: a full lesson with activities, assessment, and guidance. */
export type RoboticsModule = {
  /** Stable id, e.g. "week-1". Used as a progress key; never reuse or renumber. */
  id: string
  /** URL slug for the lesson route, e.g. "what-makes-something-a-robot". */
  slug: string
  /** 1-based week number. */
  week: number
  /** 1-based lesson order (equals `week` in this flat, one-lesson-per-week course). */
  order: number
  /** Marks the capstone week so pages can frame it as the final project. */
  isFinal?: boolean
  /** Lesson title shown in the schedule and header. */
  title: string
  /** One-line subtitle for the lesson header. */
  subtitle: string
  /** A short paragraph describing the week for families and teachers. */
  summary: string
  /** The single driving task for the week, in one sentence. */
  mainMission: string
  /** Typical session length, e.g. "60-75 minutes". */
  estimatedTime: string
  /** Concrete, observable goals for the week. */
  learningGoals: LearningGoal[]
  /** New terms introduced this week, in teaching order. */
  vocabulary: VocabularyTerm[]
  /** Earlier weeks this lesson depends on. */
  prerequisites: Prerequisite[]
  /** The "Learn" content: the ideas this week teaches. */
  concepts: ConceptExplanation[]
  /** Materials needed across the three paths. */
  materials: Material[]
  /** Major hands-on activities, each with the three equipment variants. */
  activities: Activity[]
  /** Predict-then-test prompts (present where the week uses prediction). */
  predictionPrompts: PredictionPrompt[]
  /** Structured testing tables (present where the week records results). */
  testRecords: TestRecord[]
  /** Debugging missions (present where the week practices debugging). */
  debuggingMissions: DebuggingMission[]
  /** The end-of-week knowledge check. */
  knowledgeCheck: KnowledgeCheck
  /** Reflection prompts for the end of the week. */
  reflection: ReflectionPrompt[]
  /** Design-journal prompts this week saves. */
  journalPrompts: JournalPrompt[]
  /** Saved block programs this week expects (empty until programming weeks). */
  savedPrograms: SavedProgramSpec[]
  /** Simulator missions for this week (empty when the week has none). */
  simulatorMissions: SimulatorMission[]
  /** The ordered lesson flow, tagged by section kind. */
  lessonFlow: LessonFlowStep[]
  /** Safety points for the week. */
  safetyNotes: SafetyNote[]
  /** Printable handouts this week generates. */
  printableResources: PrintableResource[]
  /** What counts as finishing the week. */
  completion: ModuleCompletion
  /** Facilitator guidance for the week. */
  teacherGuidance: TeacherGuidance
  /** The link forward to next week. */
  nextWeek: NextWeekConnection
  /** Present only on the final week: the structured final project. */
  finalProject?: FinalProject
}

/* -------------------------------------------------------------------------- */
/* Final project                                                              */
/* -------------------------------------------------------------------------- */

/** One mission a student can choose for the final project. */
export type FinalProjectMissionChoice = {
  id: string
  /** Mission name, e.g. "Delivery". */
  name: string
  /** The situation and who it helps. */
  scenario: string
  /** A concrete example goal for the robot. */
  exampleGoal: string
  /** Sensor ideas that fit this mission. */
  sensorIdeas: string[]
}

/** One thing the final build must include, grouped by category. */
export type FinalProjectRequirement = {
  id: string
  label: string
  description: string
  category: "planning" | "mechanical" | "programming" | "testing" | "communication"
  /** Whether it is required (true) or a stretch (false). */
  required: boolean
}

/** One quality level within a rubric category. */
export type RubricLevel = {
  label: "Beginning" | "Developing" | "Proficient" | "Exemplary"
  descriptor: string
}

/** One rubric category the final project is scored on. */
export type RubricCategory = {
  id: string
  name: string
  description: string
  /** Share of the final grade this category is worth, in percent. Weights across all categories sum to 100. */
  weightPercent: number
  levels: RubricLevel[]
}

/** The structured final project for Week 8. */
export type FinalProject = {
  id: string
  title: string
  overview: string
  /** The missions a student may pick from. */
  missionChoices: FinalProjectMissionChoice[]
  /** Everything the finished project must include. */
  requirements: FinalProjectRequirement[]
  /** How many test runs are required. */
  requiredTestRuns: number
  /** The scoring rubric. */
  rubric: RubricCategory[]
  /** Hardware and simulator ways to carry out the project. */
  variants: EquipmentVariantSet
}

/* -------------------------------------------------------------------------- */
/* Course                                                                     */
/* -------------------------------------------------------------------------- */

/** Top-level course metadata plus the ordered list of weekly modules. */
export type RoboticsCurriculum = {
  slug: string
  title: string
  subtitle: string
  description: string
  gradeRange: string
  totalModules: number
  duration: string
  estimatedTimePerModule: string
  requirement: string
  summary: string
  /** Plain-language notes about how the course is structured and run. */
  format: string[]
  /** The course-wide skills students walk away with. */
  learningGoals: string[]
  /** The three equipment paths the course supports. */
  equipmentPaths: EquipmentPath[]
  /** The eight weekly modules, in order. */
  modules: RoboticsModule[]
}

/* -------------------------------------------------------------------------- */
/* Progress                                                                   */
/* -------------------------------------------------------------------------- */

/** The stable course id used as the top-level key/namespace for progress. */
export const ROBOTICS_COURSE_ID = "robotics" as const

/**
 * The localStorage schema version for robotics progress. Bump this and add a
 * migration in robotics-progress.ts when the saved shape below changes (mirrors
 * the circuit game's v1 -> v2 precedent).
 *
 * History:
 * - v1: the minimal Phase-2 shape (completed/started/lastVisited/unlockAll,
 *   knowledgeCheckScores, savedPrograms, savedSimulatorResults, journal).
 * - v2 (current): the full Phase-3 shape below - per-lesson steps and
 *   timestamps, full knowledge-check attempts, predictions, activity results,
 *   test records, debug findings, reflections, equipment path, and the final
 *   project. Migrated from v1 without discarding saved work.
 */
export const ROBOTICS_PROGRESS_VERSION = 2 as const

/** One saved design-journal entry, keyed by `${moduleId}:${promptId}`. */
export type JournalEntry = {
  moduleId: string
  promptId: string
  /** The student's saved answer (text, a data-URL sketch, or a number as text). */
  value: string
  /** ISO timestamp string, stamped when saved. */
  savedAt: string
}

/** A saved block program: the ordered block ids the student assembled. */
export type SavedProgram = {
  specId: string
  blocks: BlockKind[]
  savedAt: string
}

/**
 * A saved block-editor program (the full typed AST from robotics-program.ts).
 * Distinct from the legacy `SavedProgram` (a flat block list): this holds the
 * complete, executable program the block editor produces, keyed by spec id so no
 * two lessons' programs collide. `revisions` counts how many times it was saved.
 */
export type SavedProgramAst = {
  specId: string
  /** The serialized program AST (a `Program` from robotics-program.ts). */
  program: RoboticsProgramData
  savedAt: string
  revisions: number
}

/** A saved simulator run result / mission state (the full attempt record). */
export type SavedSimulatorResult = {
  missionId: string
  /** The block-program spec this run was for. */
  specId: string
  success: boolean
  /** Which attempt this was (1-based). */
  trial: number
  /** Steps or moves used, for a personal best. */
  steps: number
  /** Simulated mission time in milliseconds. */
  missionTimeMs: number
  /** How many times the robot bumped an obstacle/edge. */
  collisions: number
  /** How many frames a sensor was active (touch/line). */
  sensorEvents: number
  /** Final robot position. */
  finalX: number
  finalY: number
  /** The saved-program revision this run used. */
  programRevision: number
  /** True if the run hit the step budget. */
  ranTooLong: boolean
  /** Free-text student notes about the run. */
  notes: string
  /** What the student changed for this attempt. */
  revisionMade: string
  savedAt: string
}

/** One knowledge-check attempt: the answers a student chose and how they scored. */
export type KnowledgeCheckAttempt = {
  checkId: string
  /** Chosen option id per question id. */
  selectedAnswers: Record<string, string>
  /** Number of correct answers. */
  score: number
  /** Total questions in the check. */
  total: number
  /** Whether the student has opened the answer review for this attempt. */
  reviewed: boolean
  /** How many times the check has been attempted. */
  attempts: number
  savedAt: string
}

/** A recorded activity outcome, keyed by activity id. */
export type ActivityResult = {
  activityId: string
  /** The equipment path the activity was done on. */
  pathId: EquipmentPathId | null
  completed: boolean
  /** Optional free-text notes the student recorded. */
  notes: string
  savedAt: string
}

/** A filled-in testing table: rows of cell strings matching the TestRecord columns. */
export type TestRecordEntry = {
  recordId: string
  rows: string[][]
  savedAt: string
}

/** A debugging-mission outcome: whether the bug was found and what was changed. */
export type DebugFinding = {
  missionId: string
  /** Whether the student identified the bug. */
  bugIdentified: boolean
  /** The revision the student made to fix it. */
  revisionMade: string
  savedAt: string
}

/** The student's evolving final-project record. */
export type FinalProjectProgress = {
  /** The chosen mission's id, or null before choosing. */
  missionChoiceId: string | null
  /** The planning-brief fields the student has filled in, keyed by field id. */
  plan: Record<string, string>
  /** The final project's three test runs (a filled test table). */
  testResults: TestRecordEntry | null
  /** Self-evaluation: chosen rubric level label per rubric category id. */
  selfEvaluation: Record<string, string>
  savedAt: string | null
}

/** The empty starting final-project record. */
export function emptyFinalProjectProgress(): FinalProjectProgress {
  return { missionChoiceId: null, plan: {}, testResults: null, selfEvaluation: {}, savedAt: null }
}

/**
 * Device-local student progress for the robotics course. Every field is keyed
 * off stable curriculum ids (module id, activity id, check id, prompt id) - never
 * off display text or translated strings - so progress survives content edits and
 * localization.
 */
export type RoboticsProgress = {
  /** The course this progress belongs to. */
  courseId: typeof ROBOTICS_COURSE_ID
  /** Schema version, for migration. */
  version: number
  /** The equipment path the student picked (kit / simulator / unplugged). */
  equipmentPath: EquipmentPathId | null
  /** Module ids the student has completed (lesson == module in this course). */
  completed: string[]
  /** Module ids the student has opened. */
  started: string[]
  /** The last module id the student visited, for resume-to-lesson. */
  lastVisited: string | null
  /** The last lesson-flow step id opened per module, for resume-to-step. */
  currentStep: Record<string, string>
  /** ISO start timestamp per module id. */
  startedAt: Record<string, string>
  /** ISO completion timestamp per module id. */
  completedAt: Record<string, string>
  /** Teacher/parent override that unlocks every week regardless of order. */
  unlockAll: boolean
  /** Knowledge-check attempts, keyed by check id. */
  knowledgeChecks: Record<string, KnowledgeCheckAttempt>
  /** Prediction responses, keyed by prediction-prompt id. */
  predictions: Record<string, string>
  /** Activity results, keyed by activity id. */
  activityResults: Record<string, ActivityResult>
  /**
   * Free-form saved state for interactive in-lesson activities (Robot-or-Not,
   * System Mapper, Helpful Robot designer, Virtual Chassis Lab, ...), stored as
   * a serialized string keyed by a stable activity-instance id. A generic slice
   * so new activities reuse it instead of adding a new field each time.
   */
  activityData: Record<string, string>
  /** Filled testing tables, keyed by test-record id. */
  testRecords: Record<string, TestRecordEntry>
  /** Debugging-mission findings, keyed by mission id. */
  debugFindings: Record<string, DebugFinding>
  /** Saved block programs (legacy flat block lists), keyed by spec id. */
  savedPrograms: Record<string, SavedProgram>
  /** Saved block-editor programs (full typed AST), keyed by spec id. */
  savedProgramAsts: Record<string, SavedProgramAst>
  /** Saved simulator results, keyed by mission id. */
  savedSimulatorResults: Record<string, SavedSimulatorResult>
  /** Saved design-journal entries, keyed by `${moduleId}:${promptId}`. */
  journal: Record<string, JournalEntry>
  /** Reflection responses, keyed by reflection-prompt id. */
  reflections: Record<string, string>
  /** The final-project record. */
  finalProject: FinalProjectProgress
  /** ISO timestamp of the last write. */
  updatedAt: string | null
}

/** The empty starting progress for a new student. */
export function emptyRoboticsProgress(): RoboticsProgress {
  return {
    courseId: ROBOTICS_COURSE_ID,
    version: ROBOTICS_PROGRESS_VERSION,
    equipmentPath: null,
    completed: [],
    started: [],
    lastVisited: null,
    currentStep: {},
    startedAt: {},
    completedAt: {},
    unlockAll: false,
    knowledgeChecks: {},
    predictions: {},
    activityResults: {},
    activityData: {},
    testRecords: {},
    debugFindings: {},
    savedPrograms: {},
    savedProgramAsts: {},
    savedSimulatorResults: {},
    journal: {},
    reflections: {},
    finalProject: emptyFinalProjectProgress(),
    updatedAt: null,
  }
}

/* -------------------------------------------------------------------------- */
/* Equipment paths (shared across all weeks)                                  */
/* -------------------------------------------------------------------------- */

export const ROBOTICS_EQUIPMENT_PATHS: EquipmentPath[] = [
  {
    id: "kit",
    label: "Robot kit",
    description:
      "A programmable robot kit with motors and sensors (any brand). Best when a class or family already has one.",
    needs: "A programmable robot kit with at least one motor and one sensor, plus its app or software.",
  },
  {
    id: "simulator",
    label: "Browser simulator",
    description:
      "A drag-and-block robot you drive on a grid in the browser. No hardware needed, works on any computer or tablet.",
    needs: "A computer or tablet with a modern web browser.",
  },
  {
    id: "unplugged",
    label: "Unplugged / household",
    description:
      "A cardboard-and-string robot plus paper programming. Best when there is no kit and no reliable devices.",
    needs: "Cardboard, tape, string, markers, and everyday recycling.",
  },
]

/* ========================================================================== */
/* WEEK 1 - What Makes Something a Robot?                                      */
/* ========================================================================== */

export const roboticsWeek1: RoboticsModule = {
  id: "week-1",
  slug: "what-makes-something-a-robot",
  week: 1,
  order: 1,
  title: "What Makes Something a Robot?",
  subtitle: "Sort robots from ordinary machines, and map how a robot senses, thinks, and acts.",
  summary:
    "Students figure out what actually makes something a robot instead of just a machine. They learn that a robot senses the world, decides what to do, and then acts - the input, processing, output loop - and that a program is what makes it repeat the job on its own. They investigate real devices, map one as a robot system, and sketch a helpful robot of their own.",
  mainMission:
    "Decide what counts as a robot, then map and design a robot that does one helpful job.",
  estimatedTime: "60-75 minutes",
  learningGoals: [
    { id: "w1-g1", text: "Explain what makes something a robot rather than a simple machine" },
    { id: "w1-g2", text: "Describe the input, processing, output loop in a real device" },
    { id: "w1-g3", text: "Explain the role of the controller as the robot's brain" },
    { id: "w1-g4", text: "Identify the sensors and actuators in a robot" },
    { id: "w1-g5", text: "Tell the difference between autonomous and remote-controlled systems" },
    { id: "w1-g6", text: "Design a robot system for a useful task" },
    { id: "w1-g7", text: "Sketch a helpful robot and label its inputs, processing, and outputs" },
  ],
  vocabulary: [
    { term: "Robot", definition: "A machine that can sense its surroundings, decide what to do, and act on its own using a program." },
    { term: "Machine", definition: "A tool that does work, like a bicycle or a stapler. A machine is only a robot if it can sense and decide by itself." },
    { term: "Input", definition: "Information a robot takes in from the world, usually through a sensor." },
    { term: "Processing", definition: "The 'thinking' step where the controller uses the inputs to decide what to do." },
    { term: "Output", definition: "The action a robot takes, like moving a wheel or turning on a light." },
    { term: "Controller", definition: "The robot's 'brain' - the small computer that runs the program and makes decisions." },
    { term: "Sensor", definition: "A part that measures something about the world, like distance, light, or touch." },
    { term: "Actuator", definition: "A part that makes something move or happen, like a motor, wheel, or buzzer." },
    { term: "Program", definition: "A set of instructions the controller follows to do a job the same way every time." },
    { term: "Autonomous", definition: "Acting on its own, using sensors and a program, without a person steering it." },
    { term: "Remote-controlled", definition: "Steered by a person in real time, for example with a joystick or app." },
  ],
  prerequisites: [],
  concepts: [
    {
      id: "w1-c1",
      title: "What a robot really is",
      body: [
        "People call all sorts of things robots, but a real robot has three abilities: it can sense the world, decide what to do, and act - and it can do this on its own by following a program.",
        "A toy car you push is not a robot. A car that notices a wall in front of it and stops by itself is closer to one, because it senses and decides.",
      ],
      examples: ["A robot vacuum", "A self-checkout that scans items", "An automatic door that senses you coming"],
    },
    {
      id: "w1-c2",
      title: "Machines vs robots",
      body: [
        "Every robot is a machine, but not every machine is a robot. A stapler and a bicycle are machines: they do work, but a person makes every decision.",
        "The dividing line is sensing and deciding. If the device can take in information and change what it does because of it, it is acting like a robot.",
      ],
      examples: ["Bicycle = machine", "Robot vacuum = robot", "Toaster with no sensor = machine", "Toaster that senses when bread is done = robot-like"],
    },
    {
      id: "w1-c3",
      title: "Inputs, processing, and outputs",
      body: [
        "Robots work in a loop: input, then processing, then output. First a sensor gives an input (like 'wall is close'). Then the controller does the processing (it decides 'I should stop'). Then an actuator makes the output (the wheels stop).",
        "This loop repeats over and over, many times a second, which is how a robot keeps reacting to a changing world.",
      ],
    },
    {
      id: "w1-c4",
      title: "The three main parts: controller, sensors, actuators",
      body: [
        "A robot has a controller (its brain), one or more sensors (how it senses), and one or more actuators (how it acts).",
        "The controller runs the program. Sensors send it inputs. Actuators carry out its outputs. Take away the sensors and it can't sense; take away the controller and it can't decide.",
      ],
      examples: ["Controller: the small computer board", "Sensors: distance, light, touch, color", "Actuators: motors, wheels, grippers, buzzers, lights"],
    },
    {
      id: "w1-c5",
      title: "A program makes it repeatable",
      body: [
        "A program is the list of instructions the controller follows. Because the robot follows a program, it can do the same job again and again without a person guiding each step.",
        "Change the program and the robot behaves differently, even with the same body and sensors. That is why robotics is as much about instructions as it is about building.",
      ],
    },
    {
      id: "w1-c6",
      title: "Autonomous vs remote-controlled",
      body: [
        "An autonomous system runs its own program and uses its sensors to decide, with no person steering. A remote-controlled system does exactly what a person tells it, moment by moment.",
        "A drone flown with a controller is remote-controlled. A robot vacuum that cleans a room by itself is autonomous. Many real robots can do both at different times.",
      ],
      examples: ["Autonomous: robot vacuum, Mars rover doing a planned drive", "Remote-controlled: RC car, a drone on a joystick"],
    },
    {
      id: "w1-c7",
      title: "Robots and machines all around us",
      body: [
        "Use the sense-decide-act test on things you see every day. Some are true robots, some are just machines, and some are in between.",
        "An automatic sliding door senses you and opens - it decides. A Mars rover, a programmed robotic arm, and a voice-controlled speaker all sense, decide, and act, so they are robots. A remote-controlled car only does what a person tells it. A basic toaster and a wind-up toy do not sense or decide at all. A washing machine is in between: it senses water and follows a program, but it just repeats fixed cycles.",
      ],
      examples: [
        "Robots: automatic sliding door, Mars rover, robotic arm, voice-controlled speaker",
        "Just machines: remote-controlled car, basic toaster, wind-up toy",
        "In between: washing machine",
      ],
    },
  ],
  materials: [
    { id: "w1-m1", name: "Three or four everyday devices to investigate (toy, phone, flashlight, robot vacuum, etc.)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w1-m2", name: "Robot System Mapper worksheet (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w1-m3", name: "Pencil and paper for sketching", paths: ["kit", "simulator", "unplugged"] },
    { id: "w1-m4", name: "A programmable robot kit, if available", paths: ["kit"] },
    { id: "w1-m5", name: "Computer or tablet with a browser", paths: ["simulator"] },
    { id: "w1-m6", name: "Recycled boxes, markers, and craft supplies for a robot model", paths: ["unplugged"], optional: true },
  ],
  activities: [
    {
      id: "w1-a-robot-or-not",
      interactive: "robot-or-not",
      kind: "explore",
      title: "Robot-or-Not investigation",
      goal: "Sort real devices into robot, machine, or in-between, and defend each choice with the sense-decide-act test.",
      shared: [
        "Look at each device and ask three questions: Can it sense anything? Can it decide on its own? Can it act? A real robot can do all three by itself.",
        "Put each device on a line from 'just a machine' to 'full robot', and write one reason for where you placed it.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Investigate your kit robot and three devices",
          materials: ["A programmable robot kit", "Three everyday devices"],
          instructions: [
            "Turn on the kit robot and let it run a simple built-in behavior. Watch what it senses and does.",
            "Compare it to a flashlight, a wind-up toy, and a phone. For each, decide sense/decide/act - yes or no.",
            "Place all four devices on the machine-to-robot line and give a reason for each.",
          ],
          safetyNotes: ["Keep fingers away from moving wheels and gears while the robot runs."],
          expectedResult: "The kit robot lands near the 'robot' end because it senses, decides, and acts; the flashlight and wind-up toy land near 'machine'.",
          successCriteria: ["Every device has a sense/decide/act answer", "Each placement has a written reason"],
          troubleshooting: [{ problem: "The robot just drives straight and never reacts", fix: "Load a behavior that uses a sensor (like stop-at-wall) so students can see it decide." }],
          extension: "Find a device at home that is hard to classify and explain why it sits in the middle.",
        },
        simulator: {
          pathId: "simulator",
          title: "Compare simulator robots to real devices",
          materials: ["Browser simulator", "Three everyday devices"],
          instructions: [
            "Open the simulator and run a robot that reacts to a wall. Notice the input (wall detected) and output (stop).",
            "Compare it to a flashlight, a wind-up toy, and a phone using sense/decide/act.",
            "Place all four on the machine-to-robot line with reasons.",
          ],
          safetyNotes: ["No physical safety concerns; take a screen break if needed."],
          expectedResult: "Students see the simulator robot react to input and rank it near the robot end.",
          successCriteria: ["Every device has a sense/decide/act answer", "Each placement has a written reason"],
          troubleshooting: [{ problem: "Not sure what the simulator robot is sensing", fix: "Point out the sensor read-out in the sim and match it to the robot's action." }],
          extension: "Predict how the sim robot would behave with its sensor turned off, then try it.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Sort household devices with the robot test",
          materials: ["Four everyday devices (or picture cards)", "Robot System Mapper worksheet"],
          instructions: [
            "Gather four devices such as a flashlight, a wind-up toy, an automatic soap dispenser, and a phone.",
            "For each one, decide sense/decide/act - yes or no - and act it out with a partner if unsure.",
            "Place them on the machine-to-robot line and write a reason for each.",
          ],
          safetyNotes: ["Only use safe, everyday objects; no opening electronics."],
          expectedResult: "The soap dispenser and phone land closer to robot; the flashlight and wind-up toy land closer to machine.",
          successCriteria: ["Every device has a sense/decide/act answer", "Each placement has a written reason"],
          troubleshooting: [{ problem: "Everything looks like 'just a machine'", fix: "Ask which device changes what it does without a person - that is the sensing-and-deciding clue." }],
          extension: "Add a fifth mystery device that is hard to place and debate it as a group.",
        },
      },
    },
    {
      id: "w1-a-system-mapper",
      interactive: "system-mapper",
      kind: "build",
      title: "Robot System Mapper",
      goal: "Map one real device as a robot system: label its inputs, processing, outputs, controller, sensors, and actuators.",
      shared: [
        "Pick one device that senses and decides. On the mapper sheet, draw arrows for the input, processing, and output loop.",
        "Then label the three parts: which piece is the controller, which are the sensors, and which are the actuators.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Map your kit robot",
          materials: ["The kit robot", "Robot System Mapper worksheet"],
          instructions: [
            "Find the controller (the main board), the sensors, and the actuators (motors) on the kit robot.",
            "Fill in the input-processing-output loop for one behavior, such as 'stop before a wall'.",
            "Label each real part on your map.",
          ],
          safetyNotes: ["Handle the robot gently; do not pull on wires."],
          expectedResult: "A finished map showing input (sensor reading) -> processing (controller decides) -> output (motor acts), with real parts labeled.",
          successCriteria: ["Input, processing, and output are all filled in", "Controller, sensor, and actuator are labeled"],
          troubleshooting: [{ problem: "Can't tell the sensor from the actuator", fix: "A sensor measures; an actuator moves. Ask which part causes motion." }],
        },
        simulator: {
          pathId: "simulator",
          title: "Map a simulator robot",
          materials: ["Browser simulator", "Robot System Mapper worksheet"],
          instructions: [
            "In the simulator, identify the sensor read-out (input) and the movement blocks (output).",
            "Describe the processing: what rule turns the input into the output?",
            "Fill the loop in on the mapper and label the controller, sensor, and actuator.",
          ],
          safetyNotes: ["No physical safety concerns."],
          expectedResult: "A completed map for the sim robot with a clear input-processing-output loop.",
          successCriteria: ["Input, processing, and output are all filled in", "Controller, sensor, and actuator are labeled"],
          troubleshooting: [{ problem: "Processing box is blank", fix: "Write the rule as 'if the sensor says X, then do Y'." }],
        },
        unplugged: {
          pathId: "unplugged",
          title: "Map an automatic device from home",
          materials: ["A device such as an automatic door, soap dispenser, or robot vacuum (or a picture)", "Robot System Mapper worksheet"],
          instructions: [
            "Choose an automatic device you have seen work.",
            "Figure out what it senses (input), how it seems to decide (processing), and what it does (output).",
            "Fill in the loop and label where the controller, sensor, and actuator would be.",
          ],
          safetyNotes: ["Do not take apart real appliances; work from observation."],
          expectedResult: "A completed map of a real automatic device with the loop and three parts labeled.",
          successCriteria: ["Input, processing, and output are all filled in", "Controller, sensor, and actuator are labeled"],
          troubleshooting: [{ problem: "Not sure what the controller is", fix: "It is the hidden 'brain' that gets the sensor's message and tells the actuator to act." }],
        },
      },
    },
    {
      id: "w1-a-helpful-robot",
      interactive: "helpful-robot",
      kind: "design",
      title: "Helpful Robot design challenge",
      goal: "Invent a robot that does one helpful job and sketch it with its inputs, processing, and outputs labeled.",
      shared: [
        "Think of a small, real problem at home or school that a robot could help with.",
        "Sketch your robot and label at least one sensor (input), the decision it makes (processing), and at least one actuator (output).",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Design a helper, using your kit as inspiration",
          materials: ["The kit robot for reference", "Pencil and paper"],
          instructions: [
            "Look at what your kit's sensors and motors can do for ideas.",
            "Sketch a helpful robot and label its input, processing, and output.",
            "Write one sentence on the job it does and who it helps.",
          ],
          safetyNotes: ["No build required this week; this is a design sketch."],
          expectedResult: "A labeled sketch of a plausible helper robot with a clear job.",
          successCriteria: ["At least one sensor and one actuator are labeled", "The processing decision is written down", "The job and who it helps are named"],
          troubleshooting: [{ problem: "The robot has no sensor", fix: "Ask: how does it know when to act? That is where a sensor goes." }],
          extension: "List which of your kit's real sensors would fit your design.",
        },
        simulator: {
          pathId: "simulator",
          title: "Design a helper you could later build in the sim",
          materials: ["Pencil and paper", "Browser simulator for reference"],
          instructions: [
            "Sketch a helpful robot that could work on a grid, like a delivery helper.",
            "Label its input, processing, and output.",
            "Write the one rule it follows, as 'if ... then ...'.",
          ],
          safetyNotes: ["No physical safety concerns."],
          expectedResult: "A labeled sketch with a clear if-then rule the simulator could later run.",
          successCriteria: ["At least one sensor and one actuator are labeled", "The processing decision is written as if-then", "The job and who it helps are named"],
          troubleshooting: [{ problem: "The idea is too big to draw", fix: "Shrink it to one job the robot does on one small grid." }],
          extension: "Sketch the grid map your helper would work on.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Design and model a paper helper robot",
          materials: ["Pencil and paper", "Recycled boxes and markers (optional)"],
          instructions: [
            "Sketch a helpful robot for a real problem at home.",
            "Label input, processing, and output, and name the sensor and actuator.",
            "If you have supplies, build a quick model from a box to show the parts.",
          ],
          safetyNotes: ["Use child-safe scissors with an adult if building a model."],
          expectedResult: "A labeled sketch (and optional model) of a helper robot with a clear job.",
          successCriteria: ["At least one sensor and one actuator are labeled", "The processing decision is written down", "The job and who it helps are named"],
          troubleshooting: [{ problem: "Model has no moving part", fix: "Add a flap, wheel, or arm to stand in for the actuator." }],
          extension: "Give your model a name and a one-sentence 'user manual'.",
        },
      },
    },
  ],
  predictionPrompts: [
    { id: "w1-p1", prompt: "Before the investigation: which of your devices do you think is the 'most robot', and why?", howToCheck: "Compare your guess to where the class placed it on the machine-to-robot line after testing sense/decide/act." },
  ],
  testRecords: [],
  debuggingMissions: [],
  knowledgeCheck: {
    id: "w1-kc",
    instructions: "Answer these to check that you can tell robots from machines and name their parts.",
    passThreshold: 4,
    questions: [
      {
        id: "w1-q7",
        kind: "scenario",
        prompt: "Decide what kind of system this is.",
        scenario: "A toy car drives forward when you push a button on a handset and turns when you move a lever. It never changes what it does on its own.",
        options: [
          { id: "w1-q7-a", text: "An autonomous robot", correct: false, feedback: "It never decides anything on its own, so it is not autonomous." },
          { id: "w1-q7-b", text: "A remote-controlled machine", correct: true, feedback: "Right - a person makes every decision through the handset, so it is remote-controlled." },
          { id: "w1-q7-c", text: "Not a machine at all", correct: false, feedback: "It is a machine; it does work when a person controls it." },
          { id: "w1-q7-d", text: "A machine with a distance sensor", correct: false, feedback: "Nothing in the scenario senses distance; the person does the sensing." },
        ],
        correctOptionId: "w1-q7-b",
        explanation: "A person decides every move through the handset, so it is remote-controlled, not an autonomous robot.",
      },
      {
        id: "w1-q6",
        kind: "multiple",
        prompt: "Which of these are actuators? Select all that apply.",
        options: [
          { id: "w1-q6-a", text: "A motor that spins a wheel", correct: true, feedback: "Yes - a motor makes something move, so it is an actuator." },
          { id: "w1-q6-b", text: "A distance sensor", correct: false, feedback: "That is a sensor - it measures, it does not act." },
          { id: "w1-q6-c", text: "A buzzer that makes a sound", correct: true, feedback: "Yes - a buzzer acts on the world, so it is an actuator." },
          { id: "w1-q6-d", text: "A light the robot turns on", correct: true, feedback: "Yes - a light is an output the robot can turn on, so it is an actuator." },
        ],
        correctOptionIds: ["w1-q6-a", "w1-q6-c", "w1-q6-d"],
        explanation: "Actuators are the parts that act - motors, buzzers, and lights. A sensor only measures, so it is not an actuator.",
      },
      {
        id: "w1-q1",
        kind: "single",
        prompt: "What makes something a robot instead of just a machine?",
        options: [
          { id: "w1-q1-a", text: "It is made of metal", correct: false, feedback: "Materials don't matter - many robots are plastic and many metal things are not robots." },
          { id: "w1-q1-b", text: "It can sense, decide, and act on its own", correct: true, feedback: "Right - sensing, deciding, and acting by itself is the robot test." },
          { id: "w1-q1-c", text: "It has an on/off switch", correct: false, feedback: "Lots of plain machines have switches but can't decide anything." },
          { id: "w1-q1-d", text: "It is expensive", correct: false, feedback: "Price has nothing to do with whether something is a robot." },
        ],
        correctOptionId: "w1-q1-b",
        explanation: "A robot senses the world, decides what to do, and acts - and it does this on its own by following a program.",
      },
      {
        id: "w1-q2",
        kind: "single",
        prompt: "In the input-processing-output loop, what is the 'processing' step?",
        options: [
          { id: "w1-q2-a", text: "The robot measures the world with a sensor", correct: false, feedback: "That is the input step." },
          { id: "w1-q2-b", text: "The robot moves a wheel or turns on a light", correct: false, feedback: "That is the output step." },
          { id: "w1-q2-c", text: "The controller decides what to do with the input", correct: true, feedback: "Correct - processing is the deciding step done by the controller." },
          { id: "w1-q2-d", text: "The robot charges its battery", correct: false, feedback: "Charging is not part of the sense-decide-act loop." },
        ],
        correctOptionId: "w1-q2-c",
        explanation: "Processing is the 'thinking' step: the controller takes the input and decides which output to make.",
      },
      {
        id: "w1-q3",
        kind: "single",
        prompt: "Which part of a robot is the actuator?",
        options: [
          { id: "w1-q3-a", text: "The motor that turns the wheel", correct: true, feedback: "Yes - an actuator makes something move or happen." },
          { id: "w1-q3-b", text: "The distance sensor", correct: false, feedback: "That is a sensor - it measures, it doesn't act." },
          { id: "w1-q3-c", text: "The controller board", correct: false, feedback: "The controller decides; it is not the acting part." },
          { id: "w1-q3-d", text: "The battery", correct: false, feedback: "The battery gives power but is not the acting part." },
        ],
        correctOptionId: "w1-q3-a",
        explanation: "Actuators are the parts that act - motors, wheels, grippers, buzzers, and lights.",
      },
      {
        id: "w1-q4",
        kind: "single",
        prompt: "A robot vacuum cleans a room by itself with no one steering it. This is an example of a system that is:",
        options: [
          { id: "w1-q4-a", text: "Remote-controlled", correct: false, feedback: "Remote-controlled means a person steers it in real time." },
          { id: "w1-q4-b", text: "Autonomous", correct: true, feedback: "Correct - it runs its own program and uses sensors to decide." },
          { id: "w1-q4-c", text: "Not a robot at all", correct: false, feedback: "It senses, decides, and acts, so it is a robot." },
          { id: "w1-q4-d", text: "Broken", correct: false, feedback: "Working on its own is exactly what an autonomous robot should do." },
        ],
        correctOptionId: "w1-q4-b",
        explanation: "Autonomous systems use their own program and sensors to decide, with no person steering.",
      },
      {
        id: "w1-q5",
        kind: "single",
        prompt: "Why does a robot need a program?",
        options: [
          { id: "w1-q5-a", text: "So it looks more high-tech", correct: false, feedback: "A program is about behavior, not looks." },
          { id: "w1-q5-b", text: "So it can do a job the same way on its own, again and again", correct: true, feedback: "Right - the program is the instructions that let it repeat a job without a person." },
          { id: "w1-q5-c", text: "So it can be heavier", correct: false, feedback: "A program has nothing to do with weight." },
          { id: "w1-q5-d", text: "So it does not need sensors", correct: false, feedback: "Programs often use sensors; they don't replace them." },
        ],
        correctOptionId: "w1-q5-b",
        explanation: "A program is the list of instructions the controller follows so the robot can repeat a job by itself.",
      },
    ],
  },
  reflection: [
    { id: "w1-r1", prompt: "What job would you trust a robot to do? What job should still require a person? Explain." },
    { id: "w1-r2", prompt: "Think of a robot you have seen. What does it sense, decide, and do?" },
    { id: "w1-r3", prompt: "What job would you most want a helpful robot to do for you, and what sensor would it need?" },
  ],
  journalPrompts: [
    { id: "w1-j1", prompt: "Sketch your Helpful Robot and label its input, processing, and output.", captures: "sketch" },
    { id: "w1-j2", prompt: "Write one sentence about the job your robot does and who it helps.", captures: "text" },
  ],
  savedPrograms: [],
  simulatorMissions: [
    {
      id: "w1-sim-react",
      title: "Watch a robot react",
      objective: "Run the sample robot and watch it stop when its sensor detects a wall.",
      grid: { cols: 6, rows: 6 },
      successCriteria: ["The robot stops before the wall", "The student can name the input and the output"],
    },
  ],
  lessonFlow: [
    { id: "w1-f1", kind: "learn", title: "What makes a robot a robot", focus: "Sense, decide, act, and the input-processing-output loop.", minutes: 15 },
    { id: "w1-f2", kind: "explore", title: "Robot-or-Not investigation", focus: "Sort real devices using the sense/decide/act test.", activityId: "w1-a-robot-or-not", minutes: 15 },
    { id: "w1-f3", kind: "build", title: "Robot System Mapper", focus: "Map one device's input, processing, output, and parts.", activityId: "w1-a-system-mapper", minutes: 15 },
    { id: "w1-f4", kind: "explore", title: "Helpful Robot design challenge", focus: "Sketch a helper robot with labeled parts.", activityId: "w1-a-helpful-robot", minutes: 15 },
    { id: "w1-f5", kind: "knowledge-check", title: "Knowledge check", focus: "Five questions on robots, parts, and the loop.", minutes: 8 },
    { id: "w1-f6", kind: "reflection", title: "Reflection", focus: "Write about machines vs robots and a helper you'd want.", minutes: 7 },
  ],
  safetyNotes: [
    { id: "w1-s1", text: "Keep fingers, hair, and loose clothing away from moving wheels and gears on kit robots.", severity: "caution", paths: ["kit"] },
    { id: "w1-s2", text: "Do not open or take apart real appliances; investigate by watching them work.", severity: "caution", paths: ["unplugged"] },
    { id: "w1-s3", text: "Take a short screen break if your eyes get tired using the simulator.", severity: "info", paths: ["simulator"] },
  ],
  printableResources: [
    { id: "w1-pr1", kind: "worksheet", title: "Robot System Mapper", description: "A one-page sheet to map a device's input, processing, output, controller, sensors, and actuators." },
    { id: "w1-pr2", kind: "journal-page", title: "Helpful Robot design page", description: "Space to sketch and label a helper robot's inputs, processing, and outputs." },
    { id: "w1-pr3", kind: "teacher-guide", title: "Week 1 teacher guide", description: "Setup, facilitation, misconceptions, and questions to ask for the robot-or-not lesson." },
  ],
  completion: {
    summary: "Finish Week 1 by mapping one device as a robot system, sketching a helpful robot, and passing the knowledge check.",
    requirements: [
      { id: "w1-cr1", label: "Complete the Robot System Mapper for one device", sectionKind: "build" },
      { id: "w1-cr2", label: "Sketch and label a Helpful Robot", sectionKind: "explore" },
      { id: "w1-cr3", label: "Score at least 4 of 5 on the knowledge check", sectionKind: "knowledge-check" },
      { id: "w1-cr4", label: "Write your reflection", sectionKind: "reflection" },
    ],
  },
  teacherGuidance: {
    setup: [
      "Gather three or four everyday devices that range from clearly-a-machine to clearly-a-robot.",
      "Print the Robot System Mapper worksheet, one per student or pair.",
      "If using kits, charge them and pre-load a simple sensor behavior; if using the simulator, open it on each device.",
    ],
    prep: [
      "Try the robot-or-not sort yourself so you can guide borderline cases.",
      "Have a robot vacuum or automatic-door example ready as a familiar autonomous system.",
    ],
    facilitation: [
      "Start with the sense/decide/act test and the input-processing-output loop before any devices come out.",
      "Run the Robot-or-Not investigation, pushing students to justify each placement.",
      "Model one Robot System Mapper together, then let pairs map a second device.",
      "End with the Helpful Robot sketch and the knowledge check.",
    ],
    commonMisconceptions: [
      "'Anything electronic is a robot' - a flashlight is electronic but can't decide.",
      "'If it moves, it's a robot' - a wind-up toy moves but doesn't sense or decide.",
      "Mixing up sensor and actuator - one measures, one acts.",
    ],
    questionsToAsk: [
      "How does this device know when to act?",
      "What would happen if we removed its sensor?",
      "Is a person deciding here, or is the device deciding?",
    ],
    easierVersion: "Use picture cards of devices and sort them as a group instead of mapping the full loop.",
    harderVersion: "Have students map a device that can be both autonomous and remote-controlled, and explain when it is each.",
  },
  nextWeek: {
    moduleId: "week-2",
    teaser: "Next week we stop talking about robots and start building one that actually moves.",
    prepare: [
      "Save a couple of sturdy cardboard boxes and bottle caps if you're on the unplugged path.",
      "Charge your kit or bookmark the simulator.",
      "Think about what makes a wheeled thing tip over versus stay steady.",
    ],
  },
}

/* ========================================================================== */
/* WEEK 8 - Design a Robot That Helps (final project)                         */
/* ========================================================================== */

export const roboticsWeek8: RoboticsModule = {
  id: "week-8",
  slug: "design-a-robot-that-helps",
  week: 8,
  order: 8,
  isFinal: true,
  title: "Design a Robot That Helps",
  subtitle: "Choose a real mission and design, build, program, test, and improve a robot that does it.",
  summary:
    "This is the capstone. Students pick a mission - delivery, search-and-rescue, inspection, sorting, or accessibility help - and pull together everything from the course: a planning brief, a labeled sketch, an input-processing-output diagram, a flowchart, a mechanical design that moves, at least one sensor, and a program that uses a sequence, a loop, and a condition, with a safe stopping behavior. They run three test runs, document one improvement, and explain how their robot helps.",
  mainMission:
    "Design, build or simulate, program, test, and improve a robot that carries out one helpful mission of your choice.",
  estimatedTime: "90-120 minutes (can run across two sessions)",
  learningGoals: [
    { id: "w8-g1", text: "Turn a real need into a robot mission with requirements and constraints" },
    { id: "w8-g2", text: "Plan a robot with a brief, a labeled sketch, an input-processing-output diagram, and a flowchart" },
    { id: "w8-g3", text: "Build or simulate a robot that uses at least one sensor and moves reliably" },
    { id: "w8-g4", text: "Write a program that uses a sequence, a loop, a condition, and a safe stop" },
    { id: "w8-g5", text: "Test the robot three times, document one improvement, and explain how it helps" },
  ],
  vocabulary: [
    { term: "Mission", definition: "The one helpful job you choose for your robot to do." },
    { term: "Planning brief", definition: "A short written plan describing the mission, requirements, and constraints before you build." },
    { term: "Input-processing-output diagram", definition: "A picture showing what your robot senses, how it decides, and what it does." },
    { term: "Flowchart", definition: "A step-by-step diagram of your program using boxes for actions and diamonds for decisions." },
    { term: "Iteration", definition: "Improving your design by testing it, finding a problem, and changing it." },
    { term: "Safe stop", definition: "A behavior that makes the robot stop safely when the job is done or something is in the way." },
    { term: "Rubric", definition: "A chart that describes what beginning, developing, proficient, and exemplary work looks like." },
  ],
  prerequisites: [
    { moduleId: "week-2", reason: "The final robot needs a stable, moving base from the chassis work in Week 2." },
    { moduleId: "week-3", reason: "The program is a planned sequence of exact instructions, taught in Week 3." },
    { moduleId: "week-4", reason: "The robot must use at least one sensor, introduced in Week 4." },
    { moduleId: "week-5", reason: "The program must include a loop and a condition, taught in Week 5." },
    { moduleId: "week-6", reason: "Three test runs and one documented improvement use the debugging and reliability habits from Week 6." },
    { moduleId: "week-7", reason: "The planning brief, flowchart, and safe stop come from the autonomous-mission planning in Week 7." },
  ],
  concepts: [
    {
      id: "w8-c1",
      title: "Pulling the whole course together",
      body: [
        "The final project is not a new idea - it is every idea from the course working at once. Your robot will sense (Week 4), decide with loops and conditions (Week 5), move on a solid base (Week 2), follow a planned sequence (Week 3), be tested and improved (Week 6), and run a safe autonomous mission (Week 7).",
        "Start from the mission and work backward: what does this job need the robot to sense, decide, and do?",
      ],
    },
    {
      id: "w8-c2",
      title: "Choosing a mission that matters",
      body: [
        "A good mission solves a small, real problem for a real person. 'Deliver a note across the classroom' is better than 'do everything', because you can actually build and test it.",
        "Pick a mission you can finish in the time you have, with the sensors and parts you actually have.",
      ],
      examples: ["Delivery", "Search-and-rescue", "Inspection", "Sorting", "Accessibility assistance"],
    },
    {
      id: "w8-c3",
      title: "Plan before you build",
      body: [
        "Professional engineers plan on paper first. Your planning brief names the mission, the requirements (what it must do), and the constraints (limits like time, size, or materials).",
        "Then you draw a labeled sketch, an input-processing-output diagram, and a flowchart of the program. Planning first saves you from rebuilding later.",
      ],
    },
    {
      id: "w8-c4",
      title: "Test, improve, and explain",
      body: [
        "Run your robot three times and record what happens each run - not just whether it 'worked'. Real robots are judged on doing the job reliably, not once by luck.",
        "Find one thing to improve, change it, and note the result. Finally, explain in a few sentences how your robot helps and how you know it works.",
      ],
    },
  ],
  materials: [
    { id: "w8-m1", name: "Final Project planning brief (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w8-m2", name: "Flowchart and sketch pages (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w8-m3", name: "Three-run test record (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w8-m4", name: "Final Project rubric (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w8-m5", name: "A programmable robot kit with at least one sensor", paths: ["kit"] },
    { id: "w8-m6", name: "Computer or tablet with the browser simulator", paths: ["simulator"] },
    { id: "w8-m7", name: "Cardboard, bottle caps, straws, tape, string, and markers", paths: ["unplugged"] },
    { id: "w8-m8", name: "A course-length materials kit from earlier weeks", paths: ["kit", "unplugged"], optional: true },
  ],
  activities: [
    {
      id: "w8-a-final-build",
      kind: "design",
      title: "Design, build, program, and test your helper robot",
      goal: "Carry the chosen mission from plan to a tested, improved robot that uses a sensor, a sequence, a loop, a condition, and a safe stop.",
      shared: [
        "Complete the planning brief first: mission, requirements, constraints. Then draw the labeled sketch, the input-processing-output diagram, and the flowchart.",
        "Build or set up the robot so it moves reliably and uses at least one sensor. Write the program with a sequence, a loop, a condition, and a safe stop.",
        "Run three test runs, record each, make one improvement, and write your final explanation of how the robot helps.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Build and program the mission on a robot kit",
          materials: ["Robot kit with at least one sensor", "Planning, flowchart, and test-record pages"],
          instructions: [
            "Finish the planning brief and diagrams before touching the kit.",
            "Build a stable base for your mission and attach the sensor you need.",
            "Program a sequence to do the job, a loop to keep checking the sensor, a condition to react, and a safe stop at the end.",
            "Run three tests, record each run, improve one thing, and re-test.",
          ],
          safetyNotes: ["Keep clear of moving parts during test runs.", "Give the robot a clear, obstacle-free test area."],
          expectedResult: "A kit robot that completes its mission on at least two of three test runs and stops safely.",
          successCriteria: ["Uses at least one sensor", "Program has a sequence, a loop, and a condition", "Has a safe stop", "Three runs recorded", "One improvement documented"],
          troubleshooting: [
            { problem: "Robot works once but not again", fix: "Run the reliability checklist from Week 6: same start position, fresh batteries, re-check the sensor threshold." },
            { problem: "Robot never reacts to the sensor", fix: "Print the sensor reading and confirm your threshold is on the right side of the real value." },
          ],
          extension: "Add a second sensor or a counter so the robot handles a harder version of the mission.",
        },
        simulator: {
          pathId: "simulator",
          title: "Design and program the mission in the simulator",
          materials: ["Browser simulator", "Planning, flowchart, and test-record pages"],
          instructions: [
            "Finish the planning brief and diagrams first.",
            "Choose or set up a grid map that matches your mission.",
            "Build the program with movement blocks, a loop, a sensor condition, and a stop block.",
            "Run it three times from the same start, record each run, improve one thing, and re-run.",
          ],
          safetyNotes: ["No physical safety concerns; take screen breaks as needed."],
          expectedResult: "A simulator robot that completes the mission on the grid and stops when done.",
          successCriteria: ["Uses at least one sensor block", "Program has a sequence, a loop, and a condition", "Has a stop", "Three runs recorded", "One improvement documented"],
          troubleshooting: [
            { problem: "Robot drives off the grid", fix: "Add a repeat-until or a sensor condition so it stops at the edge or goal." },
            { problem: "Loop never ends", fix: "Check the repeat-until condition actually becomes true during the run." },
          ],
          extension: "Rebuild the same mission on a larger or more cluttered grid.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Model and 'run' the mission with a paper program",
          materials: ["Cardboard robot model", "String and floor grid or tape path", "Program cards"],
          instructions: [
            "Finish the planning brief and diagrams first.",
            "Build a cardboard robot with a moving part and a stand-in sensor (like a paper 'bumper').",
            "Write the program on cards using a sequence, a repeat, and an if, plus a stop card.",
            "'Run' the program by moving the model card-by-card three times, recording each run and improving one step.",
          ],
          safetyNotes: ["Use child-safe scissors with an adult when building the model."],
          expectedResult: "A cardboard robot and card program that a partner can follow to complete the mission the same way twice.",
          successCriteria: ["Model has a moving part and a stand-in sensor", "Card program has a sequence, a repeat, and an if", "Has a stop card", "Three runs recorded", "One improvement documented"],
          troubleshooting: [
            { problem: "Two people 'run' the program differently", fix: "The steps are ambiguous - rewrite them to be exact, like the Week 3 instructions." },
            { problem: "No place for a condition", fix: "Add an if-card such as 'if bumper touches wall, turn right'." },
          ],
          extension: "Trade programs with another group and run each other's missions.",
        },
      },
    },
  ],
  predictionPrompts: [
    { id: "w8-p1", prompt: "Before your first test run, predict: which part of the mission is most likely to fail?", howToCheck: "Compare your prediction to what actually goes wrong in the three test runs." },
  ],
  testRecords: [
    {
      id: "w8-tr1",
      title: "Final mission three-run test",
      instructions: "Run the full mission three times from the same starting setup. Record what happened each run and whether the mission succeeded.",
      columns: ["Run", "What happened", "Mission complete? (Y/N)", "What to change"],
      rows: 3,
      measure: "Whether the mission succeeded and what changed between runs",
    },
  ],
  debuggingMissions: [],
  knowledgeCheck: {
    id: "w8-kc",
    instructions: "Check that you can explain the choices behind your final project.",
    passThreshold: 3,
    questions: [
      {
        id: "w8-q1",
        kind: "single",
        prompt: "Why do engineers write a planning brief and draw a flowchart before building?",
        options: [
          { id: "w8-q1-a", text: "To make the project take longer", correct: false, feedback: "Planning actually saves time by preventing rebuilds." },
          { id: "w8-q1-b", text: "To think through the mission, requirements, and steps before spending materials", correct: true, feedback: "Right - planning on paper first prevents costly mistakes later." },
          { id: "w8-q1-c", text: "Because building is not allowed", correct: false, feedback: "Building is the goal; planning just comes first." },
          { id: "w8-q1-d", text: "To decorate the robot", correct: false, feedback: "A brief and flowchart are about the plan, not decoration." },
        ],
        correctOptionId: "w8-q1-b",
        explanation: "A brief and flowchart let you work out the mission, requirements, constraints, and steps before you build.",
      },
      {
        id: "w8-q2",
        kind: "single",
        prompt: "Your program must include a condition. What does a condition let your robot do?",
        options: [
          { id: "w8-q2-a", text: "Repeat the same move forever no matter what", correct: false, feedback: "That describes a plain loop with no decision." },
          { id: "w8-q2-b", text: "Choose an action based on what a sensor reads", correct: true, feedback: "Correct - a condition (if / if-else) makes the robot decide from sensor input." },
          { id: "w8-q2-c", text: "Move faster", correct: false, feedback: "Speed is set by the motors, not by a condition." },
          { id: "w8-q2-d", text: "Charge its battery", correct: false, feedback: "Conditions are about decisions, not power." },
        ],
        correctOptionId: "w8-q2-b",
        explanation: "A condition lets the robot pick an action based on a sensor reading - the heart of reacting to the world.",
      },
      {
        id: "w8-q3",
        kind: "single",
        prompt: "Why do you run the mission three times instead of once?",
        options: [
          { id: "w8-q3-a", text: "To prove it works reliably, not just once by luck", correct: true, feedback: "Yes - reliability across runs is what makes a robot trustworthy." },
          { id: "w8-q3-b", text: "Because the first run doesn't count", correct: false, feedback: "Every run counts as data; you record all three." },
          { id: "w8-q3-c", text: "To use up the battery", correct: false, feedback: "Testing is about evidence, not draining the battery." },
          { id: "w8-q3-d", text: "So it looks busy", correct: false, feedback: "Repeated tests are about reliable results, not appearances." },
        ],
        correctOptionId: "w8-q3-a",
        explanation: "Three runs show whether the robot does the job reliably, which is how real robots are judged.",
      },
      {
        id: "w8-q4",
        kind: "single",
        prompt: "What is a 'safe stop' behavior?",
        options: [
          { id: "w8-q4-a", text: "Turning the robot off by pulling the battery", correct: false, feedback: "That is a manual shutdown, not a programmed safe stop." },
          { id: "w8-q4-b", text: "A programmed behavior that stops the robot when the job is done or something is in the way", correct: true, feedback: "Correct - a safe stop is part of the program, protecting people and the robot." },
          { id: "w8-q4-c", text: "Driving until the robot crashes", correct: false, feedback: "Crashing is the opposite of a safe stop." },
          { id: "w8-q4-d", text: "Making the robot go faster at the end", correct: false, feedback: "Speeding up is not stopping safely." },
        ],
        correctOptionId: "w8-q4-b",
        explanation: "A safe stop is a programmed behavior that halts the robot when it finishes or senses an obstacle.",
      },
    ],
  },
  reflection: [
    { id: "w8-r1", prompt: "How does your robot help someone? Explain the mission in two or three sentences." },
    { id: "w8-r2", prompt: "What was the one improvement you made after testing, and how did it change the result?" },
    { id: "w8-r3", prompt: "If you had another week, what would you add or change next?" },
  ],
  journalPrompts: [
    { id: "w8-j1", prompt: "Write your planning brief: mission, requirements, and constraints.", captures: "text" },
    { id: "w8-j2", prompt: "Draw your labeled sketch and input-processing-output diagram.", captures: "sketch" },
    { id: "w8-j3", prompt: "Record your three test runs and the improvement you made.", captures: "checklist" },
    { id: "w8-j4", prompt: "Write your final explanation of how the robot helps.", captures: "text" },
  ],
  savedPrograms: [
    {
      id: "w8-prog-final",
      missionId: "w8-final",
      title: "Final mission program",
      description: "The program that runs your chosen mission: a sequence, a loop, a sensor condition, and a safe stop.",
      expectedBlocks: ["move-forward", "turn-left", "turn-right", "repeat", "repeat-until", "if", "read-sensor", "stop"],
    },
  ],
  simulatorMissions: [
    {
      id: "w8-sim-final",
      title: "Final mission (simulator)",
      objective: "Complete your chosen mission on the grid using a sensor, a loop, a condition, and a safe stop.",
      grid: { cols: 8, rows: 8 },
      successCriteria: ["Robot reaches the mission goal", "Robot uses a sensor condition", "Robot stops safely when done"],
    },
  ],
  lessonFlow: [
    { id: "w8-f1", kind: "final-project", title: "Choose your mission", focus: "Pick delivery, search-and-rescue, inspection, sorting, or accessibility help.", minutes: 10 },
    { id: "w8-f2", kind: "learn", title: "Plan on paper", focus: "Planning brief, labeled sketch, input-processing-output diagram, flowchart.", minutes: 25 },
    { id: "w8-f3", kind: "build", title: "Build or set up the robot", focus: "A stable, moving base with at least one sensor.", activityId: "w8-a-final-build", minutes: 25 },
    { id: "w8-f4", kind: "program", title: "Program the mission", focus: "Sequence, loop, condition, and safe stop.", activityId: "w8-a-final-build", minutes: 25 },
    { id: "w8-f5", kind: "test", title: "Three test runs and one improvement", focus: "Record each run, change one thing, re-test.", minutes: 20 },
    { id: "w8-f6", kind: "reflection", title: "Explain how it helps", focus: "Final explanation and reflection.", minutes: 10 },
    { id: "w8-f7", kind: "review", title: "Share and score", focus: "Present the robot and score it against the rubric.", minutes: 15 },
  ],
  safetyNotes: [
    { id: "w8-s1", text: "Keep a clear, obstacle-free area for test runs and stay clear of moving parts.", severity: "caution", paths: ["kit"] },
    { id: "w8-s2", text: "Use child-safe scissors with an adult when building the cardboard model.", severity: "caution", paths: ["unplugged"] },
    { id: "w8-s3", text: "Save your program and journal often so a browser refresh doesn't lose your work.", severity: "info", paths: ["simulator"] },
  ],
  printableResources: [
    { id: "w8-pr1", kind: "worksheet", title: "Final Project planning brief", description: "Mission, requirements, constraints, sketch, and input-processing-output diagram." },
    { id: "w8-pr2", kind: "flowchart", title: "Final Project flowchart page", description: "A page to draw the program flowchart with action boxes and decision diamonds." },
    { id: "w8-pr3", kind: "worksheet", title: "Three-run test record", description: "A table to record all three final test runs and the improvement made." },
    { id: "w8-pr4", kind: "rubric", title: "Final Project rubric", description: "The scoring rubric across planning, mechanical design, programming, testing, and communication." },
    { id: "w8-pr5", kind: "teacher-guide", title: "Week 8 teacher guide", description: "How to run the capstone across one or two sessions, including scoring guidance." },
  ],
  completion: {
    summary: "Finish the course by completing the final project: plan, build or simulate, program, run three tests, document one improvement, and explain how the robot helps.",
    requirements: [
      { id: "w8-cr1", label: "Complete the planning brief, sketch, IPO diagram, and flowchart", sectionKind: "learn" },
      { id: "w8-cr2", label: "Build or set up a robot that moves and uses at least one sensor", sectionKind: "build" },
      { id: "w8-cr3", label: "Write a program with a sequence, a loop, a condition, and a safe stop", sectionKind: "program" },
      { id: "w8-cr4", label: "Run three test runs and document one improvement", sectionKind: "test" },
      { id: "w8-cr5", label: "Write the final explanation of how the robot helps", sectionKind: "reflection" },
    ],
  },
  teacherGuidance: {
    setup: [
      "Print the planning brief, flowchart page, test record, and rubric for each student or team.",
      "Set aside a clear floor or table area for building and testing.",
      "Decide whether to run the capstone in one long session or split planning and building across two.",
    ],
    prep: [
      "Review the five mission choices and prepare one worked example for each if possible.",
      "Have earlier weeks' materials and any kits/sensors ready and charged.",
      "Read the rubric so scoring is consistent.",
    ],
    facilitation: [
      "Insist on a finished plan before any building starts - this is the biggest predictor of success.",
      "Circulate during build and program time; ask questions instead of fixing robots.",
      "Protect time for all three test runs and the improvement; do not let building eat the whole session.",
      "End with short presentations scored against the rubric.",
    ],
    commonMisconceptions: [
      "'It worked once, so it's done' - reliability across three runs is the bar.",
      "'The plan is a waste of time' - unplanned builds usually stall or get rebuilt.",
      "Skipping the safe stop because the mission 'ends anyway'.",
    ],
    questionsToAsk: [
      "What does your robot sense, decide, and do?",
      "Where is the loop and where is the condition in your program?",
      "What happened across your three runs, and what did you change?",
    ],
    easierVersion: "Offer a pre-set mission and grid/course so students focus on programming and testing rather than open design.",
    harderVersion: "Require two sensors, a counter variable, or a mission with more than one goal.",
  },
  nextWeek: {
    moduleId: null,
    teaser: "You've finished the course - you can now design, build, program, test, and improve a robot that helps.",
    prepare: [
      "Show your robot to family or classmates and explain how it works.",
      "Keep your planning brief and flowchart; they're the start of your next robotics project.",
      "Try a new mission from the list you didn't choose.",
    ],
  },
  finalProject: {
    id: "w8-final",
    title: "Design a Robot That Helps",
    overview:
      "Choose one mission, then plan, build or simulate, program, test, and improve a robot that carries it out. Your robot must use at least one sensor and a program with a sequence, a loop, and a condition, and it must stop safely. You will run three test runs, make one documented improvement, and explain how your robot helps.",
    missionChoices: [
      { id: "w8-mc-delivery", name: "Delivery", scenario: "Something needs to get from one place to another across a room or course.", exampleGoal: "Carry a small item to a marked drop-off zone and stop there.", sensorIdeas: ["Distance sensor to stop at the zone", "Touch sensor to detect arrival"] },
      { id: "w8-mc-search-rescue", name: "Search-and-rescue", scenario: "A 'person' or object is lost somewhere in a marked area and must be found.", exampleGoal: "Search a grid until the robot detects the target, then stop and signal.", sensorIdeas: ["Color sensor to spot the target", "Distance sensor to avoid walls while searching"] },
      { id: "w8-mc-inspection", name: "Inspection", scenario: "A path, pipe, or row needs to be checked for a problem.", exampleGoal: "Follow a marked line and stop when it detects a gap or a marked fault.", sensorIdeas: ["Light or color sensor to follow the line", "Distance sensor to detect a blockage"] },
      { id: "w8-mc-sorting", name: "Sorting", scenario: "Items need to be separated into groups.", exampleGoal: "Detect an item's color and turn toward the matching bin.", sensorIdeas: ["Color sensor to read the item", "Touch sensor to confirm pickup"] },
      { id: "w8-mc-accessibility", name: "Accessibility assistance", scenario: "Someone needs help doing an everyday task.", exampleGoal: "Detect an obstacle in a walkway and alert or clear a safe path.", sensorIdeas: ["Distance sensor to detect obstacles", "Buzzer or light as an alert output"] },
      { id: "w8-mc-custom", name: "Your own mission", scenario: "You have a robot idea that helps someone, and it isn't on this list. Propose it - as long as it moves, senses, decides, and stops safely, it counts.", exampleGoal: "Describe your own helpful job for the robot, then meet the same required components as the other missions.", sensorIdeas: ["Pick the sensor that fits your job (distance, touch, light, or color)", "Check with your teacher that your idea meets the requirements"] },
    ],
    requirements: [
      { id: "w8-req-brief", label: "Planning brief", description: "Mission, requirements, and constraints written before building.", category: "planning", required: true },
      { id: "w8-req-sketch", label: "Labeled sketch", description: "A drawing of the robot with its parts labeled.", category: "planning", required: true },
      { id: "w8-req-ipo", label: "Input-processing-output diagram", description: "A diagram of what the robot senses, decides, and does.", category: "planning", required: true },
      { id: "w8-req-flowchart", label: "Flowchart", description: "A step-by-step flowchart of the program.", category: "planning", required: true },
      { id: "w8-req-mechanical", label: "Mechanical design that moves", description: "A stable base that moves reliably.", category: "mechanical", required: true },
      { id: "w8-req-sensor", label: "At least one sensor", description: "The robot uses a sensor as an input.", category: "mechanical", required: true },
      { id: "w8-req-sequence", label: "A sequence", description: "The program runs steps in a planned order.", category: "programming", required: true },
      { id: "w8-req-loop", label: "A loop", description: "The program repeats an action or check.", category: "programming", required: true },
      { id: "w8-req-condition", label: "A condition", description: "The program makes a decision from a sensor reading.", category: "programming", required: true },
      { id: "w8-req-safe-stop", label: "Safe stopping behavior", description: "The robot stops safely when done or blocked.", category: "programming", required: true },
      { id: "w8-req-tests", label: "Three test runs", description: "The mission is run and recorded three times.", category: "testing", required: true },
      { id: "w8-req-improvement", label: "One documented improvement", description: "One change is made after testing and its effect recorded.", category: "testing", required: true },
      { id: "w8-req-explanation", label: "Final explanation", description: "A short explanation of how the robot helps and how you know it works.", category: "communication", required: true },
      { id: "w8-req-second-sensor", label: "A second sensor or counter (stretch)", description: "An extra sensor or a counter variable for a harder mission.", category: "programming", required: false },
    ],
    requiredTestRuns: 3,
    rubric: [
      {
        id: "w8-rub-planning",
        name: "Problem & planning",
        description: "A clear problem and user, plus the brief, sketch, IPO diagram, and flowchart.",
        weightPercent: 15,
        levels: [
          { label: "Beginning", descriptor: "Little or no plan; started building without a clear problem, brief, or diagrams." },
          { label: "Developing", descriptor: "The problem is stated but some planning documents are incomplete or vague." },
          { label: "Proficient", descriptor: "A clear problem and user, with a complete brief, sketch, IPO diagram, and flowchart that match the build." },
          { label: "Exemplary", descriptor: "Planning is complete and clear and shows thoughtful requirements, constraints, and trade-offs." },
        ],
      },
      {
        id: "w8-rub-mechanical",
        name: "Mechanical or environmental design",
        description: "How well the robot (or the configured simulator mission) is built to move and do the job.",
        weightPercent: 20,
        levels: [
          { label: "Beginning", descriptor: "Robot does not move reliably or falls apart; or the mission setup does not fit the goal." },
          { label: "Developing", descriptor: "Robot moves but is wobbly or inconsistent; or the mission map is only roughly set up." },
          { label: "Proficient", descriptor: "Stable base that moves reliably and carries its sensor; or a mission map that suits the goal." },
          { label: "Exemplary", descriptor: "Sturdy, well-balanced design (or a thoughtfully configured mission) that fits the job cleanly." },
        ],
      },
      {
        id: "w8-rub-programming",
        name: "Programming",
        description: "Use of a sequence, a loop, a condition, and a safe stop.",
        weightPercent: 25,
        levels: [
          { label: "Beginning", descriptor: "Program is missing most required parts or does not run." },
          { label: "Developing", descriptor: "Program runs but is missing a loop, condition, or safe stop." },
          { label: "Proficient", descriptor: "Program uses a sequence, a loop, a condition, and a safe stop correctly." },
          { label: "Exemplary", descriptor: "Program is efficient and well-structured, handling the mission cleanly." },
        ],
      },
      {
        id: "w8-rub-sensor",
        name: "Sensor use",
        description: "Whether the robot senses the world and uses that reading to decide what to do.",
        weightPercent: 15,
        levels: [
          { label: "Beginning", descriptor: "No sensor is used, or the reading is never used to make a decision." },
          { label: "Developing", descriptor: "A sensor is read, but the reading barely affects what the robot does." },
          { label: "Proficient", descriptor: "At least one sensor is read and a threshold or condition uses it to steer the mission." },
          { label: "Exemplary", descriptor: "Sensor use is calibrated and reliable, driving the robot's decisions accurately." },
        ],
      },
      {
        id: "w8-rub-testing",
        name: "Testing & improvement",
        description: "Three recorded runs and one documented improvement.",
        weightPercent: 20,
        levels: [
          { label: "Beginning", descriptor: "Little testing; results not recorded." },
          { label: "Developing", descriptor: "Some runs recorded but no clear improvement made." },
          { label: "Proficient", descriptor: "Three runs recorded and one improvement documented with its effect." },
          { label: "Exemplary", descriptor: "Thorough testing with clear evidence that the improvement increased reliability." },
        ],
      },
      {
        id: "w8-rub-communication",
        name: "Explanation & responsible use",
        description: "Explaining how the robot helps, how you know it works, and how it is used safely and responsibly.",
        weightPercent: 5,
        levels: [
          { label: "Beginning", descriptor: "Cannot clearly explain what the robot does." },
          { label: "Developing", descriptor: "Explains the robot but not how it helps, how it was tested, or how it stays safe." },
          { label: "Proficient", descriptor: "Clearly explains the mission, how the robot works, the test evidence, and its safe stop." },
          { label: "Exemplary", descriptor: "Explains the design, decisions, evidence, and responsible use convincingly to an audience." },
        ],
      },
    ],
    variants: {
      kit: {
        pathId: "kit",
        title: "Final project on a robot kit",
        materials: ["Robot kit with at least one sensor", "All printable project pages"],
        instructions: ["Plan, build, and program on the kit.", "Use a real sensor for the condition.", "Run three physical test runs and improve one thing."],
        safetyNotes: ["Clear test area; keep clear of moving parts."],
        expectedResult: "A physical robot that completes its mission reliably and stops safely.",
        successCriteria: ["Meets all required rubric items at Proficient or above"],
        troubleshooting: [{ problem: "Runs are inconsistent", fix: "Standardize the start position and re-check the sensor threshold, as in Week 6." }],
        extension: "Add the stretch second sensor or counter.",
      },
      simulator: {
        pathId: "simulator",
        title: "Final project in the browser simulator",
        materials: ["Browser simulator", "All printable project pages"],
        instructions: ["Plan on paper, then build the grid mission and program in the sim.", "Use a sensor block for the condition.", "Run three times from the same start and improve one thing."],
        safetyNotes: ["Save often so a refresh doesn't lose work."],
        expectedResult: "A simulator robot that completes the grid mission and stops when done.",
        successCriteria: ["Meets all required rubric items at Proficient or above"],
        troubleshooting: [{ problem: "Robot behaves differently each run", fix: "Fix the start tile and make the loop end on a clear sensor condition." }],
        extension: "Run the mission on a larger or more cluttered grid.",
      },
      unplugged: {
        pathId: "unplugged",
        title: "Final project as a cardboard robot with a card program",
        materials: ["Cardboard robot model", "Program cards", "Floor grid or tape course"],
        instructions: ["Plan on paper, build a model with a moving part and stand-in sensor.", "Write the program on cards with a sequence, repeat, and if.", "Have a partner 'run' it three times and improve one step."],
        safetyNotes: ["Adult help for cutting."],
        expectedResult: "A model and card program a partner can run the same way twice to complete the mission.",
        successCriteria: ["Meets all required rubric items at Proficient or above"],
        troubleshooting: [{ problem: "Partners run it differently", fix: "Make each card an exact, unambiguous instruction." }],
        extension: "Swap missions with another team and run theirs.",
      },
    },
  },
}

/* ========================================================================== */
/* WEEK 2                                                                      */
/* ========================================================================== */

export const roboticsWeek2: RoboticsModule = {
  id: "week-2",
  slug: "building-a-robot-that-moves",
  week: 2,
  order: 2,
  title: "Building a Robot That Moves",
  subtitle: "Turn a motor's spin into steady rolling, and design a chassis that moves without tipping.",
  summary:
    "Now that students know what a robot is, they build one that actually moves. They learn how a motor spins an axle, how wheels and gears turn that spin into motion, and how gears trade speed for turning power (torque). They investigate why some rolling bases tip over and others stay steady - friction and traction for grip, and a low, wide center of mass for stability - and they meet differential drive, where driving two wheels at different speeds is what steers the robot. Then each student builds and tests a rolling base of their own.",
  mainMission:
    "Build a stable rolling base and test how wheel, gear, and chassis choices change how it moves.",
  estimatedTime: "65-80 minutes",
  learningGoals: [
    { id: "w2-g1", text: "Explain how a motor, axle, and wheels turn spinning into rolling" },
    { id: "w2-g2", text: "Identify the wheels, axles, and gears on a rolling base" },
    { id: "w2-g3", text: "Compare speed and torque, and how gears trade one for the other" },
    { id: "w2-g4", text: "Use friction and traction to explain why wheels grip or slip" },
    { id: "w2-g5", text: "Recognize stable and unstable chassis designs" },
    { id: "w2-g6", text: "Explain how wheel spacing and center of mass affect balance" },
    { id: "w2-g7", text: "Build or simulate a rolling base and steer it using differential drive" },
    { id: "w2-g8", text: "Test a design and improve it based on the results" },
  ],
  vocabulary: [
    { term: "Motor", definition: "A part that spins when it gets power, giving the robot the movement it needs to roll." },
    { term: "Axle", definition: "A rod that a wheel is attached to, so when the axle turns, the wheel turns with it." },
    { term: "Wheel", definition: "A round part that rolls the robot along the ground when its axle spins." },
    { term: "Gear", definition: "A toothed wheel that locks into another gear to pass along spinning motion and change its speed or power." },
    { term: "Speed", definition: "How fast the robot moves. A small gear driving a big gear makes the wheels spin slower." },
    { term: "Torque", definition: "The turning power a motor or gear has. More torque means more force to move a heavy robot or climb." },
    { term: "Friction", definition: "The rubbing force between two surfaces that touch. It slows sliding and lets wheels grip instead of spinning in place." },
    { term: "Traction", definition: "How well a wheel grips the ground. Good traction means the wheel pushes the robot forward instead of slipping." },
    { term: "Balance", definition: "Keeping the robot's weight spread so it stays upright and does not tip over." },
    { term: "Stability", definition: "How hard it is to tip a robot over. A low, wide base is more stable than a tall, narrow one." },
    { term: "Center of mass", definition: "The average spot where a robot's weight is centered. A lower center of mass makes the robot harder to tip." },
    { term: "Chassis", definition: "The frame or base of the robot that holds the motors, wheels, and everything else together." },
    { term: "Differential drive", definition: "A way to steer by driving the two side wheels at different speeds: the robot turns toward the slower wheel." },
  ],
  prerequisites: [
    { moduleId: "week-1", reason: "Week 1 named motors and wheels as actuators; Week 2 shows how those actuators actually move the robot, so students need the sense-decide-act picture first." },
  ],
  concepts: [
    {
      id: "w2-c1",
      title: "From a spinning motor to a rolling robot",
      body: [
        "A motor spins when it gets power, but a spinning motor by itself does not go anywhere. To move, the robot connects the motor to an axle, and the axle holds the wheels. When the motor turns the axle, the wheels turn, and the robot rolls.",
        "So the chain is: motor spins, axle turns, wheels roll. If any link in that chain is loose or missing, the spin never reaches the ground and the robot stays put.",
      ],
      examples: ["A motor turning a bare axle with no wheel just spins in the air", "A wheel pushed onto a turning axle rolls the robot forward"],
    },
    {
      id: "w2-c2",
      title: "Gears trade speed for torque",
      body: [
        "Gears are toothed wheels that lock together so one can turn the other. When a small gear turns a big gear, the big gear spins slower but with more turning power. When a big gear turns a small gear, the small gear spins faster but with less power.",
        "That turning power is called torque. Gears let you choose: a slow, strong robot that can climb or push, or a fast, weaker one that zips across a flat floor. You cannot get maximum speed and maximum torque at the same time - you trade one for the other.",
      ],
      examples: ["A bicycle in low gear: slow but easy to pedal uphill (high torque)", "A bicycle in high gear: fast on flat ground but hard to start (low torque)"],
    },
    {
      id: "w2-c3",
      title: "Friction and traction: how wheels grip",
      body: [
        "Friction is the rubbing force between two surfaces that touch. Without friction, a spinning wheel would just slip in place and the robot would go nowhere - like tires on ice.",
        "Traction is how well a wheel grips the ground, and it comes from friction. A rubber tire on carpet has lots of traction; a smooth plastic wheel on a slick floor has little. Good traction turns the wheel's spin into real forward motion.",
      ],
      examples: ["Rubber tires grip the road (high traction)", "A wheel spinning on a wet or smooth surface (low traction)", "Adding a rubber band around a slippery wheel to help it grip"],
    },
    {
      id: "w2-c4",
      title: "Balance, stability, and center of mass",
      body: [
        "The center of mass is the average spot where a robot's weight is centered. A robot tips over when its center of mass leans out past its wheels.",
        "To make a robot more stable, keep its center of mass low and its base wide. A low, wide base is hard to tip; a tall, narrow, top-heavy one tips easily. That is why race cars are low and wide, and why a stack of blocks falls when it gets too tall.",
      ],
      examples: ["A low, wide base stays upright on a turn", "A tall tower of parts tips when the robot stops fast", "Putting the heavy battery low in the chassis to lower the center of mass"],
    },
    {
      id: "w2-c5",
      title: "Chassis design: the robot's frame",
      body: [
        "The chassis is the frame that holds the motors, axles, wheels, and battery together. A good chassis keeps the wheels lined up straight, holds the motors firmly, and puts the heavy parts low.",
        "Design choices matter: wheels too far apart or too close, a loose motor, or a wobbly frame all change how the robot moves. The chassis is not just a box - it decides whether the robot rolls straight, turns cleanly, and stays upright.",
      ],
      examples: ["Wheels lined up straight so the robot rolls in a line", "A firm frame so the motor does not wobble", "Weight kept low and centered over the wheels"],
    },
    {
      id: "w2-c6",
      title: "Differential drive: steering by speed",
      body: [
        "Most small robots steer with differential drive: two wheels, one on each side, each turned by its own motor. When both wheels spin at the same speed, the robot goes straight.",
        "To turn, you drive the wheels at different speeds. The robot curves toward the slower wheel. If one wheel goes forward and the other goes backward, the robot spins in place. There is no steering wheel - the difference in wheel speed is the steering.",
      ],
      examples: ["Both wheels same speed: straight ahead", "Left wheel slower than right: the robot curves left", "Left wheel forward, right wheel backward: the robot spins in place"],
    },
  ],
  materials: [
    { id: "w2-m1", name: "Chassis Test Log worksheet (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w2-m2", name: "Pencil, paper, and a ruler or measuring tape", paths: ["kit", "simulator", "unplugged"] },
    { id: "w2-m3", name: "A short ramp or a stack of books to make a slope for the tip test", paths: ["kit", "unplugged"] },
    { id: "w2-m4", name: "A programmable robot kit with two motors, wheels, axles, and gears", paths: ["kit"] },
    { id: "w2-m5", name: "Assorted wheels and gears from the kit to swap and compare", paths: ["kit"] },
    { id: "w2-m6", name: "Computer or tablet with the browser simulator", paths: ["simulator"] },
    { id: "w2-m7", name: "Cardboard for the chassis, plus tape and scissors", paths: ["unplugged"] },
    { id: "w2-m8", name: "Bottle caps or jar lids for wheels and wooden skewers or straws for axles", paths: ["unplugged"] },
    { id: "w2-m9", name: "Rubber bands, coins, or clay to add grip and weight", paths: ["unplugged"], optional: true },
    { id: "w2-m10", name: "A marble or small ball to model the center of mass shifting", paths: ["unplugged"], optional: true },
  ],
  activities: [
    {
      id: "w2-a-chassis-investigation",
      interactive: "chassis-lab",
      kind: "explore",
      title: "Virtual chassis investigation",
      goal: "Explore how wheel size, gearing, and base shape change how a rolling base moves, grips, and stays upright.",
      shared: [
        "You will change one thing at a time - wheel size, gears, base width, or weight - and watch how the base moves. Changing one thing at a time is how you tell which change did what.",
        "For each change, note what happened to speed, grip, and stability. Write down which setup rolled straight and fast, and which one stayed the steadiest.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Swap real wheels and gears on a kit base",
          materials: ["A programmable robot kit with two motors", "Assorted wheels and gears from the kit", "Chassis Test Log worksheet"],
          instructions: [
            "Build a simple two-motor base and drive it straight across the floor at a set speed.",
            "Swap the wheels for a bigger or smaller pair and drive the same distance again. Note the change in speed.",
            "Change the gearing (or the motor power) so the wheels turn slower, and feel how much harder the base is to stop - that is more torque.",
            "Add a tall part on top, then move the weight low, and see which version is easier to tip.",
          ],
          safetyNotes: ["Keep fingers, hair, and loose clothing away from spinning gears and wheels.", "Turn the motor off before swapping wheels or gears."],
          expectedResult: "Bigger wheels roll faster but need more push to start; lower gearing gives more torque; a low, wide base is hardest to tip.",
          successCriteria: ["At least three setups tested and logged", "Each change describes its effect on speed, grip, or stability", "One setup is named the most stable, with a reason"],
          troubleshooting: [
            { problem: "The base curves instead of going straight", fix: "Check both wheels are on tight and the motors run at the same speed; a loose wheel or uneven motors cause curving." },
            { problem: "A wheel spins but the base does not move", fix: "The wheel is slipping - low traction. Try a grippier wheel or a rougher surface." },
          ],
          extension: "Find the wheel-and-gear combination that climbs your ramp without stalling.",
        },
        simulator: {
          pathId: "simulator",
          title: "Test chassis choices in the simulator",
          materials: ["Browser simulator", "Chassis Test Log worksheet"],
          instructions: [
            "Open the chassis-lab mission and drive the default base across the grid, noting its speed.",
            "Change the wheel size setting, run again, and record how speed and grip change.",
            "Change the gearing toward more torque and drive up the simulator's slope; see how a low gear climbs where a high gear stalls.",
            "Raise and lower the base's center of mass, then drive a fast turn and watch which setting tips or wobbles.",
          ],
          safetyNotes: ["No physical safety concerns; take a screen break if your eyes get tired."],
          expectedResult: "The simulator shows big wheels going faster, low gearing giving more climbing torque, and a low center of mass staying upright in turns.",
          successCriteria: ["At least three setups tested and logged", "Each change describes its effect on speed, grip, or stability", "One setup is named the most stable, with a reason"],
          troubleshooting: [
            { problem: "Every setup drives the same", fix: "Make sure you changed the setting and re-ran; change only one setting at a time so the effect is clear." },
            { problem: "The base always tips in a turn", fix: "Lower the center of mass or widen the base, then turn a little more slowly." },
          ],
          extension: "Find the single setting that most improves the base's climb up the slope.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Compare cardboard bases with everyday wheels",
          materials: ["Cardboard for two small bases", "Bottle caps and skewers or straws", "Rubber bands, coins, or clay (optional)", "A ramp or stack of books", "Chassis Test Log worksheet"],
          instructions: [
            "Make a simple cardboard base with cap wheels on skewer axles and roll it down a gentle ramp.",
            "Swap to bigger cap wheels, roll it again, and note the change in how far and how fast it goes.",
            "Wrap rubber bands around the wheels to add grip, then roll on a smooth surface and compare it to bare caps - that is traction.",
            "Build a tall version and a low, wide version, and tilt each on the ramp to see which tips first.",
          ],
          safetyNotes: ["Use child-safe scissors with an adult to cut cardboard and axle holes.", "Keep skewer points capped or blunted."],
          expectedResult: "Bigger wheels roll farther, rubber-banded wheels grip better, and the low, wide base tips at a steeper angle than the tall one.",
          successCriteria: ["At least three setups tested and logged", "Each change describes its effect on speed, grip, or stability", "One setup is named the most stable, with a reason"],
          troubleshooting: [
            { problem: "The base rolls crooked", fix: "Line up the axles so they are parallel and the wheels are the same size on each side." },
            { problem: "The wheels slide instead of rolling", fix: "The axle may be stuck. Make the hole a little bigger so the axle spins freely." },
          ],
          extension: "Add a coin low in the base and again up high, and find which placement keeps it steadier on the ramp.",
        },
      },
    },
    {
      id: "w2-a-rolling-base",
      kind: "build",
      title: "Rolling-base challenge",
      goal: "Build a rolling base that drives straight, stays upright, and can steer with differential drive.",
      shared: [
        "Build a base with two driven wheels, one on each side, plus a support at the front or back so it does not tip. Keep the heavy parts low and the wheels lined up straight.",
        "Test three things: does it roll straight, can it steer by driving the wheels at different speeds, and does it stay upright when it stops and turns? Fix one thing at a time until all three work.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Physical-kit rolling base",
          materials: ["A programmable robot kit with two motors, wheels, and axles", "A ramp or books for the tip test", "Chassis Test Log worksheet"],
          instructions: [
            "Build a chassis that holds two motors firmly, one driving each side wheel, with a caster or skid to balance the third point.",
            "Keep the battery and heavy parts low and centered so the center of mass stays low.",
            "Drive it forward and adjust until it rolls straight, then drive the two wheels at different speeds to make it turn.",
            "Test its stability by stopping fast and by driving across a slight slope.",
          ],
          safetyNotes: ["Keep clear of spinning wheels and gears while driving.", "Test in a clear area away from edges and stairs."],
          expectedResult: "A kit base that rolls straight, turns by differential drive, and stays upright when it stops and on a mild slope.",
          successCriteria: ["Rolls straight for at least one meter", "Turns left and right by changing wheel speeds", "Stays upright when stopping quickly", "Motors and wheels are held firmly"],
          troubleshooting: [
            { problem: "It always drifts to one side", fix: "One motor may be faster or a wheel loose; match the motor speeds and tighten both wheels." },
            { problem: "It tips forward when it stops", fix: "The center of mass is too high or too far forward; lower the weight and move it back over the wheels." },
          ],
          extension: "Program it to drive a straight line, then a square, using differential-drive turns.",
        },
        simulator: {
          pathId: "simulator",
          title: "Simulator chassis challenge",
          materials: ["Browser simulator", "Chassis Test Log worksheet"],
          instructions: [
            "Open the chassis-builder mission and set up a two-wheel differential-drive base.",
            "Choose wheel size and a low center of mass so the base is stable, then drive it straight across the grid.",
            "Make it turn by setting the left and right wheel speeds differently, and practice a left turn, a right turn, and a spin in place.",
            "Drive a fast turn and the simulator's slope to check it does not tip.",
          ],
          safetyNotes: ["No physical safety concerns; save your work often."],
          expectedResult: "A simulator base that drives straight, steers by differential drive, and stays upright through turns and the slope.",
          successCriteria: ["Rolls straight across the grid", "Turns left and right by changing wheel speeds", "Spins in place with wheels going opposite directions", "Stays upright on a fast turn"],
          troubleshooting: [
            { problem: "The base only ever drives straight", fix: "Set the two wheel speeds to different values; equal speeds always go straight." },
            { problem: "The base tips on turns", fix: "Lower the center of mass or widen the wheelbase, then turn more gently." },
          ],
          extension: "Drive the base around a full square using only differential-drive turns.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Household-material rolling base",
          materials: ["Cardboard for the chassis", "Bottle caps for wheels and skewers or straws for axles", "Tape, scissors, and a rubber band or two", "Rubber bands, coins, or clay for grip and weight (optional)", "A ramp or books for the tip test", "Chassis Test Log worksheet"],
          instructions: [
            "Cut a low, wide cardboard base and poke two parallel axle holes so the wheels line up straight.",
            "Push cap wheels onto the skewer axles and add a small front skid (a folded cardboard tab) so it balances on three points.",
            "Give it a push and adjust the axles until it rolls straight, then push one side more than the other to see it steer - that is differential steering by hand.",
            "Add weight low in the base and tilt it on the ramp to check it stays upright longer than a tall version.",
          ],
          safetyNotes: ["Use child-safe scissors with an adult and keep skewer points blunted.", "Test on a table well away from the edge."],
          expectedResult: "A cardboard base that rolls fairly straight, can be steered by turning one side more than the other, and stays upright on a mild slope.",
          successCriteria: ["Rolls straight for at least half a meter", "Can be steered by moving one side more than the other", "Stays upright on the ramp longer than a tall version", "Wheels line up parallel and spin freely"],
          troubleshooting: [
            { problem: "It rolls crooked", fix: "The axles are not parallel or the wheels differ in size; straighten the holes and match the wheels." },
            { problem: "The wheels slip on the table", fix: "Wrap a rubber band around each wheel to add traction." },
          ],
          extension: "Race two of your bases and use the test log to explain which rolled straighter and why.",
        },
      },
    },
  ],
  predictionPrompts: [
    { id: "w2-p1", prompt: "Before the tip test: which base do you think stays upright longest on the ramp - the tall narrow one or the low wide one? Why?", howToCheck: "Tilt each base on the ramp (or run the sim slope) and see which one tips first; compare to your guess." },
    { id: "w2-p2", prompt: "Before swapping gears: do you think lower gearing will make the base faster or stronger at climbing? Predict what it trades away.", howToCheck: "Change the gearing so the wheels turn slower, drive up the ramp, and check whether it climbs better but moves slower." },
  ],
  testRecords: [
    {
      id: "w2-tr1",
      title: "Rolling-base speed and straightness test",
      instructions: "Mark a start line and a finish line one meter apart. Drive the base from the start and record how many seconds it takes and how far off the line it ends up. Run it three times.",
      columns: ["Run", "Time to finish (seconds)", "How far off the straight line (cm)", "Notes"],
      rows: 3,
      measure: "The time to cover the distance and how far the base drifted from a straight line",
    },
    {
      id: "w2-tr2",
      title: "Tip-over stability test",
      instructions: "Place the base on the ramp and slowly raise the ramp until the base tips over. Record the tipping angle (or the number of books) for a low, wide setup and a tall, narrow setup.",
      columns: ["Setup", "Tips at how many books / what angle", "Stayed upright? (Y/N)"],
      rows: 4,
      measure: "The angle or ramp height at which each setup tips over",
    },
  ],
  debuggingMissions: [],
  knowledgeCheck: {
    id: "w2-kc",
    instructions: "Answer these to check that you understand how a robot moves and stays steady.",
    passThreshold: 4,
    questions: [
      {
        id: "w2-q6",
        kind: "scenario",
        prompt: "Diagnose the design problem.",
        scenario: "A student's robot is tall and narrow with the battery mounted on top. It drives straight fine, but it tips over every time it makes a fast turn.",
        options: [
          { id: "w2-q6-a", text: "The center of mass is too high", correct: true, feedback: "Right - a tall, top-heavy robot has a high center of mass and tips easily, especially in turns." },
          { id: "w2-q6-b", text: "The wheels have too much traction", correct: false, feedback: "Traction is good; the tipping comes from being tall and top-heavy." },
          { id: "w2-q6-c", text: "The motor has too little torque", correct: false, feedback: "It drives fine, so torque is not the tipping problem." },
          { id: "w2-q6-d", text: "The axles are too long", correct: false, feedback: "Longer axles (wider wheels) would actually make it MORE stable." },
        ],
        correctOptionId: "w2-q6-a",
        explanation: "Tall and top-heavy means a high center of mass, which tips in fast turns. Lower the weight or widen the wheelbase.",
      },
      {
        id: "w2-q1",
        kind: "single",
        prompt: "How does a spinning motor make a robot roll across the floor?",
        options: [
          { id: "w2-q1-a", text: "The motor spins an axle, and the axle turns the wheels", correct: true, feedback: "Right - motor spins, axle turns, wheels roll: that is the chain that moves the robot." },
          { id: "w2-q1-b", text: "The motor blows air backward to push the robot", correct: false, feedback: "Wheeled robots roll from turning wheels, not from blowing air." },
          { id: "w2-q1-c", text: "The motor makes the robot lighter", correct: false, feedback: "A motor does not change the robot's weight; it provides spinning motion." },
          { id: "w2-q1-d", text: "The wheels roll on their own without the motor", correct: false, feedback: "The wheels only turn because the motor spins the axle they are on." },
        ],
        correctOptionId: "w2-q1-a",
        explanation: "The motor turns an axle, the axle turns the wheels attached to it, and the turning wheels roll the robot.",
      },
      {
        id: "w2-q2",
        kind: "single",
        prompt: "You gear a robot down so its wheels turn slower. What do you gain, and what do you give up?",
        options: [
          { id: "w2-q2-a", text: "You gain speed and give up torque", correct: false, feedback: "It is the other way around - slower wheels have more torque, not more speed." },
          { id: "w2-q2-b", text: "You gain torque (turning power) and give up speed", correct: true, feedback: "Correct - gears trade speed for torque; slower wheels can push or climb harder." },
          { id: "w2-q2-c", text: "You gain both speed and torque", correct: false, feedback: "You cannot get maximum speed and maximum torque at once; gears trade one for the other." },
          { id: "w2-q2-d", text: "You give up both speed and torque", correct: false, feedback: "Gearing down does not lose both - it swaps speed for more torque." },
        ],
        correctOptionId: "w2-q2-b",
        explanation: "Gears trade speed for torque. Turning the wheels slower gives more turning power for climbing or pushing.",
      },
      {
        id: "w2-q3",
        kind: "single",
        prompt: "A robot's wheels spin fast but it barely moves on a smooth, slippery floor. What is the problem?",
        options: [
          { id: "w2-q3-a", text: "Too much torque", correct: false, feedback: "The trouble is grip, not turning power." },
          { id: "w2-q3-b", text: "The motor is off", correct: false, feedback: "The wheels are spinning, so the motor is clearly running." },
          { id: "w2-q3-c", text: "Low traction - the wheels are slipping instead of gripping", correct: true, feedback: "Right - little friction means low traction, so the wheels slip instead of pushing the robot forward." },
          { id: "w2-q3-d", text: "The center of mass is too low", correct: false, feedback: "A low center of mass helps stability; it does not make wheels slip." },
        ],
        correctOptionId: "w2-q3-c",
        explanation: "Smooth floors give little friction, so the wheels have low traction and slip in place instead of rolling the robot forward.",
      },
      {
        id: "w2-q4",
        kind: "single",
        prompt: "Which robot base is the hardest to tip over?",
        options: [
          { id: "w2-q4-a", text: "A tall, narrow base with the heavy parts up high", correct: false, feedback: "That is the easiest to tip - a high center of mass tips fast." },
          { id: "w2-q4-b", text: "A low, wide base with the heavy parts near the bottom", correct: true, feedback: "Correct - a low, wide base with a low center of mass is the most stable." },
          { id: "w2-q4-c", text: "A base with the biggest wheels, no matter its shape", correct: false, feedback: "Wheel size changes speed and grip, not mainly tipping; shape and weight placement matter for stability." },
          { id: "w2-q4-d", text: "The most colorful base", correct: false, feedback: "Color has nothing to do with stability." },
        ],
        correctOptionId: "w2-q4-b",
        explanation: "A low, wide base keeps the center of mass low and inside the wheels, which makes it hard to tip over.",
      },
      {
        id: "w2-q5",
        kind: "single",
        prompt: "In differential drive, how does a two-wheeled robot turn left?",
        options: [
          { id: "w2-q5-a", text: "It uses a steering wheel like a car", correct: false, feedback: "Differential-drive robots have no steering wheel; they steer with wheel speeds." },
          { id: "w2-q5-b", text: "The left wheel turns slower than the right wheel", correct: true, feedback: "Right - the robot curves toward the slower wheel, so a slower left wheel turns it left." },
          { id: "w2-q5-c", text: "Both wheels speed up together", correct: false, feedback: "Equal wheel speeds make the robot go straight, not turn." },
          { id: "w2-q5-d", text: "The motor tilts sideways", correct: false, feedback: "The motors do not tilt; the difference in wheel speed does the steering." },
        ],
        correctOptionId: "w2-q5-b",
        explanation: "In differential drive the robot turns toward the slower wheel, so slowing the left wheel steers it left.",
      },
    ],
  },
  reflection: [
    { id: "w2-r1", prompt: "What mechanical change made the biggest difference in your robot's movement, and why?" },
    { id: "w2-r2", prompt: "What change made your base the most stable, and why did it help?" },
    { id: "w2-r3", prompt: "Describe how you would steer your robot left using only its two wheels." },
  ],
  journalPrompts: [
    { id: "w2-j1", prompt: "Sketch your rolling base from the side and label the motor, axle, wheels, and where the weight sits.", captures: "sketch" },
    { id: "w2-j2", prompt: "Record your speed-and-straightness test results and which setup rolled best.", captures: "checklist" },
    { id: "w2-j3", prompt: "Write one sentence about what you would change to make your base more stable.", captures: "text" },
  ],
  savedPrograms: [],
  simulatorMissions: [
    {
      id: "w2-sim-straight",
      title: "Drive straight and steady",
      objective: "Set up a differential-drive base that rolls straight across the grid without drifting or tipping.",
      grid: { cols: 6, rows: 6 },
      successCriteria: ["The base reaches the far side of the grid", "It stays on a straight line", "It stays upright the whole way"],
    },
    {
      id: "w2-sim-turn",
      title: "Steer with differential drive",
      objective: "Use different left and right wheel speeds to turn the base left, turn it right, and spin it in place.",
      grid: { cols: 8, rows: 8 },
      successCriteria: ["The base turns left and right by changing wheel speeds", "The base spins in place with wheels going opposite ways", "The base does not tip during the turns"],
    },
  ],
  lessonFlow: [
    { id: "w2-f1", kind: "learn", title: "How robots move", focus: "Motor, axle, wheels, gears trading speed for torque, friction and traction.", minutes: 15 },
    { id: "w2-f2", kind: "learn", title: "Staying upright", focus: "Balance, stability, center of mass, chassis design, and differential drive.", minutes: 10 },
    { id: "w2-f3", kind: "explore", title: "Virtual chassis investigation", focus: "Change one thing at a time and log its effect on speed, grip, and stability.", activityId: "w2-a-chassis-investigation", minutes: 15 },
    { id: "w2-f4", kind: "predict", title: "Predict the steadiest base", focus: "Guess which base stays upright longest before the tip test.", minutes: 5 },
    { id: "w2-f5", kind: "build", title: "Rolling-base challenge", focus: "Build a base that rolls straight, steers, and stays upright.", activityId: "w2-a-rolling-base", minutes: 20 },
    { id: "w2-f6", kind: "test", title: "Speed and tip-over tests", focus: "Record speed, straightness, and the tipping angle of each setup.", minutes: 10 },
    { id: "w2-f7", kind: "knowledge-check", title: "Knowledge check", focus: "Five questions on movement, torque, traction, stability, and steering.", minutes: 8 },
    { id: "w2-f8", kind: "reflection", title: "Reflection", focus: "Write about gears, stability, and differential-drive steering.", minutes: 7 },
  ],
  safetyNotes: [
    { id: "w2-s1", text: "Keep fingers, hair, and loose clothing away from spinning wheels and gears, and turn the motor off before swapping parts.", severity: "caution", paths: ["kit"] },
    { id: "w2-s2", text: "Use child-safe scissors with an adult to cut cardboard and axle holes, and keep skewer points blunted.", severity: "caution", paths: ["unplugged"] },
    { id: "w2-s3", text: "Test rolling bases in a clear area away from table edges, stairs, and drops.", severity: "caution", paths: ["kit", "unplugged"] },
    { id: "w2-s4", text: "Save your work often so a browser refresh does not lose your chassis and test log.", severity: "info", paths: ["simulator"] },
  ],
  printableResources: [
    { id: "w2-pr1", kind: "worksheet", title: "Chassis Test Log", description: "A sheet to record wheel, gear, and base changes and their effect on speed, grip, and stability." },
    { id: "w2-pr2", kind: "worksheet", title: "Speed and tip-over test record", description: "Tables for the one-meter speed-and-straightness test and the ramp tip-over test." },
    { id: "w2-pr3", kind: "journal-page", title: "Rolling-base sketch page", description: "Space to draw the base from the side and label the motor, axle, wheels, and weight." },
    { id: "w2-pr4", kind: "teacher-guide", title: "Week 2 teacher guide", description: "Setup, facilitation, misconceptions, and questions for the build-a-moving-robot lesson." },
  ],
  completion: {
    summary: "Finish Week 2 by investigating chassis choices, building a rolling base that steers and stays upright, recording your speed and tip-over tests, and passing the knowledge check.",
    requirements: [
      { id: "w2-cr1", label: "Complete the Virtual chassis investigation and log three setups", sectionKind: "explore" },
      { id: "w2-cr2", label: "Build a rolling base that rolls straight, steers, and stays upright", sectionKind: "build" },
      { id: "w2-cr3", label: "Record the speed-and-straightness and tip-over tests", sectionKind: "test" },
      { id: "w2-cr4", label: "Score at least 4 of 5 on the knowledge check", sectionKind: "knowledge-check" },
      { id: "w2-cr5", label: "Write your reflection", sectionKind: "reflection" },
    ],
  },
  teacherGuidance: {
    setup: [
      "Set out wheels, gears, and chassis parts (kit), or cardboard, caps, skewers, and tape (unplugged), sorted so students can swap quickly.",
      "Print the Chassis Test Log and the speed and tip-over test record, one per student or pair.",
      "Mark a one-meter test lane on the floor and set up a ramp or a stack of books for the tip test.",
      "If using the simulator, open the chassis-lab mission on each device.",
    ],
    prep: [
      "Build one working rolling base yourself so you can show a stable example and spot common wobble problems.",
      "Try the tip test with a tall base and a low, wide base so you can predict what students will see.",
      "Have spare rubber bands ready to fix low-traction wheels.",
    ],
    facilitation: [
      "Start with the motor-axle-wheel chain and gears trading speed for torque before any building begins.",
      "Run the Virtual chassis investigation, insisting students change only one thing at a time and log each result.",
      "Have students predict the steadiest base, then run the tip test to check the prediction.",
      "Move into the rolling-base build, then the speed and tip-over tests, and finish with the knowledge check and reflection.",
    ],
    commonMisconceptions: [
      "'Bigger wheels always mean a better robot' - bigger wheels add speed but need more torque to start and can raise the base.",
      "'Gearing down makes the robot slower and weaker' - it is slower but stronger; it trades speed for torque.",
      "'A spinning wheel means the robot is moving' - on a slick floor it can spin in place with no traction.",
      "'You turn a robot with a steering wheel' - differential-drive robots steer by driving the wheels at different speeds.",
      "'Taller robots are sturdier' - a low, wide base with a low center of mass is far harder to tip.",
    ],
    questionsToAsk: [
      "Where does the motor's spin have to travel to reach the ground?",
      "If you want this robot to climb, do you need more speed or more torque?",
      "Why is this wheel slipping instead of gripping?",
      "Which way will the robot turn if the left wheel slows down?",
      "Where is the weight, and how could you make this base harder to tip?",
    ],
    easierVersion: "Give students a pre-built base and have them only swap wheels and test the tip-over ramp, instead of building the chassis from scratch.",
    harderVersion: "Challenge students to gear their base for the best climb up the ramp and to drive an accurate square using only differential-drive turns.",
  },
  nextWeek: {
    moduleId: "week-3",
    teaser: "Next week your rolling base gets a brain: you'll write your first program so the robot drives a planned path on its own.",
    prepare: [
      "Keep your rolling base built and working so you can program it next week.",
      "Charge your kit or bookmark the simulator and its block editor.",
      "Think about how you would tell someone the exact steps to walk from the door to a chair without watching them.",
    ],
  },
}

/* ========================================================================== */
/* WEEK 3                                                                      */
/* ========================================================================== */

export const roboticsWeek3: RoboticsModule = {
  id: "week-3",
  slug: "giving-exact-instructions",
  week: 3,
  order: 3,
  title: "Giving Exact Instructions",
  subtitle: "Turn a path into a clear step-by-step plan, then program the robot to follow it exactly.",
  summary:
    "Students learn that computers follow instructions literally and exactly: a robot does what you actually told it, not what you meant. They write an algorithm - a clear step-by-step plan - as pseudocode in plain language, then turn it into a program made of a straight sequence of movement commands with timing, distance, and turns. They predict where the robot will end up before running, then run and compare. This is a sequences-only week: no loops, conditions, or sensors yet - just exact, ordered commands to steer a robot through a delivery path or maze to a goal.",
  mainMission:
    "Plan an exact sequence of move and turn commands, predict where it ends, then program the robot to follow a path to a goal.",
  estimatedTime: "60-75 minutes",
  learningGoals: [
    { id: "w3-g1", text: "Explain that a program is a sequence of commands a computer follows in order, literally and exactly" },
    { id: "w3-g2", text: "Write an algorithm as pseudocode - a clear step-by-step plan in plain language - before coding" },
    { id: "w3-g3", text: "Control a robot's path using distance, timing, and turn commands in the right order" },
    { id: "w3-g4", text: "Predict where a robot will end up before running the program, then check the prediction" },
    { id: "w3-g5", text: "Program the robot to follow a delivery path or maze to a goal using only a sequence of commands" },
  ],
  vocabulary: [
    { term: "Program", definition: "A list of instructions a computer follows to do a job. This week, a program is a sequence of movement commands." },
    { term: "Command", definition: "One single instruction the robot can carry out, like 'move forward' or 'turn right'." },
    { term: "Sequence", definition: "Commands run one after another, in order, from top to bottom. Order matters." },
    { term: "Algorithm", definition: "A clear step-by-step plan for doing a task, with no missing or fuzzy steps." },
    { term: "Pseudocode", definition: "Writing the steps of a plan in plain language before you turn them into real code." },
    { term: "Event", definition: "The moment that starts a program running, like pressing 'Start' or a 'when tapped' block." },
    { term: "Timing", definition: "How long a command runs, measured in seconds - one way to control how far the robot goes." },
    { term: "Distance", definition: "How far the robot moves in a command, often set in centimeters or grid squares." },
    { term: "Turn", definition: "A command that rotates the robot in place, usually by a set number of degrees like 90." },
    { term: "Speed", definition: "How fast the motors run. Faster speed covers more distance in the same amount of time." },
    { term: "Prediction", definition: "Your best guess about where the robot will end up, made before you run the program." },
  ],
  prerequisites: [
    { moduleId: "week-2", reason: "You need the rolling base you built in Week 2, because Week 3 programs make that base move." },
    { moduleId: "week-1", reason: "You use the idea that a program is the instructions a controller follows, from Week 1." },
  ],
  concepts: [
    {
      id: "w3-c1",
      title: "Computers follow instructions literally",
      body: [
        "A robot does exactly what you tell it - not what you meant. If you say 'go forward' but forget to say how far, the robot cannot guess; it does the wrong thing or nothing at all. Computers are fast and tireless, but they have no common sense.",
        "This is the most important idea this week. When a robot misbehaves, it is almost always following your instructions correctly - your instructions just weren't what you wanted.",
      ],
      examples: ["'Make a sandwich' fails if you don't say 'open the bread bag first'", "A robot told to 'turn' but not how far spins the wrong amount", "'Go to the door' means nothing to a robot - it needs 'forward 3 squares, turn left'"],
    },
    {
      id: "w3-c2",
      title: "A program is a sequence of commands",
      body: [
        "A program is a list of commands the robot runs one after another, from top to bottom. Each command is one small instruction, like 'move forward' or 'turn right'. Running them in order is called a sequence.",
        "Order matters. 'Turn right, then move forward' sends the robot somewhere completely different from 'move forward, then turn right', even though the commands are the same.",
      ],
      examples: ["move forward 2 squares -> turn right -> move forward 1 square", "Swapping two commands changes where the robot ends up"],
    },
    {
      id: "w3-c3",
      title: "Events start a program",
      body: [
        "A program doesn't run until something starts it. That starting moment is called an event - like pressing a 'Start' button, tapping a 'when tapped' block, or clicking Run in the simulator.",
        "This week every program has one event at the top that kicks off the sequence, and then the commands run straight through in order.",
      ],
      examples: ["'When Start is pressed' at the top of the program", "Clicking Run in the simulator", "Tapping the go button on the kit app"],
    },
    {
      id: "w3-c4",
      title: "Algorithms and pseudocode: plan before you code",
      body: [
        "An algorithm is a clear step-by-step plan for a task, with every step spelled out and nothing left fuzzy. Before writing real code, engineers write the plan in plain language first - that plain-language plan is called pseudocode.",
        "Pseudocode lets you think through the path without fighting the blocks yet. You might write 'forward 3, turn left, forward 2, stop', check that it makes sense, and only then build it as commands.",
      ],
      examples: ["Pseudocode: 'forward 3 squares, turn left 90, forward 2 squares, stop'", "An algorithm has no missing steps and no 'you know what I mean' gaps"],
    },
    {
      id: "w3-c5",
      title: "Controlling distance with timing, speed, and turns",
      body: [
        "This week you steer the robot with three tools: how far it moves (distance), how long a move runs (timing), and how much it rotates (turns). On many kits, distance comes from timing and speed together - a faster speed for a longer time covers more ground.",
        "Turns rotate the robot in place, usually by degrees. A 90-degree turn is a quarter turn - a right angle - which lines the robot up with the next part of the path. Getting the turn amount right is what keeps the robot on course.",
      ],
      examples: ["forward at speed 50 for 2 seconds", "turn right 90 degrees to face the next hallway", "half turn = 180 degrees to go back the way you came"],
    },
    {
      id: "w3-c6",
      title: "Predict before you run",
      body: [
        "Before running a program, make a prediction: trace the sequence with your finger and mark where you think the robot will stop and which way it will face. Committing to a guess first makes it obvious when a step is wrong.",
        "Then run it and compare. If the robot ends up somewhere else, the difference tells you exactly which command to fix - maybe a turn was 90 when it needed 180, or a forward was one square too short.",
      ],
      examples: ["Predict: 'ends on the star, facing up'", "If it stops one square early, a distance command is too small"],
    },
  ],
  materials: [
    { id: "w3-m1", name: "Path or maze map with a start, a goal, and grid squares (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w3-m2", name: "Pseudocode planning sheet (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w3-m3", name: "Predict-and-test record sheet (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w3-m4", name: "Pencil and paper", paths: ["kit", "simulator", "unplugged"] },
    { id: "w3-m5", name: "The rolling robot base you built in Week 2, with its app or software", paths: ["kit"] },
    { id: "w3-m6", name: "Masking tape and a small object to deliver (a bottle cap or block)", paths: ["kit"], note: "Tape marks the path and goal on the floor." },
    { id: "w3-m7", name: "Computer or tablet with the browser simulator", paths: ["simulator"] },
    { id: "w3-m8", name: "Arrow/command cards (forward, back, turn left, turn right, wait, stop)", paths: ["unplugged"] },
    { id: "w3-m9", name: "Floor grid made from tape, or a printed grid to walk a token across", paths: ["unplugged"] },
  ],
  activities: [
    {
      id: "w3-a-delivery-maze",
      kind: "program",
      title: "Delivery path programming challenge",
      goal: "Program the robot to follow a path or maze from start to goal using only a sequence of exact move and turn commands.",
      shared: [
        "Look at the map and find the start, the goal, and the walls or turns along the path. Trace the route with your finger first.",
        "Write the plan as pseudocode in plain language - forwards, turns, and distances in order - before you build anything. Keep it a straight sequence: no loops, no if-checks, no sensors this week.",
        "Turn the pseudocode into commands, run it, and fix the exact command that was wrong if the robot misses the goal.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Drive the delivery path with your kit robot",
          materials: ["w3-m5", "w3-m6", "w3-m1", "w3-m2"],
          instructions: [
            "Tape a path on the floor with a start square, a goal square, and one or two turns. Put the small object at the start as the delivery.",
            "Trace the route and write pseudocode: for example 'forward 40 cm, turn right 90, forward 20 cm, stop'.",
            "Measure or time one forward move to learn how far the robot goes, then fill in real distances or times.",
            "Build the sequence of commands in the app, press Start (the event), and watch the robot follow the path.",
            "If it misses the goal, change only the command that was off - a turn amount or a forward distance - and run again.",
          ],
          safetyNotes: ["Keep fingers, hair, and loose clothing away from the wheels while the robot drives.", "Clear the path area so the robot won't run into feet or table legs."],
          expectedResult: "The robot follows the sequence from start to goal and stops on the goal square with the delivery.",
          successCriteria: ["Pseudocode was written before coding", "Program is a straight sequence of move/turn commands", "The robot reaches the goal and stops there"],
          troubleshooting: [
            { problem: "The robot overshoots or stops short of the goal", fix: "Adjust the distance or the timing on that forward command; a small change in seconds moves it a lot." },
            { problem: "The robot turns too far or not far enough", fix: "Check the turn's degrees - try 90 for a quarter turn - and confirm left vs right." },
          ],
          extension: "Add a second delivery: extend the sequence so the robot goes on to a second goal square after the first.",
        },
        simulator: {
          pathId: "simulator",
          title: "Block-program the maze on a grid",
          materials: ["w3-m7", "w3-m1", "w3-m2"],
          instructions: [
            "Open the maze mission in the simulator and find the start tile and the goal tile.",
            "Trace the route through the open squares and write pseudocode in grid steps, like 'forward 3, turn left, forward 2, stop'.",
            "Drag movement blocks into a sequence under the 'when Start' event block - move and turn blocks only.",
            "Run the program and watch the robot step through the grid one command at a time.",
            "If it hits a wall or misses the goal, fix the exact block that was wrong and run it again.",
          ],
          safetyNotes: ["No physical safety concerns; take a short screen break if your eyes get tired."],
          expectedResult: "The simulator robot follows the block sequence through the maze and lands on the goal tile.",
          successCriteria: ["Pseudocode was written before building blocks", "Only sequence blocks were used (no loops, ifs, or sensors)", "The robot reaches the goal tile"],
          troubleshooting: [
            { problem: "The robot drives into a wall", fix: "Count the open squares again; a forward block is probably one square too many." },
            { problem: "The robot faces the wrong way after a turn", fix: "Swap turn-left for turn-right, or check how many squares come before the turn." },
          ],
          extension: "Redo the maze with the fewest blocks possible by combining moves into longer forward steps.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Write a card program a partner follows literally",
          materials: ["w3-m8", "w3-m9", "w3-m1", "w3-m2"],
          instructions: [
            "Lay out a floor grid or use the printed grid with a start and a goal. One person is the 'robot', the other is the 'programmer'.",
            "The programmer traces the route and writes pseudocode, then lays out arrow/command cards in a sequence.",
            "The 'robot' follows the cards exactly and literally - one square per forward card, a quarter turn per turn card - doing only what each card says, nothing more.",
            "Say 'Start' (the event) and run the cards top to bottom without helping the robot.",
            "If the robot misses the goal, find the one card that was wrong and swap it, then run again.",
          ],
          safetyNotes: ["Walk slowly on the floor grid and keep the path clear of chairs and bags."],
          expectedResult: "The 'robot' walks the card sequence and lands on the goal square, doing only what the cards say.",
          successCriteria: ["Pseudocode was written before laying cards", "The card program is a straight sequence", "Following the cards literally reaches the goal"],
          troubleshooting: [
            { problem: "The robot 'cheats' by fixing steps on the way", fix: "Remind them to follow cards literally - the point is to find the bug in the instructions, not to hide it." },
            { problem: "The robot ends up facing the wrong way", fix: "A turn card is on the wrong side or missing; check left vs right." },
          ],
          extension: "Trade card programs with another pair and run each other's without seeing the map first.",
        },
      },
    },
    {
      id: "w3-a-predict-run",
      kind: "predict",
      title: "Predict-then-test the ending",
      goal: "Predict where the robot will stop and which way it will face before running a given sequence, then run it and compare.",
      shared: [
        "Take a short sequence of commands and trace it by hand on the map. Mark on paper where you think the robot ends and which way it faces.",
        "Commit to your prediction before running anything - write it down first.",
        "Run the program, compare the real ending to your prediction, and explain any difference by naming the command that caused it.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Predict your kit robot's stopping spot",
          materials: ["w3-m5", "w3-m1", "w3-m3"],
          instructions: [
            "Take a 4-to-6 command sequence (yours or a given one) and trace it on the taped path.",
            "On the record sheet, mark the square you predict the robot stops on and the direction it faces.",
            "Run the sequence and mark where the robot actually stops.",
            "Compare: if it differs, point to the command (a turn or a distance) that explains the gap.",
          ],
          safetyNotes: ["Stay clear of the wheels while the robot runs its prediction test."],
          expectedResult: "A written prediction next to the real stopping spot, with a reason for any difference.",
          successCriteria: ["Prediction was written before running", "Real ending was recorded", "Any difference is explained by a named command"],
          troubleshooting: [{ problem: "Prediction and result are far apart every time", fix: "Re-measure how far one forward command really moves the robot; your distance estimate is off." }],
          extension: "Predict the ending for a sequence with three turns in it.",
        },
        simulator: {
          pathId: "simulator",
          title: "Predict the robot's ending tile",
          materials: ["w3-m7", "w3-m3"],
          instructions: [
            "Look at a given block sequence in the simulator without running it.",
            "On the record sheet, write which grid tile you predict the robot lands on and which way it faces.",
            "Run the program and read the real ending tile.",
            "Compare and name the block responsible for any difference.",
          ],
          safetyNotes: ["No physical safety concerns."],
          expectedResult: "A predicted tile written before running, next to the actual tile, with a reason for any gap.",
          successCriteria: ["Prediction was written before running", "Actual ending tile recorded", "Any difference tied to a specific block"],
          troubleshooting: [{ problem: "Lost track while tracing the sequence", fix: "Trace one command at a time with your finger and mark each square as you go." }],
          extension: "Predict how many total squares the robot travels, then count them during the run.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Predict where the card-robot lands",
          materials: ["w3-m8", "w3-m9", "w3-m3"],
          instructions: [
            "The programmer lays out a card sequence but does not run it yet.",
            "Everyone writes a prediction: which square the 'robot' will end on and which way it faces.",
            "Run the cards, having the 'robot' walk them literally.",
            "Compare predictions to the real ending and discuss which card caused any surprise.",
          ],
          safetyNotes: ["Keep the floor grid clear so the walker can move safely."],
          expectedResult: "Written predictions next to the real ending square, with a card named for any difference.",
          successCriteria: ["Prediction was written before walking the cards", "Real ending recorded", "Difference tied to a specific card"],
          troubleshooting: [{ problem: "Everyone predicts differently", fix: "Trace the cards together one at a time - a shared trace shows where predictions split." }],
          extension: "Hide one card face-down and predict how the ending changes when it is revealed and added.",
        },
      },
    },
  ],
  predictionPrompts: [
    { id: "w3-p1", prompt: "Before running your delivery program, which square do you predict the robot stops on, and which way will it be facing?", howToCheck: "Run the sequence and mark the real stopping square and direction, then compare to your prediction on the record sheet." },
    { id: "w3-p2", prompt: "How many commands (steps) do you think your program needs to reach the goal?", howToCheck: "Count the commands in your finished, working sequence and compare to your guess." },
  ],
  testRecords: [
    {
      id: "w3-tr1",
      title: "Predict-vs-actual ending record",
      instructions: "For each attempt, write your predicted ending square before running, then run the sequence and record where the robot actually ended. Note which command you changed for the next attempt.",
      columns: ["Attempt", "Predicted end square", "Actual end square", "Command changed for next try"],
      rows: 3,
      measure: "The predicted end position versus the actual end position across attempts",
    },
  ],
  debuggingMissions: [],
  knowledgeCheck: {
    id: "w3-kc",
    instructions: "Answer these to check that you understand sequences, algorithms, pseudocode, and controlling the robot's path.",
    passThreshold: 4,
    questions: [
      {
        id: "w3-q6",
        kind: "ordering",
        prompt: "Put these steps in the right order for programming the robot to do a task.",
        items: [
          { id: "w3-q6-i1", text: "Plan the steps as an algorithm" },
          { id: "w3-q6-i2", text: "Write the steps as exact commands" },
          { id: "w3-q6-i3", text: "Run the program on the robot" },
          { id: "w3-q6-i4", text: "Check whether it did what you expected" },
        ],
        correctOrder: ["w3-q6-i1", "w3-q6-i2", "w3-q6-i3", "w3-q6-i4"],
        explanation: "You plan the algorithm first, turn it into exact commands, run it, then check the result - the same loop programmers use.",
      },
      {
        id: "w3-q7",
        kind: "trace",
        prompt: "The robot starts facing up. Trace this program. Which way is it facing at the end?",
        program: ["turn right", "turn right", "turn left"],
        options: [
          { id: "w3-q7-a", text: "Facing up", correct: false, feedback: "Two rights then one left is one net right turn, not back to the start." },
          { id: "w3-q7-b", text: "Facing right", correct: true, feedback: "Right - two rights then a left leave it one turn clockwise, facing right." },
          { id: "w3-q7-c", text: "Facing down", correct: false, feedback: "Down would need two net right turns; this program makes only one." },
          { id: "w3-q7-d", text: "Facing left", correct: false, feedback: "Left would need a net left turn; here the rights win by one." },
        ],
        correctOptionId: "w3-q7-b",
        explanation: "Right, right, left equals one net right turn. Starting from up, one right turn faces the robot right.",
      },
      {
        id: "w3-q1",
        kind: "single",
        prompt: "Your robot did the wrong thing even though it ran your whole program. What most likely happened?",
        options: [
          { id: "w3-q1-a", text: "The robot decided to be creative", correct: false, feedback: "Robots don't improvise - they follow the program literally." },
          { id: "w3-q1-b", text: "It followed your instructions exactly, but your instructions weren't what you wanted", correct: true, feedback: "Right - computers follow commands literally, so a wrong result usually means a wrong instruction." },
          { id: "w3-q1-c", text: "The robot ignored the program", correct: false, feedback: "It ran the program; the program itself had the mistake." },
          { id: "w3-q1-d", text: "Programs never work the first time on purpose", correct: false, feedback: "Programs can work first try; when they don't, it's a fixable instruction problem." },
        ],
        correctOptionId: "w3-q1-b",
        explanation: "Computers follow instructions literally and exactly. A wrong result almost always means the instructions didn't say what you meant.",
      },
      {
        id: "w3-q2",
        kind: "single",
        prompt: "What is a sequence?",
        options: [
          { id: "w3-q2-a", text: "Commands that run one after another, in order", correct: true, feedback: "Correct - a sequence runs commands top to bottom, and the order matters." },
          { id: "w3-q2-b", text: "A command that repeats forever", correct: false, feedback: "That's a loop, which comes later in the course." },
          { id: "w3-q2-c", text: "A command that decides based on a sensor", correct: false, feedback: "That's a condition; this week has no sensors or conditions." },
          { id: "w3-q2-d", text: "All the commands running at the exact same time", correct: false, feedback: "In a sequence, commands run one at a time in order, not all at once." },
        ],
        correctOptionId: "w3-q2-a",
        explanation: "A sequence is commands carried out one after another, in order - swapping two commands can change the whole result.",
      },
      {
        id: "w3-q3",
        kind: "single",
        prompt: "What is pseudocode?",
        options: [
          { id: "w3-q3-a", text: "A secret code only computers can read", correct: false, feedback: "It's the opposite - pseudocode is meant for people to read easily." },
          { id: "w3-q3-b", text: "The plan for a program written in plain language before you code it", correct: true, feedback: "Right - pseudocode writes the steps in plain language so you can plan before building." },
          { id: "w3-q3-c", text: "A broken program with bugs", correct: false, feedback: "Pseudocode is a planning tool, not a broken program." },
          { id: "w3-q3-d", text: "The event that starts a program", correct: false, feedback: "That's an event; pseudocode is the written plan of steps." },
        ],
        correctOptionId: "w3-q3-b",
        explanation: "Pseudocode is writing your algorithm's steps in plain language first, so you can plan the path before turning it into real commands.",
      },
      {
        id: "w3-q4",
        kind: "single",
        prompt: "Your robot reaches the right spot but is facing the wrong way. Which command should you check?",
        options: [
          { id: "w3-q4-a", text: "A forward-distance command", correct: false, feedback: "Distance affects where it stops, not which way it faces." },
          { id: "w3-q4-b", text: "The Start event", correct: false, feedback: "The event just starts the program; it doesn't set direction." },
          { id: "w3-q4-c", text: "A turn command - the degrees or the direction", correct: true, feedback: "Correct - turns set which way the robot faces, so check the turn's amount or left/right." },
          { id: "w3-q4-d", text: "The stop command", correct: false, feedback: "Stop just ends the run; it doesn't rotate the robot." },
        ],
        correctOptionId: "w3-q4-c",
        explanation: "Turns control the robot's facing. A wrong-way ending points to a turn with the wrong degrees or the wrong direction.",
      },
      {
        id: "w3-q5",
        kind: "single",
        prompt: "On a kit that uses timing, how could you make the robot travel farther in one forward command?",
        options: [
          { id: "w3-q5-a", text: "Run the motors for a longer time (or at a higher speed)", correct: true, feedback: "Right - more time, or more speed, covers more distance." },
          { id: "w3-q5-b", text: "Add a turn command", correct: false, feedback: "A turn rotates the robot; it doesn't add forward distance." },
          { id: "w3-q5-c", text: "Change the Start event", correct: false, feedback: "The event only starts the program; it doesn't set distance." },
          { id: "w3-q5-d", text: "Write the command in a different color", correct: false, feedback: "Color has no effect on how the robot moves." },
        ],
        correctOptionId: "w3-q5-a",
        explanation: "Distance comes from timing and speed: running longer, or faster, moves the robot farther in one forward command.",
      },
    ],
  },
  reflection: [
    { id: "w3-r1", prompt: "Which instruction caused the largest error, and how did you make it more precise?" },
    { id: "w3-r2", prompt: "How did writing pseudocode first help you before you built the real commands?" },
    { id: "w3-r3", prompt: "When your prediction didn't match what the robot did, how did you find which command to fix?" },
  ],
  journalPrompts: [
    { id: "w3-j1", prompt: "Write the pseudocode for your delivery path in plain language, one step per line.", captures: "text" },
    { id: "w3-j2", prompt: "Sketch your path map and mark your predicted stopping square before running.", captures: "sketch" },
    { id: "w3-j3", prompt: "How many commands did your final working program need?", captures: "number" },
  ],
  savedPrograms: [
    {
      id: "w3-prog-delivery",
      missionId: "w3-sim-delivery",
      title: "Delivery path sequence",
      description: "A straight sequence of move and turn commands that drives the robot from the start to the goal square. Sequence only - no loops, conditions, or sensors.",
      expectedBlocks: ["move-forward", "turn-left", "turn-right", "move-backward", "wait", "stop"],
    },
    {
      id: "w3-prog-maze",
      missionId: "w3-sim-maze",
      title: "Maze sequence challenge",
      description: "Plan an ordered sequence of move and turn commands that steers the robot around the wall to the goal, then stops. Predict the ending before you run it. Sequence only - no loops, conditions, or sensors.",
      expectedBlocks: ["move-forward", "turn-left", "turn-right", "wait", "stop"],
    },
  ],
  simulatorMissions: [
    {
      id: "w3-sim-delivery",
      title: "Deliver to the goal square",
      objective: "Program a sequence of move and turn blocks to carry the robot from the start tile to the goal tile.",
      grid: { cols: 6, rows: 6 },
      successCriteria: ["The robot reaches the goal tile", "Only sequence blocks are used (no loops, ifs, or sensors)", "The robot stops on the goal"],
    },
    {
      id: "w3-sim-maze",
      title: "Sequence through the maze",
      objective: "Steer the robot through a maze of walls to the goal using only an ordered sequence of movement commands.",
      grid: { cols: 8, rows: 8 },
      successCriteria: ["The robot avoids every wall", "The robot reaches the goal tile", "The program is a straight sequence"],
    },
  ],
  lessonFlow: [
    { id: "w3-f1", kind: "learn", title: "Exact instructions, sequences, and events", focus: "Computers follow commands literally; a program is an ordered sequence started by an event.", minutes: 12 },
    { id: "w3-f2", kind: "learn", title: "Algorithms, pseudocode, and controlling the path", focus: "Plan an algorithm as pseudocode; control distance with timing, speed, and turns.", minutes: 10 },
    { id: "w3-f3", kind: "program", title: "Delivery and maze programming challenges", focus: "Plan pseudocode, then program a sequence to reach the goal - first the delivery path, then the maze around a wall.", activityId: "w3-a-delivery-maze", minutes: 22 },
    { id: "w3-f4", kind: "predict", title: "Predict-then-test the ending", focus: "Predict the stopping square and facing before running, then compare.", activityId: "w3-a-predict-run", minutes: 12 },
    { id: "w3-f5", kind: "test", title: "Record predicted vs actual", focus: "Fill in the predict-vs-actual record across attempts.", minutes: 6 },
    { id: "w3-f6", kind: "knowledge-check", title: "Knowledge check", focus: "Five questions on sequences, algorithms, pseudocode, and turns.", minutes: 8 },
    { id: "w3-f7", kind: "reflection", title: "Reflection", focus: "Write about literal instructions, pseudocode, and finding the wrong command.", minutes: 5 },
  ],
  safetyNotes: [
    { id: "w3-s1", text: "Keep fingers, hair, and loose clothing away from the wheels while the robot drives its program.", severity: "caution", paths: ["kit"] },
    { id: "w3-s2", text: "Clear the floor path of feet, bags, and chair legs before running so the robot has a safe route.", severity: "caution", paths: ["kit", "unplugged"] },
    { id: "w3-s3", text: "Walk slowly on the floor grid when acting as the robot so no one trips.", severity: "info", paths: ["unplugged"] },
    { id: "w3-s4", text: "Take a short screen break if your eyes get tired using the simulator.", severity: "info", paths: ["simulator"] },
  ],
  printableResources: [
    { id: "w3-pr1", kind: "worksheet", title: "Path & maze map", description: "A gridded map with a start, a goal, and walls for planning a delivery route." },
    { id: "w3-pr2", kind: "worksheet", title: "Pseudocode planning sheet", description: "Lined space to write an algorithm as plain-language steps before coding." },
    { id: "w3-pr3", kind: "worksheet", title: "Predict-and-test record", description: "A table to record predicted vs actual ending squares across attempts." },
    { id: "w3-pr4", kind: "teacher-guide", title: "Week 3 teacher guide", description: "Setup, facilitation, misconceptions, and questions for the exact-instructions lesson." },
  ],
  completion: {
    summary: "Finish Week 3 by writing pseudocode for a path, programming a sequence that reaches the goal, predicting and recording an ending, and passing the knowledge check.",
    requirements: [
      { id: "w3-cr1", label: "Write pseudocode for your delivery path before coding", sectionKind: "learn" },
      { id: "w3-cr2", label: "Program a sequence that reaches the goal", sectionKind: "program" },
      { id: "w3-cr3", label: "Predict an ending and record predicted vs actual", sectionKind: "predict" },
      { id: "w3-cr4", label: "Score at least 4 of 5 on the knowledge check", sectionKind: "knowledge-check" },
      { id: "w3-cr5", label: "Write your reflection", sectionKind: "reflection" },
    ],
  },
  teacherGuidance: {
    setup: [
      "Print the path/maze map, the pseudocode planning sheet, and the predict-and-test record for each student or pair.",
      "For kits, tape a simple path with one or two turns on the floor and set out a small delivery object; for the simulator, open the delivery mission on each device.",
      "For unplugged, lay out a tape floor grid or hand out printed grids and arrow/command cards.",
    ],
    prep: [
      "Run one path yourself to learn roughly how far one forward command moves the kit robot and how far a 90-degree turn rotates it.",
      "Prepare one short 'buggy' sequence you can run so students see a robot follow wrong instructions literally.",
      "Have the Week 2 rolling bases charged and ready.",
    ],
    facilitation: [
      "Open with the literal-instructions idea: give a deliberately vague instruction and have a student follow it exactly to show what goes wrong.",
      "Teach sequence, event, algorithm, and pseudocode before any coding; insist pseudocode is written before commands.",
      "Run the delivery challenge, then the predict-then-test activity - always predicting before running.",
      "Have students record predicted vs actual, then close with the knowledge check and reflection.",
    ],
    commonMisconceptions: [
      "'The robot did what I meant' - it does what you said, literally, not what you intended.",
      "Order doesn't matter - swapping a turn and a forward sends the robot somewhere completely different.",
      "'Turn' and 'move' are the same kind of command - a turn changes facing, a move changes position.",
      "Skipping the pseudocode plan and building blocks by trial and error.",
    ],
    questionsToAsk: [
      "What exactly did you tell the robot to do at this step?",
      "Where do you predict it will stop, and which way will it face?",
      "The robot missed the goal - which single command explains that?",
      "Would your program still work if two commands were swapped?",
    ],
    easierVersion: "Use a short, straight path with a single turn, and give students a pseudocode template to fill in rather than write from scratch.",
    harderVersion: "Add a longer maze with several turns and challenge students to reach the goal using the fewest commands.",
  },
  nextWeek: {
    moduleId: "week-4",
    teaser: "Next week the robot gets senses - we add a sensor so it can notice the world instead of just running a fixed sequence.",
    prepare: [
      "Keep your best delivery pseudocode; you'll compare a fixed sequence to a robot that reacts.",
      "Charge your kit or bookmark the simulator, and find your sensor parts if you're on the kit path.",
      "Think about a time a fixed set of steps failed because something in the way changed.",
    ],
  },
}

/* ========================================================================== */
/* WEEK 4                                                                      */
/* ========================================================================== */

export const roboticsWeek4: RoboticsModule = {
  id: "week-4",
  slug: "helping-robots-sense",
  week: 4,
  order: 4,
  title: "Helping Robots Sense",
  subtitle: "Read real sensor values, find thresholds, and calibrate a robot to trust what it senses.",
  summary:
    "Now that the robot moves and follows instructions, students give it senses. They meet touch, distance, light, and color sensors and learn that a sensor reading is a number the robot can measure. They discover that a threshold is a cutoff that turns numbers into 'near or far' and 'light or dark', that every sensor has detection limits, and that readings wobble a little (noise), so you take several and calibrate them for this room and this robot. After reading and calibrating, they program one sensor-based stop - the robot drives and uses its distance sensor to halt right before a wall - so a threshold finally controls a real action. Fuller automatic behavior with loops and conditions across a whole mission comes next week.",
  mainMission:
    "Read a sensor across changing conditions, find a threshold, and calibrate it so the readings are reliable in this room.",
  estimatedTime: "70-85 minutes",
  learningGoals: [
    { id: "w4-g1", text: "Name the touch, distance, light, and color sensors and what each one measures" },
    { id: "w4-g2", text: "Read a sensor value and explain that a reading is a number, not a yes/no" },
    { id: "w4-g3", text: "Find a threshold that separates near from far or light from dark" },
    { id: "w4-g4", text: "Explain detection limits, noise, and why you take several readings" },
    { id: "w4-g5", text: "Calibrate a sensor so its readings are reliable for this room and robot" },
  ],
  vocabulary: [
    { term: "Touch sensor", definition: "A sensor that tells whether it is being pressed or not, like a button or a bumper." },
    { term: "Distance sensor", definition: "A sensor that measures how far away the nearest object is, usually in centimeters." },
    { term: "Light sensor", definition: "A sensor that measures how bright or dark it is, giving a higher number in bright light." },
    { term: "Color sensor", definition: "A sensor that reads the color of a surface right in front of it, like red, blue, or white." },
    { term: "Sensor reading", definition: "The number a sensor gives you at one moment, such as 20 centimeters or a brightness of 47." },
    { term: "Threshold", definition: "A cutoff number you pick that separates two cases, like 'closer than 15 cm means near'." },
    { term: "Detection limit", definition: "The point past which a sensor can no longer sense, like a distance sensor that can't read farther than about 2 meters." },
    { term: "Calibration", definition: "Adjusting or checking a sensor so its readings are correct for this room and this robot." },
    { term: "Noise", definition: "Small wobbles in a reading even when nothing changes, which is why you take several readings." },
    { term: "Reliability", definition: "How much you can trust a sensor to give the same, correct reading each time." },
    { term: "Trial", definition: "One single measurement in a test; you usually run several trials and compare them." },
    { term: "Baseline", definition: "A starting reading you take in a known, steady condition to compare other readings against." },
  ],
  prerequisites: [
    { moduleId: "week-2", reason: "The sensors mount on the moving base built in Week 2, so the robot can be tested in different spots." },
    { moduleId: "week-3", reason: "Reading and reporting a sensor value is a planned sequence of exact instructions, taught in Week 3." },
  ],
  concepts: [
    {
      id: "w4-c1",
      title: "Four senses a robot can have",
      body: [
        "A robot senses the world through sensors. Four common ones are the touch sensor (is it being pressed?), the distance sensor (how far is the nearest thing?), the light sensor (how bright is it?), and the color sensor (what color is the surface?).",
        "Each sensor measures just one kind of thing. A distance sensor can't tell color, and a color sensor can't tell distance. Choosing the right sensor for a job is part of robotics.",
      ],
      examples: ["Touch: a doorbell button", "Distance: a car's parking beeper", "Light: a phone screen that dims in the dark", "Color: a machine that sorts recycling by color"],
    },
    {
      id: "w4-c2",
      title: "A reading is a number, not a yes or no",
      body: [
        "Most sensors don't just say 'yes' or 'no' - they give a number called a sensor reading. A distance sensor might read 12 centimeters; a light sensor might read a brightness of 47.",
        "Because it's a number, the reading changes smoothly as the world changes. As you move a wall closer, the distance number gets smaller. As a room gets brighter, the light number gets bigger.",
      ],
      examples: ["Distance sensor: 12 cm, 30 cm, 85 cm", "Light sensor: 10 (dark) up to 90 (bright)", "Touch sensor is the exception: it usually reads pressed or not pressed"],
    },
    {
      id: "w4-c3",
      title: "A threshold turns numbers into decisions",
      body: [
        "A threshold is a cutoff number you choose to separate two cases. If you pick 15 centimeters, then any reading below 15 means 'near' and any reading above 15 means 'far'.",
        "The robot can't pick your threshold for you - you find it by watching the readings and choosing a value that cleanly splits the cases you care about. This week you only find and write down thresholds; next week the robot will use them to react.",
      ],
      examples: ["Near/far cutoff at 15 cm", "Light/dark cutoff at a brightness of 40", "Line-follower cutoff between the black line and the white floor"],
    },
    {
      id: "w4-c4",
      title: "Detection limits: every sensor has a range",
      body: [
        "No sensor can sense everything. A distance sensor stops working past a certain range - it might read fine up to about 2 meters but give junk beyond that. That farthest point it can still sense is its detection limit.",
        "Sensors also have a closest limit: hold a wall too near a distance sensor and the reading gets strange. Knowing the limits tells you where you can trust the sensor and where you can't.",
      ],
      examples: ["A distance sensor that can't read past ~2 m", "A color sensor that needs the surface close, almost touching", "A light sensor confused by a very bright window"],
    },
    {
      id: "w4-c5",
      title: "Noise: why one reading isn't enough",
      body: [
        "Point a distance sensor at a wall that isn't moving and read it several times. You might get 30, 31, 30, 29, 31 - the number wobbles a little even though nothing changed. That wobble is called noise.",
        "Because of noise, one reading can fool you. Scientists and roboticists take several readings and use the middle or average, which is much more reliable than a single number.",
      ],
      examples: ["Readings of 30, 31, 30, 29, 31 from a still wall", "A light sensor that flickers as a cloud passes", "Taking 3 to 5 readings and comparing them"],
    },
    {
      id: "w4-c6",
      title: "Calibration and reliability",
      body: [
        "Calibration means checking or adjusting a sensor so its readings are correct for this room and this robot. A light sensor reads differently in a sunny room than a dark one, so the same threshold won't work everywhere - you calibrate it to the room you're in.",
        "A sensor you have calibrated and tested is reliable: you can trust it to give the same, correct answer. Reliability is the whole point - a robot that senses wrong will act wrong.",
      ],
      examples: ["Taking a 'dark' and a 'light' reading to set the middle as your threshold", "Re-checking the distance threshold after moving to a new room", "Confirming the color sensor tells red from blue on your actual surfaces"],
    },
  ],
  materials: [
    { id: "w4-m1", name: "Sensor Reading Log worksheet (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w4-m2", name: "Tape measure or ruler for setting known distances", paths: ["kit", "simulator", "unplugged"] },
    { id: "w4-m3", name: "Pencil and paper for recording readings", paths: ["kit", "simulator", "unplugged"] },
    { id: "w4-m4", name: "A programmable robot with a touch, distance, light, or color sensor", paths: ["kit"] },
    { id: "w4-m5", name: "A wall, book, or box to place at measured distances", paths: ["kit"] },
    { id: "w4-m6", name: "A flashlight and colored cards for light and color tests", paths: ["kit"], optional: true },
    { id: "w4-m7", name: "Computer or tablet with the browser simulator", paths: ["simulator"] },
    { id: "w4-m8", name: "A blindfold or scarf for the human-sensor activity", paths: ["unplugged"] },
    { id: "w4-m9", name: "Cards in light and dark shades (or gray-scale strips) to sort", paths: ["unplugged"] },
  ],
  activities: [
    {
      id: "w4-a-sensor-lab",
      interactive: "sensor-lab",
      kind: "explore",
      title: "Sensor Investigation Lab",
      goal: "Measure how a sensor's reading changes as a condition changes, and find a threshold that cleanly splits two cases.",
      shared: [
        "Pick one condition to change step by step - the distance to a wall, the brightness, or the surface color - and read the sensor at each step.",
        "Write every reading in the log. Then look at the numbers and choose a threshold: a cutoff value that separates 'near from far' or 'light from dark'.",
        "Remember: this week the robot only reads and reports. You are the one who decides what the numbers mean.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Read a real sensor at measured conditions",
          materials: ["A programmable robot with a sensor", "Tape measure or ruler", "A wall or box", "Sensor Reading Log worksheet"],
          instructions: [
            "Attach the sensor and load a short program that reads the sensor and shows or reports the value (read-sensor, then wait, then stop).",
            "For a distance sensor: place a wall at 10 cm, 20 cm, 40 cm, and 80 cm and record the reading at each. For a light sensor: read the value under a bright light, in normal room light, and covered by your hand.",
            "Look at your numbers and pick a threshold - for example a distance below which you'd call something 'near', or a brightness below which you'd call it 'dark'.",
            "Write your threshold on the log and one sentence saying why you chose that number.",
          ],
          safetyNotes: ["Keep the robot on the table or floor so it doesn't fall while you read the display."],
          expectedResult: "A table of readings that clearly get smaller as the wall gets closer (or larger as it gets brighter), and a chosen threshold that splits near from far.",
          successCriteria: ["At least four readings recorded across different conditions", "The readings change in a sensible direction", "A threshold value is chosen and justified in one sentence"],
          troubleshooting: [
            { problem: "The reading jumps around and won't settle", fix: "That is noise - take three readings at each distance and use the middle one." },
            { problem: "The distance reading is stuck at a big number no matter what", fix: "You may be past the sensor's detection limit or aimed at nothing; point it straight at a flat wall within about 1 meter." },
          ],
          extension: "Move to a different room, re-read your conditions, and check whether your threshold still works or needs re-calibrating.",
        },
        simulator: {
          pathId: "simulator",
          title: "Read the simulator's sensor as conditions change",
          materials: ["Browser simulator", "Sensor Reading Log worksheet"],
          instructions: [
            "Open the simulator and drive the robot so a wall (or a colored/bright tile) is at different distances or brightness levels.",
            "At each setting, read the on-screen sensor read-out (read-sensor, wait, stop) and record the number in the log.",
            "Study the numbers and choose a threshold that separates near from far, or light from dark.",
            "Write the threshold and one sentence explaining your choice.",
          ],
          safetyNotes: ["No physical safety concerns; take a screen break if your eyes get tired."],
          expectedResult: "A recorded table where the sim sensor value changes smoothly with the condition, and a sensible chosen threshold.",
          successCriteria: ["At least four readings recorded across different conditions", "The readings change in a sensible direction", "A threshold value is chosen and justified in one sentence"],
          troubleshooting: [
            { problem: "The sim reading changes by a little each time even when the robot is still", fix: "That is simulated noise on purpose - take a few readings and use the middle value." },
            { problem: "Not sure which number on screen is the sensor", fix: "Match the read-out that changes when you move the wall closer - that is the distance value." },
          ],
          extension: "Turn the simulated noise up (or add a second wall) and see whether your threshold still separates the cases.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Be a human sensor and produce readings",
          materials: ["Blindfold or scarf", "Light and dark cards", "Sensor Reading Log worksheet"],
          instructions: [
            "For a touch/distance test: one student is blindfolded and reaches out slowly while a partner holds a card as a 'wall'. The blindfolded 'sensor' says a number from 1 (far, can't feel it) to 5 (touching it) as the wall is moved closer step by step.",
            "For a light test: sort a stack of cards from darkest to lightest and give each a brightness number from 1 (darkest) to 5 (lightest).",
            "Record every 'reading' in the log just like a real sensor would report a number.",
            "Choose a threshold: which number and above counts as 'near' or 'light'? Write it down with a reason.",
          ],
          safetyNotes: ["Clear the floor and guide the blindfolded student so no one trips or bumps into anything."],
          expectedResult: "A log of human 'sensor readings' that rise as the wall gets closer or the card gets lighter, plus a chosen threshold.",
          successCriteria: ["At least four readings recorded across different conditions", "The readings change in a sensible direction", "A threshold value is chosen and justified in one sentence"],
          troubleshooting: [
            { problem: "Two students give different numbers for the same card", fix: "That is like noise between sensors - agree on a shared scale and re-read, which is a kind of calibration." },
            { problem: "Everything gets the same number", fix: "Spread the conditions further apart (a much closer wall, a much darker card) so the readings clearly differ." },
          ],
          extension: "Swap 'sensors' and see if a different person gives the same readings - discuss why calibration matters.",
        },
      },
    },
    {
      id: "w4-a-calibrate-challenge",
      kind: "test",
      title: "Calibration & Threshold Challenge",
      goal: "Handle noise by taking several readings, then calibrate a light-or-dark (or near-or-far) threshold that works reliably in this room.",
      shared: [
        "Pick a steady condition and take several readings of the same thing without changing anything - notice how much the number wobbles. That wobble is noise.",
        "Take a reading in a clearly 'low' condition and a clearly 'high' condition (dark vs light, or near vs far). Set your threshold in the middle so it cleanly separates the two.",
        "Test your threshold: check that low-condition readings land on one side and high-condition readings on the other. If not, adjust it - that is calibration.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Calibrate a threshold on the real sensor",
          materials: ["A programmable robot with a light or distance sensor", "Colored or shaded cards, or a wall", "Sensor Reading Log worksheet"],
          instructions: [
            "Read the same still target five times and write down all five numbers to see the noise.",
            "Read a clearly 'dark' surface (or a far wall) three times, then a clearly 'light' surface (or a near wall) three times.",
            "Set your threshold halfway between the dark and light averages.",
            "Test it: show the sensor several dark and light surfaces and confirm each lands on the correct side of your threshold. Adjust if any land on the wrong side.",
          ],
          safetyNotes: ["Keep wires clear of the wheels while you move the robot to test surfaces."],
          expectedResult: "A calibrated threshold that correctly sorts dark from light (or near from far) surfaces in this room across several checks.",
          successCriteria: ["Five noise readings recorded", "Dark and light averages recorded", "A threshold set between them", "Test surfaces sort correctly, or the threshold is adjusted until they do"],
          troubleshooting: [
            { problem: "A surface sometimes lands on the wrong side", fix: "The two conditions may be too close together, or noise is large; move the threshold or use more contrasting surfaces." },
            { problem: "The whole set of readings shifted since earlier", fix: "The room light changed - re-calibrate now, which is exactly why calibration matters." },
          ],
          extension: "Move the robot to a sunnier or darker spot and calibrate a new threshold for that room.",
        },
        simulator: {
          pathId: "simulator",
          title: "Calibrate a threshold in the simulator",
          materials: ["Browser simulator with adjustable brightness or noise", "Sensor Reading Log worksheet"],
          instructions: [
            "Read the sim sensor five times on a still tile to see the simulated noise, and record the numbers.",
            "Read a dark tile three times and a light tile three times; average each set.",
            "Set your threshold between the two averages.",
            "Drive over a mix of dark and light tiles, reading each, and confirm they sort correctly. Adjust the threshold if any are on the wrong side.",
          ],
          safetyNotes: ["No physical safety concerns; save your log as you go."],
          expectedResult: "A threshold that correctly separates dark and light tiles in the simulator across several checks.",
          successCriteria: ["Five noise readings recorded", "Dark and light averages recorded", "A threshold set between them", "Test tiles sort correctly, or the threshold is adjusted until they do"],
          troubleshooting: [
            { problem: "Tiles keep sorting wrong even after setting a middle threshold", fix: "Raise the contrast between tiles or turn the simulated noise down, then re-calibrate." },
            { problem: "The average is hard to compute", fix: "Add the three readings and divide by three, or just use the middle reading of the three." },
          ],
          extension: "Increase the simulated noise and find out how far apart the conditions must be for the threshold to stay reliable.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Calibrate a human light-or-dark sorter",
          materials: ["A set of gray-scale or light/dark cards", "Blindfold (optional)", "Sensor Reading Log worksheet"],
          instructions: [
            "Have one student rate the same card five times without looking at their earlier answers - notice the small differences (noise).",
            "Rate a clearly dark card three times and a clearly light card three times, and average each.",
            "Pick a threshold number between the dark and light averages: at or above it is 'light', below it is 'dark'.",
            "Shuffle the cards and sort them using only the threshold, then check by eye. Adjust the threshold if any card is sorted wrong.",
          ],
          safetyNotes: ["No hazards; keep the workspace clear."],
          expectedResult: "A threshold number that lets a human 'sensor' sort a shuffled stack of cards into light and dark correctly.",
          successCriteria: ["Five noise readings recorded", "Dark and light averages recorded", "A threshold set between them", "Shuffled cards sort correctly, or the threshold is adjusted until they do"],
          troubleshooting: [
            { problem: "Two people set different thresholds", fix: "That is why calibration matters - agree on one shared scale and threshold for the group." },
            { problem: "The middle cards are hard to sort", fix: "Middle values are near the threshold; that is normal, note them as the hardest cases." },
          ],
          extension: "Add a few tricky middle-gray cards and discuss why sensors struggle right at the threshold.",
        },
      },
    },
  ],
  predictionPrompts: [
    { id: "w4-p1", prompt: "Before you measure: if a distance sensor reads 20 cm when a wall is at 20 cm, what do you predict it will read when you move the wall to 40 cm - a bigger or smaller number, and roughly what?", howToCheck: "Place the wall at 40 cm, read the sensor three times, and compare the middle reading to your prediction." },
    { id: "w4-p2", prompt: "Predict: if you read the same still wall five times in a row, will you get the exact same number every time?", howToCheck: "Take five readings without moving anything and see whether they match exactly or wobble a little (noise)." },
  ],
  testRecords: [
    {
      id: "w4-tr1",
      title: "Distance-vs-reading table",
      instructions: "Place the wall (or set the condition) at each listed distance, take the sensor reading, and record the number. Use the middle of three readings if it wobbles.",
      columns: ["Set distance (cm)", "Sensor reading", "Near or far?"],
      rows: 4,
      measure: "The sensor reading at each set distance, and whether you'd call it near or far",
    },
    {
      id: "w4-tr2",
      title: "Three-trial noise check",
      instructions: "Pick one condition and don't change it. Read the sensor three times in a row and record each reading to see how much it wobbles.",
      columns: ["Trial", "Sensor reading", "Difference from trial 1"],
      rows: 3,
      measure: "How much the reading changes between trials when nothing is changing (the noise)",
    },
  ],
  debuggingMissions: [],
  knowledgeCheck: {
    id: "w4-kc",
    instructions: "Answer these to check that you understand sensor readings, thresholds, noise, and calibration.",
    passThreshold: 4,
    questions: [
      {
        id: "w4-q6",
        kind: "matching",
        prompt: "Match each sensor to what it measures.",
        pairs: [
          { id: "w4-q6-p1", left: "Distance sensor", right: "How far away something is" },
          { id: "w4-q6-p2", left: "Light sensor", right: "How bright it is" },
          { id: "w4-q6-p3", left: "Touch sensor", right: "Whether something is pressed" },
          { id: "w4-q6-p4", left: "Color sensor", right: "What color a surface is" },
        ],
        explanation: "Each sensor measures one thing: distance, light level, touch, or color.",
      },
      {
        id: "w4-q7",
        kind: "short",
        prompt: "In your own words, what is a sensor threshold?",
        sampleAnswer: "A threshold is a cutoff number. If the reading is on one side of it the robot decides one thing, and on the other side it decides another - like 'closer than 15 cm means a wall is near.'",
        keywords: ["cutoff", "value", "number", "decide", "near", "far", "line"],
        explanation: "A threshold is a cutoff value that turns a sensor number into a yes/no decision.",
      },
      {
        id: "w4-q1",
        kind: "single",
        prompt: "What is a sensor reading?",
        options: [
          { id: "w4-q1-a", text: "The number a sensor gives you at one moment", correct: true, feedback: "Right - a reading is a measured number, like 20 cm or a brightness of 47." },
          { id: "w4-q1-b", text: "The name of the sensor", correct: false, feedback: "The name tells you the type; the reading is the number it measures." },
          { id: "w4-q1-c", text: "The color of the robot", correct: false, feedback: "The robot's color has nothing to do with what a sensor measures." },
          { id: "w4-q1-d", text: "A command that moves the robot", correct: false, feedback: "That is an actuator command; a reading is an input, not an action." },
        ],
        correctOptionId: "w4-q1-a",
        explanation: "A sensor reading is the number a sensor reports at one moment, and it changes smoothly as the world changes.",
      },
      {
        id: "w4-q2",
        kind: "single",
        prompt: "A distance sensor reads 30 cm at one wall and 12 cm at a closer wall. What does this tell you about how the reading works?",
        options: [
          { id: "w4-q2-a", text: "The reading gets bigger as things get closer", correct: false, feedback: "It's the opposite - closer things give a smaller distance number." },
          { id: "w4-q2-b", text: "The reading gets smaller as things get closer", correct: true, feedback: "Correct - a nearer object means fewer centimeters, so a smaller reading." },
          { id: "w4-q2-c", text: "The reading is random and means nothing", correct: false, feedback: "It changes in a clear, sensible direction with distance." },
          { id: "w4-q2-d", text: "The sensor is broken", correct: false, feedback: "This is exactly how a working distance sensor behaves." },
        ],
        correctOptionId: "w4-q2-b",
        explanation: "A distance sensor's reading shrinks as the object gets closer, which is how you can turn it into a near/far decision.",
      },
      {
        id: "w4-q3",
        kind: "single",
        prompt: "You want the robot to treat anything closer than 15 cm as 'near'. What is the number 15 called?",
        options: [
          { id: "w4-q3-a", text: "A detection limit", correct: false, feedback: "A detection limit is the farthest a sensor can sense, not the cutoff you chose." },
          { id: "w4-q3-b", text: "Noise", correct: false, feedback: "Noise is the small wobble in readings, not a cutoff value." },
          { id: "w4-q3-c", text: "A threshold", correct: true, feedback: "Right - a threshold is the cutoff number you pick to separate near from far." },
          { id: "w4-q3-d", text: "An actuator", correct: false, feedback: "An actuator is a part that acts; 15 cm is a value, not a part." },
        ],
        correctOptionId: "w4-q3-c",
        explanation: "A threshold is a cutoff value you choose that separates two cases, like near versus far or light versus dark.",
      },
      {
        id: "w4-q4",
        kind: "single",
        prompt: "You read the same still wall five times and get 30, 31, 30, 29, 31. Why do the numbers wobble?",
        options: [
          { id: "w4-q4-a", text: "The wall keeps moving", correct: false, feedback: "The wall isn't moving; the wobble happens even when nothing changes." },
          { id: "w4-q4-b", text: "Because of noise, so you take several readings", correct: true, feedback: "Correct - noise makes readings wobble slightly, so you read several and use the middle." },
          { id: "w4-q4-c", text: "The threshold is wrong", correct: false, feedback: "A threshold is a cutoff you choose; it doesn't cause the readings to wobble." },
          { id: "w4-q4-d", text: "The sensor ran out of battery", correct: false, feedback: "A dead sensor wouldn't read at all; small wobbles are normal noise." },
        ],
        correctOptionId: "w4-q4-b",
        explanation: "Noise is the small, normal wobble in readings even when nothing changes, so roboticists take several readings and use the middle or average.",
      },
      {
        id: "w4-q5",
        kind: "single",
        prompt: "Your light-or-dark threshold worked in the classroom but fails in a sunny room. What should you do?",
        options: [
          { id: "w4-q5-a", text: "Give up - light sensors don't work outside", correct: false, feedback: "Light sensors work fine; they just need to be set for the new light." },
          { id: "w4-q5-b", text: "Calibrate the sensor for the new room and set a new threshold", correct: true, feedback: "Correct - calibration adjusts your readings and threshold to this room's light." },
          { id: "w4-q5-c", text: "Make the robot drive faster", correct: false, feedback: "Speed has nothing to do with reading light correctly." },
          { id: "w4-q5-d", text: "Add more wheels", correct: false, feedback: "Wheels don't change how a light sensor reads brightness." },
        ],
        correctOptionId: "w4-q5-b",
        explanation: "The same threshold won't work in every room, so you calibrate the sensor to the new light and choose a new threshold that reliably separates light from dark.",
      },
    ],
  },
  reflection: [
    { id: "w4-r1", prompt: "When did your sensor give an unexpected reading, and what may have caused it?" },
    { id: "w4-r2", prompt: "You read a still object several times and got slightly different numbers. Why does that happen, and what did you do about it?" },
    { id: "w4-r3", prompt: "Why might a robot that senses perfectly in one room need to be calibrated again in a different room?" },
  ],
  journalPrompts: [
    { id: "w4-j1", prompt: "Record your sensor readings across the conditions you tested and the threshold you chose.", captures: "checklist" },
    { id: "w4-j2", prompt: "Write down your threshold number and one sentence explaining why you picked it.", captures: "text" },
    { id: "w4-j3", prompt: "Note how much your readings wobbled when nothing changed, and how many readings you took.", captures: "number" },
  ],
  savedPrograms: [
    {
      id: "w4-prog-sensor-stop",
      missionId: "w4-sim-stop",
      title: "Sensor-based stopping challenge",
      description: "Program the robot to drive forward while it watches its distance sensor, then stop in the square right before the wall using the threshold you found. Run three trials, adjust the speed or threshold between them, and explain your final setting in the notes.",
      expectedBlocks: ["move-forward", "repeat-until", "read-sensor", "stop"],
    },
  ],
  simulatorMissions: [
    {
      id: "w4-sim-read",
      title: "Read a sensor across conditions",
      objective: "Drive the robot so the wall is at different distances, read the sensor at each, and record the values without making the robot react.",
      grid: { cols: 6, rows: 6 },
      successCriteria: ["At least three sensor readings taken at different distances", "The readings change in a sensible direction", "No if/repeat blocks used - the robot only reads and reports"],
    },
    {
      id: "w4-sim-threshold",
      title: "Find a light/dark threshold",
      objective: "Read the sensor on dark and light tiles and record enough values to choose a threshold that separates them.",
      grid: { cols: 6, rows: 6 },
      successCriteria: ["Dark and light readings recorded", "A threshold value chosen between them", "The threshold correctly separates the recorded tiles"],
    },
    {
      id: "w4-sim-stop",
      title: "Stop before the wall",
      objective: "Drive the robot forward and use the distance sensor to stop it in the square right before the wall, then signal that the mission is complete.",
      grid: { cols: 4, rows: 1 },
      successCriteria: ["The robot stops in the cell right before the wall", "The distance sensor decides when to stop", "The robot signals mission complete and does not hit the wall"],
    },
  ],
  lessonFlow: [
    { id: "w4-f1", kind: "learn", title: "Four senses and what a reading is", focus: "Touch, distance, light, and color sensors; a reading is a number, not a yes/no.", minutes: 15 },
    { id: "w4-f2", kind: "predict", title: "Predict the readings", focus: "Guess how a reading changes with distance, and whether a still wall gives the same number twice.", minutes: 5 },
    { id: "w4-f3", kind: "explore", title: "Sensor Investigation Lab", focus: "Read a sensor across conditions and find a threshold.", activityId: "w4-a-sensor-lab", minutes: 18 },
    { id: "w4-f4", kind: "test", title: "Calibration & Threshold Challenge", focus: "Handle noise, then calibrate a reliable threshold for this room.", activityId: "w4-a-calibrate-challenge", minutes: 12 },
    { id: "w4-f5", kind: "program", title: "Sensor-based stopping challenge", focus: "Program the robot to drive and use the distance sensor to stop before the wall; run three trials and tune the threshold.", minutes: 15 },
    { id: "w4-f6", kind: "knowledge-check", title: "Knowledge check", focus: "Five questions on readings, thresholds, noise, and calibration.", minutes: 8 },
    { id: "w4-f7", kind: "reflection", title: "Reflection", focus: "Write about thresholds, noise, and why calibration matters.", minutes: 7 },
  ],
  safetyNotes: [
    { id: "w4-s1", text: "Keep the robot on a stable surface and mind the wheels when moving it between test spots.", severity: "caution", paths: ["kit"] },
    { id: "w4-s2", text: "Guide any blindfolded 'human sensor' and clear the floor so no one trips.", severity: "caution", paths: ["unplugged"] },
    { id: "w4-s3", text: "Don't shine a flashlight directly into anyone's eyes when testing light sensors.", severity: "caution", paths: ["kit"] },
    { id: "w4-s4", text: "Save your reading log often so a browser refresh doesn't lose your data.", severity: "info", paths: ["simulator"] },
  ],
  printableResources: [
    { id: "w4-pr1", kind: "worksheet", title: "Sensor Reading Log", description: "Tables to record sensor readings across conditions, a three-trial noise check, and a chosen threshold." },
    { id: "w4-pr2", kind: "journal-page", title: "Threshold and calibration page", description: "Space to record readings, calculate averages, and write down and justify a calibrated threshold." },
    { id: "w4-pr3", kind: "teacher-guide", title: "Week 4 teacher guide", description: "Setup, facilitation, misconceptions, and questions for the sensor-reading and calibration lesson." },
  ],
  completion: {
    summary: "Finish Week 4 by reading a sensor across conditions, recording the values, choosing and calibrating a threshold, and passing the knowledge check.",
    requirements: [
      { id: "w4-cr1", label: "Record sensor readings across conditions in the Sensor Investigation Lab", sectionKind: "explore" },
      { id: "w4-cr2", label: "Choose and calibrate a threshold in the Calibration & Threshold Challenge", sectionKind: "test" },
      { id: "w4-cr3", label: "Score at least 4 of 5 on the knowledge check", sectionKind: "knowledge-check" },
      { id: "w4-cr4", label: "Write your reflection", sectionKind: "reflection" },
    ],
  },
  teacherGuidance: {
    setup: [
      "Print the Sensor Reading Log for each student or pair.",
      "Set up a measured spot with a tape measure marked at 10, 20, 40, and 80 cm and a wall or box to place there.",
      "If using kits, attach a sensor and pre-load a short read-and-report program; if using the simulator, open it on each device; for unplugged, prepare a blindfold and a set of light/dark cards.",
    ],
    prep: [
      "Try the sensor lab yourself first so you know the real readings and detection limits of your sensor.",
      "Take five readings of a still object ahead of time so you can show students what noise looks like.",
      "Decide the two clear conditions (dark vs light, or near vs far) you'll use for the calibration challenge.",
    ],
    facilitation: [
      "Start with the four sensors and the big idea that a reading is a number, not a yes/no, before any measuring.",
      "Have students predict readings first, then run the Sensor Investigation Lab and record every value.",
      "Stress that this week the robot only reads and reports - students, not the robot, decide what the numbers mean; automatic reactions come next week.",
      "Run the Calibration & Threshold Challenge, showing noise with repeated readings and setting the threshold between two clear conditions.",
    ],
    commonMisconceptions: [
      "'A sensor gives a yes or no' - most give a number that changes smoothly with the world.",
      "'One reading is enough' - noise means you should take several and use the middle or average.",
      "'The same threshold works everywhere' - light and surfaces change by room, so you calibrate for where you are.",
      "'The sensor is broken because the number wobbles' - small wobble is normal noise, not a fault.",
    ],
    questionsToAsk: [
      "What number did you read, and what does it mean - near or far, light or dark?",
      "Why did you take more than one reading at the same spot?",
      "Where did you set your threshold, and how did you decide?",
      "Would your threshold still work in a brighter room? How would you check?",
    ],
    easierVersion: "Use only one sensor and two clear conditions (a near wall and a far wall), and set the threshold together as a group.",
    harderVersion: "Have students compare two sensors, quantify the noise as a range, and calibrate a threshold that works across two different rooms.",
  },
  nextWeek: {
    moduleId: "week-5",
    teaser: "Next week the robot stops just reporting numbers and starts reacting to them on its own, using loops and conditions with the thresholds you found.",
    prepare: [
      "Keep your calibrated thresholds from this week - you'll use them to make the robot decide next week.",
      "Charge your kit or bookmark the simulator.",
      "Think about a simple rule like 'if the wall is closer than my threshold, then turn' - that's what you'll build.",
    ],
  },
}

/* ========================================================================== */
/* WEEK 5                                                                      */
/* ========================================================================== */

export const roboticsWeek5: RoboticsModule = {
  id: "week-5",
  slug: "making-robots-react",
  week: 5,
  order: 5,
  title: "Making Robots React",
  subtitle: "Combine sensors with loops and conditions so a robot reacts to the world all by itself.",
  summary:
    "This is the big programming week. Students take the sensors from Week 4 and the sequences from Week 3 and combine them with loops and conditions so a robot can react on its own. They learn that a loop repeats steps, a forever loop repeats until it is stopped, and a repeat-until loop runs until a condition becomes true. They meet conditions and boolean (true/false) decisions, then use if and if/else to choose actions. They program obstacle avoidance - loop, read the distance sensor, and if something is close, turn - and explore line following by checking a light or color sensor to steer and stay on a line.",
  mainMission:
    "Program a robot that reacts on its own: it loops, checks a sensor, and uses if/else to avoid obstacles or follow a line.",
  estimatedTime: "70-85 minutes",
  learningGoals: [
    { id: "w5-g1", text: "Explain how a loop, a forever loop, and a repeat-until loop each repeat steps" },
    { id: "w5-g2", text: "Describe a condition as a check that is either true or false (boolean)" },
    { id: "w5-g3", text: "Use if to run steps only when a condition is true, and if/else to choose between two actions" },
    { id: "w5-g4", text: "Program obstacle avoidance by looping, reading a distance sensor, and turning when something is close" },
    { id: "w5-g5", text: "Explain how line following keeps checking a light or color sensor to steer and stay on a line" },
  ],
  vocabulary: [
    { term: "Loop", definition: "A block that repeats one or more steps instead of writing them out over and over." },
    { term: "Forever loop", definition: "A loop that keeps repeating its steps over and over until you stop the program." },
    { term: "Repeat-until", definition: "A loop that repeats its steps until a condition becomes true, then stops and moves on." },
    { term: "Condition", definition: "A check about the world, like 'is the wall close?', that is always either true or false." },
    { term: "If", definition: "A block that runs its steps only when its condition is true, and skips them when it is false." },
    { term: "If/else", definition: "A block that runs one set of steps when the condition is true and a different set when it is false." },
    { term: "Boolean", definition: "A value that can only be one of two things: true or false. Conditions give a boolean answer." },
    { term: "Obstacle avoidance", definition: "A behavior where the robot loops, reads a distance sensor, and turns away when something is close." },
    { term: "Line following", definition: "A behavior where the robot keeps checking a light or color sensor and steers to stay on a marked line." },
    { term: "Responsive behavior", definition: "When a robot changes what it does based on what it senses, in real time, instead of following a fixed list." },
  ],
  prerequisites: [
    { moduleId: "week-3", reason: "Reacting still runs as a program, so it builds on the exact instruction sequences from Week 3." },
    { moduleId: "week-4", reason: "A robot can only react to what it can sense, so this week needs the distance, light, and color sensors from Week 4." },
  ],
  concepts: [
    {
      id: "w5-c1",
      title: "Loops: repeat without rewriting",
      body: [
        "In Week 3 you wrote every step out in a row. That works, but if you want the robot to check its sensor a hundred times, you don't want to write the same step a hundred times. A loop is a block that repeats steps for you.",
        "A plain repeat loop runs its steps a set number of times, like 'repeat 4 times: drive forward, turn right' to make a square. The loop does the counting so your program stays short.",
      ],
      examples: ["Repeat 4 times to drive a square", "Repeat 3 times to knock on a door", "Repeat 10 times to inch forward and check"],
    },
    {
      id: "w5-c2",
      title: "Forever loops and repeat-until loops",
      body: [
        "A forever loop repeats its steps over and over and never stops on its own - it keeps going until you stop the program. Robots use forever loops to keep watching the world, like 'forever: read the sensor and react'.",
        "A repeat-until loop is different: it repeats its steps until a condition becomes true, then it stops and moves on. 'Repeat until the wall is close: drive forward' means keep driving forward, but the moment the wall is close, stop looping.",
      ],
      examples: ["Forever: keep checking the distance sensor", "Repeat until line is found: drive forward", "Repeat until button is pressed: wait"],
    },
    {
      id: "w5-c3",
      title: "Conditions are true or false (boolean)",
      body: [
        "A condition is a question about the world that can only be answered yes or no - in programming we say true or false. A value that is only ever true or false is called a boolean.",
        "'Is the wall closer than 10 cm?' is a condition. Right now it might be true; a second later, after the robot moves, it might be false. Conditions are how a robot turns a sensor reading into a clear yes-or-no it can act on.",
      ],
      examples: ["Is the wall close? -> true or false", "Is the sensor over the dark line? -> true or false", "Is the button pressed? -> true or false"],
    },
    {
      id: "w5-c4",
      title: "If and if/else: choosing what to do",
      body: [
        "An if block runs its steps only when its condition is true. 'If the wall is close, turn right' means the robot turns only when a wall is actually close; otherwise it skips the turn.",
        "An if/else block picks between two actions: it runs one set of steps when the condition is true and a different set when it is false. 'If the wall is close, turn right; else drive forward' means the robot always does one or the other, depending on what it senses.",
      ],
      examples: ["If line lost, turn to find it", "If/else: wall close -> turn, else -> go forward", "If item is red, turn to the red bin"],
    },
    {
      id: "w5-c5",
      title: "Obstacle avoidance = loop + sensor + if/else",
      body: [
        "Now put it all together. Obstacle avoidance is a forever loop that reads the distance sensor and uses if/else to decide: if something is close, turn away; else keep driving forward. Because the loop repeats many times a second, the robot reacts the instant an obstacle appears.",
        "This is the pattern behind self-parking cars and robot vacuums: sense, decide, act - over and over, forever.",
      ],
      examples: ["Forever: read distance; if close turn, else forward", "A robot vacuum bumping around a room", "A rover steering around a rock"],
    },
    {
      id: "w5-c6",
      title: "Line following: keep checking and steer",
      body: [
        "Line following uses a light or color sensor pointed at the floor. A dark line reflects less light than a light floor, so the sensor can tell 'on the line' from 'off the line'. The robot keeps checking, again and again, and steers to stay on the line.",
        "One simple rule: if the sensor sees the line, curve one way; else curve back the other way. The robot never drives perfectly straight - it wiggles along the edge of the line, correcting all the time. That constant checking and steering is responsive behavior.",
      ],
      examples: ["Warehouse robots following floor tape", "A factory cart on a painted line", "Repeat-until the end mark: keep following the line"],
    },
  ],
  materials: [
    { id: "w5-m1", name: "Block program planning sheet (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w5-m2", name: "If/else decision-card set (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w5-m3", name: "Reaction test record (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w5-m4", name: "A programmable robot kit with a distance sensor and a light or color sensor", paths: ["kit"] },
    { id: "w5-m5", name: "Boxes or books to build a small obstacle course", paths: ["kit"] },
    { id: "w5-m6", name: "Dark tape (or a printed line) on a light floor for line following", paths: ["kit"] },
    { id: "w5-m7", name: "Computer or tablet with the browser simulator", paths: ["simulator"] },
    { id: "w5-m8", name: "Program cards (forever, if, if/else, move, turn, read-sensor, stop) and a floor grid or taped line", paths: ["unplugged"] },
    { id: "w5-m9", name: "A partner to act as the robot and follow the cards", paths: ["unplugged"] },
  ],
  activities: [
    {
      id: "w5-a-obstacle-avoidance",
      kind: "program",
      title: "Obstacle-avoidance program",
      goal: "Program a robot to loop, read a distance sensor, and use if/else to turn when something is close and drive forward when the path is clear.",
      shared: [
        "The pattern is always the same: forever loop, read the distance sensor, then if/else - if something is close, turn; else drive forward.",
        "Decide your closeness rule first (for example, 'closer than 10 cm counts as close'). Then build the loop so the robot keeps reacting the whole time it runs.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Avoid real obstacles with a kit robot",
          materials: ["A robot kit with a distance sensor", "Boxes or books for an obstacle course", "Block program planning sheet"],
          instructions: [
            "Set up a few obstacles (boxes or books) with gaps the robot can drive through.",
            "Build a forever loop. Inside it, read the distance sensor.",
            "Add an if/else: if the distance is less than your closeness value, turn; else drive forward a little.",
            "Run it and watch the robot loop, sense, and steer around the obstacles on its own.",
          ],
          safetyNotes: ["Keep fingers away from wheels while the robot drives.", "Give the robot a clear floor with no cords or steps."],
          expectedResult: "The robot drives forward on its own and turns away whenever an obstacle gets close, without a person steering.",
          successCriteria: ["Program uses a forever (or repeat) loop", "Program reads the distance sensor inside the loop", "Program uses if/else to turn when close and drive when clear", "Robot avoids at least one obstacle by itself"],
          troubleshooting: [
            { problem: "The robot drives straight into obstacles", fix: "Check the if is really reading the sensor, and that your closeness value is larger than the reading when a wall is right in front." },
            { problem: "The robot spins in place forever", fix: "Your closeness value may be too big so it always thinks something is close; lower it, or add a short forward move in the else." },
          ],
          extension: "Add a second rule with if/else so the robot turns left sometimes and right other times to escape corners.",
        },
        simulator: {
          pathId: "simulator",
          title: "Avoid walls on a grid in the simulator",
          materials: ["Browser simulator", "Block program planning sheet"],
          instructions: [
            "Open the obstacle-course mission with walls on the grid.",
            "Drag a forever loop into the workspace and put a read-sensor (distance) block inside it.",
            "Add an if/else: if a wall is close ahead, turn-left (or turn-right); else move-forward.",
            "Run the mission and watch the robot loop and steer around the walls to reach the goal.",
          ],
          safetyNotes: ["No physical safety concerns; take a screen break if your eyes get tired."],
          expectedResult: "The simulator robot keeps moving forward and turns whenever a wall is detected ahead, threading through the grid on its own.",
          successCriteria: ["Program uses a forever loop", "Program has a read-sensor block inside the loop", "Program uses if/else to turn when a wall is close and move forward when clear", "Robot reaches the goal without a person steering it"],
          troubleshooting: [
            { problem: "Robot drives off the grid or into a wall", fix: "Make sure the read-sensor and if/else are inside the loop, not after it, so the check happens every step." },
            { problem: "Robot only turns and never moves forward", fix: "Put the move-forward in the else branch so it drives whenever the path ahead is clear." },
          ],
          extension: "Turn on more walls or a smaller gap and adjust the program so the robot still gets through.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Run an obstacle course with if-cards and a human robot",
          materials: ["Program cards (forever, read-sensor, if/else, move, turn, stop)", "A partner to be the robot", "Objects for obstacles"],
          instructions: [
            "Set up a few objects on the floor as obstacles with gaps between them.",
            "Lay out cards: a forever card, and inside it a read-sensor card ('look ahead - is something close?') and an if/else card.",
            "Write the if/else: if something is close, turn; else take one step forward.",
            "Blindfold-free, your partner is the robot: they may only do exactly what the current card says, checking 'is it close?' each time through the loop.",
          ],
          safetyNotes: ["Use soft, safe objects as obstacles.", "Clear the floor of anything a person could trip on."],
          expectedResult: "The human robot loops through the cards, checks for obstacles each time, and turns away when one is close - never crashing into them.",
          successCriteria: ["Cards include a loop, a read-sensor, and an if/else", "The robot re-checks the condition every loop", "The robot turns only when something is close and steps forward when clear", "The course is finished without crashes"],
          troubleshooting: [
            { problem: "The robot 'cheats' and just walks around obstacles", fix: "Remind them a robot can only follow the cards; they must actually check the condition and act on it." },
            { problem: "The robot forgets to keep checking", fix: "The forever card means go back to the top every time; point to it after each action." },
          ],
          extension: "Add an if/else that turns left near a left wall and right near a right wall.",
        },
      },
    },
    {
      id: "w5-a-line-following",
      kind: "program",
      title: "Line-following explore",
      goal: "Use a light or color sensor with repeat-until and if to keep a robot steering along a marked line.",
      shared: [
        "Line following is a keep-checking behavior: over and over, read the light or color sensor and steer to stay on the line.",
        "A simple rule works: if the sensor is on the line, curve one way; else curve the other way. Wrap it in a repeat-until loop that ends when the robot reaches the finish mark.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Follow a taped line with a light or color sensor",
          materials: ["A robot kit with a light or color sensor", "Dark tape line on a light floor", "Block program planning sheet"],
          instructions: [
            "Lay a dark tape line on a light floor with a clear start and end mark.",
            "Point the light or color sensor down at the floor and check its reading on the line versus off the line.",
            "Build a repeat-until (until the end mark) loop with an if inside: if the sensor is off the line, steer back toward it; else keep curving along the edge.",
            "Run it and watch the robot wiggle along the line and stop at the end.",
          ],
          safetyNotes: ["Keep fingers clear of the wheels during runs.", "Tape the line flat so no one trips."],
          expectedResult: "The robot follows the taped line, correcting side to side as it goes, and stops at the end mark.",
          successCriteria: ["Program reads the light or color sensor in a loop", "Program uses an if (or if/else) to steer based on the reading", "Robot stays roughly on the line for most of its length", "Robot stops at the end mark"],
          troubleshooting: [
            { problem: "The robot loses the line right away", fix: "Re-check your on-line and off-line sensor readings and set the threshold between them; the two must be clearly different." },
            { problem: "The robot spins in circles", fix: "Make the correction turns small; big turns overshoot the line every time." },
          ],
          extension: "Add a curve or a fork to the line and adjust the steering rule so the robot still follows it.",
        },
        simulator: {
          pathId: "simulator",
          title: "Follow a line on the grid in the simulator",
          materials: ["Browser simulator", "Block program planning sheet"],
          instructions: [
            "Open the line-follow mission with a marked path across the grid.",
            "Add a repeat-until loop set to run until the robot reaches the end tile.",
            "Inside it, put a read-sensor (light/color) block and an if/else: if off the line, turn back toward it; else move-forward.",
            "Run the mission and watch the robot steer along the line to the finish.",
          ],
          safetyNotes: ["No physical safety concerns; take screen breaks as needed."],
          expectedResult: "The simulator robot follows the marked path, steering to stay on it, and stops when it reaches the end tile.",
          successCriteria: ["Program uses a repeat-until loop", "Program reads the light/color sensor each loop", "Program uses if/else to steer based on the reading", "Robot reaches the end of the line"],
          troubleshooting: [
            { problem: "The loop never ends", fix: "Check the repeat-until condition (reached the end tile) can actually become true along the path." },
            { problem: "The robot drifts off the line", fix: "Make sure the read-sensor and if/else are inside the loop so it checks and corrects every step." },
          ],
          extension: "Choose a curvier line map and tune the steering so the robot keeps up.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Act out line following by a rule along taped line",
          materials: ["A taped line on the floor with a start and end", "The line-following rule written on a card", "A partner to be the robot"],
          instructions: [
            "Tape a line on the floor with a clear start and end mark.",
            "Write the rule: 'Keep going until you reach the end. Each step, check: are your feet on the line? If yes, step forward along it; if no, turn a little toward the line and step.'",
            "Your partner is the robot: they may only follow the rule, checking their feet against the line each single step, never looking ahead to plan.",
            "Repeat-until they reach the end mark, then stop.",
          ],
          safetyNotes: ["Walk slowly and keep the path clear so no one trips.", "Tape the line down flat."],
          expectedResult: "The human robot follows the taped line step by step, correcting toward it whenever a foot drifts off, and stops at the end.",
          successCriteria: ["The robot re-checks the on-line condition every step", "The robot corrects toward the line when off it", "The robot follows the rule, not its own judgment", "The robot stops at the end mark"],
          troubleshooting: [
            { problem: "The robot just walks the whole line smoothly without checking", fix: "That is a human planning ahead - make them pause and re-check the condition each single step, like a loop." },
            { problem: "The robot argues about which way to turn", fix: "Write the rule so 'off the line' always turns toward the line, removing the guesswork." },
          ],
          extension: "Add a bend to the line and see whether the same rule still keeps the robot on it.",
        },
      },
    },
  ],
  predictionPrompts: [
    { id: "w5-p1", prompt: "Before you run the obstacle program: when the robot meets a wall, what do you predict it will do, and why?", howToCheck: "Run the program at a wall three times and compare what the robot actually does to your prediction." },
    { id: "w5-p2", prompt: "Predict: if you take the read-sensor out of the loop, how will the robot's reactions change?", howToCheck: "Remove the sensor read from the loop, run it, and watch whether the robot still reacts to obstacles that appear." },
  ],
  testRecords: [
    {
      id: "w5-tr1",
      title: "Obstacle-avoidance reliability test",
      instructions: "Place the robot in front of an obstacle and run the program. Record whether it turned away in time. Repeat three times from the same start.",
      columns: ["Try", "Did it avoid the obstacle? (Y/N)", "What it did"],
      rows: 3,
      measure: "How many of the three tries the robot successfully avoided the obstacle",
    },
  ],
  debuggingMissions: [],
  knowledgeCheck: {
    id: "w5-kc",
    instructions: "Answer these to check that you understand loops, conditions, and how robots react.",
    passThreshold: 4,
    questions: [
      {
        id: "w5-q6",
        kind: "true-false",
        prompt: "Decide whether this statement is true or false.",
        statement: "A forever loop stops on its own after a few seconds.",
        answer: false,
        explanation: "False. A forever loop keeps repeating until something stops it - it does not end by itself.",
      },
      {
        id: "w5-q1",
        kind: "single",
        prompt: "What does a loop do in a program?",
        options: [
          { id: "w5-q1-a", text: "It makes the robot move faster", correct: false, feedback: "Speed comes from the motors, not from a loop." },
          { id: "w5-q1-b", text: "It repeats one or more steps instead of writing them out again and again", correct: true, feedback: "Right - a loop repeats steps so your program stays short." },
          { id: "w5-q1-c", text: "It stops the robot", correct: false, feedback: "Stopping is what a stop block does, not a loop." },
          { id: "w5-q1-d", text: "It adds a new sensor", correct: false, feedback: "A loop repeats steps; it doesn't add hardware." },
        ],
        correctOptionId: "w5-q1-b",
        explanation: "A loop repeats steps for you, so the robot can do or check something over and over without a long program.",
      },
      {
        id: "w5-q2",
        kind: "single",
        prompt: "What is the difference between a forever loop and a repeat-until loop?",
        options: [
          { id: "w5-q2-a", text: "A forever loop runs once; a repeat-until loop runs twice", correct: false, feedback: "Neither runs a fixed one or two times - they both keep repeating." },
          { id: "w5-q2-b", text: "A forever loop repeats until you stop the program; a repeat-until loop repeats until a condition becomes true", correct: true, feedback: "Correct - forever keeps going until stopped; repeat-until stops itself when its condition is true." },
          { id: "w5-q2-c", text: "They are exactly the same", correct: false, feedback: "They stop for different reasons, so they are not the same." },
          { id: "w5-q2-d", text: "A forever loop needs a sensor and a repeat-until loop does not", correct: false, feedback: "Either loop can use a sensor; the difference is how they stop." },
        ],
        correctOptionId: "w5-q2-b",
        explanation: "A forever loop only stops when you stop the program; a repeat-until loop stops itself once its condition becomes true.",
      },
      {
        id: "w5-q3",
        kind: "single",
        prompt: "A condition like 'is the wall close?' can only be:",
        options: [
          { id: "w5-q3-a", text: "A number in centimeters", correct: false, feedback: "The sensor gives a number, but the condition turns it into a yes/no answer." },
          { id: "w5-q3-b", text: "True or false (a boolean)", correct: true, feedback: "Right - a condition always answers true or false, which is called a boolean." },
          { id: "w5-q3-c", text: "A color", correct: false, feedback: "A condition is a yes/no check, not a color." },
          { id: "w5-q3-d", text: "A motor speed", correct: false, feedback: "Speed is an output; a condition is a true/false check." },
        ],
        correctOptionId: "w5-q3-b",
        explanation: "A condition is a check that is always either true or false - and a true/false value is called a boolean.",
      },
      {
        id: "w5-q4",
        kind: "single",
        prompt: "What does an if/else block do?",
        options: [
          { id: "w5-q4-a", text: "It runs one set of steps when the condition is true and a different set when it is false", correct: true, feedback: "Correct - if/else picks between two actions based on the condition." },
          { id: "w5-q4-b", text: "It repeats a step ten times", correct: false, feedback: "That is a repeat loop, not an if/else." },
          { id: "w5-q4-c", text: "It always runs both sets of steps", correct: false, feedback: "if/else runs only one branch - the true one or the false one, never both." },
          { id: "w5-q4-d", text: "It reads a sensor", correct: false, feedback: "A read-sensor block does that; if/else decides what to do with the reading." },
        ],
        correctOptionId: "w5-q4-a",
        explanation: "An if/else block chooses between two actions: the 'if' steps when the condition is true, the 'else' steps when it is false.",
      },
      {
        id: "w5-q5",
        kind: "single",
        prompt: "How does obstacle avoidance work?",
        options: [
          { id: "w5-q5-a", text: "The robot drives a fixed path it was told once", correct: false, feedback: "That is a plain sequence with no reacting; obstacle avoidance uses the sensor live." },
          { id: "w5-q5-b", text: "A loop reads the distance sensor and, if something is close, the robot turns; else it drives forward", correct: true, feedback: "Right - loop, read the sensor, and use if/else to turn when close and go when clear." },
          { id: "w5-q5-c", text: "The robot waits for a person to steer it around each obstacle", correct: false, feedback: "That would be remote-controlled, not reacting on its own." },
          { id: "w5-q5-d", text: "The robot turns off when it sees an obstacle", correct: false, feedback: "It steers away and keeps going; it doesn't shut off." },
        ],
        correctOptionId: "w5-q5-b",
        explanation: "Obstacle avoidance is a loop that reads the distance sensor and uses if/else to turn when something is close and drive forward when the path is clear.",
      },
    ],
  },
  reflection: [
    { id: "w5-r1", prompt: "What decision does your robot make repeatedly, and what information does it use?" },
    { id: "w5-r2", prompt: "Why does a reacting robot need a loop around its sensor check instead of checking just once?" },
    { id: "w5-r3", prompt: "Describe one real robot that reacts to the world, and name the condition it checks." },
  ],
  journalPrompts: [
    { id: "w5-j1", prompt: "Sketch your obstacle-avoidance program as a loop with a read-sensor and an if/else inside.", captures: "sketch" },
    { id: "w5-j2", prompt: "Write the one line-following rule your robot follows, as 'if ... then ... else ...'.", captures: "text" },
    { id: "w5-j3", prompt: "Record how many of your three obstacle tries the robot avoided the obstacle.", captures: "number" },
  ],
  savedPrograms: [
    {
      id: "w5-prog-obstacle",
      missionId: "w5-sim-obstacle",
      title: "Obstacle-avoidance program",
      description: "A forever loop that reads the distance sensor and uses if/else to turn when something is close and drive forward when the path is clear.",
      expectedBlocks: ["forever", "read-sensor", "if-else", "move-forward", "turn-left", "turn-right", "stop"],
    },
    {
      id: "w5-prog-line-follow",
      missionId: "w5-sim-line-follow",
      title: "Line-following program",
      description: "A repeat-until loop that reads the light or color sensor each step and uses an if to steer back onto the line, stopping at the end mark.",
      expectedBlocks: ["repeat-until", "read-sensor", "if", "if-else", "move-forward", "turn-left", "turn-right", "stop"],
    },
  ],
  simulatorMissions: [
    {
      id: "w5-sim-obstacle",
      title: "Obstacle course",
      objective: "Program the robot to loop, read the distance sensor, and use if/else to steer around the walls and reach the goal on its own.",
      grid: { cols: 8, rows: 8 },
      successCriteria: ["The robot avoids every wall without being steered", "The program uses a loop with a sensor read and an if/else inside", "The robot reaches the goal tile"],
    },
    {
      id: "w5-sim-line-follow",
      title: "Line follow",
      objective: "Use a repeat-until loop and a light/color sensor to keep the robot on the marked line until it reaches the end tile.",
      grid: { cols: 8, rows: 8 },
      successCriteria: ["The robot stays on the marked line most of the way", "The program reads the light/color sensor each loop", "The robot stops at the end of the line"],
    },
  ],
  lessonFlow: [
    { id: "w5-f1", kind: "learn", title: "Loops and conditions", focus: "Loops, forever loops, repeat-until, conditions, boolean, if, and if/else.", minutes: 18 },
    { id: "w5-f2", kind: "program", title: "Obstacle-avoidance program", focus: "Loop, read the distance sensor, and if/else to turn when close.", activityId: "w5-a-obstacle-avoidance", minutes: 20 },
    { id: "w5-f3", kind: "predict", title: "Predict the wall reaction", focus: "Predict what the robot does when it meets a wall, then check.", minutes: 6 },
    { id: "w5-f4", kind: "test", title: "Reaction reliability test", focus: "Run three tries and record whether the robot avoided the obstacle.", minutes: 8 },
    { id: "w5-f5", kind: "program", title: "Line-following explore", focus: "Use a light/color sensor with repeat-until and if to stay on a line.", activityId: "w5-a-line-following", minutes: 18 },
    { id: "w5-f6", kind: "knowledge-check", title: "Knowledge check", focus: "Five questions on loops, conditions, and reacting.", minutes: 8 },
    { id: "w5-f7", kind: "reflection", title: "Reflection", focus: "Write about if vs if/else and why reacting needs a loop.", minutes: 7 },
  ],
  safetyNotes: [
    { id: "w5-s1", text: "Keep fingers, hair, and loose clothing away from moving wheels while a reacting robot drives, since it changes direction on its own.", severity: "caution", paths: ["kit"] },
    { id: "w5-s2", text: "Tape lines and obstacle-course pieces down flat and clear the floor so no one trips during runs.", severity: "caution", paths: ["kit", "unplugged"] },
    { id: "w5-s3", text: "Save your block program often so a browser refresh doesn't lose your work.", severity: "info", paths: ["simulator"] },
  ],
  printableResources: [
    { id: "w5-pr1", kind: "worksheet", title: "Block program planning sheet", description: "A page to plan a loop with a read-sensor and an if/else before building it." },
    { id: "w5-pr2", kind: "flowchart", title: "If/else decision cards", description: "Printable forever, read-sensor, if, and if/else cards for the unplugged obstacle and line activities." },
    { id: "w5-pr3", kind: "worksheet", title: "Reaction test record", description: "A table to record three obstacle-avoidance tries and whether the robot avoided the obstacle." },
    { id: "w5-pr4", kind: "teacher-guide", title: "Week 5 teacher guide", description: "Setup, facilitation, misconceptions, and questions to ask for the reacting-robots lesson." },
  ],
  completion: {
    summary: "Finish Week 5 by programming an obstacle-avoidance behavior, exploring line following, recording three reaction tries, and passing the knowledge check.",
    requirements: [
      { id: "w5-cr1", label: "Build an obstacle-avoidance program with a loop, a sensor read, and an if/else", sectionKind: "program" },
      { id: "w5-cr2", label: "Explore line following with a light/color sensor and a loop", sectionKind: "program" },
      { id: "w5-cr3", label: "Run three reaction tries and record the results", sectionKind: "test" },
      { id: "w5-cr4", label: "Score at least 4 of 5 on the knowledge check", sectionKind: "knowledge-check" },
      { id: "w5-cr5", label: "Write your reflection", sectionKind: "reflection" },
    ],
  },
  teacherGuidance: {
    setup: [
      "Print the planning sheet, if/else decision cards, and reaction test record for each student or pair.",
      "For kits, charge them, attach a distance sensor and a light or color sensor, and set up a small obstacle course and a taped line.",
      "For the simulator, open the obstacle-course and line-follow missions on each device.",
    ],
    prep: [
      "Program the obstacle-avoidance pattern yourself first so you know a working closeness value for your sensor.",
      "Check the light/color sensor's on-line and off-line readings on your actual tape and floor.",
      "Cut out the unplugged forever, if, and if/else cards ahead of time.",
    ],
    facilitation: [
      "Teach loops, forever vs repeat-until, and conditions (true/false) before any programming, using the sense-decide-act loop from Week 1.",
      "Build the obstacle-avoidance pattern together - forever, read sensor, if/else - then let pairs adapt it.",
      "Do the prediction and three-try reaction test so students see reacting is about reliability, not one lucky run.",
      "Explore line following as a keep-checking, keep-steering behavior; expect wiggling, not perfect straight lines.",
      "End with the knowledge check and reflection.",
    ],
    commonMisconceptions: [
      "'The robot only needs to check once' - without a loop it reacts a single time and then stops responding.",
      "'if/else runs both branches' - it runs only the true branch or only the false branch.",
      "'A bigger turn follows the line better' - large corrections overshoot; small, frequent ones work.",
      "Mixing up the sensor number with the condition - the sensor gives a number, the condition turns it into true/false.",
    ],
    questionsToAsk: [
      "Where is the loop, and what makes it stop?",
      "What is the condition here, and when is it true?",
      "What does the robot do in the 'else' - and why does it need one?",
      "How does the robot know it has drifted off the line?",
    ],
    easierVersion: "Give students a nearly-finished program with the if/else empty, so they only fill in 'turn' and 'drive forward'.",
    harderVersion: "Ask students to combine both behaviors - follow a line but avoid an obstacle placed on it - using nested if/else.",
  },
  nextWeek: {
    moduleId: "week-6",
    teaser: "Next week your reacting robot won't always behave - so we learn to debug, and to make it work reliably every time.",
    prepare: [
      "Save your obstacle-avoidance and line-following programs; we'll break and fix versions of them next week.",
      "Notice one time your robot reacted wrong today - that's a bug to bring to Week 6.",
      "Charge your kit or bookmark the simulator.",
    ],
  },
}

/* ========================================================================== */
/* WEEK 6                                                                      */
/* ========================================================================== */

export const roboticsWeek6: RoboticsModule = {
  id: "week-6",
  slug: "debugging-and-reliability",
  week: 6,
  order: 6,
  title: "Debugging and Reliability",
  subtitle: "Track down why a robot misbehaves - mechanical, programming, or sensor - and prove it works again and again.",
  summary:
    "Students take the reacting robots they built and make them trustworthy. They learn that debugging is the work of finding out why the actual result is different from the expected result, and that bugs come in three families: mechanical (something physical), programming (a wrong or missing instruction), and sensor (a bad reading, threshold, or calibration). They practice diagnosing purposeful debugging missions, meet variables and counters to store and track values, and run reliability trials - the same task three times - recording expected versus actual to prove the robot really works.",
  mainMission:
    "Diagnose and fix mechanical, programming, and sensor bugs, then prove a robot is reliable with a three-run test.",
  estimatedTime: "70-85 minutes",
  learningGoals: [
    { id: "w6-g1", text: "Explain debugging as finding why the actual result differs from the expected result" },
    { id: "w6-g2", text: "Tell mechanical, programming, and sensor bugs apart from their symptoms" },
    { id: "w6-g3", text: "Use a variable or counter to store or track a value in a program" },
    { id: "w6-g4", text: "Run a reliability trial: do the same task three times and record expected vs actual" },
    { id: "w6-g5", text: "Diagnose a misbehaving robot and describe the fix" },
  ],
  vocabulary: [
    { term: "Debugging", definition: "The work of finding out why a robot's actual result is different from the expected result, then fixing it." },
    { term: "Variable", definition: "A named place in a program that stores a value which can change while the program runs." },
    { term: "Counter", definition: "A variable used to count: it starts at a number and goes up by one each time something happens." },
    { term: "Stored value", definition: "A number or fact a program keeps in a variable so it can use or change it later." },
    { term: "Calibration value", definition: "A number you measure and save so a sensor's readings mean the right thing, like the light level of a white floor." },
    { term: "Expected result", definition: "What SHOULD happen when the program runs correctly - what you predict before you test." },
    { term: "Actual result", definition: "What DID happen when you actually ran the robot, which you observe and write down." },
    { term: "Test case", definition: "One specific situation you set up on purpose to test, like 'a wall exactly 15 cm away'." },
    { term: "Mechanical bug", definition: "A physical problem with the robot's body, like a loose wheel, a dragging wire, or a jammed gear." },
    { term: "Programming bug", definition: "A mistake in the instructions: a wrong, missing, or out-of-order block or number." },
    { term: "Sensor bug", definition: "A problem with sensing: a bad reading, a wrong threshold, or a sensor that needs calibrating." },
    { term: "Reliability", definition: "How well a robot does the same job correctly again and again, proven by repeated trials." },
  ],
  prerequisites: [
    { moduleId: "week-5", reason: "You debug the reacting robots you built in Week 5, which use loops and conditions." },
    { moduleId: "week-4", reason: "Sensor bugs, thresholds, and calibration all build on the sensors introduced in Week 4." },
  ],
  concepts: [
    {
      id: "w6-c1",
      title: "What debugging really is",
      body: [
        "Every time you run a program you have two results in your head: the expected result (what SHOULD happen) and the actual result (what DID happen). When they match, the robot is working. When they don't, there is a bug, and debugging is the detective work of finding out why they differ.",
        "Good debuggers don't just poke at the robot - they compare expected to actual, look closely at the symptom, and change one thing at a time so they can tell what fixed it.",
      ],
      examples: ["Expected: stop at the wall. Actual: crashed into the wall. -> There is a bug to find.", "Expected: turn left. Actual: turned right. -> Compare the block to what you meant."],
    },
    {
      id: "w6-c2",
      title: "The three families of bugs",
      body: [
        "Bugs come in three families, and naming the family is half the fix. A mechanical bug is a physical problem with the robot's body - a loose wheel, a wire dragging on the floor, a gear that slips. A programming bug is a mistake in the instructions - a wrong number, a missing block, or blocks in the wrong order. A sensor bug is a sensing problem - a bad reading, a threshold set to the wrong value, or a sensor that needs calibrating.",
        "The trick is to read the symptom and guess the family first. If the robot behaves the same wrong way every single time, the bug is often in the program. If it works sometimes and not others, suspect something mechanical or a shaky sensor reading.",
      ],
      examples: ["Mechanical: robot drifts to one side because a wheel is loose.", "Programming: robot turns for 2 seconds instead of 1 because the number is wrong.", "Sensor: robot never stops because the distance threshold is too small."],
    },
    {
      id: "w6-c3",
      title: "Variables and counters: storing and tracking values",
      body: [
        "Sometimes a program needs to remember a number. A variable is a named box that stores a value, and the value can change while the program runs. A counter is a special variable used to count: it starts at zero and goes up by one each time something happens, like every time the robot avoids an obstacle.",
        "Variables also hold calibration values - numbers you measure once and store so a sensor's readings mean the right thing. Storing a value means you can use it later, change it, and check it, instead of guessing.",
      ],
      examples: ["A counter that adds 1 each time an obstacle is avoided.", "A stored calibration value for the light level of the white floor.", "A variable that remembers how many times the robot has looped."],
    },
    {
      id: "w6-c4",
      title: "Reliability: proving it with repeated trials",
      body: [
        "A robot that works once might have just gotten lucky. Reliability means doing the same job correctly again and again - and you can't claim it without proof. The proof is a reliability trial: you run the same task several times, using the same test case each run, and write down the expected result and the actual result for every run.",
        "If all three runs match what you expected, the robot is reliable for that test case. If one run is different, you've found a bug hiding in plain sight - and that failing run is exactly the clue you need.",
      ],
      examples: ["Run the stop-at-wall task 3 times from the same start and record each one.", "Expected 'stops' all three runs; actual 'stops, stops, crashes' means run 3 has a bug."],
    },
  ],
  materials: [
    { id: "w6-m1", name: "Three-run test record (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w6-m2", name: "Bug Detective worksheet with the three bug families (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w6-m3", name: "Pencil and paper for recording results", paths: ["kit", "simulator", "unplugged"] },
    { id: "w6-m4", name: "A reacting robot built in Week 5, with at least one sensor", paths: ["kit"] },
    { id: "w6-m5", name: "Measuring tape or ruler to set up the same test case each run", paths: ["kit", "unplugged"] },
    { id: "w6-m6", name: "Computer or tablet with the browser simulator", paths: ["simulator"] },
    { id: "w6-m7", name: "Cardboard robot, program cards, and a taped floor course from earlier weeks", paths: ["unplugged"] },
    { id: "w6-m8", name: "Sticky notes or a tally sheet to act as a counter", paths: ["unplugged"], optional: true },
  ],
  activities: [
    {
      id: "w6-a-bug-detective",
      kind: "debug",
      title: "Bug Detective missions",
      goal: "Diagnose a misbehaving robot: decide whether the bug is mechanical, programming, or sensor, then fix it.",
      shared: [
        "For each mission, first write the expected result and the actual result. The gap between them is the symptom you're investigating.",
        "Ask the three-family question: is this physical (mechanical), an instruction (programming), or a sensing problem (sensor)? Use the symptom to guess before you touch anything.",
        "Change ONE thing at a time, run it again, and record whether the actual result now matches the expected result.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Debug a misbehaving kit robot",
          materials: ["A reacting robot from Week 5", "Bug Detective worksheet", "Measuring tape"],
          instructions: [
            "Have an adult or partner secretly introduce one bug into a working robot (loosen a wheel, change a number in a block, or set a bad threshold).",
            "Run the robot and write the expected result and the actual result on the worksheet.",
            "Decide the bug family from the symptom, then investigate the likely causes in order.",
            "Fix the one thing you suspect, re-run, and confirm the actual result now matches the expected result.",
          ],
          safetyNotes: ["Turn the robot off before tightening wheels or moving wires.", "Keep fingers clear of moving parts while it runs."],
          expectedResult: "The student names the correct bug family, makes one targeted fix, and the robot's actual result matches the expected result again.",
          successCriteria: ["Expected and actual results are both written down", "The bug family is correctly identified", "One change was made at a time", "The robot works after the fix"],
          troubleshooting: [
            { problem: "Fixing 'everything' at once so the cause is unknown", fix: "Undo all but one change; make a single change, re-run, and see if that was it." },
            { problem: "Can't decide the bug family", fix: "Run it three times: same wrong result every time points to programming; different results point to mechanical or a shaky sensor." },
          ],
          extension: "Introduce a bug for a partner and see if they can diagnose the family from the symptom alone.",
        },
        simulator: {
          pathId: "simulator",
          title: "Debug a broken program in the simulator",
          materials: ["Browser simulator", "Bug Detective worksheet"],
          instructions: [
            "Open a simulator mission that has a deliberately broken program (a wrong number, a missing block, or a bad sensor threshold).",
            "Predict the expected result, run it, and record the actual result.",
            "Because the sim has no loose wheels, decide whether it's a programming bug or a sensor-threshold bug from the symptom.",
            "Change one block or number, re-run from the same start, and confirm the results now match.",
          ],
          safetyNotes: ["No physical safety concerns; take a screen break if needed."],
          expectedResult: "The student identifies a programming or sensor bug, fixes one block or value, and the robot completes the mission as expected.",
          successCriteria: ["Expected and actual results are both recorded", "The bug family is correctly identified", "Only one block or number was changed per try", "The mission succeeds after the fix"],
          troubleshooting: [
            { problem: "The loop never ends", fix: "That's a programming symptom - check that the repeat-until condition can actually become true." },
            { problem: "The robot ignores the wall", fix: "Read the sensor value in the sim and check the threshold is on the correct side of it - a sensor bug." },
          ],
          extension: "Break a working program yourself, then challenge a classmate to find and name the bug.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Debug a card program acted out on the floor course",
          materials: ["Cardboard robot", "Program cards", "Taped floor course", "Bug Detective worksheet"],
          instructions: [
            "Have a partner slip one bug into a working card program (swap two cards, change a 'move 2' to 'move 4', or write a wrong 'if' rule) or bend the robot's paper bumper.",
            "Write the expected result, then 'run' the program by moving the model card-by-card and record the actual result.",
            "Decide the family: a bent bumper is mechanical, a swapped or wrong card is programming, a wrong 'if' rule is a sensor bug.",
            "Fix one card or one part, re-run, and confirm the results match.",
          ],
          safetyNotes: ["Use child-safe scissors with an adult if you rebuild a bumper."],
          expectedResult: "The student names the correct bug family, fixes one card or part, and the acted-out run matches the expected result.",
          successCriteria: ["Expected and actual results are both written down", "The bug family is correctly identified", "One card or part changed at a time", "The run works after the fix"],
          troubleshooting: [
            { problem: "The 'robot' is run differently each time", fix: "Make each card an exact instruction so the actual result is repeatable - that's how you spot the real bug." },
            { problem: "Not sure if it's a card or the bumper", fix: "Read the cards aloud exactly as written; if they're correct, the bug is mechanical." },
          ],
          extension: "Create a mission where two bugs from different families are hidden at once.",
        },
      },
    },
    {
      id: "w6-a-reliability-trial",
      kind: "test",
      title: "Three-run reliability trial",
      goal: "Prove a robot is reliable by running the same task three times and comparing the expected result to the actual result each run.",
      shared: [
        "Pick one clear task and one test case (the exact same setup every run). Write the expected result once - it's the same for all three runs.",
        "Run the task three times WITHOUT changing anything between runs. Record the actual result and mark Match? (yes or no) for each run.",
        "Three matches means reliable for this test case. Any mismatch is a bug to hunt with the Bug Detective steps.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Reliability trial on the kit robot",
          materials: ["A reacting robot from Week 5", "Three-run test record", "Measuring tape"],
          instructions: [
            "Choose a task like 'stop before the wall' and set the wall at the same distance every run - that's your test case.",
            "Write the expected result: 'robot stops before touching the wall'.",
            "Run it three times from the exact same start, recording the actual result and Match? each time.",
            "If a run doesn't match, diagnose the bug family and fix it, then re-run all three.",
          ],
          safetyNotes: ["Keep the test area clear and stay clear of moving parts.", "Reset the robot to the same start line each run."],
          expectedResult: "A completed three-run table; a reliable robot matches the expected result on all three runs.",
          successCriteria: ["The same test case is used all three runs", "Expected result written once", "Three actual results and Match? recorded", "Any mismatch is investigated"],
          troubleshooting: [
            { problem: "Results drift over the three runs", fix: "Check batteries and the start position - a fading battery is a mechanical/power cause of unreliability." },
            { problem: "It matches twice then fails", fix: "The failing run is your clue - inspect the sensor reading and the physical setup right after that run." },
          ],
          extension: "Add a fourth and fifth run and see whether reliability holds as the battery drains.",
        },
        simulator: {
          pathId: "simulator",
          title: "Reliability trial in the simulator",
          materials: ["Browser simulator", "Three-run test record"],
          instructions: [
            "Pick a mission and set the same start tile and map each run - that's your test case.",
            "Write the expected result before running.",
            "Run the program three times without changing it, recording the actual result and Match? for each run.",
            "If a run differs, find the programming or sensor bug and re-run all three.",
          ],
          safetyNotes: ["Save your work often so a refresh doesn't lose the record."],
          expectedResult: "A completed three-run table showing whether the sim robot behaves the same way each run.",
          successCriteria: ["Same start and map all three runs", "Expected result written once", "Three actual results and Match? recorded", "Any mismatch is investigated"],
          troubleshooting: [
            { problem: "Runs differ even though nothing changed", fix: "Check that the start tile is really identical and the loop ends on a definite condition, not by luck." },
            { problem: "Every run matches perfectly and it feels too easy", fix: "Try a harder test case (closer wall, tighter turn) to see where reliability breaks." },
          ],
          extension: "Change the test case to a harder one and run three more trials to find the limit.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Reliability trial with the card program",
          materials: ["Cardboard robot", "Program cards", "Taped floor course", "Three-run test record"],
          instructions: [
            "Choose a task and a fixed start spot on the floor course - the same test case each run.",
            "Write the expected result, like 'model ends on the finish square'.",
            "Have the same partner 'run' the exact same cards three times, recording the actual result and Match? each run.",
            "If two runs disagree, the steps are ambiguous or a card is wrong - fix it and re-run all three.",
          ],
          safetyNotes: ["Keep the floor course clear so no one trips."],
          expectedResult: "A completed three-run table; a reliable card program lands the model in the same place all three runs.",
          successCriteria: ["Same start and cards all three runs", "Expected result written once", "Three actual results and Match? recorded", "Any mismatch is investigated"],
          troubleshooting: [
            { problem: "Different people get different endings", fix: "Rewrite the cards as exact, unambiguous steps so the actual result is repeatable." },
            { problem: "The same person gets different endings", fix: "Mark the start spot and step lengths so the test case is truly identical each run." },
          ],
          extension: "Swap card programs with another team and run a three-run reliability trial on theirs.",
        },
      },
    },
    {
      id: "w6-a-obstacle-counter",
      kind: "program",
      title: "Obstacle counter",
      goal: "Use a variable as a counter that adds one each time the robot avoids an obstacle, then read the stored value.",
      shared: [
        "Set a counter variable to 0 at the start. Each time the robot senses and avoids an obstacle, add 1 to the counter.",
        "This is a stored value: the counter remembers how many obstacles were handled, and you can check it at the end.",
        "Predict how many obstacles are on the course, then compare your prediction to the counter's final value.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Count avoided obstacles on the kit robot",
          materials: ["A reacting robot from Week 5", "A short obstacle course", "Pencil and paper"],
          instructions: [
            "Set a variable called 'obstacles' to 0 at the start of the program.",
            "Keep a loop that reads the sensor; inside the 'if obstacle' branch, turn to avoid AND add 1 to 'obstacles'.",
            "Run the course, then display or read the final counter value.",
            "Compare the counter to how many obstacles you actually placed.",
          ],
          safetyNotes: ["Keep the course clear of hands and feet while the robot drives."],
          expectedResult: "The counter's final value equals the number of obstacles the robot actually avoided.",
          successCriteria: ["The counter starts at 0", "It adds 1 only when an obstacle is avoided", "The final stored value is read", "It's compared to the real count"],
          troubleshooting: [
            { problem: "The counter is too high", fix: "The robot is adding 1 more than once per obstacle - make sure the count happens once per detection, not every loop." },
            { problem: "The counter stays at 0", fix: "Check that the add-1 step is inside the 'if obstacle' branch, not outside it - a programming bug." },
          ],
          extension: "Add a rule: after the counter reaches 3, the robot stops and signals it's done.",
        },
        simulator: {
          pathId: "simulator",
          title: "Count avoided obstacles in the simulator",
          materials: ["Browser simulator", "Pencil and paper"],
          instructions: [
            "Use a set-variable block to set 'obstacles' to 0 at the start.",
            "In a loop, read the sensor; when it detects an obstacle, turn to avoid it and add 1 to 'obstacles'.",
            "Run the grid mission and read the counter at the end.",
            "Compare the counter to the number of obstacles on the grid.",
          ],
          safetyNotes: ["No physical safety concerns."],
          expectedResult: "The counter equals the number of obstacles the sim robot avoided on the grid.",
          successCriteria: ["A set-variable block starts the counter at 0", "It adds 1 per avoided obstacle", "The final value is read", "It matches the grid's obstacle count"],
          troubleshooting: [
            { problem: "Counter over-counts", fix: "The add-1 fires every loop while touching one obstacle; only count once per new detection." },
            { problem: "Counter never changes", fix: "Confirm the add-1 block is inside the sensor condition, not in the plain loop." },
          ],
          extension: "Store a second variable for 'turns made' and compare it to the counter of obstacles.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Count avoided obstacles with a tally counter",
          materials: ["Cardboard robot", "Program cards", "Obstacles on the floor course", "Tally sheet or sticky notes"],
          instructions: [
            "Write 'counter = 0' at the top of your program cards and keep a tally sheet as the stored value.",
            "As you 'run' the model, each time the 'if bumper touches obstacle, turn' card fires, make one tally mark.",
            "At the end, count the tallies - that's the counter's stored value.",
            "Compare the tally to how many obstacles you placed.",
          ],
          safetyNotes: ["Keep the floor course clear so no one trips on obstacles."],
          expectedResult: "The tally counter matches the number of obstacles the model avoided.",
          successCriteria: ["The counter starts at 0", "One tally is added per avoided obstacle", "The final tally is read as the stored value", "It matches the real count"],
          troubleshooting: [
            { problem: "Too many tallies", fix: "Only tally when the 'turn to avoid' card actually fires, not every step." },
            { problem: "Forgot to reset the counter", fix: "Always start a new run by setting the counter back to 0 - the stored value must begin fresh." },
          ],
          extension: "Add a rule card: 'if counter = 3, stop' and test that the stored value can trigger an action.",
        },
      },
    },
  ],
  predictionPrompts: [
    { id: "w6-p1", prompt: "Before your three-run reliability trial, predict which run (if any) will fail to match the expected result, and why.", howToCheck: "Run all three, record actual vs expected and Match?, and compare your prediction to what really happened." },
    { id: "w6-p2", prompt: "Look at the Bug Detective symptom before touching the robot: predict which family the bug is in - mechanical, programming, or sensor.", howToCheck: "Investigate the likely causes and see whether the family you predicted was the one that fixed it." },
    { id: "w6-p3", prompt: "For the obstacle counter, predict the final stored value before running the course.", howToCheck: "Run the course, read the counter, and compare it to your predicted number and the real obstacle count." },
  ],
  testRecords: [
    {
      id: "w6-tr1",
      title: "Three-run reliability test",
      instructions: "Pick one task and one test case. Write the expected result once, then run the same task three times without changing anything. Record the actual result and whether it matched each run.",
      columns: ["Run", "Expected result", "Actual result", "Match? (Y/N)"],
      rows: 3,
      measure: "Whether the actual result matched the expected result on each of the three runs",
    },
    {
      id: "w6-tr2",
      title: "Bug diagnosis record",
      instructions: "For each debugging mission, record the symptom, which bug family you suspect, the one change you tried, and whether it fixed the mismatch.",
      columns: ["Symptom", "Suspected family", "One change tried", "Fixed? (Y/N)"],
      rows: 3,
      measure: "Which bug family was responsible and whether one targeted change fixed it",
    },
  ],
  debuggingMissions: [
    {
      id: "w6-dm1",
      title: "The robot that spins in place",
      scenario: "A robot that should roll straight forward instead spins on the spot, turning around and around as if one wheel drives forward while the other drives backward.",
      symptom: "Both motors run, but the robot rotates instead of moving forward - it spins the same way every run.",
      hint: "Watch the wheels: both are turning, but in opposite directions, and nothing is loose. Think about how one motor is wired or set, not about the driving commands.",
      bugType: "mechanical",
      likelyCauses: [
        "One motor is plugged in backwards, so its wheel spins the wrong way.",
        "One motor's direction setting is reversed compared to the other.",
        "The two motors are mounted mirror-image but driven as if they face the same way.",
      ],
      fix: "Swap the reversed motor's connection (or flip that one motor's direction setting) so both wheels drive forward together. Re-run and confirm the robot now goes straight instead of spinning.",
    },
    {
      id: "w6-dm2",
      title: "The wall it won't stop for",
      scenario: "A robot should drive forward and stop when its distance sensor says the wall is close, but it rolls right into the wall and keeps pushing without ever stopping.",
      symptom: "Every run, the robot never stops - the actual result is a crash - even though a stop instruction is in the program.",
      hint: "The sensor reads fine and the stop block is there. Read the comparison in the loop out loud: as the wall gets closer, does the condition that should stop the robot ever actually become true?",
      bugType: "programming",
      likelyCauses: [
        "The comparison is reversed - it stops when distance is 'greater than' instead of 'less than', so it is never true as the robot approaches.",
        "The two sides of the comparison are swapped.",
        "The wrong operator (> where < was meant) keeps the stop condition from ever triggering.",
      ],
      fix: "Reverse the comparison operator (or swap its two sides) so the stop condition becomes true when the distance gets small. Re-run and confirm the robot stops before the wall.",
    },
    {
      id: "w6-dm3",
      title: "The counter that counts too much",
      scenario: "A robot drives past three markers and should report a count of 3, but it reports a huge number like 47.",
      symptom: "The counter's final value is far larger than the number of real objects - it grows every loop instead of once per object.",
      hint: "Watch the counter tick up as it drives. Is it adding 1 once per object, or once on every trip through the loop even when there is no new object in front of it?",
      bugType: "programming",
      likelyCauses: [
        "The 'add 1' is outside the 'do I see an object?' check, so it counts every loop.",
        "The counter is never reset to 0 at the start of the run.",
        "The robot sits next to the same object for several loops and counts it each time.",
      ],
      fix: "Reset the counter to 0 at the start, and move the 'add 1' inside the condition that detects a NEW object. Re-run and confirm the final count matches the real number of objects.",
    },
    {
      id: "w6-dm4",
      title: "The line follower that fails in the light",
      scenario: "A line-following robot worked perfectly yesterday. Today, in a much brighter room, it drives straight off the line every time - and the program has not changed.",
      symptom: "The robot ignores the line and does not steer, even though the same code steered correctly under yesterday's lighting.",
      hint: "The code is identical to yesterday's; what changed is the room. Read the live light value on the line and off the line today, and compare both to the threshold in the program.",
      bugType: "sensor",
      likelyCauses: [
        "The light threshold was calibrated for yesterday's darker room and is now wrong.",
        "Brighter light raised all the readings above the threshold, so 'on the line' never registers.",
        "The sensor was not re-calibrated for today's lighting conditions.",
      ],
      fix: "Read today's light values on and off the line, pick a new threshold halfway between them, store that calibration value, and re-run. The robot should follow the line again.",
    },
    {
      id: "w6-dm5",
      title: "The robot that never finishes",
      scenario: "A robot should drive forward, avoid a few obstacles, and then stop at the goal - but it keeps driving and avoiding forever and never finishes, even after it reaches the goal.",
      symptom: "The robot never ends its program - it repeats its avoid-and-drive behavior endlessly with no stop.",
      hint: "The avoiding itself works. The problem is that the robot never leaves the loop. Look for a way out: is there any condition that ends the loop once the goal is reached?",
      bugType: "programming",
      likelyCauses: [
        "The behavior is inside a forever loop with no exit.",
        "A repeat-until has a condition that can never become true.",
        "There is no 'safe stop' or 'mission complete' when the goal is reached.",
      ],
      fix: "Add an exit - a repeat-until that ends at the goal, or an 'if at goal then stop' - so the loop can finish. Re-run and confirm the robot stops once it reaches the goal.",
    },
    {
      id: "w6-dm6",
      title: "The good code that still drifts",
      scenario: "A robot's program is correct and unchanged - it drove straight last week - but now it curves to one side every time it moves forward, even on a short, obstacle-free path.",
      symptom: "Instead of driving straight, the robot drifts to one side the same way every run, though the code has not changed.",
      hint: "It fails the same way every run, but the program is proven correct from last week. Look at the robot's body and wheels, or the simulated surface and setup, before you touch the code.",
      bugType: "mechanical",
      likelyCauses: [
        "A wheel or axle is loose or not fully seated.",
        "A wire or part drags on the floor on one side, or a wheel rubs the frame.",
        "In the simulator, a surface or alignment setting makes one side slip.",
      ],
      fix: "Leave the code alone. Re-seat and tighten both wheels, clear any dragging wire or debris (or reset the simulated surface/alignment). Re-run and confirm it drives straight again.",
    },
    {
      id: "w6-dm7",
      title: "The stop that comes too late",
      scenario: "A robot uses its distance sensor to stop before a wall. At a slow speed it stops perfectly, but when it is sped up it overshoots and bumps the wall - with the exact same threshold.",
      symptom: "At high speed the robot stops too late and hits the wall; at low speed the very same program stops in time.",
      hint: "The threshold that works when slow is not enough when fast - the robot travels further between sensor checks. Think about how the speed and the stopping threshold work together, and change only one of them at a time.",
      bugType: "sensor",
      likelyCauses: [
        "At high speed the robot covers more distance between readings, so a close threshold triggers too late.",
        "The threshold was tuned for a slower speed than the robot is now using.",
        "The sensor is read too rarely to catch the wall in time at speed.",
      ],
      fix: "Change one thing at a time: either lower the driving speed or raise the distance threshold so it stops sooner. Re-run at the target speed and confirm it stops in time.",
    },
  ],
  knowledgeCheck: {
    id: "w6-kc",
    instructions: "Answer these to check that you can debug bugs by family and prove a robot is reliable.",
    passThreshold: 4,
    questions: [
      {
        id: "w6-q6",
        kind: "scenario",
        prompt: "Diagnose the most likely kind of bug.",
        scenario: "A line-following robot worked yesterday. Today it drives straight past the line every time, even though the code has not changed. The room is much brighter today.",
        options: [
          { id: "w6-q6-a", text: "A programming bug", correct: false, feedback: "The code did not change, so the program is probably not the problem." },
          { id: "w6-q6-b", text: "A sensor bug that needs re-calibration", correct: true, feedback: "Right - brighter light changed the readings, so the light threshold needs re-calibrating." },
          { id: "w6-q6-c", text: "A mechanical bug", correct: false, feedback: "Nothing here points to a loose wheel or dragging part." },
          { id: "w6-q6-d", text: "The robot is broken for good", correct: false, feedback: "It is very likely fixable by re-calibrating the sensor to the new lighting." },
        ],
        correctOptionId: "w6-q6-b",
        explanation: "Same code plus changed lighting plus bad readings points to a sensor/calibration bug, not a program or mechanical one.",
      },
      {
        id: "w6-q1",
        kind: "single",
        prompt: "What is debugging?",
        options: [
          { id: "w6-q1-a", text: "Making the robot go faster", correct: false, feedback: "Speed isn't debugging - debugging is about finding and fixing why something goes wrong." },
          { id: "w6-q1-b", text: "Finding out why the actual result is different from the expected result, then fixing it", correct: true, feedback: "Right - debugging is comparing expected to actual and hunting down the cause of the gap." },
          { id: "w6-q1-c", text: "Deleting the whole program and starting over", correct: false, feedback: "Starting over hides the bug instead of finding it, and you'd likely repeat the mistake." },
          { id: "w6-q1-d", text: "Adding more sensors to the robot", correct: false, feedback: "More sensors don't fix a bug you haven't diagnosed yet." },
        ],
        correctOptionId: "w6-q1-b",
        explanation: "Debugging is the detective work of finding why the actual result differs from the expected result, then fixing that cause.",
      },
      {
        id: "w6-q2",
        kind: "single",
        prompt: "A robot drove straight last week. Its program hasn't changed, but now it curves to one side every run. Which bug family is this most likely?",
        options: [
          { id: "w6-q2-a", text: "A programming bug", correct: false, feedback: "The program is unchanged, so the instructions probably aren't the cause." },
          { id: "w6-q2-b", text: "A sensor bug", correct: false, feedback: "Drifting straight-line driving usually isn't about a sensor reading." },
          { id: "w6-q2-c", text: "A mechanical bug", correct: true, feedback: "Correct - a loose wheel or dragging part is a physical (mechanical) cause of veering." },
          { id: "w6-q2-d", text: "There is no bug", correct: false, feedback: "The actual result doesn't match the expected result, so there is a bug to find." },
        ],
        correctOptionId: "w6-q2-c",
        explanation: "When the code is unchanged and the robot veers the same way, suspect a mechanical bug like a loose wheel or dragging wire.",
      },
      {
        id: "w6-q3",
        kind: "single",
        prompt: "What is a counter?",
        options: [
          { id: "w6-q3-a", text: "A sensor that measures distance", correct: false, feedback: "That's a distance sensor, not a counter." },
          { id: "w6-q3-b", text: "A variable that starts at a number and goes up by one each time something happens", correct: true, feedback: "Right - a counter is a variable used to count, adding 1 on each event." },
          { id: "w6-q3-c", text: "A block that makes the robot stop", correct: false, feedback: "That's a stop block; a counter keeps a running total." },
          { id: "w6-q3-d", text: "The robot's battery level", correct: false, feedback: "Battery level isn't a counter you set in your program." },
        ],
        correctOptionId: "w6-q3-b",
        explanation: "A counter is a variable that stores a running count, starting at a number and increasing by one each time an event happens.",
      },
      {
        id: "w6-q4",
        kind: "single",
        prompt: "In a reliability trial, what is the 'expected result'?",
        options: [
          { id: "w6-q4-a", text: "What actually happened when you ran the robot", correct: false, feedback: "That's the actual result - what you observe after running." },
          { id: "w6-q4-b", text: "What SHOULD happen if the program works correctly", correct: true, feedback: "Correct - the expected result is what you predict should happen before you test." },
          { id: "w6-q4-c", text: "The number of sensors the robot has", correct: false, feedback: "That's a count of parts, not the expected result of a run." },
          { id: "w6-q4-d", text: "The fastest possible time", correct: false, feedback: "Speed isn't the expected result unless that's specifically what you're testing." },
        ],
        correctOptionId: "w6-q4-b",
        explanation: "The expected result is what should happen; you compare it to the actual result each run to see if the robot is reliable.",
      },
      {
        id: "w6-q5",
        kind: "single",
        prompt: "Why do you run the same task three times in a reliability trial?",
        options: [
          { id: "w6-q5-a", text: "To prove the robot works again and again, not just once by luck", correct: true, feedback: "Yes - reliability is doing the job correctly repeatedly, and three matching runs are the proof." },
          { id: "w6-q5-b", text: "Because the first two runs are just for practice", correct: false, feedback: "Every run is real data; you record and compare all three." },
          { id: "w6-q5-c", text: "To drain the battery faster", correct: false, feedback: "The point is evidence of reliability, not draining power." },
          { id: "w6-q5-d", text: "Because one run is against the rules", correct: false, feedback: "It's not a rule - one run just can't prove reliability the way repeated runs can." },
        ],
        correctOptionId: "w6-q5-a",
        explanation: "Repeated matching runs prove reliability; if one run's actual result doesn't match the expected result, you've found a bug to fix.",
      },
    ],
  },
  reflection: [
    { id: "w6-r1", prompt: "What did you change because of testing rather than guessing?" },
    { id: "w6-r2", prompt: "How did running the task three times change what you knew about your robot, compared to running it just once?" },
    { id: "w6-r3", prompt: "Why does changing one thing at a time make debugging easier? What went wrong (or right) when you tried it?" },
  ],
  journalPrompts: [
    { id: "w6-j1", prompt: "Fill in your three-run reliability table: the expected result, and the actual result and Match? for each run.", captures: "checklist" },
    { id: "w6-j2", prompt: "For one debugging mission, write the symptom, the bug family, and the one change that fixed it.", captures: "text" },
    { id: "w6-j3", prompt: "Record the final stored value of your obstacle counter and how it compared to the real number of obstacles.", captures: "number" },
  ],
  savedPrograms: [
    {
      id: "w6-prog-counter",
      missionId: "w6-sim-counter",
      title: "Obstacle counter program",
      description: "A program that sets a counter to 0, loops to read the sensor, and adds 1 to the counter each time it avoids an obstacle.",
      expectedBlocks: ["set-variable", "repeat", "if", "read-sensor", "turn-left", "move-forward"],
    },
    {
      id: "w6-prog-debug-stopper",
      missionId: "w6-sim-debug",
      title: "Fix the broken stopper",
      description: "This program is supposed to stop the robot in the square right before the wall, but a wrong value in its distance check makes it stop in the wrong place. Predict the bug family, change the one value in the repeat-until condition, and re-run until it stops correctly.",
      expectedBlocks: ["repeat-until", "read-sensor", "move-forward", "stop"],
    },
  ],
  simulatorMissions: [
    {
      id: "w6-sim-debug",
      title: "Fix the broken stopper",
      objective: "The robot stops in the wrong place because the value in its distance check is off by one. Diagnose whether it's a programming or sensor-threshold bug and fix the one value so it stops in the square right before the wall.",
      grid: { cols: 5, rows: 1 },
      successCriteria: ["The robot stops in the square right before the wall", "Only one value was changed", "The student names the bug family"],
    },
    {
      id: "w6-sim-counter",
      title: "Count and avoid",
      objective: "Drive a grid with obstacles, avoid each one, and use a counter that ends equal to the number of obstacles avoided.",
      grid: { cols: 8, rows: 8 },
      successCriteria: ["The robot avoids every obstacle", "The counter starts at 0 and adds 1 per avoided obstacle", "The final counter matches the obstacle count"],
    },
  ],
  lessonFlow: [
    { id: "w6-f1", kind: "learn", title: "Debugging and the three bug families", focus: "Expected vs actual results, and mechanical, programming, and sensor bugs.", minutes: 15 },
    { id: "w6-f2", kind: "predict", title: "Predict the bug family", focus: "Read each symptom and predict its family before investigating.", minutes: 5 },
    { id: "w6-f3", kind: "debug", title: "Bug Detective missions", focus: "Diagnose and fix mechanical, programming, and sensor bugs, one change at a time.", activityId: "w6-a-bug-detective", minutes: 18 },
    { id: "w6-f4", kind: "program", title: "Obstacle counter", focus: "Use a variable as a counter to track obstacles avoided.", activityId: "w6-a-obstacle-counter", minutes: 12 },
    { id: "w6-f5", kind: "test", title: "Three-run reliability trial", focus: "Run the same task three times, recording expected vs actual and Match?.", activityId: "w6-a-reliability-trial", minutes: 15 },
    { id: "w6-f6", kind: "knowledge-check", title: "Knowledge check", focus: "Five questions on debugging, bug families, counters, and reliability.", minutes: 8 },
    { id: "w6-f7", kind: "reflection", title: "Reflection", focus: "Write about a bug you found and what three runs told you.", minutes: 7 },
  ],
  safetyNotes: [
    { id: "w6-s1", text: "Turn the robot off before tightening wheels, moving wires, or checking mechanical parts.", severity: "caution", paths: ["kit"] },
    { id: "w6-s2", text: "Keep the test and obstacle course clear of hands, feet, and clutter during runs.", severity: "caution", paths: ["kit", "unplugged"] },
    { id: "w6-s3", text: "Use child-safe scissors with an adult if you rebuild a paper bumper or model part.", severity: "info", paths: ["unplugged"] },
    { id: "w6-s4", text: "Save your program and test record often so a browser refresh doesn't lose your results.", severity: "info", paths: ["simulator"] },
  ],
  printableResources: [
    { id: "w6-pr1", kind: "worksheet", title: "Three-run reliability test record", description: "A table for the expected result and the actual result and Match? across three runs." },
    { id: "w6-pr2", kind: "worksheet", title: "Bug Detective sheet", description: "A guide to the three bug families with space to record symptom, suspected family, the one change tried, and the fix." },
    { id: "w6-pr3", kind: "journal-page", title: "Debugging and counter journal page", description: "Space to record a diagnosed bug and the obstacle counter's final stored value." },
    { id: "w6-pr4", kind: "teacher-guide", title: "Week 6 teacher guide", description: "Setup, how to seed bugs, facilitation, misconceptions, and questions to ask for the debugging and reliability lesson." },
  ],
  completion: {
    summary: "Finish Week 6 by diagnosing a mechanical, a programming, and a sensor bug, running a three-run reliability trial, and passing the knowledge check.",
    requirements: [
      { id: "w6-cr1", label: "Diagnose and fix at least one bug from each family, recording the symptom and fix", sectionKind: "debug" },
      { id: "w6-cr2", label: "Complete a three-run reliability trial with expected vs actual recorded", sectionKind: "test" },
      { id: "w6-cr3", label: "Use a counter variable to track obstacles avoided", sectionKind: "program" },
      { id: "w6-cr4", label: "Score at least 4 of 5 on the knowledge check", sectionKind: "knowledge-check" },
      { id: "w6-cr5", label: "Write your reflection", sectionKind: "reflection" },
    ],
  },
  teacherGuidance: {
    setup: [
      "Print the three-run test record and the Bug Detective sheet, one per student or pair.",
      "Have last week's reacting robots (or sim missions / card programs) ready to debug.",
      "Set up a repeatable test case: mark a start line and a fixed wall or obstacle distance so runs are truly identical.",
    ],
    prep: [
      "Prepare one seeded bug of each family in advance: loosen a wheel (mechanical), change a turn number (programming), and set a bad threshold (sensor).",
      "Practice reading the live sensor value on your kit or in the sim so you can coach threshold fixes.",
      "Decide how students will 'add 1' to a counter on your equipment, and try the obstacle-counter program once yourself.",
    ],
    facilitation: [
      "Teach expected vs actual and the three bug families before any robot is touched.",
      "Have students predict the bug family from the symptom first, then investigate - resist letting them randomly poke.",
      "Insist on changing one thing at a time and re-running, so the cause of the fix is known.",
      "Protect time for the full three-run reliability trial; a single lucky run is not proof.",
    ],
    commonMisconceptions: [
      "'It worked once, so it's fixed' - reliability needs repeated matching runs, not one.",
      "Assuming every bug is in the code - many are mechanical (loose wheel, dragging wire) or sensor (wrong threshold).",
      "Changing several things at once, so no one can tell which change actually fixed it.",
      "Thinking a variable and a counter are different things - a counter is just a variable used to count.",
    ],
    questionsToAsk: [
      "What did you expect to happen, and what actually happened?",
      "Does it fail the same way every run, or only sometimes? What does that tell you about the family?",
      "What is the ONE thing you changed, and did it match your prediction?",
      "How do you know your robot is reliable and didn't just get lucky?",
    ],
    easierVersion: "Give students one seeded bug at a time with the family already named, so they practice the fix and the three-run test without also diagnosing the family.",
    harderVersion: "Seed two bugs from different families at once, or require a counter that triggers an action (like stopping after 3 obstacles) that students must also test for reliability.",
  },
  nextWeek: {
    moduleId: "week-7",
    teaser: "Next week we put reliability to work: planning a full autonomous mission the robot runs safely on its own.",
    prepare: [
      "Keep your three-run test record and Bug Detective sheet - reliable behavior is the foundation for next week's mission.",
      "Think about a job your robot could do start-to-finish without anyone steering it.",
      "Charge your kit, bookmark the simulator, or gather your cardboard robot and course.",
    ],
  },
}

/* ========================================================================== */
/* WEEK 7                                                                      */
/* ========================================================================== */

export const roboticsWeek7: RoboticsModule = {
  id: "week-7",
  slug: "planning-an-autonomous-mission",
  week: 7,
  order: 7,
  title: "Planning an Autonomous Mission",
  subtitle: "Turn a real job into a plan: requirements, constraints, a flowchart, and a safe autonomous mission.",
  summary:
    "Students learn how engineers plan a robot's job before they build it. They tell autonomous systems (which decide for themselves with sensors and a program) from remote-controlled ones (which a person steers), then write requirements, constraints, and criteria for a mission and weigh the trade-offs. They draw a flowchart of an autonomous program - action boxes and decision diamonds, including a safe stop - and run a short guided practice mission as a rehearsal for next week's final project.",
  mainMission:
    "Plan an autonomous mission with requirements, constraints, and a flowchart, then rehearse it with a short guided practice mission.",
  estimatedTime: "60-75 minutes",
  learningGoals: [
    { id: "w7-g1", text: "Explain the difference between an autonomous system and a remote-controlled one" },
    { id: "w7-g2", text: "Write requirements, constraints, and success criteria for a robot mission" },
    { id: "w7-g3", text: "Describe a trade-off in a robot plan and choose using the engineering design process" },
    { id: "w7-g4", text: "Draw a flowchart of an autonomous program with action boxes, decision diamonds, and a safe stop" },
    { id: "w7-g5", text: "Run a short guided autonomous mission and compare the result to its success criteria" },
  ],
  vocabulary: [
    { term: "Autonomous", definition: "Acting on its own: the robot uses its sensors and a program to decide what to do, with no person steering it." },
    { term: "Remote-controlled", definition: "Steered by a person in real time, moment by moment, for example with a joystick or an app." },
    { term: "Requirement", definition: "Something the robot MUST do to count as doing the mission, like 'reach the drop-off zone'." },
    { term: "Constraint", definition: "A limit you have to work inside, like time, size, materials, or budget." },
    { term: "Criteria", definition: "The measures you use to judge success, like 'stops within 5 cm of the wall' or 'finishes in under 30 seconds'." },
    { term: "Trade-off", definition: "Giving up some of one good thing to get more of another, like going slower to be more reliable." },
    { term: "Engineering design process", definition: "The repeating cycle engineers use: plan, build, test, and improve." },
    { term: "Iteration", definition: "One trip around the design cycle - testing your plan or robot, finding a problem, and improving it." },
    { term: "Efficiency", definition: "Doing the job well with less: fewer steps, less time, or less energy." },
    { term: "Safe stop", definition: "A programmed behavior that halts the robot safely when the job is done or something is in the way." },
    { term: "Responsible robotics", definition: "Thinking about safety and about when a human should stay in control instead of the robot." },
    { term: "Flowchart", definition: "A step-by-step diagram of a program that uses boxes for actions and diamonds for decisions." },
  ],
  prerequisites: [
    { moduleId: "week-4", reason: "A mission plan has to say which sensor the robot uses as an input, introduced in Week 4." },
    { moduleId: "week-5", reason: "The flowchart and practice mission use loops and conditions to react to the world, taught in Week 5." },
    { moduleId: "week-6", reason: "Judging a plan by success criteria and running it more than once builds on the reliability and testing habits from Week 6." },
  ],
  concepts: [
    {
      id: "w7-c1",
      title: "Autonomous vs remote-controlled",
      body: [
        "There are two ways a robot can do a job. When it is remote-controlled, a person steers it in real time, deciding every move. When it is autonomous, the robot runs its own program and uses its sensors to decide for itself, with no one steering.",
        "This week is about autonomous missions, because next week you will build a robot that has to do its job by itself. That means all the deciding has to be planned ahead of time and written into the program.",
      ],
      examples: ["Autonomous: a robot vacuum, a Mars rover doing a planned drive, a delivery robot on a sidewalk", "Remote-controlled: an RC car, a camera drone on a joystick, a rescue robot a person drives by video"],
    },
    {
      id: "w7-c2",
      title: "Requirements, constraints, and criteria",
      body: [
        "Before you build, you plan. A requirement is what the robot MUST do - 'carry the block to the blue zone'. A constraint is a limit you have to work inside - 'in under 30 seconds', 'using only one sensor', 'no bigger than a shoebox'. Criteria are how you will judge success - 'stops inside the zone' and 'never bumps the wall'.",
        "Writing these down first keeps a plan honest. If you can't tell whether the robot did the job, your criteria aren't clear enough yet.",
      ],
      examples: ["Requirement: 'find the target and stop'", "Constraint: 'finish in under one minute'", "Criteria: 'stops within 5 cm of the target'"],
    },
    {
      id: "w7-c3",
      title: "Trade-offs and the engineering design process",
      body: [
        "You almost never get everything at once. A trade-off is giving up some of one thing to get more of another. A robot that drives fast might miss the sensor reading and crash; slowing it down trades speed for reliability. There is rarely one 'right' answer - you choose the trade-off that best fits your requirements and constraints.",
        "Engineers handle this with the engineering design process: plan, build, test, improve - then go around again. Each trip around is an iteration. You also think about efficiency: doing the job with fewer steps, less time, or less energy, without breaking your criteria.",
      ],
      examples: ["Fast vs reliable", "Simple program vs handling more obstacles", "Fewer steps (efficient) vs more careful checks"],
    },
    {
      id: "w7-c4",
      title: "Flowcharts: mapping the program before you code it",
      body: [
        "A flowchart is a picture of your program's steps. Actions go in rectangles ('drive forward', 'stop'). Decisions go in diamonds and ask a yes/no question ('Wall ahead?'), with one arrow out for 'yes' and one for 'no'. Arrows connect the boxes so you can follow the path the robot will take.",
        "Drawing the flowchart first lets you find problems before you build. A good autonomous flowchart always includes a loop that keeps checking a sensor and a clear ending - which is where your safe stop goes.",
      ],
      examples: ["Rectangle = action", "Diamond = a yes/no decision", "Arrows = the order of steps"],
    },
    {
      id: "w7-c5",
      title: "Safe stopping and responsible robotics",
      body: [
        "An autonomous robot decides on its own, so it needs a way to stop safely - a programmed behavior that halts it when the job is done or when something (or someone) is in the way. Without a safe stop, an autonomous robot can keep driving into a wall or a person.",
        "This is part of responsible robotics: thinking about safety and about when a human should stay in control. Autonomous robots are great at dull, repeating jobs, but for anything risky - near people, or where a mistake could hurt someone - a person should be able to supervise, take over, or shut it down.",
        "Responsible designers also think about privacy - a robot with a camera or microphone collects information about people, so you only collect what the job truly needs. They plan for failure: if a system breaks, who is responsible, and does it fail safely by stopping rather than charging ahead? And they decide which jobs a robot should only assist a person with instead of controlling alone - a robot might hand a nurse a tool, but a person makes the medical decision.",
        "Finally, good robots are designed for different users and needs - the people who use them may be young or old, may not read the same language, or may need larger buttons, sound, or lights. Designing for real, varied users is part of doing robotics responsibly.",
      ],
      examples: ["Robot vacuum stops and backs up at a stair edge", "A delivery robot pauses when a person steps in front", "A person keeps a hand near the stop button during testing", "A home robot only records what it needs and asks before it does", "An alert uses both a light and a sound so more people can notice it"],
    },
    {
      id: "w7-c6",
      title: "Autonomous robots in the real world",
      body: [
        "Autonomous robots already do real jobs - almost always dull, dirty, or dangerous ones, and almost always with people supervising. Looking at real examples helps you plan your own mission: each one senses the world, decides with a program, acts, and has a way to stop safely.",
        "As you read these, notice the pattern from Week 1: input (a sensor), processing (a decision), output (an action) - plus a safe stop and a human who can step in.",
      ],
      examples: [
        "Warehouse delivery robots carry shelves to workers, sensing other robots to avoid bumping",
        "Mars rovers drive planned routes on their own because commands from Earth take minutes to arrive",
        "Agricultural robots roll down crop rows to check plants or pull weeds",
        "Search-and-rescue robots enter rubble or smoke that is too dangerous for people",
        "Underwater inspection robots check pipes, hulls, and cables where a diver cannot safely go",
        "Factory robotic arms weld and assemble the same part precisely, over and over, behind a safety guard",
        "Robotic surgical tools let a surgeon work with steadier, smaller movements - the surgeon stays in control the whole time",
      ],
    },
  ],
  materials: [
    { id: "w7-m1", name: "Mission Planning Brief worksheet (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w7-m2", name: "Flowchart page with action boxes and decision diamonds (printable)", paths: ["kit", "simulator", "unplugged"] },
    { id: "w7-m3", name: "Pencil, eraser, and paper", paths: ["kit", "simulator", "unplugged"] },
    { id: "w7-m4", name: "A short marked course or 'zone' to drive to (tape, cups, or a box)", paths: ["kit", "unplugged"] },
    { id: "w7-m5", name: "A programmable robot kit with at least one sensor", paths: ["kit"] },
    { id: "w7-m6", name: "Computer or tablet with the browser simulator", paths: ["simulator"] },
    { id: "w7-m7", name: "Cardboard robot model and program cards from earlier weeks", paths: ["unplugged"] },
    { id: "w7-m8", name: "Stopwatch or timer, to check a time constraint", paths: ["kit", "simulator", "unplugged"], optional: true },
  ],
  activities: [
    {
      id: "w7-a-mission-plan",
      kind: "design",
      title: "Write a mission plan",
      goal: "Turn a small autonomous job into a plan: requirements, constraints, success criteria, and one trade-off you had to weigh.",
      shared: [
        "Pick one small autonomous mission, like 'drive to the zone and stop' or 'search until you find the target'. Write it at the top of the Mission Planning Brief.",
        "Fill in the brief: requirements (what it MUST do), constraints (limits like time, size, or one sensor), and criteria (how you'll judge success). Then name one trade-off you had to weigh, such as speed vs reliability.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Plan a mission for your kit robot",
          materials: ["Mission Planning Brief worksheet", "The kit robot for reference", "A marked zone or short course"],
          instructions: [
            "Choose a mission your kit can actually do this week, like drive to a taped zone and stop.",
            "Write the requirements, then the constraints your kit sets (its speed, its one sensor, the space you have).",
            "Write measurable success criteria, then name one trade-off - for example, driving slower to read the sensor reliably.",
          ],
          safetyNotes: ["Plan on paper this step; keep the robot switched off while you plan."],
          expectedResult: "A completed brief with at least two requirements, two constraints, two measurable criteria, and one named trade-off.",
          successCriteria: ["Requirements say what the robot MUST do", "Constraints list real limits", "Criteria are measurable (a number or a clear yes/no)", "One trade-off is named"],
          troubleshooting: [{ problem: "Requirements and constraints look the same", fix: "A requirement is a job ('reach the zone'); a constraint is a limit ('in under 30 seconds'). Sort each line into one or the other." }],
          extension: "Add a second, harder version of the mission and list what new requirement it adds.",
        },
        simulator: {
          pathId: "simulator",
          title: "Plan a grid mission for the simulator",
          materials: ["Mission Planning Brief worksheet", "Browser simulator for reference"],
          instructions: [
            "Choose a grid mission, like 'reach the goal tile and stop' or 'search the row until the sensor spots the target'.",
            "Write the requirements, then the constraints the grid sets (its size, one sensor block, a step limit).",
            "Write measurable criteria (reaches the goal tile, stops there), then name one trade-off, like using more steps to avoid walls.",
          ],
          safetyNotes: ["No physical safety concerns; take a screen break if needed."],
          expectedResult: "A completed brief for a grid mission with clear requirements, constraints, criteria, and one trade-off.",
          successCriteria: ["Requirements say what the robot MUST do", "Constraints list real limits", "Criteria are measurable", "One trade-off is named"],
          troubleshooting: [{ problem: "Criteria can't be checked in the sim", fix: "Write criteria the simulator can show, like 'lands on the goal tile' or 'stops before the edge'." }],
          extension: "Plan the same mission on a bigger grid and note which constraint gets harder.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Plan a floor-course mission for your model",
          materials: ["Mission Planning Brief worksheet", "Cardboard robot model", "A taped floor path or zone"],
          instructions: [
            "Choose a mission your model can 'walk' along a taped path, like 'reach the box and stop'.",
            "Write the requirements, then the constraints (path length, one stand-in sensor like a paper bumper, a time limit).",
            "Write measurable criteria you can watch for, then name one trade-off, like fewer steps vs checking the bumper more often.",
          ],
          safetyNotes: ["Keep the floor path clear so no one trips while acting out the mission."],
          expectedResult: "A completed brief for a floor-course mission with clear requirements, constraints, criteria, and one trade-off.",
          successCriteria: ["Requirements say what the robot MUST do", "Constraints list real limits", "Criteria are measurable", "One trade-off is named"],
          troubleshooting: [{ problem: "No clear way to judge success", fix: "Add a physical marker, like a taped 'zone', so success is something you can see and point to." }],
          extension: "Swap briefs with another team and check if their criteria are clear enough to judge.",
        },
      },
    },
    {
      id: "w7-a-flowchart",
      kind: "design",
      title: "Draw the mission flowchart",
      goal: "Turn the mission plan into a flowchart with action boxes, at least one decision diamond, a loop that checks a sensor, and a safe stop.",
      shared: [
        "On the flowchart page, start at a 'Start' box and end at a 'Safe stop' box. Put actions in rectangles and each yes/no decision in a diamond, with a 'yes' arrow and a 'no' arrow.",
        "Your autonomous flowchart must keep checking a sensor (a loop) and must end at a safe stop - the robot stops when the job is done or something is in the way.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Flowchart your kit mission",
          materials: ["Flowchart page", "Your completed Mission Planning Brief"],
          instructions: [
            "Write the mission's steps in order: Start, then the actions (drive forward, etc.).",
            "Add a decision diamond for the sensor check, like 'Wall ahead?', with a 'yes' path and a 'no' path.",
            "Loop the 'no' path back to keep driving and checking; send the 'yes' path to the Safe stop box.",
          ],
          safetyNotes: ["This is a paper step; no robot needs to run yet."],
          expectedResult: "A flowchart from Start to Safe stop with action boxes, at least one decision diamond, a loop back, and a clear stop.",
          successCriteria: ["Actions are in rectangles", "At least one decision is a diamond with yes/no arrows", "A loop keeps checking the sensor", "It ends at a safe stop"],
          troubleshooting: [{ problem: "The flowchart never stops", fix: "Every autonomous flowchart needs an exit - send one arrow from a decision to the Safe stop box." }],
          extension: "Add a second decision diamond so the robot handles two different sensor readings.",
        },
        simulator: {
          pathId: "simulator",
          title: "Flowchart your grid mission",
          materials: ["Flowchart page", "Your completed Mission Planning Brief"],
          instructions: [
            "List the grid mission's steps: Start, then movement actions across the grid.",
            "Add a decision diamond for the sensor block, like 'Goal reached?' or 'Obstacle ahead?', with yes/no arrows.",
            "Loop the 'no' path back to keep moving and checking; send the 'yes' path to the Safe stop box.",
          ],
          safetyNotes: ["No physical safety concerns."],
          expectedResult: "A flowchart that matches a program you could build in the simulator, ending at a safe stop.",
          successCriteria: ["Actions are in rectangles", "At least one decision is a diamond with yes/no arrows", "A loop keeps checking the sensor", "It ends at a safe stop"],
          troubleshooting: [{ problem: "Not sure which block is the decision", fix: "The decision is wherever the program asks a sensor a yes/no question - that becomes a diamond." }],
          extension: "Map the flowchart directly onto the simulator's repeat-until and if blocks before you build it.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Flowchart your floor-course mission",
          materials: ["Flowchart page", "Your completed Mission Planning Brief"],
          instructions: [
            "Write the steps of the floor mission in order, starting at a Start box.",
            "Add a decision diamond for the stand-in sensor check, like 'Bumper touching wall?', with yes/no arrows.",
            "Loop 'no' back to keep moving and checking; send 'yes' to the Safe stop box.",
          ],
          safetyNotes: ["Paper step only; act it out later with a partner."],
          expectedResult: "A hand-drawn flowchart from Start to Safe stop that a partner could follow to run the mission.",
          successCriteria: ["Actions are in rectangles", "At least one decision is a diamond with yes/no arrows", "A loop keeps checking the sensor", "It ends at a safe stop"],
          troubleshooting: [{ problem: "A partner gets confused following it", fix: "Make each box one exact action, and make sure every diamond has exactly two labeled arrows." }],
          extension: "Turn each flowchart box into a program card for the next activity.",
        },
      },
    },
    {
      id: "w7-a-practice-mission",
      kind: "program",
      title: "Guided autonomous practice mission",
      goal: "Run a short autonomous mission - drive to a zone, react to one obstacle, and stop safely - as a rehearsal for next week's final project.",
      shared: [
        "Build the program straight from your flowchart: a sequence to drive, a loop that keeps checking one sensor, a condition that reacts to an obstacle, and a safe stop when the robot reaches the zone or hits the obstacle.",
        "Run it, watch it against your success criteria, and note one thing you would improve - that improve step is an iteration, exactly what you'll do more of next week.",
      ],
      variants: {
        kit: {
          pathId: "kit",
          title: "Run the practice mission on your kit robot",
          materials: ["Robot kit with one sensor", "Marked zone or short course", "Your flowchart"],
          instructions: [
            "Set up a short course: a start line, a zone to reach, and one obstacle in the path.",
            "Program a drive-forward sequence, a loop that checks the distance or touch sensor, a condition that reacts to the obstacle, and a safe stop at the zone.",
            "Run it once from the start line and check it against your success criteria; note one improvement.",
          ],
          safetyNotes: ["Keep the test area clear and keep fingers away from the wheels while it runs.", "Be ready to stop the robot if it heads off the course."],
          expectedResult: "The kit robot drives to the zone, reacts to the obstacle, and stops safely instead of pushing through it.",
          successCriteria: ["Reaches the zone", "Reacts to the obstacle instead of ignoring it", "Stops safely (does not keep driving)", "One improvement noted"],
          troubleshooting: [
            { problem: "Robot ignores the obstacle", fix: "Check the sensor threshold and that the loop keeps reading the sensor, like the reliability work in Week 6." },
            { problem: "Robot overshoots the zone", fix: "Slow the drive speed or add a distance check before the stop - a speed-for-reliability trade-off." },
          ],
          extension: "Move the obstacle to a new spot and confirm the robot still reacts and stops.",
        },
        simulator: {
          pathId: "simulator",
          title: "Run the practice mission in the simulator",
          materials: ["Browser simulator", "Your flowchart"],
          instructions: [
            "Set up a grid with a start tile, a goal zone, and one obstacle in the way.",
            "Build the program: movement blocks, a repeat-until loop that checks the sensor block, an if condition for the obstacle, and a stop block at the goal.",
            "Run it from the start tile, compare it to your success criteria, and note one improvement.",
          ],
          safetyNotes: ["No physical safety concerns; save your program so a refresh doesn't lose it."],
          expectedResult: "The simulator robot reaches the goal zone, reacts to the obstacle, and stops when done.",
          successCriteria: ["Reaches the goal zone", "Reacts to the obstacle instead of ignoring it", "Stops safely when done", "One improvement noted"],
          troubleshooting: [
            { problem: "Robot drives through the obstacle", fix: "Make sure the if condition reads the sensor inside the loop, before the move." },
            { problem: "Loop never ends", fix: "Check the repeat-until condition actually becomes true when the robot reaches the goal." },
          ],
          extension: "Add a second obstacle and confirm the same program still finishes safely.",
        },
        unplugged: {
          pathId: "unplugged",
          title: "Run the practice mission with cards and a partner",
          materials: ["Cardboard robot model", "Program cards", "Taped floor course with a zone and one obstacle", "Your flowchart"],
          instructions: [
            "Lay out a start line, a zone, and one obstacle on the floor with tape.",
            "Turn your flowchart into program cards: move-forward cards, a repeat, an if-card for the stand-in sensor ('if bumper touches obstacle, turn'), and a stop card at the zone.",
            "Have a partner 'run' the cards by moving the model step-by-step; check it against the criteria and note one improvement.",
          ],
          safetyNotes: ["Keep the floor course clear so the person moving the model doesn't trip."],
          expectedResult: "A partner can follow the cards to drive the model to the zone, react to the obstacle, and stop.",
          successCriteria: ["Reaches the zone", "Reacts to the obstacle instead of ignoring it", "Stops safely at the end", "One improvement noted"],
          troubleshooting: [
            { problem: "The partner runs it differently than you meant", fix: "Make each card one exact instruction, like the Week 3 sequences, so there is only one way to read it." },
            { problem: "There is no obstacle reaction", fix: "Add an if-card that says what to do when the bumper touches the obstacle." },
          ],
          extension: "Trade card programs with another team and run each other's practice missions.",
        },
      },
    },
  ],
  predictionPrompts: [
    { id: "w7-p1", prompt: "Before you run it, predict: will your practice mission meet all of its success criteria on the first try, and which criterion is most likely to fail?", howToCheck: "Run the guided practice mission and compare what happens to each success criterion you wrote in your brief." },
  ],
  testRecords: [
    {
      id: "w7-tr1",
      title: "Practice mission vs its criteria",
      instructions: "Run the guided practice mission from the same start each time. For each run, record what happened and check it against the success criteria in your brief.",
      columns: ["Run", "Reached the zone? (Y/N)", "Reacted to obstacle? (Y/N)", "Stopped safely? (Y/N)", "What to improve"],
      rows: 2,
      measure: "Whether each success criterion was met, and what to change for the final project",
    },
  ],
  debuggingMissions: [],
  knowledgeCheck: {
    id: "w7-kc",
    instructions: "Answer these to check that you can plan an autonomous mission and read a flowchart.",
    passThreshold: 4,
    questions: [
      {
        id: "w7-q1",
        kind: "single",
        prompt: "A delivery robot drives to a drop-off zone by itself, using its sensors and program, with no one steering. This robot is:",
        options: [
          { id: "w7-q1-a", text: "Remote-controlled", correct: false, feedback: "Remote-controlled means a person steers it in real time - here no one is steering." },
          { id: "w7-q1-b", text: "Autonomous", correct: true, feedback: "Right - it uses its own sensors and program to decide, with no person steering." },
          { id: "w7-q1-c", text: "Not a robot", correct: false, feedback: "It senses, decides, and acts, so it is a robot." },
          { id: "w7-q1-d", text: "Broken", correct: false, feedback: "Doing the job on its own is exactly what an autonomous robot should do." },
        ],
        correctOptionId: "w7-q1-b",
        explanation: "An autonomous system uses its own sensors and program to decide, with no person steering; a remote-controlled one is driven by a person in real time.",
      },
      {
        id: "w7-q2",
        kind: "single",
        prompt: "'The robot must reach the blue zone' and 'it has to finish in under 30 seconds'. Which is the requirement and which is the constraint?",
        options: [
          { id: "w7-q2-a", text: "Reaching the zone is the requirement; the 30-second limit is the constraint", correct: true, feedback: "Correct - a requirement is what it MUST do; a constraint is a limit you work inside." },
          { id: "w7-q2-b", text: "Reaching the zone is the constraint; the 30-second limit is the requirement", correct: false, feedback: "It's the other way around: reaching the zone is the job (requirement); the time limit is the constraint." },
          { id: "w7-q2-c", text: "Both are constraints", correct: false, feedback: "One of them is the job the robot must do, which makes it a requirement." },
          { id: "w7-q2-d", text: "Both are requirements", correct: false, feedback: "A time limit is a limit you work inside, which is a constraint, not a job to do." },
        ],
        correctOptionId: "w7-q2-a",
        explanation: "A requirement is what the robot MUST do; a constraint is a limit like time, size, materials, or budget that you have to work inside.",
      },
      {
        id: "w7-q3",
        kind: "single",
        prompt: "In a flowchart, what does a diamond shape mean?",
        options: [
          { id: "w7-q3-a", text: "An action the robot takes", correct: false, feedback: "Actions go in rectangles, not diamonds." },
          { id: "w7-q3-b", text: "A yes/no decision", correct: true, feedback: "Yes - a diamond asks a yes/no question and has one arrow out for each answer." },
          { id: "w7-q3-c", text: "The end of the program", correct: false, feedback: "The end is usually a stop box, not a decision diamond." },
          { id: "w7-q3-d", text: "How long a step takes", correct: false, feedback: "A flowchart shows steps and decisions, not timing, inside the shapes." },
        ],
        correctOptionId: "w7-q3-b",
        explanation: "In a flowchart, rectangles hold actions and diamonds hold yes/no decisions, each with a 'yes' arrow and a 'no' arrow.",
      },
      {
        id: "w7-q4",
        kind: "single",
        prompt: "Your robot drives fast but sometimes misses its sensor reading and crashes. You slow it down so it reads reliably. This choice is an example of a:",
        options: [
          { id: "w7-q4-a", text: "Requirement", correct: false, feedback: "This isn't a job the robot must do; it's a choice between two good things." },
          { id: "w7-q4-b", text: "Trade-off", correct: true, feedback: "Correct - you gave up some speed to get more reliability. That's a trade-off." },
          { id: "w7-q4-c", text: "Safe stop", correct: false, feedback: "A safe stop is a programmed halt; changing the speed is a design trade-off." },
          { id: "w7-q4-d", text: "Constraint", correct: false, feedback: "A constraint is a fixed limit; here you chose to give up speed for reliability." },
        ],
        correctOptionId: "w7-q4-b",
        explanation: "A trade-off is giving up some of one thing (speed) to get more of another (reliability) - engineers weigh these using the design process.",
      },
      {
        id: "w7-q5",
        kind: "single",
        prompt: "Why does an autonomous robot need a safe stop in its program?",
        options: [
          { id: "w7-q5-a", text: "So it looks finished", correct: false, feedback: "A safe stop is about safety and control, not appearances." },
          { id: "w7-q5-b", text: "So it halts safely when the job is done or something is in the way, instead of driving into it", correct: true, feedback: "Right - since no one is steering, the program itself must stop the robot safely." },
          { id: "w7-q5-c", text: "So it can move faster", correct: false, feedback: "A safe stop halts the robot; it has nothing to do with speed." },
          { id: "w7-q5-d", text: "So it never needs a sensor", correct: false, feedback: "A safe stop usually depends on a sensor to know when to stop." },
        ],
        correctOptionId: "w7-q5-b",
        explanation: "Because an autonomous robot decides on its own, its program needs a safe stop so it halts when the job is done or something is in the way - part of responsible robotics.",
      },
    ],
  },
  reflection: [
    { id: "w7-r1", prompt: "Which was harder to write for your mission - the requirements, the constraints, or the criteria - and why?" },
    { id: "w7-r2", prompt: "Describe one trade-off in your plan. What did you give up, and what did you get in return?" },
    { id: "w7-r3", prompt: "Responsible robotics: name one job where an autonomous robot really helps, and one situation where a human should stay in control instead. Explain your thinking." },
  ],
  journalPrompts: [
    { id: "w7-j1", prompt: "Write your mini planning brief: the mission, its requirements, its constraints, and its success criteria.", captures: "text" },
    { id: "w7-j2", prompt: "Draw the flowchart of your autonomous mission with action boxes, at least one decision diamond, and a safe stop.", captures: "sketch" },
    { id: "w7-j3", prompt: "After the practice run, check off which success criteria your mission met.", captures: "checklist" },
  ],
  savedPrograms: [
    {
      id: "w7-prog-practice",
      missionId: "w7-sim-practice",
      title: "Guided practice mission program",
      description: "The autonomous practice program built from your flowchart: drive forward, a loop that keeps checking a sensor, a condition that reacts to an obstacle, and a safe stop at the zone.",
      expectedBlocks: ["move-forward", "repeat-until", "if", "read-sensor", "stop"],
    },
  ],
  simulatorMissions: [
    {
      id: "w7-sim-practice",
      title: "Drive-to-zone practice mission",
      objective: "Drive to the goal zone by itself, react to one obstacle in the way, and stop safely when you arrive.",
      grid: { cols: 6, rows: 6 },
      successCriteria: ["Robot reaches the goal zone", "Robot reacts to the obstacle instead of driving through it", "Robot stops safely when it arrives"],
    },
    {
      id: "w7-sim-search",
      title: "Search-and-stop practice mission",
      objective: "Search along the row until the sensor detects the target, then stop safely on the spot.",
      grid: { cols: 6, rows: 6 },
      successCriteria: ["Robot keeps searching until the sensor detects the target", "Robot stops as soon as it finds the target", "Robot does not run off the edge of the grid"],
    },
  ],
  lessonFlow: [
    { id: "w7-f1", kind: "learn", title: "Autonomous vs remote-controlled, and planning words", focus: "Autonomous vs remote-controlled; requirements, constraints, criteria, trade-offs, and the design process.", minutes: 15 },
    { id: "w7-f2", kind: "learn", title: "Write a mission plan", focus: "Requirements, constraints, criteria, and one trade-off on the planning brief.", activityId: "w7-a-mission-plan", minutes: 15 },
    { id: "w7-f3", kind: "learn", title: "Draw the mission flowchart", focus: "Action boxes, a decision diamond, a loop, and a safe stop.", activityId: "w7-a-flowchart", minutes: 12 },
    { id: "w7-f4", kind: "predict", title: "Predict the result", focus: "Predict whether the mission will meet its criteria and which is likeliest to fail.", minutes: 3 },
    { id: "w7-f5", kind: "program", title: "Guided autonomous practice mission", focus: "Run the drive-to-zone, react, and safe-stop rehearsal.", activityId: "w7-a-practice-mission", minutes: 15 },
    { id: "w7-f6", kind: "test", title: "Check against the criteria", focus: "Record the run and compare it to the success criteria.", minutes: 5 },
    { id: "w7-f7", kind: "knowledge-check", title: "Knowledge check", focus: "Five questions on planning, autonomy, flowcharts, and safe stops.", minutes: 8 },
    { id: "w7-f8", kind: "reflection", title: "Reflection", focus: "Trade-offs and responsible robotics.", minutes: 7 },
  ],
  safetyNotes: [
    { id: "w7-s1", text: "During the practice run, keep the test area clear and stay ready to stop the robot if it leaves the course; keep fingers away from moving wheels.", severity: "caution", paths: ["kit"] },
    { id: "w7-s2", text: "Always program a safe stop so an autonomous robot halts when the job is done or something is in the way, instead of pushing into a wall or a person.", severity: "caution", paths: ["kit", "simulator", "unplugged"] },
    { id: "w7-s3", text: "Keep the taped floor course clear so no one trips while acting out the mission.", severity: "caution", paths: ["unplugged"] },
    { id: "w7-s4", text: "Save your program and journal often so a browser refresh doesn't lose your plan.", severity: "info", paths: ["simulator"] },
  ],
  printableResources: [
    { id: "w7-pr1", kind: "worksheet", title: "Mission Planning Brief", description: "A one-page brief to write the mission, requirements, constraints, success criteria, and one trade-off." },
    { id: "w7-pr2", kind: "flowchart", title: "Mission flowchart page", description: "A page to draw the autonomous program as a flowchart with action boxes, decision diamonds, and a safe stop." },
    { id: "w7-pr3", kind: "worksheet", title: "Practice mission test record", description: "A short table to record the practice run and check it against the mission's success criteria." },
    { id: "w7-pr4", kind: "teacher-guide", title: "Week 7 teacher guide", description: "Setup, facilitation, misconceptions, and questions to ask for the mission-planning lesson." },
  ],
  completion: {
    summary: "Finish Week 7 by writing a mission plan, drawing its flowchart with a safe stop, running the guided practice mission against its criteria, and passing the knowledge check.",
    requirements: [
      { id: "w7-cr1", label: "Complete the Mission Planning Brief with requirements, constraints, criteria, and a trade-off", sectionKind: "learn" },
      { id: "w7-cr2", label: "Draw the mission flowchart with a decision diamond and a safe stop", sectionKind: "learn" },
      { id: "w7-cr3", label: "Run the guided practice mission and record it against its criteria", sectionKind: "test" },
      { id: "w7-cr4", label: "Score at least 4 of 5 on the knowledge check", sectionKind: "knowledge-check" },
      { id: "w7-cr5", label: "Write your reflection", sectionKind: "reflection" },
    ],
  },
  teacherGuidance: {
    setup: [
      "Print the Mission Planning Brief, the flowchart page, and the practice mission test record, one per student or team.",
      "Set up a short practice course - a start line, a marked zone, and one obstacle - for the kit and unplugged paths.",
      "If using kits, charge them and confirm one sensor works; if using the simulator, open it and load a 6x6 grid.",
    ],
    prep: [
      "Write a quick example mission brief yourself so you can model requirements vs constraints vs criteria.",
      "Sketch one example flowchart with a decision diamond and a safe stop to show the shape.",
      "Decide on one or two mission choices to offer teams who get stuck picking one.",
    ],
    facilitation: [
      "Start with autonomous vs remote-controlled and the planning words before any building.",
      "Have teams write the brief first; check that criteria are measurable before they move on.",
      "Model translating one brief into a flowchart, then let teams draw their own.",
      "Have everyone predict, run the guided practice mission once, and record it against the criteria; keep the safe stop front and center as the rehearsal for next week.",
    ],
    commonMisconceptions: [
      "Mixing up requirements and constraints - a requirement is the job, a constraint is a limit.",
      "'Autonomous just means it moves' - moving isn't enough; it has to decide for itself with sensors and a program.",
      "Forgetting the safe stop, or drawing a flowchart with no way to end.",
      "Thinking a trade-off means one choice is simply 'wrong' rather than a balance between two good things.",
    ],
    questionsToAsk: [
      "Is that line a requirement (a job) or a constraint (a limit)?",
      "How will you actually check whether the robot met that criterion?",
      "Where does your flowchart end, and what makes the robot stop safely?",
      "What did you give up to get something else - and was it worth it?",
    ],
    easierVersion: "Give teams a ready-made mission and a half-filled brief, so they focus on the flowchart and safe stop.",
    harderVersion: "Require two decision diamonds and a second success criterion, and ask teams to justify their trade-off in writing.",
  },
  nextWeek: {
    moduleId: "week-8",
    teaser: "Next week is the final project - you'll design, build or simulate, program, test, and improve a robot that does one helpful mission of your choice, using exactly the planning you practiced today.",
    prepare: [
      "Keep your Mission Planning Brief and flowchart - you can reuse them or upgrade them for the final project.",
      "Skim the five final-project missions (delivery, search-and-rescue, inspection, sorting, accessibility help) and think about which you'd pick.",
      "Charge your kit or bookmark the simulator, and gather any cardboard and materials from earlier weeks.",
    ],
  },
}

/* ========================================================================== */
/* Course wrapper                                                             */
/* ========================================================================== */

/**
 * The ordered list of weekly modules. Weeks 2-7 are appended below this file's
 * exemplar weeks; the course object lists them in week order.
 */
const ROBOTICS_MODULES: RoboticsModule[] = [
  roboticsWeek1,
  roboticsWeek2,
  roboticsWeek3,
  roboticsWeek4,
  roboticsWeek5,
  roboticsWeek6,
  roboticsWeek7,
  roboticsWeek8,
]

/** One grouped set of safety rules for a kind of hazard. */
export type SafetyCategory = {
  id: string
  title: string
  /** Which equipment paths this matters most for; omit for all. */
  paths?: EquipmentPathId[]
  rules: string[]
}

/**
 * Course-wide safety reference. The per-week `safetyNotes` give the safety that
 * matters in that lesson's context; this is the complete, printable briefing
 * that adults review once and that the review area links to. Written for grades
 * 4-6 and kit-agnostic - no specific product is assumed.
 */
export const ROBOTICS_SAFETY: SafetyCategory[] = [
  {
    id: "safety-batteries",
    title: "Batteries and circuits",
    paths: ["kit"],
    rules: [
      "Use only appropriate low-voltage educational equipment - no wall outlets and no household batteries wired by hand.",
      "Never connect a battery's two terminals directly to each other.",
      "Stop right away if a motor, wire, or battery becomes hot, and tell an adult.",
      "Disconnect the power before changing wheels, motors, or other mechanical parts.",
    ],
  },
  {
    id: "safety-motors",
    title: "Motors and gears",
    paths: ["kit"],
    rules: [
      "Keep fingers, hair, jewelry, sleeves, and loose clothing away from moving gears and wheels.",
      "Do not force a stalled motor that has stopped turning - switch it off and find out why.",
      "Make sure moving parts are secured before you run a test.",
    ],
  },
  {
    id: "safety-moving-robots",
    title: "Moving robots",
    rules: [
      "Test on the floor, not on a table where the robot could drive off an edge.",
      "Keep robots away from stairs, roads, water, pets, and people's feet.",
      "Use a clear, open test area.",
      "Always include a safe-stop behavior so the robot halts when the job is done or something is in the way.",
    ],
  },
  {
    id: "safety-tools",
    title: "Tools and materials",
    paths: ["kit", "unplugged"],
    rules: [
      "Ask an adult for help with cutting or any sharp tools.",
      "Use safe classroom materials - no sharp, toxic, or breakable items.",
      "Never launch or swing an attachment toward a person.",
    ],
  },
]

export const roboticsCurriculum: RoboticsCurriculum = {
  slug: "robotics",
  title: "Robotics & Automation",
  subtitle:
    "Learn how robots sense, think, and act - then design, build, program, test, and improve one that helps.",
  description:
    "An 8-week robotics course for grades 4-6. Students learn what makes something a robot, build a base that moves, program exact instructions, add sensors, make robots react with loops and conditions, debug for reliability, plan an autonomous mission, and finish by designing a robot that solves a real problem. Every week works with a physical kit, a browser simulator, or unplugged household materials.",
  gradeRange: "Grades 4-6",
  totalModules: 8,
  duration: "8 weeks",
  estimatedTimePerModule: "60-90 minutes",
  requirement: "A robot kit, a browser, or household materials - any one path works",
  summary:
    "Robotics & Automation teaches how real robots work by building up one idea at a time. Students start by sorting robots from ordinary machines, then build a rolling base, give it exact instructions, add sensors, and make it react to the world with loops and conditions. Later weeks focus on debugging for reliability and planning a safe autonomous mission, and the course ends with a capstone where each student designs, builds or simulates, programs, tests, and improves a robot that does one helpful job. The whole course runs three ways - with a programmable kit, an in-browser simulator, or unplugged with cardboard and paper programming - so any classroom, library, or home can take part.",
  format: [
    "One big robotics idea and one main mission per week, in a build-up order.",
    "Every week works three ways: a physical kit, a browser simulator, or unplugged household materials.",
    "Each week follows a learn, explore, build, program, test, and reflect flow.",
    "Students predict, test, and record real results, and debug when things go wrong.",
    "The course ends with a final project and rubric where students design a robot that helps.",
  ],
  learningGoals: [
    "Explain what makes something a robot and how it senses, decides, and acts",
    "Build a stable robot base that moves",
    "Program exact sequences of instructions",
    "Use sensors, thresholds, and calibration",
    "Make robots react with loops and conditions",
    "Debug mechanical, programming, and sensor problems for reliability",
    "Plan a safe autonomous mission with a flowchart",
    "Design, build, program, test, and improve a robot that helps",
  ],
  equipmentPaths: ROBOTICS_EQUIPMENT_PATHS,
  modules: ROBOTICS_MODULES,
}

/* ========================================================================== */
/* Path helpers & lookups                                                     */
/* ========================================================================== */

/** The course landing route. */
export const roboticsPath = `/courses/${roboticsCurriculum.slug}`

/** Route for a single week's lesson. */
export function roboticsLessonPath(slug: string): string {
  return `${roboticsPath}/${slug}`
}

/** Route for a week's printable worksheet. */
export function roboticsWorksheetPath(slug: string): string {
  return `${roboticsPath}/${slug}/worksheet`
}

/** Route for a week's teacher/parent guide. */
export function roboticsTeacherGuidePath(slug: string): string {
  return `${roboticsPath}/${slug}/teacher-guide`
}

/** Look up a module by its URL slug. */
export function getRoboticsModule(slug: string): RoboticsModule | undefined {
  return roboticsCurriculum.modules.find((module) => module.slug === slug)
}

/** Look up a module by its stable id. */
export function getRoboticsModuleById(id: string): RoboticsModule | undefined {
  return roboticsCurriculum.modules.find((module) => module.id === id)
}

/** All lesson slugs in week order, for generateStaticParams. */
export function roboticsModuleSlugs(): string[] {
  return [...roboticsCurriculum.modules].sort((a, b) => a.order - b.order).map((module) => module.slug)
}

/** The module before the given slug, or null. */
export function previousRoboticsModule(slug: string): RoboticsModule | null {
  const ordered = [...roboticsCurriculum.modules].sort((a, b) => a.order - b.order)
  const index = ordered.findIndex((module) => module.slug === slug)
  if (index <= 0) return null
  return ordered[index - 1]
}

/** The module after the given slug, or null. */
export function nextRoboticsModule(slug: string): RoboticsModule | null {
  const ordered = [...roboticsCurriculum.modules].sort((a, b) => a.order - b.order)
  const index = ordered.findIndex((module) => module.slug === slug)
  if (index === -1 || index >= ordered.length - 1) return null
  return ordered[index + 1]
}

/* ========================================================================== */
/* Validation                                                                 */
/* ========================================================================== */

const EQUIPMENT_PATH_IDS: readonly EquipmentPathId[] = ["kit", "simulator", "unplugged"]

/** Type guard for an equipment path id. */
export function isEquipmentPathId(value: string): value is EquipmentPathId {
  return (EQUIPMENT_PATH_IDS as readonly string[]).includes(value)
}

/**
 * Runtime schema/content validation for a robotics curriculum. TypeScript
 * guarantees the shape of these records at author time; this catches the
 * cross-field mistakes types cannot (a `correctOptionId` that points at a wrong
 * option, a prerequisite pointing at a missing week, an activity missing a path
 * variant, a duplicate id used as a progress key). Returns a list of problem
 * strings - an empty list means the curriculum is internally consistent. The
 * curriculum test asserts this is empty; a future build step can too.
 */
export function validateRoboticsCurriculum(curriculum: RoboticsCurriculum = roboticsCurriculum): string[] {
  const problems: string[] = []
  const modules = curriculum.modules

  if (modules.length !== curriculum.totalModules) {
    problems.push(`totalModules (${curriculum.totalModules}) does not match module count (${modules.length})`)
  }

  const moduleIds = new Set(modules.map((m) => m.id))
  const seenIds = new Set<string>()
  const seenSlugs = new Set<string>()
  const seenWeeks = new Set<number>()
  const seenOrders = new Set<number>()

  for (const m of modules) {
    const at = `module "${m.id}"`
    if (seenIds.has(m.id)) problems.push(`duplicate module id: ${m.id}`)
    seenIds.add(m.id)
    if (seenSlugs.has(m.slug)) problems.push(`duplicate module slug: ${m.slug}`)
    seenSlugs.add(m.slug)
    if (seenWeeks.has(m.week)) problems.push(`duplicate week number: ${m.week}`)
    seenWeeks.add(m.week)
    if (seenOrders.has(m.order)) problems.push(`duplicate order: ${m.order}`)
    seenOrders.add(m.order)

    if (m.learningGoals.length === 0) problems.push(`${at} has no learning goals`)
    if (m.vocabulary.length === 0) problems.push(`${at} has no vocabulary`)
    if (m.concepts.length === 0) problems.push(`${at} has no concepts`)

    // Prerequisites must reference real, earlier modules.
    for (const pre of m.prerequisites) {
      if (!moduleIds.has(pre.moduleId)) problems.push(`${at} prerequisite references unknown module "${pre.moduleId}"`)
      const preModule = modules.find((x) => x.id === pre.moduleId)
      if (preModule && preModule.order >= m.order) {
        problems.push(`${at} prerequisite "${pre.moduleId}" is not an earlier week`)
      }
    }

    // Every activity must carry all three equipment variants, correctly keyed.
    const activityIds = new Set(m.activities.map((a) => a.id))
    for (const a of m.activities) {
      for (const pathId of EQUIPMENT_PATH_IDS) {
        const variant = a.variants[pathId]
        if (!variant) {
          problems.push(`${at} activity "${a.id}" is missing the ${pathId} variant`)
        } else if (variant.pathId !== pathId) {
          problems.push(`${at} activity "${a.id}" ${pathId} variant has mismatched pathId "${variant.pathId}"`)
        } else if (variant.instructions.length === 0 || variant.successCriteria.length === 0) {
          problems.push(`${at} activity "${a.id}" ${pathId} variant is missing instructions or success criteria`)
        }
      }
    }

    // lessonFlow activity references must resolve.
    for (const step of m.lessonFlow) {
      if (step.activityId && !activityIds.has(step.activityId)) {
        problems.push(`${at} lessonFlow step "${step.id}" references unknown activity "${step.activityId}"`)
      }
    }

    // Knowledge check: exactly one correct option per question, matching correctOptionId.
    const kc = m.knowledgeCheck
    if (kc.questions.length === 0) problems.push(`${at} knowledge check has no questions`)
    if (kc.passThreshold < 1 || kc.passThreshold > kc.questions.length) {
      problems.push(`${at} knowledge check passThreshold ${kc.passThreshold} is out of range 1..${kc.questions.length}`)
    }
    for (const q of kc.questions) {
      if (q.explanation.trim().length === 0) problems.push(`${at} question "${q.id}" needs an explanation`)
      switch (q.kind) {
        case "single":
        case "trace":
        case "scenario": {
          const correct = q.options.filter((o) => o.correct)
          if (correct.length !== 1) {
            problems.push(`${at} question "${q.id}" (${q.kind}) must have exactly one correct option (has ${correct.length})`)
          } else if (correct[0].id !== q.correctOptionId) {
            problems.push(`${at} question "${q.id}" correctOptionId "${q.correctOptionId}" does not match the correct option "${correct[0].id}"`)
          }
          if (q.options.length < 2) problems.push(`${at} question "${q.id}" needs at least two options`)
          break
        }
        case "multiple": {
          const correctIds = q.options.filter((o) => o.correct).map((o) => o.id).sort()
          if (correctIds.length === 0) problems.push(`${at} question "${q.id}" (multiple) needs at least one correct option`)
          const declared = [...q.correctOptionIds].sort()
          if (JSON.stringify(correctIds) !== JSON.stringify(declared)) {
            problems.push(`${at} question "${q.id}" correctOptionIds do not match the options flagged correct`)
          }
          if (q.options.length < 3) problems.push(`${at} question "${q.id}" (multiple) needs at least three options`)
          break
        }
        case "true-false":
          if (q.statement.trim().length === 0) problems.push(`${at} question "${q.id}" (true-false) needs a statement`)
          break
        case "ordering": {
          if (q.items.length < 2) problems.push(`${at} question "${q.id}" (ordering) needs at least two items`)
          const itemIds = new Set(q.items.map((i) => i.id))
          if (q.correctOrder.length !== q.items.length || !q.correctOrder.every((id) => itemIds.has(id))) {
            problems.push(`${at} question "${q.id}" correctOrder must be a permutation of its item ids`)
          }
          break
        }
        case "matching":
          if (q.pairs.length < 2) problems.push(`${at} question "${q.id}" (matching) needs at least two pairs`)
          break
        case "short":
          if (q.sampleAnswer.trim().length === 0) problems.push(`${at} question "${q.id}" (short) needs a sample answer`)
          break
      }
    }

    // Materials and safety notes must use valid path ids.
    for (const mat of m.materials) {
      for (const p of mat.paths) if (!isEquipmentPathId(p)) problems.push(`${at} material "${mat.id}" has invalid path "${p}"`)
    }
    for (const note of m.safetyNotes) {
      for (const p of note.paths ?? []) if (!isEquipmentPathId(p)) problems.push(`${at} safety note "${note.id}" has invalid path "${p}"`)
    }

    // Debugging bug-type coverage: Week 6 is the debugging week and must exercise all three.
    if (m.debuggingMissions.length > 0) {
      const bugTypes = new Set(m.debuggingMissions.map((d) => d.bugType))
      for (const t of ["mechanical", "programming", "sensor"] as const) {
        if (!bugTypes.has(t)) problems.push(`${at} has debugging missions but none of bug type "${t}"`)
      }
    }

    // Collect id-bearing records within the module and check for duplicate ids
    // (these ids are used as progress/save keys, so collisions corrupt saves).
    const localIds: string[] = [
      ...m.learningGoals.map((x) => x.id),
      ...m.concepts.map((x) => x.id),
      ...m.materials.map((x) => x.id),
      ...m.activities.map((x) => x.id),
      ...m.predictionPrompts.map((x) => x.id),
      ...m.testRecords.map((x) => x.id),
      ...m.debuggingMissions.map((x) => x.id),
      ...m.reflection.map((x) => x.id),
      ...m.journalPrompts.map((x) => x.id),
      ...m.savedPrograms.map((x) => x.id),
      ...m.simulatorMissions.map((x) => x.id),
      ...m.lessonFlow.map((x) => x.id),
      ...m.safetyNotes.map((x) => x.id),
      ...m.printableResources.map((x) => x.id),
      ...m.completion.requirements.map((x) => x.id),
      kc.id,
      ...kc.questions.map((x) => x.id),
    ]
    const localSeen = new Set<string>()
    for (const id of localIds) {
      if (localSeen.has(id)) problems.push(`${at} has duplicate internal id "${id}"`)
      localSeen.add(id)
    }
  }

  // Exactly one final module, and it is the last week.
  const finals = modules.filter((m) => m.isFinal)
  if (finals.length !== 1) {
    problems.push(`expected exactly one module with isFinal (found ${finals.length})`)
  } else {
    const finalModule = finals[0]
    const maxOrder = Math.max(...modules.map((m) => m.order))
    if (finalModule.order !== maxOrder) problems.push(`final module "${finalModule.id}" is not the last week`)
    if (!finalModule.finalProject) problems.push(`final module "${finalModule.id}" is missing its finalProject`)
  }

  // finalProject only appears on a final module.
  for (const m of modules) {
    if (m.finalProject && !m.isFinal) problems.push(`module "${m.id}" has a finalProject but is not marked isFinal`)
  }

  // nextWeek chain: non-final points to a real next module; final points to null.
  for (const m of modules) {
    if (m.isFinal) {
      if (m.nextWeek.moduleId !== null) problems.push(`final module "${m.id}" nextWeek.moduleId should be null`)
    } else if (!m.nextWeek.moduleId || !moduleIds.has(m.nextWeek.moduleId)) {
      problems.push(`module "${m.id}" nextWeek points at unknown module "${m.nextWeek.moduleId}"`)
    }
  }

  // Final project internal checks.
  const fp = finals[0]?.finalProject
  if (fp) {
    if (fp.missionChoices.length === 0) problems.push("final project has no mission choices")
    if (fp.requirements.filter((r) => r.required).length === 0) problems.push("final project has no required requirements")
    if (fp.requiredTestRuns < 1) problems.push("final project requiredTestRuns must be at least 1")
    if (fp.rubric.length === 0) problems.push("final project rubric is empty")
    for (const cat of fp.rubric) {
      if (cat.levels.length !== 4) problems.push(`final project rubric category "${cat.id}" must have four levels`)
    }
    for (const pathId of EQUIPMENT_PATH_IDS) {
      if (!fp.variants[pathId] || fp.variants[pathId].pathId !== pathId) {
        problems.push(`final project is missing a valid ${pathId} variant`)
      }
    }
  }

  return problems
}
