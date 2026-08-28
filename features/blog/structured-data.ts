import {
  BLOG_POST_AUTHORS,
  BLOG_POST_DATES,
  BLOG_POST_META,
  getBlogPostDescription,
} from "@/features/blog/metadata"
import { localizedBlogArticles, type BlogSlug } from "@/features/blog/posts"
import { translations, type Language } from "@/i18n/translations"
import { localizedPath } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"
import { absoluteImageUrl, getBreadcrumbJsonLd, publisherLogoUrl } from "@/lib/structured-data"

/**
 * BlogPosting JSON-LD for a post, in the language the page is rendered in.
 *
 * Replaces the per-route inline objects, which were missing datePublished,
 * dateModified, image, mainEntityOfPage, inLanguage and a publisher logo (so no
 * post was eligible for an Article rich result), and which hardcoded the
 * English URL even when rendered at /es, /zh or /pt.
 */
export function getBlogPostingJsonLd(slug: BlogSlug, language: Language = "en") {
  const article =
    (language !== "en" ? localizedBlogArticles[language]?.[slug] : undefined) ??
    localizedBlogArticles.en[slug]
  if (!article) return null

  const url = `${siteConfig.url}${localizedPath(`/blog/${slug}`, language)}`
  const { datePublished, dateModified } = BLOG_POST_DATES[slug]
  // Posts awaiting a real photo carry an empty `image`; omit the property
  // rather than emitting a URL that resolves to the site root.
  const image = article.image ? absoluteImageUrl(article.image) : undefined

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: language === "en" ? BLOG_POST_META[slug].headline : article.title,
    description: getBlogPostDescription(slug, language),
    ...(image ? { image: [image] } : {}),
    inLanguage: language,
    datePublished,
    dateModified,
    author: { "@type": "Person", name: BLOG_POST_AUTHORS[slug] },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: publisherLogoUrl,
        width: 180,
        height: 180,
      },
    },
    isPartOf: {
      "@type": "Blog",
      name: "Avanza STEM Blog",
      url: `${siteConfig.url}${localizedPath("/blog", language)}`,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  }
}

export function getBlogBreadcrumbJsonLd(slug: BlogSlug, language: Language = "en") {
  const article = localizedBlogArticles[language]?.[slug] ?? localizedBlogArticles.en[slug]
  if (!article) return null

  const t = translations[language]

  return getBreadcrumbJsonLd(
    [
      { name: t.nav.home, path: "/" },
      { name: t.nav.blog, path: "/blog" },
      { name: article.title, path: `/blog/${slug}` },
    ],
    language,
  )
}
