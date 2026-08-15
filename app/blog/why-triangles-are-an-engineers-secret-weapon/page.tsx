import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-triangles-are-an-engineers-secret-weapon" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyTrianglesPage() {
  return <BlogPostPage slug={SLUG} />
}
