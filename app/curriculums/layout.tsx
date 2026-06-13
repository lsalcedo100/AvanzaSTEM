import { siteConfig } from '@/lib/site-config'

const curriculumsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Avanza STEM Curricula',
  description: 'Avanza STEM curriculum lesson paths are in development and launching soon.',
  url: `${siteConfig.url}/curriculums`,
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
}

export default function CurriculumsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(curriculumsJsonLd) }}
      />
      {children}
    </>
  )
}
