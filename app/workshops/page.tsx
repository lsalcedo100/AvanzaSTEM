import type { Metadata } from "next"
import { WorkshopsPageContent } from "@/components/pages/workshops-page-content"
import { getLanguage } from "@/lib/get-language"
import type { Language } from "@/i18n/translations"
import { siteConfig } from "@/lib/site-config"

const metadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    title: "Free STEM Workshops for Kids | Avanza STEM",
    description:
      "Explore Avanza STEM's free in-person STEM workshops for young learners, including hands-on engineering, Python coding, and responsible AI activities through community partners.",
  },
  es: {
    title: "Talleres STEM gratuitos para ninos | Avanza STEM",
    description:
      "Explora los talleres STEM presenciales y gratuitos de Avanza STEM para jovenes estudiantes, con actividades practicas de ingenieria, programacion en Python e IA responsable junto a aliados comunitarios.",
  },
  zh: {
    title: "儿童免费 STEM 工作坊 | Avanza STEM",
    description:
      "了解 Avanza STEM 为年轻学生提供的免费线下 STEM 工作坊，包括与社区伙伴合作开展的工程、Python 编程和负责任 AI 实践活动。",
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLanguage()
  const { title, description } = metadataByLanguage[language]

  return {
    title,
    description,
    alternates: { canonical: "/workshops" },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/workshops`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "/images/og-default-en.png",
          width: 1200,
          height: 630,
          alt: "Avanza STEM Workshops",
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

export default function WorkshopsPage() {
  return <WorkshopsPageContent />
}
