/**
 * Week 5 — Synthetic content / misinformation investigation + AI ethics committee
 * + appeal design (framework-free, deterministic).
 *
 * Everything is fictional: invented publishers, posts, schools, and proposals. No
 * real private individuals. The verification model is based on SOURCE and CONTEXT
 * evidence — not on "spot the weird hands." The course explicitly does NOT claim it
 * can perfectly detect AI-generated content; real images can appear in false posts,
 * and AI images can be honestly labeled.
 */

/* ========================================================================== */
/* Activity 3 — Misinformation investigation                                   */
/* ========================================================================== */

import { translations, type Translations } from "../../../../i18n/translations.ts"

/**
 * The Week 5 content wording. Every id, verdict, decision and safeguard key stays
 * English because the answer key and the student's saved work depend on them.
 */
export type Week5ContentStrings = Translations["courseUi"]["ai"]["week5Content"]

const EN: Week5ContentStrings = translations.en.courseUi.ai.week5Content

export type Verdict = "trust" | "question" | "unconfirmed"

export const verdicts = (S: Week5ContentStrings = EN): { id: Verdict; label: string; note: string }[] => [
  { id: "trust", label: S.vTrust, note: S.vTrustNote },
  { id: "question", label: S.vQuestion, note: S.vQuestionNote },
  { id: "unconfirmed", label: S.vUnconfirmed, note: S.vUnconfirmedNote },
]

/** The English base, for code that only needs the ids and their order. */
export const VERDICTS = verdicts()

/** The seven source-and-context checks students run on every post. */
export type Evidence = {
  publisher: string
  /** Whether the publisher counts as a reliable original source. */
  publisherReliable: boolean
  originalSourceAvailable: boolean
  dateCorrect: boolean | "unknown"
  captionMatchesContext: boolean
  hasEvidence: boolean
  independentConfirmation: boolean
  asksForEmotionFirst: boolean
}

export type Post = {
  id: string
  headline: string
  /** What the post is describing (text-only; no real image shown). */
  imageDescription: string
  claim: string
  kind: string
  evidence: Evidence
  verdict: Verdict
  explanation: string
  /** A teaching note, e.g. about the limits of visual "tells". */
  teachingNote: string
}

/** The machine-readable half of each post; the prose comes from the strings. */
const POST_DATA: {
  id: string
  publisherReliable: boolean
  evidence: Omit<Evidence, "publisher" | "publisherReliable">
  verdict: Verdict
}[] = [
  { id: "post-ai-labeled", publisherReliable: true, verdict: "trust", evidence: { originalSourceAvailable: true, dateCorrect: true, captionMatchesContext: true, hasEvidence: true, independentConfirmation: true, asksForEmotionFirst: false } },
  { id: "post-edited-caption", publisherReliable: false, verdict: "question", evidence: { originalSourceAvailable: true, dateCorrect: false, captionMatchesContext: false, hasEvidence: false, independentConfirmation: false, asksForEmotionFirst: true } },
  { id: "post-wrong-context", publisherReliable: false, verdict: "question", evidence: { originalSourceAvailable: true, dateCorrect: true, captionMatchesContext: false, hasEvidence: false, independentConfirmation: false, asksForEmotionFirst: true } },
  { id: "post-fake-quote", publisherReliable: false, verdict: "question", evidence: { originalSourceAvailable: false, dateCorrect: "unknown", captionMatchesContext: false, hasEvidence: false, independentConfirmation: false, asksForEmotionFirst: true } },
  { id: "post-false-date", publisherReliable: false, verdict: "question", evidence: { originalSourceAvailable: true, dateCorrect: false, captionMatchesContext: true, hasEvidence: false, independentConfirmation: false, asksForEmotionFirst: true } },
  { id: "post-no-source", publisherReliable: false, verdict: "unconfirmed", evidence: { originalSourceAvailable: false, dateCorrect: "unknown", captionMatchesContext: true, hasEvidence: false, independentConfirmation: false, asksForEmotionFirst: false } },
  { id: "post-reliable", publisherReliable: true, verdict: "trust", evidence: { originalSourceAvailable: true, dateCorrect: true, captionMatchesContext: true, hasEvidence: true, independentConfirmation: true, asksForEmotionFirst: false } },
  { id: "post-emotional", publisherReliable: false, verdict: "question", evidence: { originalSourceAvailable: false, dateCorrect: "unknown", captionMatchesContext: false, hasEvidence: false, independentConfirmation: false, asksForEmotionFirst: true } },
]

export const posts = (S: Week5ContentStrings = EN): Post[] =>
  POST_DATA.map((d) => {
    const t = (S.scenariosAndPosts.posts as Record<string, Record<string, string>>)[d.id]
    return {
      id: d.id,
      headline: t.headline,
      imageDescription: t.imageDescription,
      claim: t.claim,
      kind: t.kind,
      evidence: { ...d.evidence, publisher: t.publisher, publisherReliable: d.publisherReliable },
      verdict: d.verdict,
      explanation: t.explanation,
      teachingNote: t.teachingNote,
    }
  })

/** The English base, for code that only needs the ids and the verdicts. */
export const POSTS: Post[] = posts()

export type EvidenceItem = { key: keyof Evidence; question: string; good: (e: Evidence) => boolean; describe: (e: Evidence) => string }

/** The seven investigation questions, each with how to read the evidence. */
export const evidenceItems = (S: Week5ContentStrings = EN): EvidenceItem[] => [
  { key: "publisher", question: S.eqPublisher, good: (e) => e.publisherReliable, describe: (e) => S.edPublisher.replace("{name}", e.publisher) },
  { key: "originalSourceAvailable", question: S.eqOriginal, good: (e) => e.originalSourceAvailable, describe: (e) => (e.originalSourceAvailable ? S.edOriginalYes : S.edOriginalNo) },
  { key: "dateCorrect", question: S.eqDate, good: (e) => e.dateCorrect === true, describe: (e) => (e.dateCorrect === true ? S.edDateYes : e.dateCorrect === false ? S.edDateNo : S.edDateUnknown) },
  { key: "captionMatchesContext", question: S.eqCaption, good: (e) => e.captionMatchesContext, describe: (e) => (e.captionMatchesContext ? S.edCaptionYes : S.edCaptionNo) },
  { key: "hasEvidence", question: S.eqEvidence, good: (e) => e.hasEvidence, describe: (e) => (e.hasEvidence ? S.edEvidenceYes : S.edEvidenceNo) },
  { key: "independentConfirmation", question: S.eqIndependent, good: (e) => e.independentConfirmation, describe: (e) => (e.independentConfirmation ? S.edIndependentYes : S.edIndependentNo) },
  { key: "asksForEmotionFirst", question: S.eqEmotion, good: (e) => !e.asksForEmotionFirst, describe: (e) => (e.asksForEmotionFirst ? S.edEmotionYes : S.edEmotionNo) },
]

/** The English base, for code that only needs the keys and their order. */
export const EVIDENCE_ITEMS: EvidenceItem[] = evidenceItems()

/** Counts how many of the seven checks look healthy for a post. */
export function evidenceScore(post: Post, S: Week5ContentStrings = EN): { good: number; total: number } {
  const items = evidenceItems(S)
  return { good: items.filter((it) => it.good(post.evidence)).length, total: items.length }
}

/* ========================================================================== */
/* Activity 4 — AI ethics committee                                            */
/* ========================================================================== */

export type Stakes = "low" | "high"
export type Decision = "approve" | "approve-safeguards" | "limited-pilot" | "reject" | "require-human-review"

export const decisions = (S: Week5ContentStrings = EN): { id: Decision; label: string }[] => [
  { id: "approve", label: S.dApprove },
  { id: "approve-safeguards", label: S.dApproveSafeguards },
  { id: "limited-pilot", label: S.dLimitedPilot },
  { id: "require-human-review", label: S.dRequireHumanReview },
  { id: "reject", label: S.dReject },
]

/** The English base, for code that only needs the ids and their order. */
export const DECISIONS = decisions()

export type SafeguardId = "human-review" | "appeal" | "data-minimization" | "explanation" | "representation-check" | "opt-out" | "limited-scope"

export const safeguards = (S: Week5ContentStrings = EN): { id: SafeguardId; label: string }[] => [
  { id: "human-review", label: S.sgHumanReview },
  { id: "appeal", label: S.sgAppeal },
  { id: "data-minimization", label: S.sgDataMinimization },
  { id: "explanation", label: S.sgExplanation },
  { id: "representation-check", label: S.sgRepresentationCheck },
  { id: "opt-out", label: S.sgOptOut },
  { id: "limited-scope", label: S.sgLimitedScope },
]

/** The English base, for code that only needs the ids and their order. */
export const SAFEGUARDS = safeguards()

export type EthicsScenario = {
  id: string
  name: string
  proposal: string
  intendedBenefit: string
  likelyMistakes: string[]
  peopleAffected: string[]
  stakes: Stakes
  /** Safeguards that are especially important for THIS scenario. */
  keySafeguards: SafeguardId[]
  /** Whether a plain non-AI process would likely be safer. */
  nonAiSaferHint: string
}

/** The machine-readable half of each scenario; the prose comes from the strings. */
const SCENARIO_DATA: { id: string; stakes: Stakes; keySafeguards: SafeguardId[] }[] = [
  { id: "eth-library", stakes: "low", keySafeguards: ["explanation", "opt-out", "data-minimization"] },
  { id: "eth-translate", stakes: "high", keySafeguards: ["human-review", "explanation"] },
  { id: "eth-cheating", stakes: "high", keySafeguards: ["human-review", "appeal", "representation-check", "explanation"] },
  { id: "eth-program", stakes: "high", keySafeguards: ["human-review", "appeal", "representation-check", "explanation", "opt-out"] },
  { id: "eth-attention", stakes: "high", keySafeguards: ["representation-check", "opt-out"] },
  { id: "eth-chatbot", stakes: "low", keySafeguards: ["explanation", "human-review"] },
]

export const ethicsScenarios = (S: Week5ContentStrings = EN): EthicsScenario[] =>
  SCENARIO_DATA.map((d) => {
    const t = (S.scenariosAndPosts.scenarios as Record<string, {
      name: string
      proposal: string
      intendedBenefit: string
      likelyMistakes: string[]
      peopleAffected: string[]
      nonAiSaferHint: string
    }>)[d.id]
    return {
      id: d.id,
      name: t.name,
      proposal: t.proposal,
      intendedBenefit: t.intendedBenefit,
      likelyMistakes: [...t.likelyMistakes],
      peopleAffected: [...t.peopleAffected],
      stakes: d.stakes,
      keySafeguards: d.keySafeguards,
      nonAiSaferHint: t.nonAiSaferHint,
    }
  })

/** The English base, for code that only needs the ids and the stakes. */
export const ETHICS_SCENARIOS: EthicsScenario[] = ethicsScenarios()

export function getEthicsScenario(id: string, S: Week5ContentStrings = EN): EthicsScenario | undefined {
  return ethicsScenarios(S).find((s) => s.id === id)
}

export type EthicsFeedback = {
  concerns: string[]
  strengths: string[]
  /** A soundness read: does the decision + safeguards fit the stakes? */
  soundness: "well-reasoned" | "needs-more-safeguards" | "reconsider"
}

/**
 * Evaluates an ethics decision WITHOUT declaring one choice "the" right answer. It
 * reasons about whether the chosen safeguards fit the scenario's stakes and key
 * risks, and returns structured, explanatory feedback.
 */
export function evaluateEthics(scenario: EthicsScenario, decision: Decision, chosenSafeguards: SafeguardId[], S: Week5ContentStrings = EN): EthicsFeedback {
  const chosen = new Set(chosenSafeguards)
  const labelOf = (id: SafeguardId) => safeguards(S).find((x) => x.id === id)!.label
  const concerns: string[] = []
  const strengths: string[] = []

  const missingKey = scenario.keySafeguards.filter((s) => !chosen.has(s))
  for (const s of scenario.keySafeguards.filter((s) => chosen.has(s))) {
    strengths.push(S.efStrength.replace("{label}", labelOf(s)))
  }

  const approvesUse = decision === "approve" || decision === "approve-safeguards" || decision === "limited-pilot"

  if (scenario.stakes === "high") {
    if (decision === "approve") concerns.push(S.efHighApprove)
    if (approvesUse && !chosen.has("human-review")) concerns.push(S.efNeedReview)
    if (approvesUse && !chosen.has("appeal")) concerns.push(S.efNeedAppeal)
  }

  if (approvesUse) {
    for (const s of missingKey) concerns.push(S.efConsiderAdding.replace("{label}", labelOf(s)))
  }

  if (decision === "reject" && scenario.stakes === "low") {
    concerns.push(S.efRejectLowStakes)
  }

  if (decision === "reject" && scenario.id === "eth-attention") {
    strengths.push(S.efRejectAttention)
  }
  if (decision === "require-human-review" && scenario.stakes === "high") {
    strengths.push(S.efRequireReviewFits)
  }

  let soundness: EthicsFeedback["soundness"] = "well-reasoned"
  if (scenario.stakes === "high" && approvesUse && (!chosen.has("human-review") || !chosen.has("appeal"))) {
    soundness = "reconsider"
  } else if (approvesUse && missingKey.length > 1) {
    soundness = "needs-more-safeguards"
  }
  if (concerns.length === 0) strengths.push(S.efFits)

  return { concerns, strengths, soundness }
}

/* ========================================================================== */
/* Appeal & correction design                                                  */
/* ========================================================================== */

export type AppealField = { id: string; prompt: string; hint: string }

export const appealFields = (S: Week5ContentStrings = EN): AppealField[] => [
  { id: "disclosure", prompt: S.apDisclosure, hint: S.apDisclosureHint },
  { id: "requestExplanation", prompt: S.apRequestExplanation, hint: S.apRequestExplanationHint },
  { id: "reviewer", prompt: S.apReviewer, hint: S.apReviewerHint },
  { id: "correctData", prompt: S.apCorrectData, hint: S.apCorrectDataHint },
  { id: "documentation", prompt: S.apDocumentation, hint: S.apDocumentationHint },
  { id: "override", prompt: S.apOverride, hint: S.apOverrideHint },
]

/** The English base, for code that only needs the ids and their order. */
export const APPEAL_FIELDS: AppealField[] = appealFields()

/** An appeal design is complete when every required part has a real answer. */
export function appealComplete(answers: Record<string, string>): { complete: boolean; missing: string[] } {
  const missing = APPEAL_FIELDS.filter((f) => (answers[f.id] ?? "").trim().length < 3).map((f) => f.id)
  return { complete: missing.length === 0, missing }
}
