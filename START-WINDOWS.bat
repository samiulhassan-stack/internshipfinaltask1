@echo off
title TaskFlow - Starting Application
color 0A

echo.
echo ========================================
echo    TASKFLOW - Project Management App
echo ========================================
echo.

:: Check if Docker is available
docker --version >nul 2>&1
if not errorlevel 1 (
    echo Docker detected! Starting with Docker...
    echo.
    echo Starting services...
    docker-compose up -d
    
    if errorlevel 1 (
        echo ERROR: Docker compose failed!
        goto :manual_start
    )
    
    echo.
    echo Waiting for services to start...
    timeout /t 5 /nobreak >nul
    
    echo.
    echo Setting up database...
    docker-compose exec -T backend npx prisma migrate deploy
    docker-compose exec -T backend npx prisma db seed
    
    echo.
    echo ========================================
    echo ✓ TaskFlow is running!
    echo ========================================
    echo.
    echo Frontend: http://localhost:5173
    echo Backend:  http://localhost:5000
    echo.
    echo Demo Login:
    echo   Email: admin@taskflow.com
    echo   Password: demo123
    echo.
    echo Press Ctrl+C to stop all services
    echo ========================================
    
    :: Open browser
    start http://localhost:5173
    
    :: Keep window open and show logs
    docker-compose logs -f
    
    goto :end
)

:manual_start
echo.
echo Docker not found. Starting manually...
echo.

:: Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

:: Check if installed
if not exist "backend\node_modules" (
    echo ERROR: Dependencies not installed!
    echo Please run INSTALL.bat first!
    pause
    exit /b 1
)

echo Starting Backend Server...
start "TaskFlow Backend" cmd /k "cd backend && npm run dev"

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo Starting Frontend Server...
start "TaskFlow Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo ✓ TaskFlow is starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Two terminal windows have opened:
echo  1. Backend Server (port 5000)
echo  2. Frontend Server (port 5173)
echo.
echo Wait 10-15 seconds for servers to start...
echo.
echo Demo Login:
echo   Email: admin@taskflow.com
echo   Password: demo123
echo.
echo Close terminal windows to stop servers
echo ========================================

timeout /t 10 /nobreak >nul
start http://localhost:5173

:end
pause
