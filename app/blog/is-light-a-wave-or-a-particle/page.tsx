import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "is-light-a-wave-or-a-particle" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function LightWaveOrParticlePage() {
  return <BlogPostPage slug={SLUG} />
}
