// Tests for hub-specific progress logic (estimated remaining time).
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import { emptyRoboticsProgress, roboticsCurriculum } from "./robotics.ts"
import { estimateRemainingTime, markLessonComplete } from "./robotics-progress.ts"

const AT = "2026-07-09T12:00:00.000Z"

test("fresh student has all eight weeks remaining with a positive time estimate", () => {
  const r = estimateRemainingTime(emptyRoboticsProgress())
  assert.equal(r.weeksLeft, 8)
  assert.ok(r.lowMinutes > 0)
  assert.ok(r.highMinutes >= r.lowMinutes)
})

test("completing weeks reduces the estimate", () => {
  let p = emptyRoboticsProgress()
  const before = estimateRemainingTime(p)
  p = markLessonComplete(p, "week-1", AT)
  p = markLessonComplete(p, "week-2", AT)
  const after = estimateRemainingTime(p)
  assert.equal(after.weeksLeft, 6)
  assert.ok(after.lowMinutes < before.lowMinutes)
})

test("a finished course has zero weeks and zero minutes left", () => {
  let p = emptyRoboticsProgress()
  for (const m of roboticsCurriculum.modules) p = markLessonComplete(p, m.id, AT)
  const r = estimateRemainingTime(p)
  assert.equal(r.weeksLeft, 0)
  assert.equal(r.lowMinutes, 0)
  assert.equal(r.highMinutes, 0)
})
