const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming a User model for MongoDB database
const AIEngine = require('../ai/engine'); // A placeholder for AI integration logic

// Home Route
router.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to StyleSync' });
});

// Signup Route
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign Up - StyleSync' });
});

router.post('/signup', async (req, res) => {
  const { name, age, gender, username, password } = req.body;
  try {
    const newUser = new User({ name, age, gender, username, password });
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Error signing up. Please try again.');
  }
});

// Login Route
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login - StyleSync' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      req.session.user = user; // Store user in session
      res.redirect('/home');
    } else {
      res.status(401).send('Invalid credentials. Please try again.');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error logging in. Please try again.');
  }
});

// Home Page (Post-Login)
router.get('/home', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('home', { title: 'Home - StyleSync', user: req.session.user });
});

// Preferences Page
router.get('/preferences', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('preferences', { title: 'Preferences - StyleSync' });
});

router.post('/preferences', async (req, res) => {
  const { body_shape, skin_tone, clothing_preference } = req.body;
  if (!req.session.user) {
    return res.redirect('/login');
  }

  try {
    // Save preferences to the database
    const user = await User.findById(req.session.user._id);
    user.preferences = { body_shape, skin_tone, clothing_preference };
    await user.save();

    // Call AI to generate recommendations
    const recommendations = await AIEngine.generateRecommendations(
      body_shape,
      skin_tone,
      clothing_preference
    );
    res.render('recommendations', {
      title: 'Recommendations - StyleSync',
      recommendations,
    });
  } catch (error) {
    console.error('Error saving preferences:', error);
    res.status(500).send('Error saving preferences. Please try again.');
  }
});

// Generate Outfit
router.post('/generate-outfit', async (req, res) => {
  const { selectedItems } = req.body;
  if (!req.session.user) {
    return res.redirect('/login');
  }

  try {
    const outfit = await AIEngine.createOutfit(selectedItems);
    res.render('outfit', { title: 'Your Outfit - StyleSync', outfit });
  } catch (error) {
    console.error('Error generating outfit:', error);
    res.status(500).send('Error generating outfit. Please try again.');
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
