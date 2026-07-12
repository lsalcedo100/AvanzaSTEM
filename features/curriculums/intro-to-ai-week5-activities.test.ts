import { test } from "node:test"
import assert from "node:assert/strict"

import {
  TRAINING,
  TEST,
  ADDABLE,
  evaluate,
  flawedWeights,
  trueGoodFit,
  groupCounts,
  accuracyPercent,
} from "./intro-to-ai-week5-fairness.ts"
import {
  SCENARIOS,
  FIELDS,
  guidanceFor,
  evaluateChoice,
  scoreScenario,
  type Classification,
} from "./intro-to-ai-week5-privacy.ts"
import {
  POSTS,
  EVIDENCE_ITEMS,
  evidenceScore,
  ETHICS_SCENARIOS,
  getEthicsScenario,
  evaluateEthics,
  appealComplete,
  APPEAL_FIELDS,
} from "./intro-to-ai-week5-content.ts"

/* ============================ Fairness ================================== */

test("ground-truth fit ignores the proxy feature", () => {
  assert.equal(trueGoodFit({ interest: "robotics", scheduleFree: true, pastStem: 0, nearCampus: true }), true)
  assert.equal(trueGoodFit({ interest: "robotics", scheduleFree: true, pastStem: 0, nearCampus: false }), true) // proxy doesn't change it
  assert.equal(trueGoodFit({ interest: "art", scheduleFree: true, pastStem: 3, nearCampus: true }), false)
})

test("training data is imbalanced by group and Riverside is under-represented", () => {
  const counts = groupCounts(TRAINING)
  assert.ok(counts.Hillside > counts.Riverside)
  // Base Riverside training has no good-fit examples (the representation gap).
  assert.equal(TRAINING.filter((r) => r.group === "Riverside" && r.goodFit).length, 0)
})

test("overall accuracy hides a group-level gap: Riverside is much worse under the flawed model", () => {
  const ev = evaluate(TRAINING, TEST, flawedWeights())
  const hill = ev.groups.find((g) => g.group === "Hillside")!
  const river = ev.groups.find((g) => g.group === "Riverside")!
  assert.ok(river.accuracy < hill.accuracy - 0.3, `expected a big gap, got Hillside ${accuracyPercent(hill)} vs Riverside ${accuracyPercent(river)}`)
  assert.ok(river.falseNeg >= 2, "the flawed model denies good-fit Riverside students")
})

test("removing the proxy improves Riverside group accuracy", () => {
  const flawed = evaluate(TRAINING, TEST, flawedWeights())
  const noProxy = evaluate(TRAINING, TEST, { ...flawedWeights(), nearCampus: 0 })
  const before = flawed.groups.find((g) => g.group === "Riverside")!.accuracy
  const after = noProxy.groups.find((g) => g.group === "Riverside")!.accuracy
  assert.ok(after > before, `Riverside should improve: ${before} -> ${after}`)
})

test("adding under-represented examples also improves Riverside accuracy", () => {
  const before = evaluate(TRAINING, TEST, flawedWeights()).groups.find((g) => g.group === "Riverside")!.accuracy
  const after = evaluate([...TRAINING, ...ADDABLE], TEST, flawedWeights()).groups.find((g) => g.group === "Riverside")!.accuracy
  assert.ok(after > before)
})

test("evaluation is deterministic", () => {
  const a = evaluate(TRAINING, TEST, flawedWeights())
  const b = evaluate(TRAINING, TEST, flawedWeights())
  assert.deepEqual(a.results.map((r) => r.predicted), b.results.map((r) => r.predicted))
})

/* ============================ Privacy =================================== */

test("privacy scenarios and fields are complete", () => {
  assert.ok(SCENARIOS.length >= 5)
  assert.ok(FIELDS.length >= 12)
  for (const s of SCENARIOS) for (const f of FIELDS) {
    const g = guidanceFor(s.id, f.id)
    assert.ok(g && g.why.length > 5 && g.saferAlternative.length > 3, `${s.id}/${f.id} missing guidance`)
  }
})

test("sensitive fields are classified as too-sensitive by default", () => {
  for (const fieldId of ["exactLocation", "voiceRecording", "photo", "contactList", "exactBirthday"]) {
    assert.equal(guidanceFor("recycling", fieldId).classification, "too-sensitive", `${fieldId} should be too-sensitive`)
  }
})

test("a field's role can change by scenario (favorite subject required for a book recommender)", () => {
  assert.equal(guidanceFor("books", "favoriteSubject").classification, "required")
  assert.equal(guidanceFor("recycling", "favoriteSubject").classification, "unnecessary")
})

test("evaluateChoice returns match + safer alternative + consent + retention", () => {
  const e = evaluateChoice("books", "exactLocation", "required")
  assert.equal(e.matches, false)
  assert.equal(e.recommended, "too-sensitive")
  assert.ok(e.guidance.saferAlternative.length > 3)
  assert.equal(typeof e.guidance.consentNeeded, "boolean")
  assert.ok(e.guidance.retention.length > 3)
})

test("scoreScenario counts matches and over-collection of sensitive data", () => {
  const choices: Record<string, Classification> = {}
  for (const f of FIELDS) choices[f.id] = "required" // over-collect everything
  const s = scoreScenario("books", choices)
  assert.ok(s.unnecessaryOrSensitiveKept > 0, "over-collecting sensitive fields should be flagged")
  assert.equal(s.total, FIELDS.length)
})

/* ==================== Misinformation investigation ===================== */

test("post library covers the required kinds and has 7 evidence checks each", () => {
  assert.ok(POSTS.length >= 8)
  assert.equal(EVIDENCE_ITEMS.length, 7)
  const kinds = POSTS.map((p) => p.kind.toLowerCase()).join(" | ")
  assert.match(kinds, /ai-generated/)
  assert.match(kinds, /misleading caption|wrong context/)
  assert.match(kinds, /quote/)
  assert.match(kinds, /date/)
  assert.match(kinds, /no original source/)
  assert.match(kinds, /reliable/)
  assert.match(kinds, /emotional/)
})

test("verdicts match the evidence pattern", () => {
  const labeledAi = POSTS.find((p) => p.id === "post-ai-labeled")!
  assert.equal(labeledAi.verdict, "trust")
  const reliable = POSTS.find((p) => p.id === "post-reliable")!
  assert.equal(reliable.verdict, "trust")
  const noSource = POSTS.find((p) => p.id === "post-no-source")!
  assert.equal(noSource.verdict, "unconfirmed")
  // Trusted posts have strong evidence; questioned posts have weak evidence.
  assert.ok(evidenceScore(reliable).good >= 6)
  assert.ok(evidenceScore(POSTS.find((p) => p.id === "post-fake-quote")!).good <= 3)
})

test("a real image with a false caption is still questioned (real images can mislead)", () => {
  const edited = POSTS.find((p) => p.id === "post-edited-caption")!
  assert.equal(edited.evidence.originalSourceAvailable, true) // the image is real
  assert.equal(edited.verdict, "question") // but the post is misleading
  assert.match(edited.teachingNote, /real image/i)
})

/* ============================ Ethics =================================== */

test("ethics scenarios include high-stakes cases with key safeguards", () => {
  assert.ok(ETHICS_SCENARIOS.length >= 6)
  const cheating = getEthicsScenario("eth-cheating")!
  assert.equal(cheating.stakes, "high")
  assert.ok(cheating.keySafeguards.includes("appeal") && cheating.keySafeguards.includes("human-review"))
})

test("approving a high-stakes system with no human review or appeal is flagged to reconsider", () => {
  const scenario = getEthicsScenario("eth-cheating")!
  const fb = evaluateEthics(scenario, "approve", [])
  assert.ok(fb.concerns.length >= 2)
  assert.equal(fb.soundness, "reconsider")
})

test("approving with the right safeguards is well-reasoned, and no single answer is forced", () => {
  const scenario = getEthicsScenario("eth-cheating")!
  const fb = evaluateEthics(scenario, "approve-safeguards", ["human-review", "appeal", "representation-check", "explanation"])
  assert.ok(fb.strengths.length >= 3)
  assert.notEqual(fb.soundness, "reconsider")
  // Rejecting the surveillance scenario is also treated as defensible.
  const reject = evaluateEthics(getEthicsScenario("eth-attention")!, "reject", [])
  assert.ok(reject.strengths.some((s) => /not to use AI|defensible/i.test(s)))
})

/* ============================ Appeal =================================== */

test("appeal design is complete only when every part is answered", () => {
  assert.equal(appealComplete({}).complete, false)
  const answers: Record<string, string> = {}
  for (const f of APPEAL_FIELDS) answers[f.id] = "a real answer"
  assert.equal(appealComplete(answers).complete, true)
  delete answers[APPEAL_FIELDS[0].id]
  const partial = appealComplete(answers)
  assert.equal(partial.complete, false)
  assert.ok(partial.missing.includes(APPEAL_FIELDS[0].id))
})
