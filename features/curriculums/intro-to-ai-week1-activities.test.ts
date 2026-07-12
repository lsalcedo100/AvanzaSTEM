import { test } from "node:test"
import assert from "node:assert/strict"

import {
  AI_DETECTIVE_SYSTEMS,
  DETECTIVE_CATEGORIES,
  evaluateDetective,
  getDetectiveSystem,
  STARTER_CREATURES,
  WITHHELD_CREATURES,
  classify,
  evalRule,
  validateRuleSet,
  runRulesOver,
  describeRule,
  fieldType,
  DEVICE_EXAMPLES,
  DEVICE_FIELDS,
  type Rule,
  type DetectiveCategory,
} from "./intro-to-ai-week1-activities.ts"

/* ============================ AI Detective =============================== */

test("there are at least 12 detective systems with unique ids and required fields", () => {
  assert.ok(AI_DETECTIVE_SYSTEMS.length >= 12)
  const ids = new Set(AI_DETECTIVE_SYSTEMS.map((s) => s.id))
  assert.equal(ids.size, AI_DETECTIVE_SYSTEMS.length)
  for (const s of AI_DETECTIVE_SYSTEMS) {
    assert.ok(s.name && s.description && s.input && s.output && s.reasoning && s.ruleOrPattern, `${s.id} missing a field`)
    assert.ok(s.evidence.length >= 2, `${s.id} needs >=2 evidence options`)
    assert.ok(DETECTIVE_CATEGORIES.some((c) => c.id === s.bestCategory), `${s.id} bestCategory invalid`)
    // Uncertain systems must explain what info is needed.
    if (s.bestCategory === "uncertain") assert.ok(s.infoNeeded, `${s.id} is uncertain but has no infoNeeded`)
  }
})

test("the curated variety is present (fixed-rule, ml, non-ai, and uncertain)", () => {
  const cats = new Set(AI_DETECTIVE_SYSTEMS.map((s) => s.bestCategory))
  for (const c of ["fixed-rule", "ml", "non-ai", "uncertain"] as DetectiveCategory[]) {
    assert.ok(cats.has(c), `no system classified as ${c}`)
  }
})

test("evaluateDetective returns best / reasonable / reconsider deterministically", () => {
  const calc = getDetectiveSystem("sys-calculator")!
  assert.equal(evaluateDetective(calc, "fixed-rule"), "best")
  assert.equal(evaluateDetective(calc, "ml"), "reconsider")

  // Ambiguous system: several categories are acceptable, none is "reconsider" wrongly.
  const weather = getDetectiveSystem("sys-weather")!
  assert.equal(weather.bestCategory, "uncertain")
  assert.equal(evaluateDetective(weather, "uncertain"), "best")
  assert.equal(evaluateDetective(weather, "ml"), "reasonable")
  assert.equal(evaluateDetective(weather, "fixed-rule"), "reasonable")

  const spam = getDetectiveSystem("sys-spam-filter")!
  assert.equal(evaluateDetective(spam, "ml"), "best")
  assert.equal(evaluateDetective(spam, "uncertain"), "reasonable")
})

test("every detective system's expected answer evaluates as best", () => {
  for (const s of AI_DETECTIVE_SYSTEMS) {
    assert.equal(evaluateDetective(s, s.bestCategory), "best", `${s.id} best answer not 'best'`)
    for (const c of s.alsoReasonable) assert.equal(evaluateDetective(s, c), "reasonable", `${s.id} alsoReasonable ${c} not 'reasonable'`)
  }
})

/* ============================ Rule engine ================================ */

test("evalRule handles boolean, number, and string conditions", () => {
  const flitter = STARTER_CREATURES.find((c) => c.id === "cr-flitterbug")!
  assert.equal(evalRule({ id: "x", field: "hasWings", op: "is", value: true, category: "Sky Creature" }, flitter), true)
  assert.equal(evalRule({ id: "x", field: "hasWings", op: "isNot", value: false, category: "Sky Creature" }, flitter), false)
  assert.equal(evalRule({ id: "x", field: "legs", op: "atLeast", value: 4, category: "Land Creature" }, flitter), true)
  assert.equal(evalRule({ id: "x", field: "legs", op: "atMost", value: 2, category: "Land Creature" }, flitter), false)
  assert.equal(evalRule({ id: "x", field: "bodyColor", op: "equals", value: "yellow", category: "X" }, flitter), true)
})

const SIMPLE_RULES: Rule[] = [
  { id: "r1", field: "hasWings", op: "is", value: true, category: "Sky Creature" },
  { id: "r2", field: "livesInWater", op: "is", value: true, category: "Water Creature" },
  { id: "r3", field: "legs", op: "atLeast", value: 0, category: "Land Creature" },
]

test("classify is deterministic and first-match-wins", () => {
  const gleam = STARTER_CREATURES.find((c) => c.id === "cr-gleamfish")!
  const a = classify(SIMPLE_RULES, gleam)
  const b = classify(SIMPLE_RULES, gleam)
  assert.deepEqual(a, b)
  assert.equal(a.category, "Water Creature")
  assert.equal(a.matchedRuleId, "r2")
})

test("the simple rule set classifies all starter creatures correctly", () => {
  const runs = runRulesOver(SIMPLE_RULES, STARTER_CREATURES)
  assert.ok(runs.every((r) => r.agrees), "simple rules should get all starters right")
})

test("withheld creatures expose weaknesses: wings-underwater, decorative fins, damaged wings, no-match", () => {
  // Divewing has wings but lives in water; wings-first rule misclassifies it as Sky.
  const divewing = WITHHELD_CREATURES.find((c) => c.id === "cr-divewing")!
  assert.equal(classify(SIMPLE_RULES, divewing).category, "Sky Creature")
  assert.equal(divewing.canonicalCategory, "Water Creature")
  assert.notEqual(classify(SIMPLE_RULES, divewing).category, divewing.canonicalCategory)

  // Reordering water before wings fixes Divewing (conflict resolution by order).
  const waterFirst: Rule[] = [SIMPLE_RULES[1], SIMPLE_RULES[0], SIMPLE_RULES[2]]
  assert.equal(classify(waterFirst, divewing).category, "Water Creature")

  // No-match: a rule set without a catch-all leaves Voidling (0 legs, no wings/water) unclassified.
  const noCatchAll: Rule[] = [SIMPLE_RULES[0], SIMPLE_RULES[1]]
  const voidling = WITHHELD_CREATURES.find((c) => c.id === "cr-voidling")!
  assert.deepEqual(classify(noCatchAll, voidling), { category: null, matchedRuleId: null })
})

test("validateRuleSet rejects empty and incomplete rule sets", () => {
  assert.equal(validateRuleSet([]).valid, false)
  const bad = validateRuleSet([{ id: "r1", field: "legs", op: "atLeast", value: "", category: "" } as unknown as Rule])
  assert.equal(bad.valid, false)
  assert.ok(bad.issues.length >= 1)
  assert.equal(validateRuleSet(SIMPLE_RULES).valid, true)
})

test("describeRule produces a readable preview and fieldType is correct", () => {
  assert.equal(fieldType("hasWings"), "boolean")
  assert.equal(fieldType("legs"), "number")
  assert.equal(fieldType("bodyColor"), "string")
  assert.match(describeRule(SIMPLE_RULES[0]), /Sky Creature/)
  assert.match(describeRule({ id: "x", field: "legs", op: "atLeast", value: 4, category: "Land Creature" }), /at least 4/)
})

/* ====================== Device investigation ============================ */

test("device examples are complete and contain no personal-information fields", () => {
  assert.ok(DEVICE_EXAMPLES.length >= 3)
  const fieldIds = DEVICE_FIELDS.map((f) => f.id)
  for (const forbidden of ["address", "serial", "account", "photo", "studentName"]) {
    assert.ok(!fieldIds.includes(forbidden as never), `device fields should not collect ${forbidden}`)
  }
  for (const ex of DEVICE_EXAMPLES) {
    assert.ok(ex.name && ex.input && ex.output && ex.evidence && ex.infoNeeded, `${ex.id} incomplete`)
    assert.ok(DETECTIVE_CATEGORIES.some((c) => c.id === ex.suggestedCategory))
  }
})
