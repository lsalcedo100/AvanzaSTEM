"use client"

import Link from "next/link"
import { useLanguage } from "@/components/providers/language-provider"
import {
  BlogPostLayout,
  PostCallout,
  PostCode,
  PostCtaLink,
  PostEndingModule,
  PostList,
  PostNumberedList,
  PostParagraph,
  PostQuote,
  PostSection,
  PostSummary,
  PostYouTube,
} from "@/components/blog/blog-post-layout"
import { blogAuthors } from "@/features/blog/authors"
import { localizedBlogArticles, type BlogBlock, type BlogSlug } from "@/features/blog/posts"

export function LocalizedBlogPost({ slug }: { slug: BlogSlug }) {
  const { language, t } = useLanguage()
  const enArticle = localizedBlogArticles.en[slug]
  const localizedArticle = language !== "en" ? localizedBlogArticles[language][slug] : undefined
  const isFallback = language !== "en" && localizedArticle === undefined
  const post = localizedArticle ?? enArticle

  const author = blogAuthors[post.authorId][language === "es" ? "es" : "en"]

  const relatedArticle =
    (language !== "en" ? localizedBlogArticles[language][post.endingRelatedSlug] : undefined) ??
    localizedBlogArticles.en[post.endingRelatedSlug]

  return (
    <BlogPostLayout
      title={post.title}
      category={post.category}
      categoryColor={post.categoryColor}
      date={post.date}
      readTime={post.readTime}
      image={post.image}
      imageAlt={post.imageAlt}
      imageCaption={post.imageCaption}
      imageFit={post.imageFit}
    >
      {isFallback && (
        <div
          role="note"
          className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200"
        >
          {t.blogPage.fallbackNote}
        </div>
      )}
      {post.sections.map((section, index) => (
        <PostSection key={`${section.title}-${index}`} title={section.title}>
          {section.blocks.map((block, blockIndex) => (
            <BlogContentBlock key={blockIndex} block={block} />
          ))}
        </PostSection>
      ))}

      <PostEndingModule
        tryNextLabel={t.blogPage.endingTryNext}
        endingProject={post.endingProject}
        endingSecondary={post.endingSecondary}
        relatedLabel={t.blogPage.endingRelatedGuide}
        relatedHref={`/blog/${post.endingRelatedSlug}`}
        relatedTitle={relatedArticle.title}
        aboutLabel={t.blogPage.endingAbout}
        authorName={author.name}
        authorRole={author.role}
        authorBio={author.bio}
      />
    </BlogPostLayout>
  )
}

function BlogContentBlock({ block }: { block: BlogBlock }) {
  if (block.type === "paragraph") {
    return <PostParagraph>{block.text}</PostParagraph>
  }

  if (block.type === "paragraphWithLink") {
    return (
      <PostParagraph>
        {block.before}
        <Link
          href={block.href}
          className="font-semibold text-avanza-green-dark underline underline-offset-4 hover:text-avanza-teal"
        >
          {block.linkText}
        </Link>
        {block.after}
      </PostParagraph>
    )
  }

  if (block.type === "list") {
    return <PostList items={block.items} />
  }

  if (block.type === "numbered") {
    return <PostNumberedList items={block.items} />
  }

  if (block.type === "callout") {
    return (
      <PostCallout title={block.title} accent={block.accent}>
        {block.text}
      </PostCallout>
    )
  }

  if (block.type === "code") {
    return <PostCode title={block.title} accent={block.accent} code={block.code} />
  }

  if (block.type === "quote") {
    return <PostQuote text={block.text} attribution={block.attribution} />
  }

  if (block.type === "youtube") {
    return <PostYouTube videoId={block.videoId} title={block.title} caption={block.caption} />
  }

  if (block.type === "ctaLink") {
    return (
      <PostCtaLink
        title={block.title}
        text={block.text}
        linkText={block.linkText}
        href={block.href}
        accent={block.accent}
      />
    )
  }

  if (block.type === "summary") {
    return (
      <PostSummary
        timeLabel={block.timeLabel}
        time={block.time}
        ageLabel={block.ageLabel}
        age={block.age}
        supervisionLabel={block.supervisionLabel}
        supervision={block.supervision}
        learnLabel={block.learnLabel}
        learn={block.learn}
        safetyLabel={block.safetyLabel}
        safety={block.safety}
      />
    )
  }

  if (block.type === "experiments") {
    return (
      <>
        {block.items.map((exp) => (
          <div key={exp.title} className="mt-6">
            <h2 className="mb-3 text-xl font-extrabold break-words text-foreground">
              {exp.number}. {exp.title}
            </h2>
            <span className="mb-3 inline-block rounded-full bg-secondary px-3 py-0.5 text-xs font-bold text-muted-foreground">
              {exp.category}
            </span>
            <div className="mt-2 space-y-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-avanza-orange-dark">
                  {exp.materialsLabel}
                </p>
                <ul className="mt-2 ml-4 list-disc space-y-1 text-sm break-words text-foreground/80">
                  {exp.materials.map((material) => (
                    <li key={material}>{material}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-avanza-green-dark">
                  {exp.stepsLabel}
                </p>
                <ol className="mt-2 ml-4 list-decimal space-y-1 text-sm break-words text-foreground/80">
                  {exp.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
              <PostCallout title={exp.scienceLabel} accent="green">
                {exp.science}
              </PostCallout>
            </div>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      {block.items.map((game) => (
        <div key={game.title} className="mt-6">
          <h2 className="mb-3 text-xl font-extrabold break-words text-foreground">{game.title}</h2>
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-secondary px-3 py-0.5 text-xs font-bold text-muted-foreground">
              {game.gradeRange}
            </span>
          </div>
          <PostParagraph>{game.description}</PostParagraph>
          <div className="mt-3">
            <p className="text-xs font-bold uppercase tracking-wider text-avanza-orange-dark">
              {game.howToPlayLabel}
            </p>
            <ol className="mt-2 ml-4 list-decimal space-y-1 text-sm break-words text-foreground/80">
              {game.howToPlay.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <PostCallout title={game.whyItWorksLabel} accent="orange">
            {game.whyItWorks}
          </PostCallout>
        </div>
      ))}
    </>
  )
}
