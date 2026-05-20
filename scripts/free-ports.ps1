# Free dev ports used by this project (8000 = API, 5173 = Vite)
$ports = 8000, 5173
foreach ($port in $ports) {
    Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue |
        ForEach-Object {
            try {
                Stop-Process -Id $_.OwningProcess -Force -ErrorAction Stop
            } catch {
                # ignore
            }
        }
}
Write-Host "Ports 8000 and 5173 cleared (if anything was listening)."
