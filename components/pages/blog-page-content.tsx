"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { NewsletterSignup } from "@/components/blog/newsletter-signup"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"

export function BlogPageContent() {
  const { t } = useLanguage()

  const featuredPost = {
    title: t.blogPage.featuredTitle,
    excerpt: t.blogPage.featuredExcerpt,
    note: t.blogPage.featuredNote,
    image: "/images/workshops/upcoming-python.jpg",
    imageAlt: t.blogPage.featuredImageAlt,
    author: t.blogPage.authorLiamFounder,
    date: t.blogPage.dateFeb20,
    category: t.blogPage.codingCategory,
    href: "/blog/why-every-kid-should-learn-to-code",
  }

  const blogPosts = [
    {
      title: t.blogPage.post1Title,
      excerpt: t.blogPage.post1Excerpt,
      image: "/images/blog/egg-experiment.jpg",
      date: t.blogPage.dateFeb15,
      category: t.blogPage.scienceCategory,
      href: "/blog/5-easy-science-experiments",
    },
    {
      title: t.blogPage.post2Title,
      excerpt: t.blogPage.post2Excerpt,
      image: "https://res.cloudinary.com/dw4uprmkk/image/upload/f_auto,q_auto:good,w_1600/gallery-00158.jpg",
      date: t.blogPage.dateFeb10,
      category: t.blogPage.engineeringCategory,
      href: "/blog/how-to-build-the-strongest-popsicle-stick-bridge",
    },
    {
      title: t.blogPage.post3Title,
      excerpt: t.blogPage.post3Excerpt,
      image: "/images/workshops/upcoming-robotics.jpg",
      date: t.blogPage.dateFeb5,
      category: t.blogPage.roboticsCategory,
      href: "/blog/getting-started-with-lego-robotics",
    },
    {
      title: t.blogPage.post4Title,
      excerpt: t.blogPage.post4Excerpt,
      image: "/images/shared/ai-workshop.jpg",
      date: t.blogPage.dateJan28,
      category: t.blogPage.aiCategory,
      href: "/blog/what-is-ai-explaining-to-kids",
    },
    {
      title: t.blogPage.post5Title,
      excerpt: t.blogPage.post5Excerpt,
      image: "/images/blog/abacus.jpg",
      date: t.blogPage.dateJan20,
      category: t.blogPage.mathCategory,
      href: "/blog/math-games-that-make-learning-fun",
    },
    {
      title: t.blogPage.post6Title,
      excerpt: t.blogPage.post6Excerpt,
      image: "/images/blog/community-workshop.jpg",
      date: t.blogPage.dateJan12,
      category: t.blogPage.communityCategory,
      href: "/blog/building-a-community-stem-workshops",
    },
    {
      title: t.blogPage.post7Title,
      excerpt: t.blogPage.post7Excerpt,
      image: "/images/blog/Triangles-Strongest.jpg",
      date: t.blogPage.dateMar5,
      category: t.blogPage.engineeringCategory,
      href: "/blog/why-triangles-are-an-engineers-secret-weapon",
    },
    {
      title: t.blogPage.post8Title,
      excerpt: t.blogPage.post8Excerpt,
      image: "/images/blog/Failed Bridge.jpeg",
      imageFit: "contain" as const,
      date: t.blogPage.dateMar12,
      category: t.blogPage.engineeringCategory,
      href: "/blog/how-engineers-think-when-something-breaks",
    },
    {
      title: t.blogPage.post9Title,
      excerpt: t.blogPage.post9Excerpt,
      image: "/images/blog/Cardboard Mars Rover.jpeg",
      date: t.blogPage.dateMar19,
      category: t.blogPage.engineeringCategory,
      href: "/blog/design-a-mars-rover-out-of-cardboard",
    },
    {
      title: t.blogPage.post10Title,
      excerpt: t.blogPage.post10Excerpt,
      image: "/images/blog/What AI actually does.jpg",
      date: t.blogPage.dateMar26,
      category: t.blogPage.aiCategory,
      href: "/blog/what-is-ai-actually-doing-when-it-answers-you",
    },
    {
      title: t.blogPage.post11Title,
      excerpt: t.blogPage.post11Excerpt,
      image: "/images/blog/kid thinking.jpg",
      date: t.blogPage.dateApr2,
      category: t.blogPage.engineeringCategory,
      href: "/blog/how-to-think-like-an-inventor-in-20-minutes",
    },
    {
      title: t.blogPage.post12Title,
      excerpt: t.blogPage.post12Excerpt,
      image: "/images/workshops/past-engineering.jpg",
      date: t.blogPage.dateApr9,
      category: t.blogPage.engineeringCategory,
      href: "/blog/why-your-first-design-is-usually-not-your-best-one",
    },
    {
      title: t.blogPage.post13Title,
      excerpt: t.blogPage.post13Excerpt,
      image: "/images/blog/Backpack.jpeg",
      imageFit: "contain" as const,
      date: t.blogPage.dateApr16,
      category: t.blogPage.engineeringCategory,
      href: "/blog/the-engineering-of-a-backpack",
    },
    {
      title: t.blogPage.post15Title,
      excerpt: t.blogPage.post15Excerpt,
      image: "/images/blog/community-workshop.jpg",
      date: t.blogPage.dateApr30,
      category: t.blogPage.communityCategory,
      href: "/blog/what-makes-a-stem-workshop-fun",
    },
    {
      title: t.blogPage.post16Title,
      excerpt: t.blogPage.post16Excerpt,
      image: "/images/workshops/past-engineering.jpg",
      date: t.blogPage.dateMay7,
      category: t.blogPage.engineeringCategory,
      href: "/blog/engineering-inside-school-bus",
    },
    {
      title: t.blogPage.post17Title,
      excerpt: t.blogPage.post17Excerpt,
      image: "/images/curriculums/engineering.jpg",
      date: t.blogPage.dateMay14,
      category: t.blogPage.engineeringCategory,
      href: "/blog/why-airplane-wings-are-curved",
    },
    {
      title: t.blogPage.post18Title,
      excerpt: t.blogPage.post18Excerpt,
      image: "/images/workshops/upcoming-bridge-building.jpg",
      date: t.blogPage.dateMay21,
      category: t.blogPage.engineeringCategory,
      href: "/blog/how-elevators-know-where-to-go",
    },
    {
      title: t.blogPage.post19Title,
      excerpt: t.blogPage.post19Excerpt,
      image: "/images/blog/bridge-build.jpg",
      date: t.blogPage.dateMay28,
      category: t.blogPage.engineeringCategory,
      href: "/blog/why-buildings-sway-in-wind",
    },
    {
      title: t.blogPage.post20Title,
      excerpt: t.blogPage.post20Excerpt,
      image: "/images/workshops/past-science.jpg",
      date: t.blogPage.dateJun4,
      category: t.blogPage.engineeringCategory,
      href: "/blog/engineering-behind-soccer-ball",
    },
    {
      title: t.blogPage.post21Title,
      excerpt: t.blogPage.post21Excerpt,
      image: "/images/curriculums/engineering.jpg",
      date: t.blogPage.dateJun11,
      category: t.blogPage.engineeringCategory,
      href: "/blog/why-manhole-covers-are-round",
    },
    {
      title: t.blogPage.post22Title,
      excerpt: t.blogPage.post22Excerpt,
      image: "/images/workshops/past-engineering.jpg",
      date: t.blogPage.dateJun18,
      category: t.blogPage.engineeringCategory,
      href: "/blog/how-roller-coasters-stay-on-track",
    },
    {
      title: t.blogPage.post23Title,
      excerpt: t.blogPage.post23Excerpt,
      image: "/images/workshops/upcoming-bridge-building.jpg",
      date: t.blogPage.dateJun25,
      category: t.blogPage.engineeringCategory,
      href: "/blog/why-chairs-break",
    },
    {
      title: t.blogPage.post24Title,
      excerpt: t.blogPage.post24Excerpt,
      image: "/images/workshops/past-science.jpg",
      date: t.blogPage.dateJul2,
      category: t.blogPage.engineeringCategory,
      href: "/blog/hidden-engineering-water-bottle",
    },
    {
      title: t.blogPage.post25Title,
      excerpt: t.blogPage.post25Excerpt,
      image: "/images/curriculums/ai.jpg",
      date: t.blogPage.dateJul9,
      category: t.blogPage.aiCategory,
      href: "/blog/can-ai-actually-think",
    },
    {
      title: t.blogPage.post26Title,
      excerpt: t.blogPage.post26Excerpt,
      image: "/images/shared/ai-workshop.jpg",
      date: t.blogPage.dateJul16,
      category: t.blogPage.aiCategory,
      href: "/blog/why-ai-sometimes-gets-things-wrong",
    },
    {
      title: t.blogPage.post27Title,
      excerpt: t.blogPage.post27Excerpt,
      image: "/images/curriculums/ai.jpg",
      date: t.blogPage.dateJul23,
      category: t.blogPage.aiCategory,
      href: "/blog/how-does-your-phone-recognize-your-face",
    },
    {
      title: t.blogPage.post28Title,
      excerpt: t.blogPage.post28Excerpt,
      image: "/images/shared/ai-workshop.jpg",
      date: t.blogPage.dateJul30,
      category: t.blogPage.aiCategory,
      href: "/blog/why-does-autocorrect-make-weird-mistakes",
    },
    {
      title: t.blogPage.post29Title,
      excerpt: t.blogPage.post29Excerpt,
      image: "/images/curriculums/ai.jpg",
      date: t.blogPage.dateAug6,
      category: t.blogPage.aiCategory,
      href: "/blog/what-happens-when-you-ask-ai-a-question",
    },
    {
      title: t.blogPage.post30Title,
      excerpt: t.blogPage.post30Excerpt,
      image: "/images/shared/ai-workshop.jpg",
      date: t.blogPage.dateAug13,
      category: t.blogPage.aiCategory,
      href: "/blog/should-kids-trust-everything-ai-says",
    },
    {
      title: t.blogPage.post31Title,
      excerpt: t.blogPage.post31Excerpt,
      image: "/images/curriculums/ai.jpg",
      date: t.blogPage.dateAug20,
      category: t.blogPage.aiCategory,
      href: "/blog/how-do-video-games-use-ai",
    },
    {
      title: t.blogPage.post32Title,
      excerpt: t.blogPage.post32Excerpt,
      image: "/images/workshops/upcoming-robotics.jpg",
      date: t.blogPage.dateAug27,
      category: t.blogPage.aiCategory,
      href: "/blog/is-a-robot-the-same-thing-as-ai",
    },
    {
      title: t.blogPage.post33Title,
      excerpt: t.blogPage.post33Excerpt,
      image: "/images/workshops/upcoming-robotics.jpg",
      date: t.blogPage.dateSep3,
      category: t.blogPage.roboticsCategory,
      href: "/blog/how-do-robots-know-where-they-are",
    },
    {
      title: t.blogPage.post34Title,
      excerpt: t.blogPage.post34Excerpt,
      image: "/images/curriculums/engineering.jpg",
      date: t.blogPage.dateSep10,
      category: t.blogPage.roboticsCategory,
      href: "/blog/why-robots-are-bad-at-easy-human-tasks",
    },
    {
      title: t.blogPage.post35Title,
      excerpt: t.blogPage.post35Excerpt,
      image: "/images/workshops/past-engineering.jpg",
      date: t.blogPage.dateSep17,
      category: t.blogPage.roboticsCategory,
      href: "/blog/what-makes-a-robot-a-robot",
    },
    {
      title: t.blogPage.post36Title,
      excerpt: t.blogPage.post36Excerpt,
      image: "/images/curriculums/engineering.jpg",
      date: t.blogPage.dateSep24,
      category: t.blogPage.roboticsCategory,
      href: "/blog/how-mars-rovers-drive-without-a-driver",
    },
    {
      title: t.blogPage.post37Title,
      excerpt: t.blogPage.post37Excerpt,
      image: "/images/workshops/upcoming-robotics.jpg",
      date: t.blogPage.dateOct1,
      category: t.blogPage.roboticsCategory,
      href: "/blog/why-robot-hands-are-so-hard-to-make",
    },
    {
      title: t.blogPage.post38Title,
      excerpt: t.blogPage.post38Excerpt,
      image: "/images/workshops/past-engineering.jpg",
      date: t.blogPage.dateOct8,
      category: t.blogPage.roboticsCategory,
      href: "/blog/how-factory-robots-build-cars",
    },
    {
      title: t.blogPage.post39Title,
      excerpt: t.blogPage.post39Excerpt,
      image: "/images/workshops/past-science.jpg",
      date: t.blogPage.dateOct15,
      category: t.blogPage.scienceCategory,
      href: "/blog/why-is-the-sky-blue-but-sunsets-are-orange",
    },
    {
      title: t.blogPage.post40Title,
      excerpt: t.blogPage.post40Excerpt,
      image: "/images/workshops/past-science.jpg",
      date: t.blogPage.dateOct22,
      category: t.blogPage.scienceCategory,
      href: "/blog/why-do-your-ears-pop-on-an-airplane",
    },
    {
      title: t.blogPage.post41Title,
      excerpt: t.blogPage.post41Excerpt,
      image: "/images/workshops/past-science.jpg",
      date: t.blogPage.dateOct29,
      category: t.blogPage.scienceCategory,
      href: "/blog/why-does-metal-feel-colder-than-wood",
    },
    {
      title: t.blogPage.post42Title,
      excerpt: t.blogPage.post42Excerpt,
      image: "/images/curriculums/engineering.jpg",
      date: t.blogPage.dateNov5,
      category: t.blogPage.scienceCategory,
      href: "/blog/why-do-bikes-stay-balanced-when-moving",
    },
    {
      title: t.blogPage.post43Title,
      excerpt: t.blogPage.post43Excerpt,
      image: "/images/workshops/past-science.jpg",
      date: t.blogPage.dateNov12,
      category: t.blogPage.scienceCategory,
      href: "/blog/why-do-we-slip-on-ice",
    },
    {
      title: t.blogPage.post44Title,
      excerpt: t.blogPage.post44Excerpt,
      image: "/images/curriculums/ai.jpg",
      date: t.blogPage.dateNov19,
      category: t.blogPage.scienceCategory,
      href: "/blog/how-do-noise-canceling-headphones-work",
    },
    {
      title: t.blogPage.post45Title,
      excerpt: t.blogPage.post45Excerpt,
      image: "/images/workshops/past-science.jpg",
      date: t.blogPage.dateNov26,
      category: t.blogPage.scienceCategory,
      href: "/blog/why-do-some-things-float-and-others-sink",
    },
    {
      title: t.blogPage.post46Title,
      excerpt: t.blogPage.post46Excerpt,
      image: "/images/curriculums/engineering.jpg",
      date: t.blogPage.dateDec3,
      category: t.blogPage.scienceCategory,
      href: "/blog/why-do-magnets-stick-to-some-metals-but-not-others",
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-avanza-orange to-[#e74c8b] py-12 md:py-14">
        <FadeIn className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-avanza-dark md:text-5xl">
            {t.blogPage.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-avanza-dark">
            {t.blogPage.description}
          </p>
        </FadeIn>
      </section>

      {/* Featured Post */}
      <section className="bg-background py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <Link
              href={featuredPost.href}
              className="group grid overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-colors hover:border-avanza-green-dark/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-dark focus-visible:ring-offset-2 md:grid-cols-2"
            >
              <div className="relative aspect-16/10 md:aspect-auto md:min-h-80">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.imageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center px-6 py-8 md:px-10">
                <span className="text-xs font-bold uppercase tracking-wider text-avanza-green-dark">
                  {t.blogPage.featured}
                </span>
                <h2 className="mt-3 text-2xl font-extrabold leading-tight text-card-foreground md:text-3xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {featuredPost.excerpt}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {featuredPost.note}
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  {featuredPost.author} · {featuredPost.date}
                </p>
                <span className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-avanza-green-dark underline underline-offset-4 group-hover:no-underline">
                  {t.blogPage.readArticle} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="border-t border-border bg-secondary py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="flex flex-col gap-3 border-b border-avanza-green-dark/15 pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground">{t.blogPage.latestPosts}</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">{t.blogPage.creditIntro}</p>
            </div>
          </FadeIn>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <FadeIn key={post.title} delay={i * 75}>
                <BlogCard {...post} readMore={t.blogPage.readMore} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  )
}

function BlogCard({
  title,
  excerpt,
  image,
  imageFit = "cover",
  date,
  category,
  readMore,
  href,
}: {
  title: string
  excerpt: string
  image: string
  imageFit?: "cover" | "contain"
  date: string
  category: string
  readMore: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-card shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-avanza-green-dark/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-dark focus-visible:ring-offset-2"
    >
      <div className="relative h-48 overflow-hidden bg-secondary">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={
            imageFit === "contain"
              ? "object-contain"
              : "object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          }
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-avanza-green-dark">
          {category} <span className="font-normal text-muted-foreground">· {date}</span>
        </p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-card-foreground">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {excerpt}
        </p>
        <span className="mt-auto pt-4 text-sm font-semibold text-avanza-green-dark underline-offset-4 group-hover:underline">
          {readMore}
        </span>
      </div>
    </Link>
  )
}
