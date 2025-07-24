const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get all reviews
router.get('/', async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
});

// Submit a review
router.post('/', async (req, res) => {
  try {
    const { text, rating, email } = req.body;
    const newReview = new Review({ text, rating, email });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: 'Invalid review data', error: err.message });
  }
});

module.exports = router;
