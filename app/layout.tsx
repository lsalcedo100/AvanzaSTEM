import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { LanguageProvider } from '@/components/providers/language-provider'

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: 'Avanza STEM - Inspiring Young Hispanic Minds in STEM',
  description: 'Free online STEM learning, fun projects, and local workshops designed for young Hispanic students. Explore science, technology, engineering, and math with Avanza STEM.',
  icons: {
    icon: '/icon-light-32x32.png',
    shortcut: '/icon-light-32x32.png',
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  themeColor: '#2ecc71',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${robotoMono.variable} font-sans antialiased`}>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
