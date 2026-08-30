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
  generateEngineeringFundamentalsMetadata,
  generateEngineeringLessonMetadata,
  generateEngineeringTeacherGuideMetadata,
  generateEngineeringWorksheetMetadata,
  generateIntroToAiCompletionMetadata,
  generateIntroToAiFinalAssessmentMetadata,
  generateIntroToAiFinalProjectMetadata,
  generateIntroToAiLessonMetadata,
  generateIntroToAiMetadata,
  generateIntroToAiWeekMetadata,
  generateMathAdventuresMetadata,
  generateMathLessonMetadata,
  generateRoboticsFinalProjectMetadata,
  generateRoboticsJournalMetadata,
  generateRoboticsLessonMetadata,
  generateRoboticsMetadata,
  generateRoboticsReviewMetadata,
  generateRoboticsTeacherGuideMetadata,
  generateRoboticsWorksheetMetadata,
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
  // Robotics, Math Adventures, Engineering Fundamentals and Intro to AI reached
  // full es/zh/pt coverage on 2026-08-29. Until their metadata generators were
  // given a `language`, 243 translated pages canonicalized to the English URL -
  // the same defect this file was opened for, at five times the scale. Every
  // page *type* of each course is pinned below, because the bug lives in the
  // one generator a reviewer does not happen to open.
  {
    name: "Robotics hub",
    path: "/courses/robotics",
    metadata: (language) => generateRoboticsMetadata(language),
  },
  {
    name: "Robotics lesson",
    path: "/courses/robotics/what-makes-something-a-robot",
    metadata: (language) => generateRoboticsLessonMetadata("what-makes-something-a-robot", language),
  },
  {
    name: "Robotics worksheet",
    path: "/courses/robotics/what-makes-something-a-robot/worksheet",
    metadata: (language) =>
      generateRoboticsWorksheetMetadata("what-makes-something-a-robot", language),
  },
  {
    name: "Robotics teacher guide",
    path: "/courses/robotics/what-makes-something-a-robot/teacher-guide",
    metadata: (language) =>
      generateRoboticsTeacherGuideMetadata("what-makes-something-a-robot", language),
  },
  {
    name: "Robotics review",
    path: "/courses/robotics/review",
    metadata: (language) => generateRoboticsReviewMetadata(language),
  },
  {
    name: "Robotics journal",
    path: "/courses/robotics/journal",
    metadata: (language) => generateRoboticsJournalMetadata(language),
  },
  {
    name: "Robotics final project",
    path: "/courses/robotics/final-project",
    metadata: (language) => generateRoboticsFinalProjectMetadata(language),
  },
  {
    name: "Math Adventures hub",
    path: "/courses/math-adventures",
    metadata: (language) => generateMathAdventuresMetadata(language),
  },
  {
    name: "Math Adventures lesson",
    path: "/courses/math-adventures/number-detectives",
    metadata: (language) => generateMathLessonMetadata("number-detectives", language),
  },
  {
    name: "Engineering Fundamentals hub",
    path: "/courses/engineering-fundamentals",
    metadata: (language) => generateEngineeringFundamentalsMetadata(language),
  },
  {
    name: "Engineering Fundamentals lesson",
    path: "/courses/engineering-fundamentals/lesson-1",
    metadata: (language) => generateEngineeringLessonMetadata("lesson-1", language),
  },
  {
    name: "Engineering Fundamentals worksheet",
    path: "/courses/engineering-fundamentals/lesson-1/worksheet",
    metadata: (language) => generateEngineeringWorksheetMetadata("lesson-1", language),
  },
  {
    name: "Engineering Fundamentals teacher guide",
    path: "/courses/engineering-fundamentals/lesson-1/teacher-guide",
    metadata: (language) => generateEngineeringTeacherGuideMetadata("lesson-1", language),
  },
  {
    name: "Intro to AI hub",
    path: "/courses/intro-to-artificial-intelligence",
    metadata: (language) => generateIntroToAiMetadata(language),
  },
  {
    name: "Intro to AI week",
    path: "/courses/intro-to-artificial-intelligence/week/2",
    metadata: (language) => generateIntroToAiWeekMetadata(2, language),
  },
  {
    name: "Intro to AI final project",
    path: "/courses/intro-to-artificial-intelligence/final-project",
    metadata: (language) => generateIntroToAiFinalProjectMetadata(language),
  },
  {
    name: "Intro to AI final assessment",
    path: "/courses/intro-to-artificial-intelligence/final-assessment",
    metadata: (language) => generateIntroToAiFinalAssessmentMetadata(language),
  },
  {
    name: "Intro to AI completion",
    path: "/courses/intro-to-artificial-intelligence/completion",
    metadata: (language) => generateIntroToAiCompletionMetadata(language),
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
