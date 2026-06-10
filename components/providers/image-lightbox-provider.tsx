"use client"

import { X } from "lucide-react"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type LightboxImage = {
  src: string
  alt: string
}

type ImageLightboxContextType = {
  openLightbox: (image: LightboxImage) => void
  closeLightbox: () => void
}

const ImageLightboxContext = createContext<ImageLightboxContextType | undefined>(undefined)

export function ImageLightboxProvider({ children }: { children: ReactNode }) {
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null)

  const closeLightbox = useCallback(() => {
    setActiveImage(null)
  }, [])

  const openLightbox = useCallback((image: LightboxImage) => {
    setActiveImage(image)
  }, [])

  useEffect(() => {
    if (!activeImage) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeImage, closeLightbox])

  const value = useMemo(
    () => ({
      openLightbox,
      closeLightbox,
    }),
    [closeLightbox, openLightbox],
  )

  return (
    <ImageLightboxContext.Provider value={value}>
      {children}
      {activeImage && (
        <div
          aria-modal="true"
          aria-label={activeImage.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-in fade-in duration-200 sm:p-6"
          onClick={closeLightbox}
          role="dialog"
        >
          <button
            type="button"
            aria-label="Close image"
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex max-h-[85vh] max-w-[92vw] animate-in items-center justify-center zoom-in-95 duration-200">
            {/* eslint-disable-next-line @next/next/no-img-element -- Cloudinary CDN already handles format/quality optimization for these URLs */}
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[85vh] max-w-[92vw] object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      )}
    </ImageLightboxContext.Provider>
  )
}

export function useImageLightbox() {
  const context = useContext(ImageLightboxContext)
  if (!context) {
    throw new Error("useImageLightbox must be used within an ImageLightboxProvider")
  }
  return context
}
