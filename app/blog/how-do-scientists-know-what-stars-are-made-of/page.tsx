import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "how-do-scientists-know-what-stars-are-made-of" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhatStarsAreMadeOfPage() {
  return <BlogPostPage slug={SLUG} />
}
