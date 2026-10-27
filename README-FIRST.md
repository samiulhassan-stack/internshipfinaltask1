# 👋 Welcome to TaskFlow!

## 🎯 What You Need to Start

### Requirements
1. **Node.js 18+** - [Download here](https://nodejs.org)
2. **PostgreSQL** - [Download here](https://www.postgresql.org/download/)
3. **Git** - [Download here](https://git-scm.com/downloads)

### Optional (Recommended)
4. **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop)
   - Makes setup much easier!

---

## ⚡ Quick Start (3 Options)

### Option 1: Docker (Easiest) ⭐ Recommended

**Windows:**
```cmd
docker-compose up -d
docker-compose exec backend npx prisma migrate deploy
docker-compose exec backend npx prisma db seed
```

**Then open:** http://localhost:5173

---

### Option 2: Windows Batch Files (Easy)

1. **Double-click:** `INSTALL.bat` (installs dependencies)
2. **Edit:** `backend\.env` with your database URL
3. **Double-click:** `START-WINDOWS.bat` (starts everything)

---

### Option 3: Manual Setup (Full Control)

See **[START.md](./START.md)** for detailed instructions.

---

## 📖 Documentation Guide

**Start here:**
1. 👉 **[START.md](./START.md)** - How to start the app (you are here!)
2. 📖 **[README.md](./README.md)** - Complete project overview
3. 🏃 **[QUICKSTART.md](./QUICKSTART.md)** - 5-minute setup guide

**For deeper understanding:**
4. 📝 **[CASE_STUDY.md](./CASE_STUDY.md)** - Technical decisions & challenges
5. 🚀 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to production
6. ✨ **[FEATURES.md](./FEATURES.md)** - Complete feature list

**For development:**
7. 🤝 **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute
8. 📊 **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Project checklist

---

## 🎬 First Time Setup (Manual)

### Step 1: Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### Step 2: Setup Database
```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit .env with your PostgreSQL URL
# Example: DATABASE_URL="postgresql://postgres:password@localhost:5432/taskflow"

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed demo data
npx prisma db seed
```

### Step 3: Start Backend
```bash
cd backend
npm run dev
```

✅ Should see: `🚀 Server running on port 5000`

### Step 4: Start Frontend (New Terminal)
```bash
cd frontend

# Copy environment file
cp .env.example .env

# Start dev server
npm run dev
```

✅ Should see: `➜ Local: http://localhost:5173/`

### Step 5: Open Application

Go to: **http://localhost:5173**

**Demo Login:**
- Email: `admin@taskflow.com`
- Password: `demo123`

---

## ✅ Verify It's Working

After login, you should see:
1. ✨ Dashboard with charts
2. 📊 Project statistics
3. 🎨 Dark mode toggle works
4. 📱 Responsive design on mobile

**Test Real-Time:**
1. Open app in 2 browser tabs
2. Create a task in one tab
3. Watch it appear instantly in the other! 🎉

---

## 🆘 Troubleshooting

### "Cannot connect to backend"
- Check backend is running: http://localhost:5000/health
- Should return: `{"status":"ok"}`

### "Database connection failed"
- Is PostgreSQL running?
- Check DATABASE_URL in `backend/.env`
- Verify username/password

### "Port already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### "Module not found"
```bash
cd backend (or frontend)
rm -rf node_modules package-lock.json
npm install
```

### Need more help?
Read **[START.md](./START.md)** for detailed troubleshooting!

---

## 🎓 What to Explore

### Try These Features:
- ✅ Create projects and tasks
- ✅ Assign tasks to team members
- ✅ Move tasks between columns
- ✅ Toggle dark mode
- ✅ View analytics dashboard
- ✅ Test real-time updates (multiple tabs)
- ✅ Mobile responsive design

### Understand the Code:
- 📖 Read **[CASE_STUDY.md](./CASE_STUDY.md)** - Understand technical decisions
- 🏗️ Check database schema in `backend/prisma/schema.prisma`
- 🎨 Explore React components in `frontend/src/`

---

## 🚀 Ready to Deploy?

Follow **[DEPLOYMENT.md](./DEPLOYMENT.md)** to deploy to:
- **Vercel** (Frontend)
- **Railway** (Backend + Database)

Free tier available! 🎉

---

## 🎯 Next Steps

1. ✅ **Get it running** (you're doing this now!)
2. 📖 **Understand the code** - Read CASE_STUDY.md
3. 🎨 **Customize it** - Make it your own
4. 🚀 **Deploy it** - Put it online
5. 💼 **Add to portfolio** - Show it off!

---

## 📞 Support

- 📖 Check documentation in this folder
- 🐛 Open an issue on GitHub
- 💬 Read the troubleshooting guides

---

**🎉 Welcome to TaskFlow! Let's build something amazing!**

➡️ **Next:** Read [START.md](./START.md) for detailed startup instructions
