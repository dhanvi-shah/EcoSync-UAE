#!/usr/bin/env bash
# Free dev ports used by this project (8000 = API, 5173 = Vite)
set -euo pipefail
for port in 8000 5173; do
  if command -v lsof >/dev/null 2>&1; then
    pids=$(lsof -ti:"$port" 2>/dev/null || true)
    if [ -n "${pids:-}" ]; then
      kill -9 $pids 2>/dev/null || true
    fi
  elif command -v fuser >/dev/null 2>&1; then
    fuser -k "${port}/tcp" 2>/dev/null || true
  fi
done
echo "Ports 8000 and 5173 cleared (if anything was listening)."
