import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "engineering-behind-soccer-ball" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function EngineeringBehindSoccerBallPage() {
  return <BlogPostPage slug={SLUG} />
}
