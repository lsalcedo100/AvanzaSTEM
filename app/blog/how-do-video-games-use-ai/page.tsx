import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "how-do-video-games-use-ai" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function HowDoVideoGamesUseAiPage() {
  return <BlogPostPage slug={SLUG} />
}
