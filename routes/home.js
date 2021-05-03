const express = require('express');
const homeController = require('../controllers/home');
const authController = require('../controllers/auth');

const router = express.Router();

// @desc    Show the landing page
// @route   GET /
router.get('/', homeController.getIndex);

// @desc    Show the login page
// @route   GET /login
router.get('/login', authController.getLogin);

// @desc    Process the login page
// @route   POST /login
router.post('/login', authController.postLogin);

module.exports = router;
