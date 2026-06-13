import { siteConfig } from '@/lib/site-config'

const providerJsonLd = {
  '@type': 'EducationalOrganization',
  name: siteConfig.name,
  url: siteConfig.url,
}

const workshopsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'The Maker Mindset Series',
  serviceType: 'Three part hands on STEM workshop series',
  description:
    'Avanza STEM hands on STEM workshop series for young students, usually hosted through libraries and community partners, with separate building, coding, and AI workshops.',
  url: `${siteConfig.url}/workshops`,
  provider: providerJsonLd,
  areaServed: [
    {
      '@type': 'City',
      name: 'Clifton',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'NJ',
        addressCountry: 'US',
      },
    },
  ],
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/LimitedAvailability',
    url: `${siteConfig.url}/find-a-workshop`,
  },
}

const workshopCoursesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'The Three Maker Mindset Workshops',
  description: 'Building, coding, and AI workshops in Avanza STEM\'s Maker Mindset Series, usually held about one week apart through library and community partners.',
  url: `${siteConfig.url}/workshops`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Course',
        name: 'Building Workshop',
        description: 'Hands on engineering and building workshop for young students.',
        provider: providerJsonLd,
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Course',
        name: 'Coding Workshop',
        description: 'Beginner friendly Python programming workshop for students.',
        provider: providerJsonLd,
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Course',
        name: 'AI Workshop',
        description: 'Responsible artificial intelligence concepts explored through hands on activities.',
        provider: providerJsonLd,
      },
    },
  ],
}

export default function WorkshopsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workshopsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workshopCoursesJsonLd) }}
      />
      {children}
    </>
  )
}
