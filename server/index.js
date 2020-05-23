// Basic Routes
const path = require('path');
const express = require('express');
const app = express();

// Secrets for development
if (process.env.NODE_ENV !== 'production') require('../secrets');

// Default port is 3000
const PORT = process.env.PORT || 3000;

// Db Instance
const { db } = require('./db');

// Passport Registration
const passport = require('passport');
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Session Middleware
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db });
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'my best friend is Cody',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Logging Middleware
const morgan = require('morgan');
app.use(morgan('dev'));

// JSON request body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static Middleware
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api', require('./api'));

// Route catchall
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// StartUp functions

// Function to set server to listen on PORT
const startListen = () =>
  app.listen(PORT, () => {
    console.log('Listening on port', PORT);
  });

// Start App
db.sync({ force: true }).then(startListen);
