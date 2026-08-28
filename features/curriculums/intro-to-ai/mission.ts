/**
 * AI Review Mission — the scenario-based final assessment (framework-free).
 *
 * The student reviews a fictional AI product and answers objective questions
 * (concepts, result interpretation, fairness/privacy, misinformation) plus writes a
 * final recommendation. Objective questions reuse the shared knowledge-check grader;
 * the written recommendation is evaluated by whether the REQUIRED REASONING is
 * present — never marked wrong just for differing from a preset choice. Everything
 * is fictional and local; no response is sent to any AI grader.
 */
import type { KnowledgeCheckQuestion } from "./types.ts"
import type { Translations } from "../../../i18n/translations.ts"

export const MISSION_ID = "ai-review-mission"

/**
 * The mission text in the reader's language. The ids, correct answers, chart
 * numbers, and thresholds live here in code; only the prose comes from the
 * translations, so grading and saved answers stay language-independent.
 */
export type MissionStrings = Translations["courseUi"]["ai"]["mission"]

export const missionScenario = (M: MissionStrings): string => M.scenario

export type MissionSection = { id: string; title: string; description: string; questionIds: string[] }

/** All objective questions, in section order. `context` powers the
 *  result-interpretation questions; `skillId` maps each to a skill. */
export const missionQuestions = (M: MissionStrings): KnowledgeCheckQuestion[] => [
  /* A · Concepts (4) */
  {
    id: "m-a1",
    kind: "single",
    skillId: "sk-identify",
    prompt: M.qA1Prompt,
    explanation: M.qA1Exp,
    choices: [
      { id: "m-a1-a", text: M.qA1aText, correct: true, explanation: M.qA1aExp },
      { id: "m-a1-b", text: M.qA1bText, correct: false, explanation: M.qA1bExp },
      { id: "m-a1-c", text: M.qA1cText, correct: false, explanation: M.qA1cExp },
      { id: "m-a1-d", text: M.qA1dText, correct: false, explanation: M.qA1dExp },
    ],
  },
  {
    id: "m-a2",
    kind: "single",
    skillId: "sk-split",
    prompt: M.qA2Prompt,
    explanation: M.qA2Exp,
    choices: [
      { id: "m-a2-a", text: M.qA2aText, correct: false, explanation: M.qA2aExp },
      { id: "m-a2-b", text: M.qA2bText, correct: true, explanation: M.qA2bExp },
      { id: "m-a2-c", text: M.qA2cText, correct: false, explanation: M.qA2cExp },
      { id: "m-a2-d", text: M.qA2dText, correct: false, explanation: M.qA2dExp },
    ],
  },
  {
    id: "m-a3",
    kind: "single",
    skillId: "sk-accuracy",
    prompt: M.qA3Prompt,
    explanation: M.qA3Exp,
    choices: [
      { id: "m-a3-a", text: M.qA3aText, correct: false, explanation: M.qA3aExp },
      { id: "m-a3-b", text: M.qA3bText, correct: true, explanation: M.qA3bExp },
      { id: "m-a3-c", text: M.qA3cText, correct: false, explanation: M.qA3cExp },
      { id: "m-a3-d", text: M.qA3dText, correct: false, explanation: M.qA3dExp },
    ],
  },
  {
    id: "m-a4",
    kind: "single",
    skillId: "sk-behavior",
    prompt: M.qA4Prompt,
    explanation: M.qA4Exp,
    choices: [
      { id: "m-a4-a", text: M.qA4aText, correct: true, explanation: M.qA4aExp },
      { id: "m-a4-b", text: M.qA4bText, correct: false, explanation: M.qA4bExp },
      { id: "m-a4-c", text: M.qA4cText, correct: false, explanation: M.qA4cExp },
      { id: "m-a4-d", text: M.qA4dText, correct: false, explanation: M.qA4dExp },
    ],
  },

  /* B · Result interpretation (3) — each shows a chart/table first */
  {
    id: "m-b1",
    kind: "single",
    skillId: "sk-bias",
    prompt: M.qB1Prompt,
    explanation: M.qB1Exp,
    context: {
      id: "m-b1-ctx",
      kind: "bar-chart",
      title: M.qB1CtxTitle,
      summary: M.qB1CtxSummary,
      chart: {
        unit: M.unitPercentCorrect,
        bars: [
          { label: M.barOverall, value: 91 },
          { label: M.barGroupA, value: 94 },
          { label: M.barGroupB, value: 62 },
        ],
      },
    },
    choices: [
      { id: "m-b1-a", text: M.qB1aText, correct: false, explanation: M.qB1aExp },
      { id: "m-b1-b", text: M.qB1bText, correct: true, explanation: M.qB1bExp },
      { id: "m-b1-c", text: M.qB1cText, correct: false, explanation: M.qB1cExp },
      { id: "m-b1-d", text: M.qB1dText, correct: false, explanation: M.qB1dExp },
    ],
  },
  {
    id: "m-b2",
    kind: "single",
    skillId: "sk-mistakes",
    prompt: M.qB2Prompt,
    explanation: M.qB2Exp,
    context: {
      id: "m-b2-ctx",
      kind: "confusion-matrix",
      title: M.qB2CtxTitle,
      summary: M.qB2CtxSummary,
      matrix: { labels: [M.labelApprove, M.labelReview], counts: [[40, 18], [5, 37]] },
    },
    choices: [
      { id: "m-b2-a", text: M.qB2aText, correct: true, explanation: M.qB2aExp },
      { id: "m-b2-b", text: M.qB2bText, correct: false, explanation: M.qB2bExp },
      { id: "m-b2-c", text: M.qB2cText, correct: false, explanation: M.qB2cExp },
      { id: "m-b2-d", text: M.qB2dText, correct: false, explanation: M.qB2dExp },
    ],
  },
  {
    id: "m-b3",
    kind: "single",
    skillId: "sk-accuracy",
    prompt: M.qB3Prompt,
    explanation: M.qB3Exp,
    context: {
      id: "m-b3-ctx",
      kind: "bar-chart",
      title: M.qB3CtxTitle,
      summary: M.qB3CtxSummary,
      chart: {
        unit: M.unitPercentConfidence,
        bars: [
          { label: M.labelReview, value: 54 },
          { label: M.labelApprove, value: 46 },
        ],
      },
    },
    choices: [
      { id: "m-b3-a", text: M.qB3aText, correct: false, explanation: M.qB3aExp },
      { id: "m-b3-b", text: M.qB3bText, correct: true, explanation: M.qB3bExp },
      { id: "m-b3-c", text: M.qB3cText, correct: false, explanation: M.qB3cExp },
      { id: "m-b3-d", text: M.qB3dText, correct: false, explanation: M.qB3dExp },
    ],
  },

  /* C · Fairness / privacy decisions (2) */
  {
    id: "m-c1",
    kind: "multiple",
    skillId: "sk-bias",
    prompt: M.qC1Prompt,
    explanation: M.qC1Exp,
    choices: [
      { id: "m-c1-a", text: M.qC1aText, correct: true, explanation: M.qC1aExp },
      { id: "m-c1-b", text: M.qC1bText, correct: true, explanation: M.qC1bExp },
      { id: "m-c1-c", text: M.qC1cText, correct: false, explanation: M.qC1cExp },
      { id: "m-c1-d", text: M.qC1dText, correct: false, explanation: M.qC1dExp },
    ],
  },
  {
    id: "m-c2",
    kind: "multiple",
    skillId: "sk-privacy",
    prompt: M.qC2Prompt,
    explanation: M.qC2Exp,
    choices: [
      { id: "m-c2-a", text: M.qC2aText, correct: true, explanation: M.qC2aExp },
      { id: "m-c2-b", text: M.qC2bText, correct: true, explanation: M.qC2bExp },
      { id: "m-c2-c", text: M.qC2cText, correct: true, explanation: M.qC2cExp },
      { id: "m-c2-d", text: M.qC2dText, correct: false, explanation: M.qC2dExp },
    ],
  },

  /* D · Misinformation investigation (1) */
  {
    id: "m-d1",
    kind: "multiple",
    skillId: "sk-misinfo",
    prompt: M.qD1Prompt,
    explanation: M.qD1Exp,
    choices: [
      { id: "m-d1-a", text: M.qD1aText, correct: true, explanation: M.qD1aExp },
      { id: "m-d1-b", text: M.qD1bText, correct: true, explanation: M.qD1bExp },
      { id: "m-d1-c", text: M.qD1cText, correct: true, explanation: M.qD1cExp },
      { id: "m-d1-d", text: M.qD1dText, correct: true, explanation: M.qD1dExp },
    ],
  },
]

export const missionSections = (M: MissionStrings): MissionSection[] => [
  { id: "A", title: M.secATitle, description: M.secADesc, questionIds: ["m-a1", "m-a2", "m-a3", "m-a4"] },
  { id: "B", title: M.secBTitle, description: M.secBDesc, questionIds: ["m-b1", "m-b2", "m-b3"] },
  { id: "C", title: M.secCTitle, description: M.secCDesc, questionIds: ["m-c1", "m-c2"] },
  { id: "D", title: M.secDTitle, description: M.secDDesc, questionIds: ["m-d1"] },
]

/* ---- E · Written recommendation ---- */

export type RecommendationDecision = "approve" | "approve-safeguards" | "limited-pilot" | "reject"

/** The saved decision values, kept apart from the labels so storage is language-independent. */
export const RECOMMENDATION_DECISION_IDS: RecommendationDecision[] = [
  "approve",
  "approve-safeguards",
  "limited-pilot",
  "reject",
]

export const recommendationDecisions = (
  M: MissionStrings,
): { id: RecommendationDecision; label: string }[] => [
  { id: "approve", label: M.decApprove },
  { id: "approve-safeguards", label: M.decApproveSafeguards },
  { id: "limited-pilot", label: M.decLimitedPilot },
  { id: "reject", label: M.decReject },
]

/** The saved reason keys, for the same reason. */
export const REASON_FIELD_IDS = [
  "benefits",
  "mistakes",
  "privacy",
  "fairness",
  "oversight",
  "appeal",
]

export const reasonFields = (M: MissionStrings): { id: string; label: string; hint: string }[] => [
  { id: "benefits", label: M.rfBenefits, hint: M.rfBenefitsHint },
  { id: "mistakes", label: M.rfMistakes, hint: M.rfMistakesHint },
  { id: "privacy", label: M.rfPrivacy, hint: M.rfPrivacyHint },
  { id: "fairness", label: M.rfFairness, hint: M.rfFairnessHint },
  { id: "oversight", label: M.rfOversight, hint: M.rfOversightHint },
  { id: "appeal", label: M.rfAppeal, hint: M.rfAppealHint },
]

export type RecommendationAnswer = { decision: RecommendationDecision | ""; reasons: Record<string, string> }

export function emptyRecommendation(): RecommendationAnswer {
  return { decision: "", reasons: {} }
}

/**
 * Evaluates the written recommendation by the PRESENCE of required reasoning — a
 * decision must be chosen and every reason area must have a real answer. Any of the
 * four decisions can be valid; it is never "wrong" merely for differing from a
 * preset choice.
 */
export function evaluateRecommendation(answer: RecommendationAnswer): { complete: boolean; hasDecision: boolean; missing: string[] } {
  const hasDecision = answer.decision !== ""
  const missing = REASON_FIELD_IDS.filter((id) => (answer.reasons[id] ?? "").trim().length < 3)
  return { complete: hasDecision && missing.length === 0, hasDecision, missing }
}

export function parseRecommendation(raw: string | undefined): RecommendationAnswer {
  if (!raw) return emptyRecommendation()
  try {
    const d = JSON.parse(raw) as Partial<RecommendationAnswer>
    const decision = RECOMMENDATION_DECISION_IDS.some((x) => x === d.decision) ? (d.decision as RecommendationDecision) : ""
    const reasons: Record<string, string> = {}
    if (d.reasons && typeof d.reasons === "object") for (const id of REASON_FIELD_IDS) reasons[id] = typeof (d.reasons as Record<string, unknown>)[id] === "string" ? (d.reasons as Record<string, string>)[id] : ""
    return { decision, reasons }
  } catch {
    return emptyRecommendation()
  }
}

export const MISSION_PASS_THRESHOLD = 7 // of 10 objective questions — not perfection

/* ---- Final course reflection (saved as course reflections) ---- */

/** The saved reflection keys, kept apart from the prompts so storage is language-independent. */
export const FINAL_REFLECTION_IDS = ["final-r1", "final-r2", "final-r3", "final-r4", "final-r5"]

export const finalReflectionPrompts = (M: MissionStrings): { id: string; prompt: string }[] => [
  { id: "final-r1", prompt: M.frR1 },
  { id: "final-r2", prompt: M.frR2 },
  { id: "final-r3", prompt: M.frR3 },
  { id: "final-r4", prompt: M.frR4 },
  { id: "final-r5", prompt: M.frR5 },
]
