import type { Metadata } from "next"
import { translations, type Language } from "@/i18n/translations"
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
 *
 * Each description opens with that language's home hero headline
 * (`home.heroTitle`), word for word, then lists what the site publishes. The
 * headline is the sentence people remember and type back into a search box, and
 * before this it existed only in the <h1>: nothing in <head> repeated it, so a
 * search for the site's own tagline had one weak match to go on. Descriptions
 * stay under ~160 characters. If the hero headline is reworded, reword the
 * opening sentence here to match.
 */
const metadataByLanguage: Record<Language, Pick<Metadata, "title" | "description">> = {
  en: {
    title: "Free STEM Resources for Kids: Projects, Courses & Labs",
    description:
      "Free STEM resources and hands-on workshops for kids, made by students. Project guides, course paths, printable worksheets, browser labs, and free workshops.",
  },
  es: {
    title: "Recursos STEM gratuitos para niños: proyectos y cursos",
    description:
      "Recursos STEM y talleres prácticos gratuitos para niños, hechos por jóvenes. Guías de proyectos, cursos completos, hojas imprimibles y laboratorios en línea.",
  },
  zh: {
    title: "免费儿童 STEM 资源：项目、课程与实验",
    description:
      "免费的 STEM 资源与动手工作坊，由学生亲手打造。分步项目指南、完整课程路径、可打印练习页、浏览器互动实验，以及在公共图书馆举办的免费工作坊。",
  },
  pt: {
    title: "Recursos de STEM gratuitos para crianças: projetos e cursos",
    description:
      "Recursos de STEM e oficinas práticas gratuitas para crianças, feitos por estudantes. Guias de projeto, cursos, folhas para imprimir e laboratórios online.",
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

/**
 * WebPage node for the home page, tying it into the sitewide entity graph from
 * app/layout.tsx (`#website` and `#organization`).
 *
 * `headline` is read from the same translation key the <h1> renders, so the
 * structured data always states the tagline exactly as the page shows it and
 * cannot drift when the hero copy is edited.
 */
export function getHomeWebPageJsonLd(language: Language) {
  const { title, description } = metadataByLanguage[language]
  const url = `${siteConfig.url}${localizedPath("/", language)}`

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    headline: translations[language].home.heroTitle,
    description,
    inLanguage: language,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${ogImageByLanguage[language]}`,
      width: 1200,
      height: 630,
    },
  }
}
