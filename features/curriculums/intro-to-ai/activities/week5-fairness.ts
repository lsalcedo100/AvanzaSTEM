/**
 * Week 5 — Fairness Audit engine (framework-free, deterministic).
 *
 * A fictional school's after-school STEM-program recommender. A transparent
 * nearest-neighbor classifier predicts whether a student is a "good fit" using a
 * set of WEIGHTED features; the audit compares OVERALL accuracy with GROUP-LEVEL
 * accuracy to reveal a gap the overall number hides. No randomness, no real or
 * personal data — every student, group, and neighborhood is invented.
 *
 * The unfairness has two real causes the student can fix:
 *  1. A misleading PROXY feature ("lives near campus") that the flawed model
 *     OVER-WEIGHTS. It tracks neighborhood, not fit, so it pushes the far-away
 *     (Riverside) students toward their (historically not-fit) neighbors.
 *  2. UNDER-REPRESENTATION: the base training data has only not-fit Riverside
 *     students, so good-fit Riverside students have no similar example to match.
 *
 * Lowering the proxy weight and/or adding good-fit Riverside examples raises
 * Riverside's group accuracy — but never guarantees perfect fairness.
 */

/* ========================================================================== */
/* Data model                                                                 */
/* ========================================================================== */

export type Group = "Hillside" | "Riverside"
export type Interest = "robotics" | "coding" | "science" | "art"

export type StudentFeatures = {
  interest: Interest
  scheduleFree: boolean
  pastStem: number // 0..3 prior STEM activities
  /** PROXY: correlates with neighborhood, not with genuine fit. */
  nearCampus: boolean
}

export type StudentRecord = {
  id: string
  group: Group
  features: StudentFeatures
  /** Ground-truth "good fit" — independent of the proxy by construction. */
  goodFit: boolean
}

export type FeatureKey = "interest" | "scheduleFree" | "pastStem" | "nearCampus"
export type Weights = Record<FeatureKey, number>

export const FEATURE_META: { key: FeatureKey; label: string; proxy?: boolean; note: string }[] = [
  { key: "interest", label: "Interest area", note: "What the student likes — directly relevant to program fit." },
  { key: "scheduleFree", label: "Free after school", note: "Whether the student can attend — relevant." },
  { key: "pastStem", label: "Past STEM activities", note: "Prior involvement — relevant." },
  { key: "nearCampus", label: "Lives near campus", proxy: true, note: "A proxy for neighborhood. It does not measure fit, but it tracks which group a student is in — a misleading feature." },
]

/** Flawed default: the model leans on the proxy (weight 2) more than real features. */
export function flawedWeights(): Weights {
  return { interest: 1, scheduleFree: 1, pastStem: 1, nearCampus: 2 }
}

/** The genuine rule the ground-truth label follows (not given to the model). */
export function trueGoodFit(f: StudentFeatures): boolean {
  return f.interest !== "art" && (f.scheduleFree || f.pastStem >= 2)
}

function rec(id: string, group: Group, f: StudentFeatures): StudentRecord {
  return { id, group, features: f, goodFit: trueGoodFit(f) }
}

/* ========================================================================== */
/* Dataset                                                                     */
/* ========================================================================== */

// Hillside (majority, near campus): includes good-fit examples for each STEM
// interest, plus some not-fit art students.
export const TRAINING: StudentRecord[] = [
  rec("h-rob1", "Hillside", { interest: "robotics", scheduleFree: true, pastStem: 1, nearCampus: true }),
  rec("h-rob2", "Hillside", { interest: "robotics", scheduleFree: true, pastStem: 2, nearCampus: true }),
  rec("h-cod1", "Hillside", { interest: "coding", scheduleFree: true, pastStem: 1, nearCampus: true }),
  rec("h-cod2", "Hillside", { interest: "coding", scheduleFree: true, pastStem: 2, nearCampus: true }),
  rec("h-sci1", "Hillside", { interest: "science", scheduleFree: true, pastStem: 1, nearCampus: true }),
  rec("h-sci2", "Hillside", { interest: "science", scheduleFree: true, pastStem: 2, nearCampus: true }),
  rec("h-art1", "Hillside", { interest: "art", scheduleFree: false, pastStem: 0, nearCampus: true }),
  rec("h-art2", "Hillside", { interest: "art", scheduleFree: true, pastStem: 0, nearCampus: true }),
  rec("h-cod3", "Hillside", { interest: "coding", scheduleFree: false, pastStem: 0, nearCampus: true }),
  rec("h-rob3", "Hillside", { interest: "robotics", scheduleFree: false, pastStem: 0, nearCampus: true }),
  // Riverside (minority, far): the base data has ONLY not-fit students — the
  // representation problem. Each mirrors a good-fit test student's interest.
  rec("r-rob1", "Riverside", { interest: "robotics", scheduleFree: false, pastStem: 0, nearCampus: false }),
  rec("r-rob2", "Riverside", { interest: "robotics", scheduleFree: false, pastStem: 1, nearCampus: false }),
  rec("r-cod1", "Riverside", { interest: "coding", scheduleFree: false, pastStem: 0, nearCampus: false }),
  rec("r-cod2", "Riverside", { interest: "coding", scheduleFree: false, pastStem: 1, nearCampus: false }),
  rec("r-sci1", "Riverside", { interest: "science", scheduleFree: false, pastStem: 0, nearCampus: false }),
  rec("r-sci2", "Riverside", { interest: "science", scheduleFree: false, pastStem: 1, nearCampus: false }),
]

// Good-fit Riverside students the base training was missing — the student can add
// them to improve representation.
export const ADDABLE: StudentRecord[] = [
  rec("r-add1", "Riverside", { interest: "robotics", scheduleFree: true, pastStem: 2, nearCampus: false }),
  rec("r-add2", "Riverside", { interest: "coding", scheduleFree: true, pastStem: 2, nearCampus: false }),
  rec("r-add3", "Riverside", { interest: "science", scheduleFree: true, pastStem: 2, nearCampus: false }),
  rec("r-add4", "Riverside", { interest: "robotics", scheduleFree: true, pastStem: 3, nearCampus: false }),
]

// Held-back test set. Riverside includes good-fit students the flawed model misses.
export const TEST: StudentRecord[] = [
  rec("h-e1", "Hillside", { interest: "coding", scheduleFree: true, pastStem: 1, nearCampus: true }),
  rec("h-e2", "Hillside", { interest: "science", scheduleFree: false, pastStem: 2, nearCampus: true }),
  rec("h-e3", "Hillside", { interest: "art", scheduleFree: true, pastStem: 0, nearCampus: true }),
  rec("h-e4", "Hillside", { interest: "robotics", scheduleFree: true, pastStem: 1, nearCampus: true }),
  rec("r-e1", "Riverside", { interest: "robotics", scheduleFree: true, pastStem: 1, nearCampus: false }),
  rec("r-e2", "Riverside", { interest: "coding", scheduleFree: true, pastStem: 1, nearCampus: false }),
  rec("r-e3", "Riverside", { interest: "science", scheduleFree: true, pastStem: 1, nearCampus: false }),
  rec("r-e4", "Riverside", { interest: "art", scheduleFree: false, pastStem: 0, nearCampus: false }),
]

/* ========================================================================== */
/* Classifier (weighted nearest neighbors)                                     */
/* ========================================================================== */

function featureDistance(key: FeatureKey, a: StudentFeatures, b: StudentFeatures): number {
  switch (key) {
    case "interest":
      return a.interest === b.interest ? 0 : 1
    case "scheduleFree":
      return a.scheduleFree === b.scheduleFree ? 0 : 1
    case "pastStem":
      return Math.abs(a.pastStem - b.pastStem) / 3
    case "nearCampus":
      return a.nearCampus === b.nearCampus ? 0 : 1
  }
}

const FEATURE_KEYS: FeatureKey[] = ["interest", "scheduleFree", "pastStem", "nearCampus"]

export function distance(a: StudentFeatures, b: StudentFeatures, weights: Weights): number {
  return FEATURE_KEYS.reduce((d, key) => d + (weights[key] ?? 0) * featureDistance(key, a, b), 0)
}

export function predictFit(training: StudentRecord[], target: StudentFeatures, weights: Weights, k = 3): boolean {
  const neighbors = training
    .map((t) => ({ t, d: distance(target, t.features, weights) }))
    .sort((x, y) => x.d - y.d || x.t.id.localeCompare(y.t.id))
    .slice(0, Math.max(1, Math.min(k, training.length)))
  const yes = neighbors.filter((n) => n.t.goodFit).length
  return yes > neighbors.length - yes
}

/* ========================================================================== */
/* Evaluation — overall + group-level, with FP/FN                              */
/* ========================================================================== */

export type GroupMetrics = { group: Group; correct: number; total: number; accuracy: number; falsePos: number; falseNeg: number; trainingCount: number }

export type Evaluation = {
  overall: { correct: number; total: number; accuracy: number }
  groups: GroupMetrics[]
  results: { record: StudentRecord; predicted: boolean; correct: boolean }[]
}

export function evaluate(training: StudentRecord[], test: StudentRecord[], weights: Weights, k = 3): Evaluation {
  const results = test.map((record) => {
    const predicted = predictFit(training, record.features, weights, k)
    return { record, predicted, correct: predicted === record.goodFit }
  })
  const groups: GroupMetrics[] = (["Hillside", "Riverside"] as Group[]).map((group) => {
    const gr = results.filter((r) => r.record.group === group)
    const correct = gr.filter((r) => r.correct).length
    return {
      group,
      correct,
      total: gr.length,
      accuracy: gr.length === 0 ? 0 : correct / gr.length,
      falsePos: gr.filter((r) => r.predicted && !r.record.goodFit).length,
      falseNeg: gr.filter((r) => !r.predicted && r.record.goodFit).length,
      trainingCount: training.filter((t) => t.group === group).length,
    }
  })
  const correct = results.filter((r) => r.correct).length
  return { overall: { correct, total: results.length, accuracy: results.length === 0 ? 0 : correct / results.length }, groups, results }
}

export function accuracyPercent(a: { accuracy: number }): number {
  return Math.round(a.accuracy * 100)
}

export function groupCounts(records: StudentRecord[]): Record<Group, number> {
  return { Hillside: records.filter((r) => r.group === "Hillside").length, Riverside: records.filter((r) => r.group === "Riverside").length }
}
