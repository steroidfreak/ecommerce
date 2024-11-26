const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');


//Get for testing purpose

router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers(); // Fetch users from the database
    res.json(users); // Send the data as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

})
// POST register a new user
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      salutation,
      marketingPreferences,
      country
    } = req.body;

   
    // Register user with the new payload structure
    const userId = await userService.registerUser({
      name,
      email,
      password,
      salutation,
      marketingPreferences,
      country
    });

    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.loginUser(email, password);
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
