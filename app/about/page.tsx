import type { Metadata } from "next"
import type { Language } from "@/i18n/translations"
import { AboutPageContent } from "@/components/pages/about-page-content"
import { getLanguage } from "@/lib/get-language"
import { enOnlyAlternates } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

const metadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    title: "About Avanza STEM: Free Bilingual STEM Workshops",
    description:
      "Learn about Avanza STEM, a youth-led volunteer program bringing free bilingual STEM workshops and beginner-friendly projects to students.",
  },
  es: {
    title: "Nosotros | Avanza STEM",
    description:
      "Conoce Avanza STEM, un programa juvenil de voluntariado que ofrece talleres STEM practicos gratuitos y proyectos para principiantes.",
  },
  zh: {
    title: "关于我们 | Avanza STEM",
    description:
      "了解 Avanza STEM，一个由青年主导的志愿项目，为学生带来免费的动手 STEM 工作坊和适合初学者的项目。",
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLanguage()
  const { title, description } = metadataByLanguage[language]
  return {
    title,
    description,
    alternates: {
      canonical: "/about",
      languages: enOnlyAlternates("/about"),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/about`,
      siteName: siteConfig.name,
      type: "website",
    },
  }
}

export default function AboutPage() {
  return <AboutPageContent />
}
