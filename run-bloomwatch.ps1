<# ================= BloomWatch One-Click Runner (Windows/PowerShell) =================
   يشغّل: WebSite (5173) + Analysis (5174) + Bloomy API (8000)
   لو أول مرة: بيعمل npm install / يجهز venv ويثبّت باكدجات بايثون.
   usage:
     powershell -ExecutionPolicy Bypass -File .\run-bloomwatch.ps1
#>

$ErrorActionPreference = "Stop"
$ROOT      = Split-Path -Parent $MyInvocation.MyCommand.Path

# -------------- مسارات المشاريع --------------
$WEB_DIR       = Join-Path $ROOT "WebSite"
$ANALYSIS_DIR  = Join-Path $ROOT "Analysis\bloom-trends-app"
$BLOOMIE_DIR   = Join-Path $ROOT "Bloomie"
$BLOOMIE_BACK  = Join-Path $BLOOMIE_DIR "backend"
$BLOOMIE_VENV  = Join-Path $BLOOMIE_BACK ".venv"

# -------------- المنافذ --------------
$PORT_WEB      = 5173
$PORT_ANALYSIS = 5174
$PORT_API      = 8000

# -------------- متغيرات البيئة (عدّلي حسب مساراتك) --------------
$env:MODEL_GATE_PATH  = "F:\Nasa project\Bloom_model\gate_bloom_binary.joblib"
$env:MODEL_STAGE_PATH = "F:\Nasa project\Bloom_model\stage_multiclass.joblib"
# مفتاح OpenRouter (اختياري لو بتستخدمي التلميع اللغوي):
# $env:OPENROUTER_API_KEY = "PUT_YOUR_KEY_HERE"

# -------------- Helpers --------------
function Stop-Port($port) {
  try {
    $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    if ($conns) {
      $pids = $conns | Select-Object -ExpandProperty OwningProcess -Unique
      foreach ($pid in $pids) {
        if ($pid -and (Get-Process -Id $pid -ErrorAction SilentlyContinue)) {
          Write-Host "Killing PID $pid on port $port" -ForegroundColor Yellow
          Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        }
      }
    }
  } catch {}
}

function Ensure-NodeModules($dir) {
  if (!(Test-Path (Join-Path $dir "node_modules"))) {
    Write-Host "→ npm install in $dir" -ForegroundColor Cyan
    Push-Location $dir
    npm install
    Pop-Location
  }
}

function Start-CmdTab($title, $dir, $cmdline) {
  $args = "/k", "title $title && cd /d `"$dir`" && $cmdline"
  Start-Process -FilePath "cmd.exe" -ArgumentList $args -WorkingDirectory $dir
}

# -------------- Kill old listeners --------------
Stop-Port $PORT_WEB
Stop-Port $PORT_ANALYSIS
Stop-Port $PORT_API

# -------------- Prepare WebSite --------------
if (!(Test-Path $WEB_DIR)) { throw "WebSite folder not found: $WEB_DIR" }
Ensure-NodeModules $WEB_DIR

# -------------- Prepare Analysis --------------
if (!(Test-Path $ANALYSIS_DIR)) { Write-Host "⚠ Analysis folder missing ($ANALYSIS_DIR). Skipping..." -ForegroundColor DarkYellow }
else { Ensure-NodeModules $ANALYSIS_DIR }

# -------------- Prepare Bloomy venv + deps --------------
if (!(Test-Path $BLOOMIE_BACK)) { throw "Bloomie backend folder not found: $BLOOMIE_BACK" }
if (!(Test-Path $BLOOMIE_VENV)) {
  Write-Host "→ Creating Python venv at $BLOOMIE_VENV" -ForegroundColor Cyan
  Push-Location $BLOOMIE_BACK
  python -m venv .venv
  & "$BLOOMIE_VENV\Scripts\python.exe" -m pip install --upgrade pip setuptools wheel
  # أساسيات
  & "$BLOOMIE_VENV\Scripts\python.exe" -m pip install fastapi uvicorn httpx joblib python-dotenv
  # بَكِدجات ثقيلة كعجلات جاهزة
  & "$BLOOMIE_VENV\Scripts\python.exe" -m pip install --pre --only-binary=:all: numpy pandas scikit-learn
  Pop-Location
}

# -------------- Sanity checks (نماذج) --------------
function Check-Model($path, $name) {
  if (!(Test-Path $path)) {
    Write-Host "⚠ $name model missing at: $path" -ForegroundColor DarkYellow
  }
}
Check-Model $env:MODEL_GATE_PATH  "Gate"
Check-Model $env:MODEL_STAGE_PATH "Stage"

# -------------- Start servers (كل واحد في تبويب CMD) --------------
Write-Host "Starting servers..." -ForegroundColor Green

# WebSite (5173)
Start-CmdTab "BloomWatch Web (5173)" $WEB_DIR "npm run dev -- --port $PORT_WEB"

# Analysis (5174) - يتخطى لو الفولدر مش موجود
if (Test-Path $ANALYSIS_DIR) {
  Start-CmdTab "Bloom Trends (5174)" $ANALYSIS_DIR "npm run dev -- --port $PORT_ANALYSIS"
}

# Bloomy API (8000)
$uvicorn = "`"$BLOOMIE_VENV\Scripts\python.exe`" -m uvicorn backend.main:app --reload --host 127.0.0.1 --port $PORT_API"
Start-CmdTab "Bloomy API (8000)" $BLOOMIE_DIR $uvicorn

# -------------- Open browser --------------
Start-Process "http://localhost:$PORT_WEB/"
Start-Process "http://127.0.0.1:$PORT_API/health"

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkCyan
Write-Host " WebSite:   http://localhost:$PORT_WEB/" -ForegroundColor Cyan
Write-Host " Analysis:  http://localhost:$PORT_ANALYSIS/   (if folder exists)" -ForegroundColor Cyan
Write-Host " Bloomy:    http://127.0.0.1:$PORT_API/app/" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkCyan
