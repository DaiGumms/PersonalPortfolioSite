# Prints resume/cv.html to public/DavidMorganGumm-Resume.pdf with headless Microsoft Edge.
# Usage: pwsh resume/build.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$source = Join-Path $PSScriptRoot 'cv.html'
$output = Join-Path $root 'public/DavidMorganGumm-Resume.pdf'
$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$profileDir = Join-Path ([System.IO.Path]::GetTempPath()) 'cv-edge-profile'

& $edge --headless=new --disable-gpu --no-first-run --user-data-dir="$profileDir" `
  --no-pdf-header-footer --export-tagged-pdf --virtual-time-budget=10000 `
  --print-to-pdf="$output" ([System.Uri]$source).AbsoluteUri | Out-Null

node (Join-Path $PSScriptRoot 'set-metadata.mjs') $output

Write-Host "Wrote $output"
