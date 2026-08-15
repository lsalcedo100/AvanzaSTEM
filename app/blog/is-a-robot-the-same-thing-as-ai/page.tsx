import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "is-a-robot-the-same-thing-as-ai" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function IsARobotTheSameThingAsAiPage() {
  return <BlogPostPage slug={SLUG} />
}
