const request = require('supertest');
const app = require('../../../server');

describe('School Routes - Integration Tests', () => {
  it('should create and fetch schools', async () => {
    const schoolData = { name: 'Integration School', address: '789 School Rd' };

    const createRes = await request(app).post('/api/schools').send(schoolData);
    expect(createRes.statusCode).toEqual(201);
    expect(createRes.body).toHaveProperty('_id');

    const fetchRes = await request(app).get('/api/schools');
    expect(fetchRes.statusCode).toEqual(200);
    expect(Array.isArray(fetchRes.body)).toBe(true);
  });
});


describe('School Routes - Integration Tests', () => {
  it('should return 404 for an undefined route', async () => {
    const res = await request(app).get('/api/non-existing-route');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Route /api/non-existing-route not found');
  });
});
