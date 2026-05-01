"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Images } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { FadeIn } from "@/components/ui/animate"
import { CountUp } from "@/components/ui/count-up"
import { galleryImages } from "@/components/ui/gallery"
import { NewsletterSignup } from "@/components/blog/newsletter-signup"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#edffd6]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-20 md:flex-row md:py-28">
          <FadeIn className="flex-1" delay={0}>
            <h1 className="text-balance text-5xl font-extrabold italic leading-tight text-foreground md:text-6xl">
              {t.home.heroTitle}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground/80">
              {t.home.heroDescription}
            </p>
            <Link
              href="/projects"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-avanza-dark px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {t.home.startLearning} <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </FadeIn>
          <FadeIn className="flex-1" delay={120}>
            <div className="overflow-hidden rounded-2xl shadow-2xl transition-shadow duration-300 hover:shadow-[0_32px_64px_rgba(26,26,46,0.15)]">
              <LightboxImage
                src="/images/home/hero.png"
                alt={t.home.heroImageAlt}
                width={600}
                height={400}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.home.whatWeOffer}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t.home.whatWeOfferDescription}
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { categoryWord: t.home.onlineCurriculumsWord, title: t.home.onlineCurriculums, description: t.home.onlineCurriculumsDesc, href: "/curriculums", accentBar: "bg-avanza-green", accentGlow: "from-avanza-green/10", categoryWordColor: "text-avanza-green/35" },
              { categoryWord: t.home.diyProjectsWord, title: t.home.diyProjects, description: t.home.diyProjectsDesc, href: "/projects", accentBar: "bg-avanza-purple", accentGlow: "from-avanza-purple/10", categoryWordColor: "text-avanza-purple/35" },
              { categoryWord: t.home.blogHowTosWord, title: t.home.blogHowTos, description: t.home.blogHowTosDesc, href: "/blog", accentBar: "bg-avanza-orange", accentGlow: "from-avanza-orange/10", categoryWordColor: "text-avanza-orange/35" },
              { categoryWord: t.home.localWorkshopsWord, title: t.home.localWorkshops, description: t.home.localWorkshopsDesc, href: "/workshops", accentBar: "bg-avanza-teal", accentGlow: "from-avanza-teal/10", categoryWordColor: "text-avanza-teal/35" },
            ].map((card, i) => (
              <FadeIn key={card.href} delay={i * 80}>
                <OfferCard {...card} learnMore={t.home.learnMore} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
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

      {/* Mission Statement */}
      <section className="bg-gradient-to-br from-avanza-purple to-avanza-teal py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <div>
                <div className="text-8xl font-black leading-none text-primary-foreground/20">"</div>
                <blockquote className="text-2xl font-bold italic leading-relaxed text-primary-foreground">
                  {t.home.missionQuote}
                </blockquote>
                <p className="mt-4 text-sm text-primary-foreground/70">
                  - {t.home.missionQuoteAttribution}
                </p>
                <hr className="mt-6 border-primary-foreground/20" />
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
                {t.home.ourMission}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-primary-foreground/90">
                {t.home.missionText}
              </p>
              <Link
                href="/workshops"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary-foreground px-8 py-4 text-lg font-bold text-avanza-purple shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {t.home.findWorkshop} <ArrowRight className="h-5 w-5" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.home.testimonialsTitle}
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                quote: t.home.testimonial1Quote,
                name: t.home.testimonial1Name,
                role: t.home.testimonial1Role,
              },
              {
                quote: t.home.testimonial2Quote,
                name: t.home.testimonial2Name,
                role: t.home.testimonial2Role,
              },
              {
                quote: t.home.testimonial3Quote,
                name: t.home.testimonial3Name,
                role: t.home.testimonial3Role,
              },
            ].map((testimonial, i) => (
              <FadeIn key={testimonial.name} delay={i * 100}>
                <TestimonialCard {...testimonial} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 text-center md:grid-cols-4">
            {[
              { to: 70, suffix: "+", label: t.home.studentsReached },
              { to: 6, suffix: "", label: t.home.curriculumTopics },
              { to: 3, suffix: "", label: t.home.languagesSupported },
              { to: 4, suffix: "", label: t.home.workshopsHosted },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 80}>
                <StatCard to={stat.to} suffix={stat.suffix} label={stat.label} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section className="bg-avanza-dark py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-avanza-green">
              {t.home.photoCount}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-primary-foreground md:text-4xl">
              {t.home.galleryTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-primary-foreground/65">
              {t.home.galleryDesc}
            </p>
          </FadeIn>

          <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {galleryImages.slice(0, 8).map((img, i) => (
              <FadeIn key={i} delay={i * 40}>
                <Link
                  href="/gallery"
                  aria-label={`${t.home.viewGalleryPhoto} ${i + 1}`}
                  className="group relative block aspect-square overflow-hidden rounded-xl"
                >
                  <Image
                    src={img.thumbnail}
                    alt={`${t.home.workshopPhotoAlt} ${i + 1}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                </Link>
              </FadeIn>
            ))}
            <FadeIn delay={320}>
              <Link
                href="/gallery"
                className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 hover:bg-avanza-green/15 hover:ring-avanza-green/30"
              >
                <Images className="h-8 w-8 text-avanza-green transition-transform duration-300 group-hover:scale-110" />
                <div className="text-center">
                  <p className="text-xl font-extrabold text-primary-foreground">133+</p>
                  <p className="mt-0.5 text-xs text-primary-foreground/55">{t.home.viewAllPhotos}</p>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <FadeIn>
        <NewsletterSignup />
      </FadeIn>

      {/* CTA */}
      <section className="bg-avanza-dark py-20">
        <FadeIn className="mx-auto max-w-4xl px-6 text-center" rootMargin="0px 0px -30px 0px">
          <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
            {t.home.readyTitle}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70">
            {t.home.readyDesc}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/curriculums"
              className="inline-flex items-center gap-2 rounded-full bg-avanza-green px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {t.home.browseCurriculums} <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/30 px-8 py-4 text-lg font-bold text-primary-foreground transition-all duration-300 hover:border-primary-foreground/60 hover:bg-primary-foreground/8"
            >
              {t.home.viewProjects}
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  )
}

function OfferCard({
  categoryWord,
  title,
  description,
  href,
  accentBar,
  accentGlow,
  categoryWordColor,
  learnMore,
}: {
  categoryWord: string
  title: string
  description: string
  href: string
  accentBar: string
  accentGlow: string
  categoryWordColor: string
  learnMore: string
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${accentBar}`} />
      <div className={`absolute inset-0 bg-gradient-to-br ${accentGlow} via-transparent to-transparent`} />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-8 top-8 text-right text-[2.75rem] font-black uppercase leading-[0.82] tracking-[0.08em] ${categoryWordColor} transition-transform duration-300 group-hover:-translate-y-1`}
      >
        {categoryWord}
      </span>
      <div className="relative mt-24 flex flex-1 flex-col">
        <h3 className="text-xl font-bold text-card-foreground">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-avanza-green transition-all duration-200 group-hover:gap-2 group-hover:text-avanza-teal">
          {learnMore} <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

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
  const inner = (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-[0_4px_20px_rgba(26,26,46,0.07)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(26,26,46,0.13)]">
      <div className="relative h-60 shrink-0 overflow-hidden">
        <LightboxImage
          src={image}
          alt={alt ?? title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/5 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-extrabold leading-snug text-card-foreground">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground/80 line-clamp-2">{description}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-avanza-green transition-all duration-200 group-hover:gap-2.5">
          {cta} <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </div>
  )
  if (href) {
    return <Link href={href} className="block h-full">{inner}</Link>
  }
  return inner
}

function StatCard({ to, suffix, label }: { to: number; suffix: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <p className="text-4xl font-extrabold text-avanza-green">
        <CountUp to={to} suffix={suffix} />
      </p>
      <p className="mt-2 text-sm font-semibold text-muted-foreground">{label}</p>
    </div>
  )
}

function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div className="relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-8 shadow-sm">
      <span aria-hidden="true" className="pointer-events-none absolute left-6 top-4 text-6xl font-black leading-none text-avanza-green/20">
        "
      </span>
      <p className="text-base leading-relaxed text-muted-foreground">{quote}</p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-avanza-green/15 text-sm font-bold text-avanza-green">
          {name[0]}
        </div>
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  )
}
