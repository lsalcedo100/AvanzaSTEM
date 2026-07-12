import { test } from "node:test"
import assert from "node:assert/strict"

import { introToAiCourse } from "./intro-to-ai.ts"
import { partialScore, isCorrect, scoreCheck } from "./intro-to-ai-quiz.ts"
import {
  SKILLS,
  STATUS_LABEL,
  computeSkillStates,
  computeSkillState,
  buildCheckThresholds,
  summarizeSkills,
} from "./intro-to-ai-skills.ts"
import {
  MISSION_QUESTIONS,
  MISSION_SECTIONS,
  RECOMMENDATION_DECISIONS,
  REASON_FIELDS,
  FINAL_REFLECTION_PROMPTS,
  evaluateRecommendation,
  parseRecommendation,
  emptyRecommendation,
} from "./intro-to-ai-mission.ts"
import {
  emptyIntroToAiProgress,
  courseCompletionRequirements,
  isCourseComplete,
  assessmentAttempted,
  finalProjectComplete,
  finalReflectionComplete,
  type IntroToAiProgress,
} from "./intro-to-ai-progress.ts"
import { emptyProject, getProjectType, TEST_KINDS, STUDIO_ACTIVITY_ID, type StudioProject, type TestKind } from "./intro-to-ai-final-project.ts"
import type { MultipleChoiceQuestion } from "./intro-to-ai-types.ts"

const ALL_LESSON_IDS = introToAiCourse.weeks.flatMap((w) => w.lessons.map((l) => l.id))
const THRESHOLDS = buildCheckThresholds(introToAiCourse)

/* ====================== Question types + grading ======================= */

test("partialScore is all-or-nothing for single answers and proportional for multiple-select", () => {
  const single = MISSION_QUESTIONS.find((q) => q.id === "m-a1")!
  assert.equal(partialScore(single, "m-a1-a"), 1)
  assert.equal(partialScore(single, "m-a1-b"), 0)

  const multi = MISSION_QUESTIONS.find((q) => q.id === "m-c2") as MultipleChoiceQuestion
  const correctIds = multi.choices.filter((c) => c.correct).map((c) => c.id) // 3 correct
  assert.equal(partialScore(multi, correctIds.join(",")), 1)
  // Two of three correct, no wrong picks -> 2/3.
  assert.ok(Math.abs(partialScore(multi, correctIds.slice(0, 2).join(",")) - 2 / 3) < 1e-9)
  // Two correct + one wrong -> (2-1)/3.
  const wrong = multi.choices.find((c) => !c.correct)!.id
  assert.ok(Math.abs(partialScore(multi, [...correctIds.slice(0, 2), wrong].join(",")) - 1 / 3) < 1e-9)
})

test("questions with a chart/table context still grade normally", () => {
  const b1 = MISSION_QUESTIONS.find((q) => q.id === "m-b1")!
  assert.ok(b1.context && b1.context.kind === "bar-chart")
  assert.equal(isCorrect(b1, "m-b1-b"), true)
  assert.equal(isCorrect(b1, "m-b1-a"), false)
})

/* ============================ Skills =================================== */

test("there are twelve skills with labels and understandable statuses", () => {
  assert.equal(SKILLS.length, 12)
  for (const s of SKILLS) assert.ok(s.label && s.description && s.lessonIds.length > 0 && s.checkIds.length > 0)
  assert.deepEqual(Object.keys(STATUS_LABEL).sort(), ["demonstrated", "developing", "not-attempted", "review-recommended"])
})

test("empty progress => every skill not-attempted", () => {
  const states = computeSkillStates(emptyIntroToAiProgress(), introToAiCourse, false)
  assert.equal(states.length, 12)
  assert.ok(states.every((s) => s.status === "not-attempted"))
  assert.equal(summarizeSkills(states)["not-attempted"], 12)
})

test("a passed check + completed lesson => demonstrated; a failed attempt => review recommended", () => {
  const skill = SKILLS.find((s) => s.id === "sk-identify")! // lesson w1l1, check w1l1-kc
  const threshold = THRESHOLDS["w1l1-kc"]

  const demo = emptyIntroToAiProgress()
  demo.completedLessons = ["w1l1"]
  demo.startedLessons = ["w1l1"]
  demo.knowledgeChecks["w1l1-kc"] = { answers: {}, score: threshold, total: threshold, savedAt: "" }
  assert.equal(computeSkillState(skill, demo, THRESHOLDS, false).status, "demonstrated")

  const review = emptyIntroToAiProgress()
  review.startedLessons = ["w1l1"]
  review.knowledgeChecks["w1l1-kc"] = { answers: {}, score: 0, total: threshold, savedAt: "" }
  assert.equal(computeSkillState(skill, review, THRESHOLDS, false).status, "review-recommended")

  const developing = emptyIntroToAiProgress()
  developing.startedLessons = ["w1l1"] // started but not complete
  assert.equal(computeSkillState(skill, developing, THRESHOLDS, false).status, "developing")
})

test("the design skill needs a completed final project to be demonstrated", () => {
  const skill = SKILLS.find((s) => s.id === "sk-design")!
  const p = emptyIntroToAiProgress()
  p.completedLessons = [...skill.lessonIds]
  p.startedLessons = [...skill.lessonIds]
  for (const id of skill.checkIds) p.knowledgeChecks[id] = { answers: {}, score: THRESHOLDS[id] ?? 1, total: 3, savedAt: "" }
  assert.equal(computeSkillState(skill, p, THRESHOLDS, false).status, "developing")
  assert.equal(computeSkillState(skill, p, THRESHOLDS, true).status, "demonstrated")
})

/* ============================ Mission ================================= */

test("the mission has the required structure: 4 concept, 3 result, 2 fairness/privacy, 1 misinfo", () => {
  const counts = Object.fromEntries(MISSION_SECTIONS.map((s) => [s.id, s.questionIds.length]))
  assert.deepEqual(counts, { A: 4, B: 3, C: 2, D: 1 })
  assert.equal(MISSION_QUESTIONS.length, 10)
  // Result-interpretation questions carry a chart/table context.
  for (const id of MISSION_SECTIONS.find((s) => s.id === "B")!.questionIds) {
    assert.ok(MISSION_QUESTIONS.find((q) => q.id === id)!.context, `${id} needs a context`)
  }
  // Every question maps to a skill.
  for (const q of MISSION_QUESTIONS) assert.ok(q.skillId, `${q.id} needs a skillId`)
})

test("every mission question's marked-correct answer actually grades correct", () => {
  const answers: Record<string, string> = {}
  for (const q of MISSION_QUESTIONS) {
    if (q.kind === "single" || q.kind === "scenario") answers[q.id] = q.choices.find((c) => c.correct)!.id
    else if (q.kind === "multiple") answers[q.id] = q.choices.filter((c) => c.correct).map((c) => c.id).sort().join(",")
    else if (q.kind === "true-false") answers[q.id] = String(q.answer)
  }
  const { score, total } = scoreCheck(MISSION_QUESTIONS, answers)
  assert.equal(score, total)
})

test("the written recommendation needs a decision and all six reasons, and any decision is allowed", () => {
  assert.equal(evaluateRecommendation(emptyRecommendation()).complete, false)
  const full = emptyRecommendation()
  full.decision = "reject"
  for (const f of REASON_FIELDS) full.reasons[f.id] = "a real reason"
  assert.equal(evaluateRecommendation(full).complete, true)
  // Approve is equally acceptable (never wrong just for differing).
  const approve = { ...full, decision: "approve" as const }
  assert.equal(evaluateRecommendation(approve).complete, true)
  // Missing one reason -> incomplete with that field listed.
  const missing = { ...full, reasons: { ...full.reasons, appeal: "" } }
  assert.deepEqual(evaluateRecommendation(missing).missing, ["appeal"])
  assert.ok(RECOMMENDATION_DECISIONS.length === 4)
})

test("recommendation parse round-trips and recovers from malformed data", () => {
  const a = emptyRecommendation()
  a.decision = "limited-pilot"
  a.reasons.benefits = "helps families"
  assert.deepEqual(parseRecommendation(JSON.stringify(a)).decision, "limited-pilot")
  assert.deepEqual(parseRecommendation("{bad"), emptyRecommendation())
  assert.equal(parseRecommendation(JSON.stringify({ decision: "nope" })).decision, "")
})

/* ==================== Completion requirements ========================= */

function completeStudioBlob(): string {
  const proj: StudioProject = emptyProject()
  proj.type = "classifier"
  proj.define = { title: "T", who: "W", whyMatters: "M", currentHandling: "C", evidence: "E" }
  proj.appropriateness = { ...proj.appropriateness, useAi: "yes", conclusion: "because", ifWrong: "x" }
  proj.io = { inputs: "i", outputs: "o", userAction: "u", systemResponse: "s", missingUnclear: "m" }
  for (const f of getProjectType("classifier")!.planFields) proj.plan[f.id] = "planned"
  proj.prototype = { importSource: "", importSnapshot: "", flow: "flow", notes: "" }
  proj.tests = TEST_KINDS.map((k, i) => ({ id: `t${i}`, kind: k.id as TestKind, input: "in", expected: "e", actual: "a", pass: "pass" as const, explanation: "", improvement: "" }))
  proj.limitations = { falsePos: "", falseNeg: "", cannotHandle: "c", refuse: "r", humanReview: "h", classroomLimits: "" }
  proj.privacy = { necessary: "n", optional: "", doNotCollect: "d", processing: "p", retention: "r", deleteCorrect: "dc" }
  proj.fairness = { represented: "rep", missing: "miss", proxies: "", groupTesting: "gt", investigate: "inv" }
  proj.oversight = { reviewer: "rev", when: "", finalDecision: "fd", explanation: "ex", correction: "co", override: "ov" }
  proj.wrapUp = { nextImprovement: "next" }
  return JSON.stringify(proj)
}

function nearlyDoneProgress(): IntroToAiProgress {
  const p = emptyIntroToAiProgress()
  p.completedLessons = [...ALL_LESSON_IDS]
  p.startedLessons = [...ALL_LESSON_IDS]
  p.assessment = { answers: {}, score: 8, total: 10, savedAt: "now" }
  p.activities[STUDIO_ACTIVITY_ID] = completeStudioBlob()
  p.reflections[FINAL_REFLECTION_PROMPTS[0].id] = "It changed a lot."
  return p
}

test("completion needs lessons + assessment attempted + project + reflection — never a perfect score", () => {
  const empty = emptyIntroToAiProgress()
  assert.equal(isCourseComplete(empty, introToAiCourse), false)
  assert.ok(courseCompletionRequirements(empty, introToAiCourse).every((r) => !r.met))

  const done = nearlyDoneProgress()
  assert.equal(assessmentAttempted(done), true)
  assert.equal(finalProjectComplete(done), true)
  assert.equal(finalReflectionComplete(done), true)
  assert.equal(isCourseComplete(done, introToAiCourse), true)

  // A low (non-perfect) assessment score still completes — attempt is enough.
  const lowScore = nearlyDoneProgress()
  lowScore.assessment = { answers: {}, score: 1, total: 10, savedAt: "now" }
  assert.equal(isCourseComplete(lowScore, introToAiCourse), true)
})

test("removing any one requirement blocks completion", () => {
  for (const drop of ["lessons", "assessment", "project", "reflection"]) {
    const p = nearlyDoneProgress()
    if (drop === "lessons") p.completedLessons = p.completedLessons.slice(1)
    if (drop === "assessment") p.assessment = null
    if (drop === "project") p.activities[STUDIO_ACTIVITY_ID] = JSON.stringify(emptyProject())
    if (drop === "reflection") p.reflections = {}
    assert.equal(isCourseComplete(p, introToAiCourse), false, `dropping ${drop} should block completion`)
  }
})

test("the teacher unlockAll override completes the course", () => {
  const p = emptyIntroToAiProgress()
  p.unlockAll = true
  assert.equal(isCourseComplete(p, introToAiCourse), true)
  assert.ok(courseCompletionRequirements(p, introToAiCourse).every((r) => r.met))
})
