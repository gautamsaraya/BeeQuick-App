const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// JWT secret key
const JWT_SECRET = 'af4b9273ef9a8fb1e7f5b8c71ddbc2d4f7a812eb3d9eaafc8d8f495a675fb2d5'; // Replace with a secure key in production

// User registration
router.post('/register', async (req, res) => {
  const { username, email, password, gender, residence, age, phone_number } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ message: 'Username or email already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gender,
      residence,
      age,
      phone_number,
    });

    // Save the user
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true, // Helps mitigate XSS attacks
      secure: process.env.NODE_ENV === 'production', // Use 'secure' cookies only in production
      maxAge: 3600000 // Cookie expiration in milliseconds (1 hour)
    });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { login, password } = req.body;

  try {
    // Find user by email or username
    const user = await User.findOne({ $or: [{ email: login }, { username: login }] });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true, // Helps mitigate XSS attacks
      secure: process.env.NODE_ENV === 'production', // Use 'secure' cookies only in production
      maxAge: 3600000 // Cookie expiration in milliseconds (1 hour)
    });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/logout', (req, res) => {
  try {
    // Clear the token cookie
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0) // Set the cookie to expire immediately
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;