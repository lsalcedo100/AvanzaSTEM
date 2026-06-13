const canonicalUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.avanzastem.org"

export const siteConfig = {
  name: "Avanza STEM",
  url: canonicalUrl.replace(/\/+$/, ""),
}
