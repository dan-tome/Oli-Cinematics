import { GalleryGrid } from "@/src/components/GalleryGrid";
import { SiteChrome } from "@/src/components/layout/SiteChrome";

export default function StudiosPage() {
  return (
    <div className="min-h-screen">
      <SiteChrome />
      <div className="h-[280px]" />

      <section className="content-shell">
        <h1 className="mb-8 text-3xl tracking-[0.25em] uppercase sm:text-4xl">The Space</h1>
        <p className="muted-copy mb-10">
          Our production facility includes a flexible drive-in stage, portrait lighting setups, and
          dedicated post-production spaces for cinematic work.
        </p>
        <GalleryGrid />
      </section>
    </div>
  );
}
