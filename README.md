# TaskFlow - Collaborative Project Management

![TaskFlow Banner](https://via.placeholder.com/1200x300/4F46E5/ffffff?text=TaskFlow+-+Manage+Projects+Together)

## 🎯 The Problem

Small teams and freelancers struggle with project management tools that are either too complex (like Jira) or too simple (like basic to-do lists). They need something intuitive that handles multiple projects, team collaboration, and real-time updates without overwhelming features or enterprise pricing.

## ✨ The Solution

TaskFlow is a modern, real-time collaborative project management application that strikes the perfect balance between simplicity and functionality. It enables teams to:

- **Organize work** into projects with customizable task boards
- **Collaborate in real-time** with instant updates across all users
- **Track progress** with visual dashboards and status indicators
- **Control access** with role-based permissions (Admin, Manager, Member)
- **Stay informed** with real-time notifications

## 🏗️ Architecture Overview

### Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- React Router v6 (routing)
- Socket.io-client (real-time)
- Chart.js (dashboard charts)
- Axios (HTTP client)

**Backend**
- Node.js + Express + TypeScript
- Socket.io (WebSocket server)
- Prisma ORM (database layer)
- JWT (authentication)
- bcrypt (password hashing)
- Zod (validation)

**Database**
- PostgreSQL (relational database)

**Testing**
- Frontend: Vitest + React Testing Library
- Backend: Jest + Supertest
- 10+ tests covering auth, CRUD, and real-time features

**Deployment**
- Frontend: Vercel
- Backend + DB: Railway
- CI/CD: GitHub Actions

### Database Schema

```
User (1) ──< (M) ProjectMember (M) >── (1) Project
                                            │
                                            │ (1)
                                            │
                                            ↓
                                          (M) Task
                                            │
                                            │ (1)
                                            │
                                            ↓
                                          (M) Comment
```

**Key Relationships**:
- Users can belong to multiple projects (many-to-many via ProjectMember)
- Projects contain multiple tasks (one-to-many)
- Tasks can have multiple comments (one-to-many)
- ProjectMember tracks role (ADMIN, MANAGER, MEMBER)

## 🚀 Features

### MVP Features ✅

1. **Authentication & Authorization**
   - User registration and login
   - JWT-based session management
   - Protected routes (frontend & backend)
   - Role-based permissions (Admin, Manager, Member)

2. **Project Management (CRUD)**
   - Create, read, update, delete projects
   - Project details and settings
   - Team member management
   - Role assignment

3. **Task Management (CRUD)**
   - Create, read, update, delete tasks
   - Task status tracking (TODO, IN_PROGRESS, DONE)
   - Task priority levels (LOW, MEDIUM, HIGH)
   - Task assignment to team members
   - Due date management

4. **User Interface**
   - Dashboard (overview of all projects)
   - Project list page
   - Project detail page with task board
   - Task detail page
   - Profile settings page
   - Responsive design (mobile, tablet, desktop)

5. **Data Validation**
   - Client-side form validation (React Hook Form + Zod)
   - Server-side validation (Zod schemas)
   - Error handling with user-friendly messages

6. **UI/UX Polish**
   - Loading states (spinners, skeletons)
   - Error states (error boundaries, toast notifications)
   - Empty states (helpful prompts)
   - Smooth transitions and animations

### Stretch Goals ✅

1. **Real-time Features (WebSockets)**
   - Live task updates across all connected users
   - Real-time notifications for task assignments
   - Online user presence indicators
   - Instant project member updates

2. **Dashboard with Charts**
   - Project progress visualization
   - Task completion statistics
   - Team productivity metrics
   - Activity timeline

3. **Dark Mode**
   - Theme toggle (light/dark)
   - Persistent user preference
   - System preference detection

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/taskflow-app.git
cd taskflow-app
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and JWT secret

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Seed the database (optional)
npx prisma db seed

# Start the development server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your backend API URL

# Start the development server
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Run Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🌐 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `VITE_API_URL`: Your Railway backend URL
   - `VITE_WS_URL`: Your Railway WebSocket URL
4. Deploy

### Backend (Railway)

1. Create new project in Railway
2. Add PostgreSQL database
3. Deploy from GitHub
4. Set environment variables:
   - `DATABASE_URL`: Auto-provided by Railway
   - `JWT_SECRET`: Generate a secure random string
   - `FRONTEND_URL`: Your Vercel URL
   - `PORT`: 5000
5. Deploy

## 🧪 Testing

### Backend Tests (6 tests)

- User registration and login
- JWT token validation
- Project CRUD operations
- Task CRUD operations
- Role-based access control
- WebSocket connection handling

### Frontend Tests (5 tests)

- Login form validation and submission
- Protected route redirects
- Task list rendering
- Task creation flow
- Real-time update reception

**Total: 11 tests** covering core functionality

## 🎓 Case Study

### The Challenge: Real-time State Synchronization

**Problem**: The biggest challenge was maintaining consistent state across multiple clients when tasks were updated in real-time. When User A updates a task, Users B and C need to see the change instantly, but each user might be on different pages (dashboard, project view, task detail).

**Attempted Solution 1**: Initially, I broadcast every change to all connected users and let each client update their local state. This led to race conditions and stale data when multiple users edited the same task simultaneously.

**Attempted Solution 2**: I tried implementing optimistic updates with a rollback mechanism, but this created a confusing UX when conflicts occurred, and users saw their changes "undo" themselves.

**Final Solution**: I implemented a room-based WebSocket architecture with version-controlled state updates:

1. **Socket Rooms**: Users join specific project rooms (e.g., `project:${projectId}`)
2. **Versioning**: Each state change includes a timestamp/version number
3. **Reconciliation**: On conflict, the server acts as the source of truth
4. **Smart Broadcasting**: Only broadcast to users in the relevant room
5. **Selective Updates**: Frontend components subscribe only to relevant updates

```typescript
// Backend: Room-based broadcasting
socket.join(`project:${projectId}`);
io.to(`project:${projectId}`).emit('task:updated', {
  task,
  version: Date.now()
});

// Frontend: Selective subscription
useEffect(() => {
  socket.on('task:updated', (data) => {
    if (data.task.projectId === currentProjectId) {
      updateTaskInState(data.task);
    }
  });
}, [currentProjectId]);
```

This solution eliminated race conditions, improved performance (fewer unnecessary updates), and provided a smooth real-time experience. The key insight was that **not all clients need all updates** - targeted broadcasting based on context is more efficient and reliable.

### Technical Decisions

**Why PostgreSQL over MongoDB?**
Projects and tasks have clear relationships (projects → tasks → comments) that benefit from relational constraints and JOIN operations. PostgreSQL's ACID guarantees ensure data consistency during concurrent updates.

**Why Prisma over raw SQL?**
Prisma provides type-safe database queries, automatic migrations, and excellent TypeScript integration. The generated client catches errors at compile-time rather than runtime.

**Why Socket.io over native WebSockets?**
Socket.io handles reconnection, room management, and fallback mechanisms automatically. For real-time collaboration, these features are essential for reliability.

**Why TailwindCSS over CSS Modules?**
Faster development, consistent design system, and smaller bundle size (unused styles are purged). The utility-first approach makes responsive design and dark mode trivial.

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x500/4F46E5/ffffff?text=Dashboard+with+Charts)

### Project Board
![Project Board](https://via.placeholder.com/800x500/4F46E5/ffffff?text=Task+Board+View)

### Task Details
![Task Details](https://via.placeholder.com/800x500/4F46E5/ffffff?text=Task+Detail+Modal)

### Dark Mode
![Dark Mode](https://via.placeholder.com/800x500/1F2937/ffffff?text=Dark+Mode+UI)

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome! Feel free to open an issue or reach out.

## 📄 License

MIT License - feel free to use this project as inspiration for your own learning.

## 🔗 Links

- **Live Demo**: [https://taskflow-demo.vercel.app](https://taskflow-demo.vercel.app)
- **API Documentation**: [https://taskflow-api.railway.app/docs](https://taskflow-api.railway.app/docs)
- **GitHub**: [https://github.com/yourusername/taskflow-app](https://github.com/yourusername/taskflow-app)

---

**Built with ❤️ as a capstone project demonstrating full-stack development skills**
