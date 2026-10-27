# 🚀 Starting TaskFlow - Step by Step

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ PostgreSQL installed and running
- ✅ npm installed (`npm --version`)

---

## Option 1: Quick Start with Docker (Recommended)

### Step 1: Start All Services
```bash
# Navigate to project directory
cd taskflow-app

# Start all services (database, backend, frontend)
docker-compose up -d
```

### Step 2: Setup Database
```bash
# Run database migrations
docker-compose exec backend npx prisma migrate deploy

# Seed demo data
docker-compose exec backend npx prisma db seed
```

### Step 3: Open Application
Open your browser and go to: **http://localhost:5173**

**Demo Login:**
- Email: `admin@taskflow.com`
- Password: `demo123`

---

## Option 2: Manual Start (Development)

### Backend Setup

#### Step 1: Install Backend Dependencies
```bash
cd taskflow-app/backend
npm install
```

#### Step 2: Setup Environment
```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` file:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/taskflow"
JWT_SECRET="your-super-secret-jwt-key-at-least-32-characters-long"
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

#### Step 3: Setup Database
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed demo data (optional)
npx prisma db seed
```

#### Step 4: Start Backend
```bash
npm run dev
```

Backend will run on **http://localhost:5000**

✅ You should see:
```
🚀 Server running on port 5000
📡 WebSocket server ready
```

---

### Frontend Setup (Open New Terminal)

#### Step 1: Install Frontend Dependencies
```bash
cd taskflow-app/frontend
npm install
```

#### Step 2: Setup Environment
```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=http://localhost:5000
```

#### Step 3: Start Frontend
```bash
npm run dev
```

Frontend will run on **http://localhost:5173**

✅ You should see:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Verify Everything is Working

### 1. Check Backend Health
Open: http://localhost:5000/health

Should return:
```json
{
  "status": "ok",
  "message": "TaskFlow API is running"
}
```

### 2. Check Frontend
Open: http://localhost:5173

You should see the TaskFlow login page.

### 3. Test Login
Use demo credentials:
- Email: `admin@taskflow.com`
- Password: `demo123`

### 4. Test Real-Time Features
- Open the app in two different browser tabs
- Create a task in one tab
- Watch it appear instantly in the other tab! ✨

---

## Common Issues & Solutions

### ❌ "Port 5000 already in use"

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### ❌ "Cannot connect to database"

**Check PostgreSQL is running:**
```bash
# Windows - Check service
Get-Service postgresql*

# Mac
brew services list

# Linux
sudo systemctl status postgresql
```

**Fix connection:**
1. Ensure PostgreSQL is running
2. Verify DATABASE_URL in backend/.env
3. Check username/password are correct

### ❌ "Prisma Client not generated"

**Solution:**
```bash
cd backend
npx prisma generate
```

### ❌ "Module not found" errors

**Solution:**
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### ❌ Frontend can't connect to backend

**Check:**
1. Backend is running on port 5000
2. VITE_API_URL in frontend/.env is correct
3. CORS is enabled (already configured)
4. Check browser console for errors

### ❌ WebSocket not connecting

**Check:**
1. VITE_WS_URL in frontend/.env (no /api suffix!)
2. Backend WebSocket is initialized
3. Browser console for connection errors

---

## Development Commands

### Backend Commands
```bash
cd backend

# Start dev server with hot reload
npm run dev

# Run tests
npm test

# Generate Prisma client
npm run prisma:generate

# Create new migration
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Seed database
npm run prisma:seed

# Build for production
npm run build

# Start production server
npm start
```

### Frontend Commands
```bash
cd frontend

# Start dev server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Quick Test Checklist

After starting, test these features:

- [ ] ✅ Login with demo account
- [ ] ✅ View dashboard with charts
- [ ] ✅ Navigate to Projects page
- [ ] ✅ Create a new project
- [ ] ✅ Create tasks in the project
- [ ] ✅ Change task status (drag between columns)
- [ ] ✅ Open task in new tab - see real-time updates
- [ ] ✅ Toggle dark mode
- [ ] ✅ Check responsive design (resize browser)
- [ ] ✅ View profile page
- [ ] ✅ Logout and login again

---

## Stopping the Application

### Docker
```bash
docker-compose down

# Stop and remove volumes (reset database)
docker-compose down -v
```

### Manual
Just press `Ctrl+C` in both terminal windows (backend and frontend)

---

## Next Steps

1. ✅ **Explore the app** - Click around and try all features
2. ✅ **Test real-time** - Open multiple tabs
3. ✅ **Read documentation** - Check README.md and CASE_STUDY.md
4. ✅ **Deploy** - Follow DEPLOYMENT.md for production
5. ✅ **Customize** - Make it your own!

---

## Need Help?

- 📖 Read [QUICKSTART.md](./QUICKSTART.md) for detailed setup
- 📖 Read [README.md](./README.md) for full documentation
- 🐛 Check [GitHub Issues](https://github.com/yourusername/taskflow-app/issues)
- 📧 Contact via email or open an issue

---

## Development Tips

### Hot Reload
Both servers support hot reload:
- Backend: Changes auto-restart (tsx watch)
- Frontend: Instant updates (Vite HMR)

### Database Management
```bash
# View database in browser
cd backend
npx prisma studio
# Opens at http://localhost:5555
```

### Reset Everything
```bash
# Reset database
cd backend
npx prisma migrate reset
npx prisma db seed

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

**🎉 Happy Coding!**

You're now ready to explore TaskFlow. Enjoy building and customizing your project management app!
