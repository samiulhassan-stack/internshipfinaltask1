import { PrismaClient, ProjectRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo users
  const hashedPassword = await bcrypt.hash('demo123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@taskflow.com' },
    update: {},
    create: {
      email: 'admin@taskflow.com',
      password: hashedPassword,
      name: 'Admin User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: 'sarah@taskflow.com' },
    update: {},
    create: {
      email: 'sarah@taskflow.com',
      password: hashedPassword,
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'mike@taskflow.com' },
    update: {},
    create: {
      email: 'mike@taskflow.com',
      password: hashedPassword,
      name: 'Mike Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
  });

  console.log('✅ Users created');

  // Create demo project
  const project = await prisma.project.create({
    data: {
      name: 'Website Redesign',
      description: 'Complete redesign of the company website',
      color: '#4F46E5',
      members: {
        create: [
          {
            userId: admin.id,
            role: ProjectRole.ADMIN,
          },
          {
            userId: user1.id,
            role: ProjectRole.MANAGER,
          },
          {
            userId: user2.id,
            role: ProjectRole.MEMBER,
          },
        ],
      },
    },
  });

  console.log('✅ Project created');

  // Create demo tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Design homepage mockup',
        description: 'Create initial design concepts for the new homepage',
        status: 'DONE',
        priority: 'HIGH',
        projectId: project.id,
        assigneeId: user1.id,
      },
      {
        title: 'Implement responsive navigation',
        description: 'Build mobile-first navigation component',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        projectId: project.id,
        assigneeId: user2.id,
      },
      {
        title: 'Set up CI/CD pipeline',
        description: 'Configure automated testing and deployment',
        status: 'TODO',
        priority: 'MEDIUM',
        projectId: project.id,
        assigneeId: admin.id,
      },
      {
        title: 'Write user documentation',
        description: 'Create comprehensive user guide',
        status: 'TODO',
        priority: 'LOW',
        projectId: project.id,
      },
    ],
  });

  console.log('✅ Tasks created');
  console.log('\n📝 Demo credentials:');
  console.log('   Email: admin@taskflow.com');
  console.log('   Password: demo123');
  console.log('\n🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
