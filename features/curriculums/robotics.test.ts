// Curriculum validation tests for the Robotics & Automation course.
//
// Run with the project's test runner (Node's built-in, no extra dependency):
//
//     npm test
//
// These assert the cross-field invariants that the content depends on: stable,
// unique ids suitable for saving progress; correct knowledge-check answer keys;
// complete equipment-path coverage; a valid final project; and the full,
// non-placeholder eight-week structure required by Phase 2.

import { test } from "node:test"
import assert from "node:assert/strict"

import {
  ROBOTICS_EQUIPMENT_PATHS,
  ROBOTICS_PROGRESS_VERSION,
  ROBOTICS_SAFETY,
  emptyRoboticsProgress,
  getRoboticsModule,
  getRoboticsModuleById,
  isEquipmentPathId,
  nextRoboticsModule,
  previousRoboticsModule,
  roboticsCurriculum,
  roboticsLessonPath,
  roboticsModuleSlugs,
  roboticsPath,
  roboticsTeacherGuidePath,
  roboticsWorksheetPath,
  validateRoboticsCurriculum,
  type RoboticsCurriculum,
  type RoboticsModule,
} from "./robotics.ts"

test("the curriculum passes full internal validation", () => {
  const problems = validateRoboticsCurriculum()
  assert.deepEqual(problems, [], `curriculum validation found problems:\n- ${problems.join("\n- ")}`)
})

test("there are exactly eight weekly modules in week order", () => {
  assert.equal(roboticsCurriculum.modules.length, 8)
  assert.equal(roboticsCurriculum.totalModules, 8)
  const weeks = roboticsCurriculum.modules.map((m) => m.week)
  assert.deepEqual([...weeks].sort((a, b) => a - b), [1, 2, 3, 4, 5, 6, 7, 8])
  const orders = roboticsModuleSlugs()
  assert.equal(orders.length, 8)
  assert.equal(orders[0], "what-makes-something-a-robot")
  assert.equal(orders[7], "design-a-robot-that-helps")
})

test("every module has real, non-placeholder content", () => {
  for (const m of roboticsCurriculum.modules) {
    assert.ok(m.title.length > 3, `${m.id} needs a title`)
    assert.ok(m.summary.length > 40, `${m.id} needs a real summary`)
    assert.ok(m.mainMission.length > 10, `${m.id} needs a main mission`)
    assert.ok(m.learningGoals.length >= 3, `${m.id} needs learning goals`)
    assert.ok(m.vocabulary.length >= 5, `${m.id} needs vocabulary`)
    assert.ok(m.concepts.length >= 3, `${m.id} needs concept explanations`)
    assert.ok(m.materials.length >= 1, `${m.id} needs materials`)
    assert.ok(m.activities.length >= 1, `${m.id} needs at least one activity`)
    assert.ok(m.knowledgeCheck.questions.length >= 4, `${m.id} needs a knowledge check`)
    assert.ok(m.reflection.length >= 1, `${m.id} needs reflection prompts`)
    assert.ok(m.lessonFlow.length >= 3, `${m.id} needs a lesson flow`)
    assert.ok(m.teacherGuidance.facilitation.length >= 1, `${m.id} needs teacher guidance`)
    // No obvious placeholder text left behind.
    const blob = JSON.stringify(m).toLowerCase()
    for (const bad of ["lorem", "todo", "tbd", "placeholder", "xxx", "fixme"]) {
      assert.ok(!blob.includes(bad), `${m.id} contains placeholder text "${bad}"`)
    }
  }
})

test("every activity defines all three equipment variants with matching path ids", () => {
  for (const m of roboticsCurriculum.modules) {
    for (const a of m.activities) {
      for (const pathId of ["kit", "simulator", "unplugged"] as const) {
        const v = a.variants[pathId]
        assert.ok(v, `${m.id}/${a.id} missing ${pathId} variant`)
        assert.equal(v.pathId, pathId)
        assert.ok(v.instructions.length > 0, `${m.id}/${a.id} ${pathId} needs instructions`)
        assert.ok(v.successCriteria.length > 0, `${m.id}/${a.id} ${pathId} needs success criteria`)
        assert.ok(v.expectedResult.length > 0, `${m.id}/${a.id} ${pathId} needs an expected result`)
      }
    }
  }
})

test("knowledge-check answer keys are internally consistent", () => {
  for (const m of roboticsCurriculum.modules) {
    for (const q of m.knowledgeCheck.questions) {
      assert.ok(q.explanation.length > 0, `${m.id}/${q.id} needs an explanation`)
      // Option-based kinds: exactly one correct option matching correctOptionId,
      // and every option carries feedback.
      if (q.kind === "single" || q.kind === "trace" || q.kind === "scenario") {
        const correct = q.options.filter((o) => o.correct)
        assert.equal(correct.length, 1, `${m.id}/${q.id} must have exactly one correct option`)
        assert.equal(correct[0].id, q.correctOptionId, `${m.id}/${q.id} correctOptionId mismatch`)
        for (const o of q.options) {
          assert.ok(o.feedback.length > 0, `${m.id}/${q.id}/${o.id} needs feedback`)
        }
      } else if (q.kind === "multiple") {
        const flagged = q.options.filter((o) => o.correct).map((o) => o.id)
        assert.deepEqual(
          [...flagged].sort(),
          [...q.correctOptionIds].sort(),
          `${m.id}/${q.id} correctOptionIds must match flagged options`,
        )
      }
    }
  }
})

test("ids used as progress keys are unique within each module", () => {
  for (const m of roboticsCurriculum.modules) {
    const ids = [
      ...m.learningGoals.map((x) => x.id),
      ...m.concepts.map((x) => x.id),
      ...m.materials.map((x) => x.id),
      ...m.activities.map((x) => x.id),
      ...m.predictionPrompts.map((x) => x.id),
      ...m.testRecords.map((x) => x.id),
      ...m.debuggingMissions.map((x) => x.id),
      ...m.reflection.map((x) => x.id),
      ...m.journalPrompts.map((x) => x.id),
      ...m.savedPrograms.map((x) => x.id),
      ...m.simulatorMissions.map((x) => x.id),
      ...m.lessonFlow.map((x) => x.id),
      ...m.printableResources.map((x) => x.id),
      ...m.completion.requirements.map((x) => x.id),
    ]
    assert.equal(new Set(ids).size, ids.length, `${m.id} has duplicate internal ids`)
  }
})

test("the prerequisite graph only points backward to real weeks", () => {
  const byId = new Map(roboticsCurriculum.modules.map((m) => [m.id, m]))
  for (const m of roboticsCurriculum.modules) {
    for (const pre of m.prerequisites) {
      const target = byId.get(pre.moduleId)
      assert.ok(target, `${m.id} prerequisite ${pre.moduleId} does not exist`)
      assert.ok(target.order < m.order, `${m.id} prerequisite ${pre.moduleId} is not earlier`)
      assert.ok(pre.reason.length > 0, `${m.id} prerequisite ${pre.moduleId} needs a reason`)
    }
  }
})

test("prev/next navigation chains through all eight weeks", () => {
  const slugs = roboticsModuleSlugs()
  assert.equal(previousRoboticsModule(slugs[0]), null)
  assert.equal(nextRoboticsModule(slugs[7]), null)
  for (let i = 0; i < slugs.length - 1; i++) {
    const next = nextRoboticsModule(slugs[i])
    assert.ok(next, `expected a next module after ${slugs[i]}`)
    assert.equal(next.slug, slugs[i + 1])
    const prev = previousRoboticsModule(slugs[i + 1])
    assert.ok(prev)
    assert.equal(prev.slug, slugs[i])
  }
})

test("the final project is complete and only on the final week", () => {
  const finals = roboticsCurriculum.modules.filter((m) => m.isFinal)
  assert.equal(finals.length, 1)
  const fp = finals[0].finalProject
  assert.ok(fp, "final module must carry a finalProject")
  assert.ok(fp.missionChoices.length >= 5, "final project should offer the five missions")
  assert.ok(fp.requirements.some((r) => r.id.includes("sensor") && r.required))
  assert.ok(fp.requirements.some((r) => r.category === "programming" && r.required))
  assert.equal(fp.requiredTestRuns, 3)
  assert.ok(fp.rubric.length >= 5, "rubric should score at least five categories")
  for (const cat of fp.rubric) assert.equal(cat.levels.length, 4)
  for (const pathId of ["kit", "simulator", "unplugged"] as const) {
    assert.equal(fp.variants[pathId].pathId, pathId)
  }
})

test("path helpers build the expected /courses/robotics routes", () => {
  assert.equal(roboticsPath, "/courses/robotics")
  assert.equal(roboticsLessonPath("what-makes-something-a-robot"), "/courses/robotics/what-makes-something-a-robot")
  assert.equal(roboticsWorksheetPath("week-x"), "/courses/robotics/week-x/worksheet")
  assert.equal(roboticsTeacherGuidePath("week-x"), "/courses/robotics/week-x/teacher-guide")
  assert.ok(getRoboticsModule("what-makes-something-a-robot"))
  assert.equal(getRoboticsModule("no-such-slug"), undefined)
  assert.ok(getRoboticsModuleById("week-1"))
  assert.equal(getRoboticsModuleById("week-99"), undefined)
})

test("equipment paths and progress defaults are well-formed", () => {
  assert.equal(ROBOTICS_EQUIPMENT_PATHS.length, 3)
  assert.deepEqual(
    ROBOTICS_EQUIPMENT_PATHS.map((p) => p.id).sort(),
    ["kit", "simulator", "unplugged"],
  )
  assert.ok(isEquipmentPathId("kit"))
  assert.ok(!isEquipmentPathId("laser"))

  const progress = emptyRoboticsProgress()
  assert.equal(progress.version, ROBOTICS_PROGRESS_VERSION)
  assert.deepEqual(progress.completed, [])
  assert.equal(progress.lastVisited, null)
  assert.equal(progress.unlockAll, false)
})

test("validation catches a deliberately broken curriculum (negative test)", () => {
  // Deep-clone the real curriculum, then corrupt it in ways types cannot catch.
  const broken: RoboticsCurriculum = JSON.parse(JSON.stringify(roboticsCurriculum))
  const week1: RoboticsModule = broken.modules[0]
  // 1) Point a single-choice answer key at the wrong option.
  const q = week1.knowledgeCheck.questions.find((x) => x.kind === "single")
  assert.ok(q && "options" in q, "expected a single-choice question to corrupt")
  q.correctOptionId = q.options.find((o) => !o.correct)!.id
  // 2) Reference a prerequisite that does not exist.
  week1.prerequisites.push({ moduleId: "week-42", reason: "broken" })
  // 3) Break an activity variant's path id.
  week1.activities[0].variants.kit.pathId = "simulator"

  const problems = validateRoboticsCurriculum(broken)
  assert.ok(problems.length >= 3, `expected several problems, got: ${JSON.stringify(problems)}`)
  assert.ok(problems.some((p) => p.includes("correctOptionId")))
  assert.ok(problems.some((p) => p.includes("week-42")))
  assert.ok(problems.some((p) => p.includes("mismatched pathId")))
})

test("the course safety reference covers the four hazard families with real rules", () => {
  const titles = ROBOTICS_SAFETY.map((c) => c.title.toLowerCase())
  for (const family of ["batteries", "motors", "moving robots", "tools"]) {
    assert.ok(
      titles.some((t) => t.includes(family)),
      `safety reference should cover "${family}"`,
    )
  }
  assert.ok(
    ROBOTICS_SAFETY.every((c) => c.id && c.rules.length >= 2 && c.rules.every((r) => r.trim().length > 0)),
    "every safety category needs a stable id and at least two non-empty rules",
  )
})
