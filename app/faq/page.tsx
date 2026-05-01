import Link from "next/link"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export const metadata = {
  title: "FAQ | Avanza STEM",
  description: "Answers to common questions about Avanza STEM workshops, curricula, costs, and how to get involved.",
}

const faqs = [
  {
    question: "Is Avanza STEM really free?",
    answer: "Yes, completely. All of our curricula, project guides, and blog content are available online at no cost. Our in-person workshops are also free to attend — we believe cost should never be a barrier to STEM education.",
  },
  {
    question: "What ages are your programs designed for?",
    answer: "Our programs are designed for students in 2nd grade and up (roughly ages 7–14). Some workshops are structured for specific grade ranges, which we always list in the event details.",
  },
  {
    question: "Do I need any prior STEM knowledge?",
    answer: "Not at all. Everything we create is beginner-friendly and designed to be a student's first introduction to the topic. We start from the very basics.",
  },
  {
    question: "Where are the workshops held?",
    answer: "We host workshops at local public libraries in New Jersey. Past programs have been held at the Clifton Public Library and Allwood Branch Library. We're always expanding to new locations — follow us on Instagram to stay updated.",
  },
  {
    question: "How can I be notified about upcoming workshops?",
    answer: "Subscribe to our newsletter at the bottom of the Blog page, or follow us on Instagram (@avanzastem). We announce all upcoming events there.",
  },
  {
    question: "Can I use Avanza STEM curricula in my classroom?",
    answer: "Absolutely — our resources are free and available to any educator. If you'd like to partner or have us run a workshop at your school, reach out at liam@avanzastem.org.",
  },
  {
    question: "What languages are your materials available in?",
    answer: "Our website is fully available in English, Spanish, and Simplified Chinese. You can switch languages using the globe icon in the navigation bar.",
  },
  {
    question: "How can I volunteer or get involved?",
    answer: "We'd love to hear from you. Send us an email at liam@avanzastem.org with a bit about yourself and how you'd like to help.",
  },
  {
    question: "Do students need to bring anything to workshops?",
    answer: "No — we provide all materials. Just show up ready to learn and have fun. We do recommend wearing clothes you don't mind getting a little messy during hands-on building activities.",
  },
  {
    question: "How is Avanza STEM funded?",
    answer: "Avanza STEM is a community-supported initiative. We operate on a small budget, supplemented by donations and grants. If you'd like to support our work, please reach out.",
  },
]

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-avanza-orange to-avanza-purple py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/85">
            Everything you need to know about Avanza STEM.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-base font-semibold text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-base leading-relaxed text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-foreground">
            Still have questions?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Reach out and we'll get back to you as soon as possible.
          </p>
          <a
            href="mailto:liam@avanzastem.org"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-avanza-dark px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Email Us
          </a>
        </div>
      </section>
    </>
  )
}
