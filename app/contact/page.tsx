import { SiteChrome } from "@/src/components/layout/SiteChrome";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <SiteChrome />
      <div className="h-[280px]" />

      <section className="content-shell pb-24">
        <h1 className="mb-8 text-3xl tracking-[0.25em] uppercase sm:text-4xl">Get In Touch</h1>
        <p className="muted-copy mb-8">
          Tell us about your project timeline, creative goals, and production requirements.
        </p>

        <form className="grid gap-4 text-left">
          <input
            type="text"
            placeholder="Full Name"
            className="border border-white/20 bg-white/5 px-4 py-4 text-white outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="border border-white/20 bg-white/5 px-4 py-4 text-white outline-none"
          />
          <textarea
            rows={5}
            placeholder="Project Vision"
            className="border border-white/20 bg-white/5 px-4 py-4 text-white outline-none"
          />
          <button
            type="button"
            className="bg-white px-6 py-4 text-xs font-semibold tracking-[0.3em] text-[#163b33] uppercase"
          >
            Send Inquiry
          </button>
        </form>
      </section>
    </div>
  );
}
