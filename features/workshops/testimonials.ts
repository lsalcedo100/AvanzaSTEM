/**
 * What partner venues and community groups have publicly said about the Maker
 * Mindset Series.
 *
 * Only real, publicly posted statements belong here. Each entry must be
 * traceable to something the source actually published under its own name, so
 * the site never presents an endorsement the partner did not give.
 *
 * The quote text itself lives in i18n (`t.socialProof.quotes[id]`) so it can be
 * translated; the attribution below is the part that must not be translated,
 * because a handle, a venue's own name, and a permalink are the same in every
 * language. Keep the English quote strings verbatim: they are the primary
 * source, and any elision inside one must be marked with an ellipsis.
 */
export type Testimonial = {
  /** Also the i18n key under `socialProof.quotes`. */
  id: TestimonialId
  /** The source, named as it names itself on the account that posted. */
  source: string
  /**
   * Account handle for the byline. Facebook pages are cited by name rather
   * than by handle, so this is optional.
   */
  handle?: string
  platform: "instagram" | "facebook"
  /**
   * Where the statement can be read. A post permalink is preferred; the account
   * profile is the fallback where we only have a screenshot of the post.
   */
  url: string
  /** True once `url` points at the post itself rather than the account. */
  permalink: boolean
  /** Publication date (YYYY-MM-DD), for ordering and for the byline. */
  date: string
}

export type TestimonialId =
  | "chathams-facebook"
  | "roseland-instagram"
  | "troop13-facebook"

/**
 * Ordered as they should read on the page, strongest first, rather than by
 * date: the Chathams post is the one that speaks to what students got out of
 * the series rather than to what the sessions covered.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "chathams-facebook",
    source: "Library of the Chathams",
    platform: "facebook",
    // Account page: we have a screenshot of the post but not its permalink.
    url: "https://www.facebook.com/chathamlibrary/",
    permalink: false,
    date: "2026-06-18",
  },
  {
    id: "roseland-instagram",
    source: "Roseland Free Public Library",
    handle: "@roselandfreepubliclibrary",
    platform: "instagram",
    url: "https://www.instagram.com/p/DZsiQcNEeY9/",
    permalink: true,
    date: "2026-06-17",
  },
  {
    id: "troop13-facebook",
    source: "Boy Scout Troop 13, Montclair",
    platform: "facebook",
    url: "https://www.facebook.com/BSATroop13Montclair/posts/pfbid0pDqKf51mpEbAvfhV1Pc3aKxaQ3GeEoZPFLF619b3PzWy8rZ6RyyCgPNboZkKTV12l",
    permalink: true,
    date: "2026-07-30",
  },
]
