import { HeroSection } from "@/components/pages/home/HeroSection"
import { WhyWeExistSection } from "@/components/pages/home/WhyWeExistSection"
import { WhatStudentsDoSection } from "@/components/pages/home/WhatStudentsDoSection"
import { InteractiveLabTeasers } from "@/components/pages/home/InteractiveLabTeasers"
import { WhoItsForSection } from "@/components/pages/home/WhoItsForSection"
import { GetInvolvedSection } from "@/components/pages/home/GetInvolvedSection"

export default function HomePage() {
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
