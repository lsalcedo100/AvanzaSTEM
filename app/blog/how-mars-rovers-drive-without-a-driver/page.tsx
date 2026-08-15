import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "how-mars-rovers-drive-without-a-driver" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function HowMarsRoversDriveWithoutADriverPage() {
  return <BlogPostPage slug={SLUG} />
}
