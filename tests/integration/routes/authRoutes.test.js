// Updated Integration Test Files for Routes
const request = require('supertest');
const app = require('../../../app'); // Adjust the path to your app entry point

describe('Auth Routes - Integration Tests', () => {
  it('should register a user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
      role: 'student',
    };

    const response = await request(app).post('/api/auth/register').send(userData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });
});
describe('Auth Routes - Integration Tests', () => {
  it('should register a user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
      role: 'student',
    };

    const response = await request(app).post('/api/auth/register').send(userData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });
});

