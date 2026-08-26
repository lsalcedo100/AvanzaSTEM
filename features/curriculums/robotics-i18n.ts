import type { RoboticsCurriculum, RoboticsModule } from "@/features/curriculums/robotics"
import { roboticsCurriculum } from "@/features/curriculums/robotics"
import {
  createLocalizedResolver,
  hasLocaleOverlay,
  type LocaleOverlays,
} from "@/lib/localize-content"
import type { Language } from "@/i18n/translations"

/**
 * Translations for the Robotics & Automation course.
 *
 * Sparse overlays merged onto the English `roboticsCurriculum` by
 * `lib/localize-content`. Only prose lives here: slugs, week numbers, hrefs,
 * answer keys, and diagram/accent identifiers stay shared with English so the
 * course cannot structurally drift between locales.
 *
 * Untranslated strings fall through to English automatically, so this file can
 * grow one week at a time.
 */
const overlays: LocaleOverlays<RoboticsCurriculum> = {}

/** The Robotics & Automation curriculum in the requested language. */
export const getRoboticsCurriculum = createLocalizedResolver(
  roboticsCurriculum,
  overlays,
)

/** Whether this course has been translated into `language` at all. */
export function roboticsCurriculumHasTranslation(language: Language): boolean {
  return hasLocaleOverlay(overlays, language)
}

/** All modules in the requested language, in course order. */
export function getRoboticsModules(language: Language): RoboticsModule[] {
  return [...getRoboticsCurriculum(language).modules].sort((a, b) => a.order - b.order)
}

/** The module with this slug, in the requested language. */
export function findRoboticsModule(language: Language, slug: string): RoboticsModule | undefined {
  return getRoboticsCurriculum(language).modules.find((module) => module.slug === slug)
}
