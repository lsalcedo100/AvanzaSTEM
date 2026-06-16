import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { getBlogBreadcrumbJsonLd } from "@/features/blog/structured-data"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { siteConfig } from "@/lib/site-config"

const SLUG = "hidden-engineering-water-bottle" as const
const DESCRIPTION =
  "A water bottle solves more engineering problems than you might think. Shape, cap threads, wall thickness, opening size, and grip are all deliberate design decisions."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION, "2026-07-02")
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "The Hidden Engineering of a Water Bottle",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Enqi Qi" },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  datePublished: "2026-07-02",
  url: `${siteConfig.url}/blog/hidden-engineering-water-bottle`,
}

const breadcrumbJsonLd = getBlogBreadcrumbJsonLd(SLUG)

export default function HiddenEngineeringWaterBottlePage() {
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
      <LocalizedBlogPost slug={SLUG} />
    </>
  )
}
