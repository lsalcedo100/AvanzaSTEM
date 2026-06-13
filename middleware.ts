import { NextResponse, type NextRequest } from "next/server"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

const LOCALE_SEGMENTS = new Set(
  VALID_LANGUAGES.filter((language): language is Exclude<Language, "en"> => language !== "en"),
)

/**
 * Paths handled natively by the static app/[locale] route tree
 * (home, /projects, /projects/[slug], /blog, /blog/[slug], /curriculums).
 * Requests to /es or /zh under these paths are passed through unchanged so
 * Next.js resolves them directly via app/[locale]/... (statically
 * pre-rendered via generateStaticParams).
 *
 * All other /es and /zh paths (about, faq, gallery, games, host, workshops,
 * find-a-workshop, privacy, etc.) are not yet migrated to app/[locale] and
 * fall back to the legacy rewrite below: they are served by the unprefixed
 * English route with an `x-locale` header, which getLanguage() reads via
 * headers() - this keeps those routes working but dynamic (ƒ).
 */
function isLocaleTreePath(rest: string[]): boolean {
  if (rest.length === 0) return true
  const [first] = rest
  if (first === "projects" || first === "blog") return true
  if (first === "curriculums" && rest.length === 1) return true
  return false
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const [, maybeLocale, ...rest] = pathname.split("/")

  if (LOCALE_SEGMENTS.has(maybeLocale as Exclude<Language, "en">)) {
    if (isLocaleTreePath(rest)) {
      return NextResponse.next()
    }

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-locale", maybeLocale)

    const url = request.nextUrl.clone()
    url.pathname = `/${rest.join("/")}`

    return NextResponse.rewrite(url, { request: { headers: requestHeaders } })
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-locale", "en")
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
}
