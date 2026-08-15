import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "how-roller-coasters-stay-on-track" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function HowRollerCoastersStayOnTrackPage() {
  return <BlogPostPage slug={SLUG} />
}
