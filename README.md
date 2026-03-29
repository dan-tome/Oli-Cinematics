# Oli Cinematics - Studio Booking PoC

Local-first Next.js PoC for:
- Portfolio gallery
- Slot-based availability API
- Stripe Checkout test flow

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file:

```bash
APP_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

3. Run the app:

```bash
npm run dev
```

4. In another terminal, forward Stripe webhooks:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Use the webhook signing secret printed by Stripe CLI as `STRIPE_WEBHOOK_SECRET`.

## Demo Flow

1. Open `http://localhost:3000`
2. Navigate to `Book Now`
3. Pick service, date, slot, and email
4. Complete Stripe test checkout
5. Confirm redirect to `/success`

## API Endpoints

- `GET /api/services`
- `GET /api/availability?date=YYYY-MM-DD&serviceId=...`
- `POST /api/checkout`
- `POST /api/stripe/webhook`

## Deploy on Render

This repo includes a Render blueprint: `render.yaml`.

1. Push this repo to GitHub.
2. In Render, choose **New +** -> **Blueprint**.
3. Select your repo and deploy.
4. In the Render service settings, set env vars:
   - `APP_URL` = your Render app URL (for example `https://oli-cinematics.onrender.com`)
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
5. In Stripe dashboard, add a webhook endpoint:
   - `https://<your-render-domain>/api/stripe/webhook`
   - Subscribe to `checkout.session.completed` and `checkout.session.expired`.

After env vars are saved, trigger a redeploy so Next.js picks up all values.

## Automatic Versioning on Deploy

Each production build now generates a unique build version in the format:

`<package-version>+<utc-timestamp>.<commit-hint>`

Example:

`0.1.0+20260329194512.a1b2c3d`

This value is shown in the site footer and refreshes on every deployment automatically.
