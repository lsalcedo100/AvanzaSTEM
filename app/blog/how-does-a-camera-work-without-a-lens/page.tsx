import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "how-does-a-camera-work-without-a-lens" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function CameraWithoutLensPage() {
  return <BlogPostPage slug={SLUG} />
}
