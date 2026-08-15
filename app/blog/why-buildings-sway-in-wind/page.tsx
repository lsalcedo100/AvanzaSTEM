import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-buildings-sway-in-wind" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyBuildingsSwayInWindPage() {
  return <BlogPostPage slug={SLUG} />
}
