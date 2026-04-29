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
  title: "Building a Community: How Local STEM Workshops Change Lives - Avanza STEM",
  description:
    "See how free STEM workshops are changing lives in Hispanic communities in New Jersey — and how to bring one to your neighborhood.",
  alternates: { canonical: '/blog/building-a-community-stem-workshops' },
  openGraph: {
    title: "Building a Community: How Local STEM Workshops Change Lives - Avanza STEM",
    description: "See how free STEM workshops are changing lives in Hispanic communities in New Jersey — and how to bring one to your neighborhood.",
    url: 'https://avanzastem.org/blog/building-a-community-stem-workshops',
    type: 'article',
    images: [{ url: '/images/og-default-en.png', width: 1200, height: 630, alt: 'Avanza STEM' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Building a Community: How Local STEM Workshops Change Lives - Avanza STEM",
    description: "See how free STEM workshops are changing lives in Hispanic communities in New Jersey — and how to bring one to your neighborhood.",
    images: ['/images/og-default-en.png'],
  },
}

const blogPostJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Building a Community: How Local STEM Workshops Change Lives',
  description: 'See how free STEM workshops are changing lives in Hispanic communities in New Jersey — and how to bring one to your neighborhood.',
  author: { '@type': 'Person', name: 'Liam Salcedo' },
  publisher: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
  datePublished: '2026-01-12',
  url: 'https://avanzastem.org/blog/building-a-community-stem-workshops',
}

export default function BuildingACommunityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <BlogPostLayout
      title="Building a Community: How Local STEM Workshops Change Lives"
      category="Community"
      categoryColor="bg-avanza-purple"
      date="January 12, 2026"
      readTime="7 min"
      author="Liam Salcedo"
      image="/images/blog/community-workshop.jpg"
      imageAlt="Students at a community STEM workshop"
    >
      <PostSection title="">
        <PostParagraph>
          The hardest part of starting Avanza STEM was not building the curriculum. It was not
          finding the venues, organizing the materials, or setting up the website. The hardest
          part was convincing myself that showing up to a library with a box of popsicle sticks
          and a laptop could actually matter.
        </PostParagraph>
        <PostParagraph>
          After running programs at the Clifton Public Library and the Allwood Branch Library in
          New Jersey, I can say clearly: it does. Not because of what students learned about
          engineering or coding — though they learned a lot. But because of what changed in the
          room when a Hispanic kid realized that someone who looked like them cared enough to show
          up and teach them.
        </PostParagraph>
      </PostSection>

      <PostSection title="What a Workshop Actually Looks Like">
        <PostParagraph>
          Our current format is a three-week series covering building, coding, and AI. Each
          session runs about 60–90 minutes, is completely free, and requires no prior experience
          from students or parents.
        </PostParagraph>
        <PostParagraph>
          Week 1 is engineering. Students learn what different kinds of engineers do — civil,
          mechanical, electrical, chemical — and then build something. At Clifton, this meant
          bridge-building and a Coke and Mentos demonstration that turned into a 20-minute
          conversation about physical versus chemical reactions that nobody wanted to end.
        </PostParagraph>
        <PostParagraph>
          Week 2 is coding. Students write Python for the first time. By the end of the session,
          each student has built a simple interactive quiz that asks questions and responds to the
          answers. We print out their code for them to take home. Several parents have told us
          that their child showed it to every adult in the house.
        </PostParagraph>
        <PostParagraph>
          Week 3 is AI. We cover what AI is, how it learns, where it is already in their lives,
          and — just as importantly — why you should not just trust it blindly. Students train an
          image classifier on Teachable Machine and watch the model get better as they add more
          training data.
        </PostParagraph>
      </PostSection>

      <PostSection title="Why Libraries Are the Right Venue">
        <PostParagraph>
          Public libraries are underutilized community infrastructure. They are already trusted
          spaces in neighborhoods, they are designed for learning, and they are genuinely
          committed to free public programming. They are also one of the few institutions that
          Hispanic families without a lot of discretionary income can access without any financial
          barrier.
        </PostParagraph>
        <PostList
          items={[
            "No cost to attend — families do not need to budget for it",
            "Familiar, safe space — libraries carry authority without intimidation",
            "Existing relationship with the community — librarians often know which families would benefit most",
            "Flexible rooms and technology — many libraries have maker spaces, projectors, and WiFi",
            "No school affiliation — students from multiple schools can attend, widening the reach",
          ]}
        />
        <PostParagraph>
          The libraries have been incredible partners. The staff at both Clifton and Allwood went
          out of their way to promote the program to families, set up the rooms, and create an
          environment where students felt welcome before we even arrived.
        </PostParagraph>
      </PostSection>

      <PostSection title="What We Have Seen in the Room">
        <PostParagraph>
          I want to be careful not to write this as a collection of heartwarming anecdotes that
          make the work sound tidier than it is. Some sessions go slowly. Sometimes a student
          cannot get their code to run and gets frustrated. Sometimes parents are skeptical. That
          is all real.
        </PostParagraph>
        <PostParagraph>
          But there are also moments that stay with you. A 4th grader in Clifton who finished his
          Python quiz and immediately started adding more questions without being asked. A parent
          at Allwood who came up after the session and said, in Spanish, that no one had ever
          brought something like this to their neighborhood before. A group of siblings who argued
          productively for 15 minutes about whether the Coke-Mentos reaction was physical or
          chemical before one of them looked up the answer on their phone and shouted "I was
          right!"
        </PostParagraph>
        <PostParagraph>
          Those moments are not incidental. They are the point. Students who experience their
          own curiosity being taken seriously in a structured learning environment are more likely
          to seek out more learning. That is what we are trying to create.
        </PostParagraph>
      </PostSection>

      <PostSection title="The Representation Problem — and Why It Is Ours to Solve">
        <PostParagraph>
          Hispanic students make up about 27% of K–12 public school students in the United States.
          They represent less than 8% of STEM degree holders and less than 7% of the STEM
          workforce. That gap does not come from a lack of talent or interest. It comes from a
          lack of exposure, mentorship, encouragement, and access to the kind of low-stakes, safe
          experimentation that builds confidence over time.
        </PostParagraph>
        <PostParagraph>
          Representation in who teaches matters as much as representation in who attends. When a
          Hispanic instructor runs a coding workshop for Hispanic kids, the message embedded in
          the room — before a single line of Python is written — is that this is a space for
          people like us. That message is not something a curriculum can deliver. It has to be
          lived.
        </PostParagraph>
        <PostCallout title="The Gap We Are Trying to Close" accent="purple">
          Research consistently shows that students are more likely to pursue a career when they
          see someone who looks like them doing it. Visibility is not a soft benefit — it is a
          structural factor in who ends up in STEM.
        </PostCallout>
      </PostSection>

      <PostSection title="How to Bring a Workshop to Your Community">
        <PostParagraph>
          If you have a space and want to bring these programs to your neighborhood, the process
          is simpler than you might think. Here is how to get started:
        </PostParagraph>
        <PostNumberedList
          items={[
            {
              title: "Identify a venue",
              body: "Public libraries are the best starting point. Community centers, churches, and school cafeterias can also work. You need space for 10–20 students at tables, reliable WiFi, and access to a projector or large screen.",
            },
            {
              title: "Connect with us",
              body: "Reach out through our contact form. We can discuss the curriculum, the materials needed, and how to promote the program to your community. We have done this twice and can share everything we learned.",
            },
            {
              title: "Promote locally",
              body: "WhatsApp groups in Hispanic communities are often the most effective promotion channel. Flyers in Spanish at nearby schools, grocery stores, and churches also work well. Start small — 10 engaged students is better than 25 distracted ones.",
            },
            {
              title: "Show up consistently",
              body: "Trust is built over time. The first session brings curious families. The second session brings families who heard about the first one. Consistency matters more than any single spectacular event.",
            },
          ]}
        />
      </PostSection>

      <PostSection title="What Comes Next">
        <PostParagraph>
          The goal for Avanza STEM in 2026 is to expand to more library branches and community
          centers across New Jersey, and eventually into other states with large Hispanic
          populations. We are building a model that can be replicated by any educator or community
          member who wants to run these programs, with shared materials and a growing community of
          instructors.
        </PostParagraph>
        <PostParagraph>
          None of this requires a large organization. It requires people who care enough to show
          up. If you are one of them, we would love to work with you.
        </PostParagraph>
        <PostCallout accent="purple">
          Check our workshops page to see upcoming sessions, or reach out if you want to partner
          on bringing a program to your community. All it takes is a space and the willingness to
          start.
        </PostCallout>
      </PostSection>
    </BlogPostLayout>
    </>
  )
}
