import type { Metadata } from "next"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"

export const metadata: Metadata = {
  title: "Math Games That Make Learning Fun - Avanza STEM",
  description:
    "Six math games that turn number practice into playtime for grades 2-5. Build number sense, fractions, and logic skills - no worksheets needed.",
  alternates: { canonical: "/blog/math-games-that-make-learning-fun" },
  openGraph: {
    title: "Math Games That Make Learning Fun - Avanza STEM",
    description:
      "Six math games that turn number practice into playtime for grades 2-5. Build number sense, fractions, and logic skills - no worksheets needed.",
    url: "https://avanzastem.org/blog/math-games-that-make-learning-fun",
    type: "article",
    images: [{ url: "/images/og-default-en.png", width: 1200, height: 630, alt: "Avanza STEM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Math Games That Make Learning Fun - Avanza STEM",
    description:
      "Six math games that turn number practice into playtime for grades 2-5. Build number sense, fractions, and logic skills - no worksheets needed.",
    images: ["/images/og-default-en.png"],
  },
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Math Games That Make Learning Fun",
  description:
    "Six math games that turn number practice into playtime for grades 2-5. Build number sense, fractions, and logic skills - no worksheets needed.",
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
      <LocalizedBlogPost slug="math-games-that-make-learning-fun" />
    </>
  )
}
