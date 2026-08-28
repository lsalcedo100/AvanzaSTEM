import { NextResponse, type NextRequest } from "next/server"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

const LOCALE_SEGMENTS = new Set(
  VALID_LANGUAGES.filter((language): language is Exclude<Language, "en"> => language !== "en"),
)

/**
 * Top-level segments with a real app/[locale] route tree behind them.
 *
 * Requests to /es, /zh or /pt under these paths pass through unchanged so
 * Next.js resolves them directly via app/[locale]/..., statically pre-rendered
 * per locale by generateStaticParams. That is what makes the translated copy
 * appear in the server-rendered HTML rather than only after hydration.
 */
const LOCALE_TREE_SEGMENTS = new Set([
  "about",
  "blog",
  "courses",
  "curriculums",
  "faq",
  "find-a-workshop",
  "gallery",
  "games",
  "host",
  "privacy",
  "projects",
  "python-ide",
  "resources",
  "workshops",
])

/**
 * Anything outside that set still falls back to the legacy rewrite below: it is
 * served by the unprefixed English route with an `x-locale` header that
 * getLanguage() reads for metadata. Those pages render English in the initial
 * HTML and switch on hydration, so new locale-aware routes belong in the set
 * above rather than relying on the rewrite.
 */
function isLocaleTreePath(rest: string[]): boolean {
  if (rest.length === 0) return true
  const [first] = rest
  return LOCALE_TREE_SEGMENTS.has(first)
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
