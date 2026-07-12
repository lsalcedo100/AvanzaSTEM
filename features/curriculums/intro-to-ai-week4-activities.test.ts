import { test } from "node:test"
import assert from "node:assert/strict"

import {
  TEMPLATES,
  getTemplate,
  normalize,
  tokenize,
  matchesKeyword,
  respond,
  initialConvoState,
  validateChatbot,
  chatbotErrors,
  type ChatbotSpec,
} from "./intro-to-ai-week4-chatbot.ts"
import {
  buildModel,
  predictNext,
  explainPrediction,
  PROMPT_PRESETS,
  fillTemplate,
  FLUENCY_CARDS,
  DEFAULT_MODEL,
} from "./intro-to-ai-week4-text.ts"
import {
  CATALOG,
  getItem,
  recommend,
  buildProfile,
  defaultWeights,
  diversify,
  topicDistribution,
  narrowness,
  distinctTopics,
  type Ratings,
} from "./intro-to-ai-week4-recommend.ts"

/* ============================ Chatbot =================================== */

test("normalization handles punctuation and capitalization", () => {
  assert.equal(normalize("What ARE your Hours?!"), "what are your hours")
  assert.deepEqual(tokenize("Hi, there!!"), ["hi", "there"])
  assert.equal(matchesKeyword("When do you OPEN?", "open"), true)
  assert.equal(matchesKeyword("I need a library card.", "card"), true)
  assert.equal(matchesKeyword("just browsing", "open"), false)
})

test("multi-word keywords match as a phrase", () => {
  assert.equal(matchesKeyword("can I talk to a real person", "real person"), true)
  assert.equal(matchesKeyword("a person real", "real person"), false)
})

test("every template builds a valid chatbot with no errors", () => {
  assert.ok(TEMPLATES.length >= 5)
  for (const t of TEMPLATES) {
    const spec = t.build()
    assert.equal(chatbotErrors(spec).length, 0, `${t.id} should have no errors`)
    assert.ok(spec.intents.length >= 3)
    assert.ok(spec.fallback && spec.humanHelp && spec.privacyNote)
  }
})

test("respond matches intents deterministically and explains which keyword matched", () => {
  const spec = getTemplate("library")!.build()
  const r1 = respond(spec, initialConvoState, "what are your hours?")
  const r2 = respond(spec, initialConvoState, "what are your hours?")
  assert.deepEqual(r1.messages, r2.messages)
  assert.equal(r1.matchKind, "intent")
  assert.equal(r1.matchedId, "in-hours")
  assert.equal(r1.matchedKeyword, "hours")
  assert.match(r1.explanation, /hours/)
})

test("unmatched input falls back", () => {
  const spec = getTemplate("library")!.build()
  const r = respond(spec, initialConvoState, "do you sell pizza")
  assert.equal(r.matchKind, "fallback")
  assert.equal(r.usedFallback, true)
})

test("human-help and restart are matched before intents", () => {
  const spec = getTemplate("library")!.build()
  assert.equal(respond(spec, initialConvoState, "can I talk to a person").matchKind, "human-help")
  assert.equal(respond(spec, initialConvoState, "restart please").matchKind, "restart")
})

test("follow-up branches route the next message", () => {
  const spec = getTemplate("library")!.build()
  const first = respond(spec, initialConvoState, "I want to renew a book")
  assert.equal(first.matchedId, "in-renew")
  assert.equal(first.state.awaitingBranchIntentId, "in-renew")
  const second = respond(spec, first.state, "yes it is overdue")
  assert.equal(second.matchKind, "branch-option")
  assert.equal(second.matchedId, "op-yes")
  // An unrecognized branch answer falls back.
  const third = respond(spec, first.state, "purple")
  assert.equal(third.matchKind, "fallback")
})

test("validateChatbot detects missing fallback, dead ends, and unreachable nodes", () => {
  const spec = getTemplate("library")!.build()
  assert.equal(chatbotErrors(spec).length, 0)

  const noFallback: ChatbotSpec = { ...spec, fallback: "" }
  assert.ok(validateChatbot(noFallback).some((i) => i.level === "error" && /fallback/i.test(i.message)))

  const unreachable: ChatbotSpec = { ...spec, intents: [{ id: "x", name: "Ghost", keywords: [], response: "hi" }, ...spec.intents] }
  assert.ok(validateChatbot(unreachable).some((i) => /unreachable/i.test(i.message)))

  const deadEnd: ChatbotSpec = { ...spec, intents: [{ id: "y", name: "Empty", keywords: ["empty"], response: "" }, ...spec.intents] }
  assert.ok(validateChatbot(deadEnd).some((i) => /dead end/i.test(i.message)))

  const fewIntents: ChatbotSpec = { ...spec, intents: spec.intents.slice(0, 1) }
  assert.ok(validateChatbot(fewIntents).some((i) => /at least 3 intents/i.test(i.message)))
})

/* ============================ Next-text ================================= */

test("predictNext is deterministic and returns probabilities that sum to ~1", () => {
  const a = predictNext("the storm left")
  const b = predictNext("the storm left")
  assert.deepEqual(a.predictions, b.predictions)
  assert.equal(a.level, "trigram")
  const sum = a.predictions.reduce((s, p) => s + p.probability, 0)
  assert.ok(sum > 0.99 && sum <= 1.0001)
})

test("changing the context word changes the prediction (storm vs parade)", () => {
  const storm = predictNext("the storm left").predictions.map((p) => p.word)
  const parade = predictNext("the parade left").predictions.map((p) => p.word)
  assert.ok(storm.includes("puddles"))
  assert.ok(parade.includes("confetti"))
  assert.notDeepEqual(storm, parade)
})

test("adding context changes probabilities and back-off is explained", () => {
  const oneWord = predictNext("left")
  assert.equal(oneWord.level, "bigram")
  assert.match(explainPrediction(oneWord), /backed off|last word/i)
  const preset = PROMPT_PRESETS.find((p) => p.id === "left")!
  assert.equal(fillTemplate(preset.template, "party"), "the party left")
  assert.ok(predictNext("the party left").predictions.some((p) => p.word === "balloons"))
})

test("a fresh model built from the corpus matches the default model", () => {
  const m = buildModel()
  assert.deepEqual(predictNext("the storm left", m).predictions, predictNext("the storm left", DEFAULT_MODEL).predictions)
})

test("fluency cards include a fluent-but-false example with a verification path", () => {
  const falseCard = FLUENCY_CARDS.find((c) => !c.isTrue)
  assert.ok(falseCard && falseCard.howToVerify.length > 5 && falseCard.why.length > 5)
  assert.ok(FLUENCY_CARDS.some((c) => c.isTrue))
})

/* ============================ Recommender =============================== */

test("catalog has unique ids and full features", () => {
  const ids = CATALOG.map((i) => i.id)
  assert.equal(new Set(ids).size, ids.length)
  assert.ok(CATALOG.length >= 12)
  for (const i of CATALOG) assert.ok(i.topic && i.category && i.difficulty && i.length && i.format && i.ageRange)
})

test("recommendation scoring is deterministic and every rec has an explanation", () => {
  const ratings: Ratings = { "it-01": 5, "it-02": 5 } // two space items liked
  const a = recommend(ratings)
  const b = recommend(ratings)
  assert.deepEqual(a.recommendations.map((r) => r.item.id), b.recommendations.map((r) => r.item.id))
  for (const rec of a.recommendations) assert.ok(rec.reasons.length > 0, "every recommendation needs a reason")
  // A space item should rank near the top after liking space.
  assert.equal(a.recommendations[0].item.topic, "space")
})

test("explanations cite contributing features", () => {
  const ratings: Ratings = { "it-01": 5, "it-04": 5 } // space + robots hands-on beginner
  const top = recommend(ratings).recommendations[0]
  assert.ok(top.reasons.join(" ").length > 10)
  assert.ok(top.positives.length > 0)
})

test("changing a rating changes the recommendations", () => {
  const before = recommend({ "it-01": 5, "it-02": 5 }).recommendations.map((r) => r.item.id)
  const after = recommend({ "it-07": 5, "it-08": 5 }).recommendations.map((r) => r.item.id) // animals instead
  assert.notDeepEqual(before, after)
})

test("low-data warning fires with too few ratings or a single liked topic", () => {
  assert.equal(recommend({ "it-01": 5 }).lowData, true)
  assert.equal(recommend({ "it-01": 5, "it-02": 5 }).lowData, true) // both space
  assert.equal(recommend({ "it-01": 5, "it-07": 5 }).lowData, false) // space + animals
})

test("filter bubble: a liked topic leads the feed, and the explore option diversifies it", () => {
  // Liking a topic pushes that topic's remaining items to the very top (the bubble).
  const spaceRecs = recommend({ "it-01": 5, "it-02": 5 }).recommendations
  assert.equal(spaceRecs[0].item.topic, "space", "the liked topic should lead the feed")

  // The explore option spreads the feed across more distinct topics than the plain feed.
  const sorted = recommend({ "it-01": 5, "it-02": 5 }, defaultWeights(), { topN: 20 }).recommendations
  const plain = sorted.slice(0, 6)
  const explored = diversify(sorted, 6)
  assert.ok(distinctTopics(explored) >= distinctTopics(plain), "explore should not reduce topic variety")
  assert.ok(narrowness(plain) >= 0, "narrowness is a valid share")
  assert.ok(topicDistribution(plain).length >= 1)
})

test("buildProfile aggregates preference from ratings", () => {
  const profile = buildProfile({ "it-01": 5, "it-02": 5 })
  assert.ok((profile.topic["space"] ?? 0) > 0)
  assert.equal(getItem("it-01")!.topic, "space")
})
