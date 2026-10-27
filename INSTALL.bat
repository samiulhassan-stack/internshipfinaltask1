@echo off
echo ========================================
echo TaskFlow - Installation Script
echo ========================================
echo.

:: Check Node.js
echo [1/5] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)
echo ✓ Node.js found
echo.

:: Install Backend Dependencies
echo [2/5] Installing backend dependencies...
cd backend
if not exist "node_modules" (
    call npm install
    if errorlevel 1 (
        echo ERROR: Backend installation failed!
        pause
        exit /b 1
    )
)
echo ✓ Backend dependencies installed
cd ..
echo.

:: Install Frontend Dependencies
echo [3/5] Installing frontend dependencies...
cd frontend
if not exist "node_modules" (
    call npm install
    if errorlevel 1 (
        echo ERROR: Frontend installation failed!
        pause
        exit /b 1
    )
)
echo ✓ Frontend dependencies installed
cd ..
echo.

:: Setup Environment Files
echo [4/5] Setting up environment files...
if not exist "backend\.env" (
    copy "backend\.env.example" "backend\.env"
    echo ✓ Created backend\.env
    echo IMPORTANT: Edit backend\.env with your database URL!
)
if not exist "frontend\.env" (
    copy "frontend\.env.example" "frontend\.env"
    echo ✓ Created frontend\.env
)
echo.

:: Final Instructions
echo [5/5] Installation Complete!
echo.
echo ========================================
echo NEXT STEPS:
echo ========================================
echo.
echo 1. Edit backend\.env with your PostgreSQL URL
echo 2. Run: cd backend
echo 3. Run: npx prisma generate
echo 4. Run: npx prisma migrate dev
echo 5. Run: npx prisma db seed
echo 6. Run: npm run dev (in backend)
echo 7. Open NEW terminal and run: cd frontend
echo 8. Run: npm run dev (in frontend)
echo.
echo Or use Docker: docker-compose up -d
echo.
echo See START.md for detailed instructions!
echo ========================================
pause
