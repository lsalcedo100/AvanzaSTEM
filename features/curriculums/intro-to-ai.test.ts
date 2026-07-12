import { test } from "node:test"
import assert from "node:assert/strict"

import {
  introToAiCourse,
  INTRO_TO_AI_COURSE_ID,
  introToAiPath,
  introToAiWeekPath,
  introToAiLessonPath,
  getWeek,
  getLesson,
  weekNumbers,
  weekParams,
  allLessonParams,
  firstLesson,
  lessonSections,
  lessonNeighbors,
  validateIntroToAiCourse,
} from "./intro-to-ai.ts"
import {
  emptyIntroToAiProgress,
  markLessonComplete,
  saveAssessmentAttempt,
  isCourseComplete,
  courseProgressPercent,
  resumeTarget,
  loadIntroToAiProgress,
  saveIntroToAiProgress,
  migrateIntroToAiProgress,
  markLessonStarted,
  type StorageLike,
} from "./intro-to-ai-progress.ts"
import { isCorrect, scoreCheck, encodeList } from "./intro-to-ai-quiz.ts"
import type { KnowledgeCheckQuestion } from "./intro-to-ai-types.ts"
import { localizedBlogArticles } from "../blog/posts.ts"

const AT = "2026-07-11T09:00:00.000Z"

/* --------------------------------- schema -------------------------------- */

test("course data is structurally valid (unique ids, ordering, concepts, rubric)", () => {
  const errors = validateIntroToAiCourse()
  assert.deepEqual(errors, [], `validation errors:\n${errors.join("\n")}`)
})

test("course has six weeks numbered 1..6, the last marked final", () => {
  assert.equal(introToAiCourse.totalWeeks, 6)
  assert.equal(introToAiCourse.weeks.length, 6)
  assert.deepEqual(weekNumbers(), [1, 2, 3, 4, 5, 6])
  assert.equal(introToAiCourse.weeks[5].isFinal, true)
})

test("every week has three ordered lessons with unique slugs", () => {
  for (const w of introToAiCourse.weeks) {
    assert.equal(w.lessons.length, 3, `week ${w.week} should have 3 lessons`)
    w.lessons.forEach((l, i) => assert.equal(l.order, i + 1))
    const slugs = new Set(w.lessons.map((l) => l.slug))
    assert.equal(slugs.size, 3)
  }
})

test("all lesson ids are globally unique", () => {
  const ids = introToAiCourse.weeks.flatMap((w) => w.lessons.map((l) => l.id))
  assert.equal(new Set(ids).size, ids.length)
})

test("all skill ids are unique", () => {
  const ids = introToAiCourse.skills.map((s) => s.id)
  assert.equal(new Set(ids).size, ids.length)
})

/* ------------------------------- routing --------------------------------- */

test("route helpers build the expected paths", () => {
  assert.equal(introToAiPath, `/courses/${INTRO_TO_AI_COURSE_ID}`)
  assert.equal(introToAiWeekPath(3), `/courses/${INTRO_TO_AI_COURSE_ID}/week/3`)
  assert.equal(
    introToAiLessonPath(1, "ai-or-not"),
    `/courses/${INTRO_TO_AI_COURSE_ID}/week/1/lesson/ai-or-not`,
  )
})

test("getWeek / getLesson resolve valid routes and reject invalid ones", () => {
  assert.ok(getWeek(1))
  assert.equal(getWeek(0), undefined)
  assert.equal(getWeek(7), undefined)
  assert.equal(getWeek(1.5 as unknown as number), undefined)

  const first = getLesson(1, "ai-or-not")
  assert.ok(first)
  assert.equal(first?.id, "w1l1")
  assert.equal(getLesson(1, "does-not-exist"), undefined)
  assert.equal(getLesson(99, "ai-or-not"), undefined)
})

test("static params cover every week and every lesson", () => {
  assert.equal(weekParams().length, 6)
  const params = allLessonParams()
  assert.equal(params.length, 18)
  // Each pair resolves back to a real lesson.
  for (const { week, lesson } of params) {
    assert.ok(getLesson(Number(week), lesson), `missing ${week}/${lesson}`)
  }
})

test("firstLesson is week 1 lesson 1 (the begin destination)", () => {
  const { week, lesson } = firstLesson()
  assert.equal(week, 1)
  assert.equal(lesson.slug, "ai-or-not")
})

test("Start Learning points at the real course hub, not the blog", () => {
  // The curriculums card links here; the fresh-progress resume target is a real lesson.
  assert.equal(introToAiPath, "/courses/intro-to-artificial-intelligence")
  const start = resumeTarget(emptyIntroToAiProgress(), introToAiCourse)
  assert.ok(getLesson(start.week, start.lessonSlug), "start destination must resolve to a real lesson")
})

test("legacy AI blog article is retained as a resource (not deleted)", () => {
  // The old Start Learning destination remains available as a general resource.
  assert.ok(localizedBlogArticles.en["what-is-ai-explaining-to-kids"], "blog article should still exist")
})

test("lessonSections derives an ordered outline that covers the lesson", () => {
  const lesson = getLesson(1, "ai-or-not")!
  const kinds = lessonSections(lesson).map((s) => s.kind)
  assert.equal(kinds[0], "objectives")
  assert.ok(kinds.includes("activity"))
  assert.ok(kinds.includes("knowledge-check"))
  assert.equal(kinds[kinds.length - 1], "extension")
})

test("lessonNeighbors links lessons across week boundaries", () => {
  // Last lesson of week 1 -> first lesson of week 2.
  const w1 = getWeek(1)!
  const lastW1 = w1.lessons[2]
  const { next } = lessonNeighbors(1, lastW1.slug)
  assert.ok(next)
  assert.equal(next?.week, 2)
  // First lesson has no previous.
  assert.equal(lessonNeighbors(1, "ai-or-not").prev, null)
})

/* -------------------------------- quiz ----------------------------------- */

test("quiz grading is correct for each question kind", () => {
  const single: KnowledgeCheckQuestion = {
    id: "q-single",
    kind: "single",
    prompt: "p",
    explanation: "e",
    choices: [
      { id: "a", text: "a", correct: false, explanation: "" },
      { id: "b", text: "b", correct: true, explanation: "" },
    ],
  }
  assert.equal(isCorrect(single, "b"), true)
  assert.equal(isCorrect(single, "a"), false)
  assert.equal(isCorrect(single, undefined), false)

  const tf: KnowledgeCheckQuestion = {
    id: "q-tf",
    kind: "true-false",
    prompt: "p",
    explanation: "e",
    statement: "s",
    answer: false,
  }
  assert.equal(isCorrect(tf, "false"), true)
  assert.equal(isCorrect(tf, "true"), false)

  const multi: KnowledgeCheckQuestion = {
    id: "q-multi",
    kind: "multiple",
    prompt: "p",
    explanation: "e",
    choices: [
      { id: "a", text: "a", correct: true, explanation: "" },
      { id: "b", text: "b", correct: true, explanation: "" },
      { id: "c", text: "c", correct: false, explanation: "" },
    ],
  }
  assert.equal(isCorrect(multi, encodeList(["a", "b"])), true)
  assert.equal(isCorrect(multi, encodeList(["b", "a"])), true)
  assert.equal(isCorrect(multi, encodeList(["a"])), false)
  assert.equal(isCorrect(multi, encodeList(["a", "b", "c"])), false)

  const order: KnowledgeCheckQuestion = {
    id: "q-order",
    kind: "ordering",
    prompt: "p",
    explanation: "e",
    items: [
      { id: "i1", text: "1" },
      { id: "i2", text: "2" },
      { id: "i3", text: "3" },
    ],
    correctOrder: ["i1", "i2", "i3"],
  }
  assert.equal(isCorrect(order, encodeList(["i1", "i2", "i3"])), true)
  assert.equal(isCorrect(order, encodeList(["i2", "i1", "i3"])), false)
})

test("scoreCheck totals correct answers", () => {
  const lesson = getLesson(1, "ai-or-not")!
  const qs = lesson.knowledgeCheck.questions
  // Build a fully-correct answer set from the data itself.
  const answers: Record<string, string> = {}
  for (const q of qs) {
    if (q.kind === "single" || q.kind === "scenario") {
      answers[q.id] = q.choices.find((c) => c.correct)!.id
    } else if (q.kind === "true-false") {
      answers[q.id] = String(q.answer)
    } else if (q.kind === "multiple") {
      answers[q.id] = encodeList(q.choices.filter((c) => c.correct).map((c) => c.id))
    } else {
      answers[q.id] = encodeList(q.correctOrder)
    }
  }
  const { score, total } = scoreCheck(qs, answers)
  assert.equal(score, total)
})

/* ------------------------------- progress -------------------------------- */

test("fresh progress is empty and 0%", () => {
  const p = emptyIntroToAiProgress()
  assert.equal(courseProgressPercent(p, introToAiCourse), 0)
  assert.equal(isCourseComplete(p, introToAiCourse), false)
})

test("resume target defaults to first lesson, then follows lastVisited", () => {
  let p = emptyIntroToAiProgress()
  assert.deepEqual(resumeTarget(p, introToAiCourse), { week: 1, lessonSlug: "ai-or-not" })
  const l = getLesson(2, "training-vs-testing")!
  p = markLessonStarted(p, l.id, 2, "training-vs-testing", AT)
  assert.deepEqual(resumeTarget(p, introToAiCourse), { week: 2, lessonSlug: "training-vs-testing" })
})

test("completion needs lessons + assessment attempted + project + reflection (not a passing score)", () => {
  let p = emptyIntroToAiProgress()
  for (const w of introToAiCourse.weeks) {
    for (const l of w.lessons) p = markLessonComplete(p, l.id, AT)
  }
  assert.equal(courseProgressPercent(p, introToAiCourse), 100)
  // Lessons done but the mission has not been attempted, and no project/reflection.
  assert.equal(isCourseComplete(p, introToAiCourse), false)

  // Attempt the assessment (even a low score counts — completion is not gated on a passing score).
  p = saveAssessmentAttempt(p, introToAiCourse.finalAssessment.questions, {}, AT)
  // Still not complete: the final project and a final reflection are also required.
  assert.equal(isCourseComplete(p, introToAiCourse), false)
  // The detailed cross-requirement completion is covered in intro-to-ai-assessment.test.ts.
})

test("unlockAll override marks the course complete for demos", () => {
  const p = { ...emptyIntroToAiProgress(), unlockAll: true }
  assert.equal(isCourseComplete(p, introToAiCourse), true)
})

test("progress round-trips through storage and recovers from corruption", () => {
  const store = new Map<string, string>()
  const storage: StorageLike = {
    getItem: (k) => store.get(k) ?? null,
    setItem: (k, v) => void store.set(k, v),
    removeItem: (k) => void store.delete(k),
  }
  let p = emptyIntroToAiProgress()
  p = markLessonComplete(p, "w1l1", AT)
  saveIntroToAiProgress(storage, p)
  const loaded = loadIntroToAiProgress(storage)
  assert.deepEqual(loaded.completedLessons, ["w1l1"])

  // Corrupt data -> empty, no throw.
  store.set("avanza-intro-to-artificial-intelligence-progress-v1", "{not json")
  assert.deepEqual(loadIntroToAiProgress(storage).completedLessons, [])

  // Missing storage (SSR) -> empty, no throw.
  assert.deepEqual(loadIntroToAiProgress(undefined).completedLessons, [])
})

test("migration coerces partial/unknown data without throwing", () => {
  const p = migrateIntroToAiProgress({ completedLessons: ["w1l1", 5, null], unlockAll: "yes" })
  assert.deepEqual(p.completedLessons, ["w1l1"])
  assert.equal(p.unlockAll, false)
  assert.equal(p.version, 1)
})
