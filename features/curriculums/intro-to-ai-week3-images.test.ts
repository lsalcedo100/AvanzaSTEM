import { test } from "node:test"
import assert from "node:assert/strict"

import {
  TOPICS,
  IMAGES,
  EDGE_CASES,
  GRID_SIZE,
  rasterize,
  extractFeatures,
  featuresFor,
  euclidean,
  similarity,
  classify,
  classifyImage,
  evaluate,
  accuracyPercent,
  binaryOutcome,
  validateTraining,
  compareModels,
  trainingPool,
  testSet,
  topicImages,
  getTopic,
  edgeCasesForTopic,
  square,
} from "./intro-to-ai-week3-images.ts"

/* ============================ Dataset validity ========================== */

test("every topic has 3 categories and generates training + test images", () => {
  assert.equal(TOPICS.length, 3)
  for (const topic of TOPICS) {
    assert.equal(topic.categories.length, 3)
    for (const cat of topic.categories) {
      assert.ok(trainingPool(topic.id).some((im) => im.label === cat.id), `${topic.id}/${cat.id} has no training`)
      assert.ok(testSet(topic.id).some((im) => im.label === cat.id), `${topic.id}/${cat.id} has no test`)
    }
  }
})

test("all image and edge-case ids are unique; every image has a description and valid label", () => {
  const ids = [...IMAGES, ...EDGE_CASES].map((im) => im.id)
  assert.equal(new Set(ids).size, ids.length)
  for (const im of IMAGES) {
    const topic = getTopic(im.topic)!
    assert.ok(topic.categories.some((c) => c.id === im.label), `${im.id} has an unknown label`)
    assert.ok(im.description.length > 5)
  }
})

test("train and test sets never share an image id (within a topic)", () => {
  for (const topic of TOPICS) {
    const trainIds = new Set(trainingPool(topic.id).map((im) => im.id))
    assert.ok(testSet(topic.id).every((im) => !trainIds.has(im.id)))
  }
})

/* ======================= Rasterizer + features ========================= */

test("rasterize is deterministic and produces a full grid with ink", () => {
  const g1 = rasterize(square(0.5, 0))
  const g2 = rasterize(square(0.5, 0))
  assert.equal(g1.length, GRID_SIZE * GRID_SIZE)
  assert.deepEqual(g1, g2)
  assert.ok(g1.some((v) => v > 0.5), "a solid square should have ink")
})

test("features are deterministic, length-stable, and within [0,1]", () => {
  const f1 = extractFeatures(rasterize(square(0.5, 0)))
  const f2 = extractFeatures(rasterize(square(0.5, 0)))
  assert.deepEqual(f1, f2)
  assert.ok(f1.every((v) => v >= 0 && v <= 1))
})

test("different shapes produce different feature vectors", () => {
  const sq = featuresFor(IMAGES.find((im) => im.label === "square")!)
  const tri = featuresFor(IMAGES.find((im) => im.label === "triangle")!)
  assert.ok(euclidean(sq, tri) > 0.05, "square and triangle should differ")
})

/* ============================ Classifier =============================== */

test("similarity is 1 for identical features and decreases with distance", () => {
  const f = featuresFor(IMAGES[0])
  assert.equal(similarity(f, f), 1)
  assert.ok(similarity(f, featuresFor(IMAGES.find((im) => im.label !== IMAGES[0].label)!)) < 1)
})

test("classify is deterministic and returns confidence in (0,1]", () => {
  const topic = TOPICS[0]
  const train = trainingPool(topic.id)
  const target = testSet(topic.id)[0]
  const a = classifyImage(train, target, 3)
  const b = classifyImage(train, target, 3)
  assert.equal(a.predicted, b.predicted)
  assert.ok(a.confidence > 0 && a.confidence <= 1)
})

test("student training selection changes predictions", () => {
  const topic = TOPICS[0]
  const target = testSet(topic.id).find((im) => im.label === "circle")!
  const full = classifyImage(trainingPool(topic.id), target, 3).predicted
  // Train with only triangles and squares — the model can no longer pick circle.
  const noCircles = trainingPool(topic.id).filter((im) => im.label !== "circle")
  const limited = classifyImage(noCircles, target, 3).predicted
  assert.equal(full, "circle")
  assert.notEqual(limited, "circle")
})

/* ============ The classifier actually works on every topic ============= */

for (const topic of TOPICS) {
  test(`the classifier separates '${topic.id}' categories on the unseen test set`, () => {
    const evalr = evaluate(topic, trainingPool(topic.id), testSet(topic.id), 3)
    assert.ok(evalr.accuracy >= 0.75, `${topic.id} accuracy was only ${accuracyPercent(evalr)}%`)
  })
}

/* ==================== Evaluation, matrix, per-category ================== */

test("evaluate builds a confusion matrix whose rows sum to each category's test total", () => {
  const topic = TOPICS[0]
  const evalr = evaluate(topic, trainingPool(topic.id), testSet(topic.id), 3)
  topic.categories.forEach((cat, i) => {
    const rowSum = evalr.matrix[i].reduce((a, b) => a + b, 0)
    assert.equal(rowSum, evalr.perCategory[cat.id].total)
  })
  const diag = topic.categories.reduce((n, _c, i) => n + evalr.matrix[i][i], 0)
  assert.equal(diag, evalr.correct)
})

test("accuracy equals correct over total", () => {
  const topic = TOPICS[1]
  const evalr = evaluate(topic, trainingPool(topic.id), testSet(topic.id), 3)
  assert.equal(evalr.accuracy, evalr.correct / evalr.total)
})

test("binaryOutcome labels true/false positives and negatives", () => {
  assert.equal(binaryOutcome("circle", "circle", "circle"), "true-positive")
  assert.equal(binaryOutcome("square", "square", "circle"), "true-negative")
  assert.equal(binaryOutcome("square", "circle", "circle"), "false-positive")
  assert.equal(binaryOutcome("circle", "square", "circle"), "false-negative")
})

/* ======================== Training validation ========================== */

test("validateTraining flags empty categories, imbalance, and train/test overlap", () => {
  const topic = TOPICS[0]
  const full = trainingPool(topic.id)
  assert.ok(validateTraining(topic, full, testSet(topic.id)).ok)

  const noCircle = full.filter((im) => im.label !== "circle")
  assert.ok(!validateTraining(topic, noCircle, testSet(topic.id)).ok, "empty category should be an error")

  const overlap = validateTraining(topic, full, [full[0]])
  assert.ok(overlap.errors.some((e) => /also in training/i.test(e)))

  const imbalanced = [...full.filter((im) => im.label === "circle"), full.find((im) => im.label === "square")!, full.find((im) => im.label === "triangle")!]
  const dupCircles = [...imbalanced, ...imbalanced.filter((im) => im.label === "circle"), ...imbalanced.filter((im) => im.label === "circle")]
  assert.ok(validateTraining(topic, dupCircles, testSet(topic.id)).warnings.some((w) => /unbalanced/i.test(w)))
})

/* ==================== Edge cases + improvement ========================= */

test("each topic-relevant edge case classifies deterministically", () => {
  for (const ec of EDGE_CASES) {
    const topic = getTopic(ec.topic)!
    const a = classify(trainingPool(topic.id), featuresFor(ec), 3)
    const b = classify(trainingPool(topic.id), featuresFor(ec), 3)
    assert.equal(a.predicted, b.predicted)
    assert.ok(ec.why.length > 10)
  }
  assert.ok(edgeCasesForTopic("shapes").length >= 5)
})

test("compareModels shows the improvement workflow: a model that never saw triangles misses them, and adding triangles fixes them", () => {
  const topic = TOPICS[0]
  const test = testSet(topic.id)
  // Weak first model: only circles and squares — no triangle examples at all.
  const weak = trainingPool(topic.id).filter((im) => im.label !== "triangle")
  const cmp = compareModels(topic, weak, trainingPool(topic.id), test, 3)
  assert.equal(cmp.first.total, test.length)
  // The weak model must get every triangle wrong (it can't predict a label it never saw).
  assert.equal(cmp.first.perCategory.triangle.correct, 0)
  // Adding triangles improves accuracy and fixes previously-wrong triangle pictures.
  assert.ok(cmp.overallDelta > 0, "improved model should be more accurate")
  assert.ok(cmp.fixed.length >= 1, "some triangle pictures should be fixed")
})

test("adding varied training examples does not reduce accuracy on this dataset", () => {
  const topic = TOPICS[2]
  const test = testSet(topic.id)
  const small = topicImages(topic.id).filter((im) => im.split === "train" && /-[12]$/.test(im.id))
  const cmp = compareModels(topic, small, trainingPool(topic.id), test, 3)
  assert.ok(cmp.improved.accuracy >= cmp.first.accuracy, "more varied data should not hurt here")
})
