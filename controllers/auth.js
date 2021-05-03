const passport = require('passport');
const validator = require('validator');

module.exports = {
   getLogin: (req, res) => {
      if (req.user) return res.redirect('/list');

      res.render('login.ejs');
   },
   postLogin: async (req, res, next) => {
      const valErrors = [];
      if (!validator.isEmail(req.body.email))
         valErrors.push({ msg: 'Please enter a valid email address.' });
      if (validator.isEmpty(req.body.password))
         valErrors.push({ msg: 'Password cannot be blank.' });

      if (valErrors.length) {
         req.flash('errors', valErrors);
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
            res.redirect(req.session.returnTo || '/list');
         });
      })(req, res, next);
   },
   logout: async (req, res) => {
      res.render('errors/construct.ejs');
   },
   getSignup: async (req, res) => {
      res.render('errors/construct.ejs');
   },
   postSignup: async (req, res) => {
      res.render('errors/construct.ejs');
   },
};
