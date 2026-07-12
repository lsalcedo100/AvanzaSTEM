/**
 * Week 4 — Recommendation-System Builder engine (framework-free, deterministic).
 *
 * A transparent, content-based recommender over a fictional local catalog. There
 * is NO external service and NO personal data. It builds a preference profile from
 * the items a student rates, scores each other item by weighted feature similarity,
 * and — crucially — produces a plain-language explanation and per-feature
 * contribution list for EVERY recommendation. The same inputs always rank the same
 * way. It also supports a filter-bubble experiment and an "explore" option.
 */

/* ========================================================================== */
/* Catalog                                                                     */
/* ========================================================================== */

export type FeatureKey = "category" | "topic" | "difficulty" | "length" | "format" | "ageRange"

export const FEATURES: { key: FeatureKey; label: string }[] = [
  { key: "topic", label: "Topic" },
  { key: "category", label: "Type" },
  { key: "difficulty", label: "Difficulty" },
  { key: "length", label: "Length" },
  { key: "format", label: "Format" },
  { key: "ageRange", label: "Age range" },
]

export type Item = {
  id: string
  title: string
  description: string
  category: "activity" | "book" | "game" | "exhibit"
  topic: "space" | "robots" | "animals" | "art" | "weather" | "math"
  difficulty: "beginner" | "intermediate" | "advanced"
  length: "short" | "medium" | "long"
  format: "hands-on" | "reading" | "video" | "interactive"
  ageRange: "8-10" | "10-12" | "11-13"
  /** Fictional popularity, 1–100 (a made-up number, not real analytics). */
  popularity: number
}

export const CATALOG: Item[] = [
  { id: "it-01", title: "Build a Cardboard Rover", description: "Make a model Mars rover from cardboard.", category: "activity", topic: "space", difficulty: "beginner", length: "medium", format: "hands-on", ageRange: "8-10", popularity: 82 },
  { id: "it-02", title: "Planets Picture Book", description: "A friendly tour of the solar system.", category: "book", topic: "space", difficulty: "beginner", length: "short", format: "reading", ageRange: "8-10", popularity: 74 },
  { id: "it-03", title: "Rocket Math Puzzles", description: "Space-themed number puzzles.", category: "game", topic: "space", difficulty: "intermediate", length: "medium", format: "interactive", ageRange: "10-12", popularity: 61 },
  { id: "it-04", title: "Design a Simple Robot", description: "Plan a robot on paper and label its parts.", category: "activity", topic: "robots", difficulty: "beginner", length: "medium", format: "hands-on", ageRange: "8-10", popularity: 88 },
  { id: "it-05", title: "How Robots Move", description: "A short video on motors and wheels.", category: "activity", topic: "robots", difficulty: "intermediate", length: "short", format: "video", ageRange: "10-12", popularity: 70 },
  { id: "it-06", title: "Robot Logic Game", description: "Guide a robot through a maze with commands.", category: "game", topic: "robots", difficulty: "advanced", length: "long", format: "interactive", ageRange: "11-13", popularity: 66 },
  { id: "it-07", title: "Animal Habitats Book", description: "Where different animals live and why.", category: "book", topic: "animals", difficulty: "beginner", length: "medium", format: "reading", ageRange: "8-10", popularity: 79 },
  { id: "it-08", title: "Build a Bug Hotel", description: "A hands-on activity for a garden.", category: "activity", topic: "animals", difficulty: "beginner", length: "long", format: "hands-on", ageRange: "8-10", popularity: 72 },
  { id: "it-09", title: "Animal Sorting Game", description: "Group animals by their features.", category: "game", topic: "animals", difficulty: "intermediate", length: "short", format: "interactive", ageRange: "10-12", popularity: 58 },
  { id: "it-10", title: "Paint the Night Sky", description: "An art activity mixing colors for a starry scene.", category: "activity", topic: "art", difficulty: "beginner", length: "medium", format: "hands-on", ageRange: "8-10", popularity: 64 },
  { id: "it-11", title: "Famous Paintings Book", description: "Stories behind well-known paintings.", category: "book", topic: "art", difficulty: "intermediate", length: "medium", format: "reading", ageRange: "10-12", popularity: 55 },
  { id: "it-12", title: "Museum Art Exhibit", description: "A virtual walk through an art gallery.", category: "exhibit", topic: "art", difficulty: "beginner", length: "short", format: "video", ageRange: "11-13", popularity: 60 },
  { id: "it-13", title: "Make a Cloud in a Jar", description: "A weather experiment you can do at home.", category: "activity", topic: "weather", difficulty: "intermediate", length: "short", format: "hands-on", ageRange: "10-12", popularity: 77 },
  { id: "it-14", title: "Weather Watching Log", description: "Record and predict the weather for a week.", category: "activity", topic: "weather", difficulty: "beginner", length: "long", format: "reading", ageRange: "8-10", popularity: 52 },
  { id: "it-15", title: "Storm Chasers Exhibit", description: "A video exhibit on how storms form.", category: "exhibit", topic: "weather", difficulty: "advanced", length: "medium", format: "video", ageRange: "11-13", popularity: 68 },
  { id: "it-16", title: "Shape Patterns Game", description: "Spot and extend geometric patterns.", category: "game", topic: "math", difficulty: "beginner", length: "short", format: "interactive", ageRange: "8-10", popularity: 71 },
  { id: "it-17", title: "Math Magic Book", description: "Number tricks and why they work.", category: "book", topic: "math", difficulty: "intermediate", length: "medium", format: "reading", ageRange: "10-12", popularity: 63 },
  { id: "it-18", title: "Build a Number Machine", description: "A hands-on activity about inputs and outputs.", category: "activity", topic: "math", difficulty: "advanced", length: "long", format: "hands-on", ageRange: "11-13", popularity: 59 },
  { id: "it-19", title: "Space Station Exhibit", description: "A video tour of life on a space station.", category: "exhibit", topic: "space", difficulty: "intermediate", length: "medium", format: "video", ageRange: "10-12", popularity: 75 },
  { id: "it-20", title: "Robot Arm Book", description: "How robot arms grab and move things.", category: "book", topic: "robots", difficulty: "intermediate", length: "medium", format: "reading", ageRange: "10-12", popularity: 62 },
  { id: "it-21", title: "Ocean Animals Exhibit", description: "A video exhibit of deep-sea creatures.", category: "exhibit", topic: "animals", difficulty: "beginner", length: "short", format: "video", ageRange: "8-10", popularity: 69 },
  { id: "it-22", title: "Color Mixing Game", description: "An interactive game about mixing paint colors.", category: "game", topic: "art", difficulty: "beginner", length: "short", format: "interactive", ageRange: "8-10", popularity: 57 },
  { id: "it-23", title: "Make a Rain Gauge", description: "Build a simple tool to measure rainfall.", category: "activity", topic: "weather", difficulty: "beginner", length: "medium", format: "hands-on", ageRange: "8-10", popularity: 66 },
  { id: "it-24", title: "Times Table Game", description: "Practice multiplication with a quick game.", category: "game", topic: "math", difficulty: "beginner", length: "short", format: "interactive", ageRange: "8-10", popularity: 73 },
]

export function getItem(id: string): Item | undefined {
  return CATALOG.find((i) => i.id === id)
}

export const TOPICS = ["space", "robots", "animals", "art", "weather", "math"] as const

/* ========================================================================== */
/* Profile + scoring                                                           */
/* ========================================================================== */

export type Ratings = Record<string, number> // itemId -> 1..5
export type Weights = Record<FeatureKey, number> // 0..3

export function defaultWeights(): Weights {
  // Topic is weighted above the other features combined by default, so "like a
  // topic → see more of it" is the decisive signal and the filter bubble is clear.
  // Students can lower this weight in the activity to loosen the bubble.
  return { topic: 6, category: 1, difficulty: 1, length: 1, format: 1, ageRange: 1 }
}

/** Preference per feature value = sum of (rating-3) over rated items. */
export type Profile = Record<FeatureKey, Record<string, number>>

export function buildProfile(ratings: Ratings): Profile {
  const profile = { category: {}, topic: {}, difficulty: {}, length: {}, format: {}, ageRange: {} } as Profile
  for (const [itemId, rating] of Object.entries(ratings)) {
    const item = getItem(itemId)
    if (!item) continue
    const weight = rating - 3 // 4,5 positive; 1,2 negative; 3 neutral
    for (const { key } of FEATURES) {
      const value = item[key] as string
      profile[key][value] = (profile[key][value] ?? 0) + weight
    }
  }
  return profile
}

/** Normalized preference in [-1,1] for a feature value (divided by the feature's max magnitude). */
function normalizedPref(profile: Profile, key: FeatureKey, value: string): number {
  const vals = Object.values(profile[key])
  const maxMag = Math.max(1, ...vals.map((v) => Math.abs(v)))
  return (profile[key][value] ?? 0) / maxMag
}

export type Contribution = { feature: FeatureKey; label: string; value: string; weight: number; pref: number; contribution: number }

export type Recommendation = {
  item: Item
  score: number
  contributions: Contribution[]
  positives: Contribution[]
  reducers: Contribution[]
  reasons: string[]
}

export type RecommendResult = {
  recommendations: Recommendation[]
  lowData: boolean
  lowDataReason: string | null
  ratedCount: number
}

export type RecommendOptions = { explore?: boolean; topN?: number }

/**
 * Content-based recommendation. Every unrated item gets a score = Σ weight ×
 * normalized preference across features, with the per-feature contributions kept
 * so we can explain the ranking. Deterministic (ties break by popularity then id).
 */
export function recommend(ratings: Ratings, weights: Weights = defaultWeights(), options: RecommendOptions = {}): RecommendResult {
  const profile = buildProfile(ratings)
  const ratedIds = new Set(Object.keys(ratings))
  const ratedCount = ratedIds.size

  const raw = CATALOG.filter((item) => !ratedIds.has(item.id)).map((item) => {
    const contributions: Contribution[] = FEATURES.map(({ key, label }) => {
      const value = item[key] as string
      const pref = normalizedPref(profile, key, value)
      const weight = weights[key] ?? 1
      return { feature: key, label, value, weight, pref, contribution: weight * pref }
    })
    const score = contributions.reduce((s, c) => s + c.contribution, 0)
    const positives = contributions.filter((c) => c.contribution > 0.001).sort((a, b) => b.contribution - a.contribution)
    const reducers = contributions.filter((c) => c.contribution < -0.001).sort((a, b) => a.contribution - b.contribution)
    return { item, score, contributions, positives, reducers, reasons: buildReasons(item, positives, reducers, ratings) }
  })

  raw.sort((a, b) => b.score - a.score || b.item.popularity - a.item.popularity || a.item.id.localeCompare(b.item.id))

  const topN = options.topN ?? 6
  const recommendations = options.explore ? diversify(raw, topN) : raw.slice(0, topN)

  let lowData = false
  let lowDataReason: string | null = null
  if (ratedCount < 2) {
    lowData = true
    lowDataReason = "Rate at least two items so the recommender has enough to learn from."
  } else {
    const likedTopics = new Set(
      Object.entries(ratings)
        .filter(([, r]) => r >= 4)
        .map(([id]) => getItem(id)?.topic)
        .filter(Boolean),
    )
    if (likedTopics.size <= 1) {
      lowData = true
      lowDataReason = "You've only liked one topic, so recommendations will be narrow. Rate something from another topic to widen them."
    }
  }

  return { recommendations, lowData, lowDataReason, ratedCount }
}

/** Greedy diversification: prefer high scores but avoid stacking one topic. */
export function diversify(sorted: Recommendation[], topN: number): Recommendation[] {
  const out: Recommendation[] = []
  const topicCount: Record<string, number> = {}
  const pool = [...sorted]
  while (out.length < topN && pool.length > 0) {
    // Pick the highest-scoring item whose topic is least represented so far.
    let bestIndex = 0
    let bestKey = Infinity
    pool.forEach((rec, i) => {
      const rank = topicCount[rec.item.topic] ?? 0
      const key = rank * 1000 - rec.score // fewer-of-topic first, then higher score
      if (key < bestKey) {
        bestKey = key
        bestIndex = i
      }
    })
    const [picked] = pool.splice(bestIndex, 1)
    topicCount[picked.item.topic] = (topicCount[picked.item.topic] ?? 0) + 1
    out.push(picked)
  }
  return out
}

function buildReasons(item: Item, positives: Contribution[], reducers: Contribution[], ratings: Ratings): string[] {
  const reasons: string[] = []
  for (const c of positives.slice(0, 3)) {
    const likedSame = Object.entries(ratings).filter(([id, r]) => r >= 4 && (getItem(id)?.[c.feature] as string) === c.value)
    const count = likedSame.length
    if (count > 0) {
      reasons.push(`You rated ${count} ${c.label.toLowerCase()} = “${c.value}” item${count === 1 ? "" : "s"} highly, and this one is also “${c.value}”.`)
    } else {
      reasons.push(`This matches your preferred ${c.label.toLowerCase()} “${c.value}”.`)
    }
  }
  if (reducers.length > 0) {
    const r = reducers[0]
    reasons.push(`Its ${r.label.toLowerCase()} “${r.value}” lowered the score, because you rated that kind lower.`)
  }
  if (reasons.length === 0) reasons.push("This appeared because there isn't enough rating information yet to prefer anything specific.")
  return reasons
}

/* ========================================================================== */
/* Filter-bubble analysis                                                       */
/* ========================================================================== */

export type TopicDistribution = { topic: string; count: number; share: number }

export function topicDistribution(recs: Recommendation[]): TopicDistribution[] {
  const counts: Record<string, number> = {}
  for (const r of recs) counts[r.item.topic] = (counts[r.item.topic] ?? 0) + 1
  const total = recs.length || 1
  return TOPICS.map((topic) => ({ topic, count: counts[topic] ?? 0, share: (counts[topic] ?? 0) / total })).filter((d) => d.count > 0).sort((a, b) => b.count - a.count)
}

/** How concentrated a feed is on its single most common topic (0..1). */
export function narrowness(recs: Recommendation[]): number {
  const dist = topicDistribution(recs)
  return dist.length === 0 ? 0 : dist[0].share
}

/** How many different topics appear in the feed — a simple variety measure. */
export function distinctTopics(recs: Recommendation[]): number {
  return new Set(recs.map((r) => r.item.topic)).size
}
