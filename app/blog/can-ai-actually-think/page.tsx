import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "can-ai-actually-think" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function CanAiActuallyThinkPage() {
  return <BlogPostPage slug={SLUG} />
}
