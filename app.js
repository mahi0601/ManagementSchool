require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');

const { errorHandler, notFoundHandler } = require('../schoolmanagementsystem/middlewares/errorMiddleware');

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

const authRoutes = require('./routes/authRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const studentRoutes = require('./routes/studentRoutes');
const ratelimiter = require('./middlewares/rateLimit');

const app = express();

app.use(express.json());
app.use(ratelimiter);

mongoose()
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); 
  });


  
app.use('/api/auth', authRoutes);        
app.use('/api/schools', schoolRoutes);  
app.use('/api/classrooms', classroomRoutes); 
app.use('/api/students', studentRoutes);  

app.use(notFoundHandler);
app.use(errorHandler);
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the School Management API' });
});

// process.on('SIGINT', () => {
//   console.log('Shutting down server...');
//   process.exit();
// });

// process.on('SIGTERM', () => {
//   console.log('Server terminated.');
//   process.exit();
// });

const PORT = process.env.PORT || 3000; // Change fallback to avoid conflict

// // app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports=app;
