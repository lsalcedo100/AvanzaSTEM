"use client"

import Link from "next/link"
import { useLanguage } from "@/components/providers/language-provider"
import {
  BlogPostLayout,
  PostCallout,
  PostList,
  PostNumberedList,
  PostParagraph,
  PostSection,
} from "@/components/blog/blog-post-layout"
import { localizedBlogArticles, type BlogBlock, type BlogSlug } from "@/features/blog/posts"

export function LocalizedBlogPost({ slug }: { slug: BlogSlug }) {
  const { language } = useLanguage()
  const post = localizedBlogArticles[language][slug]

  return (
    <BlogPostLayout
      title={post.title}
      category={post.category}
      categoryColor={post.categoryColor}
      date={post.date}
      readTime={post.readTime}
      author={post.author}
      image={post.image}
      imageAlt={post.imageAlt}
    >
      {post.sections.map((section, index) => (
        <PostSection key={`${section.title}-${index}`} title={section.title}>
          {section.blocks.map((block, blockIndex) => (
            <BlogContentBlock key={blockIndex} block={block} />
          ))}
        </PostSection>
      ))}
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
          className="font-semibold text-avanza-green underline underline-offset-4 hover:text-avanza-teal"
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
    return (
      <PostCallout title={block.title} accent={block.accent}>
        <code className="block whitespace-pre-wrap font-mono text-sm leading-8">
          {block.code}
        </code>
      </PostCallout>
    )
  }

  if (block.type === "experiments") {
    return (
      <>
        {block.items.map((exp) => (
          <div key={exp.title} className="mt-6">
            <h2 className="mb-3 text-xl font-extrabold text-foreground">
              {exp.number}. {exp.title}
            </h2>
            <span className="mb-3 inline-block rounded-full bg-secondary px-3 py-0.5 text-xs font-bold text-muted-foreground">
              {exp.category}
            </span>
            <div className="mt-2 space-y-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-avanza-orange">
                  {exp.materialsLabel}
                </p>
                <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                  {exp.materials.map((material) => (
                    <li key={material}>{material}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-avanza-green">
                  {exp.stepsLabel}
                </p>
                <ol className="mt-2 ml-4 list-decimal space-y-1 text-sm text-muted-foreground">
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
          <h2 className="mb-3 text-xl font-extrabold text-foreground">{game.title}</h2>
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-secondary px-3 py-0.5 text-xs font-bold text-muted-foreground">
              {game.gradeRange}
            </span>
          </div>
          <PostParagraph>{game.description}</PostParagraph>
          <div className="mt-3">
            <p className="text-xs font-bold uppercase tracking-wider text-avanza-orange">
              {game.howToPlayLabel}
            </p>
            <ol className="mt-2 ml-4 list-decimal space-y-1 text-sm text-muted-foreground">
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
