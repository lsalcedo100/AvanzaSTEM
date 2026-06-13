import { localizedBlogArticles, type BlogSlug } from "@/features/blog/posts"
import { translations, type Language } from "@/i18n/translations"
import { getBreadcrumbJsonLd } from "@/lib/structured-data"

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
