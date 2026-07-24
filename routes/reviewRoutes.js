const express = require('express');
const router = express.Router();
const { getReviewsByDoctor, createReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:doctorId', getReviewsByDoctor);
router.post('/', protect, createReview);

module.exports = router;
