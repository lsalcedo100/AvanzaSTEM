import { test } from "node:test"
import assert from "node:assert/strict"

import { introToAiCourse, firstLesson } from "./intro-to-ai.ts"
import {
  INTRO_TO_AI_STORAGE_KEY,
  emptyIntroToAiProgress,
  loadIntroToAiProgress,
  saveIntroToAiProgress,
  migrateIntroToAiProgress,
  markLessonStarted,
  markLessonComplete,
  saveActivityState,
  saveNote,
  courseProgressPercent,
  weekCompletion,
  resumeTarget,
  isCourseComplete,
  type IntroToAiProgress,
  type StorageLike,
} from "./intro-to-ai-progress.ts"

const AT = "2026-07-11T09:00:00.000Z"
const AT2 = "2026-07-11T10:00:00.000Z"

function mapStorage(seed: Record<string, string> = {}) {
  const store = new Map<string, string>(Object.entries(seed))
  const storage: StorageLike = {
    getItem: (k) => store.get(k) ?? null,
    setItem: (k, v) => void store.set(k, v),
    removeItem: (k) => void store.delete(k),
  }
  return { store, storage }
}

/* ------------------------------ initial state ---------------------------- */

test("initial progress has version, no startedAt, and empty collections", () => {
  const p = emptyIntroToAiProgress()
  assert.equal(p.version, 1)
  assert.equal(p.startedAt, null)
  assert.deepEqual(p.completedLessons, [])
  assert.deepEqual(p.activities, {})
  assert.deepEqual(p.notes, {})
  assert.equal(p.updatedAt, null)
})

/* ------------------------------ start course ----------------------------- */

test("starting the course stamps startedAt once and sets the resume target", () => {
  const { week, lesson } = firstLesson()
  let p = emptyIntroToAiProgress()
  p = markLessonStarted(p, lesson.id, week, lesson.slug, AT)
  assert.equal(p.startedAt, AT)
  assert.deepEqual(p.lastVisited, { week, lessonSlug: lesson.slug })

  // startedAt does not change on a later start.
  const second = introToAiCourse.weeks[0].lessons[1]
  p = markLessonStarted(p, second.id, 1, second.slug, AT2)
  assert.equal(p.startedAt, AT, "startedAt should not be overwritten")
  assert.deepEqual(p.lastVisited, { week: 1, lessonSlug: second.slug })
})

/* --------------------------- completing lessons -------------------------- */

test("completing lessons derives week and course progress", () => {
  let p = emptyIntroToAiProgress()
  const w1 = introToAiCourse.weeks[0]
  assert.deepEqual(weekCompletion(p, introToAiCourse, 1), { completed: 0, total: w1.lessons.length })

  p = markLessonComplete(p, w1.lessons[0].id, AT)
  assert.deepEqual(weekCompletion(p, introToAiCourse, 1), { completed: 1, total: w1.lessons.length })
  assert.ok(courseProgressPercent(p, introToAiCourse) > 0)
  assert.ok(courseProgressPercent(p, introToAiCourse) < 100)
})

/* --------------------------- activity + notes ---------------------------- */

test("activity state and notes persist by stable key", () => {
  let p = emptyIntroToAiProgress()
  p = saveActivityState(p, "w1l1-act", JSON.stringify({ picked: ["calculator"] }), AT)
  p = saveNote(p, "course-notebook", "AI learns from examples.", AT)
  assert.equal(p.activities["w1l1-act"], JSON.stringify({ picked: ["calculator"] }))
  assert.equal(p.notes["course-notebook"], "AI learns from examples.")
})

/* ---------------------------- save / load -------------------------------- */

test("save then load round-trips the new fields", () => {
  const { storage } = mapStorage()
  let p = emptyIntroToAiProgress()
  p = markLessonStarted(p, "w1l1", 1, "ai-or-not", AT)
  p = saveActivityState(p, "w1l1-act", "state", AT)
  p = saveNote(p, "course-notebook", "hello", AT)
  assert.equal(saveIntroToAiProgress(storage, p), true)

  const loaded = loadIntroToAiProgress(storage)
  assert.equal(loaded.startedAt, AT)
  assert.equal(loaded.activities["w1l1-act"], "state")
  assert.equal(loaded.notes["course-notebook"], "hello")
})

test("invalid stored data loads as empty without throwing", () => {
  const { storage } = mapStorage({ [INTRO_TO_AI_STORAGE_KEY]: "{broken json" })
  assert.deepEqual(loadIntroToAiProgress(storage).completedLessons, [])
})

test("migration defaults new fields for older/partial data", () => {
  // Simulate a v1 blob written before startedAt/activities existed.
  const legacy = { version: 1, completedLessons: ["w1l1"], notes: { x: "y" } }
  const p = migrateIntroToAiProgress(legacy)
  assert.deepEqual(p.completedLessons, ["w1l1"])
  assert.equal(p.startedAt, null)
  assert.deepEqual(p.activities, {})
  assert.equal(p.notes.x, "y")
})

/* --------------------------- resume + reset ------------------------------ */

test("resume points at the first lesson for a new student, then the last visited", () => {
  let p = emptyIntroToAiProgress()
  assert.deepEqual(resumeTarget(p, introToAiCourse), { week: 1, lessonSlug: "ai-or-not" })
  p = markLessonStarted(p, "w3l1", 3, "how-an-image-classifier-works", AT)
  assert.deepEqual(resumeTarget(p, introToAiCourse), { week: 3, lessonSlug: "how-an-image-classifier-works" })
})

test("reset returns the course to its initial state", () => {
  let p: IntroToAiProgress = markLessonComplete(emptyIntroToAiProgress(), "w1l1", AT)
  p = saveNote(p, "course-notebook", "notes", AT)
  // Reset == replace with empty.
  const reset = emptyIntroToAiProgress()
  assert.deepEqual(reset.completedLessons, [])
  assert.deepEqual(reset.notes, {})
  assert.equal(isCourseComplete(reset, introToAiCourse), false)
})

/* ------------------------ storage-unavailable ---------------------------- */

test("save reports failure when storage is missing or blocked", () => {
  // Missing storage (SSR).
  assert.equal(saveIntroToAiProgress(undefined, emptyIntroToAiProgress()), false)
  assert.deepEqual(loadIntroToAiProgress(undefined).completedLessons, [])

  // Blocked storage (setItem throws, e.g. private mode / quota).
  const blocked: StorageLike = {
    getItem: () => null,
    setItem: () => {
      throw new Error("QuotaExceeded")
    },
    removeItem: () => {},
  }
  assert.equal(saveIntroToAiProgress(blocked, emptyIntroToAiProgress()), false)
})

/* ------------------------ isolation from others -------------------------- */

test("saving AI progress never touches other courses' storage keys", () => {
  const { store, storage } = mapStorage({
    "avanza-robotics-progress-v2": JSON.stringify({ courseId: "robotics", completed: ["week-1"] }),
    "avanza-math-adventures-progress-v1": JSON.stringify({ completed: ["week-2"] }),
  })
  const before = store.get("avanza-robotics-progress-v2")

  saveIntroToAiProgress(storage, markLessonComplete(emptyIntroToAiProgress(), "w1l1", AT))

  // AI wrote only its namespaced key; the other courses are untouched.
  assert.ok(store.has(INTRO_TO_AI_STORAGE_KEY))
  assert.equal(store.get("avanza-robotics-progress-v2"), before)
  assert.ok(store.has("avanza-math-adventures-progress-v1"))
  assert.equal(INTRO_TO_AI_STORAGE_KEY, "avanza-intro-to-artificial-intelligence-progress-v1")
})
