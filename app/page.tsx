import type { Metadata } from "next"
import { HeroSection } from "@/components/pages/home/HeroSection"
import { WhyWeExistSection } from "@/components/pages/home/WhyWeExistSection"
import { WhatStudentsDoSection } from "@/components/pages/home/WhatStudentsDoSection"
import { InteractiveLabTeasers } from "@/components/pages/home/InteractiveLabTeasers"
import { WhoItsForSection } from "@/components/pages/home/WhoItsForSection"
import { SocialProof } from "@/components/ui/social-proof"
import { GetInvolvedSection } from "@/components/pages/home/GetInvolvedSection"
import { generateHomeMetadata, getHomeWebPageJsonLd } from "@/features/home/metadata"

export function generateMetadata(): Metadata {
  return generateHomeMetadata("en")
}

const homeWebPageJsonLd = getHomeWebPageJsonLd("en")

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebPageJsonLd) }}
      />
      <HeroSection />
      <WhyWeExistSection />
      <WhoItsForSection />
      <WhatStudentsDoSection />
      <InteractiveLabTeasers />
      <SocialProof />
      <GetInvolvedSection />
    </>
  )
}
