const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you have a User model

// Secret key for JWT
env = process.env.JWT_SECRET || 'defaultSecretKey';

const authService = {
  // Function to register a new user
  async register(userData) {
    try {
      const { email, password } = userData;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save the user
      const newUser = new User({
        email,
        password: hashedPassword,
      });
      await newUser.save();

      return { message: 'User registered successfully', user: newUser };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Function to authenticate a user (login)
  async login(credentials) {
    try {
      const { email, password } = credentials;

      // Find the user
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id, email: user.email }, env, {
        expiresIn: '1h',
      });

      return { message: 'Login successful', token };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Function to validate a token
  verifyToken(token) {
    try {
      return jwt.verify(token, env);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  },
  
};

module.exports = authService;
