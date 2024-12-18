const { authenticate } = require('../../../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');

describe('Auth Middleware - Unit Tests', () => {
  it('should authenticate a valid token', () => {
    const req = { header: jest.fn().mockReturnValue('Bearer token') };
    const res = {};
    const next = jest.fn();

    jest.spyOn(jwt, 'verify').mockReturnValue({ id: '123', role: 'Admin' });

    authenticate(req, res, next);
    expect(req.user).toEqual({ id: '123', role: 'Admin' });
    expect(next).toHaveBeenCalled();
  });
});
