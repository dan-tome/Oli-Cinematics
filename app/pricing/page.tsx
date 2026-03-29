import Link from "next/link";
import { SiteChrome } from "@/src/components/layout/SiteChrome";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <SiteChrome />
      <div className="h-[170px] sm:h-[280px]" />

      <section className="content-shell">
        <h1 className="mb-8 text-3xl tracking-[0.25em] uppercase sm:text-4xl">Pricing</h1>
        <p className="muted-copy mb-8">
          Transparent starter pricing for studio and production services. Final quotes scale with
          scope, crew needs, and post-production requirements.
        </p>

        <div className="space-y-4 text-left">
          <div className="border border-white/10 bg-white/5 p-6">
            <h2 className="mb-2 text-sm tracking-[0.2em] uppercase">Studio Session - 4 Hours</h2>
            <p className="muted-copy text-sm">$80.00 package baseline</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6">
            <h2 className="mb-2 text-sm tracking-[0.2em] uppercase">Portrait Session - 2 Hours</h2>
            <p className="muted-copy text-sm">$65.00 package baseline</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6">
            <h2 className="mb-2 text-sm tracking-[0.2em] uppercase">Edit Suite - 3 Hours</h2>
            <p className="muted-copy text-sm">$90.00 package baseline</p>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/book"
            className="inline-block border border-white bg-white px-8 py-4 text-xs tracking-[0.3em] text-[#163b33] uppercase transition hover:bg-transparent hover:text-white"
          >
            Continue to Booking
          </Link>
        </div>
      </section>
    </div>
  );
}
