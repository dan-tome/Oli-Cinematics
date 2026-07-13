import Image from "next/image";
import Link from "next/link";
import { SiteChrome } from "@/src/components/layout/SiteChrome";
import { seedSpaces } from "@/src/data/spaces";

export default function StudiosPage() {
  return (
    <div className="min-h-screen">
      <SiteChrome />
      <div className="h-[110px] sm:h-[140px]" />

      <section className="content-shell pb-12">
        <div className="max-w-[720px]">
          <span className="eyebrow">The Spaces</span>
          <h1 className="mt-4 text-4xl sm:text-5xl">Four studios, engineered for craft.</h1>
          <p className="muted-copy mt-6 text-lg">
            Every room in the building is treated, tuned and turned over for a specific kind of work — so
            you can walk in, plug in and shoot without compromise.
          </p>
        </div>
      </section>

      <div className="space-y-24 pb-32">
        {seedSpaces.map((space, idx) => (
          <section
            key={space.id}
            className="mx-auto max-w-[1120px] px-6 sm:px-10"
            data-testid={`space-section-${space.slug}`}
          >
            <div className={`grid gap-10 lg:grid-cols-12 lg:items-center ${idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="lg:col-span-7">
                <div className="relative overflow-hidden border border-white/10 bg-[#0a0a0a]">
                  <Image
                    src={space.image}
                    alt={space.name}
                    width={1600}
                    height={1000}
                    className="h-[420px] w-full object-cover sm:h-[520px]"
                  />
                </div>
              </div>
              <div className="lg:col-span-5">
                <span className="eyebrow">0{idx + 1} · {space.tagline}</span>
                <h2 className="mt-3 text-4xl sm:text-5xl">{space.name}</h2>
                <p className="muted-copy mt-5">{space.description}</p>

                <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 text-sm">
                  <div>
                    <dt className="eyebrow">Rate</dt>
                    <dd className="mt-2 text-lg">${(space.hourlyRate / 100).toFixed(0)}<span className="text-white/50 text-xs tracking-[0.2em] uppercase ml-1">/hr</span></dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Capacity</dt>
                    <dd className="mt-2 text-lg">{space.capacity}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Footprint</dt>
                    <dd className="mt-2 text-lg">{space.sizeSqft.toLocaleString()} sqft</dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Discipline</dt>
                    <dd className="mt-2 text-lg">{space.category}</dd>
                  </div>
                </dl>

                <div className="mt-8">
                  <p className="eyebrow mb-3">Kit & Features</p>
                  <ul className="grid gap-2 text-sm text-white/80">
                    {space.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="mt-2 inline-block h-[3px] w-3 bg-white/50" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href={`/book?space=${space.slug}`}
                    className="btn-primary"
                    data-testid={`book-${space.slug}-btn`}
                  >
                    Book {space.name}
                  </Link>
                  <Link href="/contact" className="btn-ghost">
                    Ask about {space.name}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
