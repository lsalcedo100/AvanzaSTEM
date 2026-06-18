import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { BLOG_POST_META } from "@/features/blog/metadata"
import { type BlogSlug } from "@/features/blog/posts"
import { getBlogBreadcrumbJsonLd } from "@/features/blog/structured-data"
import type { Language } from "@/i18n/translations"
import { siteConfig } from "@/lib/site-config"

/**
 * Shared blog post page used by both the English route (app/blog/[slug]) and
 * the locale-prefixed route (app/[locale]/blog/[slug]) so /es and /zh blog
 * posts render with correctly localized breadcrumb JSON-LD without
 * duplicating page markup.
 */
export function BlogPostPage({ slug, language = "en" }: { slug: BlogSlug; language?: Language }) {
  const meta = BLOG_POST_META[slug]

  const blogPostJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.headline,
    description: meta.description,
    author: { "@type": "Person", name: "Liam Salcedo" },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    url: `${siteConfig.url}/blog/${slug}`,
  }

  const breadcrumbJsonLd = getBlogBreadcrumbJsonLd(slug, language)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
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
