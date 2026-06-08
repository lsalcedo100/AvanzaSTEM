const curriculumsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Avanza STEM Curricula',
  description: 'Avanza STEM curriculum lesson paths are in development and launching soon.',
  url: 'https://avanzastem.org/curriculums',
  publisher: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
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
