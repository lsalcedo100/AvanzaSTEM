"use client"

import NextLink from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useRef, type ComponentProps } from "react"

type NextLinkProps = ComponentProps<typeof NextLink>

/**
 * Project-wide replacement for `next/link`.
 *
 * next/link prefetches every link that scrolls into the viewport, and with
 * Next 16's segment prefetching that is roughly four RSC requests per link.
 * A page here shows 20-40 internal links, so each page view was costing the
 * Vercel CDN 70-150 prefetch requests, more than half of the site's total
 * request volume. This wrapper turns viewport prefetching off and instead
 * prefetches a route once the visitor shows intent (hover or touch), which
 * keeps navigation snappy at a fraction of the request count.
 *
 * Pass `prefetch` explicitly to restore next/link's own behavior for a link.
 */
export default function Link({
  prefetch = false,
  onMouseEnter,
  onTouchStart,
  onFocus,
  ...props
}: NextLinkProps) {
  const router = useRouter()
  const warmed = useRef(false)

  const warm = useCallback(() => {
    if (warmed.current || prefetch !== false) return
    const href = typeof props.href === "string" ? props.href : null
    if (!href || !href.startsWith("/")) return
    warmed.current = true
    router.prefetch(href)
  }, [prefetch, props.href, router])

  return (
    <NextLink
      {...props}
      prefetch={prefetch}
      onMouseEnter={(event) => {
        warm()
        onMouseEnter?.(event)
      }}
      onTouchStart={(event) => {
        warm()
        onTouchStart?.(event)
      }}
      onFocus={(event) => {
        warm()
        onFocus?.(event)
      }}
    />
  )
}
