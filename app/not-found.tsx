import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-background px-6 py-24 text-center">
      <p className="text-7xl font-extrabold text-avanza-green">404</p>
      <h1 className="mt-4 text-3xl font-extrabold text-foreground">
        Page Not Found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
        Looks like this page took a wrong turn. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-avanza-green px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        Back to Home <ArrowRight className="h-5 w-5" />
      </Link>
    </section>
  )
}
