# TaskFlow - Simple Setup (Urdu/English)

## ✅ Aap ko kya chahiye:

1. **Node.js** - https://nodejs.org (Download karein)
2. **PostgreSQL** - https://www.postgresql.org/download/windows/ (Download karein)

## 🚀 Setup Steps:

### Step 1: Dependencies Install Karein

Terminal kholen aur run karein:

```bash
# Frontend dependencies
cd taskflow-app\frontend
npm install

# Backend dependencies (dusre terminal mein)
cd taskflow-app\backend
npm install
```

**Wait karein jab tak "added X packages" dikhe**

### Step 2: Database Setup

1. **PostgreSQL start karein** (Windows Services mein check karein)

2. **Backend .env file banayein:**
   - Navigate: `taskflow-app\backend\`
   - Copy karein: `.env.example` ko `.env` naam se
   - Open karein `.env` file
   - Edit karein:
   ```
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/taskflow"
   JWT_SECRET="any-long-random-string-here-min-32-characters"
   ```

3. **Database setup karein:**
```bash
cd taskflow-app\backend
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

### Step 3: Frontend .env Setup

1. Navigate: `taskflow-app\frontend\`
2. Copy karein: `.env.example` ko `.env` naam se
3. File mein ye hona chahiye:
```
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=http://localhost:5000
```

### Step 4: Start Application

**Terminal 1 - Backend:**
```bash
cd taskflow-app\backend
npm run dev
```

Wait karein jab tak ye dikhe:
```
🚀 Server running on port 5000
📡 WebSocket server ready
```

**Terminal 2 - Frontend:**
```bash
cd taskflow-app\frontend
npm run dev
```

Wait karein jab tak ye dikhe:
```
➜  Local:   http://localhost:5173/
```

### Step 5: Browser Open Karein

**URL:** http://localhost:5173

**Login Details:**
- Email: `admin@taskflow.com`
- Password: `demo123`

## ❌ Agar Error Aaye:

### Error: "Port 5000 already in use"
```bash
# Task Manager kholen
# Port 5000 pe running process ko end karein
# Ya ye command:
netstat -ano | findstr :5000
# Phir PID note karein aur:
taskkill /PID <PID_NUMBER> /F
```

### Error: "Cannot connect to database"
- PostgreSQL running hai? (Services check karein)
- Password sahi hai .env mein?
- Database "taskflow" create kiya hai?

### Error: "Module not found"
```bash
# Dependencies phir se install karein:
cd taskflow-app\frontend
rmdir /s node_modules
npm install

# Backend ke liye bhi same
```

### Error: "Prisma Client not generated"
```bash
cd taskflow-app\backend
npx prisma generate
```

## ✨ Test Karein:

1. Login karein (admin@taskflow.com / demo123)
2. Dashboard dekhein - charts dikhengi
3. "Projects" pe click karein
4. New project banayein
5. Tasks add karein
6. Dark mode try karein
7. 2 tabs mein khol kar real-time updates dekhein!

## 🎉 Done!

Aap ka application chal raha hai!

---

**Problem?** Mujhe batayein, main help karunga!
