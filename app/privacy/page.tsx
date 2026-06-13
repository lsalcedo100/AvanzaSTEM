import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Privacy Policy | Avanza STEM",
  description: "Learn how Avanza STEM collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Avanza STEM",
    description: "Learn how Avanza STEM collects, uses, and protects your personal information.",
    url: `${siteConfig.url}/privacy`,
    siteName: siteConfig.name,
    type: "website",
  },
}

export default function PrivacyPage() {
  return (
    <div className="bg-background py-20">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm font-bold uppercase tracking-widest text-avanza-green">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-foreground md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: June 7, 2026</p>

        <div className="mt-12 space-y-10 text-base leading-relaxed text-foreground">

          <section>
            <h2 className="text-2xl font-bold text-foreground">Who we are</h2>
            <p className="mt-4 text-muted-foreground">
              Avanza STEM is a free educational program that runs STEM workshops for young students,
              with a focus on Hispanic communities in New Jersey. This site is operated by Liam Salcedo.
              If you have questions about this policy, email us at{" "}
              <a
                href="mailto:liam@avanzastem.org"
                className="text-avanza-green transition-colors hover:text-avanza-teal"
              >
                liam@avanzastem.org
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">What we collect</h2>
            <p className="mt-4 text-muted-foreground">
              We only collect information you give us directly. We do not collect anything automatically
              beyond basic, anonymous site analytics.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>
                <strong className="text-foreground">Newsletter sign-ups:</strong> If you subscribe to our
                newsletter, we collect the parent, guardian, or teacher email address you provide.
                You can unsubscribe at any time by emailing us.
              </li>
              <li>
                <strong className="text-foreground">Contact and hosting inquiries:</strong> If you fill out
                our contact or host-a-workshop form, we collect your name, email address, venue or
                organization name, and the message you write. This information is used only to respond
                to your inquiry.
              </li>
              <li>
                <strong className="text-foreground">Basic site analytics:</strong> If Vercel Analytics is
                active on this site, it collects aggregated, anonymous data such as page views and
                country-level location. No personally identifiable information is collected through
                analytics.
              </li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              We do not collect payment information, government IDs, or any sensitive personal data.
              We do not use tracking cookies or third-party ad networks.
            </p>
            <p className="mt-4 text-muted-foreground">
              To reduce spam and abuse, our forms also use a hidden anti-spam field and temporary
              per-IP rate limiting. This abuse-prevention data is not added to newsletter or contact
              submissions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">How we use your information</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>To reply to messages or hosting inquiries you send us.</li>
              <li>To send you Avanza STEM updates if you signed up for the newsletter.</li>
              <li>To understand how the site is used so we can improve it (anonymous analytics only).</li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              We do not sell, rent, or share your personal information with third parties for
              marketing purposes, ever.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">How we store your information</h2>
            <p className="mt-4 text-muted-foreground">
              Form submissions are delivered to us by{" "}
              <a
                href="https://resend.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-avanza-green transition-colors hover:text-avanza-teal"
              >
                Resend
              </a>
              , a transactional email service. Your information is transmitted securely and is not
              stored on our servers beyond what Resend retains for email delivery logs.
            </p>
            <p className="mt-4 text-muted-foreground">
              This site is hosted on{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-avanza-green transition-colors hover:text-avanza-teal"
              >
                Vercel
              </a>
              . You can review Vercel&apos;s privacy practices at vercel.com/legal/privacy-policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">Children&apos;s privacy</h2>
            <p className="mt-4 text-muted-foreground">
              Avanza STEM serves students as young as grade 2. We do not knowingly collect personal
              information from children under 13 without parental involvement. Our forms are intended
              to be filled out by parents, guardians, teachers, or venue staff - not students
              themselves. If you believe a child has submitted personal information without parental
              consent, please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">Your rights and data deletion</h2>
            <p className="mt-4 text-muted-foreground">
              You can request that we delete any personal information we hold about you at any time.
              To do so, email us at{" "}
              <a
                href="mailto:liam@avanzastem.org"
                className="text-avanza-green transition-colors hover:text-avanza-teal"
              >
                liam@avanzastem.org
              </a>{" "}
              with the subject line &ldquo;Data deletion request&rdquo;.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">Changes to this policy</h2>
            <p className="mt-4 text-muted-foreground">
              If we make significant changes to this policy, we will update the &ldquo;Last updated&rdquo; date
              at the top of this page. We encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">Contact</h2>
            <p className="mt-4 text-muted-foreground">
              For any privacy-related questions or requests, contact us at{" "}
              <a
                href="mailto:liam@avanzastem.org"
                className="text-avanza-green transition-colors hover:text-avanza-teal"
              >
                liam@avanzastem.org
              </a>
              .
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
