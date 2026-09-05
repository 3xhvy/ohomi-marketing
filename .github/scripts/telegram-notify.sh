#!/usr/bin/env bash
# Send deploy notifications to Telegram (HTML with plain-text fallback).
# Requires: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
# Optional: FAILED_STEP, LOG_FILE

set -euo pipefail

escape_html() {
  sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g'
}

truncate_text() {
  local max="$1"
  local text="$2"
  if [ "${#text}" -le "$max" ]; then
    printf '%s' "$text"
    return
  fi
  printf '... (truncated)\n%s' "${text: -$max}"
}

build_message() {
  local body="$1"
  local msg="$body"

  if [ -n "${FAILED_STEP:-}" ]; then
    msg="${msg}
<b>Failed step:</b> $(printf '%s' "$FAILED_STEP" | escape_html)"
  fi

  if [ -n "${LOG_FILE:-}" ] && [ -f "$LOG_FILE" ]; then
    local log_tail
    log_tail=$(tail -n 35 "$LOG_FILE" | escape_html)
    log_tail=$(truncate_text 2800 "$log_tail")
    msg="${msg}
<b>Log (last 35 lines):</b>
<pre>${log_tail}</pre>"
  fi

  truncate_text 4000 "$msg"
}

send_telegram() {
  local text="$1"
  local http_code

  http_code=$(curl -s -o /tmp/tg-response.json -w "%{http_code}" \
    -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -d "chat_id=${TELEGRAM_CHAT_ID}" \
    -d "parse_mode=HTML" \
    -d "disable_web_page_preview=true" \
    --data-urlencode "text=${text}") || true

  if [ "$http_code" = "200" ]; then
    echo "Telegram notification sent."
    return 0
  fi

  echo "Telegram HTML send failed (HTTP ${http_code}): $(cat /tmp/tg-response.json 2>/dev/null || true)"

  http_code=$(curl -s -o /tmp/tg-response.json -w "%{http_code}" \
    -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -d "chat_id=${TELEGRAM_CHAT_ID}" \
    --data-urlencode "text=${text}") || true

  if [ "$http_code" = "200" ]; then
    echo "Telegram notification sent (plain text fallback)."
    return 0
  fi

  echo "Telegram plain send also failed (HTTP ${http_code}): $(cat /tmp/tg-response.json 2>/dev/null || true)"
  return 1
}

if [ -z "${TELEGRAM_BOT_TOKEN:-}" ] || [ -z "${TELEGRAM_CHAT_ID:-}" ]; then
  echo "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set; skipping notification."
  exit 0
fi

BODY="${1:-}"
if [ -z "$BODY" ]; then
  BODY="$(cat)"
fi

MESSAGE=$(build_message "$BODY")
send_telegram "$MESSAGE"
