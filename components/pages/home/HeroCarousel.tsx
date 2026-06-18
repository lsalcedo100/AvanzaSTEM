"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { preExpansionGalleryImages, tx } from "@/components/ui/gallery"

// 1-indexed positions into the gallery, in the order they should appear here.
const HERO_PHOTO_POSITIONS = [1, 18, 7, 33, 40, 164, 78, 114]
const AUTOPLAY_MS = 10000
const TRANSITION_MS = 550
const WIDTHS = [480, 768, 1024, 1280, 1600]

function heroUrl(id: string, width: number) {
  // g_auto lets Cloudinary crop around faces/activity instead of the center.
  return tx(id, `c_fill,ar_3:2,g_auto,f_auto,q_auto:good,w_${width}`)
}

type Transition = { from: number; to: number; dir: 1 | -1 }

export function HeroCarousel() {
  const { t } = useLanguage()
  const slides = useMemo(
    () =>
      HERO_PHOTO_POSITIONS.map((position) => {
        const img = preExpansionGalleryImages[position - 1]
        return {
          id: img.id,
          src: heroUrl(img.id, 1280),
          srcSet: WIDTHS.map((w) => `${heroUrl(img.id, w)} ${w}w`).join(", "),
        }
      }),
    [],
  )

  const [current, setCurrent] = useState(0)
  const [transition, setTransition] = useState<Transition | null>(null)
  const [animatePhase, setAnimatePhase] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Every photo starts fetching in the background as soon as the carousel
  // mounts, so by the time a slide transitions in, the browser already has
  // it cached and decoded - no pop-in once the animation finishes.
  useEffect(() => {
    slides.forEach((slide, i) => {
      if (i === 0) return
      const preload = new window.Image()
      preload.decoding = "async"
      preload.src = slide.src
    })
  }, [slides])

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  const goTo = useCallback(
    (targetIndex: number, dir: 1 | -1) => {
      setTransition((existing) => {
        if (existing) return existing
        const to = ((targetIndex % slides.length) + slides.length) % slides.length
        if (to === current) return existing
        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
        transitionTimeoutRef.current = setTimeout(() => {
          setCurrent(to)
          setTransition(null)
        }, TRANSITION_MS)
        return { from: current, to, dir }
      })
    },
    [current, slides.length],
  )

  const startTimer = useCallback(() => {
    clearTimer()
    timerRef.current = setInterval(() => goTo(current + 1, 1), AUTOPLAY_MS)
  }, [clearTimer, goTo, current])

  useEffect(() => {
    startTimer()
    return clearTimer
  }, [startTimer, clearTimer])

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
    }
  }, [])

  // Run the actual transform change a frame after mount so the browser
  // registers the starting position before animating to the end position.
  useEffect(() => {
    if (!transition) {
      setAnimatePhase(false)
      return
    }
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimatePhase(true))
    })
    return () => cancelAnimationFrame(raf)
  }, [transition])

  const manualNav = useCallback(
    (dir: 1 | -1) => {
      goTo(current + dir, dir)
      startTimer()
    },
    [current, goTo, startTimer],
  )

  const prev = useCallback(() => manualNav(-1), [manualNav])
  const next = useCallback(() => manualNav(1), [manualNav])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
      const active = document.activeElement
      const isEditing =
        active instanceof HTMLElement &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.isContentEditable)
      if (isEditing) return
      if (e.key === "ArrowLeft") prev()
      else next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev, next])

  const renderSlide = (i: number, transform: string, withTransition: boolean) => {
    const slide = slides[i]
    return (
      <img
        key={`${slide.id}-${i === transition?.from ? "out" : "in"}`}
        src={slide.src}
        srcSet={slide.srcSet}
        sizes="(max-width: 768px) calc(100vw - 48px), (max-width: 1280px) 52vw, 760px"
        alt={`${t.home.heroImageAlt} (${i + 1}/${slides.length})`}
        loading={i === 0 ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={i === 0 ? "high" : "auto"}
        aria-hidden={i !== current}
        className={`absolute inset-0 h-full w-full object-cover will-change-transform ${
          withTransition ? "transition-transform duration-550 ease-in-out" : ""
        }`}
        style={{ transform }}
      />
    )
  }

  return (
    <div
      className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-secondary shadow-xl ring-1 ring-avanza-dark/10"
      role="region"
      aria-roledescription="carousel"
    >
      {transition ? (
        <>
          {renderSlide(
            transition.from,
            animatePhase ? `translateX(${-100 * transition.dir}%)` : "translateX(0%)",
            true,
          )}
          {renderSlide(
            transition.to,
            animatePhase ? "translateX(0%)" : `translateX(${100 * transition.dir}%)`,
            true,
          )}
        </>
      ) : (
        renderSlide(current, "translateX(0%)", false)
      )}

      <button
        type="button"
        onClick={prev}
        aria-label={t.home.heroPrevPhoto}
        className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-avanza-dark shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-avanza-green sm:h-11 sm:w-11"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label={t.home.heroNextPhoto}
        className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-avanza-dark shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-avanza-green sm:h-11 sm:w-11"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
