#!/bin/bash
# Installs dependencies so typecheck, tests and build work in Claude Code cloud sessions.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"
# Playwright is a dev dependency used for screenshots; the cloud image already ships Chromium.
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
npm install --no-audit --no-fund
