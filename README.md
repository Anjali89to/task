# Task Management Dashboard

A full-stack Task Management Dashboard built with **React** and **Node.js/Express**.  
The application includes user authentication, protected dashboard access, and complete task CRUD functionality.

---

# #Project Objective

Build a task management dashboard where users can register, log in, and manage their personal tasks.

Each logged-in user can:

- Create a task
- View only their own tasks
- Edit a task
- Delete a task
- Mark a task as Complete or Pending
- Filter tasks by All, Completed, and Pending

---

##  Tech Stack

### Frontend

- React.js
- React Router DOM
- Tailwind CSS / CSS
- Fetch API / Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- CORS
- dotenv

---

##  Features

### Authentication

- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Protected dashboard route
- Proper validation for email and password

### Task Management

- Create task
- Get logged-in user's tasks
- Update task
- Delete task
- Mark task as Complete or Pending
- Filter tasks:
  - All
  - Completed
  - Pending

### Bonus Features

- Responsive UI
- Reusable components
- API error handling
- Loader / loading state
- Clean code structure

---
##  Project Structure

```bash
task-management-dashboard/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env
│
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Anjali89to/task
cd your-repository-name
```

---

## Backend Setup

### 2. Go to the Server Folder

```bash
cd server
```

### 3. Install Backend Dependencies

```bash
npm install
```

### 4. Create `.env` File in Server Folder

Create a `.env` file inside the `server` folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

### 5. Start Backend Server

```bash
npm run dev
```

Backend will run on:

```bash
http://localhost:5000
```

---

## Frontend Setup

### 6. Go to the Client Folder

Open a new terminal and run:

```bash
cd client
```

### 7. Install Frontend Dependencies

```bash
npm install
```

### 8. Create `.env` File in Client Folder

Create a `.env` file inside the `client` folder and add:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

### 9. Start Frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

##  Authentication Flow

1. User registers with name, email, and password.
2. Password is hashed before saving in the database.
3. User logs in using email and password.
4. Backend verifies the user and returns a JWT token.
5. Token is stored on the frontend.
6. Protected routes allow access only when a valid token is available.
7. Task APIs are accessed using the JWT token.

---

##  API Endpoints

### Auth APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Task APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Get logged-in user's tasks |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| PATCH | `/api/tasks/:id/status` | Mark task as Complete/Pending |

---

##  API Testing

You can test the backend APIs using Postman or Thunder Client.

### Register User

```http
POST /api/auth/register
```

Example body:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}
```

### Login User

```http
POST /api/auth/login
```

Example body:

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

After login, copy the token and pass it in the Authorization header:

```http
Authorization: Bearer your_token_here
```

### Create Task

```http
POST /api/tasks
```

Example body:

```json
{
  "title": "Complete assignment",
  "description": "Finish the full-stack task dashboard",
  "status": "pending"
}
```

---

##  Pages

### Login Page

- User can log in using email and password.
- Form validation is included.
- After successful login, user is redirected to dashboard.

### Register Page

- User can create a new account.
- Password is securely stored using hashing.
- After successful registration, user can log in.

### Dashboard Page

- Shows task list.
- User can add, edit, delete, and update task status.
- User can filter tasks by All, Completed, and Pending.

---

##  Database Design

### User Model

```js
{
  name: String,
  email: String,
  password: String
}
```

### Task Model

```js
{
  title: String,
  description: String,
  status: String,
  user: ObjectId
}
```

Each task is connected to a specific user, so users can only see and manage their own tasks.

---

##  Validation

### User Validation

- Name is required
- Email is required
- Email must be valid
- Password is required
- Password should have minimum length

### Task Validation

- Task title is required
- Task status should be either `pending` or `completed`

---





##  Protected Routes

Dashboard is protected.  
Only logged-in users can access the dashboard.

If the user is not logged in, they will be redirected to the login page.

---

##  Evaluation Points Covered

### Frontend

- Clean React component structure
- Proper routing
- Protected dashboard
- Responsive UI
- Task filtering
- User-friendly interface

### Backend

- REST API structure
- JWT authentication
- Password hashing
- User-specific task management
- MongoDB database design
- Proper error handling

### Overall

- Clean folder structure
- Meaningful naming conventions
- No hardcoded task data
- Validation added
- Protected APIs
- GitHub-ready code

---

##  How to Run the Project

Run backend:

```bash
cd server
npm install
npm run dev
```

Run frontend:

```bash
cd client
npm install
npm run dev
```

---


