"use client"

import { Camera, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { Gallery } from "@/components/ui/gallery"

export function GalleryPageContent() {
  const { t } = useLanguage()

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-avanza-teal to-avanza-green py-20">
        {/* Soft confetti */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 20%, rgba(255,255,255,0.5) 0 4px, transparent 5px), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.4) 0 5px, transparent 6px), radial-gradient(circle at 30% 80%, rgba(255,255,255,0.35) 0 3px, transparent 4px), radial-gradient(circle at 70% 75%, rgba(255,255,255,0.4) 0 4px, transparent 5px)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/35 bg-white/25 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-avanza-dark backdrop-blur-sm">
            <Camera className="h-3.5 w-3.5" />
            {t.galleryPage.eyebrow ?? "Snapshots from class"}
          </span>
          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-avanza-dark md:text-6xl">
            {t.galleryPage.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-avanza-dark/80">
            {t.galleryPage.description}
          </p>
          <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/25 px-4 py-1.5 text-sm font-bold text-avanza-dark backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            {t.home.photoCount}
          </div>
        </div>
      </section>

      <Gallery />
    </>
  )
}
