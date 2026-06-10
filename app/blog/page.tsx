import Link from "next/link"
import { Calendar, User, ArrowRight, Clock } from "lucide-react"
import { NewsletterSignup } from "@/components/blog/newsletter-signup"
import { translations } from "@/i18n/translations"
import { getLanguage } from "@/lib/get-language"
import { LightboxImage } from "@/components/ui/lightbox-image"
import { FadeIn } from "@/components/ui/animate"

export default async function BlogPage() {
  const language = await getLanguage()
  const t = translations[language]

  const featuredPost = {
    title: t.blogPage.featuredTitle,
    excerpt: t.blogPage.featuredExcerpt,
    image: "/images/blog/featured-coding.jpg",
    author: t.blogPage.authorLiam,
    date: t.blogPage.dateFeb20,
    readTime: t.blogPage.readTime5,
    category: t.blogPage.codingCategory,
    href: "/blog/why-every-kid-should-learn-to-code",
  }

  const blogPosts = [
    {
      title: t.blogPage.post1Title,
      excerpt: t.blogPage.post1Excerpt,
      image: "/images/blog/egg-experiment.jpg",
      author: t.blogPage.authorLiam,
      date: t.blogPage.dateFeb15,
      readTime: t.blogPage.readTime4,
      category: t.blogPage.scienceCategory,
      color: "bg-avanza-orange",
      href: "/blog/5-easy-science-experiments",
    },
    {
      title: t.blogPage.post2Title,
      excerpt: t.blogPage.post2Excerpt,
      image: "/images/blog/bridge-build.jpg",
      author: t.blogPage.authorLiam,
      date: t.blogPage.dateFeb10,
      readTime: t.blogPage.readTime6,
      category: t.blogPage.engineeringCategory,
      color: "bg-avanza-purple",
      href: "/blog/how-to-build-the-strongest-popsicle-stick-bridge",
    },
    {
      title: t.blogPage.post3Title,
      excerpt: t.blogPage.post3Excerpt,
      image: "/images/shared/lego-robotics.jpeg",
      author: t.blogPage.authorLiam,
      date: t.blogPage.dateFeb5,
      readTime: t.blogPage.readTime5,
      category: t.blogPage.roboticsCategory,
      color: "bg-avanza-green",
      href: "/blog/getting-started-with-lego-robotics",
    },
    {
      title: t.blogPage.post4Title,
      excerpt: t.blogPage.post4Excerpt,
      image: "/images/shared/ai-workshop.jpg",
      author: t.blogPage.authorLiam,
      date: t.blogPage.dateJan28,
      readTime: t.blogPage.readTime4,
      category: t.blogPage.aiCategory,
      color: "bg-avanza-teal",
      href: "/blog/what-is-ai-explaining-to-kids",
    },
    {
      title: t.blogPage.post5Title,
      excerpt: t.blogPage.post5Excerpt,
      image: "/images/blog/abacus.jpg",
      author: t.blogPage.authorLiam,
      date: t.blogPage.dateJan20,
      readTime: t.blogPage.readTime3,
      category: t.blogPage.mathCategory,
      color: "bg-avanza-orange",
      href: "/blog/math-games-that-make-learning-fun",
    },
    {
      title: t.blogPage.post6Title,
      excerpt: t.blogPage.post6Excerpt,
      image: "/images/blog/community-workshop.jpg",
      author: t.blogPage.authorLiam,
      date: t.blogPage.dateJan12,
      readTime: t.blogPage.readTime7,
      category: t.blogPage.communityCategory,
      color: "bg-avanza-purple",
      href: "/blog/building-a-community-stem-workshops",
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-avanza-orange to-[#e74c8b] py-20">
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
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <article className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all duration-300 hover:shadow-xl md:flex">
              <div className="relative min-h-[300px] md:w-1/2">
                <LightboxImage
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  buttonClassName="z-20"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute left-4 top-4 z-30 rounded-full bg-avanza-green px-3 py-1 text-xs font-bold text-avanza-dark">
                  {t.blogPage.featured}
                </span>
              </div>
              <Link
                href={featuredPost.href}
                aria-label={featuredPost.title}
                className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-dark focus-visible:ring-offset-2"
              />
              <div className="pointer-events-none relative z-20 flex flex-col justify-center p-8 md:w-1/2">
                <span className="inline-block w-fit rounded-full bg-avanza-green/10 px-3 py-1 text-xs font-bold text-avanza-green">
                  {featuredPost.category}
                </span>
                <h2 className="mt-4 text-2xl font-extrabold text-card-foreground md:text-3xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <User className="h-4 w-4" /> {featuredPost.author}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {featuredPost.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {featuredPost.readTime}
                  </span>
                </div>
                <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-avanza-green px-6 py-3 text-sm font-bold text-avanza-dark transition-all duration-200 group-hover:scale-105 group-hover:shadow-md">
                  {t.blogPage.readArticle} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          </FadeIn>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="text-3xl font-extrabold text-foreground">{t.blogPage.latestPosts}</h2>
          </FadeIn>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
  author,
  date,
  readTime,
  category,
  color,
  readMore,
  href,
}: {
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  readTime: string
  category: string
  color: string
  readMore: string
  href: string
}) {
  const badgeTextColor =
    color === "bg-avanza-green" || color === "bg-avanza-orange"
      ? "text-avanza-dark"
      : "text-primary-foreground"

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <LightboxImage
          src={image}
          alt={title}
          fill
          buttonClassName="z-20"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className={`pointer-events-none absolute left-4 top-4 z-30 rounded-full ${color} px-3 py-1 text-xs font-bold ${badgeTextColor}`}>
          {category}
        </span>
      </div>
      <Link
        href={href}
        aria-label={title}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-dark focus-visible:ring-offset-2"
      />
      <div className="pointer-events-none relative z-20 p-6">
        <h3 className="text-lg font-bold leading-snug text-card-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <User className="h-3 w-3" /> {author}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {readTime}
          </span>
        </div>

        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-avanza-green transition-all duration-200 group-hover:gap-2 group-hover:text-avanza-teal">
          {readMore} <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  )
}
