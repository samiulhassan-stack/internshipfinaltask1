import express from 'express';
import cors from 'cors';
import authRoutes from '../src/routes/auth.routes';
import projectRoutes from '../src/routes/project.routes';
import taskRoutes from '../src/routes/task.routes';
import { errorHandler } from '../src/middleware/error.middleware';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TaskFlow API is running on Vercel' });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling
app.use(errorHandler);

export default app;
