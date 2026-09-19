"use client"

import Link from "next/link"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { WhoItsForSection } from "@/components/pages/home/WhoItsForSection"

/**
 * One solid, squared-off button per screenful and underlined text links for
 * everything else: the same action idiom as the course and host pages, without
 * pill shapes, icons, or hover lifts.
 */
const solidButton =
  "inline-flex items-center rounded-md bg-avanza-green-dark px-5 py-3.5 text-sm font-bold text-white transition-colors duration-150 hover:bg-avanza-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 sm:px-7 sm:text-base"
const textLink =
  "font-bold text-foreground underline decoration-avanza-green decoration-2 underline-offset-[6px] transition-all hover:decoration-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"

export function AboutPageContent() {
  const { t } = useLanguage()

  const teamMembers = [
    {
      name: "Liam Salcedo",
      role: t.aboutPage.founderRole,
      bio: t.aboutPage.founderBio,
      image: "/images/about/liam.jpeg",
      imageAlt: t.aboutPage.liamPhotoAlt,
      imagePosition: "object-[center_35%]",
    },
    {
      name: 'Enqi "Tommy" Qi',
      role: t.aboutPage.tommyRole,
      bio: t.aboutPage.tommyBio,
      image: "/images/about/enqi.jpeg",
      imageAlt: t.aboutPage.tommyPhotoAlt,
      imagePosition: "object-center",
    },
  ]

  const contributorMembers = [
    {
      name: "Alejandro Villafana",
      role: t.aboutPage.workshopContributorRole,
      bio: t.aboutPage.alejandroBio,
      image: "/images/about/Alejandro Villafana.png",
      imageAlt: t.aboutPage.alejandroPhotoAlt,
      imagePosition: "object-center",
    },
    {
      name: "Logan Smith",
      role: t.aboutPage.websiteContributorRole,
      bio: t.aboutPage.loganBio,
      image: "/images/about/Logan Smith.png",
      imageAlt: t.aboutPage.loganPhotoAlt,
      imagePosition: "object-center",
    },
    {
      name: "Thomas Flick",
      role: t.aboutPage.workshopContributorRole,
      bio: t.aboutPage.thomasBio,
      image: "/images/about/Thomas Flick.jpg",
      imageAlt: t.aboutPage.thomasPhotoAlt,
      imagePosition: "object-center",
    },
  ]

  const whyParagraphs = [
    t.aboutPage.whyP1,
    t.aboutPage.whyP2,
    t.aboutPage.whyP3,
    t.aboutPage.whyP4,
  ].filter(Boolean)

  return (
    <>
      {/* Masthead: the name on the left, what the program is on the right.
          Compact and typographic, unlike the photo-led host cover and the
          band-and-media covers on the home and course pages. */}
      <section className="border-b border-avanza-dark/10 bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-6 px-6 py-10 md:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-bold text-avanza-green-dark">{t.aboutPage.eyebrow}</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold leading-[1.02] text-avanza-dark sm:text-5xl lg:text-6xl">
              {t.aboutPage.title}
            </h1>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-avanza-dark/75 lg:pb-1.5">
            {t.aboutPage.description}
          </p>
        </div>
      </section>

      {/* The founder's letter, signed, with the two of them beside it. */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <FadeIn className="grid items-start gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                {t.aboutPage.whyTitle}
              </h2>
              {whyParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={`${index === 0 ? "mt-5" : "mt-4"} text-lg leading-relaxed text-muted-foreground`}
                >
                  {paragraph}
                </p>
              ))}
              <div className="mt-8 border-t border-border pt-4">
                <p className="text-base font-extrabold text-foreground">
                  {t.aboutPage.whySignatureName}
                </p>
                <p className="text-sm text-muted-foreground">{t.aboutPage.whySignatureRole}</p>
              </div>
            </div>
            {/* Sticky on desktop so the photo keeps the letter company instead
                of leaving a blank column once it scrolls past. */}
            <figure className="w-full max-w-xs lg:sticky lg:top-28 lg:max-w-none">
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-lg bg-secondary">
                <LightboxImage
                  src="/images/about/liam-and-enqi.jpg"
                  alt={t.aboutPage.teamPhotoAlt}
                  fill
                  sizes="20rem"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 border-l-2 border-avanza-green pl-4 text-sm leading-relaxed text-muted-foreground">
                {t.aboutPage.teamPhotoCaption}
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      {/* Linked to as /about#team, from the Shanghai translation credit on the
          workshops page. */}
      <section id="team" className="scroll-mt-24 bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
              {t.aboutPage.teamTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {t.aboutPage.teamDesc}
            </p>
          </div>

          <FadeIn className="mt-8">
            {/* The two people who run the program: a photo beside the story,
                on ruled rows rather than in boxed cards. */}
            <ul className="border-t-2 border-avanza-green">
              {teamMembers.map((member) => (
                <li
                  key={member.name}
                  className="grid gap-5 border-b border-border py-6 sm:grid-cols-[9rem_1fr] sm:gap-8 md:grid-cols-[11rem_1fr] md:gap-10"
                >
                  <div className="relative aspect-3/4 w-36 overflow-hidden rounded-lg bg-background sm:w-full">
                    <LightboxImage
                      src={member.image}
                      alt={member.imageAlt}
                      fill
                      sizes="(min-width: 768px) 11rem, 9rem"
                      className={`object-cover ${member.imagePosition}`}
                    />
                  </div>
                  <div className="max-w-3xl">
                    <h3 className="text-xl font-extrabold text-foreground">{member.name}</h3>
                    <p className="mt-1 text-sm font-bold text-avanza-green-dark">{member.role}</p>
                    {member.bio.split("\n\n").map((paragraph, index) => (
                      <p
                        key={paragraph}
                        className={
                          index === 0
                            ? "mt-4 text-base leading-relaxed text-muted-foreground"
                            : "mt-3 text-sm leading-relaxed text-muted-foreground"
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            {/* Everyone who has helped, one compact row each. */}
            <h3 className="mt-10 border-b-2 border-avanza-green pb-2 text-base font-extrabold text-foreground">
              {t.aboutPage.contributorsTitle}
            </h3>
            <ul>
              {contributorMembers.map((member) => (
                <li
                  key={member.name}
                  className="grid grid-cols-[3.5rem_1fr] items-start gap-x-5 gap-y-2 border-b border-border py-4 sm:grid-cols-[3.5rem_13rem_1fr] sm:gap-x-6"
                >
                  <div className="relative h-14 w-14 overflow-hidden rounded-md bg-background">
                    <LightboxImage
                      src={member.image}
                      alt={member.imageAlt}
                      fill
                      sizes="3.5rem"
                      className={`object-cover ${member.imagePosition}`}
                    />
                  </div>
                  <div>
                    <p className="font-bold leading-snug text-foreground">{member.name}</p>
                    <p className="mt-0.5 text-sm font-semibold text-avanza-green-dark">{member.role}</p>
                  </div>
                  <p className="col-span-2 text-sm leading-relaxed text-muted-foreground sm:col-span-1">
                    {member.bio}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-muted-foreground">
              {t.aboutPage.helpText}{" "}
              <a
                href="mailto:liam@avanzastem.org"
                className="font-bold text-foreground underline decoration-avanza-green decoration-2 underline-offset-4 transition-all hover:decoration-4"
              >
                liam@avanzastem.org
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      <WhoItsForSection />

      {/* Volunteering and support, as two ruled blocks rather than a bullet
          list beside a card. */}
      <section id="get-involved" className="scroll-mt-24 bg-background">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <FadeIn className="grid gap-x-16 gap-y-12 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="text-sm font-bold text-avanza-green-dark">
                {t.aboutPage.getInvolvedEyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                {t.aboutPage.getInvolvedTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {t.aboutPage.getInvolvedDesc}
              </p>

              <p className="mt-8 border-b-2 border-avanza-green pb-2 text-base font-extrabold text-foreground">
                {t.aboutPage.getInvolvedWho}
              </p>
              <ul className="sm:grid sm:grid-cols-2 sm:gap-x-10">
                {t.aboutPage.getInvolvedItems.map((item) => (
                  <li
                    key={item}
                    className="border-b border-border py-3 text-base leading-relaxed text-foreground/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                {t.aboutPage.getInvolvedCommitment}
              </p>
              <a href="mailto:liam@avanzastem.org" className={`mt-6 ${solidButton}`}>
                {t.aboutPage.getInvolvedCTA}
              </a>
            </div>

            <div>
              <h3 className="border-b-2 border-avanza-green pb-2 text-base font-extrabold text-foreground">
                {t.aboutPage.supportTitle}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {t.aboutPage.supportDesc}
              </p>
              <p className="mt-4 text-base font-semibold text-foreground">
                {t.aboutPage.supportCTA}
              </p>
              <a href="mailto:liam@avanzastem.org" className={`mt-4 inline-block ${textLink}`}>
                {t.aboutPage.supportEmail}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Closer: one row, one button, one link. */}
      <section className="border-t border-avanza-dark/10 bg-secondary">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-x-12 gap-y-6 px-6 py-10 md:py-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-avanza-dark md:text-3xl">
              {t.aboutPage.ctaTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-avanza-dark/75">
              {t.aboutPage.ctaDesc}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/workshops" className={solidButton}>
              {t.aboutPage.findWorkshop}
            </Link>
            <a href="mailto:liam@avanzastem.org" className={textLink}>
              {t.aboutPage.contactUs}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
