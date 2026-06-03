# GitHub Repository Secrets — Setup Checklist

Configure these secrets under **Settings → Secrets and variables → Actions** in your GitHub repository.

## Required Secrets

- [ ] **`OCI_HOST`** — Public IPv4 address of the OCI VM (e.g. `130.61.x.x`).

- [ ] **`OCI_USER`** — SSH username. On OCI Ubuntu images this is `ubuntu`.

- [ ] **`OCI_SSH_KEY`** — Full contents of the private SSH key used to connect to the VM (the `.key` file downloaded during VM provisioning). Paste the entire file including the `-----BEGIN ... PRIVATE KEY-----` header and footer.

## Optional Secrets

- [ ] **`DEPLOY_DIR`** — Absolute path to the app directory on the VM. Defaults to `/home/ubuntu/oli-cinematics` if not set.

---

## Stripe Secrets (server-side only — NOT in GitHub Actions)

These are **not** needed during the CI build and should **not** be added as GitHub Actions secrets. Place them directly in `/home/ubuntu/oli-cinematics/.env.local` on the OCI VM:

```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

> **Why?** There are no DB seeds or external API calls at `next build` time, so the build step in CI completes without them. Keeping them off GitHub Actions reduces secret sprawl.
