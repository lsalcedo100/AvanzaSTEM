import type { Metadata } from "next"
import { type Language } from "@/i18n/translations"
import { languageAlternates, localizedPath } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

/**
 * The home page is the site's strongest URL, so its title targets the broad
 * head term the rest of the site only answers page by page: people looking for
 * "STEM resources for kids" (and the "free STEM resources" / "STEM activities
 * for kids" variants) land on a hub, not on a single project guide.
 *
 * The old title led with "Workshops and Projects", which names two of the five
 * things the site publishes and matches only visitors who already know they
 * want a workshop. "Resources" is the word parents, teachers and librarians
 * actually search with, and it is honest here: the page links out to project
 * guides, course paths, printable worksheets, browser labs and workshops.
 *
 * Titles are kept under ~60 characters so they survive SERP truncation, and
 * the brand is dropped from the English title because Google renders the site
 * name beside it regardless.
 */
const metadataByLanguage: Record<Language, Pick<Metadata, "title" | "description">> = {
  en: {
    title: "Free STEM Resources for Kids: Projects, Courses & Labs",
    description:
      "Free STEM resources for kids, parents, and teachers: step-by-step project guides, full course paths, printable worksheets, browser labs, and free workshops.",
  },
  es: {
    title: "Recursos STEM gratuitos para niños: proyectos y cursos",
    description:
      "Recursos STEM gratuitos para niños, familias y maestros: guías de proyectos paso a paso, cursos completos, hojas imprimibles y talleres prácticos gratis.",
  },
  zh: {
    title: "免费儿童 STEM 资源：项目、课程与实验",
    description:
      "面向儿童、家长和老师的免费 STEM 资源：分步项目指南、完整课程路径、可打印练习页、浏览器互动实验，以及免费的动手 STEM 工作坊。",
  },
  pt: {
    title: "Recursos de STEM gratuitos para crianças: projetos e cursos",
    description:
      "Recursos de STEM gratuitos para crianças, famílias e professores: guias de projeto passo a passo, trilhas de curso, folhas para imprimir e oficinas gratuitas.",
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
