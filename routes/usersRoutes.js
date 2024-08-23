const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../models/Users");
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // check if the email has already been registered before
    const existingUser = await Users.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare the password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
