const router = require('express').Router();

// User Routes
router.use('/user', require('./user'));

// Authenticaion Routes
router.use('/auth', require('./auth'));

module.exports = router;
