// Set test environment variables
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/taskflow_test';
process.env.NODE_ENV = 'test';
