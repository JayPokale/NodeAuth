# My Node App API Testing
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
├── Admin
│   ├── GET http://localhost:3000/admin
│   │   └── Header: { key }
│   ├── GET http://localhost:3000/admin/{id}
│   │   └── Header: { key }
│   ├── PUT http://localhost:3000/admin/{id}
│   │   ├── Header: { key }
│   │   └── Body: {
│   │               "name": "Changed Name",
│   │               "email": "changed@example.com",
│   │             }
│   └── DELETE http://localhost:3000/admin/{id}
│       └── Header: { key }