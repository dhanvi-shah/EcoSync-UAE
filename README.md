# Sustainable Shopping Assistant

Full-stack app: analyze a product **from a URL and/or photo**, get an **eco score** (AI + rules), **sustainability summary**, **hidden impact**, **carbon estimate**, **eco labels**, **UN SDG tags**, and **greener alternatives**. The UI includes a **local dashboard** (totals stored in the browser).

| Layer | Stack |
|--------|--------|
| API | FastAPI, LangGraph, OpenAI (text + vision) |
| UI | React 18, Vite, Tailwind, Framer Motion |

---

## Repository layout

```
.
├── .github/workflows/ci.yml   # CI on push / PR
├── Makefile                   # install, dev, start, free-ports, clean, ci
├── scripts/                   # dev.ps1 (Windows), free-ports (8000 / 5173)
├── backend/
│   ├── .env.example           # copy → .env (never commit .env)
│   ├── main.py
│   ├── config/ models/ routes/ services/ prompts/ utils/
│   └── requirements.txt
└── frontend/
    ├── .env.example           # optional VITE_* for deployed API
    ├── package.json
    └── src/
```

---

## Prerequisites

- **Python** 3.11+
- **Node.js** 20+
- **OpenAI API key** (set in env only — see below)

---

## Secrets & environment variables

### Rules (GitHub / Vercel / GCP)

| Do | Don’t |
|----|--------|
| Commit only `*.env.example` (placeholders, no real keys) | Commit `.env`, `.env.local`, or files containing API keys |
| Store secrets in **GitHub Actions secrets**, **Vercel env UI**, **GCP Secret Manager** | Put `OPENAI_API_KEY` or `sk-…` strings in the repo or in `VITE_*` client vars |
| Use server-side env for `OPENAI_*` | Expose OpenAI keys to the browser |

This repo’s `.gitignore` ignores common secret filenames. **CI fails** if a tracked `.env` file is detected at the repo root.

### Backend — `backend/.env`

Copy from `backend/.env.example`:

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key |
| `OPENAI_MODEL` | No | Default `gpt-4o-mini` |
| `OPENAI_VISION_MODEL` | No | Vision model for image analysis (default `gpt-4o-mini`) |
| `CORS_ORIGINS` | No | Comma-separated origins (e.g. `http://localhost:5173`) |

### Frontend — `frontend/.env.local` (optional)

Copy from `frontend/.env.example` only if the API is **not** at `http://localhost:8000` (e.g. production API URL).

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | API origin (no trailing slash). **Never put secrets here** — Vite inlines `VITE_*` into the client bundle. |

---

## Local development (one command)

Run commands **from the repository root** (the folder that contains `Makefile`). Paths with spaces are supported.

**Requires [GNU Make](https://www.gnu.org/software/make/)** (Git Bash, MSYS2, or WSL on Windows).

```bash
make install      # first time: pip + npm
make free-ports   # optional: free ports 8000 (API) and 5173 (Vite)
make dev          # backend + frontend
```

**Shortcut:** free ports, then start:

```bash
make start
```

| Target | Purpose |
|--------|---------|
| `make help` | List targets |
| `make install` | `pip install -r backend/requirements.txt` + `npm install` in `frontend/` |
| `make dev` | Windows: two PowerShell windows (`scripts/dev.ps1`). Unix: parallel `backend` + `frontend` |
| `make start` | `free-ports` then `dev` |
| `make backend` | API only → http://127.0.0.1:8000 (docs at `/docs`) |
| `make frontend` | Vite only → http://127.0.0.1:5173 |
| `make free-ports` | Stop listeners on **8000** and **5173** only (dev ports for this app) |
| `make clean` | Remove `frontend/dist` and Python `__pycache__` |
| `make ci` | Local smoke similar to CI: install, import backend, `npm run build` |

**Windows:** Makefile uses `PYTHON=py` by default. Override: `make PYTHON=python install`.

**Manual (two terminals):**

```bash
cd backend && py -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
cd frontend && npm run dev
```

---

## CI (GitHub Actions)

On **push** and **pull request** to `main` / `master`:

- **Backend:** install requirements, import `main:app`, block tracked `.env` at repo root
- **Frontend:** `npm ci`, `npm run build`

Workflow: `.github/workflows/ci.yml`. Newer pushes cancel in-progress runs on the same branch (`concurrency`).

---

## Deployment notes

- **Vercel (frontend):** set `VITE_API_BASE_URL` to your deployed API; build command `npm run build`, output `dist/`.
- **GCP / any API host:** inject `OPENAI_API_KEY` and related vars via Secret Manager or runtime env — never bake into images as literals.

---

## License

Add a `LICENSE` file when you publish.
