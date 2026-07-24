const Appointment = require('../models/Appointment');
const mongoose = require('mongoose');
const memoryStore = require('../utils/memoryStore');

// @desc Create new appointment
// @route POST /api/appointments
const createAppointment = async (req, res) => {
  try {
    const {
      userEmail,
      doctorId,
      doctorName,
      doctorSpecialty,
      patientName,
      gender,
      phone,
      appointmentDate,
      appointmentTime,
      fee
    } = req.body;

    if (!userEmail || !doctorName || !patientName || !gender || !phone || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ success: false, message: 'Missing required appointment details.' });
    }

    const appData = {
      userEmail: userEmail.toLowerCase(),
      doctorId: doctorId || 'd1',
      doctorName,
      doctorSpecialty: doctorSpecialty || 'General Practice',
      patientName,
      gender,
      phone,
      appointmentDate,
      appointmentTime,
      fee: fee || 800,
      status: 'Confirmed'
    };

    if (mongoose.connection.readyState === 1) {
      try {
        const appointment = await Appointment.create(appData);
        return res.status(201).json({
          success: true,
          message: 'Appointment booked successfully!',
          appointment
        });
      } catch (err) {
        console.warn('[DB Error]: falling back to memory store creation');
      }
    }

    // Memory Store Fallback
    const newAppointment = {
      _id: 'app_' + Date.now(),
      ...appData,
      createdAt: new Date().toISOString()
    };
    memoryStore.appointments.unshift(newAppointment);

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully!',
      appointment: newAppointment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get current user appointments
// @route GET /api/appointments
const getAppointments = async (req, res) => {
  try {
    const userEmail = req.user ? req.user.email : req.query.email;
    if (!userEmail) {
      return res.status(400).json({ success: false, message: 'User email is required' });
    }

    const emailLower = userEmail.toLowerCase();

    if (mongoose.connection.readyState === 1) {
      try {
        const appointments = await Appointment.find({ userEmail: emailLower }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, count: appointments.length, appointments });
      } catch (err) {
        console.warn('[DB Error]: falling back to memory store retrieval');
      }
    }

    // Memory Fallback
    const userApps = memoryStore.appointments.filter(a => a.userEmail === emailLower);
    res.status(200).json({ success: true, count: userApps.length, appointments: userApps });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update an appointment
// @route PUT /api/appointments/:id
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientName, gender, phone, appointmentDate, appointmentTime } = req.body;

    if (mongoose.connection.readyState === 1) {
      try {
        const appointment = await Appointment.findById(id);
        if (appointment) {
          if (patientName) appointment.patientName = patientName;
          if (gender) appointment.gender = gender;
          if (phone) appointment.phone = phone;
          if (appointmentDate) appointment.appointmentDate = appointmentDate;
          if (appointmentTime) appointment.appointmentTime = appointmentTime;

          const updated = await appointment.save();
          return res.status(200).json({
            success: true,
            message: 'Appointment updated successfully!',
            appointment: updated
          });
        }
      } catch (err) {
        console.warn('[DB Error]: falling back to memory update');
      }
    }

    // Memory Store Fallback
    const appIndex = memoryStore.appointments.findIndex(a => a._id === id);
    if (appIndex === -1) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    const current = memoryStore.appointments[appIndex];
    if (patientName) current.patientName = patientName;
    if (gender) current.gender = gender;
    if (phone) current.phone = phone;
    if (appointmentDate) current.appointmentDate = appointmentDate;
    if (appointmentTime) current.appointmentTime = appointmentTime;

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully!',
      appointment: current
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete an appointment
// @route DELETE /api/appointments/:id
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      try {
        const appointment = await Appointment.findById(id);
        if (appointment) {
          await Appointment.findByIdAndDelete(id);
          return res.status(200).json({
            success: true,
            message: 'Appointment deleted successfully!'
          });
        }
      } catch (err) {
        console.warn('[DB Error]: falling back to memory delete');
      }
    }

    // Memory Store Fallback
    const appIndex = memoryStore.appointments.findIndex(a => a._id === id);
    if (appIndex !== -1) {
      memoryStore.appointments.splice(appIndex, 1);
    }

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment
};
