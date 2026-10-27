@echo off
color 0A
title TaskFlow - Quick Start

echo.
echo ========================================
echo   TASKFLOW - Starting Application
echo ========================================
echo.

echo [STEP 1/5] Checking .env files...
if not exist "backend\.env" (
    echo ERROR: backend\.env not found!
    echo Please edit backend\.env with your PostgreSQL password
    pause
    exit /b 1
)
echo ✓ .env files found
echo.

echo [STEP 2/5] Starting Backend Server...
echo Opening new window for backend...
start "TaskFlow Backend" cmd /k "cd backend && echo Backend Starting... && npm run dev"
timeout /t 3 /nobreak >nul
echo ✓ Backend window opened
echo.

echo [STEP 3/5] Waiting for backend to start...
timeout /t 8 /nobreak >nul
echo ✓ Backend should be ready now
echo.

echo [STEP 4/5] Starting Frontend Server...
echo Opening new window for frontend...
start "TaskFlow Frontend" cmd /k "cd frontend && echo Frontend Starting... && npm run dev"
timeout /t 3 /nobreak >nul
echo ✓ Frontend window opened
echo.

echo [STEP 5/5] Opening browser...
timeout /t 10 /nobreak >nul
start http://localhost:5173
echo ✓ Browser opened
echo.

echo ========================================
echo   TASKFLOW IS STARTING!
echo ========================================
echo.
echo Two windows have opened:
echo   1. Backend (port 5000)
echo   2. Frontend (port 5173)
echo.
echo Browser will open at: http://localhost:5173
echo.
echo Login Credentials:
echo   Email: admin@taskflow.com
echo   Password: demo123
echo.
echo To STOP the servers:
echo   - Close both terminal windows
echo.
echo ========================================
echo.
pause
