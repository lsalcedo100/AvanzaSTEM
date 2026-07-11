// Grading tests for every knowledge-check question kind.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import { getRoboticsModuleById, roboticsCurriculum, type KnowledgeCheckQuestion } from "./robotics.ts"
import { allAnswered, answeredCount, isAnswerCorrect, isAnswered, scoreQuiz } from "./robotics-quiz.ts"

/** Find one real question of a given kind across the curriculum. */
function questionOfKind(kind: KnowledgeCheckQuestion["kind"]): KnowledgeCheckQuestion {
  for (const m of roboticsCurriculum.modules) {
    const q = m.knowledgeCheck.questions.find((x) => x.kind === kind)
    if (q) return q
  }
  throw new Error(`no ${kind} question in the curriculum`)
}

test("single choice grades by the correct option id", () => {
  const q = questionOfKind("single")
  assert.equal(q.kind, "single")
  if (q.kind !== "single") return
  assert.ok(isAnswerCorrect(q, q.correctOptionId))
  const wrong = q.options.find((o) => o.id !== q.correctOptionId)!
  assert.ok(!isAnswerCorrect(q, wrong.id))
  assert.ok(!isAnswerCorrect(q, ""))
})

test("multiple choice requires the exact set", () => {
  const q = questionOfKind("multiple")
  if (q.kind !== "multiple") return
  assert.ok(isAnswerCorrect(q, [...q.correctOptionIds].reverse().join(",")))
  assert.ok(!isAnswerCorrect(q, q.correctOptionIds.slice(0, 1).join(",")), "a subset is wrong")
  const extra = q.options.find((o) => !o.correct)!
  assert.ok(!isAnswerCorrect(q, [...q.correctOptionIds, extra.id].join(",")), "an extra pick is wrong")
})

test("true-false grades against the boolean answer", () => {
  const q = questionOfKind("true-false")
  if (q.kind !== "true-false") return
  assert.ok(isAnswerCorrect(q, String(q.answer)))
  assert.ok(!isAnswerCorrect(q, String(!q.answer)))
})

test("ordering requires the exact sequence", () => {
  const q = questionOfKind("ordering")
  if (q.kind !== "ordering") return
  assert.ok(isAnswerCorrect(q, q.correctOrder.join(",")))
  assert.ok(!isAnswerCorrect(q, [...q.correctOrder].reverse().join(",")))
  assert.ok(!isAnswered(q, q.correctOrder.slice(0, 1).join(",")), "partial order is not answered")
})

test("matching requires each left mapped to its own pair", () => {
  const q = questionOfKind("matching")
  if (q.kind !== "matching") return
  const right = JSON.stringify(Object.fromEntries(q.pairs.map((p) => [p.id, p.id])))
  assert.ok(isAnswerCorrect(q, right))
  const wrong = JSON.stringify(
    Object.fromEntries(q.pairs.map((p, i) => [p.id, q.pairs[(i + 1) % q.pairs.length].id])),
  )
  assert.ok(!isAnswerCorrect(q, wrong))
  assert.ok(!isAnswerCorrect(q, "not json"))
})

test("short response is correct when it contains a keyword", () => {
  const q = questionOfKind("short")
  if (q.kind !== "short") return
  assert.ok(isAnswerCorrect(q, `something with ${q.keywords[0]} in it`))
  assert.ok(!isAnswerCorrect(q, ""))
  assert.ok(!isAnswerCorrect(q, "zzz nothing relevant here qqq"))
})

test("trace and scenario grade like single choice", () => {
  for (const kind of ["trace", "scenario"] as const) {
    const q = questionOfKind(kind)
    if (q.kind !== "trace" && q.kind !== "scenario") continue
    assert.ok(isAnswerCorrect(q, q.correctOptionId))
    const wrong = q.options.find((o) => o.id !== q.correctOptionId)!
    assert.ok(!isAnswerCorrect(q, wrong.id))
  }
})

test("scoreQuiz and answered counts work across a real check", () => {
  const week3 = getRoboticsModuleById("week-3")!
  const questions = week3.knowledgeCheck.questions
  // Build a fully-correct answer sheet for every kind.
  const answers: Record<string, string> = {}
  for (const q of questions) {
    switch (q.kind) {
      case "single":
      case "trace":
      case "scenario":
        answers[q.id] = q.correctOptionId
        break
      case "multiple":
        answers[q.id] = q.correctOptionIds.join(",")
        break
      case "true-false":
        answers[q.id] = String(q.answer)
        break
      case "ordering":
        answers[q.id] = q.correctOrder.join(",")
        break
      case "matching":
        answers[q.id] = JSON.stringify(Object.fromEntries(q.pairs.map((p) => [p.id, p.id])))
        break
      case "short":
        answers[q.id] = q.keywords[0] ?? "answer"
        break
    }
  }
  assert.ok(allAnswered(questions, answers))
  assert.equal(answeredCount(questions, answers), questions.length)
  const { score, total } = scoreQuiz(questions, answers)
  assert.equal(score, total)
  assert.equal(total, questions.length)

  // An empty sheet scores zero and is not fully answered.
  assert.deepEqual(scoreQuiz(questions, {}), { score: 0, total: questions.length })
  assert.ok(!allAnswered(questions, {}))
})
