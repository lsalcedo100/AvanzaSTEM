import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { siteConfig } from "@/lib/site-config"

const SLUG = "5-easy-science-experiments" as const
const DESCRIPTION =
  "Try 5 easy science experiments at home using household items. Safe, fun, and educational activities for kids in grades 2 and up."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION, "2026-02-15")
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "5 Easy Science Experiments You Can Do at Home",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Liam Salcedo" },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  datePublished: "2026-02-15",
  url: `${siteConfig.url}/blog/5-easy-science-experiments`,
}

export default function FiveEasyScienceExperimentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <LocalizedBlogPost slug={SLUG} />
    </>
  )
}
