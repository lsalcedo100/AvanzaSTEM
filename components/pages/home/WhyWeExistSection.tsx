"use client"

import Link from "@/components/ui/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { FadeIn } from "@/components/ui/animate"
import { galleryPhoto } from "@/components/ui/gallery-photos"

// Pinned by Cloudinary number so new gallery uploads never swap it out
// (see gallery-photos.ts). Three students at a library table with a finished popsicle stick bridge.
const whyExistImage = galleryPhoto(61).full

export function WhyWeExistSection() {
  const { t } = useLanguage()
  const paragraphs = [
    t.home.whyExistP1,
    t.home.whyExistP2,
    t.home.whyExistP3,
    t.home.whyExistP4,
  ]
  const values = [
    {
      title: t.home.valuesFreeTitle,
      desc: t.home.valuesFreeDesc,
      accent: "border-avanza-green",
    },
    {
      title: t.home.valuesHandsOnTitle,
      desc: t.home.valuesHandsOnDesc,
      accent: "border-avanza-purple",
    },
    {
      title: t.home.valuesBeyondTitle,
      desc: t.home.valuesBeyondDesc,
      accent: "border-avanza-orange",
    },
  ]

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.home.whyExistTitle}
            </h2>
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className={`${i === 0 ? "mt-6" : "mt-4"} text-lg leading-relaxed text-foreground/80`}
              >
                {text}
              </p>
            ))}
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-avanza-green-dark transition-colors duration-200 hover:text-avanza-teal-dark"
            >
              {t.home.whyExistLink}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
          <FadeIn delay={100}>
            {/* The photo sits on a solid green sheet offset to the bottom right,
                like a print mounted on construction paper. */}
            <div className="relative pb-4 pr-4 sm:pb-5 sm:pr-5">
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-4 right-0 top-4 rounded-2xl bg-avanza-green sm:left-5 sm:top-5"
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <LightboxImage
                  src={whyExistImage}
                  alt={t.home.whyExistImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-8 border-t border-border pt-12 sm:grid-cols-3 sm:gap-10">
          {values.map((value, i) => (
            <FadeIn key={value.title} delay={i * 80}>
              <div className={`border-l-4 pl-5 ${value.accent}`}>
                <h3 className="text-lg font-extrabold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  {value.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
