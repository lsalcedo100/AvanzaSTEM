import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "should-kids-trust-everything-ai-says" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function ShouldKidsTrustEverythingAiSaysPage() {
  return <BlogPostPage slug={SLUG} />
}
