import { FadeIn } from "@/components/ui/animate"
import { NewsletterSignup } from "@/components/blog/newsletter-signup"
import { HeroSection } from "@/components/pages/home/HeroSection"
import { ValuesStrip } from "@/components/pages/home/ValuesStrip"
import { OfferCards } from "@/components/pages/home/OfferCards"
import { InteractiveLabTeasers } from "@/components/pages/home/InteractiveLabTeasers"
import { WorkshopShowcase } from "@/components/pages/home/WorkshopShowcase"
import { FeaturedActivities } from "@/components/pages/home/FeaturedActivities"
import { MissionSection } from "@/components/pages/home/MissionSection"
import { ImpactSection } from "@/components/pages/home/ImpactSection"
import { GalleryTeaserSection } from "@/components/pages/home/GalleryTeaserSection"
import { FinalCTASection } from "@/components/pages/home/FinalCTASection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuesStrip />
      <OfferCards />
      <WorkshopShowcase />
      <MissionSection />
      <ImpactSection />
      <GalleryTeaserSection />
      <FeaturedActivities />
      <InteractiveLabTeasers />
      <FadeIn>
        <NewsletterSignup />
      </FadeIn>
      <FinalCTASection />
    </>
  )
}
