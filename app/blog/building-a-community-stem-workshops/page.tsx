import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"

const SLUG = "building-a-community-stem-workshops" as const
const DESCRIPTION =
  "See how free STEM workshops are changing lives in Hispanic communities in New Jersey - and how to bring one to your neighborhood."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION, "2026-01-12")
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Building a Community: How Local STEM Workshops Change Lives",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Liam Salcedo" },
  publisher: { "@type": "Organization", name: "Avanza STEM", url: "https://avanzastem.org" },
  datePublished: "2026-01-12",
  url: "https://avanzastem.org/blog/building-a-community-stem-workshops",
}

export default function BuildingACommunityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <LocalizedBlogPost slug={SLUG} />
    </>
  )
}
