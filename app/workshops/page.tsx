import type { Metadata } from "next"
import { WorkshopsPageContent } from "@/components/pages/workshops-page-content"
import { getLanguage } from "@/lib/get-language"
import type { Language } from "@/i18n/translations"
import { enOnlyAlternates } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

const metadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    // 342 impressions at avg position 4.43 but 1.75% CTR. The queries reaching
    // this page are "free stem workshops", "stem workshops", "free workshop"
    // and "interactive stem assemblies" - none of them the programme's own
    // name, which is all the previous title said. The on-page H1 still reads
    // "The Maker Mindset Series".
    title: "Free Hands-On STEM Workshops for Libraries & Schools",
    description:
      "A free three-part STEM workshop series for young learners, covering building, coding, and responsible AI. Hosted with libraries and community partners in New Jersey.",
  },
  es: {
    title: "Serie Mentes Creadoras | Avanza STEM",
    description:
      "Explora la Serie Mentes Creadoras de Avanza STEM, un programa gratuito de tres talleres STEM practicos para jovenes estudiantes sobre construccion, programacion e IA responsable con bibliotecas y socios comunitarios.",
  },
  zh: {
    title: "小小创客系列 | Avanza STEM",
    description:
      "了解 Avanza STEM 的小小创客系列，这是面向年轻学生的免费三部分动手 STEM 工作坊项目，通过图书馆和社区伙伴教授建造、编程和负责任 AI。",
  },
  pt: {
    title: "Série Mentes Criadoras | Avanza STEM",
    description:
      "Conheça a Série Mentes Criadoras da Avanza STEM, um programa gratuito de três oficinas práticas de STEM para jovens estudantes sobre construção, programação e IA responsável, com bibliotecas e parceiros comunitários.",
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
