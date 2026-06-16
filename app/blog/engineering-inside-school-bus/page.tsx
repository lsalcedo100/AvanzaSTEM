import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { getBlogBreadcrumbJsonLd } from "@/features/blog/structured-data"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { siteConfig } from "@/lib/site-config"

const SLUG = "engineering-inside-school-bus" as const
const DESCRIPTION =
  "A school bus is packed with engineering decisions. Learn how the color, seats, mirrors, turning radius, and emergency exits all work together to move kids safely."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION, "2026-05-07")
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "The Secret Engineering Inside a School Bus",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Logan" },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  datePublished: "2026-05-07",
  url: `${siteConfig.url}/blog/engineering-inside-school-bus`,
}

const breadcrumbJsonLd = getBlogBreadcrumbJsonLd(SLUG)

export default function EngineeringInsideSchoolBusPage() {
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
