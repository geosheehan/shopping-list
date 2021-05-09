const express = require('express');
const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const router = express.Router();

// @desc    Show the landing page
// @route   GET /
router.get('/', ensureGuest, homeController.landing);

// @desc    Show users shopping lists
// @route   GET /dashboard
router.get('/dashboard', /*ensureAuth,*/ homeController.dashboard);

// @desc    Show the login page
// @route   GET /login
router.get('/login', authController.getLogin);

// @desc    Process the login page
// @route   POST /login
router.post('/login', authController.postLogin);

// @desc    Process logout
// @route   GET /logout
router.get('/logout', authController.logout);

// @desc    Show the sign up page
// @route   GET /register
router.get('/register', authController.getRegister);

// @desc    Process the sign up page
// @route   POST /register
router.post('/register', authController.postRegister);

module.exports = router;
