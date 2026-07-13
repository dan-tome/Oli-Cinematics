import Link from "next/link";
import { SiteChrome } from "@/src/components/layout/SiteChrome";

export default function SuccessPage() {
  return (
    <div className="min-h-screen">
      <SiteChrome />
      <div className="h-[110px] sm:h-[140px]" />
      <section className="narrow-shell text-center">
        <span className="eyebrow">Confirmed</span>
        <h1 className="mt-4 text-4xl sm:text-5xl">You&apos;re booked in.</h1>
        <p className="muted-copy mt-6">
          Payment received. A confirmation email is on the way with your booking details, location and
          crew brief instructions.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-ghost">Back to home</Link>
          <Link href="/studios" className="btn-primary">Explore more spaces</Link>
        </div>
      </section>
    </div>
  );
}
