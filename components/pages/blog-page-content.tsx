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
  ]

  const topicClusters = [
    {
      title: "Coding",
      description: "Begin with a tiny program, then grow it into a real project students can edit.",
      href: "/projects/my-first-python-program",
      link: "first Python quiz game",
    },
    {
      title: "Science experiments",
      description: "Use variables, safety notes, and data tables to turn exciting demos into fair tests.",
      href: "/projects/coke-mentos-experiment",
      link: "coke and Mentos science project",
    },
    {
      title: "Engineering builds",
      description: "Design, build, test, and improve structures and machines with everyday materials.",
      href: "/projects/popsicle-stick-bridge",
      link: "popsicle stick truss bridge",
    },
    {
      title: "AI for kids",
      description: "Explain machine learning with hands-on examples before students use AI tools.",
      href: "/blog/what-is-ai-explaining-to-kids",
      link: "AI for kids guide",
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

      <section className="border-y border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="text-2xl font-extrabold text-foreground">Explore STEM topic clusters</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Follow a topic from a short article into a hands-on project guide.
            </p>
          </FadeIn>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {topicClusters.map((cluster, i) => (
              <FadeIn key={cluster.title} delay={i * 60}>
                <article className="h-full rounded-md border border-border bg-card p-5">
                  <h3 className="font-bold text-card-foreground">{cluster.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {cluster.description}
                  </p>
                  <Link
                    href={cluster.href}
                    className="mt-4 inline-flex text-sm font-semibold text-avanza-green-dark underline underline-offset-4"
                  >
                    {cluster.link}
                  </Link>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="text-3xl font-extrabold text-foreground">{t.blogPage.latestPosts}</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">{t.blogPage.creditIntro}</p>
          </FadeIn>
          <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
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
  date,
  category,
  readMore,
  href,
}: {
  title: string
  excerpt: string
  image: string
  date: string
  category: string
  readMore: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-dark focus-visible:ring-offset-2"
    >
      <div className="relative h-44 overflow-hidden rounded-md shadow-sm">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-avanza-green-dark">
          {category} <span className="font-normal text-muted-foreground">· {date}</span>
        </p>
        <h3 className="mt-1.5 text-lg font-bold leading-snug text-card-foreground">{title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {excerpt}
        </p>
        <span className="mt-2 inline-block text-sm font-semibold text-avanza-green-dark underline underline-offset-4 group-hover:no-underline">
          {readMore}
        </span>
      </div>
    </Link>
  )
}
