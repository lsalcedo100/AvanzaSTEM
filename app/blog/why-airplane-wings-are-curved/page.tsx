import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-airplane-wings-are-curved" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyAirplaneWingsAreCurvedPage() {
  return <BlogPostPage slug={SLUG} />
}
