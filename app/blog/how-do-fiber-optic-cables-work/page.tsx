import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "how-do-fiber-optic-cables-work" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function FiberOpticCablesPage() {
  return <BlogPostPage slug={SLUG} />
}
