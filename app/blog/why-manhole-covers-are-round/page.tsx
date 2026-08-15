import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-manhole-covers-are-round" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyManholeCoversAreRoundPage() {
  return <BlogPostPage slug={SLUG} />
}
