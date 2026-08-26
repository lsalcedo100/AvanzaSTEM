import assert from "node:assert/strict"
import { test } from "node:test"

import { createLocalizedResolver, hasLocaleOverlay, localizeContent } from "../../lib/localize-content.ts"

/**
 * The course overlays are sparse by design: a locale ships the strings it has
 * translated and everything else falls through to English. These tests pin the
 * merge rules the overlay files depend on, because a silent regression here
 * would swap slugs, answer keys, or diagram kinds between locales rather than
 * just showing the wrong prose.
 */

type Lesson = {
  week: number
  slug: string
  title: string
  materials: string[]
  diagram: "paper-helicopter" | "balloon-gas"
}

type Course = { slug: string; totalLessons: number; lessons: Lesson[] }

const base: Course = {
  slug: "science-experiments",
  totalLessons: 2,
  lessons: [
    {
      week: 1,
      slug: "think-like-a-scientist",
      title: "Think Like a Scientist",
      materials: ["Paper", "Scissors"],
      diagram: "paper-helicopter",
    },
    {
      week: 2,
      slug: "chemical-reactions",
      title: "Chemical Reactions",
      materials: ["Vinegar"],
      diagram: "balloon-gas",
    },
  ],
}

test("translates strings without touching structure", () => {
  const merged = localizeContent(base, {
    lessons: [{ title: "Pensar como cientista" }],
  })

  assert.equal(merged.lessons[0].title, "Pensar como cientista")
  assert.equal(merged.lessons[0].slug, "think-like-a-scientist")
  assert.equal(merged.lessons[0].week, 1)
  assert.equal(merged.lessons[0].diagram, "paper-helicopter")
  assert.equal(merged.slug, "science-experiments")
  assert.equal(merged.totalLessons, 2)
})

test("falls back to English for anything the overlay omits", () => {
  const merged = localizeContent(base, {
    lessons: [{ materials: ["Papel"] }, null],
  })

  // Short array: only the first item was translated.
  assert.deepEqual(merged.lessons[0].materials, ["Papel", "Scissors"])
  // Explicit null hole: the whole second lesson stays English.
  assert.equal(merged.lessons[1].title, "Chemical Reactions")
  // Untranslated sibling key.
  assert.equal(merged.lessons[0].title, "Think Like a Scientist")
})

test("keeps the base array length even when the overlay is longer", () => {
  const merged = localizeContent(base, {
    lessons: [{ title: "Um" }, { title: "Dois" }, { title: "Tres" }],
  })

  assert.equal(merged.lessons.length, 2)
})

test("never mutates the English base", () => {
  localizeContent(base, { lessons: [{ title: "Mutado" }] })

  assert.equal(base.lessons[0].title, "Think Like a Scientist")
})

test("returns the base by reference when there is no overlay", () => {
  assert.equal(localizeContent(base, undefined), base)
  assert.equal(localizeContent(base, null), base)
})

test("ignores keys the base does not have", () => {
  const merged = localizeContent(base, { notARealKey: "x" } as never)

  assert.equal(Object.hasOwn(merged, "notARealKey"), false)
})

test("resolver returns the base for English and memoises other languages", () => {
  const resolve = createLocalizedResolver(base, {
    pt: { lessons: [{ title: "Pense como cientista" }] },
  })

  assert.equal(resolve("en"), base)
  assert.equal(resolve("pt").lessons[0].title, "Pense como cientista")
  // Same object on repeat calls, so lesson pages do not re-merge per render.
  assert.equal(resolve("pt"), resolve("pt"))
  // A language with no overlay still resolves, entirely in English.
  assert.equal(resolve("zh").lessons[0].title, "Think Like a Scientist")
})

test("reports which locales have a translation for the fallback notice", () => {
  const overlays = { pt: { slug: "science-experiments" } }

  assert.equal(hasLocaleOverlay(overlays, "en"), true)
  assert.equal(hasLocaleOverlay(overlays, "pt"), true)
  assert.equal(hasLocaleOverlay(overlays, "es"), false)
  assert.equal(hasLocaleOverlay(overlays, "zh"), false)
})
