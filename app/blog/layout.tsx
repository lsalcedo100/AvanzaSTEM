import type { Metadata } from 'next'
import { generateBlogIndexMetadata, getBlogJsonLd } from '@/features/blog/metadata'

export function generateMetadata(): Metadata {
  return generateBlogIndexMetadata('en')
}

const blogJsonLd = getBlogJsonLd('en')

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      {children}
    </>
  )
}
