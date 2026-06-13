import { siteConfig } from '@/lib/site-config'

const curriculumsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Free STEM Curriculum Paths for Kids',
  description:
    'Free STEM curriculum paths for kids with available project guides in Python, engineering, science, robotics, math, and AI.',
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
