/**
 * Week 2 interactive-activity data and deterministic engines.
 *
 * A safe, fully fictional "space fruit" dataset plus a transparent, deterministic
 * classifier (k-nearest-neighbors over encoded features). Framework-free so every
 * result is a pure function of the data and the student's choices — there is NO
 * randomness, NO network, and NO fake "training" anywhere. The React components in
 * components/pages/intro-to-ai/activities/ render this logic.
 *
 * The dataset is imaginary and carries NO real medical or safety meaning. "Safe to
 * eat / Not safe to eat" is a made-up classroom rule for pretend space fruit:
 *
 *   A space fruit is NOT SAFE if it glows brightly (glow level 3 or more) OR it is
 *   spiky. Otherwise it is SAFE.
 *
 * That rule is the hidden pattern the model tries to learn from labeled examples;
 * `groundTruthLabel` is its single source of truth. Every canonical example's
 * `canonicalLabel` equals `groundTruthLabel(features)` (asserted by tests). Stable
 * ids throughout; safe to reference from progress. No personal data.
 */

/* ========================================================================== */
/* Feature schema + labels                                                    */
/* ========================================================================== */

export type SpaceFruitLabel = "safe" | "unsafe"

export const LABELS: { id: SpaceFruitLabel; label: string; short: string }[] = [
  { id: "safe", label: "Safe to eat", short: "Safe" },
  { id: "unsafe", label: "Not safe to eat", short: "Not safe" },
]

export function labelText(label: SpaceFruitLabel | "" | undefined): string {
  return label === "safe" ? "Safe to eat" : label === "unsafe" ? "Not safe to eat" : "Unlabeled"
}

export type SpaceFruitColor = "crimson" | "azure" | "violet" | "amber" | "teal"
export type SpaceFruitShape = "round" | "oval" | "star" | "spiral"
export type SpaceFruitTexture = "smooth" | "bumpy" | "fuzzy" | "spiky"
export type SpaceFruitEnvironment = "crater" | "cavern" | "canopy" | "reef" | "dune"

export type SpaceFruitFeatures = {
  color: SpaceFruitColor
  shape: SpaceFruitShape
  texture: SpaceFruitTexture
  environment: SpaceFruitEnvironment
  /** Number of seeds, 0–12. */
  seeds: number
  /** Sweetness, 1 (sour) – 10 (very sweet). */
  sweetness: number
  /** Glow level, 0 (dark) – 5 (bright). */
  glow: number
  /** Diameter in centimeters, 2–20. */
  size: number
}

export type FeatureKey = keyof SpaceFruitFeatures

/** Column metadata used for the data table, sorting, and value counts. */
export type FeatureMeta =
  | { key: FeatureKey; label: string; type: "category"; options: string[] }
  | { key: FeatureKey; label: string; type: "number"; min: number; max: number; unit?: string }

export const SPACE_FRUIT_FEATURES: FeatureMeta[] = [
  { key: "color", label: "Color", type: "category", options: ["crimson", "azure", "violet", "amber", "teal"] },
  { key: "shape", label: "Shape", type: "category", options: ["round", "oval", "star", "spiral"] },
  { key: "texture", label: "Texture", type: "category", options: ["smooth", "bumpy", "fuzzy", "spiky"] },
  { key: "environment", label: "Grows in", type: "category", options: ["crater", "cavern", "canopy", "reef", "dune"] },
  { key: "seeds", label: "Seeds", type: "number", min: 0, max: 12 },
  { key: "sweetness", label: "Sweetness", type: "number", min: 1, max: 10 },
  { key: "glow", label: "Glow level", type: "number", min: 0, max: 5 },
  { key: "size", label: "Size", type: "number", min: 2, max: 20, unit: "cm" },
]

export function featureMeta(key: FeatureKey): FeatureMeta {
  return SPACE_FRUIT_FEATURES.find((f) => f.key === key)!
}

export type SpaceFruit = {
  /** Stable id, unique within its dataset. */
  id: string
  /** Friendly name so a fruit is understandable without an image. */
  name: string
  /** Accessible one-line description of the fruit's features. */
  description: string
  features: SpaceFruitFeatures
  /** The lesson's correct answer for this fruit (ground truth). Never shown as
   *  "objectively true" of the real world — it is the made-up game rule. */
  canonicalLabel: SpaceFruitLabel
  /** A stored/assigned label that MAY differ from `canonicalLabel` (used by the
   *  flawed dataset and the labeling workspace). Undefined = not yet labeled. */
  label?: SpaceFruitLabel
  /** Feature keys whose value is unknown/missing (labeling workspace only). */
  incomplete?: FeatureKey[]
}

/* ========================================================================== */
/* Ground-truth rule                                                          */
/* ========================================================================== */

export const GROUND_TRUTH_RULE =
  "A space fruit is Not safe to eat if it glows brightly (glow level 3 or more) OR it is spiky. Otherwise it is Safe to eat."

/** The single source of truth for a fruit's correct label. Deterministic. */
export function groundTruthLabel(f: SpaceFruitFeatures): SpaceFruitLabel {
  return f.glow >= 3 || f.texture === "spiky" ? "unsafe" : "safe"
}

/** Plain-language reason a fruit has its canonical label (for feedback). */
export function groundTruthReason(f: SpaceFruitFeatures): string {
  const reasons: string[] = []
  if (f.glow >= 3) reasons.push(`it glows brightly (glow level ${f.glow})`)
  if (f.texture === "spiky") reasons.push("it is spiky")
  if (reasons.length > 0) return `Not safe because ${reasons.join(" and ")}.`
  return "Safe because it does not glow brightly and is not spiky."
}

/** Human description built from features (also used as accessible label). */
export function describeFruit(f: SpaceFruitFeatures): string {
  return `A ${f.size} cm ${f.color} ${f.shape} fruit with ${f.texture} skin and ${f.seeds} seeds, sweetness ${f.sweetness} of 10, glow level ${f.glow} of 5, growing in a ${f.environment}.`
}

/* ========================================================================== */
/* Canonical dataset — correct + balanced, split into training and testing    */
/* ========================================================================== */

/** Builds a fruit, filling in the description and canonical label from the rule. */
function fruit(id: string, name: string, f: SpaceFruitFeatures): SpaceFruit {
  return { id, name, description: describeFruit(f), features: f, canonicalLabel: groundTruthLabel(f) }
}

/** 24 correct, balanced examples (12 safe, 12 not safe) the model can learn from. */
export const CANONICAL_TRAINING: SpaceFruit[] = [
  // Safe cluster: low glow, not spiky.
  fruit("tr-01", "Dawnberry", { color: "crimson", shape: "round", texture: "smooth", environment: "canopy", seeds: 6, sweetness: 8, glow: 0, size: 10 }),
  fruit("tr-02", "Sandplum", { color: "amber", shape: "oval", texture: "bumpy", environment: "dune", seeds: 4, sweetness: 7, glow: 1, size: 8 }),
  fruit("tr-03", "Tidefruit", { color: "teal", shape: "round", texture: "fuzzy", environment: "reef", seeds: 8, sweetness: 9, glow: 0, size: 12 }),
  fruit("tr-04", "Emberpear", { color: "crimson", shape: "oval", texture: "smooth", environment: "canopy", seeds: 5, sweetness: 6, glow: 2, size: 9 }),
  fruit("tr-05", "Dunedrop", { color: "amber", shape: "round", texture: "bumpy", environment: "dune", seeds: 3, sweetness: 7, glow: 1, size: 7 }),
  fruit("tr-06", "Canopyfig", { color: "teal", shape: "oval", texture: "fuzzy", environment: "canopy", seeds: 7, sweetness: 8, glow: 0, size: 11 }),
  fruit("tr-07", "Redgourd", { color: "crimson", shape: "round", texture: "smooth", environment: "dune", seeds: 6, sweetness: 5, glow: 2, size: 10 }),
  fruit("tr-08", "Reefplum", { color: "amber", shape: "oval", texture: "fuzzy", environment: "reef", seeds: 4, sweetness: 9, glow: 1, size: 8 }),
  fruit("tr-09", "Greenpod", { color: "teal", shape: "round", texture: "bumpy", environment: "canopy", seeds: 9, sweetness: 6, glow: 0, size: 13 }),
  fruit("tr-10", "Rosedrop", { color: "crimson", shape: "oval", texture: "smooth", environment: "dune", seeds: 5, sweetness: 8, glow: 1, size: 9 }),
  fruit("tr-11", "Amberbud", { color: "amber", shape: "round", texture: "fuzzy", environment: "canopy", seeds: 2, sweetness: 7, glow: 2, size: 6 }),
  fruit("tr-12", "Sweetreef", { color: "teal", shape: "oval", texture: "smooth", environment: "reef", seeds: 6, sweetness: 9, glow: 0, size: 10 }),
  // Not-safe cluster: high glow OR spiky.
  fruit("tr-13", "Starflare", { color: "violet", shape: "star", texture: "spiky", environment: "crater", seeds: 2, sweetness: 3, glow: 4, size: 5 }),
  fruit("tr-14", "Glowcoil", { color: "azure", shape: "spiral", texture: "bumpy", environment: "cavern", seeds: 1, sweetness: 2, glow: 5, size: 4 }),
  fruit("tr-15", "Brightstar", { color: "violet", shape: "star", texture: "smooth", environment: "crater", seeds: 0, sweetness: 4, glow: 3, size: 6 }),
  fruit("tr-16", "Thornstar", { color: "azure", shape: "star", texture: "spiky", environment: "cavern", seeds: 3, sweetness: 2, glow: 2, size: 5 }),
  fruit("tr-17", "Spikecoil", { color: "violet", shape: "spiral", texture: "spiky", environment: "crater", seeds: 1, sweetness: 3, glow: 1, size: 4 }),
  fruit("tr-18", "Cavernglow", { color: "azure", shape: "star", texture: "bumpy", environment: "cavern", seeds: 2, sweetness: 1, glow: 4, size: 7 }),
  fruit("tr-19", "Voidstar", { color: "violet", shape: "spiral", texture: "smooth", environment: "crater", seeds: 0, sweetness: 3, glow: 5, size: 5 }),
  fruit("tr-20", "Barbstar", { color: "azure", shape: "star", texture: "spiky", environment: "cavern", seeds: 4, sweetness: 2, glow: 3, size: 6 }),
  fruit("tr-21", "Fuzzflare", { color: "violet", shape: "star", texture: "fuzzy", environment: "crater", seeds: 1, sweetness: 4, glow: 3, size: 5 }),
  fruit("tr-22", "Prickcoil", { color: "azure", shape: "spiral", texture: "spiky", environment: "cavern", seeds: 2, sweetness: 2, glow: 2, size: 4 }),
  fruit("tr-23", "Spinestar", { color: "violet", shape: "star", texture: "spiky", environment: "crater", seeds: 3, sweetness: 3, glow: 4, size: 6 }),
  fruit("tr-24", "Deepglow", { color: "azure", shape: "spiral", texture: "bumpy", environment: "cavern", seeds: 1, sweetness: 1, glow: 5, size: 5 }),
]

/** 8 correct, unseen examples held back to test the model. */
export const CANONICAL_TEST: SpaceFruit[] = [
  fruit("te-01", "Morningfruit", { color: "crimson", shape: "round", texture: "smooth", environment: "canopy", seeds: 6, sweetness: 8, glow: 1, size: 10 }),
  fruit("te-02", "Dustpear", { color: "amber", shape: "oval", texture: "fuzzy", environment: "dune", seeds: 5, sweetness: 7, glow: 2, size: 8 }),
  fruit("te-03", "Reefdrop", { color: "teal", shape: "round", texture: "bumpy", environment: "reef", seeds: 8, sweetness: 9, glow: 0, size: 12 }),
  fruit("te-04", "Craterspine", { color: "violet", shape: "star", texture: "spiky", environment: "crater", seeds: 2, sweetness: 3, glow: 4, size: 5 }),
  fruit("te-05", "Deepcoil", { color: "azure", shape: "spiral", texture: "bumpy", environment: "cavern", seeds: 1, sweetness: 2, glow: 5, size: 4 }),
  fruit("te-06", "Palestar", { color: "violet", shape: "star", texture: "smooth", environment: "crater", seeds: 1, sweetness: 4, glow: 3, size: 6 }),
  // Spiky but only mildly glowing — "not safe" comes from spikiness alone (a rarer pattern).
  fruit("te-07", "Barbcone", { color: "azure", shape: "star", texture: "spiky", environment: "cavern", seeds: 3, sweetness: 2, glow: 2, size: 5 }),
  fruit("te-08", "Softamber", { color: "amber", shape: "round", texture: "fuzzy", environment: "canopy", seeds: 3, sweetness: 7, glow: 2, size: 7 }),
]

/* ========================================================================== */
/* Labeling workspace dataset (Activity 1) — unlabeled, with planted flaws     */
/* ========================================================================== */

/**
 * A fresh set the student assigns labels to. It carries deterministic planted
 * flaws to discover: exact duplicates, a "same features, different id" duplicate,
 * and rows with a missing feature value. `label` starts undefined (unlabeled);
 * `canonicalLabel` powers the after-reveal feedback.
 */
function wsFruit(id: string, name: string, f: SpaceFruitFeatures, incomplete?: FeatureKey[]): SpaceFruit {
  return { ...fruit(id, name, f), incomplete }
}

export const WORKSPACE_EXAMPLES: SpaceFruit[] = [
  wsFruit("ws-01", "Dawnberry", { color: "crimson", shape: "round", texture: "smooth", environment: "canopy", seeds: 6, sweetness: 8, glow: 0, size: 10 }),
  wsFruit("ws-02", "Craterspine", { color: "violet", shape: "star", texture: "spiky", environment: "crater", seeds: 2, sweetness: 3, glow: 4, size: 5 }),
  wsFruit("ws-03", "Sandplum", { color: "amber", shape: "oval", texture: "bumpy", environment: "dune", seeds: 4, sweetness: 7, glow: 1, size: 8 }),
  wsFruit("ws-04", "Deepcoil", { color: "azure", shape: "spiral", texture: "bumpy", environment: "cavern", seeds: 1, sweetness: 2, glow: 5, size: 4 }),
  wsFruit("ws-05", "Tidefruit", { color: "teal", shape: "round", texture: "fuzzy", environment: "reef", seeds: 8, sweetness: 9, glow: 0, size: 12 }),
  // Exact duplicate of ws-05 (every feature identical, different id).
  wsFruit("ws-06", "Tidefruit (copy)", { color: "teal", shape: "round", texture: "fuzzy", environment: "reef", seeds: 8, sweetness: 9, glow: 0, size: 12 }),
  wsFruit("ws-07", "Palestar", { color: "violet", shape: "star", texture: "smooth", environment: "crater", seeds: 1, sweetness: 4, glow: 3, size: 6 }),
  wsFruit("ws-08", "Softamber", { color: "amber", shape: "round", texture: "fuzzy", environment: "canopy", seeds: 3, sweetness: 7, glow: 2, size: 7 }),
  // Missing sweetness (an incomplete example).
  wsFruit("ws-09", "Rosedrop", { color: "crimson", shape: "oval", texture: "smooth", environment: "dune", seeds: 5, sweetness: 8, glow: 1, size: 9 }, ["sweetness"]),
  wsFruit("ws-10", "Barbcone", { color: "azure", shape: "star", texture: "spiky", environment: "cavern", seeds: 3, sweetness: 2, glow: 2, size: 5 }),
  wsFruit("ws-11", "Spikecoil", { color: "violet", shape: "spiral", texture: "spiky", environment: "crater", seeds: 1, sweetness: 3, glow: 1, size: 4 }),
  // Missing texture (an incomplete example — and texture is one of the two features
  // that decides the label, so this one is genuinely hard to label).
  wsFruit("ws-12", "Dunedrop", { color: "amber", shape: "round", texture: "bumpy", environment: "dune", seeds: 3, sweetness: 7, glow: 1, size: 7 }, ["texture"]),
  wsFruit("ws-13", "Sweetreef", { color: "teal", shape: "oval", texture: "smooth", environment: "reef", seeds: 6, sweetness: 9, glow: 0, size: 10 }),
  // Same meaningful features as ws-01, different id (a "different id, identical
  // features" duplicate — distinct from the exact copy at ws-06).
  wsFruit("ws-14", "Dawnberry twin", { color: "crimson", shape: "round", texture: "smooth", environment: "canopy", seeds: 6, sweetness: 8, glow: 0, size: 10 }),
]

/* ========================================================================== */
/* Flawed dataset (Activity 4) — duplicates, wrong labels, imbalance           */
/* ========================================================================== */

/** Builds a flawed row with an explicit stored label (which may be wrong). */
function flaw(id: string, name: string, f: SpaceFruitFeatures, stored: SpaceFruitLabel): SpaceFruit {
  return { ...fruit(id, name, f), label: stored }
}

/**
 * A messy training set: heavily imbalanced toward "safe", with two duplicate rows
 * and four incorrect labels. The canonical test set stays held back and unseen.
 */
export const FLAWED_TRAINING: SpaceFruit[] = [
  // Correctly labeled safe fruits (the over-represented category).
  flaw("fl-01", "Dawnberry", { color: "crimson", shape: "round", texture: "smooth", environment: "canopy", seeds: 6, sweetness: 8, glow: 0, size: 10 }, "safe"),
  flaw("fl-02", "Sandplum", { color: "amber", shape: "oval", texture: "bumpy", environment: "dune", seeds: 4, sweetness: 7, glow: 1, size: 8 }, "safe"),
  flaw("fl-03", "Tidefruit", { color: "teal", shape: "round", texture: "fuzzy", environment: "reef", seeds: 8, sweetness: 9, glow: 0, size: 12 }, "safe"),
  flaw("fl-04", "Emberpear", { color: "crimson", shape: "oval", texture: "smooth", environment: "canopy", seeds: 5, sweetness: 6, glow: 2, size: 9 }, "safe"),
  flaw("fl-05", "Dunedrop", { color: "amber", shape: "round", texture: "bumpy", environment: "dune", seeds: 3, sweetness: 7, glow: 1, size: 7 }, "safe"),
  flaw("fl-06", "Canopyfig", { color: "teal", shape: "oval", texture: "fuzzy", environment: "canopy", seeds: 7, sweetness: 8, glow: 0, size: 11 }, "safe"),
  flaw("fl-07", "Redgourd", { color: "crimson", shape: "round", texture: "smooth", environment: "dune", seeds: 6, sweetness: 5, glow: 2, size: 10 }, "safe"),
  flaw("fl-08", "Reefplum", { color: "amber", shape: "oval", texture: "fuzzy", environment: "reef", seeds: 4, sweetness: 9, glow: 1, size: 8 }, "safe"),
  flaw("fl-09", "Greenpod", { color: "teal", shape: "round", texture: "bumpy", environment: "canopy", seeds: 9, sweetness: 6, glow: 0, size: 13 }, "safe"),
  flaw("fl-10", "Amberbud", { color: "amber", shape: "round", texture: "fuzzy", environment: "canopy", seeds: 2, sweetness: 7, glow: 2, size: 6 }, "safe"),
  // Correctly labeled not-safe fruits (too few of them — the imbalance).
  flaw("fl-11", "Starflare", { color: "violet", shape: "star", texture: "spiky", environment: "crater", seeds: 2, sweetness: 3, glow: 4, size: 5 }, "unsafe"),
  flaw("fl-12", "Glowcoil", { color: "azure", shape: "spiral", texture: "bumpy", environment: "cavern", seeds: 1, sweetness: 2, glow: 5, size: 4 }, "unsafe"),
  // Duplicate rows (same features as an earlier row).
  flaw("fl-13", "Dawnberry (copy)", { color: "crimson", shape: "round", texture: "smooth", environment: "canopy", seeds: 6, sweetness: 8, glow: 0, size: 10 }, "safe"),
  flaw("fl-14", "Starflare (copy)", { color: "violet", shape: "star", texture: "spiky", environment: "crater", seeds: 2, sweetness: 3, glow: 4, size: 5 }, "unsafe"),
  // Incorrect labels: truly not-safe fruits mislabeled "safe".
  flaw("fl-15", "Voidstar", { color: "violet", shape: "spiral", texture: "smooth", environment: "crater", seeds: 0, sweetness: 3, glow: 5, size: 5 }, "safe"),
  flaw("fl-16", "Thornstar", { color: "azure", shape: "star", texture: "spiky", environment: "cavern", seeds: 3, sweetness: 2, glow: 2, size: 5 }, "safe"),
  flaw("fl-17", "Cavernglow", { color: "azure", shape: "star", texture: "bumpy", environment: "cavern", seeds: 2, sweetness: 1, glow: 4, size: 7 }, "safe"),
  // Incorrect label: a truly safe fruit mislabeled "not safe".
  flaw("fl-18", "Sweetreef", { color: "teal", shape: "oval", texture: "smooth", environment: "reef", seeds: 6, sweetness: 9, glow: 0, size: 10 }, "unsafe"),
]

/**
 * Extra correct examples the student can ADD to the flawed set to improve balance
 * (mostly not-safe fruits, the under-represented category). Not in the test set.
 */
export const REPAIR_POOL: SpaceFruit[] = [
  flaw("pool-01", "Sparkstar", { color: "violet", shape: "star", texture: "smooth", environment: "crater", seeds: 1, sweetness: 4, glow: 3, size: 6 }, "unsafe"),
  flaw("pool-02", "Coilspine", { color: "azure", shape: "spiral", texture: "spiky", environment: "cavern", seeds: 2, sweetness: 2, glow: 1, size: 4 }, "unsafe"),
  flaw("pool-03", "Brightcoil", { color: "azure", shape: "spiral", texture: "bumpy", environment: "cavern", seeds: 1, sweetness: 1, glow: 4, size: 5 }, "unsafe"),
  flaw("pool-04", "Thornflare", { color: "violet", shape: "star", texture: "spiky", environment: "crater", seeds: 3, sweetness: 3, glow: 2, size: 6 }, "unsafe"),
  flaw("pool-05", "Duskstar", { color: "violet", shape: "star", texture: "fuzzy", environment: "crater", seeds: 0, sweetness: 4, glow: 3, size: 5 }, "unsafe"),
  flaw("pool-06", "Nightcoil", { color: "azure", shape: "spiral", texture: "spiky", environment: "cavern", seeds: 2, sweetness: 2, glow: 2, size: 4 }, "unsafe"),
  flaw("pool-07", "Meadowfig", { color: "teal", shape: "oval", texture: "fuzzy", environment: "canopy", seeds: 7, sweetness: 8, glow: 1, size: 11 }, "safe"),
  flaw("pool-08", "Sunplum", { color: "amber", shape: "oval", texture: "smooth", environment: "dune", seeds: 4, sweetness: 8, glow: 2, size: 9 }, "safe"),
]

/* ========================================================================== */
/* Duplicate, missing, and incorrect-label detection                          */
/* ========================================================================== */

/** Stable signature of the meaningful features (ignores id, name, and label). */
export function featureSignature(f: SpaceFruitFeatures): string {
  return [f.color, f.shape, f.texture, f.environment, f.seeds, f.sweetness, f.glow, f.size].join("|")
}

export type DuplicateGroup = { signature: string; ids: string[] }

/**
 * Deterministic duplicate detection: groups examples whose MEANINGFUL FEATURES are
 * identical, even when their ids (or names) differ. Only groups with more than one
 * member are returned, in first-appearance order. Incomplete examples (with a
 * missing feature) are never treated as duplicates, because a missing value means
 * we cannot be sure two rows truly match.
 */
export function findDuplicateGroups(examples: SpaceFruit[]): DuplicateGroup[] {
  const bySig = new Map<string, string[]>()
  const order: string[] = []
  for (const ex of examples) {
    if (ex.incomplete && ex.incomplete.length > 0) continue
    const sig = featureSignature(ex.features)
    if (!bySig.has(sig)) {
      bySig.set(sig, [])
      order.push(sig)
    }
    bySig.get(sig)!.push(ex.id)
  }
  return order.filter((sig) => bySig.get(sig)!.length > 1).map((sig) => ({ signature: sig, ids: bySig.get(sig)! }))
}

/** Ids of every example that is one of several sharing identical features. */
export function duplicateIds(examples: SpaceFruit[]): Set<string> {
  const ids = new Set<string>()
  for (const g of findDuplicateGroups(examples)) for (const id of g.ids) ids.add(id)
  return ids
}

/** Total number of EXTRA duplicate rows (rows beyond the first in each group). */
export function extraDuplicateCount(examples: SpaceFruit[]): number {
  return findDuplicateGroups(examples).reduce((n, g) => n + g.ids.length - 1, 0)
}

/** Ids with at least one missing feature value. */
export function incompleteIds(examples: SpaceFruit[]): Set<string> {
  return new Set(examples.filter((e) => e.incomplete && e.incomplete.length > 0).map((e) => e.id))
}

/**
 * Ids whose STORED label disagrees with the canonical (correct) label. Because
 * this is a fictional teaching dataset, "incorrect" means "does not match the
 * lesson's answer key" — not a claim about the real world. Incomplete examples are
 * skipped (we can't judge a label without the deciding feature).
 */
export function incorrectLabelIds(examples: SpaceFruit[]): Set<string> {
  return new Set(
    examples
      .filter((e) => e.label != null && (!e.incomplete || e.incomplete.length === 0) && e.label !== e.canonicalLabel)
      .map((e) => e.id),
  )
}

/* ========================================================================== */
/* Counts                                                                      */
/* ========================================================================== */

/** Counts by label. `useCanonical` counts the correct label; otherwise the stored
 *  label (unlabeled rows are counted under "unlabeled"). */
export function labelCounts(
  examples: SpaceFruit[],
  useCanonical = false,
): { safe: number; unsafe: number; unlabeled: number } {
  const out = { safe: 0, unsafe: 0, unlabeled: 0 }
  for (const ex of examples) {
    const l = useCanonical ? ex.canonicalLabel : ex.label
    if (l === "safe") out.safe++
    else if (l === "unsafe") out.unsafe++
    else out.unlabeled++
  }
  return out
}

/** Counts of each value of a categorical feature (for "count by feature"). */
export function featureValueCounts(examples: SpaceFruit[], key: FeatureKey): { value: string; count: number }[] {
  const meta = featureMeta(key)
  if (meta.type !== "category") return []
  return meta.options.map((value) => ({
    value,
    count: examples.filter((e) => String(e.features[key]) === value).length,
  }))
}

/** How balanced the two categories are, 0 (all one class) … 1 (perfectly even). */
export function balanceRatio(examples: SpaceFruit[], useCanonical = false): number {
  const c = labelCounts(examples, useCanonical)
  const total = c.safe + c.unsafe
  if (total === 0) return 0
  return Math.min(c.safe, c.unsafe) / Math.max(c.safe, c.unsafe || 1)
}

/* ========================================================================== */
/* Deterministic model — k-nearest neighbors over encoded features             */
/* ========================================================================== */

/** Per-feature distance in [0,1]. Categorical: 0 if equal, 1 if different.
 *  Numeric: absolute difference scaled by the feature's range. */
function featureDistance(key: FeatureKey, a: SpaceFruitFeatures, b: SpaceFruitFeatures): number {
  const meta = featureMeta(key)
  if (meta.type === "category") return a[key] === b[key] ? 0 : 1
  const range = meta.max - meta.min || 1
  return Math.abs((a[key] as number) - (b[key] as number)) / range
}

/**
 * Total distance between two fruits: the sum of the eight per-feature distances
 * (range 0–8). Smaller = more similar. Fully transparent and deterministic — the
 * same two fruits always give the same distance.
 */
export function distance(a: SpaceFruitFeatures, b: SpaceFruitFeatures): number {
  let d = 0
  for (const meta of SPACE_FRUIT_FEATURES) d += featureDistance(meta.key, a, b)
  return d
}

export type Neighbor = { fruit: SpaceFruit; distance: number; label: SpaceFruitLabel }

/** The label a training example votes with: its stored label, or (if none) the
 *  canonical label. This is what makes wrong labels actually mislead the model. */
export function votingLabel(ex: SpaceFruit): SpaceFruitLabel {
  return ex.label ?? ex.canonicalLabel
}

/**
 * The k nearest training examples to a target, sorted by distance ascending and
 * then by id ascending (a deterministic, explainable tie-break).
 */
export function kNearest(training: SpaceFruit[], target: SpaceFruitFeatures, k: number): Neighbor[] {
  return training
    .map((ex) => ({ fruit: ex, distance: distance(target, ex.features), label: votingLabel(ex) }))
    .sort((a, b) => a.distance - b.distance || a.fruit.id.localeCompare(b.fruit.id))
    .slice(0, Math.max(1, k))
}

export type Prediction = {
  label: SpaceFruitLabel
  neighbors: Neighbor[]
  safeVotes: number
  unsafeVotes: number
  explanation: string
}

/**
 * Predicts a label by majority vote of the k nearest neighbors. Deterministic:
 * with an odd k over two classes there is never a vote tie, and neighbor ties are
 * already broken by id. Produces an age-appropriate explanation naming the actual
 * neighbors that decided the vote.
 */
export function predict(training: SpaceFruit[], target: SpaceFruitFeatures, k: number): Prediction {
  const neighbors = kNearest(training, target, k)
  const unsafeVotes = neighbors.filter((n) => n.label === "unsafe").length
  const safeVotes = neighbors.length - unsafeVotes
  const label: SpaceFruitLabel = unsafeVotes > safeVotes ? "unsafe" : "safe"
  const names = neighbors.map((n) => `${n.fruit.name} (${labelText(n.label)})`).join(", ")
  const explanation = `The ${neighbors.length} most similar training fruits were: ${names}. ${
    unsafeVotes > safeVotes ? unsafeVotes : safeVotes
  } of ${neighbors.length} were "${labelText(label)}", so the model predicts ${labelText(label)}.`
  return { label, neighbors, safeVotes, unsafeVotes, explanation }
}

export type TestResult = {
  fruit: SpaceFruit
  predicted: SpaceFruitLabel
  actual: SpaceFruitLabel
  correct: boolean
  prediction: Prediction
}

export type CategoryScore = { correct: number; total: number }

export type ModelRun = {
  k: number
  results: TestResult[]
  correct: number
  total: number
  /** Overall accuracy in [0,1]; 0 when the test set is empty. */
  accuracy: number
  perCategory: Record<SpaceFruitLabel, CategoryScore>
}

/**
 * Runs the model over a test set. The test fruit's ACTUAL label is always its
 * canonical (correct) label — test data is never mislabeled. Deterministic.
 */
export function runModel(training: SpaceFruit[], test: SpaceFruit[], k = 3): ModelRun {
  const perCategory: Record<SpaceFruitLabel, CategoryScore> = {
    safe: { correct: 0, total: 0 },
    unsafe: { correct: 0, total: 0 },
  }
  const results: TestResult[] = test.map((ex) => {
    const prediction = training.length === 0 ? null : predict(training, ex.features, k)
    const predicted: SpaceFruitLabel = prediction ? prediction.label : "safe"
    const actual = ex.canonicalLabel
    const correct = prediction != null && predicted === actual
    perCategory[actual].total++
    if (correct) perCategory[actual].correct++
    return {
      fruit: ex,
      predicted,
      actual,
      correct,
      prediction:
        prediction ?? { label: predicted, neighbors: [], safeVotes: 0, unsafeVotes: 0, explanation: "No training data — the model cannot make a real prediction." },
    }
  })
  const correct = results.filter((r) => r.correct).length
  const total = results.length
  return { k, results, correct, total, accuracy: total === 0 ? 0 : correct / total, perCategory }
}

/** accuracy as a rounded percentage, for display. */
export function accuracyPercent(run: ModelRun): number {
  return Math.round(run.accuracy * 100)
}

/* ========================================================================== */
/* Train / test split validation                                              */
/* ========================================================================== */

export type SplitAssignment = Record<string, "train" | "test">

export type SplitValidation = {
  ok: boolean
  /** Blocking problems that make the test meaningless. */
  errors: string[]
  /** Non-blocking cautions. */
  warnings: string[]
}

/**
 * Validates a train/test split against the classroom rules: the test set must not
 * be empty, must not be too small, must not contain only one category, and no
 * example may sit in both sets. Deterministic.
 */
export function validateSplit(training: SpaceFruit[], test: SpaceFruit[]): SplitValidation {
  const errors: string[] = []
  const warnings: string[] = []

  const trainIds = new Set(training.map((e) => e.id))
  const overlap = test.filter((e) => trainIds.has(e.id))
  if (overlap.length > 0) errors.push(`${overlap.length} example(s) are in BOTH training and testing — a fruit must be in only one set.`)

  if (test.length === 0) {
    errors.push("The testing set is empty. Hold back some examples so the model can be checked on unseen fruit.")
  } else if (test.length < 3) {
    warnings.push(`Only ${test.length} testing example(s). A tiny test set gives an unreliable accuracy — hold back a few more.`)
  }

  if (training.length === 0) errors.push("The training set is empty. The model has nothing to learn from.")

  const testCounts = labelCounts(test, true)
  if (test.length > 0 && (testCounts.safe === 0 || testCounts.unsafe === 0)) {
    warnings.push("The testing set has only one category. Include both Safe and Not-safe fruit so the test really checks the model.")
  }

  const trainCounts = labelCounts(training, true)
  if (training.length > 0 && (trainCounts.safe === 0 || trainCounts.unsafe === 0)) {
    warnings.push("The training set has only one category. The model can only ever predict that one label.")
  }

  return { ok: errors.length === 0, errors, warnings }
}

/* ========================================================================== */
/* Experiment conditions (Activity 3 — Change the Data)                        */
/* ========================================================================== */

export type ExperimentId = "balanced" | "unbalanced" | "incorrect"

export type Experiment = {
  id: ExperimentId
  label: string
  description: string
  /** Builds the training set for this condition from the canonical pool. */
  buildTraining: () => SpaceFruit[]
}

/** Unbalanced: keep every safe fruit but only two not-safe fruits. */
function buildUnbalanced(): SpaceFruit[] {
  const safe = CANONICAL_TRAINING.filter((e) => e.canonicalLabel === "safe")
  const unsafe = CANONICAL_TRAINING.filter((e) => e.canonicalLabel === "unsafe").slice(0, 2)
  return [...safe, ...unsafe]
}

/** Incorrect: flip the stored label on several examples near the test fruit. */
const INCORRECT_FLIP_IDS = new Set(["tr-16", "tr-17", "tr-22", "tr-15", "tr-01"])
function buildIncorrect(): SpaceFruit[] {
  return CANONICAL_TRAINING.map((e) =>
    INCORRECT_FLIP_IDS.has(e.id)
      ? { ...e, label: e.canonicalLabel === "safe" ? ("unsafe" as const) : ("safe" as const) }
      : e,
  )
}

export const EXPERIMENTS: Experiment[] = [
  {
    id: "balanced",
    label: "A · Balanced, correct data",
    description: "All 24 examples, evenly split between Safe and Not-safe, every label correct. This is the fair starting point.",
    buildTraining: () => CANONICAL_TRAINING,
  },
  {
    id: "unbalanced",
    label: "B · Unbalanced data",
    description: "Every Safe example but only 2 Not-safe examples, so the model barely sees the Not-safe category.",
    buildTraining: buildUnbalanced,
  },
  {
    id: "incorrect",
    label: "C · Data with incorrect labels",
    description: "The same 24 examples, but 5 of them have their labels flipped to the wrong answer.",
    buildTraining: buildIncorrect,
  },
]

export function getExperiment(id: string): Experiment | undefined {
  return EXPERIMENTS.find((e) => e.id === id)
}

/** Runs an experiment against the canonical (held-back) test set. */
export function runExperiment(id: ExperimentId, k = 3): ModelRun {
  const exp = getExperiment(id)
  return runModel(exp ? exp.buildTraining() : CANONICAL_TRAINING, CANONICAL_TEST, k)
}

/* ========================================================================== */
/* Dataset statistics + before/after comparison (Activity 4)                   */
/* ========================================================================== */

export type DatasetStats = {
  size: number
  labelCounts: { safe: number; unsafe: number; unlabeled: number }
  duplicateCount: number
  incorrectCount: number
}

export function datasetStats(examples: SpaceFruit[]): DatasetStats {
  return {
    size: examples.length,
    labelCounts: labelCounts(examples, false),
    duplicateCount: extraDuplicateCount(examples),
    incorrectCount: incorrectLabelIds(examples).size,
  }
}

export type ComparisonRow = {
  metric: string
  before: string
  after: string
  improved: boolean | null
}

/**
 * Before/after comparison for the repair activity. Compares dataset health and a
 * fresh model run (against the held-back canonical test set) for the flawed and
 * repaired training sets.
 */
export function repairComparison(before: SpaceFruit[], after: SpaceFruit[], k = 3): {
  beforeStats: DatasetStats
  afterStats: DatasetStats
  beforeRun: ModelRun
  afterRun: ModelRun
  rows: ComparisonRow[]
} {
  const beforeStats = datasetStats(before)
  const afterStats = datasetStats(after)
  const beforeRun = runModel(before, CANONICAL_TEST, k)
  const afterRun = runModel(after, CANONICAL_TEST, k)

  const rows: ComparisonRow[] = [
    { metric: "Dataset size", before: `${beforeStats.size}`, after: `${afterStats.size}`, improved: null },
    {
      metric: "Safe / Not-safe counts",
      before: `${beforeStats.labelCounts.safe} / ${beforeStats.labelCounts.unsafe}`,
      after: `${afterStats.labelCounts.safe} / ${afterStats.labelCounts.unsafe}`,
      improved: balanceRatio(after) > balanceRatio(before),
    },
    { metric: "Duplicate rows", before: `${beforeStats.duplicateCount}`, after: `${afterStats.duplicateCount}`, improved: afterStats.duplicateCount < beforeStats.duplicateCount },
    { metric: "Incorrect labels", before: `${beforeStats.incorrectCount}`, after: `${afterStats.incorrectCount}`, improved: afterStats.incorrectCount < beforeStats.incorrectCount },
    { metric: "Overall accuracy", before: `${accuracyPercent(beforeRun)}%`, after: `${accuracyPercent(afterRun)}%`, improved: afterRun.accuracy > beforeRun.accuracy },
    {
      metric: "Not-safe accuracy",
      before: categoryPercentText(beforeRun, "unsafe"),
      after: categoryPercentText(afterRun, "unsafe"),
      improved: categoryAccuracy(afterRun, "unsafe") > categoryAccuracy(beforeRun, "unsafe"),
    },
  ]

  return { beforeStats, afterStats, beforeRun, afterRun, rows }
}

export function categoryAccuracy(run: ModelRun, label: SpaceFruitLabel): number {
  const c = run.perCategory[label]
  return c.total === 0 ? 0 : c.correct / c.total
}

export function categoryPercentText(run: ModelRun, label: SpaceFruitLabel): string {
  const c = run.perCategory[label]
  if (c.total === 0) return "—"
  return `${Math.round((c.correct / c.total) * 100)}% (${c.correct}/${c.total})`
}
