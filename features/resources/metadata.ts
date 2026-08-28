import type { Metadata } from "next"
import { OG_LOCALE_BY_LANGUAGE } from "@/features/blog/metadata"
import { RESOURCE_ITEMS, type ResourceCounts } from "@/features/resources/catalog"
import { getResourceCounts } from "@/features/resources/counts"
import { translations, type Language } from "@/i18n/translations"
import { formatTemplate } from "@/lib/format-template"
import { languageAlternates, localizedPath } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"
import { getBreadcrumbJsonLd } from "@/lib/structured-data"

const PATH = "/resources"
const OG_IMAGE = "/images/og-default-en.png"

/**
 * The hub's meta description names how much of each thing the site actually
 * has. Those numbers are the reason to click, and interpolating them from the
 * content data means the SERP snippet can never advertise a count the page no
 * longer shows.
 */
function describe(language: Language, counts: ResourceCounts): string {
  return formatTemplate(translations[language].resourcesPage.metaDesc, {
    projects: counts.projects,
    courses: counts.courses,
    labs: counts.labs,
    articles: counts.articles,
  })
}

export function generateResourcesMetadata(language: Language = "en"): Metadata {
  const counts = getResourceCounts()
  const title = translations[language].resourcesPage.metaTitle
  const description = describe(language, counts)
  const url = `${siteConfig.url}${localizedPath(PATH, language)}`

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath(PATH, language),
      languages: languageAlternates(PATH),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: OG_LOCALE_BY_LANGUAGE[language],
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  }
}

/**
 * CollectionPage + ItemList for the hub.
 *
 * The ItemList entries are the six section hubs the page links to, each as a
 * CollectionPage of its own, which is what tells a crawler that /resources sits
 * above them rather than duplicating them. Names and descriptions are the same
 * strings the cards render, so nothing here describes content a visitor cannot
 * see on the page.
 */
export function getResourcesJsonLd(language: Language = "en") {
  const counts = getResourceCounts()
  const r = translations[language].resourcesPage
  const url = `${siteConfig.url}${localizedPath(PATH, language)}`

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    name: r.heroTitle,
    description: describe(language, counts),
    url,
    inLanguage: language,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    isAccessibleForFree: true,
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "Kids, parents, teachers, and librarians",
    },
    mainEntity: {
      "@type": "ItemList",
      name: r.catalogHeading,
      numberOfItems: RESOURCE_ITEMS.length,
      itemListElement: RESOURCE_ITEMS.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CollectionPage",
          name: r.items[item.id].name,
          description: r.items[item.id].desc,
          url: `${siteConfig.url}${localizedPath(item.href, language)}`,
          isAccessibleForFree: true,
        },
      })),
    },
  }
}

/** BreadcrumbList for the hub (Home > Resources). */
export function getResourcesBreadcrumbJsonLd(language: Language = "en") {
  const t = translations[language].nav
  return getBreadcrumbJsonLd(
    [
      { name: t.home, path: "/" },
      { name: t.resources, path: PATH },
    ],
    language,
  )
}
