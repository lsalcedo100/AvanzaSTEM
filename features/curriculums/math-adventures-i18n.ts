import type { MathCurriculum, MathLesson } from "@/features/curriculums/math-adventures"
import { mathAdventuresCurriculum } from "@/features/curriculums/math-adventures"
import {
  createLocalizedResolver,
  hasLocaleOverlay,
  type LocaleOverlays,
} from "@/lib/localize-content"
import type { Language } from "@/i18n/translations"

/**
 * Translations for the Math Adventures course.
 *
 * Sparse overlays merged onto the English `mathAdventuresCurriculum` by
 * `lib/localize-content`. Only prose lives here: slugs, week numbers, hrefs,
 * answer keys, and diagram/accent identifiers stay shared with English so the
 * course cannot structurally drift between locales.
 *
 * Untranslated strings fall through to English automatically, so this file can
 * grow one week at a time.
 */
const overlays: LocaleOverlays<MathCurriculum> = {}

/** The Math Adventures curriculum in the requested language. */
export const getMathAdventuresCurriculum = createLocalizedResolver(
  mathAdventuresCurriculum,
  overlays,
)

/** Whether this course has been translated into `language` at all. */
export function mathCurriculumHasTranslation(language: Language): boolean {
  return hasLocaleOverlay(overlays, language)
}

/** The lesson with this slug, in the requested language. */
export function findMathLesson(language: Language, slug: string): MathLesson | undefined {
  return getMathAdventuresCurriculum(language).lessons.find((lesson) => lesson.slug === slug)
}
