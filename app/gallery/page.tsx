import { Gallery } from "@/components/ui/gallery"

export const metadata = {
  title: "Photo Gallery | AvanzaSTEM",
  description: "Browse photos from our STEM workshops and programs.",
}

export default function GalleryPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-avanza-teal to-avanza-green py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">
            Photo Gallery
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/85">
            Moments from our workshops, programs, and STEM activities.
          </p>
        </div>
      </section>

      <Gallery />
    </>
  )
}
