import request from 'supertest';
import { app } from '../src/server';
import { prisma } from '../src/lib/prisma';

describe('Project API', () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    // Create test user
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'project-test@example.com',
        password: 'password123',
        name: 'Project Test User',
      });

    token = response.body.token;
    userId = response.body.user.id;
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  describe('POST /api/projects', () => {
    it('should create a new project', async () => {
      const response = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Project',
          description: 'A test project',
        });

      expect(response.status).toBe(201);
      expect(response.body.project.name).toBe('Test Project');
      expect(response.body.project.members).toHaveLength(1);
      expect(response.body.project.members[0].role).toBe('ADMIN');
    });

    it('should require authentication', async () => {
      const response = await request(app)
        .post('/api/projects')
        .send({
          name: 'Test Project',
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/projects', () => {
    it('should get all user projects', async () => {
      await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Project 1' });

      await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Project 2' });

      const response = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.projects.length).toBeGreaterThanOrEqual(2);
    });
  });
});
