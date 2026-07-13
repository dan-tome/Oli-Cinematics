import Image from "next/image";
import Link from "next/link";
import { SiteChrome } from "@/src/components/layout/SiteChrome";

export default function OliverPage() {
  return (
    <div className="min-h-screen">
      <SiteChrome />
      <div className="h-[110px] sm:h-[140px]" />

      <section className="content-shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="order-2 lg:order-1">
            <span className="eyebrow">Meet the founder</span>
            <h1 className="mt-4 text-4xl sm:text-5xl">Oliver.</h1>
            <p className="muted-copy mt-6">
              Oliver is a videographer with a filmmaker&apos;s instinct for story, motion, and the small
              details that make footage feel premium. He runs every project with a director&apos;s eye and a
              craftsman&apos;s patience.
            </p>
            <p className="muted-copy mt-5">
              In the edit suite he is fast, extremely capable, and an expert at turning a brief into a
              finished frame — from first spark to final grade.
            </p>
            <p className="muted-copy mt-5">
              He may be vertically challenged, but he compensates with expert skills, top-of-the-range
              equipment, and a loyal step-ladder that has seen more shoots than most film directors.
            </p>
            <p className="muted-copy mt-6 italic">
              &ldquo;He is short but mighty — half the height, twice the ego, and somehow still running the
              whole shoot from the top of a ladder.&rdquo;
              <span className="mt-1 block text-xs tracking-[0.28em] not-italic text-white/45 uppercase">— Miriana, Oliver&apos;s wife</span>
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/book" className="btn-primary">Book Oliver</Link>
              <Link href="/studios" className="btn-ghost">See the spaces</Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="overflow-hidden border border-white/10 bg-[#0a0a0a]">
              <Image
                src="/oliver.png"
                alt="Oliver"
                width={1200}
                height={1200}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
