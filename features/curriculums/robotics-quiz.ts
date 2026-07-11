/**
 * Knowledge-check grading: pure, framework-free logic shared by the interactive
 * quiz renderer and its tests. Every student answer is stored as a single string
 * (so it fits the existing `KnowledgeCheckAttempt.selectedAnswers` shape without a
 * schema change); this module knows how to interpret and grade that string for
 * each question kind.
 *
 * Answer encodings:
 * - single / trace / scenario -> the chosen option id
 * - multiple                  -> chosen option ids, comma-separated
 * - true-false                -> "true" | "false"
 * - ordering                  -> item ids in the chosen order, comma-separated
 * - matching                  -> JSON object { [pairId]: chosenPairId }
 * - short                     -> the raw text the student wrote
 */

import type { KnowledgeCheck, KnowledgeCheckQuestion } from "./robotics.ts"

function splitIds(raw: string): string[] {
  return raw ? raw.split(",").filter((s) => s.length > 0) : []
}

function parseMatch(raw: string): Record<string, string> {
  try {
    const parsed = JSON.parse(raw || "{}")
    return parsed && typeof parsed === "object" ? (parsed as Record<string, string>) : {}
  } catch {
    return {}
  }
}

/** Whether the student has actually provided an answer of the right shape. */
export function isAnswered(question: KnowledgeCheckQuestion, raw: string): boolean {
  switch (question.kind) {
    case "multiple":
      return splitIds(raw).length > 0
    case "ordering":
      return splitIds(raw).length === question.items.length
    case "matching": {
      const map = parseMatch(raw)
      return question.pairs.every((p) => typeof map[p.id] === "string" && map[p.id].length > 0)
    }
    case "short":
      return raw.trim().length > 0
    default:
      return raw.length > 0
  }
}

/** Grade a single answer. */
export function isAnswerCorrect(question: KnowledgeCheckQuestion, raw: string): boolean {
  switch (question.kind) {
    case "single":
    case "trace":
    case "scenario":
      return raw === question.correctOptionId
    case "multiple": {
      const chosen = splitIds(raw).sort()
      const correct = [...question.correctOptionIds].sort()
      return chosen.length === correct.length && chosen.every((id, i) => id === correct[i])
    }
    case "true-false":
      return raw === String(question.answer)
    case "ordering": {
      const order = splitIds(raw)
      return (
        order.length === question.correctOrder.length &&
        order.every((id, i) => id === question.correctOrder[i])
      )
    }
    case "matching": {
      const map = parseMatch(raw)
      return question.pairs.every((p) => map[p.id] === p.id)
    }
    case "short": {
      const text = raw.trim().toLowerCase()
      if (text.length === 0) return false
      if (question.keywords.length === 0) return true
      return question.keywords.some((k) => text.includes(k.toLowerCase()))
    }
  }
}

/** Score a whole set of answers (keyed by question id). */
export function scoreQuiz(
  questions: KnowledgeCheckQuestion[],
  answers: Record<string, string>,
): { score: number; total: number } {
  let score = 0
  for (const q of questions) {
    if (isAnswerCorrect(q, answers[q.id] ?? "")) score += 1
  }
  return { score, total: questions.length }
}

/** How many questions have been answered so far (for engagement-based completion). */
export function answeredCount(
  questions: KnowledgeCheckQuestion[],
  answers: Record<string, string>,
): number {
  return questions.reduce((n, q) => (isAnswered(q, answers[q.id] ?? "") ? n + 1 : n), 0)
}

/** Whether every question has been answered - the bar for "the check was submitted". */
export function allAnswered(
  questions: KnowledgeCheckQuestion[],
  answers: Record<string, string>,
): boolean {
  return answeredCount(questions, answers) === questions.length
}

/** Whether a saved attempt counts as passing the check. */
export function isPassing(check: KnowledgeCheck, score: number): boolean {
  return score >= check.passThreshold
}
