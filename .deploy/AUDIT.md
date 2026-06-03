# OCI Self-Hosting Audit

Audited on: 2026-06-03
Migration: Render → Oracle Cloud Free Tier (ARM VM)

---

## 1. Environment Variables Required on OCI Server

All variables below must be set in the server environment (e.g. via `.env.production`
or your process manager's environment config). There is no `.env.example` in this
repository — the source of truth is `render.yaml`.

| Variable | Where used | Notes |
|---|---|---|
| `NODE_ENV` | Next.js / Node | Set to `production` |
| `APP_URL` | Application code | Full public URL, e.g. `https://oli-cinematics.example.com` — check all usages of `process.env.APP_URL` before deploying |
| `STRIPE_SECRET_KEY` | `app/api/checkout/route.ts`, `app/api/stripe/webhook/route.ts` | Stripe secret key (starts with `sk_live_…`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client-side Stripe.js | Baked into the client bundle at build time — must be set **before** running `npm run build` |
| `STRIPE_WEBHOOK_SECRET` | `app/api/stripe/webhook/route.ts` | Stripe webhook signing secret (starts with `whsec_…`) — remember to create a new webhook endpoint in the Stripe dashboard pointing at the OCI server |

> **Important:** `NEXT_PUBLIC_*` variables are embedded at build time. If you change
> the value after building you must rebuild the app.

---

## 2. next.config Changes

**None required.**

- `next.config.ts` is currently empty (default options only).
- `output: 'standalone'` is **not** set, which is fine. The standard
  `npm run build && npm run start` workflow (used by Render and replicated in `render.yaml`)
  works identically on any Node.js host.
- No Render-specific plugins or configuration were found.

---

## 3. API Routes Inventory

The following App Router API routes exist under `app/api/`:

```
app/api/availability/route.ts   GET  – booking slot availability
app/api/checkout/route.ts       POST – create Stripe checkout session
app/api/services/route.ts       GET  – list/get services
app/api/stripe/webhook/route.ts POST – Stripe webhook handler
app/api/health/route.ts         GET  – health check (added for OCI)
```

---

## 4. Other Codebase Changes Needed for Self-Hosting

### 4a. Health check endpoint — DONE
`app/api/health/route.ts` was created as part of this audit. It returns
`{ status: "ok", timestamp: "..." }` and is suitable for:
- UptimeRobot / external monitoring
- A keep-alive cron job on the OCI VM (`curl https://<host>/api/health`)
- Nginx `proxy_pass` health probes

### 4b. Stripe webhook endpoint URL
Update the webhook URL in the Stripe dashboard from the Render service URL to the
new OCI server URL. Generate a fresh `STRIPE_WEBHOOK_SECRET` from the Stripe dashboard
and update it on the OCI server.

### 4c. Process manager
Render manages the Node process automatically. On OCI you will need a process manager.
Recommended: `pm2`

```bash
npm install -g pm2
npm run build
pm2 start "npm run start" --name oli-cinematics
pm2 save
pm2 startup   # follow the printed command to enable start-on-boot
```

### 4d. Reverse proxy (Nginx recommended)
The Next.js server runs on port 3000 by default. Front it with Nginx for TLS termination
and port 80/443 routing. Example config snippet:

```nginx
server {
    listen 443 ssl;
    server_name oli-cinematics.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 4e. OCI Security List / firewall
Open ports 80 and 443 in the OCI instance's Security List and in the VM's OS firewall
(`firewalld` / `iptables` / `ufw` depending on the image).

### 4f. No hardcoded Render URLs found
A search of `app/`, `src/`, and `next.config.ts` found no hardcoded `render.com` or
`onrender.com` URLs. No changes needed in source code.

---

## 5. Build & Start Commands (unchanged from Render)

```bash
npm install
npm run build   # triggers prebuild (scripts/generate-build-meta.mjs) automatically
npm run start   # starts Next.js on PORT (default 3000)
```

Set the `PORT` environment variable if you need a different port.
