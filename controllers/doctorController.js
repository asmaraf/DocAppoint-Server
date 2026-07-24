const Doctor = require('../models/Doctor');
const mongoose = require('mongoose');
const memoryStore = require('../utils/memoryStore');

// @desc Get all doctors with search, sort, & limit
// @route GET /api/doctors
const getDoctors = async (req, res) => {
  try {
    const { search, sortBy, limit } = req.query;

    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (search) {
        const searchRegex = new RegExp(search, 'i');
        query = {
          $or: [
            { name: searchRegex },
            { specialty: searchRegex },
            { hospital: searchRegex },
            { location: searchRegex }
          ]
        };
      }

      let doctorQuery = Doctor.find(query);

      if (sortBy === 'fee_asc') {
        doctorQuery = doctorQuery.sort({ fee: 1 });
      } else if (sortBy === 'fee_desc') {
        doctorQuery = doctorQuery.sort({ fee: -1 });
      } else if (sortBy === 'exp_desc') {
        doctorQuery = doctorQuery.sort({ rating: -1 });
      } else {
        doctorQuery = doctorQuery.sort({ rating: -1, createdAt: -1 });
      }

      if (limit) {
        doctorQuery = doctorQuery.limit(parseInt(limit));
      }

      const doctors = await doctorQuery.exec();
      if (doctors && doctors.length > 0) {
        return res.status(200).json({ success: true, count: doctors.length, doctors });
      }
    }
  } catch (err) {
    console.warn('[DB Query Warning]: Using memory store for doctors');
  }

  // Memory Fallback
  const { search, sortBy, limit } = req.query;
  let list = [...memoryStore.doctors];

  if (search) {
    const term = search.toLowerCase();
    list = list.filter(d =>
      d.name.toLowerCase().includes(term) ||
      d.specialty.toLowerCase().includes(term) ||
      d.hospital.toLowerCase().includes(term) ||
      d.location.toLowerCase().includes(term)
    );
  }

  if (sortBy === 'fee_asc') {
    list.sort((a, b) => a.fee - b.fee);
  } else if (sortBy === 'fee_desc') {
    list.sort((a, b) => b.fee - a.fee);
  } else if (sortBy === 'exp_desc') {
    list.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
  } else {
    list.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
  }

  if (limit) {
    list = list.slice(0, parseInt(limit));
  }

  return res.status(200).json({ success: true, count: list.length, doctors: list });
};

// @desc Get doctor by ID (customId or _id)
// @route GET /api/doctors/:id
const getDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
    if (mongoose.connection.readyState === 1) {
      let doctor = await Doctor.findOne({ customId: id });
      if (!doctor && id.match(/^[0-9a-fA-F]{24}$/)) {
        doctor = await Doctor.findById(id);
      }
      if (doctor) {
        return res.status(200).json({ success: true, doctor });
      }
    }
  } catch (err) {
    console.warn('[DB Query Warning]: Using memory store for doctor detail');
  }

  // Memory Fallback
  const doctor = memoryStore.doctors.find(d => d.customId === id || d._id === id);
  if (!doctor) {
    return res.status(404).json({ success: false, message: 'Doctor not found' });
  }

  return res.status(200).json({ success: true, doctor });
};

module.exports = {
  getDoctors,
  getDoctorById
};
