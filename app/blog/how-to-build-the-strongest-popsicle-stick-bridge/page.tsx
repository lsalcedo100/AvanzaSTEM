import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"

const SLUG = "how-to-build-the-strongest-popsicle-stick-bridge" as const
const DESCRIPTION =
  "Learn the engineering secrets behind a strong popsicle stick bridge. Triangles, load paths, and joints - a step-by-step guide for young engineers."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION, "2026-02-10")
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Build the Strongest Popsicle Stick Bridge",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Liam Salcedo" },
  publisher: { "@type": "Organization", name: "Avanza STEM", url: "https://avanzastem.org" },
  datePublished: "2026-02-10",
  url: "https://avanzastem.org/blog/how-to-build-the-strongest-popsicle-stick-bridge",
}

export default function PopsicleStickBridgeBlogPage() {
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
