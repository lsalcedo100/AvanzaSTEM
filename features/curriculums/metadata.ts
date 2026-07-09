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
