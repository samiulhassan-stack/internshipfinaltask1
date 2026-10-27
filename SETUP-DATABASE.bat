@echo off
echo ========================================
echo   TaskFlow Database Setup (SQLite)
echo ========================================
echo.

cd /d "c:\Users\USer\Desktop\final task internship\taskflow-app\backend"

echo Step 1: Stopping any running Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 >nul

echo.
echo Step 2: Cleaning old database...
cd prisma
del /f dev.db 2>nul
del /f dev.db-journal 2>nul
cd ..

echo.
echo Step 3: Running database setup...
node setup-db.js

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Login at: http://localhost:5173
echo Email: admin@taskflow.com
echo Password: demo123
echo.
echo Press any key to start the backend server...
pause >nul

npm run dev
