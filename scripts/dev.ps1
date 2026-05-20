# Start API + Vite in separate windows (paths with spaces are supported).
$ErrorActionPreference = "Stop"
$scriptsDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = (Resolve-Path (Join-Path $scriptsDir "..")).Path
$py = if ($env:PYTHON) { $env:PYTHON } else { "py" }

$backendDir = Join-Path $root "backend"
$frontendDir = Join-Path $root "frontend"

$backendCmd = "& `"$py`" -m uvicorn main:app --reload --host 127.0.0.1 --port 8000"
$frontendCmd = "npm run dev"

Start-Process powershell -WorkingDirectory $backendDir -ArgumentList "-NoExit", "-Command", $backendCmd
Start-Process powershell -WorkingDirectory $frontendDir -ArgumentList "-NoExit", "-Command", $frontendCmd
Write-Host "Started backend (http://127.0.0.1:8000) and frontend (http://127.0.0.1:5173) in new windows."
