import type { Metadata } from "next"
import {
  BlogPostLayout,
  PostCallout,
  PostList,
  PostNumberedList,
  PostParagraph,
  PostSection,
} from "@/components/blog/blog-post-layout"

export const metadata: Metadata = {
  title: "What is AI? Explaining Artificial Intelligence to Kids - Avanza STEM",
  description:
    "Artificial intelligence explained for kids. Learn how AI learns from data, where it already lives in daily life, and how to think critically about it.",
  alternates: { canonical: '/blog/what-is-ai-explaining-to-kids' },
  openGraph: {
    title: "What is AI? Explaining Artificial Intelligence to Kids - Avanza STEM",
    description: "Artificial intelligence explained for kids. Learn how AI learns from data, where it already lives in daily life, and how to think critically about it.",
    url: 'https://avanzastem.org/blog/what-is-ai-explaining-to-kids',
    type: 'article',
    images: [{ url: '/images/og-default-en.png', width: 1200, height: 630, alt: 'Avanza STEM' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "What is AI? Explaining Artificial Intelligence to Kids - Avanza STEM",
    description: "Artificial intelligence explained for kids. Learn how AI learns from data, where it already lives in daily life, and how to think critically about it.",
    images: ['/images/og-default-en.png'],
  },
}

const blogPostJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'What is AI? Explaining Artificial Intelligence to Kids',
  description: 'Artificial intelligence explained for kids. Learn how AI learns from data, where it already lives in daily life, and how to think critically about it.',
  author: { '@type': 'Person', name: 'Liam Salcedo' },
  publisher: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
  datePublished: '2026-01-28',
  url: 'https://avanzastem.org/blog/what-is-ai-explaining-to-kids',
}

export default function WhatIsAIPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <BlogPostLayout
      title="What is AI? Explaining Artificial Intelligence to Kids"
      category="AI"
      categoryColor="bg-avanza-teal"
      date="January 28, 2026"
      readTime="4 min"
      author="Liam Salcedo"
      image="/images/shared/ai-workshop.jpg"
      imageAlt="Kids exploring AI concepts in a workshop setting"
    >
      <PostSection title="">
        <PostParagraph>
          Artificial intelligence is already part of every child's daily life — it recommends
          their next YouTube video, decides what appears in their social media feed, powers the
          voice assistant on the family phone, and filters spam from email. But most kids (and
          many adults) have no idea how any of it actually works.
        </PostParagraph>
        <PostParagraph>
          Understanding AI at a basic level is no longer a niche skill. It is a form of literacy.
          Students who can look at an AI system and ask "what data was it trained on?" or "whose
          perspective is missing from this output?" are better prepared for a world that is
          increasingly shaped by algorithms.
        </PostParagraph>
      </PostSection>

      <PostSection title="Start With What Kids Already Know">
        <PostParagraph>
          The easiest entry point for explaining AI is showing kids the AI they already interact
          with. Try this conversation starter at home:
        </PostParagraph>
        <PostCallout accent="teal">
          <em>
            "When Spotify puts a new song in your playlist — one you have never heard before — how
            do you think it decided to put it there?"
          </em>
        </PostCallout>
        <PostParagraph>
          Most kids will say something like "it knows what I like." Push deeper: how does it know?
          It watched what you listened to, what you skipped, how long you played each track, and
          what other users with similar history listened to next. It found patterns in your
          behavior — and that pattern-finding is the core of what AI does.
        </PostParagraph>
      </PostSection>

      <PostSection title="A Simple Way to Explain How AI Learns">
        <PostParagraph>
          The most intuitive explanation for how AI works is this: AI learns from examples.
        </PostParagraph>
        <PostParagraph>
          Imagine teaching a young child to recognize dogs. You do not give them a technical
          definition — you just show them hundreds of dogs and say "dog" each time. Eventually,
          they build an internal sense of what makes something a dog: four legs, fur, a certain
          face shape. They can now identify dogs they have never seen before.
        </PostParagraph>
        <PostParagraph>
          Machine learning works the same way. You show an algorithm thousands of labeled
          examples. It finds the mathematical patterns that separate one category from another.
          Then it applies those patterns to new data it has never seen.
        </PostParagraph>
        <PostCallout title="The Technical Term" accent="green">
          This type of AI is called supervised learning. The "supervision" just means that the
          training examples are labeled — the algorithm knows the right answer for each example
          during training.
        </PostCallout>
      </PostSection>

      <PostSection title="Types of AI Worth Explaining to Kids">
        <PostNumberedList
          items={[
            {
              title: "Image recognition",
              body: "The AI that unlocks your phone with your face, tags people in photos, or detects tumors in medical scans. It was trained on millions of labeled images and learned to identify visual patterns.",
            },
            {
              title: "Recommendation systems",
              body: "The AI behind Netflix, Spotify, YouTube, and Instagram feeds. It tracks behavior across millions of users and finds patterns to predict what you will engage with next.",
            },
            {
              title: "Language models (like ChatGPT)",
              body: "Trained on enormous amounts of text from the internet and books, these systems learned the statistical patterns of language well enough to generate convincing sentences. They do not \"understand\" words the way humans do — they predict what word most likely comes next.",
            },
            {
              title: "Game-playing AI",
              body: "Programs like AlphaGo and the AI in video games learn through reinforcement learning — playing the game millions of times and adjusting their strategy based on what worked and what did not.",
            },
          ]}
        />
      </PostSection>

      <PostSection title="What AI Cannot Do (And Why That Matters)">
        <PostParagraph>
          One of the most important things to teach kids about AI is its limitations. AI systems
          can:
        </PostParagraph>
        <PostList
          items={[
            "Only recognize patterns in the type of data they were trained on",
            "Reflect and amplify the biases present in their training data",
            "Confidently give wrong answers if the question is outside their training distribution",
            "Optimize for a measurable metric while missing the actual goal entirely",
          ]}
        />
        <PostParagraph>
          A concrete example: if a hiring algorithm is trained on historical hiring data from a
          company that mostly hired men, it will learn to prefer male candidates — not because it
          was told to, but because it found that pattern in the data. The AI is doing its job
          perfectly while producing a deeply biased outcome.
        </PostParagraph>
        <PostParagraph>
          Teaching kids to ask "what was this trained on?" is one of the most valuable critical
          thinking skills we can give them for the world they are growing up in.
        </PostParagraph>
      </PostSection>

      <PostSection title="A Hands-On Activity: Train Your Own Image Classifier">
        <PostParagraph>
          Google's Teachable Machine (teachablemachine.withgoogle.com) is a free browser tool
          that lets anyone train an image classifier without writing any code. Here is a simple
          project:
        </PostParagraph>
        <PostList
          items={[
            "Go to teachablemachine.withgoogle.com and choose Image Project",
            "Create two classes — for example, \"thumbs up\" and \"thumbs down\"",
            "Train each class by holding different poses in front of your camera",
            "Click Train Model and then test it — show a new pose and see what the AI predicts",
            "Ask: what happens if you train it with only 5 examples? What about 50? What does that tell you?",
          ]}
        />
        <PostCallout accent="teal">
          This single activity demonstrates data collection, model training, inference, and the
          relationship between data quality and model performance — all core AI concepts — in
          about 10 minutes with no prior knowledge required.
        </PostCallout>
      </PostSection>

      <PostSection title="Responsible AI: The Part Most Tutorials Skip">
        <PostParagraph>
          In our AI workshop, we spend significant time talking about what it means to use AI
          responsibly. Not just "do not cheat on homework" — but deeper questions like: When
          should you trust AI output and when should you verify it? What happens when you rely on
          AI for things you should learn yourself? Who is accountable when an AI system makes a
          mistake that harms someone?
        </PostParagraph>
        <PostParagraph>
          These are not abstract ethics lessons. They are practical questions kids will face
          regularly as AI tools become embedded in school, work, and daily life. Starting the
          conversation early, while they are still developing their critical thinking framework,
          is one of the most important things we can do.
        </PostParagraph>
      </PostSection>
    </BlogPostLayout>
    </>
  )
}
