import Link from "next/link";
import Image from "next/image";
import { SiteChrome } from "@/src/components/layout/SiteChrome";
import { seedSpaces } from "@/src/data/spaces";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteChrome />
      <div className="h-[110px] sm:h-[140px]" />

      {/* Hero */}
      <section className="relative h-[78vh] w-full overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(96deg, rgba(246,244,240,0.9) 0%, rgba(246,244,240,0.62) 38%, rgba(246,244,240,0.12) 62%, rgba(246,244,240,0) 75%), url('/images/infinity-cove.jpg')",
          }}
        />
        <div className="relative z-10 mx-auto flex h-full max-w-[1120px] flex-col justify-end px-6 pb-16 sm:px-10 sm:pb-24">
          <span className="eyebrow fade-up !text-black/60">Film & photo studio hire · Wembley, London</span>
          <h1
            className="fade-up fade-up-delay-1 mt-5 max-w-[820px] text-4xl leading-[1.05] tracking-[-0.01em] text-[#0d0d0d] sm:text-6xl"
            data-testid="hero-title"
          >
            One infinity cove.
            <br />
            Four spaces that transform.
          </h1>
          <div className="fade-up fade-up-delay-3 mt-10 flex flex-wrap gap-4">
            <Link href="/book" className="btn-dark" data-testid="hero-book-btn">
              Book a Space
            </Link>
            <Link href="/studios" className="btn-dark-ghost" data-testid="hero-explore-btn">
              Explore Spaces
            </Link>
          </div>
        </div>
      </section>

      {/* Spaces preview */}
      <section className="content-shell">
        <div className="mb-14 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">The Studios</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">Five spaces. One point of view.</h2>
          </div>
          <Link href="/studios" className="text-[11px] tracking-[0.3em] uppercase text-white/70 hover:text-white" data-testid="home-view-all-spaces">
            View all spaces →
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {seedSpaces.map((space, idx) => (
            <Link
              key={space.id}
              href={`/book?space=${space.slug}`}
              className={`card-dark group block overflow-hidden ${idx === 0 ? "sm:col-span-2" : ""}`}
              data-testid={`home-space-card-${space.slug}`}
            >
              <div className={`relative w-full overflow-hidden bg-black ${idx === 0 ? "h-[320px]" : "h-[260px]"}`}>
                <Image
                  src={space.image}
                  alt={space.name}
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <span className="eyebrow">0{idx + 1}</span>
                    <h3 className="mt-1 text-2xl">{space.name}</h3>
                  </div>
                  <span className="text-[11px] tracking-[0.28em] uppercase text-white/80">{space.tagline}</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-6 py-5">
                <span className="text-[11px] tracking-[0.28em] uppercase text-white/60">
                  From £{(space.hourlyRate / 100).toFixed(0)}/hr
                </span>
                <span className="text-[11px] tracking-[0.28em] uppercase text-white/80 group-hover:text-white">
                  Reserve →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* What we do */}
      <section className="border-t border-white/5 bg-[#050505]">
        <div className="content-shell">
          <span className="eyebrow">Capabilities</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">From board-room to broadcast.</h2>
          <p className="muted-copy mt-4 max-w-[620px]">
            We are a full-stack production studio: writing the treatment, holding the camera, and
            finishing the grade. Bring us in early or bolt onto an existing team.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { t: "Studio Hire", d: "An infinity cove and four flexible panel-set spaces, each bookable on its own." },
              { t: "Photography", d: "Directed portrait and branded photography with polished post workflows." },
              { t: "Video Production", d: "Cinematic filming and editing for brand films, campaigns and social." },
            ].map((item, i) => (
              <div key={item.t} className={`card-dark fade-up fade-up-delay-${i + 1} p-8`}>
                <span className="eyebrow">0{i + 1}</span>
                <h3 className="mt-3 text-xl">{item.t}</h3>
                <p className="muted-copy mt-3 text-sm">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
