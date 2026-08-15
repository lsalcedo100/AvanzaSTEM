import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "design-a-mars-rover-out-of-cardboard" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function MarsRoverPage() {
  return <BlogPostPage slug={SLUG} />
}
