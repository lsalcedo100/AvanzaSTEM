// End-to-end progress-journey tests for the Robotics & Automation course.
//
// These exercise the whole student journey through the pure progress functions
// the UI is built on: a brand-new student starting the course, working through
// all eight weeks with the real unlock gating, finishing the final project,
// surviving a refresh (serialize -> parse), resuming mid-course, and recovering
// from corrupted storage. It is the integration net for Phase 15.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import { emptyRoboticsProgress, roboticsCurriculum, type RoboticsModule } from "./robotics.ts"
import {
  findResumeTarget,
  isModuleUnlocked,
  markLessonComplete,
  markLessonStarted,
  moduleRequirementsMet,
  parseRoboticsProgress,
  saveActivityResult,
  saveFinalPlanField,
  saveFinalTestResults,
  saveProgramAst,
  saveQuizAttempt,
  saveReflection,
  selectEquipmentPath,
  serializeRoboticsProgress,
  setFinalMissionChoice,
  setUnlockAll,
  type RoboticsProgress,
} from "./robotics-progress.ts"
import { emptyProgram } from "./robotics-program.ts"

const AT = "2026-07-10T09:00:00.000Z"

const ORDERED: RoboticsModule[] = [...roboticsCurriculum.modules].sort((a, b) => a.order - b.order)

/** Fully satisfy a normal (non-final) week's completion requirements. */
function completeNormalWeek(progress: RoboticsProgress, mod: RoboticsModule): RoboticsProgress {
  let p = markLessonStarted(progress, mod.id, AT)
  for (const a of mod.activities) {
    p = saveActivityResult(p, a.id, { pathId: "simulator", completed: true }, AT)
  }
  p = saveQuizAttempt(p, mod.knowledgeCheck.id, {}, mod.knowledgeCheck.questions.length, mod.knowledgeCheck.questions.length, AT)
  if (mod.reflection[0]) p = saveReflection(p, mod.reflection[0].id, "Reflecting on what I learned.", AT)
  return p
}

/** Fully satisfy the final project's completion requirements. */
function completeFinalWeek(progress: RoboticsProgress, mod: RoboticsModule): RoboticsProgress {
  let p = markLessonStarted(progress, mod.id, AT)
  const fp = mod.finalProject!
  p = saveActivityResult(p, mod.activities[0]?.id ?? "w8-a-final-build", { pathId: "simulator", completed: true }, AT)
  p = setFinalMissionChoice(p, fp.missionChoices[0].id, AT)
  p = saveFinalPlanField(p, "problem", "A robot that carries water to a plant.", AT)
  p = saveFinalPlanField(p, "required-behavior", "Drive, sense the plant, stop.", AT)
  p = saveFinalPlanField(p, "flowchart", "start -> drive -> sense -> stop", AT)
  p = saveProgramAst(p, mod.savedPrograms[0]!.id, emptyProgram(), AT)
  p = saveFinalTestResults(
    p,
    Array.from({ length: fp.requiredTestRuns }, (_, r) => [String(r + 1), "reached the goal", "Y", ""]),
    AT,
  )
  p = saveFinalPlanField(p, "revision", "Lowered the speed so it stopped in time.", AT)
  p = saveFinalPlanField(p, "final-explanation", "It waters a plant and stops safely.", AT)
  return p
}

test("a brand-new student starts with only Week 1 unlocked", () => {
  const p = emptyRoboticsProgress()
  assert.equal(isModuleUnlocked(p, ORDERED[0]), true, "Week 1 is open from the start")
  for (const mod of ORDERED.slice(1)) {
    assert.equal(isModuleUnlocked(p, mod), false, `${mod.id} should be locked initially`)
  }
})

test("a student can complete all eight weeks in order, unlocking each in turn", () => {
  let p = selectEquipmentPath(emptyRoboticsProgress(), "simulator", AT)
  assert.equal(p.equipmentPath, "simulator")

  for (let i = 0; i < ORDERED.length; i++) {
    const mod = ORDERED[i]
    assert.equal(isModuleUnlocked(p, mod), true, `${mod.id} should be unlocked when reached`)

    p = mod.isFinal ? completeFinalWeek(p, mod) : completeNormalWeek(p, mod)
    assert.equal(
      moduleRequirementsMet(p, mod),
      true,
      `${mod.id} requirements should be met after real participation`,
    )

    p = markLessonComplete(p, mod.id, AT)
    assert.ok(p.completed.includes(mod.id), `${mod.id} recorded complete`)

    const next = ORDERED[i + 1]
    if (next) {
      assert.equal(isModuleUnlocked(p, next), true, `completing ${mod.id} unlocks ${next.id}`)
    }
  }

  // Course is finished; resume points at the final week and reports complete.
  const resume = findResumeTarget(p)
  assert.equal(resume.courseComplete, true, "course should be complete")
  assert.equal(p.completed.length, ORDERED.length, "all eight weeks complete")
})

test("progress survives a refresh (serialize then parse)", () => {
  let p = selectEquipmentPath(emptyRoboticsProgress(), "kit", AT)
  p = completeNormalWeek(p, ORDERED[0])
  p = markLessonComplete(p, ORDERED[0].id, AT)
  p = saveProgramAst(p, "w3-prog-delivery", emptyProgram(), AT)

  const restored = parseRoboticsProgress(serializeRoboticsProgress(p))
  assert.equal(restored.equipmentPath, "kit", "equipment path restored")
  assert.deepEqual(restored.completed, p.completed, "completed weeks restored")
  assert.ok(restored.savedProgramAsts["w3-prog-delivery"], "saved program restored")
})

test("resume returns a partway student to the first unfinished unlocked week", () => {
  // Finish Week 1, start (but do not finish) Week 2.
  let p = completeNormalWeek(emptyRoboticsProgress(), ORDERED[0])
  p = markLessonComplete(p, ORDERED[0].id, AT)
  p = markLessonStarted(p, ORDERED[1].id, AT)

  const resume = findResumeTarget(p)
  assert.equal(resume.courseComplete, false)
  assert.equal(resume.moduleId, ORDERED[1].id, "resume points at the started-but-unfinished Week 2")
  assert.equal(resume.slug, ORDERED[1].slug)
})

test("the teacher unlock-all override opens every week without completing them", () => {
  const p = setUnlockAll(emptyRoboticsProgress(), true, AT)
  for (const mod of ORDERED) {
    assert.equal(isModuleUnlocked(p, mod), true, `${mod.id} open under unlock-all`)
  }
  // Nothing is marked complete just by unlocking.
  assert.equal(findResumeTarget(p).courseComplete, false)
})

test("corrupted or empty storage recovers to a clean default rather than throwing", () => {
  for (const raw of ["", "not json", "{", '{"courseId":"robotics","version":999}', "null"]) {
    const p = parseRoboticsProgress(raw)
    assert.equal(p.courseId, "robotics", `recovered from ${JSON.stringify(raw)}`)
    assert.equal(isModuleUnlocked(p, ORDERED[0]), true, "Week 1 open after recovery")
    assert.ok(Array.isArray(p.completed), "completed is a clean array")
  }
})
