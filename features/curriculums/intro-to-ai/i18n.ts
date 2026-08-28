import type {
  IntroToAiCourse,
  CourseWeek,
  Lesson,
} from "./types.ts"
import { introToAiCourse } from "./index.ts"
import {
  createLocalizedResolver,
  hasLocaleOverlay,
  type LocaleOverlays,
} from "../../../lib/localize-content.ts"
import type { Language } from "../../../i18n/translations.ts"

/**
 * Translations for the Intro to Artificial Intelligence course.
 *
 * Sparse overlays merged onto the English `introToAiCourse` by
 * `lib/localize-content`. Only prose lives here: slugs, week numbers, hrefs,
 * answer keys, and diagram/accent identifiers stay shared with English so the
 * course cannot structurally drift between locales.
 *
 * Untranslated strings fall through to English automatically, so this file can
 * grow one week at a time.
 */
const overlays: LocaleOverlays<IntroToAiCourse> = {}

/** The Intro to Artificial Intelligence curriculum in the requested language. */
export const getIntroToAiCourse = createLocalizedResolver(
  introToAiCourse,
  overlays,
)

/** Whether this course has been translated into `language` at all. */
export function introToAiCourseHasTranslation(language: Language): boolean {
  return hasLocaleOverlay(overlays, language)
}

/** The week with this number, in the requested language. */
export function findAiWeek(language: Language, week: number): CourseWeek | undefined {
  return getIntroToAiCourse(language).weeks.find((entry) => entry.week === week)
}

/** The lesson with this slug inside a week, in the requested language. */
export function findAiLesson(
  language: Language,
  week: number,
  slug: string,
): Lesson | undefined {
  return findAiWeek(language, week)?.lessons.find((lesson) => lesson.slug === slug)
}
