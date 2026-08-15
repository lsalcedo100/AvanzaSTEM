import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "what-makes-a-stem-workshop-fun" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhatMakesASTEMWorkshopFunPage() {
  return <BlogPostPage slug={SLUG} />
}
