"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Gallery } from "@/components/ui/gallery"

export function GalleryPageContent() {
  const { t } = useLanguage()

  return (
    <>
      <section className="bg-gradient-to-br from-avanza-teal to-avanza-green py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">
            {t.galleryPage.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/85">
            {t.galleryPage.description}
          </p>
        </div>
      </section>

      <Gallery />
    </>
  )
}
