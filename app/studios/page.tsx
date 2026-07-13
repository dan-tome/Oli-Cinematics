import Image from "next/image";
import Link from "next/link";
import { SiteChrome } from "@/src/components/layout/SiteChrome";
import { seedSpaces } from "@/src/data/spaces";

const faqs = [
  {
    q: "Can I book each space individually?",
    a: "Yes. The cove and all four flex spaces book independently, so a photo shoot, a podcast record and a product session can all run at the same time without crossing paths.",
  },
  {
    q: "Will the infinity cove be white on the day?",
    a: "The cove is kept studio white. If your shoot needs a freshly painted floor, tell us when you book and we'll schedule a repaint before your call time — for some shoots a charge applies, so we only repaint when it's actually needed.",
  },
  {
    q: "What are the rotating panel sets?",
    a: "Each flex space has three large wall-sized set panels. Rotating a panel changes the entire look of the room — a podcast set, a portrait backdrop, a product wall — without a rebuild, so your setup time is spent shooting, not constructing.",
  },
  {
    q: "Where is the studio?",
    a: "We're in an industrial unit in Wembley, London — easy load-in, away from foot traffic. The exact address and access details are shared when you book.",
  },
  {
    q: "What's the minimum booking?",
    a: "Spaces book as half-day (4 hour) or full-day (8 hour) sessions, 09:00–18:00, with a 30-minute changeover after every booking.",
  },
  {
    q: "Can you help beyond the room?",
    a: "Yes — Oliver is a videographer, editor and photographer. You can hire the space on its own or bring him in to shoot, direct or finish the work.",
  },
];

export default function StudiosPage() {
  return (
    <div className="min-h-screen">
      <SiteChrome />
      <div className="h-[110px] sm:h-[140px]" />

      <section className="content-shell pb-12">
        <div className="max-w-[720px]">
          <span className="eyebrow">The Spaces</span>
          <h1 className="mt-4 text-4xl sm:text-5xl">One cove. Four spaces. Endless setups.</h1>
          <p className="muted-copy mt-6 text-lg">
            A seamless white infinity cove plus four flexible spaces, each built around three rotating
            panel sets — all inside one Wembley industrial unit, and each bookable on its own.
          </p>
        </div>
      </section>

      <div className="space-y-24 pb-24">
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
                    <dd className="mt-2 text-lg">£{(space.hourlyRate / 100).toFixed(0)}<span className="text-white/50 text-xs tracking-[0.2em] uppercase ml-1">/hr</span></dd>
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

                <div className="mt-6">
                  <p className="eyebrow mb-3">Amenities</p>
                  <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
                    {space.amenities.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <p className="eyebrow mb-3">Popular for</p>
                  <div className="flex flex-wrap gap-2" data-testid={`use-cases-${space.slug}`}>
                    {space.useCases.map((u) => (
                      <span
                        key={u}
                        className="border border-white/15 px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase text-white/70"
                      >
                        {u}
                      </span>
                    ))}
                  </div>
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

      {/* Comparison table */}
      <section className="border-t border-white/5 bg-[#050505]">
        <div className="content-shell">
          <span className="eyebrow">At a glance</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">Compare the spaces.</h2>
          <div className="mt-10 overflow-x-auto" data-testid="space-comparison">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/15">
                  <th className="py-4 pr-6 align-bottom font-normal">
                    <span className="eyebrow">Space</span>
                  </th>
                  {seedSpaces.map((space) => (
                    <th key={space.id} className="py-4 pr-6 align-bottom font-normal">
                      <span className="block text-base" style={{ fontFamily: "var(--font-playfair)" }}>{space.name}</span>
                      <span className="eyebrow">{space.tagline}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-6 text-white/50">Rate</td>
                  {seedSpaces.map((s) => (
                    <td key={s.id} className="py-4 pr-6">£{(s.hourlyRate / 100).toFixed(0)}/hr</td>
                  ))}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-6 text-white/50">Footprint</td>
                  {seedSpaces.map((s) => (
                    <td key={s.id} className="py-4 pr-6">{s.sizeSqft.toLocaleString()} sqft</td>
                  ))}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-6 text-white/50">Capacity</td>
                  {seedSpaces.map((s) => (
                    <td key={s.id} className="py-4 pr-6">{s.capacity}</td>
                  ))}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-6 text-white/50">Infinity cove</td>
                  {seedSpaces.map((s) => (
                    <td key={s.id} className="py-4 pr-6">{s.id === "space_cove" ? "Yes — seamless white" : "—"}</td>
                  ))}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-6 text-white/50">Rotating panel sets</td>
                  {seedSpaces.map((s) => (
                    <td key={s.id} className="py-4 pr-6">{s.id === "space_cove" ? "—" : "3 looks"}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 pr-6 text-white/50">Books independently</td>
                  {seedSpaces.map((s) => (
                    <td key={s.id} className="py-4 pr-6">Yes</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="content-shell" data-testid="studio-faqs">
        <span className="eyebrow">Good to know</span>
        <h2 className="mt-3 text-3xl sm:text-4xl">Questions, answered.</h2>
        <div className="mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="text-lg" style={{ fontFamily: "var(--font-playfair)" }}>{faq.q}</h3>
              <p className="muted-copy mt-3 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap gap-4">
          <Link href="/book" className="btn-primary">Book a space</Link>
          <Link href="/contact" className="btn-ghost">Ask us anything</Link>
        </div>
      </section>
    </div>
  );
}
