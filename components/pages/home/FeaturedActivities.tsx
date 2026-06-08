"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { FadeIn } from "@/components/ui/animate"

function FeaturedCard({
  image,
  alt,
  title,
  description,
  href,
  cta,
}: {
  image: string
  alt?: string
  title: string
  description: string
  href?: string
  cta: string
}) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-[0_4px_20px_rgba(26,26,46,0.07)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(26,26,46,0.13)]">
      <div className="relative h-60 shrink-0 overflow-hidden">
        <LightboxImage
          src={image}
          alt={alt ?? title}
          fill
          buttonClassName="z-20"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-black/5 to-transparent" />
      </div>
      {href && (
        <Link
          href={href}
          aria-label={title}
          className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-dark focus-visible:ring-offset-2"
        />
      )}
      <div className="pointer-events-none relative z-20 flex flex-1 flex-col p-6">
        <h3 className="text-xl font-extrabold leading-snug text-card-foreground">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground/80 line-clamp-2">{description}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-avanza-green transition-all duration-200 group-hover:gap-2.5">
          {cta} <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </div>
  )
}

export function FeaturedActivities() {
  const { t } = useLanguage()
  return (
    <section className="bg-linear-to-b from-secondary via-secondary/50 to-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
            {t.home.featuredActivities}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t.home.featuredActivitiesDesc}
          </p>
        </FadeIn>

        <div className="mt-14 grid items-stretch gap-8 md:grid-cols-3">
          {[
            { image: "/images/home/featured-bridge.jpg", title: t.home.featuredBridge, description: t.home.featuredBridgeDesc, href: "/projects/popsicle-stick-bridge" },
            { image: "/images/home/featured-python.jpg", title: t.home.featuredCoding, description: t.home.featuredCodingDesc, href: "/projects/my-first-python-program" },
            { image: "/images/home/coke-mentos-science-experiment-kids.png", alt: t.home.mentosImageAlt, title: t.home.featuredMentos, description: t.home.featuredMentosDesc, href: "/blog/5-easy-science-experiments" },
          ].map((card, i) => (
            <FadeIn key={card.title} delay={i * 100} className="h-full">
              <FeaturedCard {...card} cta={t.home.learnMore} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
