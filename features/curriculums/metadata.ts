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
  introToPythonTeacherGuidePath,
  introToPythonWeekPath,
  introToPythonWorksheetsPath,
} from "./intro-to-python/index.ts"
import {
  engineeringCurriculumHasTranslation,
  findEngineeringLesson,
  getEngineeringFundamentalsCurriculum,
} from "./engineering-fundamentals/i18n.ts"
import {
  findAiLesson,
  findAiWeek,
  getIntroToAiCourse,
  introToAiCourseHasTranslation,
} from "./intro-to-ai/i18n.ts"
import {
  findMathLesson,
  getMathAdventuresCurriculum,
  mathCurriculumHasTranslation,
} from "./math-adventures/i18n.ts"
import {
  findRoboticsModule,
  getRoboticsCurriculum,
  roboticsCurriculumHasTranslation,
} from "./robotics/i18n.ts"
import {
  engineeringFundamentalsPath,
  engineeringLessonPath,
  engineeringTeacherGuidePath,
  engineeringWorksheetPath,
} from "./engineering-fundamentals/index.ts"
import {
  scienceExperimentsPath,
  scienceLessonPath,
} from "./science-experiments/index.ts"
import {
  mathAdventuresPath,
  mathLessonPath,
} from "./math-adventures/index.ts"
import {
  roboticsLessonPath,
  roboticsPath,
  roboticsTeacherGuidePath,
  roboticsWorksheetPath,
} from "./robotics/index.ts"
import {
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
/**
 * Open Graph card for a locale.
 *
 * `public/images/` ships one per language; every generator used to hardcode the
 * English card, so a link shared from /es or /zh previewed in English.
 */
function ogImagePath(language: Language): string {
  return `/images/og-default-${language}.png`
}

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
      "Free STEM curriculum resources for kids, teachers, and homeschool families: Python, engineering, science, robotics, math, and AI, with lessons and worksheets.",
  },
  es: {
    title: "Currículo STEM gratuito para niños: Python, ingeniería e IA",
    description:
      "Recursos gratuitos de currículo STEM para niños, maestros y familias que educan en casa: Python, ingeniería, ciencias, robótica, matemáticas e IA.",
  },
  zh: {
    title: "正在开发的 STEM 课程 | Avanza STEM",
    description:
      "面向儿童、老师和在家教育家庭的免费 STEM 课程资源：Python、工程、科学、数学、机器人和 AI 学习路径，附课程、练习页与教师指南。",
  },
  pt: {
    title: "Currículo de STEM Gratuito para Crianças: Python, Engenharia e IA",
    description:
      "Recursos gratuitos de currículo de STEM para crianças, professores e famílias que ensinam em casa: Python, engenharia, ciências, robótica, matemática e IA.",
  },
}


/**
 * Canonical + hreflang for a course page.
 *
 * A course only advertises localized alternates once its content is actually
 * translated. Until then the localized route still exists and renders (with
 * translated chrome and English lesson text), but it points its canonical at
 * the English URL rather than claiming to be a distinct translation.
 *
 * All six courses now ship complete es/zh/pt overlays, so in practice every
 * course page takes the localized branch. The English branch stays for the
 * next course added before its overlays land.
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
          url: ogImagePath(language),
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
      images: [ogImagePath(language)],
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
          url: ogImagePath(language),
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
      images: [ogImagePath(language)],
    },
  }
}

export function generateIntroToPythonTeacherGuideMetadata(language: Language = "en"): Metadata {
  const title = clampTitle("Teacher & Librarian Guide", "Intro to Python")
  const description =
    "How to run each lesson of the 8-week Intro to Python curriculum in a library or classroom: common student mistakes, questions to ask, and offline backups."

  return {
    title,
    description,
    alternates: courseAlternates(
      introToPythonTeacherGuidePath,
      language,
      pythonCurriculumHasTranslation(language),
    ),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${introToPythonTeacherGuidePath}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: ogImagePath(language),
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
      images: [ogImagePath(language)],
    },
  }
}

export function generateIntroToPythonWorksheetsMetadata(language: Language = "en"): Metadata {
  const title = clampTitle("Printable Student Worksheets", "Intro to Python")
  const description =
    "Print-friendly worksheets for every week of the Intro to Python curriculum: the key idea, vocabulary, code planning space, and a debugging question."

  return {
    title,
    description,
    alternates: courseAlternates(
      introToPythonWorksheetsPath,
      language,
      pythonCurriculumHasTranslation(language),
    ),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${introToPythonWorksheetsPath}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: ogImagePath(language),
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
      images: [ogImagePath(language)],
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
          url: ogImagePath(language),
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
      images: [ogImagePath(language)],
    },
  }
}

export function generateMathAdventuresMetadata(language: Language = "en"): Metadata {
  const m = translations[language].courseMeta
  const course = getMathAdventuresCurriculum(language)
  const title = clampTitle(m.mathHubTitle)
  const description = clampDescription(m.mathHubDesc)

  return {
    title,
    description,
    alternates: courseAlternates(
      mathAdventuresPath,
      language,
      mathCurriculumHasTranslation(language),
    ),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${localizedPath(mathAdventuresPath, language)}`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: ogImagePath(language),
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImagePath(language)],
    },
  }
}

export function generateMathLessonMetadata(slug: string, language: Language = "en"): Metadata {
  const lesson = findMathLesson(language, slug)
  if (!lesson) {
    return { title: "Lesson not found | Avanza STEM" }
  }

  const path = mathLessonPath(slug)
  const m = translations[language].courseMeta
  const label = lesson.isFinalProject
    ? m.finalProject
    : formatTemplate(translations[language].courseUi.shared.weekNumber, { n: lesson.weekNumber })
  const title = clampTitle(
    formatTemplate(m.labelTitle, { label, title: lesson.title }),
    m.shortMath,
  )
  const description = clampDescription(lesson.description)

  return {
    title,
    description,
    alternates: courseAlternates(path, language, mathCurriculumHasTranslation(language)),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${localizedPath(path, language)}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: ogImagePath(language),
          width: 1200,
          height: 630,
          alt: formatTemplate(m.altLesson, { course: m.shortMath, label, title: lesson.title }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImagePath(language)],
    },
  }
}

export function generateEngineeringFundamentalsMetadata(language: Language = "en"): Metadata {
  const m = translations[language].courseMeta
  const course = getEngineeringFundamentalsCurriculum(language)
  const title = clampTitle(m.engineeringHubTitle)
  const description = clampDescription(m.engineeringHubDesc)

  return {
    title,
    description,
    alternates: courseAlternates(
      engineeringFundamentalsPath,
      language,
      engineeringCurriculumHasTranslation(language),
    ),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${localizedPath(engineeringFundamentalsPath, language)}`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: ogImagePath(language),
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImagePath(language)],
    },
  }
}

export function generateEngineeringLessonMetadata(
  slug: string,
  language: Language = "en",
): Metadata {
  const lesson = findEngineeringLesson(language, slug)
  if (!lesson) {
    return { title: "Lesson not found | Avanza STEM" }
  }

  const path = engineeringLessonPath(slug)
  const m = translations[language].courseMeta
  const label = engineeringResourceLabel(slug, language)
  const title = clampTitle(
    formatTemplate(m.labelTitle, { label, title: lesson.title }),
    m.shortEngineering,
  )
  const description = clampDescription(lesson.summary)

  return {
    title,
    description,
    alternates: courseAlternates(path, language, engineeringCurriculumHasTranslation(language)),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${localizedPath(path, language)}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: ogImagePath(language),
          width: 1200,
          height: 630,
          alt: formatTemplate(m.altLesson, {
            course: m.shortEngineering,
            label,
            title: lesson.title,
          }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImagePath(language)],
    },
  }
}

function engineeringResourceLabel(slug: string, language: Language): string {
  const lesson = findEngineeringLesson(language, slug)
  const m = translations[language].courseMeta
  if (!lesson) return "Lesson"
  return lesson.isFinal ? m.finalChallenge : formatTemplate(m.lessonNumber, { n: lesson.order })
}

export function generateEngineeringWorksheetMetadata(
  slug: string,
  language: Language = "en",
): Metadata {
  const lesson = findEngineeringLesson(language, slug)
  if (!lesson) {
    return { title: "Worksheet not found | Avanza STEM" }
  }

  const path = engineeringWorksheetPath(slug)
  const m = translations[language].courseMeta
  const label = engineeringResourceLabel(slug, language)
  const title = clampTitle(
    formatTemplate(m.worksheetTitle, { label, title: lesson.title }),
    m.shortEngineering,
  )
  const description = clampDescription(
    formatTemplate(m.engineeringWorksheetDesc, { label, project: lesson.projectName }),
  )

  return {
    title,
    description,
    alternates: courseAlternates(path, language, engineeringCurriculumHasTranslation(language)),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${localizedPath(path, language)}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: ogImagePath(language),
          width: 1200,
          height: 630,
          alt: formatTemplate(m.altWorksheet, {
            course: m.shortEngineering,
            label,
            title: lesson.title,
          }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImagePath(language)],
    },
  }
}

export function generateEngineeringTeacherGuideMetadata(
  slug: string,
  language: Language = "en",
): Metadata {
  const lesson = findEngineeringLesson(language, slug)
  if (!lesson) {
    return { title: "Guide not found | Avanza STEM" }
  }

  const path = engineeringTeacherGuidePath(slug)
  const m = translations[language].courseMeta
  const label = engineeringResourceLabel(slug, language)
  const title = clampTitle(
    formatTemplate(m.guideTitle, { label, title: lesson.title }),
    m.shortEngineering,
  )
  const description = clampDescription(formatTemplate(m.engineeringGuideDesc, { label }))

  return {
    title,
    description,
    alternates: courseAlternates(path, language, engineeringCurriculumHasTranslation(language)),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${localizedPath(path, language)}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: ogImagePath(language),
          width: 1200,
          height: 630,
          alt: formatTemplate(m.altGuide, {
            course: m.shortEngineering,
            label,
            title: lesson.title,
          }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImagePath(language)],
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
          url: ogImagePath(language),
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
      images: [ogImagePath(language)],
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
          url: ogImagePath(language),
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
      images: [ogImagePath(language)],
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
  language: Language = "en",
): Metadata {
  return {
    title,
    description,
    alternates: courseAlternates(path, language, roboticsCurriculumHasTranslation(language)),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${localizedPath(path, language)}`,
      siteName: siteConfig.name,
      type,
      images: [{ url: ogImagePath(language), width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImagePath(language)],
    },
  }
}

export function generateRoboticsMetadata(language: Language = "en"): Metadata {
  const m = translations[language].courseMeta
  const course = getRoboticsCurriculum(language)
  const title = clampTitle(m.roboticsHubTitle)
  const description = clampDescription(m.roboticsHubDesc)
  return roboticsMetadata(title, description, roboticsPath, "website", course.title, language)
}

export function generateRoboticsLessonMetadata(
  slug: string,
  language: Language = "en",
): Metadata {
  const courseModule = findRoboticsModule(language, slug)
  if (!courseModule) return { title: "Lesson not found | Avanza STEM" }
  const m = translations[language].courseMeta
  const label = courseModule.isFinal
    ? m.finalProject
    : formatTemplate(translations[language].courseUi.shared.weekNumber, { n: courseModule.week })
  const title = clampTitle(
    formatTemplate(m.labelTitle, { label, title: courseModule.title }),
    m.shortRobotics,
  )
  const description = clampDescription(courseModule.summary)
  return roboticsMetadata(
    title,
    description,
    roboticsLessonPath(slug),
    "article",
    formatTemplate(m.altLesson, { course: m.shortRobotics, label, title: courseModule.title }),
    language,
  )
}

export function generateRoboticsWorksheetMetadata(
  slug: string,
  language: Language = "en",
): Metadata {
  const courseModule = findRoboticsModule(language, slug)
  if (!courseModule) return { title: "Worksheet not found | Avanza STEM" }
  const m = translations[language].courseMeta
  const label = courseModule.isFinal
    ? m.finalProject
    : formatTemplate(translations[language].courseUi.shared.weekNumber, { n: courseModule.week })
  const title = clampTitle(
    formatTemplate(m.worksheetTitle, { label, title: courseModule.title }),
    m.shortRobotics,
  )
  const description = clampDescription(formatTemplate(m.roboticsWorksheetDesc, { label }))
  return roboticsMetadata(
    title,
    description,
    roboticsWorksheetPath(slug),
    "article",
    formatTemplate(m.altWorksheet, { course: m.shortRobotics, label, title: courseModule.title }),
    language,
  )
}

export function generateRoboticsTeacherGuideMetadata(
  slug: string,
  language: Language = "en",
): Metadata {
  const courseModule = findRoboticsModule(language, slug)
  if (!courseModule) return { title: "Guide not found | Avanza STEM" }
  const m = translations[language].courseMeta
  const label = courseModule.isFinal
    ? m.finalProject
    : formatTemplate(translations[language].courseUi.shared.weekNumber, { n: courseModule.week })
  const title = clampTitle(
    formatTemplate(m.guideTitle, { label, title: courseModule.title }),
    m.shortRobotics,
  )
  const description = clampDescription(formatTemplate(m.roboticsGuideDesc, { label }))
  return roboticsMetadata(
    title,
    description,
    roboticsTeacherGuidePath(slug),
    "article",
    formatTemplate(m.altGuide, { course: m.shortRobotics, label, title: courseModule.title }),
    language,
  )
}

export function generateRoboticsReviewMetadata(language: Language = "en"): Metadata {
  const m = translations[language].courseMeta
  const title = clampTitle(m.roboticsReviewTitle, m.shortRobotics)
  return roboticsMetadata(
    title,
    clampDescription(m.roboticsReviewDesc),
    `${roboticsPath}/review`,
    "website",
    `${m.shortRobotics} - ${m.roboticsReviewTitle}`,
    language,
  )
}

export function generateRoboticsJournalMetadata(language: Language = "en"): Metadata {
  const m = translations[language].courseMeta
  const title = clampTitle(m.roboticsJournalTitle, m.shortRobotics)
  return roboticsMetadata(
    title,
    clampDescription(m.roboticsJournalDesc),
    `${roboticsPath}/journal`,
    "website",
    `${m.shortRobotics} - ${m.roboticsJournalTitle}`,
    language,
  )
}

export function generateRoboticsFinalProjectMetadata(language: Language = "en"): Metadata {
  const m = translations[language].courseMeta
  const title = clampTitle(m.roboticsCapstoneTitle, m.shortRobotics)
  return roboticsMetadata(
    title,
    clampDescription(m.roboticsCapstoneDesc),
    `${roboticsPath}/final-project`,
    "article",
    `${m.shortRobotics} - ${m.roboticsCapstoneTitle}`,
    language,
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
  language: Language = "en",
): Metadata {
  return {
    title,
    description,
    alternates: courseAlternates(path, language, introToAiCourseHasTranslation(language)),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${localizedPath(path, language)}`,
      siteName: siteConfig.name,
      type,
      images: [{ url: ogImagePath(language), width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImagePath(language)],
    },
  }
}

export function generateIntroToAiMetadata(language: Language = "en"): Metadata {
  const m = translations[language].courseMeta
  const course = getIntroToAiCourse(language)
  return introToAiMetadata(
    clampTitle(m.aiHubTitle),
    clampDescription(m.aiHubDesc),
    introToAiPath,
    "website",
    course.title,
    language,
  )
}

export function generateIntroToAiWeekMetadata(
  week: number,
  language: Language = "en",
): Metadata {
  const courseWeek = findAiWeek(language, week)
  if (!courseWeek) return generateIntroToAiMetadata(language)
  const m = translations[language].courseMeta
  const title = clampTitle(
    formatTemplate(m.aiWeekTitle, { n: courseWeek.week, title: courseWeek.title }),
    m.shortAi,
  )
  return introToAiMetadata(
    title,
    clampDescription(courseWeek.summary),
    introToAiWeekPath(courseWeek.week),
    "website",
    formatTemplate(m.altLesson, {
      course: m.shortAi,
      label: formatTemplate(translations[language].courseUi.shared.weekNumber, { n: courseWeek.week }),
      title: courseWeek.title,
    }),
    language,
  )
}

export function generateIntroToAiLessonMetadata(
  week: number,
  lessonSlug: string,
  language: Language = "en",
): Metadata {
  const lesson = findAiLesson(language, week, lessonSlug)
  if (!lesson) return generateIntroToAiWeekMetadata(week, language)
  const m = translations[language].courseMeta
  const title = clampTitle(
    formatTemplate(m.aiLessonTitle, { title: lesson.title, n: week }),
    m.shortAi,
  )
  return introToAiMetadata(
    title,
    clampDescription(lesson.summary),
    introToAiLessonPath(week, lessonSlug),
    "article",
    formatTemplate(m.altLesson, {
      course: m.shortAi,
      label: formatTemplate(translations[language].courseUi.shared.weekNumber, { n: week }),
      title: lesson.title,
    }),
    language,
  )
}

export function generateIntroToAiFinalProjectMetadata(language: Language = "en"): Metadata {
  const m = translations[language].courseMeta
  return introToAiMetadata(
    clampTitle(m.aiFinalProjectTitle, m.shortAi),
    clampDescription(m.aiFinalProjectDesc),
    introToAiFinalProjectPath,
    "article",
    `${m.shortAi} - ${m.aiFinalProjectTitle}`,
    language,
  )
}

export function generateIntroToAiFinalAssessmentMetadata(language: Language = "en"): Metadata {
  const m = translations[language].courseMeta
  return introToAiMetadata(
    clampTitle(m.aiAssessmentTitle, m.shortAi),
    clampDescription(m.aiAssessmentDesc),
    introToAiFinalAssessmentPath,
    "website",
    `${m.shortAi} - ${m.aiAssessmentTitle}`,
    language,
  )
}

export function generateIntroToAiCompletionMetadata(language: Language = "en"): Metadata {
  const m = translations[language].courseMeta
  return introToAiMetadata(
    clampTitle(m.aiCompletionTitle, m.shortAi),
    clampDescription(m.aiCompletionDesc),
    introToAiCompletionPath,
    "website",
    `${m.shortAi} - ${m.aiCompletionTitle}`,
    language,
  )
}
