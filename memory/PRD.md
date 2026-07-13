# Oli Cinematics Production — PRD

## Original Problem Statement
"Let's analyse this app for my friend's business. We need to build upon what we have and improve." — the app is Oli Cinematics Production, a Next.js 16 studio booking + portfolio site.

## User's iteration goals (Jan 2026)
- UI/UX polish & branding refresh
- Refine booking flow, showcase spaces (Studio A, B, etc.)
- Fix bugs / cleanup
- Change colour scheme to bespoke **white on black**
- Alpha stage — user will provide integration keys later

## Architecture
- **Framework:** Next.js 16.2.1 (App Router, Turbopack, React 19)
- **Styling:** Tailwind v4 (@import "tailwindcss") with CSS variables
- **Payments:** Stripe (secret key deferred to production)
- **Data store:** In-memory repos (spacesRepo, servicesRepo, bookingsRepo)
- **Fonts:** Playfair Display (display) + Inter (body)
- **Runtime:** Supervisor `frontend-next` running `next dev` on port 3000

## Core Entities
- **Space:** Studio A/B/C/D with hourlyRate (cents), features, capacity, image
- **Service:** 2 packages per space (half day 4h / full day 8h) — price = hourlyRate × hours
- **Booking:** in-memory; stripeSessionId; status pending/confirmed/cancelled

## User personas
- **Studio owner (Oliver):** Wants premium booking & showcase for his production house
- **Prospective client:** Books a space, chooses package, picks slot, checks out via Stripe

## What's been implemented (v0.2 — 2026-07-13)
- Complete UI rebrand: bespoke white-on-black theme, cinematic hero, Playfair headings
- Logo mark & wordmark regenerated as B&W (`logo-mark-bw.png`, `logo-title-bw*.png`)
- Home page: hero backdrop, 4 space cards, capabilities section
- **Spaces** system: 4 spaces with per-space pages on `/studios`, cover art regenerated to match dark theme (SVG placeholders)
- Multi-step **booking flow** on `/book`:
  1. Space selector (or via `?space=<slug>` deep-link)
  2. Package picker (half/full day)
  3. Date + slot picker (30-min intervals, 09:00–18:00)
  4. Name/email + summary + reserve
- **API routes:** `/api/spaces`, `/api/services`, `/api/availability`, `/api/checkout`, `/api/contact`
- **Contact page:** functional form with success/error states → MOCKED (logs to console until Resend/SendGrid keys wired)
- **Pricing page:** dynamic per-space cards with half-/full-day tallies
- **Oliver page:** cleaner layout with quote block
- Nav: sticky header with desktop links + mobile hamburger; data-testids across all interactive elements
- next.config.ts: `allowedDevOrigins` for preview hosts

## Deferred / mocked in Alpha
- Stripe checkout (500 "Stripe is not configured" until STRIPE_SECRET_KEY provided) — MOCKED
- Contact form email delivery — MOCKED (console.log only)

## P0 backlog
- Wire Stripe keys (STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET) → live checkout
- Replace SVG placeholders with real photography once Oliver provides assets

## P1 backlog
- Email confirmations via Resend/SendGrid (contact + booking receipts)
- Google Calendar / iCal sync for confirmed bookings
- Admin dashboard (view bookings, mark confirmed/cancelled, block dates)
- MongoDB or Postgres persistence for bookings

## P2 backlog
- Reviews / testimonials section
- Analytics (Plausible or GA4)
- Portfolio (reel & photo grid on Studios or dedicated page)
- Rate cards / add-on kit line items (crew, extra lighting, catering)

## Enhancement suggestion
Consider adding **social proof + a live "next available slot" widget** on the home hero — showing recent brand logos and today's soonest bookable time. This is proven to convert curious visitors on premium studio sites.
