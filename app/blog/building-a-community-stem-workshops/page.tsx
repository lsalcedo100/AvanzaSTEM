import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "building-a-community-stem-workshops" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function BuildingACommunityPage() {
  return <BlogPostPage slug={SLUG} />
}
