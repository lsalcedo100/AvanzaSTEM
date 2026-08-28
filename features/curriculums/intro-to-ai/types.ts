/**
 * Intro to Artificial Intelligence — typed curriculum model.
 *
 * Single source of truth for the *shape* of the six-week, grades 5–8 AI course.
 * All course content (Weeks 1–6, the final project, and the final assessment) is
 * authored as data that conforms to these types — see `intro-to-ai-week-1.ts` …
 * `intro-to-ai-week-6.ts` and `intro-to-ai.ts`. Presentation and state logic live
 * in components/hooks and never hard-code lesson copy.
 *
 * Conventions (consistent with the other `/courses/*` curricula):
 * - The course is authored in English here; it is English-only like the other
 *   `/courses/*` courses. A future localization pass can wrap these records in
 *   `Record<Language, …>` (as `features/projects/data.ts` does) without moving
 *   content. The localization boundary is: user-facing lesson strings live in the
 *   data files; reusable components/engines receive typed data and never embed
 *   English copy. See docs/intro-to-ai-course-architecture.md.
 * - Every record carries a **stable string id** that is safe across translation
 *   and title edits. Ids are never derived from visible text at runtime; progress
 *   is keyed by these ids.
 * - Section and knowledge-check question types are discriminated unions for type
 *   safety. No `any`; activities are fully typed, not arbitrary objects.
 */

/* -------------------------------------------------------------------------- */
/* Small content records                                                      */
/* -------------------------------------------------------------------------- */

/** Which learners a piece of content targets. The whole course is grades 5–8; */
/** "7-8" marks stretch content for older/advanced students.                   */
export type GradeBand = "5-6" | "7-8"

/** A transferable skill practiced across the course (course-level).           */
export type Skill = {
  id: string
  label: string
  description: string
}

/** A single, observable learning objective for a lesson.                      */
export type LearningObjective = {
  id: string
  text: string
}

/** A material a learner needs. `optional` distinguishes required vs nice-to-have. */
export type Material = {
  id: string
  name: string
  optional: boolean
  note?: string
}

/** A vocabulary term with a kid-friendly but accurate definition.             */
export type VocabularyTerm = {
  id: string
  term: string
  definition: string
}

/** The hook that opens a lesson: a question or short scenario.                */
export type OpeningScenario = {
  id: string
  prompt: string
  context?: string
}

/** A predict-then-check prompt used before an activity or reveal.             */
export type PredictionPrompt = {
  id: string
  prompt: string
  howToCheck: string
}

/** One explained concept: title + one or two short paragraphs + examples.     */
/** `misconception` optionally names a common wrong idea to correct.            */
export type ConceptSection = {
  id: string
  title: string
  body: string[]
  examples?: string[]
  misconception?: string
}

/** A step-by-step worked example that models the reasoning for a lesson idea. */
export type WorkedExample = {
  id: string
  title: string
  steps: string[]
  takeaway: string
}

/**
 * A diagram / visual explanation. `kind` selects the visual template; `summary`
 * is an accessible text description AND the content rendered until (and unless)
 * a dedicated visual component exists. `data` is an optional, fully-typed payload
 * for the specific visual kinds that need structured values (never `any`).
 */
export type VisualKind =
  | "diagram"
  | "table"
  | "flow"
  | "decision-tree"
  | "confusion-matrix"
  | "before-after"
  | "bar-chart"

export type VisualTable = {
  columns: string[]
  rows: string[][]
}

export type ConfusionMatrix = {
  /** Row = actual, column = predicted. Square matrix of counts. */
  labels: string[]
  counts: number[][]
}

export type BarChartData = {
  unit: string
  bars: { label: string; value: number }[]
}

/** A left-to-right sequence of labeled steps, e.g. input → process → output. */
export type FlowData = {
  nodes: { id: string; label: string; note?: string }[]
}

/** A two-column comparison, e.g. rules vs. learned patterns, or before/after. */
export type BeforeAfterData = {
  before: { label: string; items: string[] }
  after: { label: string; items: string[] }
}

/** A decision tree node; leaf nodes have no branches. */
export type DecisionTreeNode = {
  id: string
  label: string
  branches?: { condition: string; child: DecisionTreeNode }[]
}

export type VisualExplanation = {
  id: string
  kind: VisualKind
  title: string
  /** Accessible summary; also the fallback rendering. Always present. */
  summary: string
  caption?: string
  table?: VisualTable
  matrix?: ConfusionMatrix
  chart?: BarChartData
  /** Structured data for the flow / before-after / decision-tree renderers. */
  flow?: FlowData
  beforeAfter?: BeforeAfterData
  tree?: DecisionTreeNode
}

/* -------------------------------------------------------------------------- */
/* Activities (briefings during this phase — no interactive engine yet)       */
/* -------------------------------------------------------------------------- */

/**
 * Discriminates the interactive activity a lesson will eventually offer. The
 * engines are not built yet; during this phase an activity renders as an
 * accurate *briefing* (see `ActivityDefinition.status`). Kinds map 1:1 to the
 * planned widgets in docs/intro-to-ai-course-architecture.md §8.
 */
export type ActivityKind =
  // Week 1
  | "ai-detective"
  | "rule-builder"
  | "device-investigation"
  // Week 2
  | "feature-labeling"
  | "train-test-split"
  | "dataset-repair"
  // Week 3
  | "classifier-walkthrough"
  | "train-test-classifier"
  | "confusion-improve"
  // Week 4
  | "rule-chatbot"
  | "next-text-prediction"
  | "recommendation-audit"
  // Week 5
  | "fairness-audit"
  | "privacy-minimize"
  | "content-investigation"
  // Week 6
  | "problem-tool-fit"
  | "prototype-plan"
  | "present-review"

/**
 * `briefing` = instructional description only, no interactive controls (current
 * state for all activities). `interactive` = a real engine is wired up. This flag
 * lets the renderer avoid showing fake "Run"/"Train"/"Submit" controls.
 */
export type ActivityStatus = "briefing" | "interactive"

/** A described, built-in dataset an activity uses (no external data, no uploads). */
export type ActivityDataset = {
  id: string
  name: string
  description: string
  columns?: string[]
  rowCount?: number
}

export type ActivityDefinition = {
  id: string
  kind: ActivityKind
  title: string
  goal: string
  status: ActivityStatus
  /** One-paragraph overview of what the learner will do. */
  overview: string
  /** Guided-but-open steps; keyboard/tap friendly by design. */
  steps: string[]
  /** Material ids or plain item names needed for this activity. */
  materials: string[]
  /** Observable checklist for success. */
  successCriteria: string[]
  dataset?: ActivityDataset
  gradeBand?: GradeBand
}

/* -------------------------------------------------------------------------- */
/* Knowledge check (discriminated union of question types)                    */
/* -------------------------------------------------------------------------- */

/** One selectable answer with its own targeted explanation (feedback).        */
export type AnswerChoice = {
  id: string
  text: string
  correct: boolean
  /** Answer explanation shown after answering, whether right or wrong. */
  explanation: string
}

type QuestionBase = {
  id: string
  prompt: string
  /** Overall reasoning shown after the question is answered. */
  explanation: string
  /** Optional skill this question provides evidence for (see intro-to-ai-skills). */
  skillId?: string
  /** Optional table/chart/prose shown before the choices — powers the
   *  result-interpretation and table/chart-interpretation question types by
   *  reusing the single/multiple choice engine. */
  context?: VisualExplanation
}

export type SingleChoiceQuestion = QuestionBase & {
  kind: "single"
  choices: AnswerChoice[]
}

export type MultipleChoiceQuestion = QuestionBase & {
  kind: "multiple"
  choices: AnswerChoice[]
}

export type TrueFalseQuestion = QuestionBase & {
  kind: "true-false"
  statement: string
  answer: boolean
}

export type ScenarioQuestion = QuestionBase & {
  kind: "scenario"
  scenario: string
  choices: AnswerChoice[]
}

export type OrderingQuestion = QuestionBase & {
  kind: "ordering"
  items: { id: string; text: string }[]
  /** Item ids in the correct order. */
  correctOrder: string[]
}

export type KnowledgeCheckQuestion =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | ScenarioQuestion
  | OrderingQuestion

export type KnowledgeCheck = {
  id: string
  instructions: string
  questions: KnowledgeCheckQuestion[]
  /** Number of questions correct that counts as passing. */
  passThreshold: number
}

/* -------------------------------------------------------------------------- */
/* Independent challenge, reflection, recap, extension                        */
/* -------------------------------------------------------------------------- */

/** An open, do-it-yourself challenge applying the lesson.                     */
export type Challenge = {
  id: string
  title: string
  prompt: string
  steps: string[]
  successCriteria: string[]
}

export type ReflectionPrompt = {
  id: string
  prompt: string
}

/** End-of-lesson recap: one-line summary + the key points to remember.        */
export type Recap = {
  id: string
  summary: string
  keyPoints: string[]
}

/** Optional grades 7–8 stretch content.                                       */
export type Extension = {
  id: string
  title: string
  body: string[]
  gradeBand: "7-8"
}

/* -------------------------------------------------------------------------- */
/* Lesson + lesson sections                                                    */
/* -------------------------------------------------------------------------- */

/**
 * The canonical ordered outline of a rendered lesson, as a discriminated union.
 * These are *derived* from a `Lesson`'s populated fields by `lessonSections()`
 * (in `intro-to-ai.ts`) rather than authored per-lesson, so a lesson can never
 * reference a section that doesn't exist. The renderer switches on `kind`.
 */
export type LessonSectionKind =
  | "objectives"
  | "opening"
  | "prediction"
  | "vocabulary"
  | "concept"
  | "worked-example"
  | "visual"
  | "activity"
  | "knowledge-check"
  | "challenge"
  | "reflection"
  | "recap"
  | "extension"

export type LessonSection =
  | { kind: "objectives"; objectives: LearningObjective[] }
  | { kind: "opening"; scenario: OpeningScenario }
  | { kind: "prediction"; prompt: PredictionPrompt }
  | { kind: "vocabulary"; terms: VocabularyTerm[] }
  | { kind: "concept"; concept: ConceptSection }
  | { kind: "worked-example"; example: WorkedExample }
  | { kind: "visual"; visual: VisualExplanation }
  | { kind: "activity"; activity: ActivityDefinition }
  | { kind: "knowledge-check"; check: KnowledgeCheck }
  | { kind: "challenge"; challenge: Challenge }
  | { kind: "reflection"; prompts: ReflectionPrompt[] }
  | { kind: "recap"; recap: Recap }
  | { kind: "extension"; extension: Extension }

export type Lesson = {
  /** Globally unique, stable id, e.g. "w1l1". */
  id: string
  /** URL slug, unique within its week, e.g. "ai-or-not". */
  slug: string
  /** 1-based order within the week. */
  order: number
  title: string
  summary: string
  estimatedTime: string
  objectives: LearningObjective[]
  materials: Material[]
  vocabulary: VocabularyTerm[]
  openingScenario: OpeningScenario
  predictionPrompt: PredictionPrompt
  concepts: ConceptSection[]
  workedExample: WorkedExample
  visuals: VisualExplanation[]
  activity: ActivityDefinition
  knowledgeCheck: KnowledgeCheck
  challenge: Challenge
  reflection: ReflectionPrompt[]
  recap: Recap
  /** Optional grades 7–8 extension. */
  extension: Extension
}

/* -------------------------------------------------------------------------- */
/* Week                                                                        */
/* -------------------------------------------------------------------------- */

export type CourseWeek = {
  /** Stable id, e.g. "week-1". */
  id: string
  /** 1-based week number; used as the `/week/[week]` route param. */
  week: number
  title: string
  subtitle: string
  summary: string
  /** The driving question for the week. */
  bigQuestion: string
  estimatedTime: string
  /** Week-level objectives (student-facing outcomes). */
  objectives: string[]
  /** The required concept vocabulary the week must cover (used by tests/QA). */
  requiredConcepts: string[]
  lessons: Lesson[]
  isFinal?: boolean
}

/* -------------------------------------------------------------------------- */
/* Final project + final assessment                                           */
/* -------------------------------------------------------------------------- */

export type FinalProjectChoice = {
  id: string
  name: string
  scenario: string
  exampleGoal: string
  suitableBecause: string
}

export type FinalProjectRequirement = {
  id: string
  label: string
  description: string
  category:
    | "problem"
    | "suitability"
    | "io-design"
    | "prototype"
    | "responsibility"
    | "presentation"
  required: boolean
}

export type RubricLevel = {
  label: "Beginning" | "Developing" | "Proficient" | "Exemplary"
  descriptor: string
}

export type RubricCategory = {
  id: string
  name: string
  description: string
  /** Share of the rubric; the categories' weights sum to 100. */
  weightPercent: number
  levels: RubricLevel[]
}

export type FinalProject = {
  id: string
  title: string
  overview: string
  choices: FinalProjectChoice[]
  /** Planning-brief fields the student fills in. */
  brief: { id: string; label: string; hint: string }[]
  requirements: FinalProjectRequirement[]
  rubric: RubricCategory[]
}

export type FinalAssessment = {
  id: string
  title: string
  instructions: string
  passThreshold: number
  questions: KnowledgeCheckQuestion[]
}

/* -------------------------------------------------------------------------- */
/* Course                                                                      */
/* -------------------------------------------------------------------------- */

export type CourseMaterials = {
  required: Material[]
  optional: Material[]
}

export type IntroToAiCourse = {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  gradeRange: string
  totalWeeks: number
  duration: string
  estimatedTotalTime: string
  /** Plain-language requirements (no coding, browser-based, no camera/mic, …). */
  requirements: string[]
  learningOutcomes: string[]
  finalProjectPreview: string
  skills: Skill[]
  materials: CourseMaterials
  weeks: CourseWeek[]
  finalProject: FinalProject
  finalAssessment: FinalAssessment
}
