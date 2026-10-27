import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';
import { getSocketInstance } from '../lib/socket';

const router = Router();
router.use(authenticate);

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  projectId: z.string().uuid(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  assigneeId: z.string().uuid().optional(),
  dueDate: z.string().datetime().optional(),
});

const updateTaskSchema = createTaskSchema.partial().omit({ projectId: true });

// Create task
router.post('/', async (req: AuthRequest, res, next) => {
  try {
    const data = createTaskSchema.parse(req.body);

    // Verify user is member of project
    const membership = await prisma.projectMember.findFirst({
      where: {
        projectId: data.projectId,
        userId: req.userId,
      },
    });

    if (!membership) {
      return res.status(403).json({ error: 'Not a member of this project' });
    }

    const task = await prisma.task.create({
      data: {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    // Emit real-time event
    const io = getSocketInstance();
    io.to(`project:${data.projectId}`).emit('task:created', { task });

    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
});

// Update task
router.put('/:id', async (req: AuthRequest, res, next) => {
  try {
    const data = updateTaskSchema.parse(req.body);

    // Get task to check project membership
    const existingTask = await prisma.task.findUnique({
      where: { id: req.params.id },
      select: { projectId: true },
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Verify user is member of project
    const membership = await prisma.projectMember.findFirst({
      where: {
        projectId: existingTask.projectId,
        userId: req.userId,
      },
    });

    if (!membership) {
      return res.status(403).json({ error: 'Not a member of this project' });
    }

    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    // Emit real-time event
    const io = getSocketInstance();
    io.to(`project:${existingTask.projectId}`).emit('task:updated', { task });

    res.json({ task });
  } catch (error) {
    next(error);
  }
});

// Delete task
router.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    // Get task to check project membership
    const existingTask = await prisma.task.findUnique({
      where: { id: req.params.id },
      select: { projectId: true },
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Verify user is member of project
    const membership = await prisma.projectMember.findFirst({
      where: {
        projectId: existingTask.projectId,
        userId: req.userId,
      },
    });

    if (!membership) {
      return res.status(403).json({ error: 'Not a member of this project' });
    }

    await prisma.task.delete({
      where: { id: req.params.id },
    });

    // Emit real-time event
    const io = getSocketInstance();
    io.to(`project:${existingTask.projectId}`).emit('task:deleted', { taskId: req.params.id });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Get task by ID
router.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Verify user is member of project
    const membership = await prisma.projectMember.findFirst({
      where: {
        projectId: task.projectId,
        userId: req.userId,
      },
    });

    if (!membership) {
      return res.status(403).json({ error: 'Not a member of this project' });
    }

    res.json({ task });
  } catch (error) {
    next(error);
  }
});

export default router;
