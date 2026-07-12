import type { Translations } from "@/i18n/translations"

/**
 * How students primarily work in a path. Used by the comparison section (and,
 * in a later phase, a filter). Derived from each course's real `format[]` /
 * facilitator data in `features/curriculums/*` — not invented.
 */
export type LearningSetting = "online" | "hands-on" | "unplugged"

/**
 * Stable id for a catalog entry. Also the key into
 * `t.curriculumsPage.sections.builds`, so translated "what students build" copy
 * stays in sync with the entry.
 */
export type CurriculumId =
  | "python"
  | "engineering"
  | "science"
  | "math"
  | "robotics"
  | "ai"

/**
 * Content grouping for the catalog. "hands-on" = build/experiment with physical
 * materials (Engineering, Science, Math); "technology" = code/program/AI
 * (Python, Robotics, AI). Chosen from the courses' actual content and settings.
 */
export type CurriculumGroup = "hands-on" | "technology"

/**
 * A single card in the curriculum catalog.
 *
 * Only the *structural, non-translated* facts live here (route, art, grade band,
 * length, setting, featured flag). All display strings are resolved from the
 * active locale via {@link resolveCurriculumCopy} so the listing keeps working
 * in en/es/zh. This replaces the old inline array in the page component and adds
 * the numeric fields the comparison + future filters need.
 */
export type CurriculumEntry = {
  id: CurriculumId
  /** Canonical course route. These hrefs are load-bearing — keep them exact. */
  href: string
  /**
   * Real Avanza STEM workshop/robotics photo for the card. Omitted when no
   * authentic image exists for the course (Math) — the card then falls back to a
   * restrained neutral treatment rather than a stock or AI-generated image.
   */
  image?: string
  /** AI card renders the authentic in-course JourneyDiagram instead of a photo. */
  illustration?: "ai-journey"
  /** Which catalog group the card belongs to. */
  group: CurriculumGroup
  gradeMin: number
  gradeMax: number
  /** Total weeks in the path; drives the "Length" column and duration filter. */
  weeks: number
  /**
   * Number of lessons shown on the card ("N lessons"). Equals the course's
   * totalWeeks / totalLessons / totalModules — normalized to "lessons" for a
   * consistent card metadata line.
   */
  lessons: number
  /**
   * Approximate total hours, as a digits-only range (e.g. "7–8") that the card
   * drops into the localized "About {n} hours" template. Derived from each
   * course's per-lesson time estimate × lesson count, except Intro to AI, whose
   * course data states "About 7-9 hours" directly.
   */
  hoursRange: string
  setting: LearningSetting
  /** Exactly one entry should be featured; it drives the featured section. */
  featured: boolean
}

/**
 * The six curriculum paths, in listing order. Grade bands, week counts, and
 * settings are taken from the as-built course data
 * (`features/curriculums/*` + `features/curriculums/metadata.ts`).
 *
 * Note the deliberate route inconsistency: Intro to Python lives under
 * `/curriculums/*` while every other course lives under `/courses/*`.
 */
export const curriculumCatalog: CurriculumEntry[] = [
  {
    id: "python",
    href: "/curriculums/intro-to-python",
    // Real Avanza coding-workshop photo (kids on laptops in a library).
    image: "/images/workshops/past-coding.jpg",
    group: "technology",
    gradeMin: 3,
    gradeMax: 6,
    weeks: 8,
    lessons: 8,
    hoursRange: "7–8",
    setting: "online",
    featured: false,
  },
  {
    id: "engineering",
    href: "/courses/engineering-fundamentals",
    // Real Avanza engineering-workshop photo.
    image: "/images/workshops/past-engineering.jpg",
    group: "hands-on",
    gradeMin: 2,
    gradeMax: 5,
    weeks: 6,
    lessons: 6,
    hoursRange: "5–7",
    setting: "hands-on",
    featured: false,
  },
  {
    id: "science",
    href: "/courses/science-experiments",
    // Real Avanza science-workshop photo.
    image: "/images/workshops/past-science.jpg",
    group: "hands-on",
    gradeMin: 2,
    gradeMax: 4,
    weeks: 6,
    lessons: 6,
    hoursRange: "5–6",
    setting: "hands-on",
    featured: false,
  },
  {
    id: "math",
    href: "/courses/math-adventures",
    // No authentic math photo exists — card uses the neutral graph-paper treatment.
    group: "hands-on",
    gradeMin: 2,
    gradeMax: 5,
    weeks: 10,
    lessons: 10,
    hoursRange: "8–10",
    setting: "hands-on",
    featured: false,
  },
  {
    id: "robotics",
    href: "/courses/robotics",
    // Real LEGO robotics photo already used elsewhere on the site.
    image: "/images/shared/lego-robotics.jpeg",
    group: "technology",
    gradeMin: 4,
    gradeMax: 6,
    weeks: 8,
    lessons: 8,
    hoursRange: "8–12",
    setting: "unplugged",
    featured: false,
  },
  {
    id: "ai",
    href: "/courses/intro-to-artificial-intelligence",
    // Card uses the authentic in-course JourneyDiagram; the featured section
    // uses the real AI-workshop photo. The AI-generated ai.jpg is not used.
    illustration: "ai-journey",
    group: "technology",
    gradeMin: 5,
    gradeMax: 8,
    weeks: 6,
    lessons: 6,
    hoursRange: "7–9",
    setting: "online",
    featured: true,
  },
]

/** The single featured entry, or the first entry as a safe fallback. */
export const featuredCurriculum: CurriculumEntry =
  curriculumCatalog.find((entry) => entry.featured) ?? curriculumCatalog[0]

/**
 * Real Avanza STEM photo for the featured section (an actual AI workshop —
 * already used on the blog). Kept separate from the AI card, which uses the
 * in-course JourneyDiagram, so the two treatments read as intentionally
 * different rather than a duplicated image.
 */
export const featuredImage = "/images/shared/ai-workshop.jpg"

/** Catalog entries filtered to one content group, in listing order. */
export function curriculumsInGroup(group: CurriculumGroup): CurriculumEntry[] {
  return curriculumCatalog.filter((entry) => entry.group === group)
}

/** Resolved, locale-aware display copy for a catalog entry. */
export type CurriculumCopy = {
  title: string
  description: string
  topics: string[]
  grades: string
  duration: string
  /** Short "what students build" line for the comparison section. */
  build: string
  settingLabel: string
  /**
   * Single consistent metadata line, e.g. "Grades 3–6 · 8 lessons · About 7–8
   * hours". Composed from the entry's structured numbers + localized templates.
   */
  meta: string
  /** Concrete project/outcome sentence shown as the card's main description. */
  outcome: string
  /** Short plain-text "students will learn" line (skills, not a full sentence). */
  learn: string
  /** Localized "Students will learn" label. */
  learnLabel: string
}

/**
 * Joins a structural {@link CurriculumEntry} to its translated strings for the
 * active locale. Keeps all copy in `i18n/translations.ts` while the entry stays
 * a pure data record.
 */
export function resolveCurriculumCopy(
  entry: CurriculumEntry,
  c: Translations["curriculumsPage"],
): CurriculumCopy {
  const s = c.sections

  const settingLabel =
    entry.setting === "online"
      ? s.settingOnline
      : entry.setting === "hands-on"
        ? s.settingHandsOn
        : s.settingUnplugged

  const lessonsText = s.lessonsFormat.replace("{n}", String(entry.lessons))
  const hoursText = s.hoursFormat.replace("{n}", entry.hoursRange)

  const common = {
    settingLabel,
    learnLabel: s.learnLabel,
  }

  switch (entry.id) {
    case "python":
      return {
        ...common,
        title: c.pythonTitle,
        description: c.pythonDesc,
        topics: c.pythonTopics,
        grades: c.grades36,
        duration: c.duration8Weeks,
        build: s.builds.python,
        meta: `${c.grades36} · ${lessonsText} · ${hoursText}`,
        outcome: s.outcomes.python,
        learn: s.learn.python,
      }
    case "engineering":
      return {
        ...common,
        title: c.engineeringTitle,
        description: c.engineeringDesc,
        topics: c.engineeringTopics,
        grades: c.grades25,
        duration: c.duration6Weeks,
        build: s.builds.engineering,
        meta: `${c.grades25} · ${lessonsText} · ${hoursText}`,
        outcome: s.outcomes.engineering,
        learn: s.learn.engineering,
      }
    case "science":
      return {
        ...common,
        title: c.scienceTitle,
        description: c.scienceDesc,
        topics: c.scienceTopics,
        grades: c.grades24,
        duration: c.duration6Weeks,
        build: s.builds.science,
        meta: `${c.grades24} · ${lessonsText} · ${hoursText}`,
        outcome: s.outcomes.science,
        learn: s.learn.science,
      }
    case "math":
      return {
        ...common,
        title: c.mathTitle,
        description: c.mathDesc,
        topics: c.mathTopics,
        grades: c.grades25,
        duration: c.duration10Weeks,
        build: s.builds.math,
        meta: `${c.grades25} · ${lessonsText} · ${hoursText}`,
        outcome: s.outcomes.math,
        learn: s.learn.math,
      }
    case "robotics":
      return {
        ...common,
        title: c.roboticsTitle,
        description: c.roboticsDesc,
        topics: c.roboticsTopics,
        grades: c.grades46,
        duration: c.duration8Weeks,
        build: s.builds.robotics,
        meta: `${c.grades46} · ${lessonsText} · ${hoursText}`,
        outcome: s.outcomes.robotics,
        learn: s.learn.robotics,
      }
    case "ai":
      return {
        ...common,
        title: c.aiTitle,
        description: c.aiDesc,
        topics: c.aiTopics,
        grades: c.grades58,
        duration: c.duration6Weeks,
        build: s.builds.ai,
        meta: `${c.grades58} · ${lessonsText} · ${hoursText}`,
        outcome: s.outcomes.ai,
        learn: s.learn.ai,
      }
  }
}
