import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-does-autocorrect-make-weird-mistakes" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyDoesAutocorrectMakeWeirdMistakesPage() {
  return <BlogPostPage slug={SLUG} />
}
