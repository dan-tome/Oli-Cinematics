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

## The real studio (context from Daniel, 2026-07-13)
- One large industrial unit in **Wembley, London**
- Layout: **1 seamless white infinity cove (flagship) + 4 flexible spaces**
- Each flex space has **3 large rotating panel sets** — rotating a panel changes the room's look
  (podcast set, portrait backdrop, product wall) without a rebuild
- Every space **books individually** so multiple clients (e.g. photography + podcast) can shoot
  at the same time
- Oliver is a **videographer, editor and photographer** — space must stay flexible to capture a
  variety of clients
- **Kitchen island set** for a chef-influencer client is under negotiation — NOT on the site until
  confirmed
- Competitive reference: **Klatch Studio (Park Royal)** — well established; we differentiate on
  flexibility (rotating sets, independent booking) and transparent online pricing

## Core Entities
- **Space:** The Infinity Cove + Space One–Four with hourlyRate (GBP pence), features, amenities,
  useCases, capacity, image
- **Service:** 2 packages per space (half day 4h / full day 8h) — price = hourlyRate × hours
- **Booking:** in-memory; spaceId + stripeSessionId; status pending/confirmed/cancelled;
  availability is per-space (concurrent shoots in different spaces supported)

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

## What's been implemented (v0.3 — 2026-07-13, Klatch-inspired truth pass)
- Restructured to the real layout: **Infinity Cove + Space One–Four** (5 bookable spaces)
- Cove-forward copy: seamless white cove, repaint-on-request policy, levelled floor, blackout
- Rotating panel sets described on every flex space + "books independently" messaging
- `/studios`: amenities rendered, "Popular for" use-case chips, **comparison table**, **FAQ section**
- Location stated: Wembley, London (hero, contact, metadata) — exact address shared on booking
- Currency switched to **GBP** (£ display, Stripe `currency: "gbp"`)
- Availability + checkout are space-aware and duration-aware (see v0.2 fixes)

## Placeholder data — CONFIRM WITH OLIVER before launch
- Hourly rates (cove £150/hr, flex spaces £85/hr) and half/full-day pricing
- Footprints (cove 1,400 sqft, spaces 650 sqft) and capacities
- Amenities per space (seating, tea & coffee, wardrobe rail, WiFi)
- Cove repaint policy & whether a charge applies
- Space names (currently "The Infinity Cove", "Space One–Four") — all in `src/data/spaces.ts`

## Deferred / mocked in Alpha
- Stripe checkout (500 "Stripe is not configured" until STRIPE_SECRET_KEY provided) — MOCKED
- Contact form email delivery — MOCKED (console.log only)
- Kitchen island set (chef-influencer client) — subject to negotiation; add a "Space" entry +
  photography once confirmed

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
