import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "the-engineering-of-a-backpack" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function TheEngineeringOfABackpackPage() {
  return <BlogPostPage slug={SLUG} />
}
