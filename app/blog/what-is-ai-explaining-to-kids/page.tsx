import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "what-is-ai-explaining-to-kids" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhatIsAIPage() {
  return <BlogPostPage slug={SLUG} />
}
