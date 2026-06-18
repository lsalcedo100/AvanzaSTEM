import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { getBlogBreadcrumbJsonLd } from "@/features/blog/structured-data"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { siteConfig } from "@/lib/site-config"

const SLUG = "how-to-think-like-an-inventor-in-20-minutes" as const
const DESCRIPTION =
  "A 20-minute design challenge for kids: find a real problem, sketch a solution, build a rough prototype, and test it. Learn the inventor loop Avanza STEM uses in workshops."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION)
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Think Like an Inventor in 20 Minutes",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Liam Salcedo" },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  url: `${siteConfig.url}/blog/how-to-think-like-an-inventor-in-20-minutes`,
}

const breadcrumbJsonLd = getBlogBreadcrumbJsonLd(SLUG)

export default function HowToThinkLikeAnInventorPage() {
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
