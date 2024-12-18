const request = require('supertest');
const app = require('../../../server');

describe('Auth Controller - Unit Tests', () => {
  it('should register a user successfully', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      role: 'Superadmin',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('User Registered Successfully');
  });

  it('should login a user successfully', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
