/**
 * Intro to AI — pure knowledge-check grading.
 *
 * Framework-free so it can be unit-tested and shared by the interactive
 * knowledge-check component and the final assessment. Answers are encoded as
 * plain strings so they serialize cleanly into progress storage:
 *  - single / scenario : the chosen choice id
 *  - true-false        : "true" or "false"
 *  - multiple          : selected choice ids, comma-joined (order-independent)
 *  - ordering          : item ids in the learner's chosen order, comma-joined
 */
import type { KnowledgeCheckQuestion } from "./intro-to-ai-types.ts"

const SEP = ","

export function parseList(raw: string): string[] {
  return raw ? raw.split(SEP).filter(Boolean) : []
}

export function encodeList(ids: string[]): string {
  return ids.join(SEP)
}

/** Whether the learner has provided any answer to the question. */
export function isAnswered(question: KnowledgeCheckQuestion, raw: string | undefined): boolean {
  if (raw == null || raw === "") return false
  if (question.kind === "ordering") {
    // An untouched ordering (still in the given order) still counts as answered
    // once the learner has confirmed; presence of a value is enough.
    return parseList(raw).length === question.items.length
  }
  if (question.kind === "multiple") return parseList(raw).length > 0
  return true
}

/** Whether the learner's answer is correct. */
export function isCorrect(question: KnowledgeCheckQuestion, raw: string | undefined): boolean {
  if (raw == null || raw === "") return false
  switch (question.kind) {
    case "single":
    case "scenario": {
      const choice = question.choices.find((c) => c.id === raw)
      return Boolean(choice?.correct)
    }
    case "true-false":
      return (raw === "true") === question.answer
    case "multiple": {
      const selected = new Set(parseList(raw))
      const correct = new Set(question.choices.filter((c) => c.correct).map((c) => c.id))
      if (selected.size !== correct.size) return false
      for (const id of selected) if (!correct.has(id)) return false
      return true
    }
    case "ordering":
      return encodeList(parseList(raw)) === encodeList(question.correctOrder)
  }
}

export function scoreCheck(
  questions: KnowledgeCheckQuestion[],
  answers: Record<string, string>,
): { score: number; total: number } {
  let score = 0
  for (const q of questions) if (isCorrect(q, answers[q.id])) score += 1
  return { score, total: questions.length }
}

/**
 * Partial credit in [0,1] for a single question. Objective single-answer kinds are
 * all-or-nothing; a multiple-select question earns the share of the correct set it
 * identified, minus a penalty for each wrong pick (never below 0). Used where
 * partial credit is conceptually appropriate (e.g. evidence selection).
 */
export function partialScore(question: KnowledgeCheckQuestion, raw: string | undefined): number {
  if (question.kind !== "multiple") return isCorrect(question, raw) ? 1 : 0
  const selected = new Set(parseList(raw ?? ""))
  const correct = new Set(question.choices.filter((c) => c.correct).map((c) => c.id))
  if (correct.size === 0) return selected.size === 0 ? 1 : 0
  let right = 0
  let wrong = 0
  for (const id of selected) (correct.has(id) ? (right += 1) : (wrong += 1))
  return Math.max(0, (right - wrong) / correct.size)
}

export function answeredCount(
  questions: KnowledgeCheckQuestion[],
  answers: Record<string, string>,
): number {
  return questions.reduce((n, q) => (isAnswered(q, answers[q.id]) ? n + 1 : n), 0)
}

export function allAnswered(
  questions: KnowledgeCheckQuestion[],
  answers: Record<string, string>,
): boolean {
  return questions.every((q) => isAnswered(q, answers[q.id]))
}

export function isPassing(passThreshold: number, score: number): boolean {
  return score >= passThreshold
}
