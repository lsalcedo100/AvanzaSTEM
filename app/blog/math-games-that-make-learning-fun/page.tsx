import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"

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
  publisher: { "@type": "Organization", name: "Avanza STEM", url: "https://avanzastem.org" },
  datePublished: "2026-01-20",
  url: "https://avanzastem.org/blog/math-games-that-make-learning-fun",
}

export default function MathGamesThatMakeLearningFunPage() {
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
