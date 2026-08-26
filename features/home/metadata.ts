import type { Metadata } from "next"
import { type Language } from "@/i18n/translations"
import { languageAlternates, localizedPath } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

const metadataByLanguage: Record<Language, Pick<Metadata, "title" | "description">> = {
  en: {
    title: "Free Hands-On STEM Workshops and Projects | Avanza STEM",
    description:
      "Free hands-on STEM workshops and step-by-step projects for kids, run by students. Bridges, circuits, Python, robotics, and science - all free and bilingual.",
  },
  es: {
    title: "Talleres y proyectos STEM gratuitos | Avanza STEM",
    description:
      "Talleres STEM gratuitos y proyectos paso a paso para niños, dirigidos por estudiantes. Puentes, circuitos, Python, robótica y ciencia, gratis y en dos idiomas.",
  },
  zh: {
    title: "免费的动手 STEM 工作坊和项目 | Avanza STEM",
    description:
      "Avanza STEM 是一个由青年主导的项目，为学生带来免费的动手 STEM 工作坊和适合初学者的项目，特别关注西班牙裔和代表性不足的社区。",
  },
  pt: {
    title: "Oficinas e projetos de STEM gratuitos | Avanza STEM",
    description:
      "Oficinas de STEM gratuitas e projetos passo a passo para crianças, conduzidos por estudantes. Pontes, circuitos, Python, robótica e ciências, tudo de graça e em mais de um idioma.",
  },
}

const ogImageByLanguage: Record<Language, string> = {
  en: "/images/og-default-en.png",
  es: "/images/og-default-es.png",
  zh: "/images/og-default-zh.png",
  pt: "/images/og-default-pt.png",
}

const ogLocaleByLanguage: Record<Language, string> = {
  en: "en_US",
  es: "es_US",
  zh: "zh_CN",
  pt: "pt_BR",
}

export function generateHomeMetadata(language: Language): Metadata {
  const { title, description } = metadataByLanguage[language]
  const ogImage = ogImageByLanguage[language]

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath("/", language),
      languages: languageAlternates("/"),
    },
    openGraph: {
      title: title as string,
      description: description as string,
      url: `${siteConfig.url}${localizedPath("/", language)}`,
      siteName: siteConfig.name,
      locale: ogLocaleByLanguage[language],
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Avanza STEM",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title as string,
      description: description as string,
      images: [ogImage],
    },
  }
}
