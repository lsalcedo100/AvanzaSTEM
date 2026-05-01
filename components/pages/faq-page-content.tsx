"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export function FAQPageContent() {
  const { t } = useLanguage()

  return (
    <>
      <section className="bg-gradient-to-br from-avanza-orange to-avanza-purple py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">
            {t.faqPage.title}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/85">
            {t.faqPage.description}
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Accordion type="single" collapsible>
            {t.faqPage.items.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
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

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-foreground">
            {t.faqPage.stillHaveQuestions}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t.faqPage.contactDescription}
          </p>
          <a
            href="mailto:liam@avanzastem.org"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-avanza-dark px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {t.faqPage.emailUs}
          </a>
        </div>
      </section>
    </>
  )
}
