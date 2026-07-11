import Link from "next/link"
import { roboticsPath } from "@/features/curriculums/robotics"

export default function RoboticsNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Robotics &amp; Automation
      </p>
      <h1 className="mt-3 text-2xl font-extrabold text-foreground md:text-3xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        That week or page isn&apos;t part of the Robotics &amp; Automation course. It may have moved,
        or the link may be mistyped.
      </p>
      <div className="mt-6">
        <Link
          href={roboticsPath}
          className="inline-flex items-center rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
        >
          Go to the course overview
        </Link>
      </div>
    </div>
  )
}
