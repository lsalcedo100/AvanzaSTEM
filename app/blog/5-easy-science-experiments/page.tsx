import {
  BlogPostLayout,
  PostCallout,
  PostParagraph,
  PostSection,
} from "@/components/blog/blog-post-layout"

export const metadata = {
  title: "5 Easy Science Experiments You Can Do at Home - Avanza STEM",
  description:
    "Grab some household items and get ready for amazing science. These experiments are safe, fun, and perfect for curious young minds.",
}

type Experiment = {
  number: number
  title: string
  category: string
  materials: string[]
  steps: string[]
  science: string
}

const experiments: Experiment[] = [
  {
    number: 1,
    title: "Baking Soda and Vinegar Volcano",
    category: "Chemistry",
    materials: [
      "1/2 cup baking soda",
      "1 cup white vinegar",
      "A few drops of dish soap",
      "Food coloring (optional)",
      "A cup or bowl",
    ],
    steps: [
      "Put the baking soda in a cup or bowl.",
      "Add a few drops of dish soap and food coloring if you want color.",
      "Pour in the vinegar all at once and step back.",
      "Watch the foam erupt!",
    ],
    science:
      "When baking soda (a base) meets vinegar (an acid), they react to produce carbon dioxide gas. The gas bubbles get trapped by the dish soap and form foam. Despite looking dramatic, this is actually a physical reaction — no new permanent substances are created.",
  },
  {
    number: 2,
    title: "Dancing Raisins",
    category: "Physics",
    materials: [
      "A clear glass",
      "Sparkling water or clear soda",
      "A handful of raisins",
    ],
    steps: [
      "Fill the glass about 3/4 full with sparkling water.",
      "Drop in a few raisins.",
      "Watch what happens over the next few minutes.",
    ],
    science:
      "Raisins are denser than water, so they sink. But carbon dioxide bubbles stick to the rough surface of each raisin. When enough bubbles attach, they act like tiny life preservers and carry the raisin to the surface. At the top, the bubbles pop, and the raisin sinks again — creating a repeating dance.",
  },
  {
    number: 3,
    title: "Homemade Lava Lamp",
    category: "Chemistry & Physics",
    materials: [
      "A clear bottle or tall glass",
      "Vegetable oil",
      "Water",
      "Alka-Seltzer tablets",
      "Food coloring",
    ],
    steps: [
      "Fill the bottle about 3/4 full with vegetable oil.",
      "Add water until it is nearly full (the water will settle below the oil).",
      "Add several drops of food coloring — it will mix into the water layer.",
      "Drop in a small piece of Alka-Seltzer and watch the blobs rise and fall.",
    ],
    science:
      "Oil and water do not mix because of differences in polarity — water molecules are attracted to each other more than to oil. The Alka-Seltzer reacts with the water to produce CO2 bubbles that carry colored water droplets up through the oil, then release them at the top.",
  },
  {
    number: 4,
    title: "Paper Towel Chromatography",
    category: "Chemistry",
    materials: [
      "Paper towel or coffee filter",
      "Washable markers (black or brown work best)",
      "A cup of water",
      "Scissors",
    ],
    steps: [
      "Cut a strip of paper towel about 1 inch wide and 6 inches long.",
      "Draw a thick dot of marker about 1 inch from the bottom.",
      "Dip just the very bottom of the strip into water — do not let the dot touch the water directly.",
      "Hold it in place and watch the water travel up the paper for 5–10 minutes.",
    ],
    science:
      "What looks like black or brown ink is actually a mixture of multiple pigments. As water travels up the paper by capillary action, it carries the pigments with it. Different pigments travel at different speeds depending on their size and attraction to the paper, so they separate into visible bands of color.",
  },
  {
    number: 5,
    title: "The Egg in a Bottle",
    category: "Physics",
    materials: [
      "A hard-boiled egg (peeled)",
      "A glass bottle with a mouth slightly smaller than the egg",
      "A small piece of paper",
      "Matches (adult supervision required)",
    ],
    steps: [
      "Light the paper and drop it into the bottle quickly.",
      "Place the peeled egg on top of the bottle opening immediately.",
      "Watch what happens to the egg over the next few seconds.",
    ],
    science:
      "The burning paper heats the air inside the bottle, making it expand. Some air escapes past the egg. When the flame goes out, the air inside cools and contracts, creating lower air pressure inside the bottle than outside. The higher outside air pressure pushes the egg through the opening.",
  },
]

export default function FiveEasyScienceExperimentsPage() {
  return (
    <BlogPostLayout
      title="5 Easy Science Experiments You Can Do at Home"
      category="Science"
      categoryColor="bg-avanza-orange"
      date="February 15, 2026"
      readTime="4 min"
      author="Liam Salcedo"
      image="/images/blog/egg-experiment.jpg"
      imageAlt="Children doing a science experiment at home"
    >
      <PostSection title="">
        <PostParagraph>
          You do not need a lab coat or expensive equipment to do real science. Most of the best
          experiments for kids use items you already have at home — vinegar, paper towels, a glass
          of sparkling water. The goal is not just the wow moment, but the understanding of why it
          happened.
        </PostParagraph>
        <PostParagraph>
          Each experiment below includes the materials, the steps, and a plain-English explanation
          of the science so you can have an actual conversation about what your child just
          observed. The best part of any experiment is the question, "Why did that happen?" — so
          we have tried to answer it simply.
        </PostParagraph>
      </PostSection>

      {experiments.map((exp) => (
        <PostSection key={exp.title} title={`${exp.number}. ${exp.title}`}>
          <span className="mb-3 inline-block rounded-full bg-secondary px-3 py-0.5 text-xs font-bold text-muted-foreground">
            {exp.category}
          </span>
          <div className="mt-2 space-y-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-avanza-orange">
                Materials
              </p>
              <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                {exp.materials.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-avanza-green">
                Steps
              </p>
              <ol className="mt-2 ml-4 list-decimal space-y-1 text-sm text-muted-foreground">
                {exp.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
            <PostCallout title="The Science" accent="green">
              {exp.science}
            </PostCallout>
          </div>
        </PostSection>
      ))}

      <PostSection title="Making It Stick">
        <PostParagraph>
          After each experiment, try asking your child to write or draw what they observed. Even a
          quick sketch of what happened and one sentence about why creates a record and reinforces
          the learning. If they can explain it to someone else — a sibling, a grandparent, a
          friend — they have really understood it.
        </PostParagraph>
        <PostCallout accent="teal">
          Want to go deeper? Our in-person workshops include experiments like these plus guided
          discussion that helps students understand the scientific concepts behind the reactions.
          Check our workshops page for upcoming sessions.
        </PostCallout>
      </PostSection>
    </BlogPostLayout>
  )
}
