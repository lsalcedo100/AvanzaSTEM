// Route-contract tests for the Robotics course routing layer.
//
//     npm test
//
// The route pages are thin: /courses/robotics/[lesson] maps generateStaticParams
// over roboticsModuleSlugs() and calls notFound() when getRoboticsModule misses.
// These tests lock down that contract (valid slugs resolve, unknown ones don't,
// section routes don't collide with lesson slugs) without needing a browser.

import { test } from "node:test"
import assert from "node:assert/strict"

import {
  getRoboticsModule,
  roboticsCurriculum,
  roboticsLessonPath,
  roboticsModuleSlugs,
  roboticsPath,
  roboticsTeacherGuidePath,
  roboticsWorksheetPath,
} from "./robotics.ts"
import {
  findResumeTarget,
  isModuleUnlocked,
  markLessonComplete,
  setUnlockAll,
} from "./robotics-progress.ts"
import { emptyRoboticsProgress } from "./robotics.ts"

const AT = "2026-07-09T12:00:00.000Z"

test("generateStaticParams source lists all eight lesson slugs in order", () => {
  const slugs = roboticsModuleSlugs()
  assert.equal(slugs.length, 8)
  // Every slug resolves to a module (so no static route 404s).
  for (const slug of slugs) assert.ok(getRoboticsModule(slug), `${slug} should resolve`)
  // Order matches week order.
  const byWeek = [...roboticsCurriculum.modules].sort((a, b) => a.week - b.week).map((m) => m.slug)
  assert.deepEqual(slugs, byWeek)
})

test("unknown module/lesson slugs resolve to undefined (drives notFound)", () => {
  assert.equal(getRoboticsModule("totally-made-up"), undefined)
  assert.equal(getRoboticsModule("week-1"), undefined, "ids are not slugs; only slugs route")
  assert.equal(getRoboticsModule(""), undefined)
  // A slug from another course must not resolve here.
  assert.equal(getRoboticsModule("paper-tower-challenge"), undefined)
})

test("the course no longer points at the old project redirect", () => {
  assert.equal(roboticsPath, "/courses/robotics")
  assert.notEqual(roboticsPath, "/projects/lego-robot-builder")
  assert.ok(roboticsLessonPath("x").startsWith("/courses/robotics/"))
})

test("section routes do not collide with any lesson slug", () => {
  const slugs = new Set(roboticsModuleSlugs())
  for (const section of ["review", "journal", "final-project"]) {
    assert.ok(!slugs.has(section), `"${section}" must not be a lesson slug (it is a static route)`)
  }
})

test("worksheet and teacher-guide routes nest under each lesson", () => {
  const slug = roboticsModuleSlugs()[0]
  assert.equal(roboticsWorksheetPath(slug), `/courses/robotics/${slug}/worksheet`)
  assert.equal(roboticsTeacherGuidePath(slug), `/courses/robotics/${slug}/teacher-guide`)
})

test("direct-link availability: first lesson open, later lessons locked, unlock-all opens all", () => {
  const fresh = emptyRoboticsProgress()
  const [first, second] = [...roboticsCurriculum.modules].sort((a, b) => a.week - b.week)
  // A new student direct-linking the first lesson: unlocked.
  assert.equal(isModuleUnlocked(fresh, first), true)
  // Direct-linking a later lesson before finishing prerequisites: locked.
  assert.equal(isModuleUnlocked(fresh, second), false)
  // Teacher unlock-all opens a direct link to any lesson.
  const unlocked = setUnlockAll(fresh, true, AT)
  assert.equal(isModuleUnlocked(unlocked, second), true)
})

test("resume target is always a real, routable lesson", () => {
  // New student -> first lesson.
  let p = emptyRoboticsProgress()
  let r = findResumeTarget(p)
  assert.ok(getRoboticsModule(r.slug), "resume slug must be routable")
  assert.equal(r.path, roboticsLessonPath(r.slug))
  // After finishing everything -> still a routable lesson (the final one), flagged complete.
  for (const m of roboticsCurriculum.modules) p = markLessonComplete(p, m.id, AT)
  r = findResumeTarget(p)
  assert.ok(getRoboticsModule(r.slug))
  assert.equal(r.courseComplete, true)
})
