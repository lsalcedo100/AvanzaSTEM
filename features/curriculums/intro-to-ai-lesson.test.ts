import { test } from "node:test"
import assert from "node:assert/strict"

import { introToAiCourse, getLesson, getWeek, lessonSections, lessonNeighbors } from "./intro-to-ai.ts"
import {
  emptyIntroToAiProgress,
  saveKnowledgeCheckAttempt,
  savePrediction,
  saveReflection,
  lessonRequirements,
  lessonRequirementsMet,
} from "./intro-to-ai-progress.ts"
import type { LessonSection } from "./intro-to-ai-types.ts"

const AT = "2026-07-11T09:00:00.000Z"

const ALL_KINDS: LessonSection["kind"][] = [
  "objectives",
  "opening",
  "prediction",
  "vocabulary",
  "concept",
  "worked-example",
  "visual",
  "activity",
  "knowledge-check",
  "challenge",
  "reflection",
  "recap",
  "extension",
]

/* --------------------------- section rendering --------------------------- */

test("every lesson produces the full ordered section sequence without missing fields", () => {
  for (const w of introToAiCourse.weeks) {
    for (const l of w.lessons) {
      const sections = lessonSections(l)
      const kinds = sections.map((s) => s.kind)
      // First is objectives, last is extension; core interactive kinds present.
      assert.equal(kinds[0], "objectives", `${l.id} should start with objectives`)
      assert.equal(kinds[kinds.length - 1], "extension", `${l.id} should end with extension`)
      for (const required of ["prediction", "activity", "knowledge-check", "reflection", "recap"]) {
        assert.ok(kinds.includes(required as LessonSection["kind"]), `${l.id} missing ${required}`)
      }
      // No section kind outside the known union (guards the renderer switch).
      for (const k of kinds) assert.ok(ALL_KINDS.includes(k), `unknown section kind ${k} in ${l.id}`)
    }
  }
})

test("across all lessons, every supported section kind is exercised by real data", () => {
  const seen = new Set<string>()
  for (const w of introToAiCourse.weeks) {
    for (const l of w.lessons) {
      for (const s of lessonSections(l)) seen.add(s.kind)
    }
  }
  for (const kind of ALL_KINDS) assert.ok(seen.has(kind), `no lesson exercises section kind "${kind}"`)
})

/* ------------------------------ navigation ------------------------------- */

test("first lesson has no previous; last lesson has no next", () => {
  const first = lessonNeighbors(1, "ai-or-not")
  assert.equal(first.prev, null)
  assert.ok(first.next)

  const lastWeek = introToAiCourse.weeks[introToAiCourse.weeks.length - 1]
  const lastLesson = lastWeek.lessons[lastWeek.lessons.length - 1]
  const last = lessonNeighbors(lastWeek.week, lastLesson.slug)
  assert.equal(last.next, null)
  assert.ok(last.prev)
})

test("next crosses week boundaries in order", () => {
  const w1 = getWeek(1)!
  const lastOfW1 = w1.lessons[w1.lessons.length - 1]
  const { next } = lessonNeighbors(1, lastOfW1.slug)
  assert.equal(next?.week, 2)
  assert.equal(next?.lesson.slug, getWeek(2)!.lessons[0].slug)
})

/* -------------------------- completion rules ----------------------------- */

test("lesson completion requires attempting the knowledge check, not a perfect score or a visit", () => {
  const lesson = getLesson(1, "ai-or-not")!
  let p = emptyIntroToAiProgress()

  // Fresh: not completable (visiting alone does nothing).
  assert.equal(lessonRequirementsMet(p, lesson), false)
  const reqs = lessonRequirements(p, lesson)
  assert.equal(reqs.find((r) => r.id === "knowledge-check")?.required, true)
  assert.equal(reqs.find((r) => r.id === "reflection")?.required, false)

  // Attempting the check (even with a wrong/empty answer set) satisfies the required rule.
  p = saveKnowledgeCheckAttempt(p, lesson.knowledgeCheck.id, lesson.knowledgeCheck.questions, {}, AT)
  assert.equal(lessonRequirementsMet(p, lesson), true)
})

test("teacher unlockAll lets a lesson be completed without the knowledge check", () => {
  const lesson = getLesson(2, "training-vs-testing")!
  const p = { ...emptyIntroToAiProgress(), unlockAll: true }
  assert.equal(lessonRequirementsMet(p, lesson), true)
})

/* --------------------- prediction & reflection saving -------------------- */

test("predictions save without being marked right or wrong", () => {
  const lesson = getLesson(1, "ai-or-not")!
  const promptId = lesson.predictionPrompt.id
  const p = savePrediction(emptyIntroToAiProgress(), promptId, "I think the spam filter uses AI.", AT)
  assert.equal(p.predictions[promptId], "I think the spam filter uses AI.")
})

test("reflections save and count toward the recommended requirement", () => {
  const lesson = getLesson(1, "ai-or-not")!
  let p = emptyIntroToAiProgress()
  p = saveReflection(p, lesson.reflection[0].id, "AI is everywhere.", AT)
  assert.equal(p.reflections[lesson.reflection[0].id], "AI is everywhere.")
  assert.equal(lessonRequirements(p, lesson).find((r) => r.id === "reflection")?.met, true)
})

/* --------------------------- activity kinds ------------------------------ */

test("Week 1 lessons use the three intended interactive activity kinds", () => {
  // The registry (React components) is verified at build/runtime; here we assert
  // the curriculum wires the intended kinds, keeping this test JSX-free.
  const w1kinds = getWeek(1)!.lessons.map((l) => l.activity.kind)
  assert.deepEqual(w1kinds, ["ai-detective", "rule-builder", "device-investigation"])
})

/* ----------------------- structured diagram data ------------------------- */

test("sample visuals carry structured diagram data for the flow/before-after/tree renderers", () => {
  const findVisual = (week: number, slug: string, visualId: string) =>
    getLesson(week, slug)!.visuals.find((v) => v.id === visualId)!

  assert.ok(findVisual(1, "ai-or-not", "w1l1-vis1").beforeAfter, "w1l1-vis1 should have before/after data")
  assert.ok(findVisual(1, "rules-vs-learned-patterns", "w1l2-vis1").flow, "w1l2-vis1 should have flow data")
  assert.ok(findVisual(4, "rule-based-chatbot", "w4l1-vis1").tree, "w4l1-vis1 should have a decision tree")

  // A concept exposes a common misconception the renderer can surface.
  assert.ok(getLesson(1, "ai-or-not")!.concepts.some((c) => c.misconception), "a Week 1 concept should have a misconception")
})
