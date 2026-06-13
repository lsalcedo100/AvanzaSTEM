import type { Metadata } from "next"
import { type Language } from "@/i18n/translations"
import { languageAlternates, localizedPath } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

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
