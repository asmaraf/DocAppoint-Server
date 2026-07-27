# 🩺 Doctor Appointment Manager (DocAppoint) - Backend Server API

DocAppoint Backend is a RESTful API that powers the Doctor Appointment Management System. It provides secure authentication, doctor management, appointment booking, and review management using Node.js, Express.js, MongoDB, and JWT authentication.

---

## 🌐 Live Links

- **Server API:** https://docappoint-server-mvur.onrender.com
- **Client Application:** https://doc-appoint-client-nu.vercel.app

---

## 📖 Project Overview

This backend server handles all business logic for the Doctor Appointment Management System. It provides secure user authentication, doctor search, appointment management, and review functionality while ensuring data integrity and scalability through MongoDB Atlas.

---

## ✨ Key Features

- 🔐 Secure JWT Authentication
- 👤 User Registration & Login
- 🔑 Better Auth Compatible Social Login
- 🩺 Doctor Catalog with Search, Sorting & Pagination
- 📅 Appointment Booking & Management
- ✏️ Update Existing Appointments
- ❌ Delete Appointments
- ⭐ Doctor Reviews & Ratings
- 📊 Automatic Average Rating Calculation
- ☁️ MongoDB Atlas Cloud Database
- 🛡️ Password Hashing using BcryptJS
- 🌐 RESTful API Architecture

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb" />
</p>

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- JWT (JSON Web Token)
- BcryptJS

### Other Packages

- CORS
- Dotenv

---

## 📦 Main Dependencies

| Dependency | Purpose |
|------------|---------|
| Express.js | Backend API Development |
| Mongoose | MongoDB Database Management |
| JWT | User Authentication |
| BcryptJS | Password Encryption |
| CORS | Cross-Origin Handling |
| Dotenv | Environment Configuration |
| Nodemon | Automatic Server Restart |

---

## ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=docappoint_jwt_secret_key_2026_super_secure
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/asmaraf/DocAppoint-Server.git
```

### Navigate to Project

```bash
cd DocAppoint-Server
```

### Install Dependencies

```bash
npm install
```

### Seed Sample Doctors

```bash
npm run seed
```

### Start Development Server

```bash
npm start
```

The server will run at:

```
http://localhost:5000
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/social-login` | Social authentication |
| GET | `/api/auth/me` | Get logged-in user |
| PUT | `/api/auth/profile` | Update user profile |

---

### Doctors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | Get all doctors (supports search & sorting) |
| GET | `/api/doctors/:id` | Get single doctor details |

---

### Appointments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments` | Get user appointments |
| POST | `/api/appointments` | Create appointment |
| PUT | `/api/appointments/:id` | Update appointment |
| DELETE | `/api/appointments/:id` | Delete appointment |

---

### Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews/:doctorId` | Get doctor reviews |
| POST | `/api/reviews` | Submit a doctor review |

---

## 📂 Project Structure

```
DocAppoint-Server
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── scripts
├── utils
├── server.js
├── package.json
└── README.md
```

---

## 🔗 Related Links

- 🌐 Live Client: https://doc-appoint-client-nu.vercel.app
- ⚙️ Live API: https://docappoint-server-mvur.onrender.com

---

## 👨‍💻 Author

**ASM Araf**

GitHub: https://github.com/asmaraf

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
