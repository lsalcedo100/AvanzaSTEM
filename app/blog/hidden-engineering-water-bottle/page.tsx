import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { getBlogBreadcrumbJsonLd } from "@/features/blog/structured-data"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { siteConfig } from "@/lib/site-config"

const SLUG = "hidden-engineering-water-bottle" as const
const DESCRIPTION =
  "Single-use plastic water bottles are lightweight engineering marvels, but their PET design, cap threads, microplastics, chemical leaching concerns, and waste all come with trade-offs."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION)
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "The Hidden Engineering of a Water Bottle",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Enqi Qi" },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
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
