import request from 'supertest';
import { app } from '../src/server';
import { prisma } from '../src/lib/prisma';

describe('Task API', () => {
  let token: string;
  let projectId: string;

  beforeAll(async () => {
    // Create test user
    const authResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'task-test@example.com',
        password: 'password123',
        name: 'Task Test User',
      });

    token = authResponse.body.token;

    // Create test project
    const projectResponse = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Task Test Project',
      });

    projectId = projectResponse.body.project.id;
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Task',
          description: 'A test task',
          projectId,
          priority: 'HIGH',
        });

      expect(response.status).toBe(201);
      expect(response.body.task.title).toBe('Test Task');
      expect(response.body.task.status).toBe('TODO');
      expect(response.body.task.priority).toBe('HIGH');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update a task', async () => {
      const createResponse = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Task to Update',
          projectId,
        });

      const taskId = createResponse.body.task.id;

      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'IN_PROGRESS',
          title: 'Updated Task',
        });

      expect(response.status).toBe(200);
      expect(response.body.task.title).toBe('Updated Task');
      expect(response.body.task.status).toBe('IN_PROGRESS');
    });
  });
});
