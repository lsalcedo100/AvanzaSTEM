import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "how-elevators-know-where-to-go" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function HowElevatorsKnowWhereToGoPage() {
  return <BlogPostPage slug={SLUG} />
}
