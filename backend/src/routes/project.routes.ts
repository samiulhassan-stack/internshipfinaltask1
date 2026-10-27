import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';
import { ProjectRole } from '@prisma/client';

const router = Router();
router.use(authenticate);

const createProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
});

const updateProjectSchema = createProjectSchema.partial();

const addMemberSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(['ADMIN', 'MANAGER', 'MEMBER']),
});

// Get all projects for current user
router.get('/', async (req: AuthRequest, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        members: {
          some: {
            userId: req.userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
        tasks: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    res.json({ projects });
  } catch (error) {
    next(error);
  }
});

// Get single project
router.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const project = await prisma.project.findFirst({
      where: {
        id: req.params.id,
        members: {
          some: {
            userId: req.userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
        tasks: {
          include: {
            assignee: {
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

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ project });
  } catch (error) {
    next(error);
  }
});

// Create project
router.post('/', async (req: AuthRequest, res, next) => {
  try {
    const data = createProjectSchema.parse(req.body);

    const project = await prisma.project.create({
      data: {
        ...data,
        members: {
          create: {
            userId: req.userId!,
            role: ProjectRole.ADMIN,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json({ project });
  } catch (error) {
    next(error);
  }
});

// Update project
router.put('/:id', async (req: AuthRequest, res, next) => {
  try {
    const data = updateProjectSchema.parse(req.body);

    // Check if user is admin or manager
    const membership = await prisma.projectMember.findFirst({
      where: {
        projectId: req.params.id,
        userId: req.userId,
        role: { in: [ProjectRole.ADMIN, ProjectRole.MANAGER] },
      },
    });

    if (!membership) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    const project = await prisma.project.update({
      where: { id: req.params.id },
      data,
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    res.json({ project });
  } catch (error) {
    next(error);
  }
});

// Delete project
router.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    // Check if user is admin
    const membership = await prisma.projectMember.findFirst({
      where: {
        projectId: req.params.id,
        userId: req.userId,
        role: ProjectRole.ADMIN,
      },
    });

    if (!membership) {
      return res.status(403).json({ error: 'Only admins can delete projects' });
    }

    await prisma.project.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Add member to project
router.post('/:id/members', async (req: AuthRequest, res, next) => {
  try {
    const { userId, role } = addMemberSchema.parse(req.body);

    // Check if current user is admin or manager
    const membership = await prisma.projectMember.findFirst({
      where: {
        projectId: req.params.id,
        userId: req.userId,
        role: { in: [ProjectRole.ADMIN, ProjectRole.MANAGER] },
      },
    });

    if (!membership) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    const member = await prisma.projectMember.create({
      data: {
        projectId: req.params.id,
        userId,
        role: role as ProjectRole,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    res.status(201).json({ member });
  } catch (error) {
    next(error);
  }
});

export default router;
