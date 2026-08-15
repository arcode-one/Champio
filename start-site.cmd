@echo off
cd /d "%~dp0"

if not exist "node_modules\.bin\vinext.cmd" (
  echo Installing project dependencies...
  call npm.cmd install --include=optional
  if errorlevel 1 (
    echo Installation failed.
    pause
    exit /b 1
  )
)

echo Starting Champio at http://localhost:5173
start "" powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 4; Start-Process 'http://localhost:5173'"
call npm.cmd run dev

pause
