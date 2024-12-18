const request = require('supertest');
const express = require('express');
const { notFoundHandler, errorHandler } = require('../../../middlewares/errorMiddleware');

// Mock express app
const app = express();
app.use(express.json());

// Test routes
app.get('/general-error', (req, res, next) => {
  const error = new Error('Something went wrong!');
  next(error);
});

app.get('/validation-error', (req, res, next) => {
  const error = new Error('Validation Error');
  error.name = 'ValidationError';
  error.errors = { name: { message: 'Name field is required' } };
  next(error);
});

app.get('/unauthorized', (req, res, next) => {
  const error = new Error('Unauthorized');
  error.name = 'UnauthorizedError';
  next(error);
});

app.get('/duplicate-key', (req, res, next) => {
  const error = new Error('Duplicate field value');
  error.code = 11000;
  next(error);
});

// Add middlewares
app.use(notFoundHandler);
app.use(errorHandler);

describe('Error Middleware - Unit Tests', () => {
  it('should handle general server errors and return 500', async () => {
    const response = await request(app).get('/general-error');
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Something went wrong!');
  });

  it('should handle validation errors and return 422', async () => {
    const response = await request(app).get('/validation-error');
    expect(response.status).toBe(422);
    expect(response.body.message).toBe('Name field is required');
  });

  it('should handle unauthorized errors and return 401', async () => {
    const response = await request(app).get('/unauthorized');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Unauthorized access. Token is invalid or missing.');
  });

  it('should handle duplicate key errors and return 409', async () => {
    const response = await request(app).get('/duplicate-key');
    expect(response.status).toBe(409);
    expect(response.body.message).toBe('Duplicate field value entered.');
  });
  
  it('should return 404 for undefined routes', async () => {
    const response = await request(app).get('/undefined-route');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Route /undefined-route not found');
  });
});
