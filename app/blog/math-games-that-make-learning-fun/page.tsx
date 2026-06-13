import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { getBlogBreadcrumbJsonLd } from "@/features/blog/structured-data"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { siteConfig } from "@/lib/site-config"

const SLUG = "math-games-that-make-learning-fun" as const
const DESCRIPTION =
  "Six math games that turn number practice into playtime for grades 2-5. Build number sense, fractions, and logic skills - no worksheets needed."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION, "2026-01-20")
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Math Games That Make Learning Fun",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Liam Salcedo" },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  datePublished: "2026-01-20",
  url: `${siteConfig.url}/blog/math-games-that-make-learning-fun`,
}

const breadcrumbJsonLd = getBlogBreadcrumbJsonLd(SLUG)

export default function MathGamesThatMakeLearningFunPage() {
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
