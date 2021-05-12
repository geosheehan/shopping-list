const mongoose = require('mongoose');
const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');

module.exports = {
   getLogin: (req, res) => {
      if (req.user) return res.redirect('/dashboard');
      res.render('login', { title: 'Login', layout: './layouts/login' });
   },
   postLogin: async (req, res, next) => {
      let valErrors = 0;
      if (!validator.isEmail(req.body.email)) {
         req.flash('email', { error: 'Please enter a valid email address.' });
         valErrors++;
      }
      if (validator.isEmpty(req.body.password)) {
         req.flash('password', { error: 'Password cannot be blank.' });
         valErrors++;
      }

      if (0 < valErrors) {
         return res.redirect('/login');
      }
      req.body.email = validator.normalizeEmail(req.body.email, {
         gmail_remove_dots: false,
      });

      passport.authenticate('local', (err, user, info) => {
         if (err) return next(err);
         if (!user) {
            req.flash('errors', info);
            return res.redirect('/login');
         }

         req.logIn(user, (err) => {
            if (err) return next(err);
            req.flash('success', { msg: 'Success! You are logged in.' });
            res.redirect(req.session.returnTo || '/dashboard');
         });
      })(req, res, next);
   },
   logout: async (req, res) => {
      req.logout();
      req.session.destroy((err) => {
         if (err)
            console.log(
               'Error: Failed to destroy the session during logout.',
               err
            );
         req.user = null;
         res.redirect('/');
      });
   },
   getRegister: (req, res) => {
      if (req.user) return res.redirect('/dashboard');
      res.render('register', { title: 'Register', layout: './layouts/login' });
   },
   postRegister: async (req, res, next) => {
      const valErrors = [];
      if (!validator.isEmail(req.body.email))
         valErrors.push({ msg: 'Please enter a valid email address.' });
      if (!validator.isStrongPassword(req.body.password))
         valErrors.push({
            msg:
               'Password must be at least 8 characters long, contain a lowercase letter, contain an uppercase letter, and contain a symbol.',
         });
      if (req.body.password !== req.body.confirmPassword)
         valErrors.push({ msg: 'Passwords do not match.' });

      if (valErrors.length) {
         req.flash('errors', valErrors);
         return res.redirect('../register');
      }

      const user = new User({
         userName: req.body.userName,
         email: req.body.email,
         // Don't worry, this is being hashed through the model
         password: req.body.password,
         favorites: mongoose.Types.ObjectId(),
      });

      User.findOne(
         { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
         (err, existingUser) => {
            if (err) return next(err);
            if (existingUser) {
               req.flash('errors', {
                  msg:
                     'Account with that email address or username already exists.',
               });
               return res.redirect('../register');
            }

            user.save((err) => {
               if (err) return next(err);
               req.logIn(user, (err) => {
                  if (err) return next(err);
                  res.redirect('/dashboard');
               });
            });
         }
      );
   },
};
