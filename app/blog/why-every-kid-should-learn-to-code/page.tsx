import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"

const SLUG = "why-every-kid-should-learn-to-code" as const
const DESCRIPTION =
  "Coding teaches problem-solving, creativity, and logic. Learn how to start your child with Python programming — no prior experience needed."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION, "2026-02-20")
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Why Every Kid Should Learn to Code (And How to Start)",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Liam Salcedo" },
  publisher: { "@type": "Organization", name: "Avanza STEM", url: "https://avanzastem.org" },
  datePublished: "2026-02-20",
  url: "https://avanzastem.org/blog/why-every-kid-should-learn-to-code",
}

export default function WhyKidsShouldLearnToCodePage() {
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
