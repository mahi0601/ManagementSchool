const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'School Management System API',
      description: 'API Documentation for School Management System',
      version: '1.0.0',
      contact: {
        name: 'Developer Team',
      },
      servers: ['http://localhost:5000'],
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
