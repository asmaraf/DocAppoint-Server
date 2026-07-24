const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  doctorId: {
    type: String,
    default: 'd1'
  },
  doctorName: {
    type: String,
    required: true
  },
  doctorSpecialty: {
    type: String,
    default: 'General Medicine'
  },
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  appointmentDate: {
    type: String,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    default: 800
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Pending', 'Completed', 'Cancelled'],
    default: 'Confirmed'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
