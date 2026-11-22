export default async function handler(req: any, res: any) {
  try {
    // Test environment variables
    const envCheck = {
      hasJwtSecret: !!process.env.JWT_SECRET,
      hasPostgresUrl: !!process.env.POSTGRES_URL,
      hasFrontendUrl: !!process.env.FRONTEND_URL,
      nodeEnv: process.env.NODE_ENV,
    };

    // Test database connection
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    let dbConnected = false;
    let userCount = 0;
    
    try {
      userCount = await prisma.user.count();
      dbConnected = true;
    } catch (error: any) {
      dbConnected = false;
    } finally {
      await prisma.$disconnect();
    }

    return res.status(200).json({
      status: 'ok',
      environment: envCheck,
      database: {
        connected: dbConnected,
        userCount: userCount
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      error: 'Test failed',
      message: error.message
    });
  }
}
