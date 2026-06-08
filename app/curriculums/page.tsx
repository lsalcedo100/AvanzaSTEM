import type { Metadata } from "next"
import { CurriculumsPageContent } from "@/components/pages/curriculums-page-content"
import { getLanguage } from "@/lib/get-language"
import type { Language } from "@/i18n/translations"

const BASE_URL = "https://avanzastem.org"

const metadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    title: "STEM Curriculums in Development | Avanza STEM",
    description:
      "Preview Avanza STEM curriculum topics in development, including Python, engineering, science, math, robotics, and AI lessons for young learners.",
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

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLanguage()
  const { title, description } = metadataByLanguage[language]

  return {
    title,
    description,
    alternates: { canonical: "/curriculums" },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/curriculums`,
      siteName: "Avanza STEM",
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

export default function CurriculumsPage() {
  return <CurriculumsPageContent />
}
