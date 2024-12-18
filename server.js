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
const ratelimiter = require('../schoolmanagementsystem/middlewares/rateLimit');

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


app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the School Management API' });
});


app.use(notFoundHandler);

app.use(errorHandler);



// const PORT = process.env.PORT || 3000; // Change fallback to avoid conflict
const PORT = process.env.PORT || 3001;
// // app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('./config/db');
// const { errorHandler, notFoundHandler } = require('../schoolmanagementsystem/middlewares/errorMiddleware');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocs = require('./swagger');

// const authRoutes = require('./routes/authRoutes');
// const schoolRoutes = require('./routes/schoolRoutes');
// const classroomRoutes = require('./routes/classroomRoutes');
// const studentRoutes = require('./routes/studentRoutes');
// const ratelimiter = require('../schoolmanagementsystem/middlewares/rateLimit');

// const app = express();

// app.use(express.json());
// app.use(ratelimiter);

// mongoose()
//   .then(() => console.log('MongoDB Connected'))
//   .catch((err) => {
//     console.error('MongoDB Connection Error:', err);
//     process.exit(1);
//   });


// const cors = require('cors');
// app.use(cors());
  

// app.use('/api/auth', authRoutes);
// app.use('/api/schools', schoolRoutes);
// app.use('/api/classrooms', classroomRoutes);
// app.use('/api/students', studentRoutes);
// app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Welcome to the School Management API' });
// });

// app.use(notFoundHandler);
// app.use(errorHandler);

// (async () => {
//   try {
//     const getPort = await import('get-port');

//     // Use getPort with the port option directly
//     const PORT = await getPort.default({ port: [...Array(101).keys()].map(i => 3000 + i) });

//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error('Error starting server:', error);
//   }
// })();
