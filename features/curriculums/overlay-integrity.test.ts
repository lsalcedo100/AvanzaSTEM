/**
 * Architectural guard for the sparse-overlay translation system.
 *
 * `lib/localize-content` promises that a localized curriculum has *exactly* the
 * English shape: same array lengths, same object keys, same identifiers. Every
 * course page indexes into that shape (week 3, lesson slug, answer key) without
 * re-checking it per language, so a drifting overlay would surface as a missing
 * lesson or a broken route in one locale only.
 *
 * The per-course suites cover the English content. These tests cover the six
 * per-course `i18n.ts` resolvers, which nothing else exercises directly.
 */
import { test } from "node:test"
import assert from "node:assert/strict"

import { VALID_LANGUAGES, type Language } from "../../i18n/translations.ts"
import { getEngineeringFundamentalsCurriculum } from "./engineering-fundamentals/i18n.ts"
import { getIntroToAiCourse } from "./intro-to-ai/i18n.ts"
import { getIntroToPythonCurriculum } from "./intro-to-python/i18n.ts"
import { getMathAdventuresCurriculum } from "./math-adventures/i18n.ts"
import { getRoboticsCurriculum } from "./robotics/i18n.ts"
import { getScienceExperimentsCurriculum } from "./science-experiments/i18n.ts"

const COURSES: { name: string; resolve: (language: Language) => unknown }[] = [
  { name: "engineering-fundamentals", resolve: getEngineeringFundamentalsCurriculum },
  { name: "intro-to-ai", resolve: getIntroToAiCourse },
  { name: "intro-to-python", resolve: getIntroToPythonCurriculum },
  { name: "math-adventures", resolve: getMathAdventuresCurriculum },
  { name: "robotics", resolve: getRoboticsCurriculum },
  { name: "science-experiments", resolve: getScienceExperimentsCurriculum },
]

const OTHER_LANGUAGES = VALID_LANGUAGES.filter((language) => language !== "en")

/**
 * Identifiers that address content from a route, a progress record, or a
 * renderer lookup. Translating one would break that lookup in a single locale,
 * so the merge deliberately keeps them shared with English.
 */
const IDENTIFIER_KEYS = new Set([
  "slug",
  "href",
  "id",
  "diagram",
  "accent",
  "kind",
  "variant",
  "icon",
  "image",
  "src",
  "videoId",
  "specId",
  "missionId",
  "promptId",
  "checkId",
  "lessonIds",
  "order",
  "week",
])

/** Collects every way `localized` departs from `base`'s structure. */
function collectDrift(base: unknown, localized: unknown, path: string, drift: string[]): void {
  if (Array.isArray(base)) {
    if (!Array.isArray(localized)) {
      drift.push(`${path}: expected an array, got ${typeof localized}`)
      return
    }
    if (base.length !== localized.length) {
      drift.push(`${path}: length ${localized.length}, English has ${base.length}`)
      return
    }
    base.forEach((entry, index) => collectDrift(entry, localized[index], `${path}[${index}]`, drift))
    return
  }

  if (base !== null && typeof base === "object") {
    if (localized === null || typeof localized !== "object" || Array.isArray(localized)) {
      drift.push(`${path}: expected an object, got ${typeof localized}`)
      return
    }
    const baseRecord = base as Record<string, unknown>
    const localizedRecord = localized as Record<string, unknown>
    const baseKeys = Object.keys(baseRecord).sort()
    const localizedKeys = Object.keys(localizedRecord).sort()
    if (baseKeys.join() !== localizedKeys.join()) {
      drift.push(`${path}: keys [${localizedKeys}] differ from English [${baseKeys}]`)
      return
    }
    for (const key of baseKeys) {
      const childPath = path ? `${path}.${key}` : key
      if (IDENTIFIER_KEYS.has(key) && baseRecord[key] !== localizedRecord[key]) {
        drift.push(
          `${childPath}: identifier translated to ${JSON.stringify(localizedRecord[key])}, ` +
            `must stay ${JSON.stringify(baseRecord[key])}`,
        )
        continue
      }
      collectDrift(baseRecord[key], localizedRecord[key], childPath, drift)
    }
    return
  }

  if (typeof base !== typeof localized) {
    drift.push(`${path}: type ${typeof localized}, English has ${typeof base}`)
  }
}

for (const course of COURSES) {
  test(`${course.name}: resolves in every shipped language`, () => {
    for (const language of VALID_LANGUAGES) {
      const resolved = course.resolve(language)
      assert.ok(resolved, `${course.name} resolved to nothing for ${language}`)
      assert.equal(typeof resolved, "object")
    }
  })

  test(`${course.name}: English resolves to the untouched base content`, () => {
    assert.equal(
      course.resolve("en"),
      course.resolve("en"),
      "the English base should be returned by reference, not rebuilt",
    )
  })

  test(`${course.name}: no locale drifts from the English structure`, () => {
    const base = course.resolve("en")
    for (const language of OTHER_LANGUAGES) {
      const drift: string[] = []
      collectDrift(base, course.resolve(language), "", drift)
      assert.deepEqual(
        drift.slice(0, 10),
        [],
        `${course.name} drifts from English in ${language}`,
      )
    }
  })

  test(`${course.name}: resolving is memoised per language`, () => {
    for (const language of OTHER_LANGUAGES) {
      assert.equal(
        course.resolve(language),
        course.resolve(language),
        `${course.name} rebuilt the ${language} merge instead of caching it`,
      )
    }
  })
}

test("the drift check catches a deliberately broken overlay (negative test)", () => {
  const base = {
    slug: "robotics",
    modules: [
      { id: "m1", title: "Sensors", order: 1 },
      { id: "m2", title: "Motors", order: 2 },
    ],
  }

  const translatedIdentifier = {
    slug: "robotica",
    modules: [
      { id: "m1", title: "Sensores", order: 1 },
      { id: "m2", title: "Motores", order: 2 },
    ],
  }
  const identifierDrift: string[] = []
  collectDrift(base, translatedIdentifier, "", identifierDrift)
  assert.equal(identifierDrift.length, 1)
  assert.match(identifierDrift[0], /^slug: identifier translated/)

  const droppedElement = {
    slug: "robotics",
    modules: [{ id: "m1", title: "Sensores", order: 1 }],
  }
  const lengthDrift: string[] = []
  collectDrift(base, droppedElement, "", lengthDrift)
  assert.deepEqual(lengthDrift, ["modules: length 1, English has 2"])

  const missingKey = {
    slug: "robotics",
    modules: [
      { id: "m1", title: "Sensores" },
      { id: "m2", title: "Motores", order: 2 },
    ],
  }
  const keyDrift: string[] = []
  collectDrift(base, missingKey, "", keyDrift)
  assert.equal(keyDrift.length, 1)
  assert.match(keyDrift[0], /^modules\[0\]: keys /)

  const faithful = {
    slug: "robotics",
    modules: [
      { id: "m1", title: "Sensores", order: 1 },
      { id: "m2", title: "Motores", order: 2 },
    ],
  }
  const noDrift: string[] = []
  collectDrift(base, faithful, "", noDrift)
  assert.deepEqual(noDrift, [], "a correct overlay must report no drift")
})

test("every shipped language is covered by these checks", () => {
  assert.deepEqual([...VALID_LANGUAGES].sort(), ["en", "es", "pt", "zh"])
  assert.equal(COURSES.length, 6, "a new course needs an entry here")
})
