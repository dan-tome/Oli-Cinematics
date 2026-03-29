import Image from "next/image";
import { SiteChrome } from "@/src/components/layout/SiteChrome";

export default function OliverPage() {
  return (
    <div className="min-h-screen">
      <SiteChrome />
      <div className="h-[170px] sm:h-[280px]" />

      <section className="content-shell">
        <h1 className="mb-8 text-3xl tracking-[0.25em] uppercase sm:text-4xl">Meet Oliver</h1>

        <div className="mx-auto mb-8 max-w-[520px] overflow-hidden border border-white/10 bg-white/5">
          <Image
            src="/oliver.png"
            alt="Oliver standing outside a stately home at dusk"
            width={1200}
            height={1200}
            className="h-auto w-full object-cover"
            priority
          />
        </div>

        <p className="muted-copy mb-5">
          Oliver is a world renowned videographer with an eye for story, motion, and the tiny details
          that make footage feel premium.
        </p>
        <p className="muted-copy mb-5">
          In the edit suite, he is fast, highly skilled, and an expert at turning your dreams into 
          reality.
        </p>
        <p className="muted-copy">
          He may be vertically challenged, but he compensates with expert skills, top-of-the-range
          equipment, and a loyal step ladder that has seen more shoots than most film directors.
        </p>
      </section>
    </div>
  );
}
