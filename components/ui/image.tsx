"use client"

import NextImage, { type ImageProps } from "next/image"
import { cloudinaryLoader, isCloudinaryUrl } from "@/components/ui/cloudinary-loader"

/**
 * Project-wide replacement for `next/image`.
 *
 * Photos hosted on Cloudinary are loaded straight from Cloudinary at the
 * width next/image asks for (see cloudinary-loader.ts), instead of being
 * proxied through Vercel's /_next/image endpoint. Local files under /public
 * still go through /_next/image as before. Pass your own `loader` or
 * `unoptimized` to opt out.
 */
export default function Image(props: ImageProps) {
  const { src, loader, unoptimized } = props
  if (!loader && !unoptimized && typeof src === "string" && isCloudinaryUrl(src)) {
    return <NextImage {...props} loader={cloudinaryLoader} />
  }
  return <NextImage {...props} />
}
