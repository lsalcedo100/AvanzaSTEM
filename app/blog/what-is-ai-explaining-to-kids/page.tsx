import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { siteConfig } from "@/lib/site-config"

const SLUG = "what-is-ai-explaining-to-kids" as const
const DESCRIPTION =
  "Artificial intelligence explained for kids. Learn how AI learns from data, where it already lives in daily life, and how to think critically about it."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION, "2026-01-28")
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "What is AI? Explaining Artificial Intelligence to Kids",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Liam Salcedo" },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  datePublished: "2026-01-28",
  url: `${siteConfig.url}/blog/what-is-ai-explaining-to-kids`,
}

export default function WhatIsAIPage() {
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
