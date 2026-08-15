import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "what-makes-a-robot-a-robot" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhatMakesARobotARobotPage() {
  return <BlogPostPage slug={SLUG} />
}
