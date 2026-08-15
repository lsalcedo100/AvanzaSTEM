import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "how-engineers-think-when-something-breaks" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function HowEngineersThinkPage() {
  return <BlogPostPage slug={SLUG} />
}
