import Link from "next/link";
import { SiteChrome } from "@/src/components/layout/SiteChrome";

export default function CancelPage() {
  return (
    <div className="min-h-screen">
      <SiteChrome />
      <div className="h-[170px] sm:h-[280px]" />
      <section className="content-shell">
        <h1 className="mb-6 text-3xl tracking-[0.2em] uppercase">Checkout Cancelled</h1>
        <p className="muted-copy mb-10">
          No worries - your booking was not confirmed. You can choose another slot any time.
        </p>
        <Link
          href="/book"
          className="inline-block border border-white px-8 py-4 text-xs tracking-[0.3em] uppercase transition hover:bg-white hover:text-[#163b33]"
        >
          Return to Booking
        </Link>
      </section>
    </div>
  );
}
