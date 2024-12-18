require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const { errorHandler, notFoundHandler } = require('../schoolmanagementsystem/middlewares/errorMiddleware');

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const studentRoutes = require('./routes/studentRoutes');
const ratelimiter = require('../schoolmanagementsystem/middlewares/rateLimit');

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(ratelimiter);

// Database Connection
mongoose()
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit if database connection fails
  });

// Define Routes
app.use('/api/auth', authRoutes);         // Authentication Routes
app.use('/api/schools', schoolRoutes);    // School Routes
app.use('/api/classrooms', classroomRoutes); // Classroom Routes
app.use('/api/students', studentRoutes);  // Student Routes

// Swagger Documentation
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Default Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the School Management API' });
});

// Not Found Middleware (after all routes)
app.use(notFoundHandler);

// Error Handling Middleware
app.use(errorHandler);

// const PORT = process.env.PORT || 3000; // Change fallback to avoid conflict


// // const PORT=5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
const PORT = process.env.PORT || 3000; // Let OS assign a free port if none is specified

const server = app.listen(PORT, () => {
  const assignedPort = server.address().port; // Retrieve assigned port from the server object
  console.log(`Server running on http://localhost:${assignedPort}`);
});
