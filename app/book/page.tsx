import { BookingPanel } from "@/src/components/BookingPanel";
import { SiteChrome } from "@/src/components/layout/SiteChrome";

export default function BookPage() {
  return (
    <div className="min-h-screen">
      <SiteChrome />
      <div className="h-[170px] sm:h-[280px]" />
      <BookingPanel />
    </div>
  );
}
