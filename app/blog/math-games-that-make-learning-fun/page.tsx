import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "math-games-that-make-learning-fun" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function MathGamesThatMakeLearningFunPage() {
  return <BlogPostPage slug={SLUG} />
}
