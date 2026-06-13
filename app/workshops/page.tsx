import type { Metadata } from "next"
import { WorkshopsPageContent } from "@/components/pages/workshops-page-content"
import { getLanguage } from "@/lib/get-language"
import type { Language } from "@/i18n/translations"
import { enOnlyAlternates } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

const metadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    title: "The Maker Mindset Series | Avanza STEM",
    description:
      "Explore Avanza STEM's Maker Mindset Series, a free three part hands on STEM workshop program for young learners covering building, coding, and responsible AI through libraries and community partners.",
  },
  es: {
    title: "La Serie Mentalidad Maker | Avanza STEM",
    description:
      "Explora la Serie Mentalidad Maker de Avanza STEM, un programa gratuito de tres talleres STEM practicos para jovenes estudiantes sobre construccion, programacion e IA responsable con bibliotecas y socios comunitarios.",
  },
  zh: {
    title: "创客思维系列 | Avanza STEM",
    description:
      "了解 Avanza STEM 的创客思维系列，这是面向年轻学生的免费三部分动手 STEM 工作坊项目，通过图书馆和社区伙伴教授建造、编程和负责任 AI。",
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLanguage()
  const { title, description } = metadataByLanguage[language]

  return {
    title,
    description,
    alternates: {
      canonical: "/workshops",
      languages: enOnlyAlternates("/workshops"),
    },
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
