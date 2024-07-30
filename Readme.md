# TaskMaster

This is a full-stack task management application that allows users to create, manage, and track tasks. It includes features like user authentication and task management.

## Features

- User Authentication (Signup, Login, Logout)
- Task Management (Create, Edit, Delete, Move tasks between columns)
- Drag and Drop 
- Responsive Design

## Tech Stack

### Frontend

- React.js
- Tailwind CSS
- React Router
- Context-API

### Backend

- Node.js
- Express.js
- MongoDB
- Passport.js (for authentication)
- JWT Tokens

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm (or yarn)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/aryansingh10/TaskMaster-Crework.git
    cd TaskMaster-Crework
    ```

2. Install dependencies for both backend and frontend:

    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd client
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the backend directory and add the following:

    ```env
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    SESSION_SECRET=your_session_secret
    ```

4. Start the development server:

    ```bash
    # Backend
    node server.js

    # Frontend (in a new terminal)
    cd client
    npm start
    ```

5. Open your browser and go to `http://localhost:3000` to see the application in action.

## API Endpoints

### Auth

- **POST** `/auth/signup`: Register a new user
- **POST** `/auth/login`: Login a user
- **POST** `/auth/logout`: Logout a user

### Tasks

- **GET** `/tasks`: Get all tasks for the authenticated user
- **POST** `/tasks`: Create a new task
- **PUT** `/tasks/:id`: Update an existing task
- **DELETE** `/tasks/:id`: Delete a task


## Acknowledgements

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Passport.js](http://www.passportjs.org/)


