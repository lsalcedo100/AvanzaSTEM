import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-ai-sometimes-gets-things-wrong" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyAiSometimesGetsThingsWrongPage() {
  return <BlogPostPage slug={SLUG} />
}
