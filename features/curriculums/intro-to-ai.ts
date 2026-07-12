/**
 * Intro to Artificial Intelligence — course assembly, metadata, helpers, and
 * runtime validation.
 *
 * This is the single entry point for the six-week, grades 5–8 AI course. It pulls
 * the authored weekly content together, defines course-level metadata, the final
 * project, and the final assessment, and exposes the route helpers and lookups
 * used by the pages, metadata generators, sitemap, and tests.
 *
 * Content lives in the data files (this file + `intro-to-ai-week-*.ts`);
 * presentation and state logic live in components/hooks. Every record has a
 * stable id; nothing is keyed by visible text. See
 * docs/intro-to-ai-course-architecture.md.
 */
import type {
  CourseWeek,
  FinalAssessment,
  FinalProject,
  IntroToAiCourse,
  Lesson,
  LessonSection,
  Material,
  Skill,
} from "./intro-to-ai-types.ts"
import { week1 } from "./intro-to-ai-week-1.ts"
import { week2 } from "./intro-to-ai-week-2.ts"
import { week3 } from "./intro-to-ai-week-3.ts"
import { week4 } from "./intro-to-ai-week-4.ts"
import { week5 } from "./intro-to-ai-week-5.ts"
import { week6 } from "./intro-to-ai-week-6.ts"

export const INTRO_TO_AI_COURSE_ID = "intro-to-artificial-intelligence"

/* -------------------------------------------------------------------------- */
/* Route helpers (stable public paths)                                        */
/* -------------------------------------------------------------------------- */

export const introToAiPath = `/courses/${INTRO_TO_AI_COURSE_ID}`

export function introToAiWeekPath(week: number): string {
  return `${introToAiPath}/week/${week}`
}

export function introToAiLessonPath(week: number, lessonSlug: string): string {
  return `${introToAiPath}/week/${week}/lesson/${lessonSlug}`
}

export const introToAiFinalProjectPath = `${introToAiPath}/final-project`
export const introToAiFinalAssessmentPath = `${introToAiPath}/final-assessment`
export const introToAiCompletionPath = `${introToAiPath}/completion`

/* -------------------------------------------------------------------------- */
/* Course-level metadata                                                      */
/* -------------------------------------------------------------------------- */

const skills: Skill[] = [
  { id: "skill-classify", label: "Tell AI from ordinary software", description: "Decide whether a technology follows written rules or learns patterns from examples." },
  { id: "skill-data", label: "Reason about data", description: "Use examples, labels, and features, and judge whether a dataset is balanced and correctly labeled." },
  { id: "skill-evaluate", label: "Evaluate a model", description: "Read accuracy, confidence, and confusion matrices, and spot false positives, false negatives, and edge cases." },
  { id: "skill-text-ai", label: "Understand text AI and recommendations", description: "Explain decision trees, next-text prediction, and how recommendations and filter bubbles form." },
  { id: "skill-responsible", label: "Use AI responsibly", description: "Check for bias, protect privacy, verify sources, and know when human oversight and appeals are needed." },
  { id: "skill-design", label: "Design an AI solution", description: "Define a problem, decide whether AI fits, plan inputs and outputs, prototype, test, and present." },
]

const requiredMaterials: Material[] = [
  { id: "mat-browser", name: "A web browser on a school Chromebook, tablet, or laptop", optional: false, note: "No installs. Works on school-issued devices." },
  { id: "mat-notes", name: "Paper and pencil, or a notes app", optional: false },
  { id: "mat-datasets", name: "Built-in datasets", optional: false, note: "Provided inside the course — no downloads or accounts." },
]

const optionalMaterials: Material[] = [
  { id: "mat-device", name: "A personal device to explore its apps", optional: true, note: "Only for finding real-world AI examples; never required, and no personal data is collected." },
  { id: "mat-printouts", name: "Printed worksheets", optional: true, note: "For classes that prefer working on paper." },
]

/* -------------------------------------------------------------------------- */
/* Final project                                                              */
/* -------------------------------------------------------------------------- */

const finalProject: FinalProject = {
  id: "final-project",
  title: "AI Design Studio: design an AI that helps",
  overview:
    "Working from what you learned all six weeks, design an AI tool that helps a real group of people. You will define the problem, decide whether AI actually fits, plan the inputs, outputs, labels, features, or rules, sketch a prototype, write test cases, and explain how you would keep it fair, private, and under human oversight. This is a design and planning project — you will not train a real model.",
  choices: [
    { id: "fp-choice-sorter", name: "Helpful sorter", scenario: "A group struggles to sort many items quickly — like a library sorting returned books or a club organizing photos.", exampleGoal: "Design an AI that sorts items into the right categories.", suitableBecause: "Sorting from many labeled examples is a good fit for machine learning." },
    { id: "fp-choice-assistant", name: "Question helper", scenario: "People keep asking the same questions and a small team can't keep up — like a school office or a game's help desk.", exampleGoal: "Design a rule-based helper that answers common questions and hands off the rest to a person.", suitableBecause: "Common questions with clear intents fit a decision-tree chatbot with a human fallback." },
    { id: "fp-choice-recommender", name: "Fair recommender", scenario: "A community wants suggestions — books, activities, or recipes — without trapping people in a filter bubble.", exampleGoal: "Design a recommender that suggests new options and explains why.", suitableBecause: "Recommendations use similarity and feedback, and let you practice avoiding filter bubbles." },
    { id: "fp-choice-own", name: "Your own idea", scenario: "You have a problem in your school or community that you think AI could help with.", exampleGoal: "Define your own problem and design an AI (or decide AI is not the right tool).", suitableBecause: "Deciding whether AI fits at all is part of good design." },
  ],
  brief: [
    { id: "fp-brief-need", label: "User need", hint: "Who is this for, and what problem do they have?" },
    { id: "fp-brief-problem", label: "Problem definition", hint: "State the exact task in one or two sentences." },
    { id: "fp-brief-suitability", label: "Is AI the right tool?", hint: "Explain why AI fits — or why a simpler tool would be better." },
    { id: "fp-brief-io", label: "Inputs and outputs", hint: "What goes in, and what comes out?" },
    { id: "fp-brief-data", label: "Labels, features, or rules", hint: "What examples, labels, and features would it learn from, or what rules would it follow?" },
    { id: "fp-brief-prototype", label: "Prototype sketch", hint: "Describe or sketch how a person would use it." },
    { id: "fp-brief-tests", label: "Test cases", hint: "List examples you would test, including tricky edge cases." },
    { id: "fp-brief-limits", label: "Limitations", hint: "Where might it make mistakes or be unfair?" },
    { id: "fp-brief-oversight", label: "Fairness, privacy, and oversight", hint: "How will you protect privacy, check fairness, and keep a human in charge? How can someone appeal a wrong result?" },
  ],
  requirements: [
    { id: "fp-req-need", label: "Clear user need", description: "Names a real group of people and the problem they face.", category: "problem", required: true },
    { id: "fp-req-suitability", label: "AI suitability decision", description: "Argues whether AI is the right tool, using the input/output and rules-vs-learning ideas.", category: "suitability", required: true },
    { id: "fp-req-io", label: "Inputs and outputs designed", description: "Defines the inputs and outputs, and the labels/features or rules involved.", category: "io-design", required: true },
    { id: "fp-req-prototype", label: "Prototype and test cases", description: "Includes a prototype sketch and at least three test cases, one of them an edge case.", category: "prototype", required: true },
    { id: "fp-req-responsibility", label: "Responsible-use plan", description: "Addresses fairness, privacy, limitations, human oversight, and appeals.", category: "responsibility", required: true },
    { id: "fp-req-presentation", label: "Clear presentation", description: "Explains the design so someone else could understand and question it.", category: "presentation", required: true },
    { id: "fp-req-iteration", label: "Iteration note (stretch)", description: "Describes one change you would make after testing.", category: "prototype", required: false },
  ],
  rubric: [
    {
      id: "fp-rubric-problem",
      name: "Problem & suitability",
      description: "How clearly the problem is defined and whether AI is the right tool.",
      weightPercent: 25,
      levels: [
        { label: "Beginning", descriptor: "The problem is vague and there is no reasoning about whether AI fits." },
        { label: "Developing", descriptor: "The problem is stated but the AI-suitability reasoning is thin." },
        { label: "Proficient", descriptor: "Clear problem and a solid argument for whether AI is the right tool." },
        { label: "Exemplary", descriptor: "Sharp problem definition with a convincing, well-reasoned suitability decision." },
      ],
    },
    {
      id: "fp-rubric-design",
      name: "Inputs, outputs & data",
      description: "Quality of the input/output design and labels/features or rules.",
      weightPercent: 25,
      levels: [
        { label: "Beginning", descriptor: "Inputs and outputs are missing or unclear." },
        { label: "Developing", descriptor: "Inputs and outputs are named but labels/features or rules are unclear." },
        { label: "Proficient", descriptor: "Clear inputs, outputs, and a sensible plan for labels/features or rules." },
        { label: "Exemplary", descriptor: "Thoughtful, well-matched design with realistic labels, features, or rules." },
      ],
    },
    {
      id: "fp-rubric-prototype",
      name: "Prototype & testing",
      description: "The prototype sketch and the quality of the test cases.",
      weightPercent: 25,
      levels: [
        { label: "Beginning", descriptor: "No prototype or test cases." },
        { label: "Developing", descriptor: "A basic prototype with one or two simple tests." },
        { label: "Proficient", descriptor: "A clear prototype with at least three tests, including an edge case." },
        { label: "Exemplary", descriptor: "A well-explained prototype with strong tests that probe likely failures." },
      ],
    },
    {
      id: "fp-rubric-responsibility",
      name: "Responsibility & presentation",
      description: "Fairness, privacy, oversight, appeals, and clarity of the presentation.",
      weightPercent: 25,
      levels: [
        { label: "Beginning", descriptor: "Ignores fairness, privacy, or oversight, and is hard to follow." },
        { label: "Developing", descriptor: "Mentions responsibility but leaves gaps, or the presentation is unclear." },
        { label: "Proficient", descriptor: "Addresses fairness, privacy, oversight, and appeals clearly." },
        { label: "Exemplary", descriptor: "Thorough responsible-use plan, clearly presented and open to questions." },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* Final assessment                                                            */
/* -------------------------------------------------------------------------- */

const finalAssessment: FinalAssessment = {
  id: "final-assessment",
  title: "Course check: what you learned about AI",
  instructions:
    "A short check across all six weeks. Answer each question and read the explanation. This is for your own learning — there are no grades and nothing is sent anywhere.",
  passThreshold: 6,
  questions: [
    {
      id: "fa-q1",
      kind: "single",
      prompt: "What is the clearest sign that software is AI rather than a traditional program?",
      explanation: "AI learns patterns from many examples instead of only following rules a person wrote by hand.",
      choices: [
        { id: "fa-q1-a", text: "It learned patterns from examples.", correct: true, explanation: "Correct — learning from examples is the key sign of AI." },
        { id: "fa-q1-b", text: "It runs quickly.", correct: false, explanation: "Speed doesn't decide whether software is AI." },
        { id: "fa-q1-c", text: "It has a nice interface.", correct: false, explanation: "The interface says nothing about whether it learns." },
        { id: "fa-q1-d", text: "It runs on a computer.", correct: false, explanation: "All software runs on a computer." },
      ],
    },
    {
      id: "fa-q2",
      kind: "true-false",
      prompt: "Decide if the statement is true or false.",
      statement: "A dataset with far more examples of one category than another is unbalanced and can make a model less fair.",
      answer: true,
      explanation: "True — unbalanced data means the model sees too few of some cases and can perform worse for them.",
    },
    {
      id: "fa-q3",
      kind: "single",
      prompt: "Why do we test a model on data it did not train on?",
      explanation: "Testing on unseen examples checks whether the model generalizes instead of just memorizing training data.",
      choices: [
        { id: "fa-q3-a", text: "To see if it generalizes to new examples.", correct: true, explanation: "Correct — unseen test data shows real performance." },
        { id: "fa-q3-b", text: "To make training faster.", correct: false, explanation: "Testing is separate from training speed." },
        { id: "fa-q3-c", text: "To use up extra data.", correct: false, explanation: "Test data has a purpose: measuring generalization." },
        { id: "fa-q3-d", text: "Because training data is always wrong.", correct: false, explanation: "Training data isn't always wrong; we just need a fair test." },
      ],
    },
    {
      id: "fa-q4",
      kind: "scenario",
      prompt: "A photo classifier labels a picture of a muffin as a dog. What kind of mistake is this?",
      scenario: "The model predicted 'dog' for something that is not a dog.",
      explanation: "Predicting 'dog' when it is not a dog is a false positive for the dog category.",
      choices: [
        { id: "fa-q4-a", text: "A false positive for 'dog'.", correct: true, explanation: "Correct — it wrongly said 'dog' was present." },
        { id: "fa-q4-b", text: "A false negative for 'dog'.", correct: false, explanation: "A false negative would be missing a real dog." },
        { id: "fa-q4-c", text: "Perfect accuracy.", correct: false, explanation: "It made a mistake, so accuracy isn't perfect." },
        { id: "fa-q4-d", text: "An input error.", correct: false, explanation: "The image was valid; the model's prediction was wrong." },
      ],
    },
    {
      id: "fa-q5",
      kind: "true-false",
      prompt: "Decide if the statement is true or false.",
      statement: "If a language model's answer sounds fluent and confident, it must be factually true.",
      answer: false,
      explanation: "False — language models predict likely next text, so fluent output can still be wrong. Always check facts.",
    },
    {
      id: "fa-q6",
      kind: "single",
      prompt: "What is a filter bubble?",
      explanation: "A filter bubble is when recommendations keep showing similar things, so you rarely see new or different options.",
      choices: [
        { id: "fa-q6-a", text: "When recommendations keep showing you similar things and hide different ones.", correct: true, explanation: "Correct — that narrowing is a filter bubble." },
        { id: "fa-q6-b", text: "A tool that cleans data.", correct: false, explanation: "That's not what a filter bubble means." },
        { id: "fa-q6-c", text: "A privacy setting.", correct: false, explanation: "A filter bubble is about narrowed recommendations, not a setting." },
        { id: "fa-q6-d", text: "A type of camera filter.", correct: false, explanation: "It's about recommendations, not photo filters." },
      ],
    },
    {
      id: "fa-q7",
      kind: "multiple",
      prompt: "Which of these are good ways to use AI responsibly? (Choose all that apply.)",
      explanation: "Responsible use includes minimizing data collection, checking sources, watching for bias, and keeping human oversight with a way to appeal.",
      choices: [
        { id: "fa-q7-a", text: "Collect only the data you actually need.", correct: true, explanation: "Correct — data minimization protects privacy." },
        { id: "fa-q7-b", text: "Check the original source before trusting AI content.", correct: true, explanation: "Correct — independent confirmation catches misinformation." },
        { id: "fa-q7-c", text: "Let AI make important decisions with no human review.", correct: false, explanation: "Important decisions need human oversight and a way to appeal." },
        { id: "fa-q7-d", text: "Watch for bias and unfair group-level results.", correct: true, explanation: "Correct — checking fairness across groups is responsible use." },
      ],
    },
    {
      id: "fa-q8",
      kind: "ordering",
      prompt: "Put the steps of designing an AI tool in a sensible order.",
      explanation: "Good design starts from the user need and problem, decides if AI fits, designs inputs/outputs, prototypes, then tests and improves.",
      items: [
        { id: "fa-q8-i1", text: "Define the user need and the problem" },
        { id: "fa-q8-i2", text: "Decide whether AI is the right tool" },
        { id: "fa-q8-i3", text: "Design the inputs, outputs, and labels/features or rules" },
        { id: "fa-q8-i4", text: "Prototype, then test and improve" },
      ],
      correctOrder: ["fa-q8-i1", "fa-q8-i2", "fa-q8-i3", "fa-q8-i4"],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* The course                                                                 */
/* -------------------------------------------------------------------------- */

const weeks: CourseWeek[] = [week1, week2, week3, week4, week5, week6]

export const introToAiCourse: IntroToAiCourse = {
  id: INTRO_TO_AI_COURSE_ID,
  slug: INTRO_TO_AI_COURSE_ID,
  title: "Intro to Artificial Intelligence",
  subtitle:
    "A six-week course where students in grades 5–8 learn what AI really is, how data trains a model, where AI makes mistakes, and how to use it responsibly.",
  description:
    "Discover what AI is and how it works through age-appropriate activities. Explore how data teaches a model, how image and text AI work and where they fail, and how to use AI fairly and safely — finishing by designing your own AI in a design studio. No coding experience required.",
  gradeRange: "Grades 5-8",
  totalWeeks: 6,
  duration: "6 weeks",
  estimatedTotalTime: "About 7-9 hours",
  requirements: [
    "No coding experience required",
    "Works in a web browser on school Chromebooks, tablets, or laptops",
    "Built-in datasets are provided — no downloads or accounts",
    "No camera or microphone required",
    "No personal information required",
  ],
  learningOutcomes: [
    "Tell artificial intelligence apart from ordinary software and automation.",
    "Explain how examples, labels, and features train a model, and why balanced, correctly-labeled data matters.",
    "Read a model's accuracy and confidence, and interpret false positives, false negatives, and a confusion matrix.",
    "Describe how chatbots, language models, and recommendation systems work — and where they go wrong.",
    "Check AI for bias, protect privacy, verify information, and know when humans must stay in charge.",
    "Design, prototype, test, and present a responsible AI solution to a real problem.",
  ],
  finalProjectPreview:
    "In the Week 6 AI Design Studio, you design an AI tool that helps a real group of people: define the problem, decide whether AI fits, plan the inputs and outputs, sketch a prototype, write test cases, and explain how you would keep it fair, private, and under human oversight.",
  skills,
  materials: { required: requiredMaterials, optional: optionalMaterials },
  weeks,
  finalProject,
  finalAssessment,
}

/* -------------------------------------------------------------------------- */
/* Lookups                                                                     */
/* -------------------------------------------------------------------------- */

export function weekNumbers(): number[] {
  return introToAiCourse.weeks.map((w) => w.week)
}

export function getWeek(week: number): CourseWeek | undefined {
  return introToAiCourse.weeks.find((w) => w.week === week)
}

export function getLesson(week: number, lessonSlug: string): Lesson | undefined {
  return getWeek(week)?.lessons.find((l) => l.slug === lessonSlug)
}

/** All (week, lesson) pairs as string params for `generateStaticParams`. */
export function allLessonParams(): { week: string; lesson: string }[] {
  return introToAiCourse.weeks.flatMap((w) =>
    w.lessons.map((l) => ({ week: String(w.week), lesson: l.slug })),
  )
}

/** All week numbers as string params for `generateStaticParams`. */
export function weekParams(): { week: string }[] {
  return weekNumbers().map((week) => ({ week: String(week) }))
}

/** The first lesson of the first week — the "begin" destination. */
export function firstLesson(): { week: number; lesson: Lesson } {
  const w = introToAiCourse.weeks[0]
  return { week: w.week, lesson: w.lessons[0] }
}

/**
 * The ordered, typed outline of a rendered lesson, derived from the lesson's
 * populated fields. The renderer switches on `kind`. Keeping this derived (rather
 * than authored per lesson) means a lesson can never reference a missing section.
 */
export function lessonSections(lesson: Lesson): LessonSection[] {
  const sections: LessonSection[] = [
    { kind: "objectives", objectives: lesson.objectives },
    { kind: "opening", scenario: lesson.openingScenario },
    { kind: "prediction", prompt: lesson.predictionPrompt },
    { kind: "vocabulary", terms: lesson.vocabulary },
    ...lesson.concepts.map((concept): LessonSection => ({ kind: "concept", concept })),
    { kind: "worked-example", example: lesson.workedExample },
    ...lesson.visuals.map((visual): LessonSection => ({ kind: "visual", visual })),
    { kind: "activity", activity: lesson.activity },
    { kind: "knowledge-check", check: lesson.knowledgeCheck },
    { kind: "challenge", challenge: lesson.challenge },
    { kind: "reflection", prompts: lesson.reflection },
    { kind: "recap", recap: lesson.recap },
    { kind: "extension", extension: lesson.extension },
  ]
  return sections
}

/** Adjacent-lesson navigation across week boundaries. */
export function lessonNeighbors(week: number, lessonSlug: string): {
  prev: { week: number; lesson: Lesson } | null
  next: { week: number; lesson: Lesson } | null
} {
  const flat = introToAiCourse.weeks.flatMap((w) =>
    w.lessons.map((lesson) => ({ week: w.week, lesson })),
  )
  const index = flat.findIndex((e) => e.week === week && e.lesson.slug === lessonSlug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  }
}

/* -------------------------------------------------------------------------- */
/* Runtime validation (asserted empty by tests)                               */
/* -------------------------------------------------------------------------- */

/**
 * Returns a list of structural problems with the course data. An empty array
 * means the data is internally consistent. Used by unit tests and safe to call
 * at build time. Checks: unique ids across weeks/lessons/questions/activities/
 * skills, correct week + lesson ordering, valid question shapes, rubric weights,
 * and that each week covers its required concepts.
 */
export function validateIntroToAiCourse(course: IntroToAiCourse = introToAiCourse): string[] {
  const errors: string[] = []
  const seen = new Set<string>()
  const requireUnique = (id: string, what: string) => {
    if (!id) errors.push(`Empty id for ${what}`)
    else if (seen.has(id)) errors.push(`Duplicate id "${id}" (${what})`)
    else seen.add(id)
  }

  requireUnique(course.id, "course")

  // Weeks must be 1..N in order.
  course.weeks.forEach((w, i) => {
    if (w.week !== i + 1) errors.push(`Week at index ${i} has week number ${w.week}, expected ${i + 1}`)
    requireUnique(w.id, `week ${w.week}`)

    // Lessons must be order 1..N in order, with unique slugs within the week.
    const slugs = new Set<string>()
    w.lessons.forEach((l, j) => {
      if (l.order !== j + 1) errors.push(`Lesson "${l.id}" has order ${l.order}, expected ${j + 1}`)
      if (slugs.has(l.slug)) errors.push(`Duplicate lesson slug "${l.slug}" in week ${w.week}`)
      slugs.add(l.slug)
      requireUnique(l.id, `lesson ${l.id}`)

      // Lesson content ids.
      l.objectives.forEach((o) => requireUnique(o.id, `objective in ${l.id}`))
      l.vocabulary.forEach((v) => requireUnique(v.id, `vocab in ${l.id}`))
      requireUnique(l.openingScenario.id, `opening in ${l.id}`)
      requireUnique(l.predictionPrompt.id, `prediction in ${l.id}`)
      l.concepts.forEach((c) => requireUnique(c.id, `concept in ${l.id}`))
      requireUnique(l.workedExample.id, `worked example in ${l.id}`)
      l.visuals.forEach((vis) => requireUnique(vis.id, `visual in ${l.id}`))
      requireUnique(l.activity.id, `activity in ${l.id}`)
      requireUnique(l.challenge.id, `challenge in ${l.id}`)
      l.reflection.forEach((r) => requireUnique(r.id, `reflection in ${l.id}`))
      requireUnique(l.recap.id, `recap in ${l.id}`)
      requireUnique(l.extension.id, `extension in ${l.id}`)
      if (l.extension.gradeBand !== "7-8") errors.push(`Extension "${l.extension.id}" must be gradeBand 7-8`)

      errors.push(...validateKnowledgeCheck(l.knowledgeCheck, l.id, requireUnique))
    })

    // Required concepts must appear somewhere in the week's text.
    const haystack = weekConceptHaystack(w).toLowerCase()
    w.requiredConcepts.forEach((concept) => {
      if (!conceptCovered(concept, haystack)) {
        errors.push(`Week ${w.week} is missing required concept "${concept}"`)
      }
    })
  })

  if (!course.weeks.some((w) => w.isFinal)) errors.push("No week is marked isFinal")

  // Final project rubric weights sum to 100; ids unique.
  course.finalProject.choices.forEach((c) => requireUnique(c.id, "final project choice"))
  course.finalProject.brief.forEach((b) => requireUnique(b.id, "final project brief field"))
  course.finalProject.requirements.forEach((r) => requireUnique(r.id, "final project requirement"))
  course.finalProject.rubric.forEach((r) => requireUnique(r.id, "rubric category"))
  const weightSum = course.finalProject.rubric.reduce((sum, r) => sum + r.weightPercent, 0)
  if (weightSum !== 100) errors.push(`Final project rubric weights sum to ${weightSum}, expected 100`)

  // Final assessment.
  errors.push(...validateKnowledgeCheckQuestions(course.finalAssessment.questions, course.finalAssessment.id, requireUnique))

  // Skills.
  course.skills.forEach((s) => requireUnique(s.id, "skill"))

  return errors
}

/**
 * A required concept counts as covered if its phrase (or a reasonable variant)
 * appears in the week's text. Concept labels can be compound: "Token or text
 * piece" is covered by either alternative; "Human decisions behind AI" is covered
 * by its core phrase "human decisions". This keeps the canonical concept list
 * (from the course spec) intact while matching how the concepts are actually
 * written for students.
 */
function conceptCovered(concept: string, haystack: string): boolean {
  const alternatives = concept.split(/\s+or\s+/i)
  return alternatives.some((alt) => {
    const phrase = alt.trim().toLowerCase()
    const core = phrase.replace(/\s+behind\s+.*$/, "").trim()
    return haystack.includes(phrase) || (core.length > 0 && haystack.includes(core))
  })
}

function weekConceptHaystack(week: CourseWeek): string {
  const parts: string[] = []
  week.lessons.forEach((l) => {
    l.vocabulary.forEach((v) => parts.push(v.term, v.definition))
    l.concepts.forEach((c) => {
      parts.push(c.title, ...c.body)
      if (c.examples) parts.push(...c.examples)
    })
    parts.push(l.title, l.summary)
  })
  return parts.join(" \n ")
}

function validateKnowledgeCheck(
  check: { id: string; questions: KnowledgeCheckLike[]; passThreshold: number },
  owner: string,
  requireUnique: (id: string, what: string) => void,
): string[] {
  const errors: string[] = []
  requireUnique(check.id, `knowledge check in ${owner}`)
  if (check.passThreshold < 1 || check.passThreshold > check.questions.length) {
    errors.push(`Knowledge check "${check.id}" has passThreshold ${check.passThreshold} out of range 1..${check.questions.length}`)
  }
  errors.push(...validateKnowledgeCheckQuestions(check.questions, check.id, requireUnique))
  return errors
}

type KnowledgeCheckLike = IntroToAiCourse["finalAssessment"]["questions"][number]

function validateKnowledgeCheckQuestions(
  questions: KnowledgeCheckLike[],
  owner: string,
  requireUnique: (id: string, what: string) => void,
): string[] {
  const errors: string[] = []
  questions.forEach((q) => {
    requireUnique(q.id, `question in ${owner}`)
    switch (q.kind) {
      case "single":
      case "scenario": {
        const correct = q.choices.filter((c) => c.correct)
        if (correct.length !== 1) errors.push(`Question "${q.id}" (${q.kind}) must have exactly one correct choice, has ${correct.length}`)
        q.choices.forEach((c) => requireUnique(c.id, `choice in ${q.id}`))
        break
      }
      case "multiple": {
        const correct = q.choices.filter((c) => c.correct)
        if (correct.length < 1) errors.push(`Question "${q.id}" (multiple) must have at least one correct choice`)
        q.choices.forEach((c) => requireUnique(c.id, `choice in ${q.id}`))
        break
      }
      case "true-false":
        if (typeof q.answer !== "boolean") errors.push(`Question "${q.id}" (true-false) must have a boolean answer`)
        break
      case "ordering": {
        const itemIds = q.items.map((i) => i.id)
        q.items.forEach((i) => requireUnique(i.id, `ordering item in ${q.id}`))
        const sameLength = itemIds.length === q.correctOrder.length
        const sameSet = itemIds.every((id) => q.correctOrder.includes(id))
        if (!sameLength || !sameSet) errors.push(`Question "${q.id}" (ordering) correctOrder must be a permutation of its item ids`)
        break
      }
    }
  })
  return errors
}
