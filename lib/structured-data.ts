import type { Language } from "@/i18n/translations"
import { localizedPath } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

export type BreadcrumbItem = {
  name: string
  path: string
}

/**
 * Resolves a content image reference to an absolute, percent-encoded URL for
 * JSON-LD.
 *
 * Several blog images have spaces in their filenames ("metal vs wood.jpg").
 * Next's metadata layer encodes those for og:image, but hand-built JSON-LD
 * strings do not, and an unencoded space makes the URL invalid, so Google
 * cannot fetch the image and the Article loses its thumbnail.
 */
export function absoluteImageUrl(image: string): string {
  if (/^https?:\/\//.test(image)) return encodeURI(image)
  return `${siteConfig.url}${encodeURI(image)}`
}

/**
 * Publisher logo for Article-style structured data. Google's logo guidelines
 * accept raster formats only (.jpg/.png/.gif) at 112x112 or larger, so this
 * points at the 180x180 PNG app icon rather than /avanza-logo.svg.
 */
export const publisherLogoUrl = `${siteConfig.url}/apple-icon.png`

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
