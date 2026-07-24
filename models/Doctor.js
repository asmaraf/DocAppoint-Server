const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  customId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialty: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  availability: [{
    type: String
  }],
  description: {
    type: String,
    required: true
  },
  hospital: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 4.8
  },
  reviewsCount: {
    type: Number,
    default: 24
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);
