import type { Metadata } from "next"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"

export const metadata: Metadata = {
  title: "What is AI? Explaining Artificial Intelligence to Kids - Avanza STEM",
  description:
    "Artificial intelligence explained for kids. Learn how AI learns from data, where it already lives in daily life, and how to think critically about it.",
  alternates: { canonical: "/blog/what-is-ai-explaining-to-kids" },
  openGraph: {
    title: "What is AI? Explaining Artificial Intelligence to Kids - Avanza STEM",
    description:
      "Artificial intelligence explained for kids. Learn how AI learns from data, where it already lives in daily life, and how to think critically about it.",
    url: "https://avanzastem.org/blog/what-is-ai-explaining-to-kids",
    type: "article",
    images: [{ url: "/images/og-default-en.png", width: 1200, height: 630, alt: "Avanza STEM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What is AI? Explaining Artificial Intelligence to Kids - Avanza STEM",
    description:
      "Artificial intelligence explained for kids. Learn how AI learns from data, where it already lives in daily life, and how to think critically about it.",
    images: ["/images/og-default-en.png"],
  },
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "What is AI? Explaining Artificial Intelligence to Kids",
  description:
    "Artificial intelligence explained for kids. Learn how AI learns from data, where it already lives in daily life, and how to think critically about it.",
  author: { "@type": "Person", name: "Liam Salcedo" },
  publisher: { "@type": "Organization", name: "Avanza STEM", url: "https://avanzastem.org" },
  datePublished: "2026-01-28",
  url: "https://avanzastem.org/blog/what-is-ai-explaining-to-kids",
}

export default function WhatIsAIPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <LocalizedBlogPost slug="what-is-ai-explaining-to-kids" />
    </>
  )
}
