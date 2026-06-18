import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { getBlogBreadcrumbJsonLd } from "@/features/blog/structured-data"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { siteConfig } from "@/lib/site-config"

const SLUG = "why-robot-hands-are-so-hard-to-make" as const
const DESCRIPTION =
  "Gripping different objects requires movement, strength, gentleness, and touch all at once. Learn why robot hands are one of the hardest challenges in robotics."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION)
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Why Robot Hands Are So Hard to Make",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Noah Lopez" },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  url: `${siteConfig.url}/blog/why-robot-hands-are-so-hard-to-make`,
}

const breadcrumbJsonLd = getBlogBreadcrumbJsonLd(SLUG)

export default function WhyRobotHandsAreSoHardToMakePage() {
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
