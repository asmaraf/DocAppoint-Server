const Review = require('../models/Review');
const Doctor = require('../models/Doctor');
const mongoose = require('mongoose');
const memoryStore = require('../utils/memoryStore');

// @desc Get reviews for a doctor
// @route GET /api/reviews/:doctorId
const getReviewsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    if (mongoose.connection.readyState === 1) {
      try {
        const reviews = await Review.find({ doctorId }).sort({ createdAt: -1 });
        if (reviews) {
          return res.status(200).json({ success: true, count: reviews.length, reviews });
        }
      } catch (err) {
        console.warn('[DB Review Warning]: fallback to memory');
      }
    }

    const docReviews = memoryStore.reviews.filter(r => r.doctorId === doctorId);
    res.status(200).json({ success: true, count: docReviews.length, reviews: docReviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create a review for a doctor
// @route POST /api/reviews
const createReview = async (req, res) => {
  try {
    const { doctorId, rating, comment } = req.body;

    if (!doctorId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Doctor ID, rating, and comment are required' });
    }

    const reviewData = {
      doctorId,
      userEmail: req.user.email,
      userName: req.user.name,
      userPhoto: req.user.photoUrl,
      rating: Number(rating),
      comment
    };

    if (mongoose.connection.readyState === 1) {
      try {
        const review = await Review.create(reviewData);
        const doctorReviews = await Review.find({ doctorId });
        const avgRating = (doctorReviews.reduce((sum, r) => sum + r.rating, 0) / doctorReviews.length).toFixed(1);

        await Doctor.findOneAndUpdate(
          { $or: [{ customId: doctorId }, { _id: doctorId.match(/^[0-9a-fA-F]{24}$/) ? doctorId : null }] },
          { rating: parseFloat(avgRating), reviewsCount: doctorReviews.length }
        );

        return res.status(201).json({
          success: true,
          message: 'Review added successfully!',
          review
        });
      } catch (err) {
        console.warn('[DB Create Review Warning]: fallback to memory store');
      }
    }

    // Memory Store Fallback
    const newReview = {
      _id: 'r_' + Date.now(),
      ...reviewData,
      createdAt: new Date().toISOString()
    };
    memoryStore.reviews.unshift(newReview);

    // Update doctor in memory
    const doc = memoryStore.doctors.find(d => d.customId === doctorId || d._id === doctorId);
    if (doc) {
      const docRevs = memoryStore.reviews.filter(r => r.doctorId === doctorId);
      const avgRating = (docRevs.reduce((sum, r) => sum + r.rating, 0) / docRevs.length).toFixed(1);
      doc.rating = parseFloat(avgRating);
      doc.reviewsCount = docRevs.length;
    }

    res.status(201).json({
      success: true,
      message: 'Review added successfully!',
      review: newReview
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getReviewsByDoctor,
  createReview
};
