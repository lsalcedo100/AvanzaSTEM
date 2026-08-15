import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "what-is-ai-actually-doing-when-it-answers-you" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhatIsAiActuallyDoingPage() {
  return <BlogPostPage slug={SLUG} />
}
