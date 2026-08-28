/**
 * Intro to AI — skill tracking (framework-free, deterministic).
 *
 * Twelve named skills, each shown with an understandable status rather than a
 * single overall percentage. Status is derived transparently from the student's
 * saved progress — attempted/passed knowledge checks, completed lessons, and (for
 * the design skill) a completed final project. The rules are documented here and
 * asserted by tests. No response text is ever scored by an AI; this only reads the
 * objective, locally-stored signals.
 */
import type { IntroToAiCourse } from "./types.ts"
import type { IntroToAiProgress } from "./progress.ts"
import type { Translations } from "../../../i18n/translations.ts"

/** The skill names and statuses in the reader's language. */
export type SkillStrings = Translations["courseUi"]["ai"]["skills"]

export type SkillStatus = "demonstrated" | "developing" | "review-recommended" | "not-attempted"

export const statusLabels = (K: SkillStrings): Record<SkillStatus, string> => ({
  demonstrated: K.stDemonstrated,
  developing: K.stDeveloping,
  "review-recommended": K.stReviewRecommended,
  "not-attempted": K.stNotAttempted,
})

export type SkillDef = {
  id: string
  label: string
  description: string
  weekLabel: string
  /** Lessons whose completion evidences this skill. */
  lessonIds: string[]
  /** Knowledge checks whose passing evidences this skill. */
  checkIds: string[]
  /** True for the design skill, which also needs a completed final project. */
  needsProject?: boolean
}

export const skillDefs = (K: SkillStrings): SkillDef[] => [
  { id: "sk-identify", label: K.skIdentify, description: K.skIdentifyDesc, weekLabel: "Week 1", lessonIds: ["w1l1"], checkIds: ["w1l1-kc"] },
  { id: "sk-rules", label: K.skRules, description: K.skRulesDesc, weekLabel: "Week 1", lessonIds: ["w1l2"], checkIds: ["w1l2-kc"] },
  { id: "sk-data", label: K.skData, description: K.skDataDesc, weekLabel: "Week 2", lessonIds: ["w2l1"], checkIds: ["w2l1-kc"] },
  { id: "sk-split", label: K.skSplit, description: K.skSplitDesc, weekLabel: "Week 2", lessonIds: ["w2l2"], checkIds: ["w2l2-kc"] },
  { id: "sk-accuracy", label: K.skAccuracy, description: K.skAccuracyDesc, weekLabel: "Week 3", lessonIds: ["w3l1", "w3l2"], checkIds: ["w3l1-kc", "w3l2-kc"] },
  { id: "sk-mistakes", label: K.skMistakes, description: K.skMistakesDesc, weekLabel: "Week 3", lessonIds: ["w3l3"], checkIds: ["w3l3-kc"] },
  { id: "sk-behavior", label: K.skBehavior, description: K.skBehaviorDesc, weekLabel: "Week 4", lessonIds: ["w4l1", "w4l3"], checkIds: ["w4l1-kc", "w4l3-kc"] },
  { id: "sk-privacy", label: K.skPrivacy, description: K.skPrivacyDesc, weekLabel: "Week 5", lessonIds: ["w5l2"], checkIds: ["w5l2-kc"] },
  { id: "sk-bias", label: K.skBias, description: K.skBiasDesc, weekLabel: "Week 5", lessonIds: ["w5l1"], checkIds: ["w5l1-kc"] },
  { id: "sk-misinfo", label: K.skMisinfo, description: K.skMisinfoDesc, weekLabel: "Week 5", lessonIds: ["w5l3"], checkIds: ["w5l3-kc"] },
  { id: "sk-oversight", label: K.skOversight, description: K.skOversightDesc, weekLabel: "Week 5", lessonIds: ["w5l3"], checkIds: ["w5l3-kc"] },
  { id: "sk-design", label: K.skDesign, description: K.skDesignDesc, weekLabel: "Week 6", lessonIds: ["w6l1", "w6l2", "w6l3"], checkIds: ["w6l1-kc", "w6l2-kc", "w6l3-kc"], needsProject: true },
]

/** Map of every knowledge-check id → its pass threshold, from the course data. */
export function buildCheckThresholds(course: IntroToAiCourse): Record<string, number> {
  const map: Record<string, number> = {}
  for (const week of course.weeks) for (const lesson of week.lessons) map[lesson.knowledgeCheck.id] = lesson.knowledgeCheck.passThreshold
  map[course.finalAssessment.id] = course.finalAssessment.passThreshold
  return map
}

export type SkillState = {
  skill: SkillDef
  status: SkillStatus
  /** How many of this skill's checks were passed / attempted, for transparency. */
  checksPassed: number
  checksAttempted: number
  lessonsComplete: number
}

/**
 * Status rules (documented, deterministic):
 *  - not-attempted: no relevant check attempted AND no relevant lesson started.
 *  - demonstrated: every relevant lesson complete AND every relevant check passed
 *    (AND, for the design skill, the final project is complete).
 *  - review-recommended: at least one relevant check attempted but NONE passed.
 *  - developing: anything in between (progress made, not yet fully demonstrated).
 */
export function computeSkillState(
  skill: SkillDef,
  progress: IntroToAiProgress,
  thresholds: Record<string, number>,
  projectComplete: boolean,
): SkillState {
  const attempted = skill.checkIds.filter((id) => progress.knowledgeChecks[id])
  const passed = skill.checkIds.filter((id) => {
    const a = progress.knowledgeChecks[id]
    return a != null && a.score >= (thresholds[id] ?? 1)
  })
  const lessonsComplete = skill.lessonIds.filter((id) => progress.completedLessons.includes(id))
  const lessonsStarted = skill.lessonIds.filter((id) => progress.startedLessons.includes(id))
  const projectOk = !skill.needsProject || projectComplete

  let status: SkillStatus
  if (attempted.length === 0 && lessonsStarted.length === 0) status = "not-attempted"
  else if (lessonsComplete.length === skill.lessonIds.length && passed.length === skill.checkIds.length && projectOk) status = "demonstrated"
  else if (attempted.length > 0 && passed.length === 0) status = "review-recommended"
  else status = "developing"

  return { skill, status, checksPassed: passed.length, checksAttempted: attempted.length, lessonsComplete: lessonsComplete.length }
}

export function computeSkillStates(
  progress: IntroToAiProgress,
  course: IntroToAiCourse,
  projectComplete: boolean,
  skills: SkillDef[],
): SkillState[] {
  const thresholds = buildCheckThresholds(course)
  return skills.map((s) => computeSkillState(s, progress, thresholds, projectComplete))
}

export function summarizeSkills(states: SkillState[]): Record<SkillStatus, number> {
  const out: Record<SkillStatus, number> = { demonstrated: 0, developing: 0, "review-recommended": 0, "not-attempted": 0 }
  for (const s of states) out[s.status] += 1
  return out
}
