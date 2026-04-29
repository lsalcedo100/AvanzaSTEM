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
  title: "Why Every Kid Should Learn to Code (And How to Start) - Avanza STEM",
  description:
    "Coding teaches problem-solving, creativity, and logic. Learn how to start your child with Python programming — no prior experience needed.",
  alternates: { canonical: '/blog/why-every-kid-should-learn-to-code' },
  openGraph: {
    title: "Why Every Kid Should Learn to Code (And How to Start) - Avanza STEM",
    description: "Coding teaches problem-solving, creativity, and logic. Learn how to start your child with Python programming — no prior experience needed.",
    url: 'https://avanzastem.org/blog/why-every-kid-should-learn-to-code',
    type: 'article',
    images: [{ url: '/images/og-default-en.png', width: 1200, height: 630, alt: 'Avanza STEM' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Every Kid Should Learn to Code (And How to Start) - Avanza STEM",
    description: "Coding teaches problem-solving, creativity, and logic. Learn how to start your child with Python programming — no prior experience needed.",
    images: ['/images/og-default-en.png'],
  },
}

const blogPostJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Why Every Kid Should Learn to Code (And How to Start)',
  description: 'Coding teaches problem-solving, creativity, and logic. Learn how to start your child with Python programming — no prior experience needed.',
  author: { '@type': 'Person', name: 'Liam Salcedo' },
  publisher: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
  datePublished: '2026-02-20',
  url: 'https://avanzastem.org/blog/why-every-kid-should-learn-to-code',
}

export default function WhyKidsShouldLearnToCodePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <BlogPostLayout
      title="Why Every Kid Should Learn to Code (And How to Start)"
      category="Coding"
      categoryColor="bg-avanza-green"
      date="February 20, 2026"
      readTime="5 min"
      author="Liam Salcedo"
      image="/images/blog/featured-coding.jpg"
      imageAlt="A child learning to code on a laptop"
    >
      <PostSection title="">
        <PostParagraph>
          Coding is not just for tech professionals anymore. In 2026, the ability to write code —
          or even just understand the logic behind it — is becoming as foundational as reading and
          writing. Yet many kids still go through school without ever writing a single line. That
          gap is widening, and it starts early.
        </PostParagraph>
        <PostParagraph>
          At Avanza STEM, we see firsthand how transformative it is when a young student writes
          their first program and watches it actually run. The look on their face is not just
          excitement — it is the realization that they can build things. That feeling is worth
          everything.
        </PostParagraph>
      </PostSection>

      <PostSection title="It Is Not Really About Code">
        <PostParagraph>
          The biggest misconception about teaching kids to code is that the goal is to produce
          programmers. It is not. The real value is in the thinking patterns that coding develops:
        </PostParagraph>
        <PostList
          items={[
            "Decomposition — breaking a big problem into smaller, manageable pieces",
            "Pattern recognition — spotting repeated structures and applying them efficiently",
            "Abstraction — focusing on what matters and ignoring unnecessary details",
            "Debugging — testing ideas, noticing when they fail, and figuring out why",
          ]}
        />
        <PostParagraph>
          These are the same skills used by engineers, scientists, writers, and entrepreneurs. A
          child who learns to debug a Python loop is also learning how to approach a broken
          argument, a failed experiment, or a miscommunication — and that matters far beyond any
          specific career path.
        </PostParagraph>
      </PostSection>

      <PostSection title="When Is the Right Age to Start?">
        <PostParagraph>
          There is no single right answer, but here is a helpful way to think about it by age:
        </PostParagraph>
        <PostNumberedList
          items={[
            {
              title: "Ages 5–7: Unplugged and visual logic",
              body: "At this age, kids can learn coding concepts without a screen. Board games like Robot Turtles teach sequencing and simple logic. Apps like ScratchJr let them drag blocks and see characters move.",
            },
            {
              title: "Ages 8–11: Block-based coding",
              body: "Scratch (scratch.mit.edu) is the gold standard here. Kids build real interactive games and animations by snapping together visual blocks. The logic is identical to text-based code — it just removes typing as a barrier.",
            },
            {
              title: "Ages 12+: Text-based languages",
              body: "Python is the best starting language for this age group. It reads almost like English, has a massive support community, and is used professionally in data science, web development, and AI. Our workshops use Python as the first real language.",
            },
          ]}
        />
      </PostSection>

      <PostSection title="How to Get Started at Home">
        <PostParagraph>
          You do not need to be a programmer to support your child. Here are practical first steps
          any parent can take:
        </PostParagraph>
        <PostList
          items={[
            "Set up a free Scratch account at scratch.mit.edu and let them explore for 30 minutes with no goal",
            "Watch a short YouTube tutorial together — CS50P (Harvard's intro to Python) has a free beginner series",
            "Ask them to explain what their program does — teaching it back reinforces understanding",
            "Let them get stuck. Debugging is not failure — it is the actual skill you want them to develop",
            "Celebrate what they build, not whether it is impressive. A working calculator is a big deal at 10 years old.",
          ]}
        />
      </PostSection>

      <PostSection title="A Simple First Python Program">
        <PostParagraph>
          If your child is ready to write actual code, here is a gentle first project. Open a
          browser and go to replit.com to create a free account — no installation needed. Then
          have them type this:
        </PostParagraph>
        <PostCallout title="Try This" accent="green">
          <code className="block whitespace-pre-wrap font-mono text-sm leading-8">
            {`name = input("What is your name? ")\nprint("Hello, " + name + "! Welcome to coding.")`}
          </code>
        </PostCallout>
        <PostParagraph>
          That is a real program. It takes input from a user and responds to it. From there, you
          can add a second question, then a third, and before long you have a simple chatbot. The
          key is to keep each step small and keep the project feeling playful rather than like
          homework.
        </PostParagraph>
      </PostSection>

      <PostSection title="The Bigger Picture">
        <PostParagraph>
          Hispanic students are underrepresented in computer science at every level — from high
          school AP courses to university degrees to tech careers. That is not because of ability.
          It is because of access, exposure, and encouragement. When a kid who looks like them
          sees someone teaching them Python and telling them they belong in this space, the whole
          trajectory can shift.
        </PostParagraph>
        <PostParagraph>
          That is what Avanza STEM is about. Not producing coders for corporate America, but
          opening doors that should have been open all along.
        </PostParagraph>
        <PostCallout accent="teal">
          If your child wants to try a free, in-person coding workshop, check our workshops page
          for upcoming sessions in your area. All materials are provided and there is no experience
          required.
        </PostCallout>
      </PostSection>
    </BlogPostLayout>
    </>
  )
}
