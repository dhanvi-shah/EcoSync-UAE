# Sustainable Shopping Assistant — local development
# Run from the repo root. On Windows, PYTHON defaults to `py`.
# Override: make PYTHON=python install

ifeq ($(OS),Windows_NT)
PYTHON ?= py
else
PYTHON ?= python3
endif
export PYTHON

.PHONY: help install dev start backend frontend free-ports clean ci

help:
	@echo "Sustainable Shopping Assistant — targets:"
	@echo "  make install     Install backend (pip) + frontend (npm) dependencies"
	@echo "  make dev         Start API + UI (two windows on Windows; parallel on Unix)"
	@echo "  make start       Free ports 8000/5173, then same as dev"
	@echo "  make backend     API only (uvicorn on :8000)"
	@echo "  make frontend    Vite only (:5173)"
	@echo "  make free-ports  Stop processes listening on 8000 and 5173"
	@echo "  make clean       Remove build caches (frontend/dist, Python caches)"
	@echo "  make ci          Local checks similar to GitHub Actions (install + smoke + build)"

install:
	cd backend && $(PYTHON) -m pip install -r requirements.txt
	cd frontend && npm install

ifeq ($(OS),Windows_NT)
dev:
	powershell -NoProfile -ExecutionPolicy Bypass -File "$(subst \,/,$(CURDIR))/scripts/dev.ps1"
else
dev:
	$(MAKE) -j2 backend frontend
endif

start: free-ports
	$(MAKE) dev

backend:
	cd backend && $(PYTHON) -m uvicorn main:app --reload --host 127.0.0.1 --port 8000

frontend:
	cd frontend && npm run dev

free-ports:
ifeq ($(OS),Windows_NT)
	powershell -NoProfile -ExecutionPolicy Bypass -File "$(subst \,/,$(CURDIR))/scripts/free-ports.ps1"
else
	chmod +x "$(CURDIR)/scripts/free-ports.sh"
	"$(CURDIR)/scripts/free-ports.sh"
endif

clean:
ifeq ($(OS),Windows_NT)
	-powershell -NoProfile -Command "if (Test-Path 'frontend\\dist') { Remove-Item -Recurse -Force 'frontend\\dist' }"
	-powershell -NoProfile -Command "Get-ChildItem -Path backend -Recurse -Directory -Filter __pycache__ | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue"
else
	rm -rf frontend/dist
	find backend -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
endif

ci: install
	cd backend && $(PYTHON) -c "from main import app; assert app.title"
	cd frontend && npm run build
