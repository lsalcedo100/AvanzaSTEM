import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-chairs-break" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyChairsBreakPage() {
  return <BlogPostPage slug={SLUG} />
}
