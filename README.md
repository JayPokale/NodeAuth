# NodeAuth

NodeAuth is a project that combines a React.js frontend with a Node.js + Express.js backend for user authentication.

## Directory Structure

1. **frontend:** Contains the React.js frontend code.
2. **backend:** Contains the Node.js + Express.js backend code.

## Frontend

The frontend of this project is built using React.js.

### Installation

```bash
cd frontend
npm install
touch .env
```

Copy contents from `.env.example` to `.env`

### Usage

```bash
npm run dev
```

This command will start the development server for the React.js frontend.

### Additional Notes

Include any additional information or specific instructions related to the frontend.

## Backend

The backend of this project is built using Node.js and Express.js.

### Installation

```bash
cd backend
npm install
touch .env
```

Copy contents from `.env.example` to `.env`

### Usage

```bash
npm run dev
```

This command will start the Node.js + Express.js server for the backend.

### API Endpoints
List and describe the main API endpoints of your application.
```js
│
├── Auth
│   ├── POST http://localhost:3000/auth/signup
│   │   └── Body: {
│   │               "name": "John Doe",
│   │               "email": "john@example.com",
│   │               "password": "password",
│   │               "phone": "1234567890",
│   │               "gender": "Male",
│   │               "howDidYouHear": "Friends",
│   │               "city": "Mumbai",
│   │               "state": "Maharashtra"
│   │             }
│   └── POST http://localhost:3000/auth/login
│       └── Body: {
│                   "email": "john@example.com",
│                   "password": "password",
│                 }
│
├── User
│   ├── GET http://localhost:3000/users
│   │   └── Header: { key }
│   ├── PUT http://localhost:3000/users
│   │   └── Header: { key }
│   └── DELETE http://localhost:3000/users
│       └── Header: { key }
│
└── Admin
    ├── GET http://localhost:3000/admin
    │   └── Header: { key }
    ├── GET http://localhost:3000/admin/{id}
    │   └── Header: { key }
    ├── PUT http://localhost:3000/admin/{id}
    │   ├── Header: { key }
    │   └── Body: {
    │               "name": "Changed Name",
    │               "email": "changed@example.com",
    │             }
    └── DELETE http://localhost:3000/admin/{id}
        └── Header: { key }
```