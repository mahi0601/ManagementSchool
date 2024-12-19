
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../../models/User');
const authService = require('../../../services/authService');

jest.mock('jsonwebtoken');
jest.mock('bcrypt');
jest.mock('../../../models/User');

describe('AuthService', () => {
  describe('register', () => {
    it('should register a new user successfully', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };

      User.findOne.mockResolvedValue(null); 
      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.mockImplementation(() => ({ save: jest.fn().mockResolvedValueOnce() }));

      const result = await authService.register(userData);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(User).toHaveBeenCalledWith({ email: 'test@example.com', password: 'hashedPassword' });
      expect(result).toEqual({
        message: 'User registered successfully',
        user: expect.any(Object),
      });
    });

    it('should throw an error if user already exists', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };

      User.findOne.mockResolvedValue({ email: 'test@example.com' });

      await expect(authService.register(userData)).rejects.toThrow('User already exists');
    });

    it('should throw an error on failure', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };

      User.findOne.mockRejectedValue(new Error('Database error'));

      await expect(authService.register(userData)).rejects.toThrow('Database error');
    });
  });

  describe('login', () => {
    it('should login successfully and return a token', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      const user = { _id: 'userId', email: 'test@example.com', password: 'hashedPassword' };

      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('validToken');

      const result = await authService.login(credentials);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 'userId', email: 'test@example.com' },
        process.env.JWT_SECRET || 'defaultSecretKey',
        { expiresIn: '1h' }
      );
      expect(result).toEqual({
        message: 'Login successful',
        token: 'validToken',
      });
    });

    it('should throw an error for invalid credentials', async () => {
      const credentials = { email: 'test@example.com', password: 'wrongpassword' };
      const user = { _id: 'userId', email: 'test@example.com', password: 'hashedPassword' };

      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(false);

      await expect(authService.login(credentials)).rejects.toThrow('Invalid email or password');
    });

    it('should throw an error if user does not exist', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };

      User.findOne.mockResolvedValue(null);

      await expect(authService.login(credentials)).rejects.toThrow('Invalid email or password');
    });

    it('should throw an error on failure', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };

      User.findOne.mockRejectedValue(new Error('Database error'));

      await expect(authService.login(credentials)).rejects.toThrow('Database error');
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      jwt.verify.mockReturnValue({ id: 'userId', email: 'test@example.com' });

      const result = authService.verifyToken('validToken');

      expect(jwt.verify).toHaveBeenCalledWith('validToken', process.env.JWT_SECRET || 'defaultSecretKey');
      expect(result).toEqual({ id: 'userId', email: 'test@example.com' });
    });

    it('should throw an error for an invalid token', () => {
      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      expect(() => authService.verifyToken('invalidToken')).toThrow('Invalid or expired token');
    });
  });
});
