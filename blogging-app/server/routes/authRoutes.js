// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require('config');

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

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to fetch user profile
router.get("/profile", auth, async (req, res) => {
  try {
    // Fetch user profile based on the user ID in the request object
    const user = await User.findById(req.user.id).select("-password");
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

//Route for Password change
// router.put("/password", auth, async (req, res) => {
//   try {
//     const user = req.user ? await User.findById(req.user.id) : null;
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const { currentPassword, newPassword, confirmPassword } = req.body;

//     // Check current password
//     const isMatch = await user.comparePassword(currentPassword);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid current password" });
//     }

//     // Check if new password and confirm password match
//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     // Hash the new password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     // Change password
//     user.password = hashedPassword;
//     await user.save();

//     res.json({ message: "Password changed successfully" });
//   } catch (error) {
//     console.error("Change password error:", error.stack);
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = router;
