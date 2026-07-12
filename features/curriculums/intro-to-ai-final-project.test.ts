import { test } from "node:test"
import assert from "node:assert/strict"

import {
  PROJECT_TYPES,
  TEST_KINDS,
  STUDIO_VERSION,
  emptyProject,
  migrateStudio,
  parseStudio,
  getProjectType,
  changeType,
  typeSpecificFilled,
  validateProject,
  projectComplete,
  completionSummary,
  summarizeImport,
  type StudioProject,
  type TestCase,
  type TestKind,
} from "./intro-to-ai-final-project.ts"

/** Builds a fully-completed project of a given type for completion tests. */
function completeProject(type: StudioProject["type"] = "classifier", useAi: "yes" | "no" = "yes"): StudioProject {
  const p = emptyProject()
  p.type = type
  p.define = { title: "T", who: "W", whyMatters: "M", currentHandling: "C", evidence: "E" }
  p.appropriateness = { ...p.appropriateness, useAi, conclusion: "because", ifWrong: "x" }
  p.io = { inputs: "i", outputs: "o", userAction: "u", systemResponse: "s", missingUnclear: "m" }
  const def = getProjectType(type)!
  for (const f of def.planFields) p.plan[f.id] = "planned"
  p.prototype = { importSource: "", importSnapshot: "", flow: "flow", notes: "" }
  const kinds: TestKind[] = TEST_KINDS.map((k) => k.id)
  p.tests = kinds.map((kind, i): TestCase => ({ id: `t${i}`, kind, input: "in", expected: "exp", actual: "act", pass: "pass", explanation: "", improvement: "" }))
  p.limitations = { falsePos: "", falseNeg: "", cannotHandle: "c", refuse: "r", humanReview: "h", classroomLimits: "" }
  p.privacy = { necessary: "n", optional: "", doNotCollect: "d", processing: "p", retention: "r", deleteCorrect: "dc" }
  p.fairness = { represented: "rep", missing: "miss", proxies: "", groupTesting: "gt", investigate: "inv" }
  p.oversight = { reviewer: "rev", when: "", finalDecision: "fd", explanation: "ex", correction: "co", override: "ov" }
  p.wrapUp = { nextImprovement: "next" }
  return p
}

/* ============================ Types ==================================== */

test("there are five project types, each with plan fields", () => {
  assert.equal(PROJECT_TYPES.length, 5)
  for (const t of PROJECT_TYPES) assert.ok(t.planFields.length >= 3, `${t.id} needs plan fields`)
  assert.ok(PROJECT_TYPES.some((t) => t.policyOnly), "one type is a policy/ethics proposal")
})

/* ======================= Migration / persistence ======================= */

test("emptyProject carries the current schema version and empty sections", () => {
  const p = emptyProject()
  assert.equal(p.version, STUDIO_VERSION)
  assert.equal(p.type, null)
  assert.equal(p.tests.length, 0)
})

test("parseStudio round-trips and recovers from malformed data", () => {
  const p = completeProject("chatbot")
  const restored = parseStudio(JSON.stringify(p))
  assert.equal(restored.type, "chatbot")
  assert.equal(restored.define.title, "T")
  assert.equal(restored.tests.length, 6)
  // Malformed JSON -> a fresh, valid project, not a crash.
  assert.deepEqual(parseStudio("{not json"), emptyProject())
})

test("migrateStudio coerces partial/garbage fields with defaults (draft recovery)", () => {
  const partial = { type: "recommender", define: { title: "Only a title" }, tests: [{ kind: "bogus", input: "x" }, "junk"], appropriateness: { useAi: "maybe" } }
  const m = migrateStudio(partial)
  assert.equal(m.type, "recommender")
  assert.equal(m.define.title, "Only a title")
  assert.equal(m.define.who, "") // filled with default
  assert.equal(m.tests.length, 1) // "junk" dropped, bad kind coerced
  assert.equal(m.tests[0].kind, "normal")
  assert.equal(m.appropriateness.useAi, "") // invalid value coerced
  assert.equal(m.version, STUDIO_VERSION)
})

test("an unknown project type is coerced to null", () => {
  assert.equal(migrateStudio({ type: "quantum" }).type, null)
})

/* ======================= Type change ================================== */

test("changing type clears type-specific sections after warning conditions", () => {
  const p = completeProject("classifier")
  assert.equal(typeSpecificFilled(p), true)
  const changed = changeType(p, "chatbot")
  assert.equal(changed.type, "chatbot")
  assert.deepEqual(changed.plan, {})
  assert.equal(changed.prototype.flow, "")
  // Non-type-specific sections survive.
  assert.equal(changed.define.title, "T")
  assert.equal(changed.privacy.necessary, "n")
})

/* ======================= Validation / completion ====================== */

test("a fresh project is not complete and required safety sections are unmet", () => {
  const p = emptyProject()
  assert.equal(projectComplete(p), false)
  const reqs = validateProject(p)
  assert.ok(reqs.some((r) => r.id === "pr-donot" && !r.met))
  assert.ok(reqs.some((r) => r.id === "ov-override" && !r.met))
})

test("a fully-filled project is complete", () => {
  const p = completeProject("classifier")
  const remaining = completionSummary(p).remaining
  assert.deepEqual(remaining, [], `unexpected remaining: ${remaining.map((r) => r.id).join(", ")}`)
  assert.equal(projectComplete(p), true)
})

test("blank safety sections block completion but not saving", () => {
  const p = completeProject("classifier")
  p.privacy.doNotCollect = ""
  p.oversight.override = ""
  assert.equal(projectComplete(p), false)
  const ids = completionSummary(p).remaining.map((r) => r.id)
  assert.ok(ids.includes("pr-donot") && ids.includes("ov-override"))
})

test("fewer than six test cases (or missing kinds) blocks completion", () => {
  const p = completeProject("classifier")
  p.tests = p.tests.slice(0, 4)
  const reqs = validateProject(p)
  assert.ok(reqs.find((r) => r.id === "tests-count")!.met === false)
  assert.ok(reqs.find((r) => r.id === "tests-kinds")!.met === false)
})

test("concluding AI should NOT be used relaxes build sections but keeps safety reasoning", () => {
  const p = completeProject("ethics", "no")
  // Remove build-specific content; project should still be completable as a policy.
  p.plan = {} // ethics is policyOnly so plan stays required
  p.prototype = { importSource: "", importSnapshot: "", flow: "", notes: "" }
  p.fairness.groupTesting = ""
  const reqs = validateProject(p)
  // prototype + group-testing are no longer REQUIRED when not using AI
  assert.equal(reqs.find((r) => r.id === "proto")!.required, false)
  assert.equal(reqs.find((r) => r.id === "fa-group")!.required, false)
  // For a non-policy build type, plan also relaxes when not using AI.
  const buildNo = completeProject("classifier", "no")
  buildNo.plan = {}
  assert.equal(validateProject(buildNo).find((r) => r.id === "plan")!.required, false)
})

/* ======================= Import ======================================= */

test("summarizeImport reads chatbot, classifier, and recommender work safely", () => {
  const chatbot = JSON.stringify({ name: "Helper", intents: [{ name: "Hours" }, { name: "Cards" }], fallback: "sorry" })
  assert.match(summarizeImport("w4l1-act", chatbot).summary, /2 intents/)
  assert.equal(summarizeImport("w4l1-act", chatbot).ok, true)

  const classifier = JSON.stringify({ topic: "shapes", training: { shapes: ["a", "b", "c"] } })
  assert.match(summarizeImport("w3l2-act", classifier).summary, /shapes/)

  const rec = JSON.stringify({ ratings: { "it-01": 5, "it-02": 1 } })
  assert.match(summarizeImport("w4l3-act", rec).summary, /2 rated/)

  // Malformed and empty are handled gracefully.
  assert.equal(summarizeImport("w4l1-act", "{bad").ok, false)
  assert.equal(summarizeImport("w4l1-act", undefined).ok, false)
})
