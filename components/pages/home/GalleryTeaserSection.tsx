"use client"

import Image from "next/image"
import Link from "next/link"
import { Images } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { galleryImages } from "@/components/ui/gallery"

export function GalleryTeaserSection() {
  const { t } = useLanguage()
  return (
    <section className="bg-avanza-dark py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-avanza-green">
            {t.home.photoCount}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground/45">
            {t.home.statsAsOf}
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
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground/35">
                  {t.home.statsAsOf}
                </p>
                <p className="mt-0.5 text-xs text-primary-foreground/55">{t.home.viewAllPhotos}</p>
              </div>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
