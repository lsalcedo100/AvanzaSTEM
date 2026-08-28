import {
  engineeringFundamentalsCurriculum,
  engineeringFundamentalsPath,
} from "./engineering-fundamentals/index.ts"
import { introToAiCourse, introToAiPath } from "./intro-to-ai/index.ts"
import { introToPythonCurriculum, introToPythonPath } from "./intro-to-python/index.ts"
import { mathAdventuresCurriculum, mathAdventuresPath } from "./math-adventures/index.ts"
import { roboticsCurriculum, roboticsPath } from "./robotics/index.ts"
import {
  scienceExperimentsCurriculum,
  scienceExperimentsPath,
} from "./science-experiments/index.ts"
import { translations } from "../../i18n/translations.ts"
import { siteConfig } from "../../lib/site-config.ts"
import { getBreadcrumbJsonLd } from "../../lib/structured-data.ts"

/**
 * Course structured data for the six curriculum hubs.
 *
 * Every field is read from the course's own data module - name, description
 * and grade band are the same strings the hub page renders - so the markup
 * describes content that is actually on the page. Course is one of the few
 * schema types that still produces a rich result (the course list carousel);
 * the site emitted none before this, and the Search Console "Search
 * appearance" report was empty for the whole six-month window.
 *
 * hasCourseInstance is deliberately omitted: Google's Course Info treatment
 * wants a courseWorkload duration, and the per-lesson time estimates in the
 * course data are ranges ("45-75 minutes") that cannot be turned into a single
 * honest ISO 8601 value.
 */
type CourseDescriptor = {
  path: string
  name: string
  description: string
  gradeRange: string
}

export const COURSE_DESCRIPTORS: readonly CourseDescriptor[] = [
  {
    path: introToPythonPath,
    name: introToPythonCurriculum.title,
    description: introToPythonCurriculum.description,
    gradeRange: introToPythonCurriculum.gradeRange,
  },
  {
    path: engineeringFundamentalsPath,
    name: engineeringFundamentalsCurriculum.title,
    description: engineeringFundamentalsCurriculum.description,
    gradeRange: engineeringFundamentalsCurriculum.gradeRange,
  },
  {
    path: scienceExperimentsPath,
    name: scienceExperimentsCurriculum.title,
    description: scienceExperimentsCurriculum.description,
    gradeRange: scienceExperimentsCurriculum.gradeRange,
  },
  {
    path: mathAdventuresPath,
    name: mathAdventuresCurriculum.title,
    description: mathAdventuresCurriculum.description,
    gradeRange: mathAdventuresCurriculum.gradeRange,
  },
  {
    path: roboticsPath,
    name: roboticsCurriculum.title,
    description: roboticsCurriculum.description,
    gradeRange: roboticsCurriculum.gradeRange,
  },
  {
    path: introToAiPath,
    name: introToAiCourse.title,
    description: introToAiCourse.description,
    gradeRange: introToAiCourse.gradeRange,
  },
]

const provider = {
  "@type": "EducationalOrganization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
}

/** "Grades 4-6" -> "9-12", using the usual US grade-to-age mapping (grade + 5). */
function gradeRangeToAgeRange(gradeRange: string): string | undefined {
  const match = gradeRange.match(/(\d+)\s*[-–]\s*(\d+)/)
  if (!match) return undefined
  return `${Number(match[1]) + 5}-${Number(match[2]) + 5}`
}

function buildCourse(course: CourseDescriptor) {
  const url = `${siteConfig.url}${course.path}`
  const typicalAgeRange = gradeRangeToAgeRange(course.gradeRange)

  return {
    "@type": "Course",
    "@id": `${url}#course`,
    name: course.name,
    description: course.description,
    url,
    provider,
    inLanguage: "en",
    isAccessibleForFree: true,
    educationalLevel: course.gradeRange,
    ...(typicalAgeRange ? { typicalAgeRange } : {}),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  }
}

/** Course JSON-LD for a single course hub page. */
export function getCourseJsonLd(path: string) {
  const course = COURSE_DESCRIPTORS.find((entry) => entry.path === path)
  if (!course) return null
  return { "@context": "https://schema.org", ...buildCourse(course) }
}

/** ItemList of all six courses, for the /curriculums index. */
export function getCourseListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Avanza STEM curriculum paths",
    url: `${siteConfig.url}/curriculums`,
    numberOfItems: COURSE_DESCRIPTORS.length,
    itemListElement: COURSE_DESCRIPTORS.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: buildCourse(course),
    })),
  }
}

/**
 * BreadcrumbList for a course hub or one of its lesson / worksheet / teacher
 * guide pages. Breadcrumbs are still a live rich result and these routes sit
 * three or four levels deep, which is where they help most.
 */
export function getCourseBreadcrumbJsonLd(path: string, leafName?: string) {
  const course = COURSE_DESCRIPTORS.find(
    (entry) => path === entry.path || path.startsWith(`${entry.path}/`),
  )
  if (!course) return null

  const t = translations.en.nav
  const items = [
    { name: t.home, path: "/" },
    { name: t.curriculums, path: "/curriculums" },
    { name: course.name, path: course.path },
  ]
  if (leafName && path !== course.path) {
    items.push({ name: leafName, path })
  }
  return getBreadcrumbJsonLd(items)
}
