import type { Metadata } from "next"
import { type Language } from "@/i18n/translations"
import { languageAlternates, localizedPath } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"
import {
  getIntroToPythonWeek,
  introToPythonCurriculum,
  introToPythonTeacherGuidePath,
  introToPythonWeekPath,
  introToPythonWorksheetsPath,
} from "@/features/curriculums/intro-to-python"
import {
  engineeringFundamentalsCurriculum,
  engineeringFundamentalsPath,
  engineeringLessonPath,
  engineeringTeacherGuidePath,
  engineeringWorksheetPath,
  getEngineeringLesson,
} from "@/features/curriculums/engineering-fundamentals"
import {
  getScienceLesson,
  scienceExperimentsCurriculum,
  scienceExperimentsPath,
  scienceLessonPath,
} from "@/features/curriculums/science-experiments"
import {
  getMathLessonBySlug,
  mathAdventuresCurriculum,
  mathAdventuresPath,
  mathLessonPath,
} from "@/features/curriculums/math-adventures"
import {
  getRoboticsModule,
  roboticsCurriculum,
  roboticsLessonPath,
  roboticsPath,
  roboticsTeacherGuidePath,
  roboticsWorksheetPath,
} from "@/features/curriculums/robotics"
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
} from "@/features/curriculums/intro-to-ai"

const metadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    title: "Free STEM Curriculum Paths for Kids: Python, Engineering & AI | Avanza STEM",
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

export function generateIntroToPythonWeekMetadata(week: number): Metadata {
  const lesson = getIntroToPythonWeek(week)
  if (!lesson) {
    return { title: "Lesson not found | Avanza STEM" }
  }

  const path = introToPythonWeekPath(week)
  const title = `Week ${lesson.week}: ${lesson.title} - Intro to Python | Avanza STEM`
  const description = `Week ${lesson.week} of the Intro to Python curriculum (${introToPythonCurriculum.gradeRange}). ${lesson.description}`

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: languageAlternates(path),
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
  const title = "Teacher & Librarian Guide: Intro to Python Curriculum | Avanza STEM"
  const description =
    "A facilitation guide for the 8-week Intro to Python curriculum: how to run each lesson in a library or classroom, common student mistakes, questions to ask, and offline backup activities. No coding background required."

  return {
    title,
    description,
    alternates: {
      canonical: introToPythonTeacherGuidePath,
      languages: languageAlternates(introToPythonTeacherGuidePath),
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
  const title = "Printable Student Worksheets: Intro to Python Curriculum | Avanza STEM"
  const description =
    "Printable, print-friendly worksheets for each week of the Intro to Python curriculum, with the key idea, vocabulary, code planning space, a debugging question, and a reflection question."

  return {
    title,
    description,
    alternates: {
      canonical: introToPythonWorksheetsPath,
      languages: languageAlternates(introToPythonWorksheetsPath),
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

export function generateIntroToPythonMetadata(): Metadata {
  const title = "Intro to Python Programming: 8-Week Beginner Curriculum (Grades 3-6) | Avanza STEM"
  const description =
    "An 8-week beginner Python curriculum for grades 3-6. One concept per week, from print() and variables to loops, functions, and a final build-your-own game project."

  return {
    title,
    description,
    alternates: {
      canonical: INTRO_TO_PYTHON_PATH,
      languages: languageAlternates(INTRO_TO_PYTHON_PATH),
    },
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
    "Math Adventures: 10-Week Guided Math Course (Grades 2-5) | Avanza STEM"
  const description =
    "A 10-week guided math course for grades 2-5. Each week turns one big idea - number sense, operations, patterns, place value, fractions, measurement, geometry, time and money, and data - into a hands-on adventure, ending with a Build a Math City project."

  return {
    title,
    description,
    alternates: {
      canonical: mathAdventuresPath,
      languages: languageAlternates(mathAdventuresPath),
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
  const title = `${label}: ${lesson.title} - Math Adventures | Avanza STEM`
  const description = `${label} of the Math Adventures course (${mathAdventuresCurriculum.gradeRange}). ${lesson.description}`

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: languageAlternates(path),
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
    "Engineering Fundamentals: 6-Week Hands-On Curriculum (Grades 2-5) | Avanza STEM"
  const description =
    "A 6-week hands-on engineering curriculum for grades 2-5. Kids build, test, and redesign towers, bridges, machines, gliders, and a final rescue system using everyday materials - no computer needed."

  return {
    title,
    description,
    alternates: {
      canonical: engineeringFundamentalsPath,
      languages: languageAlternates(engineeringFundamentalsPath),
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
  const title = `${label}: ${lesson.title} - Engineering Fundamentals | Avanza STEM`
  const description = `${label} of the Engineering Fundamentals curriculum (${engineeringFundamentalsCurriculum.gradeRange}). ${lesson.summary}`

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: languageAlternates(path),
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
  const title = `Printable Worksheet - ${label}: ${lesson.title} | Engineering Fundamentals | Avanza STEM`
  const description = `A printable student worksheet for ${label} of the Engineering Fundamentals curriculum: ${lesson.projectName}. Problem, materials checklist, sketch area, test results table, and reflection.`

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: languageAlternates(path),
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
  const title = `Parent & Teacher Guide - ${label}: ${lesson.title} | Engineering Fundamentals | Avanza STEM`
  const description = `A facilitator guide for ${label} of the Engineering Fundamentals curriculum: setup, materials prep, safety notes, common failure points, questions to ask, and easier and harder versions.`

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: languageAlternates(path),
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

export function generateScienceExperimentsMetadata(): Metadata {
  const c = scienceExperimentsCurriculum
  const title =
    "Science Experiments: 6-Week Hands-On Curriculum (Grades 2-4) | Avanza STEM"
  const description =
    "A 6-week hands-on science curriculum for grades 2-4. Kids run one safe, low-cost experiment a week - from chemical reactions to forces to living things - using the same ask, predict, test, observe, explain, improve loop real scientists use."

  return {
    title,
    description,
    alternates: {
      canonical: scienceExperimentsPath,
      languages: languageAlternates(scienceExperimentsPath),
    },
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

export function generateScienceLessonMetadata(slug: string): Metadata {
  const lesson = getScienceLesson(slug)
  if (!lesson) {
    return { title: "Lesson not found | Avanza STEM" }
  }

  const path = scienceLessonPath(slug)
  const label = `Week ${lesson.week}`
  const title = `${label}: ${lesson.title} - Science Experiments | Avanza STEM`
  const description = `${label} of the Science Experiments curriculum (${scienceExperimentsCurriculum.gradeRange}). ${lesson.bigQuestion} ${lesson.explanation}`.slice(0, 300)

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: languageAlternates(path),
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
          alt: `Science Experiments - ${label}: ${lesson.title}`,
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
      languages: languageAlternates(path),
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
  const title = "Robotics & Automation: 8-Week Course for Kids (Grades 4-6) | Avanza STEM"
  const description =
    "An 8-week robotics course for grades 4-6. Learn what makes something a robot, build a base that moves, program exact instructions, add sensors, make robots react, debug for reliability, and design a robot that helps - with a robot kit, a browser simulator, or unplugged."
  return roboticsMetadata(title, description, roboticsPath, "website", `${roboticsCurriculum.title} course`)
}

export function generateRoboticsLessonMetadata(slug: string): Metadata {
  const courseModule = getRoboticsModule(slug)
  if (!courseModule) return { title: "Lesson not found | Avanza STEM" }
  const label = courseModule.isFinal ? "Final Project" : `Week ${courseModule.week}`
  const title = `${label}: ${courseModule.title} - Robotics & Automation | Avanza STEM`
  const description = `${label} of the Robotics & Automation course (${roboticsCurriculum.gradeRange}). ${courseModule.summary}`.slice(0, 300)
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
  const title = `Printable Worksheet - ${label}: ${courseModule.title} | Robotics & Automation | Avanza STEM`
  const description = `A printable student worksheet for ${label} of the Robotics & Automation course: key ideas, vocabulary, activity space, testing tables, and reflection.`
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
  const title = `Parent & Teacher Guide - ${label}: ${courseModule.title} | Robotics & Automation | Avanza STEM`
  const description = `A facilitator guide for ${label} of the Robotics & Automation course: setup, materials prep, facilitation, common misconceptions, questions to ask, and easier and harder versions.`
  return roboticsMetadata(
    title,
    description,
    roboticsTeacherGuidePath(slug),
    "article",
    `Robotics & Automation teacher guide - ${label}: ${courseModule.title}`,
  )
}

export function generateRoboticsReviewMetadata(): Metadata {
  const title = "Course Review - Robotics & Automation | Avanza STEM"
  const description =
    "Review your progress through the 8-week Robotics & Automation course: what you completed, your knowledge-check scores, and where to pick back up."
  return roboticsMetadata(title, description, `${roboticsPath}/review`, "website", "Robotics & Automation course review")
}

export function generateRoboticsJournalMetadata(): Metadata {
  const title = "Design Journal - Robotics & Automation | Avanza STEM"
  const description =
    "Your robotics design journal: saved sketches, plans, and reflections from every week of the Robotics & Automation course, ready to review or print."
  return roboticsMetadata(title, description, `${roboticsPath}/journal`, "website", "Robotics & Automation design journal")
}

export function generateRoboticsFinalProjectMetadata(): Metadata {
  const title = "Final Project: Design a Robot That Helps - Robotics & Automation | Avanza STEM"
  const description =
    "The Robotics & Automation final project: choose a mission, plan it, build or simulate a robot that uses a sensor, a loop, and a condition, test it three times, and explain how it helps."
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
      languages: languageAlternates(path),
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
  const title = "Intro to Artificial Intelligence: 6-Week Course for Kids (Grades 5-8) | Avanza STEM"
  const description =
    "A six-week AI course for grades 5-8. Learn what AI is and is not, how data trains a model, how image and text AI work and where they fail, how to use AI responsibly, and design your own AI in a design studio. No coding required."
  return introToAiMetadata(title, description, introToAiPath, "website", `${introToAiCourse.title} course`)
}

export function generateIntroToAiWeekMetadata(week: number): Metadata {
  const courseWeek = getIntroToAiWeek(week)
  if (!courseWeek) return generateIntroToAiMetadata()
  const title = `Week ${courseWeek.week}: ${courseWeek.title} - Intro to Artificial Intelligence | Avanza STEM`
  const description = `Week ${courseWeek.week} of the Intro to Artificial Intelligence course (${introToAiCourse.gradeRange}). ${courseWeek.summary}`.slice(0, 300)
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
  const title = `${lesson.title} (Week ${week}) - Intro to Artificial Intelligence | Avanza STEM`
  const description = `${lesson.summary}`.slice(0, 300)
  return introToAiMetadata(
    title,
    description,
    introToAiLessonPath(week, lessonSlug),
    "article",
    `Intro to Artificial Intelligence - ${lesson.title}`,
  )
}

export function generateIntroToAiFinalProjectMetadata(): Metadata {
  const title = "Final Project: AI Design Studio - Intro to Artificial Intelligence | Avanza STEM"
  const description =
    "The Intro to AI final project: design an AI tool that helps a real group of people. Define the problem, decide whether AI fits, plan inputs and outputs, prototype, test, and plan for fairness, privacy, and human oversight."
  return introToAiMetadata(title, description, introToAiFinalProjectPath, "article", "Intro to Artificial Intelligence final project")
}

export function generateIntroToAiFinalAssessmentMetadata(): Metadata {
  const title = "Final Assessment - Intro to Artificial Intelligence | Avanza STEM"
  const description =
    "A short, self-paced check across all six weeks of the Intro to Artificial Intelligence course. No grades and nothing is sent anywhere."
  return introToAiMetadata(title, description, introToAiFinalAssessmentPath, "website", "Intro to Artificial Intelligence final assessment")
}

export function generateIntroToAiCompletionMetadata(): Metadata {
  const title = "Course Completion - Intro to Artificial Intelligence | Avanza STEM"
  const description =
    "Finish the six-week Intro to Artificial Intelligence course, review what you learned, and print a certificate of completion."
  return introToAiMetadata(title, description, introToAiCompletionPath, "website", "Intro to Artificial Intelligence completion")
}
