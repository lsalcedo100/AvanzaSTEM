const workshopsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Avanza STEM Workshop Series',
  description: 'A 3-week hands-on STEM workshop series for young Hispanic students',
  url: 'https://avanzastem.org/workshops',
  itemListElement: [
    {
      '@type': 'Event',
      position: 1,
      name: 'Building Workshop: Week 1',
      description: 'Hands-on engineering and building workshop for young students',
      organizer: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      isAccessibleForFree: true,
    },
    {
      '@type': 'Event',
      position: 2,
      name: 'Coding Workshop: Week 2',
      description: 'Learn Python programming in a hands-on coding workshop',
      organizer: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      isAccessibleForFree: true,
    },
    {
      '@type': 'Event',
      position: 3,
      name: 'AI Workshop: Week 3',
      description: 'Explore artificial intelligence concepts responsibly in a fun workshop setting',
      organizer: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      isAccessibleForFree: true,
    },
  ],
}

const educationEventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationEvent',
  name: 'The Maker Mindset Series – Free STEM Workshops',
  description:
    'A free 3-week in-person STEM workshop series for Hispanic students covering engineering, Python coding, and artificial intelligence.',
  organizer: {
    '@type': 'Organization',
    name: 'Avanza STEM',
    url: 'https://avanzastem.org',
  },
  location: {
    '@type': 'Place',
    name: 'Clifton Public Library',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Clifton',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
  },
  isAccessibleForFree: true,
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
  },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationEventJsonLd) }}
      />
      {children}
    </>
  )
}
