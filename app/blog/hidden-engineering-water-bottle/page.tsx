import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "hidden-engineering-water-bottle" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function HiddenEngineeringWaterBottlePage() {
  return <BlogPostPage slug={SLUG} />
}
