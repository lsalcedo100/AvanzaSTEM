import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "how-to-build-the-strongest-popsicle-stick-bridge" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function PopsicleStickBridgeBlogPage() {
  return <BlogPostPage slug={SLUG} />
}
