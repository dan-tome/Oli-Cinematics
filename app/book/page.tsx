import { BookingPanel } from "@/src/components/BookingPanel";
import { SiteChrome } from "@/src/components/layout/SiteChrome";
import { Suspense } from "react";

export default function BookPage() {
  return (
    <div className="min-h-screen">
      <SiteChrome />
      <div className="h-[110px] sm:h-[140px]" />
      <Suspense fallback={<div className="content-shell">Loading booking panel…</div>}>
        <BookingPanel />
      </Suspense>
    </div>
  );
}
