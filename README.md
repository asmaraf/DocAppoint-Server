# Doctor Appointment Manager (DocAppoint) - Backend Server API

Welcome to the server repository for **DocAppoint**, a secure Doctor Appointment Booking API powered by Node.js, Express, and MongoDB.

## Features
- **Better Auth Compatible JWT Authentication**: Secure user login, registration, and social provider login.
- **Doctor Catalog & Search**: Browse specialists with real-time search filtering, fee sorting, and pagination.
- **Appointment Management**: Create, read user-specific bookings, controlled pre-filled updates, and instant deletion.
- **Doctor Reviews & Ratings System**: Authenticated review postings with automatic rating average calculation.
- **MongoDB Atlas Integration**: Reliable cloud persistence for users, doctors, appointments, and reviews.

## Environment Variables
Create a `.env` file in the root of the server directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://araf:araf********@araf.pbvm7ez.mongodb.net/?appName=Araf
JWT_SECRET=docappoint_jwt_secret_key_2026_super_secure
```

## Getting Started
```bash
# Install dependencies
npm install

# Seed sample doctors data
npm run seed

# Start server
npm start
```

## API Endpoints Overview
- `POST /api/auth/register` - User registration with strict password validation
- `POST /api/auth/login` - User login & JWT issuance
- `POST /api/auth/social-login` - Social authentication handler
- `GET /api/auth/me` - Get profile of logged-in user
- `PUT /api/auth/profile` - Update user profile details
- `GET /api/doctors` - Get doctors list (supports `?search=` and `?sortBy=`)
- `GET /api/doctors/:id` - Get single doctor details
- `GET /api/appointments` - Get user's appointments
- `POST /api/appointments` - Book new appointment
- `PUT /api/appointments/:id` - Update appointment details
- `DELETE /api/appointments/:id` - Delete appointment
- `GET /api/reviews/:doctorId` - Get doctor reviews
- `POST /api/reviews` - Post a review for a doctor
