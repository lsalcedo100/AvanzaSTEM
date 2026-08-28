import type {
  EngineeringCurriculum,
  EngineeringLesson,
} from "./index.ts"
import { engineeringFundamentalsCurriculum } from "./index.ts"
import {
  createLocalizedResolver,
  hasLocaleOverlay,
  type LocaleOverlays,
} from "../../../lib/localize-content.ts"
import type { Language } from "../../../i18n/translations.ts"

/**
 * Translations for the Engineering Fundamentals course.
 *
 * Sparse overlays merged onto the English `engineeringFundamentalsCurriculum` by
 * `lib/localize-content`. Only prose lives here: slugs, week numbers, hrefs,
 * answer keys, and diagram/accent identifiers stay shared with English so the
 * course cannot structurally drift between locales.
 *
 * Untranslated strings fall through to English automatically, so this file can
 * grow one week at a time.
 */
const overlays: LocaleOverlays<EngineeringCurriculum> = {}

/** The Engineering Fundamentals curriculum in the requested language. */
export const getEngineeringFundamentalsCurriculum = createLocalizedResolver(
  engineeringFundamentalsCurriculum,
  overlays,
)

/** Whether this course has been translated into `language` at all. */
export function engineeringCurriculumHasTranslation(language: Language): boolean {
  return hasLocaleOverlay(overlays, language)
}

/**
 * The lesson with this slug, in the requested language.
 *
 * Lesson pages receive a slug from the route (slugs are language-independent)
 * and look the lesson up in the localized curriculum, so every string on the
 * page comes from one consistent language.
 */
export function findEngineeringLesson(
  language: Language,
  slug: string,
): EngineeringLesson | undefined {
  return getEngineeringFundamentalsCurriculum(language).lessons.find(
    (lesson) => lesson.slug === slug,
  )
}
