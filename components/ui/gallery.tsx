"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Download,
  Images,
  X,
} from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

const CLOUD_NAME = "dw4uprmkk"
const TOTAL_IMAGES = 217
const PRE_EXPANSION_TOTAL_IMAGES = 174
const INITIAL_BATCH = 30
const BATCH_STEP = 24

type GalleryItem = {
  id: string
  thumb: string
  thumbSrcSet: string
  blur: string
  full: string
  download: string
  preload: string
  /** legacy alias used by homepage gallery teaser */
  thumbnail: string
}

export const tx = (num: string, transforms: string) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/gallery-${num}.jpg`

const buildItem = (galleryIndex: number): GalleryItem => {
  const num = String(galleryIndex).padStart(5, "0")
  const thumbRotation = num === "00092" || num === "00091" || num === "00096" ? "a_0," : ""
  const fullRotation = num === "00096" ? "a_0," : ""
  const thumb = tx(num, `${thumbRotation}c_fill,ar_1:1,g_auto,f_auto,q_auto:eco,w_400`)
  return {
    id: num,
    thumb,
    thumbnail: thumb,
    thumbSrcSet: [
      `${tx(num, `${thumbRotation}c_fill,ar_1:1,g_auto,f_auto,q_auto:eco,w_240`)} 240w`,
      `${tx(num, `${thumbRotation}c_fill,ar_1:1,g_auto,f_auto,q_auto:eco,w_360`)} 360w`,
      `${tx(num, `${thumbRotation}c_fill,ar_1:1,g_auto,f_auto,q_auto:eco,w_480`)} 480w`,
      `${tx(num, `${thumbRotation}c_fill,ar_1:1,g_auto,f_auto,q_auto:eco,w_640`)} 640w`,
    ].join(", "),
    blur: tx(num, `${thumbRotation}e_blur:2000,q_30,f_auto,w_24,c_fill,ar_1:1,g_auto`),
    full: tx(num, `${fullRotation}f_auto,q_auto:good,w_1600`),
    download: tx(num, `${fullRotation}fl_attachment:avanza-stem-gallery-${num},q_auto:good,w_2000`),
    preload: tx(num, `${fullRotation}f_auto,q_auto:eco,w_900`),
  }
}

export const galleryImages: GalleryItem[] = Array.from(
  { length: TOTAL_IMAGES },
  (_, i) => buildItem(TOTAL_IMAGES - i),
)

// Curated/preview surfaces use the old newest-first set so adding new
// Cloudinary uploads does not silently change their chosen photos.
export const preExpansionGalleryImages: GalleryItem[] = Array.from(
  { length: PRE_EXPANSION_TOTAL_IMAGES },
  (_, i) => buildItem(PRE_EXPANSION_TOTAL_IMAGES - i),
)

interface GalleryProps {
  limit?: number
}

export function Gallery({ limit }: GalleryProps) {
  const { t } = useLanguage()
  const all = useMemo(
    () =>
      limit
        ? preExpansionGalleryImages.slice(0, limit)
        : galleryImages,
    [limit],
  )

  // Progressive batched DOM rendering. Even with native lazy-loading, mounting
  // every gallery <img> node up-front bloats first paint, so mount in chunks.
  const [renderCount, setRenderCount] = useState(() =>
    Math.min(all.length, INITIAL_BATCH),
  )
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setRenderCount((c) => Math.min(all.length, Math.max(c, INITIAL_BATCH)))
  }, [all.length])

  useEffect(() => {
    if (renderCount >= all.length) return
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRenderCount((c) => Math.min(all.length, c + BATCH_STEP))
        }
      },
      { rootMargin: "1200px 0px" },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [renderCount, all.length])

  const visible = all.slice(0, renderCount)

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const isOpen = activeIndex !== null

  const openModal = (index: number) => setActiveIndex(index)
  const closeModal = () => setActiveIndex(null)

  const prev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + all.length) % all.length,
    )
  }, [all.length])

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % all.length))
  }, [all.length])

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
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  // Light prefetch of adjacent images so arrow navigation feels instant.
  useEffect(() => {
    if (activeIndex === null) return
    const neighbours = [
      all[(activeIndex + 1) % all.length],
      all[(activeIndex - 1 + all.length) % all.length],
    ]
    neighbours.forEach((n) => {
      const img = new window.Image()
      img.decoding = "async"
      img.src = n.preload
    })
  }, [activeIndex, all])

  // Back-to-top, only on the full gallery page (no `limit`).
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    if (limit) return
    const onScroll = () => setShowTop(window.scrollY > 800)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [limit])

  return (
    <section className="relative bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {!limit && (
          <div className="mb-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-avanza-green">
                {t.galleryPage.eyebrow ?? "Snapshots"}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
                {t.galleryPage.sectionTitle}
              </h2>
            </div>
            <p className="text-sm font-semibold text-muted-foreground">
              {(t.galleryPage.showingCount ?? "Showing {shown} of {total} photos")
                .replace("{shown}", String(visible.length))
                .replace("{total}", String(all.length))}
            </p>
          </div>
        )}

        {limit && (
          <h2 className="mb-10 text-center text-3xl font-extrabold text-foreground md:text-4xl">
            {t.galleryPage.sectionTitle}
          </h2>
        )}

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {visible.map((img, i) => (
            <GalleryThumb
              key={img.id}
              img={img}
              index={i}
              alt={`${t.galleryPage.photoAlt} ${i + 1} of ${all.length}`}
              onOpen={openModal}
            />
          ))}
        </div>

        {!limit && renderCount < all.length && (
          <div
            ref={sentinelRef}
            className="mt-10 flex flex-col items-center justify-center gap-3 py-6 text-sm text-muted-foreground"
          >
            <span className="inline-flex h-3 w-3 animate-ping rounded-full bg-avanza-green" />
            <span>{t.galleryPage.loadingMore ?? "Loading more photos…"}</span>
          </div>
        )}

        {limit && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 rounded-full bg-avanza-green px-8 py-3.5 text-base font-bold text-avanza-dark shadow-[0_10px_28px_rgba(46,204,113,0.32)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_14px_36px_rgba(46,204,113,0.42)]"
            >
              <Images className="h-5 w-5" />
              {t.galleryPage.viewAllPhotos}
            </Link>
          </div>
        )}
      </div>

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t.galleryPage.backToTop ?? "Back to top"}
          className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-avanza-dark text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105 hover:bg-avanza-green hover:text-avanza-dark"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {isOpen && activeIndex !== null && (
        <Lightbox
          item={all[activeIndex]}
          index={activeIndex}
          total={all.length}
          alt={`${t.galleryPage.photoAlt} ${activeIndex + 1} of ${all.length}`}
          onClose={closeModal}
          onPrev={prev}
          onNext={next}
          closeLabel={t.galleryPage.close}
          downloadLabel={t.galleryPage.download ?? "Download image"}
          prevLabel={t.galleryPage.previous}
          nextLabel={t.galleryPage.next}
        />
      )}
    </section>
  )
}

function GalleryThumb({
  img,
  index,
  alt,
  onOpen,
}: {
  img: GalleryItem
  index: number
  alt: string
  onOpen: (i: number) => void
}) {
  const [loaded, setLoaded] = useState(false)
  const markLoaded = useCallback(() => setLoaded(true), [])
  const imageRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [])
  // Eagerly fetch the very first row so the gallery never appears empty.
  const eager = index < 6

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={alt}
      className="group relative block aspect-square overflow-hidden rounded-xl bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
    >
      {/* Tiny blurred placeholder fills the box instantly */}
      <img
        src={img.blur}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full scale-110 object-cover blur-md transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        decoding="async"
        loading="eager"
      />
      <img
        ref={imageRef}
        src={img.thumb}
        srcSet={img.thumbSrcSet}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        onLoad={markLoaded}
        className={`relative h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        } group-hover:scale-[1.06]`}
      />
      {/* Hover veil + tiny number stamp */}
      <div className="absolute inset-0 bg-avanza-dark/0 transition-colors duration-300 group-hover:bg-avanza-dark/15" />
      <span className="pointer-events-none absolute bottom-2 left-2 rounded-md bg-avanza-dark/60 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-primary-foreground opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
        #{index + 1}
      </span>
    </button>
  )
}

function Lightbox({
  item,
  index,
  total,
  alt,
  onClose,
  onPrev,
  onNext,
  closeLabel,
  downloadLabel,
  prevLabel,
  nextLabel,
}: {
  item: GalleryItem
  index: number
  total: number
  alt: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  closeLabel: string
  downloadLabel: string
  prevLabel: string
  nextLabel: string
}) {
  const [fullLoaded, setFullLoaded] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setFullLoaded(false)
  }, [index])

  // Move focus to the close button when the dialog opens.
  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
        <a
          href={item.download}
          download={`avanza-stem-gallery-${item.id}.jpg`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-label={downloadLabel}
        >
          <Download className="h-6 w-6" aria-hidden="true" />
        </a>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-label={closeLabel}
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        className="absolute left-3 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:left-4"
        aria-label={prevLabel}
      >
        <ChevronLeft className="h-7 w-7" />
      </button>

      <div
        className="relative mx-12 flex max-h-[90vh] w-full max-w-5xl items-center justify-center sm:mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Always-visible quick preview while the full image streams in */}
        <img
          src={item.preload}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 m-auto max-h-[90vh] w-full object-contain transition-opacity duration-500 ${
            fullLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          key={item.id}
          src={item.full}
          alt={alt}
          onLoad={() => setFullLoaded(true)}
          className={`relative max-h-[90vh] w-full object-contain transition-opacity duration-500 ${
            fullLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        className="absolute right-3 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:right-4"
        aria-label={nextLabel}
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">
        {index + 1} / {total}
      </span>
    </div>
  )
}
