// Test file for Auth Controller (tests/unit/controllers/authController.test.js)
const request = require('supertest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { register, login } = require('../../../controllers/authController');
const User = require('../../../models/User');

jest.mock('../../../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  describe('register', () => {
    it('should register a user successfully', async () => {
      const req = {
        body: { name: 'Test User', email: 'test@example.com', password: 'password123', role: 'user' },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.mockImplementation(() => ({ save: jest.fn().mockResolvedValueOnce() }));

      await register(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(User).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'user',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User Registered Successfully' });
    });

    it('should handle errors during registration', async () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.mockImplementation(() => ({ save: jest.fn().mockRejectedValueOnce(new Error('Error')) }));

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error' });
    });
  });

  describe('login', () => {
    it('should login successfully and return a token', async () => {
      const req = { body: { email: 'test@example.com', password: 'password123' } };
      const res = { json: jest.fn() };
      const user = { _id: 'userId', email: 'test@example.com', password: 'hashedPassword', role: 'user' };

      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('token');

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 'userId', role: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      expect(res.json).toHaveBeenCalledWith({ token: 'token' });
    });

    it('should handle invalid credentials', async () => {
      const req = { body: { email: 'test@example.com', password: 'wrongpassword' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findOne.mockResolvedValue({ email: 'test@example.com', password: 'hashedPassword' });
      bcrypt.compare.mockResolvedValue(false);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Credentials' });
    });

    it('should handle server errors', async () => {
      const req = { body: { email: 'test@example.com', password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findOne.mockRejectedValue(new Error('Error'));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error' });
    });
  });
});
