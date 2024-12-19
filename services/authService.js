const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); 

env = process.env.JWT_SECRET || 'defaultSecretKey';

const authService = {

  async register(userData) {
    try {
      const { email, password } = userData;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

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


  async login(credentials) {
    try {
      const { email, password } = credentials;

      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      const token = jwt.sign({ id: user._id, email: user.email }, env, {
        expiresIn: '1h',
      });

      return { message: 'Login successful', token };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  verifyToken(token) {
    try {
      return jwt.verify(token, env);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  },
  
};

module.exports = authService;
