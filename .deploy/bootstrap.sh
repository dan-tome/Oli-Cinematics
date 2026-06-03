#!/usr/bin/env bash
# =============================================================================
# bootstrap.sh — One-shot idempotent server setup for Oli-Cinematics
# Target: Oracle Cloud Free Tier, Ubuntu 24.04 aarch64 (ARM Ampere A1)
#
# Usage: sudo bash bootstrap.sh
#
# After running this script you still need to:
#   1. Fill in .env.local inside the repo (see section 8 below)
#   2. Point your DNS A/AAAA records to this server's public IP
#   3. Run: sudo certbot --nginx -d olicinematics.com -d www.olicinematics.com
# =============================================================================
set -euo pipefail

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
log()  { echo -e "\n\033[1;34m==>\033[0m $*"; }
ok()   { echo -e "\033[1;32m  [ok]\033[0m $*"; }
warn() { echo -e "\033[1;33m [warn]\033[0m $*"; }

# Must be run as root
if [[ $EUID -ne 0 ]]; then
  echo "ERROR: Run this script as root or with sudo." >&2
  exit 1
fi

# ---------------------------------------------------------------------------
# SECTION 1 — System update
# ---------------------------------------------------------------------------
log "Section 1: Updating system packages"
apt update -y
apt upgrade -y
ok "System packages up to date"

# ---------------------------------------------------------------------------
# SECTION 2 — Install prerequisites
# ---------------------------------------------------------------------------
log "Section 2: Installing prerequisites"
apt install -y curl git build-essential netfilter-persistent
ok "Prerequisites installed"

# ---------------------------------------------------------------------------
# SECTION 3 — Install nvm + Node.js 20 LTS
# ---------------------------------------------------------------------------
log "Section 3: Installing nvm and Node.js 20 LTS"

# Determine the home directory of the invoking (non-root) user, if any.
# When run via 'sudo', SUDO_USER is set; otherwise fall back to root.
REAL_USER="${SUDO_USER:-root}"
if [[ "$REAL_USER" == "root" ]]; then
  REAL_HOME="/root"
else
  REAL_HOME="$(getent passwd "$REAL_USER" | cut -d: -f6)"
fi

NVM_DIR="$REAL_HOME/.nvm"

if [[ -d "$NVM_DIR" ]]; then
  warn "nvm already found at $NVM_DIR — skipping nvm install"
else
  log "Downloading and installing nvm (latest stable)"
  # Run nvm installer as the target user so ownership is correct
  sudo -u "$REAL_USER" bash -c \
    'curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/HEAD/install.sh | bash'
  ok "nvm installed to $NVM_DIR"
fi

# Source nvm in this shell (we are root but NVM_DIR may be /home/user/.nvm)
export NVM_DIR
# shellcheck source=/dev/null
\. "$NVM_DIR/nvm.sh"

if nvm ls 20 2>/dev/null | grep -q "v20"; then
  warn "Node 20 already installed via nvm — skipping"
else
  log "Installing Node.js 20 LTS via nvm"
  sudo -u "$REAL_USER" bash -c \
    "export NVM_DIR=\"$NVM_DIR\" && \. \"$NVM_DIR/nvm.sh\" && nvm install 20 && nvm alias default 20"
  # Re-source so this shell picks up the new binary
  \. "$NVM_DIR/nvm.sh"
  ok "Node.js $(node --version) installed"
fi

# Ensure node/npm are on PATH for all subsequent commands
NODE_BIN_DIR="$(dirname "$(nvm which current)")"
export PATH="$NODE_BIN_DIR:$PATH"
ok "node: $(node --version)  npm: $(npm --version)"

# ---------------------------------------------------------------------------
# SECTION 4 — Install PM2 globally
# ---------------------------------------------------------------------------
log "Section 4: Installing PM2 globally"
if command -v pm2 &>/dev/null; then
  warn "PM2 already installed at $(command -v pm2) — skipping"
else
  npm install -g pm2
  ok "PM2 $(pm2 --version) installed"
fi

# ---------------------------------------------------------------------------
# SECTION 5 — Install Nginx and Certbot
# ---------------------------------------------------------------------------
log "Section 5: Installing Nginx and Certbot"
apt install -y nginx python3-certbot-nginx
systemctl enable nginx
ok "Nginx and Certbot installed"

# ---------------------------------------------------------------------------
# SECTION 6 — Open firewall ports 80 and 443 via iptables
# (OCI Ubuntu instances need this in addition to the VCN Security List)
# ---------------------------------------------------------------------------
log "Section 6: Configuring iptables (ports 80 and 443)"

open_port() {
  local port="$1"
  if iptables -C INPUT -p tcp --dport "$port" -j ACCEPT 2>/dev/null; then
    warn "iptables rule for port $port already exists — skipping"
  else
    iptables -I INPUT 6 -p tcp --dport "$port" -j ACCEPT
    ok "iptables: opened port $port"
  fi
}

open_port 80
open_port 443
netfilter-persistent save
ok "iptables rules persisted"

# ---------------------------------------------------------------------------
# SECTION 7 — Clone the Oli-Cinematics repository
# ---------------------------------------------------------------------------
log "Section 7: Cloning Oli-Cinematics repository"

# *** FILL THIS IN before running the script ***
REPO_URL="https://github.com/dan-tome/Oli-Cinematics.git"
APP_DIR="/opt/oli-cinematics"

if [[ "$REPO_URL" == "YOUR_REPO_URL" ]]; then
  echo "ERROR: Edit bootstrap.sh and set REPO_URL to your GitHub repository URL." >&2
  exit 1
fi

if [[ -d "$APP_DIR/.git" ]]; then
  warn "Repository already cloned at $APP_DIR — pulling latest instead"
  git -C "$APP_DIR" pull --ff-only
else
  git clone "$REPO_URL" "$APP_DIR"
  ok "Repository cloned to $APP_DIR"
fi

# ---------------------------------------------------------------------------
# SECTION 8 — Create .env.local placeholder
# ---------------------------------------------------------------------------
log "Section 8: Creating .env.local placeholder (edit before building!)"

ENV_FILE="$APP_DIR/.env.local"

if [[ -f "$ENV_FILE" ]]; then
  warn ".env.local already exists — not overwriting"
else
  cat > "$ENV_FILE" <<'ENVEOF'
# =============================================================================
# .env.local — Oli-Cinematics environment variables
# Fill in every value below before running the build / restarting the app.
# =============================================================================

# The public URL of this deployment (no trailing slash)
# Example: https://www.oli-cinematics.com
APP_URL=

# Stripe secret key (from Stripe Dashboard → Developers → API keys)
STRIPE_SECRET_KEY=

# Stripe publishable key (exposed to the browser via NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Stripe webhook signing secret (from Stripe Dashboard → Webhooks)
STRIPE_WEBHOOK_SECRET=

# Node environment — keep this as 'production' on the server
NODE_ENV=production
ENVEOF
  ok ".env.local placeholder created at $ENV_FILE"
  echo ""
  echo "  >>> ACTION REQUIRED: open $ENV_FILE and fill in all values before"
  echo "      continuing, then re-run this script or manually run:"
  echo "        npm install && npm run build"
  echo "        pm2 restart oli-cinematics"
  echo ""
fi

# ---------------------------------------------------------------------------
# SECTION 9 — npm install && npm run build
# ---------------------------------------------------------------------------
log "Section 9: Installing dependencies and building the app"
cd "$APP_DIR"
npm install
npm run build
ok "Build complete"

# ---------------------------------------------------------------------------
# SECTION 10 — Start the app with PM2
# ---------------------------------------------------------------------------
log "Section 10: Starting app with PM2"

if pm2 describe oli-cinematics &>/dev/null; then
  warn "PM2 process 'oli-cinematics' already registered — reloading"
  pm2 reload oli-cinematics
else
  pm2 start npm --name "oli-cinematics" -- start
  ok "PM2 process 'oli-cinematics' started"
fi

# ---------------------------------------------------------------------------
# SECTION 11 — Configure PM2 to start on reboot
# ---------------------------------------------------------------------------
log "Section 11: Configuring PM2 startup on reboot"

echo ""
echo "  >>> PM2 startup output (run the printed command if prompted) <<<"
pm2 startup || true
pm2 save
ok "PM2 save complete"

# ---------------------------------------------------------------------------
# SECTION 12 — Install Nginx site config
# ---------------------------------------------------------------------------
log "Section 12: Installing Nginx configuration"

NGINX_AVAILABLE="/etc/nginx/sites-available/oli-cinematics"
NGINX_ENABLED="/etc/nginx/sites-enabled/oli-cinematics"
NGINX_DEFAULT="/etc/nginx/sites-enabled/default"
DEPLOY_NGINX_CONF="$APP_DIR/.deploy/nginx.conf"

if [[ ! -f "$DEPLOY_NGINX_CONF" ]]; then
  echo "ERROR: Nginx config not found at $DEPLOY_NGINX_CONF" >&2
  exit 1
fi

cp "$DEPLOY_NGINX_CONF" "$NGINX_AVAILABLE"
ok "Copied nginx.conf to $NGINX_AVAILABLE"

if [[ -L "$NGINX_ENABLED" ]]; then
  warn "Symlink $NGINX_ENABLED already exists — leaving in place"
else
  ln -s "$NGINX_AVAILABLE" "$NGINX_ENABLED"
  ok "Symlinked to sites-enabled"
fi

if [[ -f "$NGINX_DEFAULT" || -L "$NGINX_DEFAULT" ]]; then
  rm -f "$NGINX_DEFAULT"
  ok "Removed default Nginx site"
fi

# ---------------------------------------------------------------------------
# SECTION 13 — Test and reload Nginx
# ---------------------------------------------------------------------------
log "Section 13: Testing and reloading Nginx"
nginx -t
systemctl reload nginx
ok "Nginx reloaded successfully"

# ---------------------------------------------------------------------------
# Done — next steps for the operator
# ---------------------------------------------------------------------------
echo ""
echo "============================================================"
echo "  Bootstrap complete!"
echo "============================================================"
echo ""
echo "  Next steps:"
echo ""
echo "  1. Ensure .env.local is fully populated:"
echo "       $ENV_FILE"
echo ""
echo "  2. Point your domain's DNS A record to this server's"
echo "     public IP address and wait for propagation."
echo ""
echo "  3. Obtain a TLS certificate with Certbot:"
echo "       sudo certbot --nginx -d olicinematics.com -d www.olicinematics.com"
echo ""
echo "  4. Verify the app is running:"
echo "       pm2 status"
echo "       pm2 logs oli-cinematics"
echo ""
echo "  5. To redeploy later, pull new code and rebuild:"
echo "       cd $APP_DIR && git pull && npm install && npm run build && pm2 reload oli-cinematics"
echo ""
