import assert from "node:assert/strict"
import { test } from "node:test"

import { VALID_LANGUAGES, type Language } from "../../i18n/translations.ts"
import { siteConfig } from "../../lib/site-config.ts"
import {
  generateIntroToPythonMetadata,
  generateIntroToPythonTeacherGuideMetadata,
  generateIntroToPythonWeekMetadata,
  generateIntroToPythonWorksheetsMetadata,
  generateScienceExperimentsMetadata,
  generateScienceLessonMetadata,
} from "./metadata.ts"

/**
 * A translated page must claim its own URL as canonical.
 *
 * Search Console reported 47 localized course URLs as "Alternate page with
 * proper canonical tag" - Google's way of saying the page told it not to index
 * it. Most were genuinely English bodies under a translated shell, but some
 * were fully translated pages whose metadata generator had simply never been
 * given a `language` parameter and so hardcoded `enOnlyAlternates`. The Intro
 * to Python teacher guide and worksheets were two of them: the course ships
 * complete es/zh/pt overlays, yet /es/curriculums/intro-to-python/worksheets
 * pointed its canonical at the English URL.
 *
 * The bug is invisible in isolation - each generator looks reasonable - so it
 * is pinned here across every page of the two fully translated courses rather
 * than left to a reviewer noticing a missing argument.
 */

const NON_ENGLISH = VALID_LANGUAGES.filter((language) => language !== "en")

const translatedPages: { name: string; path: string; metadata: (language: Language) => unknown }[] = [
  {
    name: "Intro to Python hub",
    path: "/curriculums/intro-to-python",
    metadata: (language) => generateIntroToPythonMetadata(language),
  },
  {
    name: "Intro to Python teacher guide",
    path: "/curriculums/intro-to-python/teacher-guide",
    metadata: (language) => generateIntroToPythonTeacherGuideMetadata(language),
  },
  {
    name: "Intro to Python worksheets",
    path: "/curriculums/intro-to-python/worksheets",
    metadata: (language) => generateIntroToPythonWorksheetsMetadata(language),
  },
  {
    name: "Intro to Python week 3",
    path: "/curriculums/intro-to-python/week-3",
    metadata: (language) => generateIntroToPythonWeekMetadata(3, language),
  },
  {
    name: "Science Experiments hub",
    path: "/courses/science-experiments",
    metadata: (language) => generateScienceExperimentsMetadata(language),
  },
  {
    name: "Science Experiments lesson",
    path: "/courses/science-experiments/states-of-matter",
    metadata: (language) => generateScienceLessonMetadata("states-of-matter", language),
  },
]

function canonicalOf(metadata: unknown): string {
  const alternates = (metadata as { alternates?: { canonical?: string } }).alternates
  assert.ok(alternates?.canonical, "metadata is missing alternates.canonical")
  return alternates.canonical
}

for (const page of translatedPages) {
  test(`${page.name} canonicalizes to its own locale`, () => {
    assert.equal(canonicalOf(page.metadata("en")), page.path)

    for (const language of NON_ENGLISH) {
      assert.equal(
        canonicalOf(page.metadata(language)),
        `/${language}${page.path}`,
        `${page.name} in ${language} must not canonicalize to the English URL`,
      )
    }
  })

  test(`${page.name} advertises every locale as an alternate`, () => {
    const languages = (
      page.metadata("en") as { alternates?: { languages?: Record<string, string> } }
    ).alternates?.languages

    assert.ok(languages, `${page.name} is missing alternates.languages`)
    for (const language of VALID_LANGUAGES) {
      const expected =
        language === "en" ? page.path : `/${language}${page.path}`
      assert.equal(
        languages[language],
        `${siteConfig.url}${expected}`,
        `${page.name} is missing a reciprocal hreflang for ${language}`,
      )
    }
  })
}
