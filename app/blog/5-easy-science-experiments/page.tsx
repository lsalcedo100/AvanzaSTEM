import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "5-easy-science-experiments" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function FiveEasyScienceExperimentsPage() {
  return <BlogPostPage slug={SLUG} />
}
