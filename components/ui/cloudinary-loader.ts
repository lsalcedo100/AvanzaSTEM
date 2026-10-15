// next/image loader for photos hosted on Cloudinary. Pure functions, no React,
// so `npm test` can import it (see cloudinary-loader.test.ts).
//
// Without a loader, next/image fetches Cloudinary photos through Vercel's
// /_next/image optimizer. Every one of those is a Vercel CDN request plus an
// Image Optimization transformation, while Cloudinary already resizes and
// picks the best format on its own CDN. This loader rewrites the URL so the
// browser asks Cloudinary for the width next/image wants and Vercel never sees
// the request. The hero carousel and the gallery grid already load from
// Cloudinary directly, so this brings the remaining <Image> usages in line.

import type { ImageLoaderProps } from "next/image"

const CLOUDINARY_UPLOAD_URL = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.*)$/

/**
 * Widths Cloudinary is asked for. next/image's srcset lists up to sixteen
 * candidate widths; snapping them to this ladder keeps the number of derived
 * images per photo (and Cloudinary transformations) small.
 */
export const CLOUDINARY_WIDTHS = [128, 256, 384, 640, 828, 1080, 1600] as const

export function isCloudinaryUrl(src: string): boolean {
  return CLOUDINARY_UPLOAD_URL.test(src)
}

export function snapCloudinaryWidth(width: number): number {
  return CLOUDINARY_WIDTHS.find((candidate) => candidate >= width) ?? CLOUDINARY_WIDTHS[CLOUDINARY_WIDTHS.length - 1]
}

const SIZE_OR_FORMAT_TOKEN = /^(w|h|f|dpr)_/
const QUALITY_TOKEN = /^q_/
const VERSION_SEGMENT = /^v\d+$/

export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const match = CLOUDINARY_UPLOAD_URL.exec(src)
  if (!match) return src

  const [, base, rest] = match
  const segments = rest.split("/")
  const file = segments.pop() ?? ""

  // Keep crop/gravity/rotation tokens from the existing transformation,
  // drop anything that fixes width, height, format or pixel density.
  const kept: string[] = []
  const passthrough: string[] = []
  let qualityToken: string | null = null
  for (const segment of segments) {
    if (VERSION_SEGMENT.test(segment)) {
      passthrough.push(segment)
      continue
    }
    for (const token of segment.split(",")) {
      if (!token || SIZE_OR_FORMAT_TOKEN.test(token)) continue
      if (QUALITY_TOKEN.test(token)) {
        qualityToken = token
        continue
      }
      kept.push(token)
    }
  }

  const q = quality ? `q_${quality}` : (qualityToken ?? "q_auto:good")
  const transformation = [...kept, "f_auto", q, `w_${snapCloudinaryWidth(width)}`].join(",")

  return `${base}${[transformation, ...passthrough, file].join("/")}`
}
