const authService = require('../../../services/authService');
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mockingoose = require('mockingoose');

jest.setTimeout(10000);

describe('Auth Service - Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should register a user with hashed password', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
      role: 'user',
    };
  
    const result = await authService.register(userData);
    expect(result).toHaveProperty('message', 'User registered successfully');
    expect(result.user).toHaveProperty('name', 'Test User');
  });
  
  it('should register a user with hashed password', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
      role: 'user',
    };
  
    const result = await authService.register(userData);
    expect(result).toHaveProperty('message', 'User registered successfully');
    expect(result.user).toHaveProperty('name', 'Test User');
  });
  
  // it('should register a user with hashed password', async () => {
  //   const userData = {
  //     name: 'Test User',
  //     email: 'test@example.com',
  //     password: 'password',
  //     role: 'Superadmin',
  //   };
  //   const hashedPassword = 'hashed_password';

  //   jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
  //   mockingoose(User).toReturn({ ...userData, password: hashedPassword }, 'save');

  //   const result = await authService.register(userData);

  //   expect(result.password).toBe(hashedPassword);
  //   expect(result.email).toBe(userData.email);
  // });

  // it('should generate a JWT for a valid user', async () => {
  //   const user = {
  //     _id: '123',
  //     email: 'test@example.com',
  //     password: 'hashed_password',
  //     role: 'Superadmin',
  //   };

  //   jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
  //   mockingoose(User).toReturn(user, 'findOne');
  //   jest.spyOn(jwt, 'sign').mockReturnValue('valid_token');

  //   const result = await authService.login(user.email, 'password');

  //   expect(result.token).toBe('valid_token');
  // });
});
