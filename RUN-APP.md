# 🚀 TaskFlow Application - How to Run

## ⚠️ Important Setup Required First!

Application ko run karne se pehle **PostgreSQL** aur **environment setup** zaroori hai.

---

## 📋 Pre-Requirements Checklist:

### ✅ 1. PostgreSQL Must Be Running
```
- Open Services (Win + R → services.msc)
- Find "postgresql" service
- Make sure it's RUNNING
- If not, RIGHT CLICK → START
```

### ✅ 2. Backend .env File Setup
```
File: taskflow-app\backend\.env

DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/taskflow"
JWT_SECRET="any-random-string-minimum-32-characters-long"
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

**⚠️ IMPORTANT:** Change `YOUR_PASSWORD` to your actual PostgreSQL password!

### ✅ 3. Database Must Be Created
```powershell
# Run these commands ONCE:
cd taskflow-app\backend
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

---

## 🚀 How to Run Application

### Step 1: Start Backend (Terminal 1)
```powershell
cd "C:\Users\USer\Desktop\final task internship\taskflow-app\backend"
npm run dev
```

**Wait for:**
```
🚀 Server running on port 5000
📡 WebSocket server ready
```

### Step 2: Start Frontend (Terminal 2 - NEW)
```powershell
cd "C:\Users\USer\Desktop\final task internship\taskflow-app\frontend"
npm run dev
```

**Wait for:**
```
➜  Local:   http://localhost:5173/
```

### Step 3: Open Browser
```
URL: http://localhost:5173

Login:
Email: admin@taskflow.com
Password: demo123
```

---

## ❌ Common Errors & Solutions

### Error: "Cannot connect to database"
**Solution:**
1. Check PostgreSQL is running
2. Check DATABASE_URL in backend\.env
3. Password sahi hai?

### Error: "Prisma Client not initialized"
**Solution:**
```powershell
cd taskflow-app\backend
npx prisma generate
```

### Error: "Port 5000 already in use"
**Solution:**
```powershell
# Find process
netstat -ano | findstr :5000

# Kill process (replace <PID> with actual PID)
taskkill /PID <PID> /F
```

### Error: "Module not found"
**Solution:**
```powershell
# Backend
cd taskflow-app\backend
npm install

# Frontend
cd taskflow-app\frontend
npm install
```

---

## 🎯 First Time Setup (Complete)

```powershell
# 1. Install PostgreSQL (if not installed)
# Download: https://www.postgresql.org/download/windows/

# 2. Install Backend Dependencies
cd "C:\Users\USer\Desktop\final task internship\taskflow-app\backend"
npm install

# 3. Install Frontend Dependencies
cd "C:\Users\USer\Desktop\final task internship\taskflow-app\frontend"
npm install

# 4. Setup backend .env (edit with your password!)
# File: taskflow-app\backend\.env

# 5. Setup Database
cd "C:\Users\USer\Desktop\final task internship\taskflow-app\backend"
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed

# 6. Start Backend (Terminal 1)
npm run dev

# 7. Start Frontend (Terminal 2)
cd "C:\Users\USer\Desktop\final task internship\taskflow-app\frontend"
npm run dev

# 8. Open http://localhost:5173
```

---

## 🎉 After Successful Start:

You should see:
- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:5173
- ✅ Login page appears
- ✅ Can login with demo credentials

---

## 📚 Need Help?

Read these files:
1. **SETUP-SIMPLE.md** - Easy Urdu/English guide
2. **WINDOWS-SETUP.txt** - Detailed Windows steps
3. **README-SETUP-ISSUE.md** - Path issue solution

---

**Main tumhare liye commands run nahi kar sakta directly, but ye guide follow karo!** 🚀
