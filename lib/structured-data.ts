import type { Language } from "@/i18n/translations"
import { localizedPath } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

export type BreadcrumbItem = {
  name: string
  path: string
}

/**
 * Builds a schema.org BreadcrumbList using absolute canonical URLs from
 * siteConfig.url. Shared by project guide pages and blog post pages. Paths are
 * canonical (English) paths; they are prefixed for the given language (e.g.
 * "/projects" -> "/es/projects") so BreadcrumbList items link to the correct
 * localized route.
 */
export function getBreadcrumbJsonLd(items: BreadcrumbItem[], language: Language = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${localizedPath(item.path, language)}`,
    })),
  }
}
