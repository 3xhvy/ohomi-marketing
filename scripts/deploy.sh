#!/bin/bash
set -euo pipefail

cd /opt/ohomi-marketing

: "${IMAGE_TAG:?IMAGE_TAG is required}"
: "${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"

export IMAGE_TAG GITHUB_REPOSITORY

# Persist interpolation vars so a host reboot / `compose up` still uses this tag.
# Do not touch NUXT_PUBLIC_* — those stay in this file if an operator set them.
ENV_FILE=/opt/ohomi-marketing/.env
touch "$ENV_FILE"
for key in IMAGE_TAG GITHUB_REPOSITORY; do
  eval "val=\$$key"
  if grep -q "^${key}=" "$ENV_FILE"; then
    sed -i "s|^${key}=.*|${key}=${val}|" "$ENV_FILE"
  else
    echo "${key}=${val}" >> "$ENV_FILE"
  fi
done

echo "📦 Pulling ghcr.io/${GITHUB_REPOSITORY}:${IMAGE_TAG}..."
docker compose pull

echo "🚀 Restarting marketing container..."
docker compose up -d

echo "⏳ Waiting for marketing to become healthy..."
TIMEOUT=180
ELAPSED=0
while true; do
  HEALTH=$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' ohomi-marketing 2>/dev/null || echo "unknown")

  if [ "$HEALTH" = "healthy" ]; then
    echo "✅ Marketing is healthy!"
    break
  fi

  if [ "$ELAPSED" -ge "$TIMEOUT" ]; then
    echo "❌ Health check timed out after ${TIMEOUT}s. Last status: $HEALTH"
    echo "--- Last 50 log lines ---"
    docker compose logs --tail=50 marketing
    exit 1
  fi

  echo "  status: $HEALTH (${ELAPSED}s elapsed)"
  sleep 5
  ELAPSED=$((ELAPSED + 5))
done

echo "🧹 Pruning old images (older than 72h)..."
docker image prune -f --filter "until=72h"

echo "🎉 Deploy complete!"
