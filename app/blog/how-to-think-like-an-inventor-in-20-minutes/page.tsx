import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "how-to-think-like-an-inventor-in-20-minutes" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function HowToThinkLikeAnInventorPage() {
  return <BlogPostPage slug={SLUG} />
}
