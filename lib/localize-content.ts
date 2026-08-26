import type { Language } from "@/i18n/translations"

/**
 * Locale overlays for the large, data-driven course files.
 *
 * The six courses under `features/curriculums/*` are single big exported
 * objects (`scienceExperimentsCurriculum`, `roboticsCurriculum`, ...) that the
 * hub and lesson pages read directly. Copying each one per language would mean
 * four near-identical 350 KB files per course and a guarantee that structural
 * edits (a new week, a renamed slug, a new diagram) drift between locales.
 *
 * Instead, English stays the single structural source of truth and every other
 * language supplies a *sparse overlay*: only the strings it translates. The
 * overlay is deep-merged onto the English base, so slugs, hrefs, week numbers,
 * diagram kinds, and answer keys are shared by construction and can never drift.
 * Anything a locale has not translated yet falls through to English, which makes
 * the courses translatable incrementally instead of all-or-nothing.
 */

/**
 * The shape of a translation overlay for `T`: same structure, everything
 * optional, only leaf strings replaceable.
 *
 * String-literal unions (e.g. `ScienceDiagramKind`) stay narrowed to their own
 * literals rather than widening to `string`, so an overlay cannot introduce a
 * diagram kind or accent colour the renderer does not know about.
 */
export type DeepPartial<T> = T extends string
  ? T
  : T extends number | boolean | null | undefined
    ? T
    : T extends ReadonlyArray<infer E>
      ? ReadonlyArray<DeepPartial<E> | null>
      : T extends object
        ? { [K in keyof T]?: DeepPartial<T[K]> }
        : T

/** Overlays for every language that is not the English base. */
export type LocaleOverlays<T> = Partial<Record<Exclude<Language, "en">, DeepPartial<T>>>

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

/**
 * Deep-merges a sparse `overlay` onto `base`, returning a value with exactly
 * `base`'s shape.
 *
 * - Strings: the overlay wins when it supplies one.
 * - Arrays: merged element-wise **by index**, and the result always keeps the
 *   base's length. A `null` hole or a short overlay array leaves those elements
 *   in English, so a translator can do the first three of six weeks and ship.
 * - Objects: recursed key by key. Keys absent from the base are ignored, so a
 *   stale overlay left behind after a refactor cannot inject dead fields.
 * - Other primitives: overridden only when the types already agree.
 *
 * The base is never mutated; untouched subtrees are returned by reference.
 */
export function localizeContent<T>(
  base: T,
  overlay: DeepPartial<NoInfer<T>> | null | undefined,
): T {
  if (overlay === undefined || overlay === null) return base

  if (typeof base === "string") {
    return (typeof overlay === "string" ? overlay : base) as T
  }

  if (Array.isArray(base)) {
    if (!Array.isArray(overlay)) return base
    const source = overlay as ReadonlyArray<unknown>
    return base.map((element, index) =>
      localizeContent(element, source[index] as DeepPartial<typeof element>),
    ) as unknown as T
  }

  if (isPlainObject(base)) {
    if (!isPlainObject(overlay)) return base
    const merged: Record<string, unknown> = { ...base }
    for (const key of Object.keys(overlay)) {
      if (!(key in base)) continue
      merged[key] = localizeContent(base[key], overlay[key] as DeepPartial<unknown>)
    }
    return merged as T
  }

  return (typeof overlay === typeof base ? (overlay as unknown as T) : base)
}

/**
 * Builds a memoised `(language) => content` resolver for one course.
 *
 * Merging a 350 KB curriculum is cheap but not free, and the hub, every lesson
 * page, the worksheet, and the teacher guide all ask for the same object. The
 * cache means each language is merged at most once per process.
 */
export function createLocalizedResolver<T>(
  base: T,
  overlays: LocaleOverlays<NoInfer<T>>,
): (language: Language) => T {
  const cache = new Map<Language, T>()

  return function resolve(language: Language): T {
    if (language === "en") return base
    const cached = cache.get(language)
    if (cached !== undefined) return cached
    const merged = localizeContent(base, overlays[language])
    cache.set(language, merged)
    return merged
  }
}

/**
 * Whether a locale has any course translation at all.
 *
 * Drives the English-fallback notice: a language with an overlay for this course
 * no longer needs to be warned that the lessons are in English.
 */
export function hasLocaleOverlay<T>(overlays: LocaleOverlays<T>, language: Language): boolean {
  if (language === "en") return true
  return overlays[language] !== undefined
}
