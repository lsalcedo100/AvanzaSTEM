"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { galleryImages } from "@/components/ui/gallery"

export function WhoItsForSection() {
  const { t } = useLanguage()

  const stats = [
    { value: t.home.impactStudentsValue, label: t.home.impactStudentsLabel },
    { value: t.home.impactLibrariesValue, label: t.home.impactLibrariesLabel },
    { value: t.home.impactPhotosValue, label: t.home.impactPhotosLabel },
  ]

  return (
    <section className="bg-avanza-dark py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <FadeIn>
            <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
              {t.home.whoItsForTitle}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/75">
              {t.home.whoItsForIntro}
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-extrabold text-avanza-green sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-primary-foreground/65">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground/40">
              {t.home.statsAsOf}
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {galleryImages.slice(0, 8).map((img, i) => (
                <Link
                  key={img.id}
                  href="/gallery"
                  aria-label={`${t.home.viewGalleryPhoto} ${i + 1}`}
                  className="group relative block aspect-square overflow-hidden rounded-lg bg-white/5"
                >
                  <Image
                    src={img.thumb}
                    alt={`${t.home.workshopPhotoAlt} ${i + 1}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              ))}
            </div>
            <Link
              href="/gallery"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-avanza-green transition-colors duration-200 hover:text-avanza-teal"
            >
              {t.home.viewAllPhotos}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
