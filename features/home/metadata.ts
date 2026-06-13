import type { Metadata } from "next"
import { type Language } from "@/i18n/translations"
import { languageAlternates, localizedPath } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

const metadataByLanguage: Record<Language, Pick<Metadata, "title" | "description">> = {
  en: {
    title: "Free Hands-On STEM Workshops and Projects | Avanza STEM",
    description:
      "Avanza STEM is a youth-led program bringing free hands-on STEM workshops and beginner-friendly projects to students, with a special focus on Hispanic and underrepresented communities.",
  },
  es: {
    title: "Talleres y proyectos STEM gratuitos | Avanza STEM",
    description:
      "Avanza STEM es un programa juvenil que ofrece talleres STEM practicos gratuitos y proyectos para principiantes, con un enfoque especial en comunidades hispanas y subrepresentadas.",
  },
  zh: {
    title: "免费的动手 STEM 工作坊和项目 | Avanza STEM",
    description:
      "Avanza STEM 是一个由青年主导的项目，为学生带来免费的动手 STEM 工作坊和适合初学者的项目，特别关注西班牙裔和代表性不足的社区。",
  },
}

const ogImageByLanguage: Record<Language, string> = {
  en: "/images/og-default-en.png",
  es: "/images/og-default-es.png",
  zh: "/images/og-default-zh.png",
}

const ogLocaleByLanguage: Record<Language, string> = {
  en: "en_US",
  es: "es_US",
  zh: "zh_CN",
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
