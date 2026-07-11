// Tests for lesson completion rules: a week is "completable" only after its
// configured requirements are met through real engagement.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import { emptyRoboticsProgress, getRoboticsModuleById } from "./robotics.ts"
import {
  computeModuleRequirements,
  markLessonStarted,
  moduleRequirementsMet,
  saveActivityResult,
  saveFinalPlanField,
  saveFinalTestResults,
  saveProgramAst,
  saveQuizAttempt,
  saveReflection,
  setFinalMissionChoice,
} from "./robotics-progress.ts"
import { emptyProgram } from "./robotics-program.ts"

const AT = "2026-07-09T12:00:00.000Z"

test("a freshly-opened week does not meet its completion requirements", () => {
  const week1 = getRoboticsModuleById("week-1")!
  const p = markLessonStarted(emptyRoboticsProgress(), week1.id, AT)
  assert.equal(moduleRequirementsMet(p, week1), false)
  const reqs = computeModuleRequirements(p, week1)
  assert.ok(reqs.some((r) => !r.done), "some requirement should be unmet")
})

test("completing the activity, quiz, and reflection meets the requirements", () => {
  const week1 = getRoboticsModuleById("week-1")!
  let p = markLessonStarted(emptyRoboticsProgress(), week1.id, AT)

  // Mark every activity attempted (covers build/explore requirements).
  for (const a of week1.activities) {
    p = saveActivityResult(p, a.id, { pathId: "kit", completed: true }, AT)
  }
  // Submit the knowledge check (a submitted attempt counts, even if not perfect).
  p = saveQuizAttempt(p, week1.knowledgeCheck.id, {}, 2, week1.knowledgeCheck.questions.length, AT)
  // Save a reflection.
  p = saveReflection(p, week1.reflection[0].id, "Robots sense, decide, and act.", AT)

  assert.equal(moduleRequirementsMet(p, week1), true)
  assert.ok(computeModuleRequirements(p, week1).every((r) => r.done))
})

test("a wrong-but-submitted quiz still counts toward completion (engagement, not passing)", () => {
  const week1 = getRoboticsModuleById("week-1")!
  let p = markLessonStarted(emptyRoboticsProgress(), week1.id, AT)
  // Score 0, but submitted.
  p = saveQuizAttempt(p, week1.knowledgeCheck.id, {}, 0, week1.knowledgeCheck.questions.length, AT)
  const quizReq = computeModuleRequirements(p, week1).find((r) => r.label.toLowerCase().includes("knowledge"))
  assert.ok(quizReq, "expected a knowledge-check requirement")
  assert.equal(quizReq.done, true, "a submitted check counts even with a low score")
})

test("without a submitted quiz the week is not completable", () => {
  const week1 = getRoboticsModuleById("week-1")!
  let p = markLessonStarted(emptyRoboticsProgress(), week1.id, AT)
  for (const a of week1.activities) p = saveActivityResult(p, a.id, { pathId: "kit", completed: true }, AT)
  p = saveReflection(p, week1.reflection[0].id, "notes", AT)
  // No quiz attempt yet.
  assert.equal(moduleRequirementsMet(p, week1), false)
})

test("the final project is not completable just by opening it", () => {
  const week8 = getRoboticsModuleById("week-8")!
  const p = markLessonStarted(emptyRoboticsProgress(), week8.id, AT)
  assert.equal(moduleRequirementsMet(p, week8), false, "opening the final project is not enough")
})

test("the final project completes only after real workspace participation", () => {
  const week8 = getRoboticsModuleById("week-8")!
  const runs = week8.finalProject!.requiredTestRuns
  let p = markLessonStarted(emptyRoboticsProgress(), week8.id, AT)

  // Choose a mission and fill the planning brief.
  p = setFinalMissionChoice(p, week8.finalProject!.missionChoices[0].id, AT)
  p = saveFinalPlanField(p, "problem", "Carry water to a plant.", AT)
  p = saveFinalPlanField(p, "required-behavior", "Drive, sense the plant, stop.", AT)
  p = saveFinalPlanField(p, "flowchart", "start -> drive -> sense -> stop", AT)
  // Save a program for the final spec.
  p = saveProgramAst(p, "w8-prog-final", emptyProgram(), AT)
  // Record the required number of test runs, each with content.
  p = saveFinalTestResults(
    p,
    Array.from({ length: runs }, (_, r) => [String(r + 1), "reached the goal", "Y", ""]),
    AT,
  )
  // Document the revision and the final explanation.
  p = saveFinalPlanField(p, "revision", "Lowered the speed so it stopped in time.", AT)
  p = saveFinalPlanField(p, "final-explanation", "It waters a plant and stops safely.", AT)

  assert.equal(moduleRequirementsMet(p, week8), true, "full participation should complete the project")
  assert.ok(computeModuleRequirements(p, week8).every((r) => r.done))
})

test("the final project is incomplete with too few recorded test runs", () => {
  const week8 = getRoboticsModuleById("week-8")!
  let p = markLessonStarted(emptyRoboticsProgress(), week8.id, AT)
  p = setFinalMissionChoice(p, week8.finalProject!.missionChoices[0].id, AT)
  p = saveFinalPlanField(p, "problem", "A", AT)
  p = saveFinalPlanField(p, "required-behavior", "B", AT)
  p = saveFinalPlanField(p, "flowchart", "C", AT)
  p = saveProgramAst(p, "w8-prog-final", emptyProgram(), AT)
  p = saveFinalPlanField(p, "revision", "changed speed", AT)
  p = saveFinalPlanField(p, "final-explanation", "helps", AT)
  // Only one run recorded, but three are required.
  p = saveFinalTestResults(p, [["1", "ok", "Y", ""]], AT)

  const testReq = computeModuleRequirements(p, week8).find((r) => r.label.toLowerCase().includes("test"))
  assert.ok(testReq, "expected a testing requirement")
  assert.equal(testReq.done, false, "one run is not enough when three are required")
})
