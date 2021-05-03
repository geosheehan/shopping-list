// Includes
const dotenv = require('dotenv');
const express = require('express');
const flash = require('express-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

// Routes
const homeRoutes = require('./routes/home');
const listRoutes = require('./routes/list');

// Constants
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/database');

// Configure environment
dotenv.config({ path: './config/.env' });
const PORT = process.env.PORT || 5000;

// Configure passport
require('./config/passport')(passport);

// Connect to the database
connectDB();

// Create and configure app
const app = express();

app.set('view engine', 'ejs');

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static folder
app.use(express.static('public'));

// Sessions
app.use(
   session({
      secret: 'Leroy Jenkins',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
   })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Route middleware
app.use('/', homeRoutes);
app.use('/lists', listRoutes);

app.listen(
   PORT,
   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
