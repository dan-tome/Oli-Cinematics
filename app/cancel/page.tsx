import Link from "next/link";
import { SiteChrome } from "@/src/components/layout/SiteChrome";

export default function CancelPage() {
  return (
    <div className="min-h-screen">
      <SiteChrome />
      <div className="h-[110px] sm:h-[140px]" />
      <section className="narrow-shell text-center">
        <span className="eyebrow">Checkout cancelled</span>
        <h1 className="mt-4 text-4xl sm:text-5xl">No harm done.</h1>
        <p className="muted-copy mt-6">
          Your booking wasn&apos;t confirmed. Nothing was charged — jump back in whenever you&apos;re ready.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/book" className="btn-primary">Return to booking</Link>
          <Link href="/contact" className="btn-ghost">Talk to us instead</Link>
        </div>
      </section>
    </div>
  );
}
