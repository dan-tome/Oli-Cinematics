import Link from "next/link";
import { SiteChrome } from "@/src/components/layout/SiteChrome";
import { seedSpaces } from "@/src/data/spaces";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <SiteChrome />
      <div className="h-[110px] sm:h-[140px]" />

      <section className="content-shell">
        <div className="max-w-[720px]">
          <span className="eyebrow">Pricing</span>
          <h1 className="mt-4 text-4xl sm:text-5xl">Transparent by the hour.</h1>
          <p className="muted-copy mt-6 text-lg">
            Every studio bills by the hour with two-hour minimums. Half-day and full-day packages are
            wrapped into the booking flow. Crew, kit and edit hours are quoted separately once we scope
            your brief.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {seedSpaces.map((space, idx) => (
            <div key={space.id} className="card-dark p-8" data-testid={`pricing-space-${space.slug}`}>
              <div className="flex items-center justify-between">
                <span className="eyebrow">Space 0{idx + 1}</span>
                <span className="text-xs tracking-[0.24em] uppercase text-white/60">{space.category}</span>
              </div>
              <h2 className="mt-4 text-3xl">{space.name}</h2>
              <p className="muted-copy mt-2 text-sm">{space.tagline}</p>

              <div className="mt-8 flex items-end gap-2">
                <span className="text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>
                  ${(space.hourlyRate / 100).toFixed(0)}
                </span>
                <span className="mb-2 text-xs tracking-[0.28em] uppercase text-white/50">/ hour</span>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-white/80">
                <li>Half day (4h) — ${((space.hourlyRate * 4) / 100).toFixed(0)}</li>
                <li>Full day (8h) — ${((space.hourlyRate * 8) / 100).toFixed(0)}</li>
                <li>{space.capacity}</li>
                <li>{space.sizeSqft.toLocaleString()} sqft</li>
              </ul>

              <Link href={`/book?space=${space.slug}`} className="btn-ghost mt-8 w-full justify-center">
                Reserve {space.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-10">
          <p className="eyebrow">Custom brief</p>
          <h3 className="mt-2 text-2xl">Multi-day or full production?</h3>
          <p className="muted-copy mt-3 max-w-[560px] text-sm">
            For end-to-end campaigns — treatment, crew, kit and post — send us a quick brief and we&apos;ll
            come back with a tailored quote within 24 hours.
          </p>
          <Link href="/contact" className="btn-primary mt-6">Request a quote</Link>
        </div>
      </section>
    </div>
  );
}
