// middlewares/errorMiddleware.js

// Import dependencies
const { ValidationError } = require('mongoose').Error;

/// Handle Not Found Errors
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  res.status(404);
  next(error);
};

// Handle General Errors
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFoundHandler, errorHandler };


