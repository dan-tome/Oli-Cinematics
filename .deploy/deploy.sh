#!/usr/bin/env bash
set -euo pipefail

DEPLOY_DIR="${DEPLOY_DIR:-/home/ubuntu/oli-cinematics}"

echo "[deploy] Starting deployment to ${DEPLOY_DIR}"
cd "${DEPLOY_DIR}"

echo "[deploy] Fetching latest code from origin/main..."
git fetch origin
git reset --hard origin/main

echo "[deploy] Installing dependencies..."
npm ci

echo "[deploy] Building application..."
npm run build

echo "[deploy] Reloading PM2 process..."
if pm2 describe oli-cinematics > /dev/null 2>&1; then
  pm2 reload oli-cinematics --update-env
else
  pm2 start pm2.config.js
fi

echo "[deploy] Saving PM2 process list..."
pm2 save

COMMIT=$(git rev-parse --short HEAD)
echo "[deploy] Done. Running commit: ${COMMIT}"
