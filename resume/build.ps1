# Prints resume/cv.html to public/DavidMorganGumm-Resume.pdf with headless Microsoft Edge.
# Usage: pwsh resume/build.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$source = Join-Path $PSScriptRoot 'cv.html'
$output = Join-Path $root 'public/DavidMorganGumm-Resume.pdf'
$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$profileDir = Join-Path ([System.IO.Path]::GetTempPath()) 'cv-edge-profile'

$started = Get-Date
& $edge --headless=new --disable-gpu --no-first-run --user-data-dir="$profileDir" `
  --no-pdf-header-footer --export-tagged-pdf --virtual-time-budget=10000 `
  --print-to-pdf="$output" ([System.Uri]$source).AbsoluteUri | Out-Null
# $ErrorActionPreference doesn't stop on a native exit code, so check Edge actually wrote a fresh PDF.
if ($LASTEXITCODE -ne 0 -or (Get-Item $output).LastWriteTime -lt $started) {
  throw "Edge did not print $output (exit $LASTEXITCODE)"
}

node (Join-Path $PSScriptRoot 'set-metadata.mjs') $output
if ($LASTEXITCODE -ne 0) { throw "set-metadata.mjs failed (exit $LASTEXITCODE)" }

Write-Host "Wrote $output"
