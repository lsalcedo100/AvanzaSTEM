import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { getBlogBreadcrumbJsonLd } from "@/features/blog/structured-data"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { siteConfig } from "@/lib/site-config"

const SLUG = "how-factory-robots-build-cars" as const
const DESCRIPTION =
  "Factory robots weld, paint, and move car parts with precision and consistency. Learn how robotic arms are programmed, kept safe, and used alongside human workers."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION, "2026-10-08")
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How Factory Robots Build Cars",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Noah Lopez" },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  datePublished: "2026-10-08",
  url: `${siteConfig.url}/blog/how-factory-robots-build-cars`,
}

const breadcrumbJsonLd = getBlogBreadcrumbJsonLd(SLUG)

export default function HowFactoryRobotsBuildCarsPage() {
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
