const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashed });
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isMatch = user && await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  res.json({ message: 'Login successful', email: user.email });
});

module.exports = router;
