import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { getBlogBreadcrumbJsonLd } from "@/features/blog/structured-data"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { siteConfig } from "@/lib/site-config"

const SLUG = "why-chairs-break" as const
const DESCRIPTION =
  "Chair strength comes down to weight distribution, material choice, joint quality, and shape. Learn why wobbly chairs are a warning sign and what engineers do about it."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION)
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Why Do Some Chairs Break and Others Don't?",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Enqi Qi" },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  url: `${siteConfig.url}/blog/why-chairs-break`,
}

const breadcrumbJsonLd = getBlogBreadcrumbJsonLd(SLUG)

export default function WhyChairsBreakPage() {
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
