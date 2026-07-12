/**
 * Week 4 — Next-Text Prediction Lab engine (framework-free, deterministic).
 *
 * A small local n-gram model built from a curated, age-appropriate corpus. There
 * is NO external language model and NO network. Prediction is a real, transparent
 * count: given some context words, it looks up which words followed that context in
 * the corpus and reports their relative frequencies (a trigram model that backs off
 * to bigrams, then unigrams). The same context always gives the same result.
 *
 * The lab's whole point is that "likely" text is not "true" text: fluent, confident
 * continuations can still invent dates, quotes, or claims. This is a pattern model,
 * not human understanding.
 */

/* ========================================================================== */
/* Curated corpus (safe, age-appropriate)                                      */
/* ========================================================================== */

/**
 * Short sentences chosen so that context genuinely changes the prediction (e.g.
 * "storm" vs "parade"). Repetition is intentional — it weights the counts so the
 * probabilities are interesting but still hand-checkable.
 */
export const CORPUS: string[] = [
  // storm leftovers
  "the storm left puddles on the road",
  "the storm left puddles everywhere in town",
  "the storm left puddles near the school",
  "the storm left branches across the path",
  "the storm left branches on the grass",
  "the storm left water in the street",
  "the storm left mud on the steps",
  // parade leftovers
  "the parade left confetti on the road",
  "the parade left confetti all over town",
  "the parade left confetti near the school",
  "the parade left streamers on the fence",
  "the parade left streamers in the trees",
  "the parade left litter along the route",
  // party leftovers
  "the party left balloons on the floor",
  "the party left balloons by the door",
  "the party left crumbs on the table",
  "the party left a mess in the kitchen",
  // looking up
  "we looked at the sky above us",
  "we looked at the sky and clouds",
  "we looked at the stars at night",
  "we looked at the stars through a telescope",
  "we looked at the painting on the wall",
  // favorite subject
  "my favorite subject is science because it is fun",
  "my favorite subject is science and math",
  "my favorite subject is math because i like numbers",
  "my favorite subject is art because i like drawing",
  "my favorite subject is reading",
  // generic connective text so bigrams exist
  "the road was quiet in the morning",
  "the school was open in the morning",
  "the town was busy on the weekend",
]

/* ========================================================================== */
/* N-gram model                                                                */
/* ========================================================================== */

type CountMap = Map<string, number>

export type TextModel = {
  trigram: Map<string, CountMap> // key = "w1 w2" -> {w3: count}
  bigram: Map<string, CountMap> // key = "w1" -> {w2: count}
  unigram: CountMap
}

function bump(map: Map<string, CountMap>, key: string, word: string) {
  const inner = map.get(key) ?? new Map<string, number>()
  inner.set(word, (inner.get(word) ?? 0) + 1)
  map.set(key, inner)
}

export function buildModel(corpus: string[] = CORPUS): TextModel {
  const model: TextModel = { trigram: new Map(), bigram: new Map(), unigram: new Map() }
  for (const sentence of corpus) {
    const words = sentence.toLowerCase().split(/\s+/).filter(Boolean)
    for (let i = 0; i < words.length; i++) {
      model.unigram.set(words[i], (model.unigram.get(words[i]) ?? 0) + 1)
      if (i >= 1) bump(model.bigram, words[i - 1], words[i])
      if (i >= 2) bump(model.trigram, `${words[i - 2]} ${words[i - 1]}`, words[i])
    }
  }
  return model
}

export const DEFAULT_MODEL = buildModel()

export type Prediction = { word: string; count: number; probability: number }
export type PredictionResult = {
  level: "trigram" | "bigram" | "unigram" | "none"
  contextUsed: string
  total: number
  predictions: Prediction[]
}

function toPredictions(counts: CountMap, k: number): { total: number; predictions: Prediction[] } {
  const total = [...counts.values()].reduce((a, b) => a + b, 0)
  const predictions = [...counts.entries()]
    .map(([word, count]) => ({ word, count, probability: total === 0 ? 0 : count / total }))
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
    .slice(0, k)
  return { total, predictions }
}

/**
 * Predicts the likely next words for a context, backing off from trigram → bigram
 * → unigram so there is always an honest, deterministic answer. Reports which level
 * it used so the UI can explain "based on the last two words / one word".
 */
export function predictNext(context: string, model: TextModel = DEFAULT_MODEL, k = 4): PredictionResult {
  const words = context.toLowerCase().split(/\s+/).filter(Boolean)
  if (words.length >= 2) {
    const key = `${words[words.length - 2]} ${words[words.length - 1]}`
    const counts = model.trigram.get(key)
    if (counts && counts.size > 0) {
      const { total, predictions } = toPredictions(counts, k)
      return { level: "trigram", contextUsed: key, total, predictions }
    }
  }
  if (words.length >= 1) {
    const key = words[words.length - 1]
    const counts = model.bigram.get(key)
    if (counts && counts.size > 0) {
      const { total, predictions } = toPredictions(counts, k)
      return { level: "bigram", contextUsed: key, total, predictions }
    }
  }
  const { total, predictions } = toPredictions(model.unigram, k)
  return { level: predictions.length ? "unigram" : "none", contextUsed: "(no match — most common words overall)", total, predictions }
}

export function explainPrediction(result: PredictionResult): string {
  if (result.level === "trigram") return `Based on the last two words “${result.contextUsed}”, these words followed most often in the corpus.`
  if (result.level === "bigram") return `No exact match for two words, so the model backed off to the last word “${result.contextUsed}”.`
  if (result.level === "unigram") return "No match for the recent words, so the model fell back to the most common words overall."
  return "The corpus has nothing to predict from here."
}

/* ========================================================================== */
/* Preset prompts (with a swappable theme word)                                */
/* ========================================================================== */

export type PromptPreset = {
  id: string
  /** Context template with a {theme} slot, e.g. "the {theme} left". */
  template: string
  themes: string[]
  display: string // "The {theme} left ___"
}

export const PROMPT_PRESETS: PromptPreset[] = [
  { id: "left", template: "the {theme} left", themes: ["storm", "parade", "party"], display: "The {theme} left ___" },
  { id: "lookedat", template: "we looked at the", themes: [], display: "We looked at the ___" },
  { id: "subject", template: "my favorite subject is", themes: [], display: "My favorite subject is ___" },
]

export function fillTemplate(template: string, theme: string): string {
  return template.replace("{theme}", theme)
}

/* ========================================================================== */
/* Fluency-is-not-truth cards (authored, illustrative)                         */
/* ========================================================================== */

export type FluencyCard = {
  id: string
  prompt: string
  continuation: string
  isTrue: boolean
  claimType: "fact" | "date" | "quote"
  why: string
  howToVerify: string
}

export const FLUENCY_CARDS: FluencyCard[] = [
  {
    id: "fc-mars",
    prompt: "The first person to walk on Mars was",
    continuation: "Captain Alex Rivera, on July 3rd, 1997.",
    isTrue: false,
    claimType: "date",
    why: "This reads smoothly and even gives a name and a date — but no human has ever walked on Mars. A likely-sounding continuation can invent a confident detail.",
    howToVerify: "Check a trusted source like NASA: Mars has only been visited by robotic rovers, never by people.",
  },
  {
    id: "fc-quote",
    prompt: "As Albert Einstein famously said,",
    continuation: "“Never trust a fact you read on the internet.”",
    isTrue: false,
    claimType: "quote",
    why: "The sentence is fluent and attributes a neat quote to a famous person, but Einstein never said this — misattributed quotes are a common invented detail.",
    howToVerify: "Search a reputable quotation source; if it can't be traced to a real record, treat it as unverified.",
  },
  {
    id: "fc-jupiter",
    prompt: "The largest planet in our solar system is",
    continuation: "Jupiter.",
    isTrue: true,
    claimType: "fact",
    why: "This one is both fluent AND true — but you only know that by checking, not because it sounded confident.",
    howToVerify: "Any astronomy reference confirms Jupiter is the largest planet.",
  },
]
