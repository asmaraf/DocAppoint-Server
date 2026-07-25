const dotenv = require('dotenv');
dotenv.config(); // Must be first — before auth.js reads process.env

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { toNodeHandler } = require('better-auth/node');
const auth = require('./config/auth');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Better Auth Handler — must be BEFORE other routes
// Handles all /api/auth/* routes including Google OAuth redirect & callback
app.all('/api/auth/*', toNodeHandler(auth));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Doctor Appointment Manager (DocAppoint) API is running live!',
    version: '1.0.0'
  });
});

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Endpoint Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[DocAppoint Server]: Listening on http://localhost:${PORT}`);
});
