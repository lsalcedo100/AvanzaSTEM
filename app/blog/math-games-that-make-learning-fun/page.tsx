import {
  BlogPostLayout,
  PostCallout,
  PostList,
  PostParagraph,
  PostSection,
} from "@/components/blog/blog-post-layout"

export const metadata = {
  title: "Math Games That Make Learning Fun - Avanza STEM",
  description:
    "Who says math has to be boring? These games and activities turn number practice into playtime. Perfect for grades 2 through 5.",
}

type MathGame = {
  title: string
  gradeRange: string
  description: string
  howToPlay: string[]
  whyItWorks: string
}

const games: MathGame[] = [
  {
    title: "Number War",
    gradeRange: "Grades 2–4",
    description:
      "A fast-paced card game that builds number sense and comparison skills without feeling like practice.",
    howToPlay: [
      "Use a standard deck of cards. Remove face cards or assign them values (Jack = 11, Queen = 12, King = 13).",
      "Deal the full deck evenly between two players.",
      "Each player flips their top card simultaneously.",
      "The player with the higher card wins both cards.",
      "For a multiplication version, each player flips two cards and multiplies them. The higher product wins.",
    ],
    whyItWorks:
      "Fast repetition without worksheets. Students get dozens of comparison or multiplication problems in a single game session without experiencing it as drill practice.",
  },
  {
    title: "101 and Out",
    gradeRange: "Grades 3–5",
    description:
      "A dice game that builds mental addition and strategic thinking simultaneously.",
    howToPlay: [
      "Each player starts with a score of 0. The goal is to get as close to 101 as possible without going over.",
      "On each turn, roll two dice. You can either add the two numbers together or multiply one by 10 and add (e.g., roll 3 and 5, add as 3+5=8 or use 30+5=35).",
      "Keep a running total. The player closest to 101 without going over wins.",
    ],
    whyItWorks:
      "The strategic choice of whether to multiply by 10 makes students actively think about number size and place value rather than just computing mechanically.",
  },
  {
    title: "Fraction Pizza",
    gradeRange: "Grades 3–5",
    description:
      "A visual, hands-on game that builds fraction understanding using simple paper circles.",
    howToPlay: [
      "Cut paper circles into halves, thirds, fourths, sixths, and eighths. Label each piece with its fraction.",
      "Players take turns rolling a die that determines which fraction piece they draw.",
      "The goal is to complete a whole pizza circle exactly — no overlapping and no gaps.",
      "If a player cannot place a piece without going over, they lose their turn.",
    ],
    whyItWorks:
      "Physical manipulation of fraction pieces builds spatial intuition for why 2/4 equals 1/2 in a way that abstract notation never fully can.",
  },
  {
    title: "Target Number",
    gradeRange: "Grades 4–5",
    description:
      "An open-ended mental math challenge that rewards creative use of operations.",
    howToPlay: [
      "Roll five dice (or pick five random digits 1–9).",
      "Set a target number between 1 and 100.",
      "Each player independently tries to use all five numbers with any combination of +, -, ×, and ÷ to reach the target exactly.",
      "Players compare solutions. Award extra points for using all five numbers exactly.",
    ],
    whyItWorks:
      "There are often multiple valid paths to the target, which teaches students that math problems can have more than one approach. It also naturally introduces order of operations in a context where students are motivated to get the answer right.",
  },
  {
    title: "Twenty Questions Math Edition",
    gradeRange: "Grades 2–5",
    description:
      "A classic logic game adapted to build mathematical vocabulary and reasoning.",
    howToPlay: [
      "One player thinks of a number between 1 and 100 (or 1 and 1000 for older students).",
      "Other players ask yes/no questions using math vocabulary: Is it even? Is it a multiple of 5? Is it greater than 50? Is it a perfect square?",
      "The guesser who names the number in the fewest questions wins the round.",
    ],
    whyItWorks:
      "Students practice mathematical properties and vocabulary in a context where understanding the terms actually helps them win. The competitive incentive drives genuine engagement with vocabulary they often ignore on worksheets.",
  },
  {
    title: "Estimation Jar",
    gradeRange: "Grades 2–4",
    description:
      "A weekly estimation challenge that builds number sense gradually over time.",
    howToPlay: [
      "Fill a clear jar with a countable number of small objects (coins, buttons, dried beans, etc.).",
      "Each family member writes down their estimate without consulting others.",
      "Count together at the end of the week. The closest estimate wins.",
      "Increase difficulty by changing the object size or the jar size.",
    ],
    whyItWorks:
      "Regular, low-stakes estimation builds an intuitive sense of quantity that transfers to rounding, measurement, and real-world problem-solving.",
  },
]

export default function MathGamesThatMakeLearningFunPage() {
  return (
    <BlogPostLayout
      title="Math Games That Make Learning Fun"
      category="Math"
      categoryColor="bg-avanza-orange"
      date="January 20, 2026"
      readTime="3 min"
      author="Liam Salcedo"
      image="/images/blog/abacus.jpg"
      imageAlt="Math manipulatives and learning tools for kids"
    >
      <PostSection title="">
        <PostParagraph>
          Math anxiety is real and common, and it often starts with the experience of math as
          something done to you — worksheets, timed tests, and red marks. But the underlying
          skills that math develops — pattern recognition, logical reasoning, estimation, and
          creative problem-solving — are naturally engaging when the context is a game rather than
          an assignment.
        </PostParagraph>
        <PostParagraph>
          The games below are designed for grades 2 through 5 and require minimal materials. Each
          one targets real mathematical skills, not just arithmetic drill. And because they are
          genuinely competitive, kids tend to play them far longer than they would spend on a
          worksheet.
        </PostParagraph>
      </PostSection>

      {games.map((game) => (
        <PostSection key={game.title} title={game.title}>
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-secondary px-3 py-0.5 text-xs font-bold text-muted-foreground">
              {game.gradeRange}
            </span>
          </div>
          <PostParagraph>{game.description}</PostParagraph>
          <div className="mt-3">
            <p className="text-xs font-bold uppercase tracking-wider text-avanza-orange">
              How to Play
            </p>
            <ol className="mt-2 ml-4 list-decimal space-y-1 text-sm text-muted-foreground">
              {game.howToPlay.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <PostCallout title="Why It Works" accent="orange">
            {game.whyItWorks}
          </PostCallout>
        </PostSection>
      ))}

      <PostSection title="A Note on Timed Practice">
        <PostParagraph>
          Some parents worry that games are not rigorous enough compared to traditional drill
          practice. But the research on math anxiety consistently shows that timed tests, in
          particular, are one of the primary causes of negative math identity in students who
          otherwise have the skills to succeed.
        </PostParagraph>
        <PostParagraph>
          Fluency comes from repeated exposure to math problems in low-stakes contexts.
          Games provide that exposure without the anxiety trigger. A child who has played Number
          War 50 times has done far more comparison and multiplication practice than any
          worksheet could deliver — and they remember it because it was fun.
        </PostParagraph>
        <PostList
          items={[
            "Start with games your child already enjoys and add a math element",
            "Play alongside your child rather than watching — engagement is contagious",
            "Let them win sometimes, especially early on, to build positive math associations",
            "When they make a mistake, ask what they think the answer is before correcting",
            "Keep sessions short and end while they still want to keep playing",
          ]}
        />
      </PostSection>
    </BlogPostLayout>
  )
}
