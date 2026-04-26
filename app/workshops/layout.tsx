import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { type Language } from '@/i18n/translations'

const VALID_LANGUAGES: Language[] = ['en', 'es', 'zh']

async function getCookieLanguage(): Promise<Language> {
  const cookieStore = await cookies()
  const value = cookieStore.get('avanza-lang')?.value
  return VALID_LANGUAGES.includes(value as Language) ? (value as Language) : 'en'
}

const metadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    title: 'Free STEM Workshops for Kids - Avanza STEM',
    description:
      'Join Avanza STEM\'s 3-week workshop series covering engineering, coding with Python, and AI — hands-on free learning for young Hispanic students in your community.',
  },
  es: {
    title: 'Talleres STEM Gratuitos para Niños - Avanza STEM',
    description:
      'Únete a la serie de talleres de 3 semanas de Avanza STEM en ingeniería, programación con Python e inteligencia artificial. Aprendizaje práctico gratuito para jóvenes estudiantes hispanos.',
  },
  zh: {
    title: '儿童免费 STEM 工作坊 - Avanza STEM',
    description:
      '加入 Avanza STEM 为期 3 周的工作坊系列，涵盖工程学、Python 编程和 AI——为西班牙裔学生提供免费实践学习。',
  },
}

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
      name: 'Building Workshop — Week 1',
      description: 'Hands-on engineering and building workshop for young students',
      organizer: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      isAccessibleForFree: true,
    },
    {
      '@type': 'Event',
      position: 2,
      name: 'Coding Workshop — Week 2',
      description: 'Learn Python programming in a hands-on coding workshop',
      organizer: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      isAccessibleForFree: true,
    },
    {
      '@type': 'Event',
      position: 3,
      name: 'AI Workshop — Week 3',
      description: 'Explore artificial intelligence concepts responsibly in a fun workshop setting',
      organizer: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      isAccessibleForFree: true,
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const language = await getCookieLanguage()
  const { title, description } = metadataByLanguage[language]
  return {
    title,
    description,
    alternates: { canonical: '/workshops' },
    openGraph: {
      title,
      description,
      url: 'https://avanzastem.org/workshops',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default function WorkshopsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workshopsJsonLd) }}
      />
      {children}
    </>
  )
}
