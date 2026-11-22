import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simple security check
  const { secret } = req.body;
  if (secret !== 'taskflow-setup-2024') {
    return res.status(403).json({ error: 'Invalid secret' });
  }

  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@taskflow.com' }
    });

    if (existingAdmin) {
      return res.status(200).json({ 
        message: 'Database already setup',
        user: {
          email: existingAdmin.email,
          name: existingAdmin.name
        }
      });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('demo123', 10);
    const admin = await prisma.user.create({
      data: {
        email: 'admin@taskflow.com',
        password: hashedPassword,
        name: 'Admin User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
      }
    });

    // Create demo project
    const project = await prisma.project.create({
      data: {
        name: 'TaskFlow Demo Project',
        description: 'Welcome to TaskFlow! This is a demo project.',
        color: '#4F46E5',
        members: {
          create: {
            userId: admin.id,
            role: 'ADMIN'
          }
        }
      }
    });

    // Create demo tasks
    await prisma.task.createMany({
      data: [
        {
          title: 'Welcome to TaskFlow',
          description: 'Explore the features and start managing your tasks!',
          status: 'TODO',
          priority: 'HIGH',
          projectId: project.id,
          assigneeId: admin.id
        },
        {
          title: 'Create your first task',
          description: 'Click the + button to create a new task',
          status: 'IN_PROGRESS',
          priority: 'MEDIUM',
          projectId: project.id,
          assigneeId: admin.id
        },
        {
          title: 'Explore dark mode',
          description: 'Toggle dark mode from the profile menu',
          status: 'DONE',
          priority: 'LOW',
          projectId: project.id,
          assigneeId: admin.id
        }
      ]
    });

    return res.status(200).json({
      success: true,
      message: 'Database setup complete!',
      credentials: {
        email: 'admin@taskflow.com',
        password: 'demo123'
      },
      data: {
        user: admin.email,
        project: project.name,
        tasks: 3
      }
    });

  } catch (error: any) {
    console.error('Setup error:', error);
    return res.status(500).json({ 
      error: 'Database setup failed',
      message: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}
