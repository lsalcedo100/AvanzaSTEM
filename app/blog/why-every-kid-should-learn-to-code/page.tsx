import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { getBlogBreadcrumbJsonLd } from "@/features/blog/structured-data"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { siteConfig } from "@/lib/site-config"

const SLUG = "why-every-kid-should-learn-to-code" as const
const DESCRIPTION =
  "Coding teaches problem-solving, creativity, and logic. Learn how to start your child with Python programming. No prior experience needed."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION, "2026-02-20")
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Why Every Kid Should Learn to Code (And How to Start)",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Liam Salcedo" },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  datePublished: "2026-02-20",
  url: `${siteConfig.url}/blog/why-every-kid-should-learn-to-code`,
}

const breadcrumbJsonLd = getBlogBreadcrumbJsonLd(SLUG)

export default function WhyKidsShouldLearnToCodePage() {
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
