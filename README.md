# School Management System

This is a School Management System API built with Node.js and Express. It provides a set of functionalities for managing students, teachers, classes, and administrative data for a school. The API follows RESTful principles and includes JWT authentication for security. The system also integrates Swagger for API documentation.

## Features

- **Student Management**: Add, update, view, and delete student records.
- **Teacher Management**: Add, update, and delete teacher records.
- **Class Management**: Assign students to classes and teachers to classes.
- **Authentication & Authorization**: Secure the API with JWT-based authentication.
- **API Documentation**: API documentation using Swagger for easy reference.
- **Testing**: Unit and integration tests with a testing framework.

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager
- A database (MongoDB recommended) and connection credentials

## Installation

### Step 1: Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/yourusername/school-management-system.git
cd school-management-system
```
### Step 2: Install Dependencies

Install the necessary dependencies by running:

Using npm:

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a .env file in the root directory of the project. This file will contain sensitive information like database credentials and JWT secret. Here's a sample .env file:

```bash
DATABASE_URL=mongodb://yourdatabaseurl
JWT_SECRET=yourjwtsecret
PORT=3000
NODE_ENV=development
```
- **DATABASE_URL** : The connection string to your MongoDB database (you can also use a local database or a cloud database like MongoDB Atlas).
- **JWT_SECRET** : A secret key used to sign JWT tokens for authentication (you can generate a random secret or use a strong passphrase).
- **PORT** : The port the server will run on (default is 3000).
- **NODE_ENV** : The environment the app will run in (use development for local development).

### Step 4: Run the Application

Once you've installed the dependencies and set up the environment variables,you can start the application.

Using npm:
```bash
npm start
```
The application will run on http://localhost:3000 by default.

### Step 5: Access API Documentation
The API is documented using Swagger. Once the server is running, you can view the API documentation by navigating to:

```bash
http://localhost:3000/api-docs
This will display the Swagger UI, which provides an interactive interface to explore and test the API endpoints.
```

### Step 6: Testing
To run the tests for the application, you can use the following command:

Using npm:

```bash
npm test
```

