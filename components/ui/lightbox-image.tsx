"use client"

import Image, { type ImageProps } from "next/image"
import { useImageLightbox } from "@/components/providers/image-lightbox-provider"

type LightboxImageProps = ImageProps & {
  lightboxSrc?: string
  lightboxAlt?: string
}

function getLightboxSrc(src: ImageProps["src"], lightboxSrc?: string) {
  if (lightboxSrc) return lightboxSrc
  return typeof src === "string" ? src : "src" in src ? src.src : src.default.src
}

export function LightboxImage({
  alt,
  className,
  lightboxAlt,
  lightboxSrc,
  src,
  fill,
  ...props
}: LightboxImageProps) {
  const { openLightbox } = useImageLightbox()
  const imageSrc = getLightboxSrc(src, lightboxSrc)
  const imageAlt = lightboxAlt ?? alt

  const image = (
    <Image
      {...props}
      src={src}
      alt={alt}
      fill={fill}
      className={className}
    />
  )

  return (
    <button
      type="button"
      aria-label={`Open larger image: ${imageAlt}`}
      className={
        fill
          ? "absolute inset-0 cursor-pointer overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avanza-green"
          : "block w-full cursor-pointer overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avanza-green"
      }
      onClick={() => openLightbox({ src: imageSrc, alt: imageAlt })}
    >
      {image}
    </button>
  )
}
