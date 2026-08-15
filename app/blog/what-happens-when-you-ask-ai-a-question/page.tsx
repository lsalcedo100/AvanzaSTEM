import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "what-happens-when-you-ask-ai-a-question" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhatHappensWhenYouAskAiAQuestionPage() {
  return <BlogPostPage slug={SLUG} />
}
