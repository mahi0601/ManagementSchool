const request = require('supertest');
const app = require('../../../server');

describe('Auth Routes - Integration Tests', () => {
  it('should register and login a user', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      role: 'Superadmin',
    };

    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(userData);

    expect(registerRes.statusCode).toEqual(201);
    expect(registerRes.body.message).toBe('User registered successfully');

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: userData.email,
        password: userData.password,
      });

    expect(loginRes.statusCode).toEqual(200);
    expect(loginRes.body).toHaveProperty('token');
  });
});
