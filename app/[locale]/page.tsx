import type { Metadata } from "next"
import { HeroSection } from "@/components/pages/home/HeroSection"
import { WhyWeExistSection } from "@/components/pages/home/WhyWeExistSection"
import { WhatStudentsDoSection } from "@/components/pages/home/WhatStudentsDoSection"
import { InteractiveLabTeasers } from "@/components/pages/home/InteractiveLabTeasers"
import { WhoItsForSection } from "@/components/pages/home/WhoItsForSection"
import { GetInvolvedSection } from "@/components/pages/home/GetInvolvedSection"
import { generateHomeMetadata } from "@/features/home/metadata"
import type { Language } from "@/i18n/translations"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return generateHomeMetadata(locale as Language)
}

export default function LocaleHomePage() {
  return (
    <>
      <HeroSection />
      <WhyWeExistSection />
      <WhatStudentsDoSection />
      <InteractiveLabTeasers />
      <WhoItsForSection />
      <GetInvolvedSection />
    </>
  )
}
