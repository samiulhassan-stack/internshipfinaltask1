// Simple script to create SQLite database using Prisma
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function setupDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔧 Creating database tables...');
    
    // Create admin user
    console.log('👤 Creating demo admin user...');
    const hashedPassword = await bcrypt.hash('demo123', 10);
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@taskflow.com',
        password: hashedPassword,
        name: 'Admin User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
      }
    });
    
    console.log('✅ Admin user created:', admin.email);
    
    // Create demo project
    console.log('📁 Creating demo project...');
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
    
    console.log('✅ Demo project created:', project.name);
    
    // Create demo tasks
    console.log('✏️ Creating demo tasks...');
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
    
    console.log('✅ Demo tasks created');
    console.log('\n🎉 Database setup complete!');
    console.log('\n📝 Login credentials:');
    console.log('   Email: admin@taskflow.com');
    console.log('   Password: demo123');
    console.log('\n🚀 Start the server with: npm run dev');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();
