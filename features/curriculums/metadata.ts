import type { Metadata } from "next"
import { translations, type Language } from "../../i18n/translations.ts"
import { enOnlyAlternates, languageAlternates, localizedPath } from "../../lib/i18n-routes.ts"
import { formatTemplate } from "../../lib/format-template.ts"
import {
  findPythonWeek,
  getIntroToPythonCurriculum,
  pythonCurriculumHasTranslation,
} from "./intro-to-python/i18n.ts"
import {
  findScienceLesson,
  getScienceExperimentsCurriculum,
  scienceCurriculumHasTranslation,
} from "./science-experiments/i18n.ts"
import { siteConfig } from "../../lib/site-config.ts"
import {
  getIntroToPythonWeek,
  introToPythonTeacherGuidePath,
  introToPythonWeekPath,
  introToPythonWorksheetsPath,
} from "./intro-to-python/index.ts"
import {
  engineeringFundamentalsCurriculum,
  engineeringFundamentalsPath,
  engineeringLessonPath,
  engineeringTeacherGuidePath,
  engineeringWorksheetPath,
  getEngineeringLesson,
} from "./engineering-fundamentals/index.ts"
import {
  getScienceLesson,
  scienceExperimentsCurriculum,
  scienceExperimentsPath,
  scienceLessonPath,
} from "./science-experiments/index.ts"
import {
  getMathLessonBySlug,
  mathAdventuresCurriculum,
  mathAdventuresPath,
  mathLessonPath,
} from "./math-adventures/index.ts"
import {
  getRoboticsModule,
  roboticsCurriculum,
  roboticsLessonPath,
  roboticsPath,
  roboticsTeacherGuidePath,
  roboticsWorksheetPath,
} from "./robotics/index.ts"
import {
  getLesson as getIntroToAiLesson,
  getWeek as getIntroToAiWeek,
  introToAiCourse,
  introToAiCompletionPath,
  introToAiFinalAssessmentPath,
  introToAiFinalProjectPath,
  introToAiLessonPath,
  introToAiPath,
  introToAiWeekPath,
} from "./intro-to-ai/index.ts"

/*
 * Title and description length control for the ~130 course pages.
 *
 * The old templates chained the leaf name, the full course name and the site
 * name, producing titles of 80-110 characters, and prefixed each lesson's
 * prose with "Week N of the X curriculum (Grades A-B)." before a raw
 * `.slice(0, 300)`. The result was 119 titles over 60 characters and 96
 * descriptions over 165, several past 390, with slices landing mid-word.
 * Google truncates both, so the tail was never seen by a searcher and the
 * visible part was the boilerplate rather than the lesson.
 *
 * These helpers cut at word and sentence boundaries and drop the least
 * informative part first (site name, then course name). Nothing here is
 * rendered on the page.
 */
const TITLE_MAX = 60
const DESCRIPTION_MAX = 158

/** Truncates at a word boundary, preferring a clean sentence end. */
function clampDescription(text: string, max = DESCRIPTION_MAX): string {
  const collapsed = text.replace(/\s+/g, " ").trim()
  if (collapsed.length <= max) return collapsed

  const window = collapsed.slice(0, max + 1)
  const sentenceEnd = Math.max(window.lastIndexOf(". "), window.lastIndexOf("? "), window.lastIndexOf("! "))
  if (sentenceEnd >= max * 0.6) return collapsed.slice(0, sentenceEnd + 1)

  const wordEnd = window.lastIndexOf(" ")
  return `${collapsed.slice(0, wordEnd > 0 ? wordEnd : max).replace(/[,;:.\s]+$/, "")}...`
}

/**
 * Builds "<leaf> - <course>", dropping the course suffix when the pair would
 * overflow, and finally trimming the leaf at a word boundary. The site name is
 * never appended: Google renders it beside the title on its own.
 */
function clampTitle(leaf: string, courseName?: string, max = TITLE_MAX): string {
  const trimmedLeaf = leaf.replace(/\s+/g, " ").trim()
  if (courseName) {
    const combined = `${trimmedLeaf} - ${courseName}`
    if (combined.length <= max) return combined
  }
  if (trimmedLeaf.length <= max) return trimmedLeaf

  const wordEnd = trimmedLeaf.slice(0, max + 1).lastIndexOf(" ")
  return trimmedLeaf.slice(0, wordEnd > 0 ? wordEnd : max).replace(/[,;:.\s-]+$/, "")
}

const metadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    // Was 79 characters and truncated in the SERP (474 impressions, avg
    // position 1.81, 3.38% CTR).
    title: "Free STEM Curriculum for Kids: Python, Engineering & AI",
    description:
      "Explore free STEM curriculum paths for kids in Python, engineering, science, robotics, math, and AI, with hands-on project guides to start learning now.",
  },
  es: {
    title: "Curriculos STEM en desarrollo | Avanza STEM",
    description:
      "Conoce los temas de curriculo que Avanza STEM esta desarrollando, incluyendo Python, ingenieria, ciencias, matematicas, robotica e IA para jovenes estudiantes.",
  },
  zh: {
    title: "正在开发的 STEM 课程 | Avanza STEM",
    description:
      "预览 Avanza STEM 正在开发的课程主题，包括面向年轻学生的 Python、工程、科学、数学、机器人和 AI 课程。",
  },
  pt: {
    title: "Currículo de STEM Gratuito para Crianças: Python, Engenharia e IA",
    description:
      "Explore trilhas gratuitas de currículo de STEM para crianças em Python, engenharia, ciências, robótica, matemática e IA, com guias de projeto práticos para começar agora.",
  },
}

/**
 * Canonical + hreflang for a course page.
 *
 * A course only advertises localized alternates once its content is actually
 * translated. Until then the localized route still exists and renders (with
 * translated chrome and English lesson text), but it points its canonical at
 * the English URL rather than claiming to be a distinct translation.
 */
function courseAlternates(path: string, language: Language, translated: boolean) {
  return translated
    ? { canonical: localizedPath(path, language), languages: languageAlternates(path) }
    : { canonical: path, languages: enOnlyAlternates(path) }
}

export function generateCurriculumsMetadata(language: Language = "en"): Metadata {
  const { title, description } = metadataByLanguage[language]

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath("/curriculums", language),
      languages: languageAlternates("/curriculums"),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${localizedPath("/curriculums", language)}`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "/images/og-default-en.png",
          width: 1200,
          height: 630,
          alt: "Avanza STEM Curriculums",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

export function generateIntroToPythonWeekMetadata(
  week: number,
  language: Language = "en",
): Metadata {
  const lesson = findPythonWeek(language, week)
  if (!lesson) {
    return { title: "Lesson not found | Avanza STEM" }
  }

  const path = introToPythonWeekPath(week)
  const course = getIntroToPythonCurriculum(language)
  const label = formatTemplate(translations[language].courseUi.shared.weekNumber, {
    n: lesson.week,
  })
  const title = clampTitle(`${label}: ${lesson.title}`, course.title)
  const description = clampDescription(lesson.description)

  return {
    title,
    description,
    alternates: courseAlternates(path, language, pythonCurriculumHasTranslation(language)),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: "/images/og-default-en.png",
          width: 1200,
          height: 630,
          alt: `Intro to Python - Week ${lesson.week}: ${lesson.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

export function generateIntroToPythonTeacherGuideMetadata(): Metadata {
  const title = clampTitle("Teacher & Librarian Guide", "Intro to Python")
  const description =
    "How to run each lesson of the 8-week Intro to Python curriculum in a library or classroom: common student mistakes, questions to ask, and offline backups."

  return {
    title,
    description,
    alternates: {
      canonical: introToPythonTeacherGuidePath,
      languages: enOnlyAlternates(introToPythonTeacherGuidePath),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${introToPythonTeacherGuidePath}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: "/images/og-default-en.png",
          width: 1200,
          height: 630,
          alt: "Intro to Python teacher and librarian guide",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

export function generateIntroToPythonWorksheetsMetadata(): Metadata {
  const title = clampTitle("Printable Student Worksheets", "Intro to Python")
  const description =
    "Print-friendly worksheets for every week of the Intro to Python curriculum: the key idea, vocabulary, code planning space, and a debugging question."

  return {
    title,
    description,
    alternates: {
      canonical: introToPythonWorksheetsPath,
      languages: enOnlyAlternates(introToPythonWorksheetsPath),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${introToPythonWorksheetsPath}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: "/images/og-default-en.png",
          width: 1200,
          height: 630,
          alt: "Intro to Python printable student worksheets",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

const INTRO_TO_PYTHON_PATH = "/curriculums/intro-to-python"

export function generateIntroToPythonMetadata(language: Language = "en"): Metadata {
  const course = getIntroToPythonCurriculum(language)
  const title =
    language === "en"
      ? clampTitle("Intro to Python: 8-Week Beginner Coding Course (Grades 3-6)")
      : clampTitle(course.title, course.gradeRange)
  const description = clampDescription(course.description)

  return {
    title,
    description,
    alternates: courseAlternates(
      INTRO_TO_PYTHON_PATH,
      language,
      pythonCurriculumHasTranslation(language),
    ),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${INTRO_TO_PYTHON_PATH}`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "/images/og-default-en.png",
          width: 1200,
          height: 630,
          alt: "Intro to Python Programming curriculum",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

export function generateMathAdventuresMetadata(): Metadata {
  const c = mathAdventuresCurriculum
  const title =
    "Math Adventures: 10-Week Course (Grades 2-5)"
  const description =
    "A 10-week math course for grades 2-5. Each week turns one big idea - place value, fractions, geometry, data - into a hands-on adventure with a final project."

  return {
    title,
    description,
    alternates: {
      canonical: mathAdventuresPath,
      languages: enOnlyAlternates(mathAdventuresPath),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${mathAdventuresPath}`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "/images/og-default-en.png",
          width: 1200,
          height: 630,
          alt: `${c.title} curriculum`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

export function generateMathLessonMetadata(slug: string): Metadata {
  const lesson = getMathLessonBySlug(slug)
  if (!lesson) {
    return { title: "Lesson not found | Avanza STEM" }
  }

  const path = mathLessonPath(slug)
  const label = lesson.isFinalProject ? "Final Project" : `Week ${lesson.weekNumber}`
  const title = clampTitle(`${label}: ${lesson.title}`, "Math Adventures")
  const description = clampDescription(lesson.description)

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: enOnlyAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: "/images/og-default-en.png",
          width: 1200,
          height: 630,
          alt: `Math Adventures - ${label}: ${lesson.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

export function generateEngineeringFundamentalsMetadata(): Metadata {
  const c = engineeringFundamentalsCurriculum
  const title =
    "Engineering Fundamentals: 6-Week Course (Grades 2-5)"
  const description =
    "A 6-week hands-on engineering course for grades 2-5. Build, test, and redesign towers, bridges, gliders, and machines from everyday materials - no computer."

  return {
    title,
    description,
    alternates: {
      canonical: engineeringFundamentalsPath,
      languages: enOnlyAlternates(engineeringFundamentalsPath),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${engineeringFundamentalsPath}`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "/images/og-default-en.png",
          width: 1200,
          height: 630,
          alt: `${c.title} curriculum`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

export function generateEngineeringLessonMetadata(slug: string): Metadata {
  const lesson = getEngineeringLesson(slug)
  if (!lesson) {
    return { title: "Lesson not found | Avanza STEM" }
  }

  const path = engineeringLessonPath(slug)
  const label = lesson.isFinal ? "Final Challenge" : `Lesson ${lesson.order}`
  const title = clampTitle(`${label}: ${lesson.title}`, "Engineering Fundamentals")
  const description = clampDescription(lesson.summary)

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: enOnlyAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: "/images/og-default-en.png",
          width: 1200,
          height: 630,
          alt: `Engineering Fundamentals - ${label}: ${lesson.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

function engineeringResourceLabel(slug: string): string {
  const lesson = getEngineeringLesson(slug)
  if (!lesson) return "Lesson"
  return lesson.isFinal ? "Final Challenge" : `Lesson ${lesson.order}`
}

export function generateEngineeringWorksheetMetadata(slug: string): Metadata {
  const lesson = getEngineeringLesson(slug)
  if (!lesson) {
    return { title: "Worksheet not found | Avanza STEM" }
  }

  const path = engineeringWorksheetPath(slug)
  const label = engineeringResourceLabel(slug)
  const title = clampTitle(`${label} Worksheet: ${lesson.title}`, "Engineering")
  const description = clampDescription(
    `Printable worksheet for ${label}, ${lesson.projectName}: the problem, a materials checklist, sketch area, test results table, and reflection questions.`,
  )

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: enOnlyAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: "/images/og-default-en.png",
          width: 1200,
          height: 630,
          alt: `Engineering Fundamentals worksheet - ${label}: ${lesson.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

export function generateEngineeringTeacherGuideMetadata(slug: string): Metadata {
  const lesson = getEngineeringLesson(slug)
  if (!lesson) {
    return { title: "Guide not found | Avanza STEM" }
  }

  const path = engineeringTeacherGuidePath(slug)
  const label = engineeringResourceLabel(slug)
  const title = clampTitle(`${label} Teacher Guide: ${lesson.title}`, "Engineering")
  const description = clampDescription(
    `Facilitator guide for ${label} of Engineering Fundamentals: setup, materials prep, safety notes, common failure points, and easier and harder versions.`,
  )

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: enOnlyAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: "/images/og-default-en.png",
          width: 1200,
          height: 630,
          alt: `Engineering Fundamentals teacher guide - ${label}: ${lesson.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

export function generateScienceExperimentsMetadata(language: Language = "en"): Metadata {
  const c = getScienceExperimentsCurriculum(language)
  const title =
    language === "en"
      ? "Science Experiments: 6-Week Course (Grades 2-4)"
      : clampTitle(c.title, c.gradeRange)
  const description = clampDescription(c.description)

  return {
    title,
    description,
    alternates: courseAlternates(
      scienceExperimentsPath,
      language,
      scienceCurriculumHasTranslation(language),
    ),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${scienceExperimentsPath}`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "/images/og-default-en.png",
          width: 1200,
          height: 630,
          alt: `${c.title} curriculum`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

export function generateScienceLessonMetadata(slug: string, language: Language = "en"): Metadata {
  const lesson = findScienceLesson(language, slug)
  if (!lesson) {
    return { title: "Lesson not found | Avanza STEM" }
  }

  const path = scienceLessonPath(slug)
  const course = getScienceExperimentsCurriculum(language)
  const label = formatTemplate(translations[language].courseUi.shared.weekNumber, {
    n: lesson.week,
  })
  const title = clampTitle(`${label}: ${lesson.title}`, course.title)
  const description = clampDescription(`${lesson.bigQuestion} ${lesson.explanation}`)

  return {
    title,
    description,
    alternates: courseAlternates(path, language, scienceCurriculumHasTranslation(language)),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: "/images/og-default-en.png",
          width: 1200,
          height: 630,
          alt: `${course.title} - ${label}: ${lesson.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

/* -------------------------------------------------------------------------- */
/* Robotics & Automation                                                      */
/* -------------------------------------------------------------------------- */

function roboticsMetadata(
  title: string,
  description: string,
  path: string,
  type: "website" | "article",
  alt: string,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: enOnlyAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      type,
      images: [{ url: "/images/og-default-en.png", width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

export function generateRoboticsMetadata(): Metadata {
  const title = clampTitle("Robotics & Automation: 8-Week Course (Grades 4-6)")
  const description =
    "An 8-week robotics course for grades 4-6. Build a robot that moves, program it, add sensors, and debug it - with a kit, a browser simulator, or unplugged."
  return roboticsMetadata(title, description, roboticsPath, "website", `${roboticsCurriculum.title} course`)
}

export function generateRoboticsLessonMetadata(slug: string): Metadata {
  const courseModule = getRoboticsModule(slug)
  if (!courseModule) return { title: "Lesson not found | Avanza STEM" }
  const label = courseModule.isFinal ? "Final Project" : `Week ${courseModule.week}`
  const title = clampTitle(`${label}: ${courseModule.title}`, "Robotics")
  const description = clampDescription(courseModule.summary)
  return roboticsMetadata(
    title,
    description,
    roboticsLessonPath(slug),
    "article",
    `Robotics & Automation - ${label}: ${courseModule.title}`,
  )
}

export function generateRoboticsWorksheetMetadata(slug: string): Metadata {
  const courseModule = getRoboticsModule(slug)
  if (!courseModule) return { title: "Worksheet not found | Avanza STEM" }
  const label = courseModule.isFinal ? "Final Project" : `Week ${courseModule.week}`
  const title = clampTitle(`${label} Worksheet: ${courseModule.title}`, "Robotics")
  const description = clampDescription(
    `Printable worksheet for ${label} of the Robotics & Automation course: key ideas, vocabulary, activity space, testing tables, and reflection questions.`,
  )
  return roboticsMetadata(
    title,
    description,
    roboticsWorksheetPath(slug),
    "article",
    `Robotics & Automation worksheet - ${label}: ${courseModule.title}`,
  )
}

export function generateRoboticsTeacherGuideMetadata(slug: string): Metadata {
  const courseModule = getRoboticsModule(slug)
  if (!courseModule) return { title: "Guide not found | Avanza STEM" }
  const label = courseModule.isFinal ? "Final Project" : `Week ${courseModule.week}`
  const title = clampTitle(`${label} Teacher Guide: ${courseModule.title}`, "Robotics")
  const description = clampDescription(
    `Facilitator guide for ${label} of Robotics & Automation: setup, materials prep, common misconceptions, questions to ask, and easier and harder versions.`,
  )
  return roboticsMetadata(
    title,
    description,
    roboticsTeacherGuidePath(slug),
    "article",
    `Robotics & Automation teacher guide - ${label}: ${courseModule.title}`,
  )
}

export function generateRoboticsReviewMetadata(): Metadata {
  const title = clampTitle("Course Review", "Robotics & Automation")
  const description =
    "Review your progress through the 8-week Robotics & Automation course: what you completed, your knowledge-check scores, and where to pick back up."
  return roboticsMetadata(title, description, `${roboticsPath}/review`, "website", "Robotics & Automation course review")
}

export function generateRoboticsJournalMetadata(): Metadata {
  const title = clampTitle("Design Journal", "Robotics & Automation")
  const description =
    "Your robotics design journal: saved sketches, plans, and reflections from every week of the Robotics & Automation course, ready to review or print."
  return roboticsMetadata(title, description, `${roboticsPath}/journal`, "website", "Robotics & Automation design journal")
}

export function generateRoboticsFinalProjectMetadata(): Metadata {
  const title = clampTitle("Capstone Brief: Design a Robot That Helps", "Robotics")
  const description =
    "The Robotics & Automation capstone: choose a mission, plan it, build a robot that uses a sensor, a loop, and a condition, then test it three times."
  return roboticsMetadata(
    title,
    description,
    `${roboticsPath}/final-project`,
    "article",
    "Robotics & Automation final project",
  )
}

/* -------------------------------------------------------------------------- */
/* Intro to Artificial Intelligence                                           */
/* -------------------------------------------------------------------------- */

function introToAiMetadata(
  title: string,
  description: string,
  path: string,
  type: "website" | "article",
  alt: string,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: enOnlyAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      type,
      images: [{ url: "/images/og-default-en.png", width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

export function generateIntroToAiMetadata(): Metadata {
  const title = clampTitle("Intro to AI: 6-Week Course for Kids (Grades 5-8)")
  const description =
    "A six-week AI course for grades 5-8. Learn what AI is and is not, how data trains a model, where it fails, and how to use it responsibly. No coding required."
  return introToAiMetadata(title, description, introToAiPath, "website", `${introToAiCourse.title} course`)
}

export function generateIntroToAiWeekMetadata(week: number): Metadata {
  const courseWeek = getIntroToAiWeek(week)
  if (!courseWeek) return generateIntroToAiMetadata()
  const title = clampTitle(`Week ${courseWeek.week}: ${courseWeek.title}`, "Intro to AI")
  const description = clampDescription(courseWeek.summary)
  return introToAiMetadata(
    title,
    description,
    introToAiWeekPath(courseWeek.week),
    "website",
    `Intro to Artificial Intelligence - Week ${courseWeek.week}: ${courseWeek.title}`,
  )
}

export function generateIntroToAiLessonMetadata(week: number, lessonSlug: string): Metadata {
  const lesson = getIntroToAiLesson(week, lessonSlug)
  if (!lesson) return generateIntroToAiWeekMetadata(week)
  const title = clampTitle(`${lesson.title} (Week ${week})`, "Intro to AI")
  const description = clampDescription(lesson.summary)
  return introToAiMetadata(
    title,
    description,
    introToAiLessonPath(week, lessonSlug),
    "article",
    `Intro to Artificial Intelligence - ${lesson.title}`,
  )
}

export function generateIntroToAiFinalProjectMetadata(): Metadata {
  const title = clampTitle("Final Project: AI Design Studio", "Intro to AI")
  const description =
    "The Intro to AI capstone: design an AI tool that helps real people. Define the problem, decide whether AI fits, prototype it, and plan for fairness and privacy."
  return introToAiMetadata(title, description, introToAiFinalProjectPath, "article", "Intro to Artificial Intelligence final project")
}

export function generateIntroToAiFinalAssessmentMetadata(): Metadata {
  const title = clampTitle("Final Assessment", "Intro to AI")
  const description =
    "A short, self-paced check across all six weeks of the Intro to Artificial Intelligence course. No grades and nothing is sent anywhere."
  return introToAiMetadata(title, description, introToAiFinalAssessmentPath, "website", "Intro to Artificial Intelligence final assessment")
}

export function generateIntroToAiCompletionMetadata(): Metadata {
  const title = clampTitle("Course Completion", "Intro to AI")
  const description =
    "Finish the six-week Intro to Artificial Intelligence course, review what you learned, and print a certificate of completion."
  return introToAiMetadata(title, description, introToAiCompletionPath, "website", "Intro to Artificial Intelligence completion")
}
