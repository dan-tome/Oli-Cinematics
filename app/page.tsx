import Link from "next/link";
import { SiteChrome } from "@/src/components/layout/SiteChrome";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteChrome />

      <div className="h-[170px] sm:h-[280px]" />
      <section
        className="h-[55vh] w-full border-b border-white/10 bg-cover bg-center sm:h-[75vh]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(22, 59, 51, 0.2), rgba(22, 59, 51, 0.5)), url('/images/studio-a.jpg')",
        }}
      />

      <section className="content-shell pb-12">
        <h1 className="mb-8 text-3xl tracking-[0.25em] uppercase sm:text-4xl">Oli Cinematics</h1>
        <p className="muted-copy mb-10">
          Oli Cinematics Production is a premium creative studio blending heritage aesthetics with
          modern cinematic execution. We partner with brands and artists to produce high-end visual
          storytelling from concept to delivery.
        </p>
        <h2 className="mb-6 text-2xl tracking-[0.25em] uppercase sm:text-3xl">Services Summary</h2>
        <div className="grid gap-4 text-left sm:grid-cols-3">
          <div className="border border-white/10 bg-white/5 p-6">
            <h3 className="mb-3 text-sm tracking-[0.2em] uppercase">Studio Hire</h3>
            <p className="muted-copy text-sm">
              Flexible stage space, lighting rigs, and backdrop support for production teams.
            </p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6">
            <h3 className="mb-3 text-sm tracking-[0.2em] uppercase">Photography</h3>
            <p className="muted-copy text-sm">
              Directed portrait and branded photography with polished post-production workflow.
            </p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6">
            <h3 className="mb-3 text-sm tracking-[0.2em] uppercase">Video Production</h3>
            <p className="muted-copy text-sm">
              Cinematic filming and editing services for campaigns, brand films, and socials.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/studios"
            className="inline-block border border-white px-6 py-3 text-xs tracking-[0.25em] uppercase transition hover:bg-white hover:text-[#163b33]"
          >
            Explore Studios
          </Link>
          <Link
            href="/book"
            className="inline-block border border-white bg-white px-6 py-3 text-xs tracking-[0.25em] text-[#163b33] uppercase transition hover:bg-transparent hover:text-white"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
