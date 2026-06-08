import type { Metadata } from "next"
import { cookies } from "next/headers"
import type { Language } from "@/i18n/translations"
import { AboutPageContent } from "@/components/pages/about-page-content"

const VALID_LANGUAGES: Language[] = ["en", "es", "zh"]

const metadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    title: "About | Avanza STEM",
    description:
      "Learn about Avanza STEM - a free STEM education initiative for young Hispanic students, founded in New Jersey.",
  },
  es: {
    title: "Nosotros | Avanza STEM",
    description:
      "Conoce Avanza STEM, una iniciativa gratuita de educación STEM para jóvenes estudiantes hispanos fundada en Nueva Jersey.",
  },
  zh: {
    title: "关于我们 | Avanza STEM",
    description:
      "了解 Avanza STEM——一个为新泽西州年轻西班牙裔学生提供免费 STEM 教育的公益项目。",
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const rawLang = cookieStore.get("avanza-lang")?.value
  const language: Language = VALID_LANGUAGES.includes(rawLang as Language)
    ? (rawLang as Language)
    : "en"
  return metadataByLanguage[language]
}

export default function AboutPage() {
  return <AboutPageContent />
}
