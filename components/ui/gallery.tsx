"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react"

const cloudName = "dw4uprmkk"

export const galleryImages = Array.from({ length: 133 }, (_, i) => {
  const num = String(i + 1).padStart(5, "0")
  return {
    thumbnail: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_600/gallery-${num}.jpg`,
    full: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/gallery-${num}.jpg`,
  }
})

interface GalleryProps {
  limit?: number
}

export function Gallery({ limit }: GalleryProps) {
  const displayed = limit ? galleryImages.slice(0, limit) : galleryImages
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const isOpen = activeIndex !== null

  const openModal = (index: number) => setActiveIndex(index)
  const closeModal = () => setActiveIndex(null)

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + displayed.length) % displayed.length))
  }, [displayed.length])

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % displayed.length))
  }, [displayed.length])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      else if (e.key === "ArrowRight") next()
      else if (e.key === "Escape") closeModal()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, prev, next])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-foreground md:text-4xl">
          Photo Gallery
        </h2>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {displayed.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => openModal(i)}
              className="group relative aspect-square overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
            >
              <Image
                src={img.thumbnail}
                alt={`Gallery photo ${i + 1}`}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </button>
          ))}
        </div>

        {limit && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full bg-avanza-green px-8 py-3.5 text-base font-bold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Images className="h-5 w-5" />
              View All Photos
            </Link>
          </div>
        )}
      </div>

      {isOpen && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeModal}
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/25"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25"
            aria-label="Previous"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <div
            className="relative mx-16 max-h-[90vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={activeIndex}
              src={displayed[activeIndex].full}
              alt={`Gallery photo ${activeIndex + 1}`}
              width={1600}
              height={1200}
              className="max-h-[90vh] w-full object-contain"
              priority
            />
          </div>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25"
            aria-label="Next"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-sm text-white">
            {activeIndex + 1} / {displayed.length}
          </span>
        </div>
      )}
    </section>
  )
}
