import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { getBlogBreadcrumbJsonLd } from "@/features/blog/structured-data"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { siteConfig } from "@/lib/site-config"

const SLUG = "why-is-the-sky-blue-but-sunsets-are-orange" as const
const DESCRIPTION =
  "The sky looks blue during the day, but at sunset it turns orange or red. Learn how sunlight, air molecules, and scattering work together to create both colors."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION)
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Why Is the Sky Blue but Sunsets Are Orange?",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Enqi Qi" },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  url: `${siteConfig.url}/blog/why-is-the-sky-blue-but-sunsets-are-orange`,
}

const breadcrumbJsonLd = getBlogBreadcrumbJsonLd(SLUG)

export default function WhyIsTheSkyBluePage() {
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
