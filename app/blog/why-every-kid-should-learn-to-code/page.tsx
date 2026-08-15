import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-every-kid-should-learn-to-code" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyKidsShouldLearnToCodePage() {
  return <BlogPostPage slug={SLUG} />
}
