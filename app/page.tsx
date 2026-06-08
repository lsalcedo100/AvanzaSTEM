import { CuriosityCompass } from "@/components/ui/curiosity-compass"
import { FadeIn } from "@/components/ui/animate"
import { NewsletterSignup } from "@/components/blog/newsletter-signup"
import { HeroSection } from "@/components/pages/home/HeroSection"
import { TrustBand } from "@/components/pages/home/TrustBand"
import { ValuesStrip } from "@/components/pages/home/ValuesStrip"
import { OfferCards } from "@/components/pages/home/OfferCards"
import { HomeLabs } from "@/components/pages/home/HomeLabs"
import { InteractiveLabTeasers } from "@/components/pages/home/InteractiveLabTeasers"
import { WorkshopShowcase } from "@/components/pages/home/WorkshopShowcase"
import { FeaturedActivities } from "@/components/pages/home/FeaturedActivities"
import { MissionSection } from "@/components/pages/home/MissionSection"
import { TestimonialsSection } from "@/components/pages/home/TestimonialsSection"
import { StatsSection } from "@/components/pages/home/StatsSection"
import { GalleryTeaserSection } from "@/components/pages/home/GalleryTeaserSection"
import { FinalCTASection } from "@/components/pages/home/FinalCTASection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBand />
      <ValuesStrip />
      <OfferCards />
      <CuriosityCompass />
      <HomeLabs />
      <InteractiveLabTeasers />
      <WorkshopShowcase />
      <FeaturedActivities />
      <MissionSection />
      <TestimonialsSection />
      <StatsSection />
      <GalleryTeaserSection />
      <FadeIn>
        <NewsletterSignup />
      </FadeIn>
      <FinalCTASection />
    </>
  )
}
