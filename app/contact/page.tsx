"use client";

import { useState } from "react";
import { SiteChrome } from "@/src/components/layout/SiteChrome";

type FormState = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setState("error");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, project, message }),
      });
      if (!res.ok) throw new Error("send failed");
      setState("sent");
      setName(""); setEmail(""); setProject(""); setMessage("");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="min-h-screen">
      <SiteChrome />
      <div className="h-[110px] sm:h-[140px]" />

      <section className="content-shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="eyebrow">Contact</span>
            <h1 className="mt-4 text-4xl sm:text-5xl">Let&apos;s make something.</h1>
            <p className="muted-copy mt-6">
              Tell us about your project — the ambition, the timeline, the constraints. We&apos;ll come back
              inside a working day with next steps.
            </p>

            <div className="mt-10 space-y-6 text-sm">
              <div>
                <p className="eyebrow">Studio</p>
                <p className="mt-2 text-white/85">Oli Cinematics Production</p>
                <p className="text-white/60">By appointment only</p>
              </div>
              <div>
                <p className="eyebrow">Email</p>
                <a href="mailto:hello@olicinematics.com" className="mt-2 block text-white/85 hover:text-white">
                  hello@olicinematics.com
                </a>
              </div>
              <div>
                <p className="eyebrow">Hours</p>
                <p className="mt-2 text-white/85">Mon – Fri · 09:00 – 18:00</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5" data-testid="contact-form">
            <div>
              <label className="eyebrow mb-2 block">Full name</label>
              <input
                data-testid="contact-name"
                className="input-dark"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="eyebrow mb-2 block">Email</label>
              <input
                type="email"
                data-testid="contact-email"
                className="input-dark"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="eyebrow mb-2 block">Project type</label>
              <input
                data-testid="contact-project"
                className="input-dark"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="Brand film · Portrait · Podcast · Other"
              />
            </div>
            <div>
              <label className="eyebrow mb-2 block">Your vision</label>
              <textarea
                data-testid="contact-message"
                rows={6}
                className="input-dark resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Timeline, audience, ambition…"
              />
            </div>

            <button
              type="submit"
              disabled={state === "sending"}
              data-testid="contact-submit"
              className="btn-primary justify-center disabled:opacity-50"
            >
              {state === "sending" ? "Sending…" : "Send Inquiry"}
            </button>

            {state === "sent" && (
              <p className="text-sm text-emerald-300" data-testid="contact-success">
                Thanks — your message is in. We&apos;ll reply within one working day.
              </p>
            )}
            {state === "error" && (
              <p className="text-sm text-red-300" data-testid="contact-error">
                Please fill in your name, email and message before sending.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
