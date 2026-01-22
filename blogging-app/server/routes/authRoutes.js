// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user with the given email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create new user
    user = new User({ name, email, password });
    await user.save();

    const token = user.generateAuthToken(); // Generate token

    res.json({ message: "Signup successful", token });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user with the given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = user.generateAuthToken(); // Generate token

    // Send user info including role
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role // <-- Add this line
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to fetch user profile
router.get("/profile", auth, async (req, res) => {
  try {
    // Fetch user profile based on the user ID in the request object
    const user = await User.findById(req.user).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET user profile by email
router.get('/profile/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ email: user.email, username: user.name });
  } catch (error) {
    console.error("Fetch user data error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update user profile
router.put('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

// Change password route
router.post('/change-password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
});

module.exports = router;
