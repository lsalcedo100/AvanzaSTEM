import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { type BlogSlug } from "@/features/blog/posts"
import { getBlogBreadcrumbJsonLd, getBlogPostingJsonLd } from "@/features/blog/structured-data"
import type { Language } from "@/i18n/translations"

/**
 * Shared blog post page used by both the English route (app/blog/[slug]) and
 * the locale-prefixed route (app/[locale]/blog/[slug]) so /es and /zh blog
 * posts render with correctly localized BlogPosting and breadcrumb JSON-LD
 * without duplicating page markup.
 */
export function BlogPostPage({ slug, language = "en" }: { slug: BlogSlug; language?: Language }) {
  const blogPostJsonLd = getBlogPostingJsonLd(slug, language)
  const breadcrumbJsonLd = getBlogBreadcrumbJsonLd(slug, language)

  return (
    <>
      {blogPostJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
        />
      ) : null}
      {breadcrumbJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      ) : null}
      <LocalizedBlogPost slug={slug} />
    </>
  )
}
