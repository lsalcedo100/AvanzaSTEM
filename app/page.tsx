"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  HandHeart,
  Hammer,
  Images,
  Languages,
  MapPin,
  Sparkles,
} from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { FadeIn } from "@/components/ui/animate"
import { CountUp } from "@/components/ui/count-up"
import { CuriosityCompass } from "@/components/ui/curiosity-compass"
import { PythonPlayground } from "@/components/ui/python-playground"
import { BridgeLoadDemo } from "@/components/ui/bridge-load-demo"
import { JengaTower } from "@/components/ui/jenga-tower"
import { AtomBuilder } from "@/components/ui/atom-builder"
import { galleryImages } from "@/components/ui/gallery"
import { NewsletterSignup } from "@/components/blog/newsletter-signup"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <>
      {/* HERO — bright, warm, with sticker badges */}
      <section className="relative overflow-hidden bg-[#edffd6]">
        {/* Confetti dots */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 18%, rgba(46,204,113,0.18) 0 6px, transparent 7px), radial-gradient(circle at 84% 26%, rgba(139,92,246,0.16) 0 5px, transparent 6px), radial-gradient(circle at 22% 78%, rgba(249,115,22,0.16) 0 4px, transparent 5px), radial-gradient(circle at 76% 84%, rgba(26,188,156,0.18) 0 5px, transparent 6px)",
          }}
        />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-20 md:flex-row md:py-28">
          <FadeIn className="flex-1" delay={0}>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/30 bg-white/70 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-avanza-dark backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-avanza-orange" />
              {t.home.heroEyebrow}
            </span>
            <h1 className="mt-6 text-balance text-[2.7rem] font-extrabold italic leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
              {t.home.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
              {t.home.heroDescription}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 rounded-full bg-avanza-dark px-7 py-3.5 text-base font-bold text-primary-foreground shadow-[0_12px_32px_-10px_rgba(26,26,46,0.5)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_18px_40px_-10px_rgba(26,26,46,0.6)]"
              >
                {t.home.startLearning}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/find-a-workshop"
                className="inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-3.5 text-base font-bold text-avanza-dark ring-1 ring-avanza-dark/15 transition-all duration-200 hover:bg-white hover:ring-avanza-dark/30"
              >
                <MapPin className="h-4 w-4" />
                {t.home.finderTrigger}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            {/* Sticker badges */}
            <div className="mt-8 flex flex-wrap gap-2">
              <HeroBadge icon={HandHeart} label={t.home.heroBadgeFree} tilt="-rotate-2" tone="green" />
              <HeroBadge icon={Languages} label={t.home.heroBadgeAllAges} tilt="rotate-1" tone="orange" />
              <HeroBadge icon={MapPin} label={t.home.heroBadgeLocal} tilt="-rotate-1" tone="purple" />
            </div>
          </FadeIn>
          <FadeIn className="flex-1" delay={120}>
            <div className="relative">
              {/* Hand-drawn frame */}
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(-1.4deg)]"
              />
              <div className="relative overflow-hidden rounded-[24px] shadow-2xl ring-1 ring-avanza-dark/10 transition-shadow duration-300 hover:shadow-[0_36px_72px_rgba(26,26,46,0.25)]">
                <LightboxImage
                  src="/images/home/hero.png"
                  alt={t.home.heroImageAlt}
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* VALUES STRIP — instantly communicates the spirit of the org */}
      <section className="bg-avanza-dark py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 md:grid-cols-4">
          <ValueChip icon={HandHeart} title={t.home.valueFree} note={t.home.valueFreeNote} hoverAnim="thump" />
          <ValueChip icon={Globe2} title={t.home.valueBilingual} note={t.home.valueBilingualNote} hoverAnim="spin" />
          <ValueChip icon={Hammer} title={t.home.valueHandsOn} note={t.home.valueHandsOnNote} hoverAnim="tap" />
          <ValueChip icon={MapPin} title={t.home.valueCommunity} note={t.home.valueCommunityNote} hoverAnim="bounce" />
        </div>
      </section>

      {/* WHAT WE OFFER */}
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

      {/* INTERACTIVE: CURIOSITY COMPASS — pick a path, get a real starter project */}
      <CuriosityCompass />

      {/* INTERACTIVE: PYTHON PLAYGROUND — real Python in the browser via Pyodide */}
      <PythonPlayground />

      {/* REAL WORKSHOPS — banner showcase pulled from /public/images/workshops */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-avanza-green">
              {t.home.realWorkshopsEyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
              {t.home.realWorkshopsTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t.home.realWorkshopsDesc}
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {[
              {
                week: 1,
                title: t.home.realWorkshopBuilding,
                desc: t.home.realWorkshopBuildingShort,
                image: "/images/workshops/Building Workshop Description.jpeg",
                tone: "bg-avanza-orange",
                tilt: "-rotate-[0.6deg] hover:rotate-0",
              },
              {
                week: 2,
                title: t.home.realWorkshopCoding,
                desc: t.home.realWorkshopCodingShort,
                image: "/images/workshops/Coding Workshop Description.png",
                tone: "bg-avanza-green",
                tilt: "rotate-[0.7deg] hover:rotate-0",
              },
              {
                week: 3,
                title: t.home.realWorkshopAi,
                desc: t.home.realWorkshopAiShort,
                image: "/images/workshops/AI Workshop Description.JPG",
                tone: "bg-avanza-purple",
                tilt: "-rotate-[0.4deg] hover:rotate-0",
              },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 90} className="h-full">
                <RealWorkshopCard
                  weekNumber={card.week}
                  weekLabel={t.home.realWorkshopWeekLabel}
                  title={card.title}
                  description={card.desc}
                  image={card.image}
                  imageAlt={`${t.home.realWorkshopBannerAlt} – ${card.title}`}
                  tone={card.tone}
                  tilt={card.tilt}
                  cta={t.home.realWorkshopExplore}
                />
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-12 flex justify-center">
            <Link
              href="/workshops"
              className="inline-flex items-center gap-2 rounded-full border-2 border-avanza-dark/15 bg-white px-6 py-3 text-sm font-bold text-avanza-dark transition-all duration-200 hover:border-avanza-dark/35 hover:bg-avanza-dark/5"
            >
              {t.home.findWorkshop}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* INTERACTIVE: BRIDGE LOAD DEMO — drag a weight onto the truss bridge */}
      <BridgeLoadDemo />

      {/* INTERACTIVE: JENGA TOWER — drag blocks, watch stability collapse */}
      <JengaTower />

      {/* FEATURED ACTIVITIES */}
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

      {/* INTERACTIVE: ATOM BUILDER — add protons / neutrons / electrons */}
      <AtomBuilder />

      {/* MISSION */}
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

      {/* TESTIMONIALS */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.home.testimonialsTitle}
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { quote: t.home.testimonial1Quote, name: t.home.testimonial1Name, role: t.home.testimonial1Role },
              { quote: t.home.testimonial2Quote, name: t.home.testimonial2Name, role: t.home.testimonial2Role },
              { quote: t.home.testimonial3Quote, name: t.home.testimonial3Name, role: t.home.testimonial3Role },
            ].map((testimonial, i) => (
              <FadeIn key={testimonial.name} delay={i * 100}>
                <TestimonialCard {...testimonial} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-background pb-20">
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

      {/* GALLERY TEASER */}
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
              <FadeIn key={img.id} delay={i * 40}>
                <Link
                  href="/gallery"
                  aria-label={`${t.home.viewGalleryPhoto} ${i + 1}`}
                  className="group relative block aspect-square overflow-hidden rounded-xl bg-white/5"
                >
                  <Image
                    src={img.thumb}
                    alt={`${t.home.workshopPhotoAlt} ${i + 1}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
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

      {/* NEWSLETTER */}
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

function HeroBadge({
  icon: Icon,
  label,
  tilt,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  tilt: string
  tone: "green" | "orange" | "purple"
}) {
  const toneClasses = {
    green: "bg-avanza-green text-white",
    orange: "bg-avanza-orange text-white",
    purple: "bg-avanza-purple text-white",
  }[tone]
  return (
    <span
      className={`group/badge inline-flex cursor-default items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider shadow-md transition-transform duration-300 hover:!rotate-0 hover:scale-110 hover:shadow-lg ${toneClasses} ${tilt}`}
    >
      <Icon className="h-3.5 w-3.5 transition-transform duration-500 group-hover/badge:rotate-[360deg]" />
      {label}
    </span>
  )
}

function ValueChip({
  icon: Icon,
  title,
  note,
  hoverAnim = "thump",
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  note: string
  hoverAnim?: "thump" | "spin" | "tap" | "bounce"
}) {
  const iconAnimClass =
    hoverAnim === "spin"
      ? "transition-transform duration-700 ease-out group-hover:rotate-[360deg]"
      : hoverAnim === "tap"
        ? "transition-transform duration-200 group-hover:[animation:value-tap_0.6s_ease-in-out]"
        : hoverAnim === "bounce"
          ? "transition-transform duration-200 group-hover:[animation:value-bounce_0.7s_cubic-bezier(0.34,1.56,0.64,1)]"
          : "transition-transform duration-200 group-hover:[animation:value-thump_0.7s_ease-in-out]"
  return (
    <div className="group flex cursor-default items-start gap-4">
      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-avanza-green/15 text-avanza-green ring-1 ring-avanza-green/30 transition-all duration-200 group-hover:scale-105 group-hover:bg-avanza-green/25 group-hover:ring-avanza-green/50">
        <Icon className={`h-5 w-5 ${iconAnimClass}`} />
      </div>
      <div>
        <p className="text-sm font-extrabold uppercase tracking-wider text-primary-foreground transition-colors group-hover:text-avanza-green">
          {title}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-primary-foreground/65">
          {note}
        </p>
      </div>
      <style>{`
        @keyframes value-thump {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.18); }
          45% { transform: scale(0.92); }
          70% { transform: scale(1.08); }
        }
        @keyframes value-tap {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(-22deg); }
          55% { transform: rotate(8deg); }
          80% { transform: rotate(-4deg); }
        }
        @keyframes value-bounce {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
          70% { transform: translateY(-2px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .group:hover [class*="value-"],
          .group:hover [class*="rotate-\\[360deg\\]"] {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}

function RealWorkshopCard({
  weekNumber,
  weekLabel,
  title,
  description,
  image,
  imageAlt,
  tone,
  tilt,
  cta,
}: {
  weekNumber: number
  weekLabel: string
  title: string
  description: string
  image: string
  imageAlt: string
  tone: string
  tilt: string
  cta: string
}) {
  return (
    <Link
      href="/workshops"
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_-30px_rgba(26,26,46,0.4)] ring-1 ring-avanza-dark/8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_64px_-28px_rgba(26,26,46,0.5)] ${tilt}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-avanza-dark/70 via-avanza-dark/0 to-transparent" />
        {/* Sticker week badge */}
        <span
          className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full ${tone} px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-lg`}
        >
          {weekLabel} {weekNumber}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-xl font-extrabold leading-snug text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-extrabold text-avanza-dark transition-all duration-200 group-hover:gap-2.5">
          {cta}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
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
