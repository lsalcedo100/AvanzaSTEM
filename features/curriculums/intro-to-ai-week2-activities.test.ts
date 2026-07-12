import { test } from "node:test"
import assert from "node:assert/strict"

import {
  CANONICAL_TRAINING,
  CANONICAL_TEST,
  WORKSPACE_EXAMPLES,
  FLAWED_TRAINING,
  REPAIR_POOL,
  SPACE_FRUIT_FEATURES,
  EXPERIMENTS,
  groundTruthLabel,
  featureSignature,
  findDuplicateGroups,
  extraDuplicateCount,
  duplicateIds,
  incompleteIds,
  incorrectLabelIds,
  labelCounts,
  featureValueCounts,
  balanceRatio,
  distance,
  kNearest,
  predict,
  runModel,
  accuracyPercent,
  categoryAccuracy,
  validateSplit,
  runExperiment,
  datasetStats,
  repairComparison,
  votingLabel,
  type SpaceFruit,
} from "./intro-to-ai-week2-activities.ts"

const ALL_CANONICAL = [...CANONICAL_TRAINING, ...CANONICAL_TEST]

/* ============================ Dataset schema ============================= */

test("dataset is large, with stable unique ids across every built-in set", () => {
  assert.ok(CANONICAL_TRAINING.length + CANONICAL_TEST.length >= 30, "need at least 30 canonical examples")
  const ids = [
    ...CANONICAL_TRAINING,
    ...CANONICAL_TEST,
    ...WORKSPACE_EXAMPLES,
    ...FLAWED_TRAINING,
    ...REPAIR_POOL,
  ].map((e) => e.id)
  assert.equal(new Set(ids).size, ids.length, "all ids must be unique")
})

test("every example carries all eight features and an accessible description", () => {
  for (const ex of [...ALL_CANONICAL, ...WORKSPACE_EXAMPLES, ...FLAWED_TRAINING, ...REPAIR_POOL]) {
    for (const meta of SPACE_FRUIT_FEATURES) {
      assert.ok(ex.features[meta.key] !== undefined, `${ex.id} missing feature ${meta.key}`)
    }
    assert.ok(ex.description.length > 10, `${ex.id} needs a description`)
  }
})

test("canonical + workspace labels match the ground-truth rule exactly", () => {
  for (const ex of [...ALL_CANONICAL, ...WORKSPACE_EXAMPLES]) {
    assert.equal(ex.canonicalLabel, groundTruthLabel(ex.features), `${ex.id} canonicalLabel disagrees with the rule`)
  }
})

test("canonical training is balanced between the two categories", () => {
  const c = labelCounts(CANONICAL_TRAINING, true)
  assert.equal(c.safe, c.unsafe, "training should be evenly balanced")
  assert.ok(c.safe >= 10)
})

/* ========================= Duplicate detection ========================== */

test("findDuplicateGroups catches exact and different-id duplicates, ignores incompletes", () => {
  // Workspace has ws-05/ws-06 (exact copy) and ws-01/ws-14 (same features, different id).
  const groups = findDuplicateGroups(WORKSPACE_EXAMPLES)
  const flatSets = groups.map((g) => new Set(g.ids))
  assert.ok(flatSets.some((s) => s.has("ws-05") && s.has("ws-06")), "exact copy not detected")
  assert.ok(flatSets.some((s) => s.has("ws-01") && s.has("ws-14")), "different-id duplicate not detected")

  // Two similar-but-different fruits are NOT duplicates.
  const near = findDuplicateGroups([WORKSPACE_EXAMPLES[0], WORKSPACE_EXAMPLES[2]])
  assert.equal(near.length, 0, "similar (not identical) fruits must not be duplicates")
})

test("duplicate detection is deterministic and counts extras correctly", () => {
  assert.deepEqual(findDuplicateGroups(WORKSPACE_EXAMPLES), findDuplicateGroups(WORKSPACE_EXAMPLES))
  // Two duplicate groups of size 2 => 2 extra rows.
  assert.equal(extraDuplicateCount(WORKSPACE_EXAMPLES), 2)
  assert.ok(duplicateIds(WORKSPACE_EXAMPLES).has("ws-06"))
})

test("flawed dataset contains real planted duplicates and incorrect labels", () => {
  assert.ok(extraDuplicateCount(FLAWED_TRAINING) >= 2, "flawed set needs duplicates")
  assert.ok(incorrectLabelIds(FLAWED_TRAINING).size >= 3, "flawed set needs several wrong labels")
  // Imbalanced toward safe.
  const c = labelCounts(FLAWED_TRAINING, false)
  assert.ok(c.safe > c.unsafe, "flawed set should be imbalanced toward safe")
})

test("incomplete examples are found and never flagged as duplicates or mislabels", () => {
  const inc = incompleteIds(WORKSPACE_EXAMPLES)
  assert.ok(inc.has("ws-09") && inc.has("ws-12"))
  // ws-09 has a missing feature, so it must not appear in any duplicate group.
  assert.ok(!duplicateIds(WORKSPACE_EXAMPLES).has("ws-09"))
})

test("featureSignature ignores id/label but reflects features", () => {
  assert.equal(featureSignature(WORKSPACE_EXAMPLES[0].features), featureSignature(WORKSPACE_EXAMPLES[13].features))
  assert.notEqual(featureSignature(WORKSPACE_EXAMPLES[0].features), featureSignature(WORKSPACE_EXAMPLES[1].features))
})

/* ============================ Label editing ============================= */

test("editing a stored label updates counts and incorrect-label detection", () => {
  const edited: SpaceFruit[] = FLAWED_TRAINING.map((e) => (e.id === "fl-15" ? { ...e, label: e.canonicalLabel } : e))
  assert.ok(incorrectLabelIds(FLAWED_TRAINING).has("fl-15"))
  assert.ok(!incorrectLabelIds(edited).has("fl-15"), "fixing the label should clear the flag")
})

test("labelCounts distinguishes stored vs canonical and counts unlabeled", () => {
  const stored = labelCounts(WORKSPACE_EXAMPLES, false)
  assert.equal(stored.unlabeled, WORKSPACE_EXAMPLES.length, "workspace starts unlabeled")
  const canon = labelCounts(WORKSPACE_EXAMPLES, true)
  assert.equal(canon.unlabeled, 0)
  assert.equal(canon.safe + canon.unsafe, WORKSPACE_EXAMPLES.length)
})

test("featureValueCounts sums to the number of examples for a categorical feature", () => {
  const counts = featureValueCounts(CANONICAL_TRAINING, "color")
  assert.equal(counts.reduce((n, c) => n + c.count, 0), CANONICAL_TRAINING.length)
})

/* ============================ Split validation ========================== */

test("validateSplit flags empty, tiny, single-category, and overlapping test sets", () => {
  assert.ok(!validateSplit(CANONICAL_TRAINING, []).ok, "empty test must be an error")
  assert.ok(validateSplit(CANONICAL_TRAINING, CANONICAL_TEST.slice(0, 2)).warnings.some((w) => /tiny|unreliable|few/i.test(w)))
  const onlySafe = CANONICAL_TEST.filter((e) => e.canonicalLabel === "safe")
  assert.ok(validateSplit(CANONICAL_TRAINING, onlySafe).warnings.some((w) => /one category/i.test(w)))
  const overlap = validateSplit(CANONICAL_TRAINING, [CANONICAL_TRAINING[0]])
  assert.ok(!overlap.ok && overlap.errors.some((e) => /BOTH/i.test(e)))
})

test("a good split passes validation with no errors", () => {
  const v = validateSplit(CANONICAL_TRAINING, CANONICAL_TEST)
  assert.ok(v.ok)
  assert.equal(v.errors.length, 0)
})

/* ============================ Model behavior ============================ */

test("distance and kNearest are deterministic", () => {
  const a = CANONICAL_TEST[0].features
  assert.equal(distance(a, a), 0)
  assert.deepEqual(
    kNearest(CANONICAL_TRAINING, a, 3).map((n) => n.fruit.id),
    kNearest(CANONICAL_TRAINING, a, 3).map((n) => n.fruit.id),
  )
})

test("predict explains itself with the actual neighbors that decided the vote", () => {
  const p = predict(CANONICAL_TRAINING, CANONICAL_TEST[3].features, 3) // Craterspine, unsafe
  assert.equal(p.label, "unsafe")
  assert.equal(p.neighbors.length, 3)
  assert.equal(p.safeVotes + p.unsafeVotes, 3)
  assert.match(p.explanation, /most similar/i)
})

test("the balanced model generalizes: perfect accuracy on the held-back test set", () => {
  const run = runModel(CANONICAL_TRAINING, CANONICAL_TEST, 3)
  assert.equal(run.accuracy, 1, `expected 100% but got ${accuracyPercent(run)}%`)
  assert.equal(run.correct, run.total)
})

test("model output is stable across repeated runs", () => {
  const a = runModel(CANONICAL_TRAINING, CANONICAL_TEST, 3)
  const b = runModel(CANONICAL_TRAINING, CANONICAL_TEST, 3)
  assert.deepEqual(
    a.results.map((r) => [r.fruit.id, r.predicted]),
    b.results.map((r) => [r.fruit.id, r.predicted]),
  )
})

test("votingLabel uses the stored (possibly wrong) label so bad data misleads", () => {
  const mislabeled = FLAWED_TRAINING.find((e) => e.id === "fl-15")!
  assert.equal(mislabeled.label, "safe")
  assert.equal(mislabeled.canonicalLabel, "unsafe")
  assert.equal(votingLabel(mislabeled), "safe")
})

/* =================== Experiments: data quality effects ================== */

test("balanced beats both unbalanced and incorrect-label conditions", () => {
  const balanced = runExperiment("balanced", 3)
  const unbalanced = runExperiment("unbalanced", 3)
  const incorrect = runExperiment("incorrect", 3)
  assert.equal(balanced.accuracy, 1)
  assert.ok(unbalanced.accuracy < balanced.accuracy, "unbalanced data should lower accuracy")
  assert.ok(incorrect.accuracy < balanced.accuracy, "incorrect labels should lower accuracy")
})

test("unbalanced data specifically hurts the under-represented Not-safe category", () => {
  const balanced = runExperiment("balanced", 3)
  const unbalanced = runExperiment("unbalanced", 3)
  assert.ok(categoryAccuracy(unbalanced, "unsafe") < categoryAccuracy(balanced, "unsafe"))
})

test("every experiment is reproducible", () => {
  for (const exp of EXPERIMENTS) {
    const a = runExperiment(exp.id, 3)
    const b = runExperiment(exp.id, 3)
    assert.deepEqual(a.results.map((r) => r.predicted), b.results.map((r) => r.predicted))
  }
})

/* ==================== Accuracy + before/after ========================== */

test("accuracy is correct predictions over total predictions", () => {
  const run = runModel(CANONICAL_TRAINING, CANONICAL_TEST, 3)
  assert.equal(run.accuracy, run.correct / run.total)
  assert.equal(accuracyPercent(runModel(CANONICAL_TRAINING, [], 3)), 0)
})

test("repairing the flawed dataset improves the comparison", () => {
  // Repair: fix wrong labels, drop duplicates, add pool examples for balance.
  const dupIds = duplicateIds(FLAWED_TRAINING)
  const seen = new Set<string>()
  const deduped = FLAWED_TRAINING.filter((e) => {
    const sig = featureSignature(e.features)
    if (dupIds.has(e.id) && seen.has(sig)) return false
    seen.add(sig)
    return true
  })
  const fixed = deduped.map((e) => ({ ...e, label: e.canonicalLabel }))
  const repaired = [...fixed, ...REPAIR_POOL.filter((e) => e.canonicalLabel === "unsafe")]

  const cmp = repairComparison(FLAWED_TRAINING, repaired, 3)
  assert.ok(cmp.afterRun.accuracy > cmp.beforeRun.accuracy, "repair should raise accuracy")
  assert.equal(datasetStats(fixed).incorrectCount, 0, "no incorrect labels remain after fixing")
  assert.ok(cmp.rows.find((r) => r.metric === "Overall accuracy"))
  assert.ok(balanceRatio(repaired) > balanceRatio(FLAWED_TRAINING))
})
