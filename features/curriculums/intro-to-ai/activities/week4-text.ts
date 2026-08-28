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

import { translations, type Translations } from "../../../../i18n/translations.ts"

/* ========================================================================== */
/* Curated corpus (safe, age-appropriate)                                      */
/* ========================================================================== */

/**
 * Short sentences chosen so that context genuinely changes the prediction (e.g.
 * "storm" vs "parade"). Repetition is intentional — it weights the counts so the
 * probabilities are interesting but still hand-checkable.
 */
export type Week4TextStrings = Translations["courseUi"]["ai"]["week4Text"]

const EN: Week4TextStrings = translations.en.courseUi.ai.week4Text

/**
 * The corpus in the reader's language. Chinese is written with spaces between
 * words because the model tokenizes on whitespace; the counts and the back-off
 * logic are identical in every language.
 */
export const corpus = (S: Week4TextStrings = EN): string[] => [...S.corpus]

/** The English base, kept for tests and for callers that pass no strings. */
export const CORPUS: string[] = corpus()

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

/** The n-gram model for one language, built from that language's corpus. */
export function modelFor(S: Week4TextStrings = EN): TextModel {
  return buildModel(corpus(S))
}

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
export function predictNext(context: string, model: TextModel = DEFAULT_MODEL, k = 4, S: Week4TextStrings = EN): PredictionResult {
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
  return { level: predictions.length ? "unigram" : "none", contextUsed: S.noMatchContext, total, predictions }
}

export function explainPrediction(result: PredictionResult, S: Week4TextStrings = EN): string {
  if (result.level === "trigram") return S.explainTrigram.replace("{context}", result.contextUsed)
  if (result.level === "bigram") return S.explainBigram.replace("{context}", result.contextUsed)
  if (result.level === "unigram") return S.explainUnigram
  return S.explainNone
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

export const promptPresets = (S: Week4TextStrings = EN): PromptPreset[] => [
  {
    id: "left",
    template: S.presetLeftTemplate,
    themes: [S.presetLeftTheme1, S.presetLeftTheme2, S.presetLeftTheme3],
    display: S.presetLeftDisplay,
  },
  { id: "lookedat", template: S.presetLookedTemplate, themes: [], display: S.presetLookedDisplay },
  { id: "subject", template: S.presetSubjectTemplate, themes: [], display: S.presetSubjectDisplay },
]

/** The English base, for callers that pass no strings. */
export const PROMPT_PRESETS: PromptPreset[] = promptPresets()

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

export const fluencyCards = (S: Week4TextStrings = EN): FluencyCard[] => [
  {
    id: "fc-mars",
    prompt: S.fc1Prompt,
    continuation: S.fc1Continuation,
    isTrue: false,
    claimType: "date",
    why: S.fc1Why,
    howToVerify: S.fc1Verify,
  },
  {
    id: "fc-quote",
    prompt: S.fc2Prompt,
    continuation: S.fc2Continuation,
    isTrue: false,
    claimType: "quote",
    why: S.fc2Why,
    howToVerify: S.fc2Verify,
  },
  {
    id: "fc-jupiter",
    prompt: S.fc3Prompt,
    continuation: S.fc3Continuation,
    isTrue: true,
    claimType: "fact",
    why: S.fc3Why,
    howToVerify: S.fc3Verify,
  },
]

/** The English base, for callers that pass no strings. */
export const FLUENCY_CARDS: FluencyCard[] = fluencyCards()
