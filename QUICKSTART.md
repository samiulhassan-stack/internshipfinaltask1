# TaskFlow - Quick Start Guide

Get TaskFlow running locally in under 5 minutes!

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or use Docker)
- Git

## Option 1: Quick Start with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/taskflow-app.git
cd taskflow-app

# Start all services
docker-compose up -d

# Run database migrations
docker-compose exec backend npx prisma migrate deploy

# Seed demo data (optional)
docker-compose exec backend npx prisma db seed

# Open your browser
open http://localhost:5173
```

**Demo Login:**
- Email: `admin@taskflow.com`
- Password: `demo123`

## Option 2: Manual Setup

### 1. Clone and Setup

```bash
git clone https://github.com/yourusername/taskflow-app.git
cd taskflow-app
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your database URL and JWT secret

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed

# Start backend
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup (in new terminal)

```bash
cd frontend

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with backend URL (default: http://localhost:5000/api)

# Start frontend
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Open and Test

Open `http://localhost:5173` in your browser.

**Test with demo account:**
- Email: `admin@taskflow.com`
- Password: `demo123`

Or create a new account via the registration page.

## Environment Variables

### Backend (.env)

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/taskflow"
JWT_SECRET="your-super-secret-jwt-key-min-32-characters"
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

### Frontend (.env)

```bash
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=http://localhost:5000
```

## Running Tests

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Common Issues

### "Port 5000 already in use"
```bash
# Kill process on port 5000
# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### "Database connection failed"
- Ensure PostgreSQL is running
- Check DATABASE_URL in backend .env
- Try: `psql -U postgres` to test connection

### "Cannot connect to backend"
- Check backend is running on port 5000
- Verify VITE_API_URL in frontend .env
- Check browser console for CORS errors

### "Prisma Client not generated"
```bash
cd backend
npx prisma generate
```

## Next Steps

- 📖 Read the [README](./README.md) for full documentation
- 🚀 Check [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- 📝 Read [CASE_STUDY.md](./CASE_STUDY.md) to understand technical decisions

## Features to Try

1. **Create a Project** - Click "New Project" button
2. **Add Tasks** - Create tasks with different priorities
3. **Real-time Updates** - Open in multiple tabs, watch updates sync
4. **Dark Mode** - Toggle theme in sidebar
5. **Kanban Board** - Drag tasks between columns (via dropdown)
6. **Dashboard** - View charts and project statistics

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Vite HMR (instant)
- Backend: tsx watch (restarts on changes)

### Database Management
```bash
# Open Prisma Studio (visual database editor)
cd backend
npx prisma studio
```

### Reset Database
```bash
cd backend
npx prisma migrate reset
npx prisma db seed
```

### View Logs
```bash
# Backend logs
cd backend
npm run dev

# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Need Help?

- 📧 Open an issue on GitHub
- 💬 Check existing issues for solutions
- 📚 Read the full documentation

---

Happy coding! 🎉
