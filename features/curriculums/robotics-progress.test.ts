// Persistence tests for the Robotics course progress layer.
//
//     npm test
//
// These exercise the pure logic in robotics-progress.ts against the real
// curriculum data: fresh state, resume, locking, the unlock-all override,
// equipment-path switching, artifact persistence, corruption recovery, schema
// migration, resets, and server-safe (no-browser) behavior.

import { test } from "node:test"
import assert from "node:assert/strict"

import {
  emptyRoboticsProgress,
  getRoboticsModuleById,
  roboticsCurriculum,
  ROBOTICS_PROGRESS_VERSION,
  type RoboticsProgress,
} from "./robotics.ts"
import {
  ROBOTICS_LEGACY_KEYS,
  ROBOTICS_STORAGE_KEY,
  courseCompletion,
  findResumeTarget,
  hasAnyProgress,
  isModuleUnlocked,
  lessonAvailability,
  loadRoboticsProgress,
  markLessonComplete,
  markLessonStarted,
  migrateRoboticsProgress,
  parseRoboticsProgress,
  resetActivity,
  resetCourse,
  resetLesson,
  saveJournalEntry,
  saveProgram,
  saveQuizAttempt,
  saveActivityResult,
  saveLessonStep,
  saveRoboticsProgress,
  selectEquipmentPath,
  setUnlockAll,
  type StorageLike,
} from "./robotics-progress.ts"

const AT = "2026-07-09T12:00:00.000Z"
const AT2 = "2026-07-09T13:00:00.000Z"

/** An in-memory StorageLike, standing in for window.localStorage. */
function mockStorage(seed: Record<string, string> = {}): StorageLike & { dump(): Record<string, string> } {
  const map = new Map<string, string>(Object.entries(seed))
  return {
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => void map.set(k, v),
    removeItem: (k) => void map.delete(k),
    dump: () => Object.fromEntries(map),
  }
}

test("fresh student state is empty and well-formed", () => {
  const p = emptyRoboticsProgress()
  assert.equal(p.courseId, "robotics")
  assert.equal(p.version, ROBOTICS_PROGRESS_VERSION)
  assert.equal(p.equipmentPath, null)
  assert.deepEqual(p.completed, [])
  assert.equal(p.lastVisited, null)
  assert.equal(p.unlockAll, false)
  assert.equal(hasAnyProgress(p), false)
  // Fresh resume points at the first module, first step, not complete.
  const resume = findResumeTarget(p)
  assert.equal(resume.slug, "what-makes-something-a-robot")
  assert.equal(resume.courseComplete, false)
  assert.ok(resume.stepId, "resume should include a first step id")
  assert.equal(resume.path, "/courses/robotics/what-makes-something-a-robot")
})

test("resume returns the current step after a partial lesson", () => {
  let p = emptyRoboticsProgress()
  const mod = roboticsCurriculum.modules[0]
  p = markLessonStarted(p, mod.id, AT)
  const secondStep = mod.lessonFlow[1].id
  p = saveLessonStep(p, mod.id, secondStep, AT2)

  const resume = findResumeTarget(p)
  assert.equal(resume.moduleId, mod.id, "still resuming the in-progress module")
  assert.equal(resume.stepId, secondStep, "resume at the last-open step")
  assert.ok(p.started.includes(mod.id))
  assert.equal(p.startedAt[mod.id], AT)
  assert.equal(hasAnyProgress(p), true)
})

test("resume advances to the next lesson after one is completed", () => {
  let p = emptyRoboticsProgress()
  p = markLessonComplete(p, "week-1", AT)
  const resume = findResumeTarget(p)
  assert.notEqual(resume.moduleId, "week-1", "should not resume a completed lesson")
  assert.equal(resume.moduleId, "week-2")
  assert.equal(resume.courseComplete, false)
  assert.equal(p.completedAt["week-1"], AT)
})

test("next-available and locked-lesson behavior is deterministic", () => {
  const fresh = emptyRoboticsProgress()
  const week1 = getRoboticsModuleById("week-1")!
  const week2 = getRoboticsModuleById("week-2")!
  const week8 = getRoboticsModuleById("week-8")!

  // Week 1 has no prerequisites -> always open. Later weeks are locked initially.
  assert.equal(isModuleUnlocked(fresh, week1), true)
  assert.equal(isModuleUnlocked(fresh, week2), false)
  assert.equal(isModuleUnlocked(fresh, week8), false)

  // Completing week 1 unlocks week 2 (its prerequisite), not week 8.
  const afterWeek1 = markLessonComplete(fresh, "week-1", AT)
  assert.equal(isModuleUnlocked(afterWeek1, week2), true)
  assert.equal(isModuleUnlocked(afterWeek1, week8), false)

  const avail = lessonAvailability(afterWeek1)
  assert.equal(avail.find((a) => a.moduleId === "week-1")!.status, "completed")
  assert.equal(avail.find((a) => a.moduleId === "week-2")!.status, "in-progress")
  assert.equal(avail.find((a) => a.moduleId === "week-8")!.status, "locked")
})

test("unlock-all override opens every week without completing prerequisites", () => {
  let p = emptyRoboticsProgress()
  p = setUnlockAll(p, true, AT)
  for (const mod of roboticsCurriculum.modules) {
    assert.equal(isModuleUnlocked(p, mod), true, `${mod.id} should be unlocked`)
  }
  // Turning it back off restores locking.
  p = setUnlockAll(p, false, AT2)
  assert.equal(isModuleUnlocked(p, getRoboticsModuleById("week-8")!), false)
})

test("course completion is computed from completed modules", () => {
  let p = emptyRoboticsProgress()
  assert.deepEqual(courseCompletion(p), { completedCount: 0, total: 8, percent: 0, complete: false })
  for (const m of roboticsCurriculum.modules) p = markLessonComplete(p, m.id, AT)
  const done = courseCompletion(p)
  assert.equal(done.completedCount, 8)
  assert.equal(done.complete, true)
  assert.equal(done.percent, 100)
  // With all complete, resume points at the final module and flags completion.
  assert.equal(findResumeTarget(p).courseComplete, true)
  assert.equal(findResumeTarget(p).moduleId, "week-8")
})

test("switching equipment path preserves all other work", () => {
  let p = emptyRoboticsProgress()
  p = selectEquipmentPath(p, "kit", AT)
  p = markLessonComplete(p, "week-1", AT)
  p = saveProgram(p, "w3-prog-demo", ["move-forward", "turn-left"], AT)
  p = saveJournalEntry(p, "week-1", "w1-j1", "my sketch notes", AT)

  const switched = selectEquipmentPath(p, "simulator", AT2)
  assert.equal(switched.equipmentPath, "simulator")
  assert.deepEqual(switched.completed, ["week-1"], "completion kept")
  assert.deepEqual(switched.savedPrograms["w3-prog-demo"].blocks, ["move-forward", "turn-left"], "program kept")
  assert.equal(switched.journal["week-1:w1-j1"].value, "my sketch notes", "journal kept")
})

test("quiz attempts persist and increment", () => {
  let p = emptyRoboticsProgress()
  p = saveQuizAttempt(p, "w1-kc", { "w1-q1": "w1-q1-b" }, 4, 5, AT)
  assert.equal(p.knowledgeChecks["w1-kc"].score, 4)
  assert.equal(p.knowledgeChecks["w1-kc"].attempts, 1)
  assert.equal(p.knowledgeChecks["w1-kc"].selectedAnswers["w1-q1"], "w1-q1-b")
  p = saveQuizAttempt(p, "w1-kc", { "w1-q1": "w1-q1-b", "w1-q2": "w1-q2-c" }, 5, 5, AT2)
  assert.equal(p.knowledgeChecks["w1-kc"].attempts, 2, "second attempt increments the counter")
  assert.equal(p.knowledgeChecks["w1-kc"].score, 5)
})

test("journal and program persistence survive a storage round-trip", () => {
  const storage = mockStorage()
  let p = emptyRoboticsProgress()
  p = saveJournalEntry(p, "week-1", "w1-j1", "robots sense, decide, act", AT)
  p = saveProgram(p, "w3-prog-demo", ["move-forward", "move-forward", "turn-right"], AT)
  saveRoboticsProgress(storage, p)

  // Simulate a refresh: a brand-new load from the same storage.
  const reloaded = loadRoboticsProgress(storage)
  assert.equal(reloaded.journal["week-1:w1-j1"].value, "robots sense, decide, act")
  assert.deepEqual(reloaded.savedPrograms["w3-prog-demo"].blocks, ["move-forward", "move-forward", "turn-right"])
  assert.ok(storage.dump()[ROBOTICS_STORAGE_KEY], "written under the versioned key")
})

test("corrupted localStorage recovers to a fresh state instead of crashing", () => {
  assert.doesNotThrow(() => parseRoboticsProgress("{not valid json"))
  assert.deepEqual(parseRoboticsProgress("{not valid json"), emptyRoboticsProgress())
  assert.deepEqual(parseRoboticsProgress(null), emptyRoboticsProgress())
  // A partially-garbage object keeps valid fields and defaults the rest.
  const partial = migrateRoboticsProgress({
    version: ROBOTICS_PROGRESS_VERSION,
    completed: ["week-1", 42, "not-a-real-week"],
    unlockAll: "yes",
    knowledgeChecks: "garbage",
  })
  assert.deepEqual(partial.completed, ["week-1"], "invalid + unknown ids dropped")
  assert.equal(partial.unlockAll, false, "non-boolean coerced to false")
  assert.deepEqual(partial.knowledgeChecks, {})
})

test("outdated v1 schema migrates without discarding saved work", () => {
  const v1 = {
    completed: ["week-1", "week-2"],
    started: ["week-1", "week-2", "week-3"],
    lastVisited: "week-3",
    unlockAll: true,
    knowledgeCheckScores: { "w1-kc": 5, "w2-kc": 4 },
    savedPrograms: { "w3-prog-demo": { specId: "w3-prog-demo", blocks: ["move-forward"], savedAt: AT } },
    journal: { "week-1:w1-j1": { moduleId: "week-1", promptId: "w1-j1", value: "kept", savedAt: AT } },
  }
  const migrated = migrateRoboticsProgress({ version: 1, ...v1 })
  assert.equal(migrated.version, ROBOTICS_PROGRESS_VERSION)
  assert.deepEqual(migrated.completed, ["week-1", "week-2"], "completion carried over")
  assert.equal(migrated.unlockAll, true)
  assert.equal(migrated.knowledgeChecks["w1-kc"].score, 5, "v1 score lifted into an attempt record")
  assert.equal(migrated.knowledgeChecks["w2-kc"].score, 4)
  assert.deepEqual(migrated.savedPrograms["w3-prog-demo"].blocks, ["move-forward"], "program carried over")
  assert.equal(migrated.journal["week-1:w1-j1"].value, "kept", "journal carried over")
})

test("legacy v1 storage key is read and migrated on load", () => {
  const v1Blob = JSON.stringify({ version: 1, completed: ["week-1"], knowledgeCheckScores: { "w1-kc": 5 } })
  const storage = mockStorage({ [ROBOTICS_LEGACY_KEYS[0]]: v1Blob })
  const loaded = loadRoboticsProgress(storage)
  assert.deepEqual(loaded.completed, ["week-1"])
  assert.equal(loaded.knowledgeChecks["w1-kc"].score, 5)
  assert.equal(loaded.version, ROBOTICS_PROGRESS_VERSION)
})

test("unknown/newer schema versions keep recognizable fields (no wipe)", () => {
  const future = migrateRoboticsProgress({
    version: 999,
    completed: ["week-1"],
    equipmentPath: "simulator",
    someFutureField: { a: 1 },
  })
  assert.deepEqual(future.completed, ["week-1"])
  assert.equal(future.equipmentPath, "simulator")
  assert.equal(future.version, ROBOTICS_PROGRESS_VERSION)
})

test("full reset clears everything", () => {
  let p = emptyRoboticsProgress()
  p = markLessonComplete(p, "week-1", AT)
  p = saveProgram(p, "w3-prog-demo", ["stop"], AT)
  const cleared = resetCourse()
  assert.deepEqual(cleared, emptyRoboticsProgress())
  assert.notDeepEqual(p, cleared)
})

test("partial reset clears one lesson but keeps the rest", () => {
  const week1 = getRoboticsModuleById("week-1")!
  let p = emptyRoboticsProgress()
  // Progress on week 1 and week 2.
  p = markLessonComplete(p, "week-1", AT)
  p = saveQuizAttempt(p, week1.knowledgeCheck.id, {}, 5, 5, AT)
  p = saveJournalEntry(p, "week-1", week1.journalPrompts[0].id, "notes", AT)
  p = markLessonComplete(p, "week-2", AT)

  const afterReset = resetLesson(p, week1, AT2)
  assert.ok(!afterReset.completed.includes("week-1"), "week-1 completion cleared")
  assert.ok(afterReset.completed.includes("week-2"), "week-2 completion kept")
  assert.equal(afterReset.knowledgeChecks[week1.knowledgeCheck.id], undefined, "week-1 quiz cleared")
  assert.equal(afterReset.journal[`week-1:${week1.journalPrompts[0].id}`], undefined, "week-1 journal cleared")
})

test("partial reset of a single activity leaves other activities intact", () => {
  const week1 = getRoboticsModuleById("week-1")!
  const [a1, a2] = week1.activities
  let p = emptyRoboticsProgress()
  p = saveActivityResult(p, a1.id, { pathId: "kit", completed: true }, AT)
  p = saveActivityResult(p, a2.id, { pathId: "kit", completed: true }, AT)
  const afterReset = resetActivity(p, a1.id, AT2)
  assert.equal(afterReset.activityResults[a1.id], undefined, "reset activity cleared")
  assert.ok(afterReset.activityResults[a2.id], "other activity kept")
})

test("server rendering works without any browser API", () => {
  // No storage available (SSR): load returns empty, save is a harmless no-op.
  assert.doesNotThrow(() => loadRoboticsProgress(undefined))
  assert.deepEqual(loadRoboticsProgress(undefined), emptyRoboticsProgress())
  assert.doesNotThrow(() => saveRoboticsProgress(undefined, emptyRoboticsProgress()))
  // The reducers are pure and never touch globals.
  const p: RoboticsProgress = markLessonStarted(emptyRoboticsProgress(), "week-1", AT)
  assert.ok(p.started.includes("week-1"))
})
