import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { getBlogBreadcrumbJsonLd } from "@/features/blog/structured-data"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { siteConfig } from "@/lib/site-config"

const SLUG = "how-roller-coasters-stay-on-track" as const
const DESCRIPTION =
  "Roller coasters use gravity, momentum, multi-sided wheel systems, and carefully shaped loops to stay on the track - even upside down. Here is how it all works."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION, "2026-06-18")
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How Roller Coasters Stay on the Track",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Logan" },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  datePublished: "2026-06-18",
  url: `${siteConfig.url}/blog/how-roller-coasters-stay-on-track`,
}

const breadcrumbJsonLd = getBlogBreadcrumbJsonLd(SLUG)

export default function HowRollerCoastersStayOnTrackPage() {
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
