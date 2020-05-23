const router = require('express').Router();

// User Routes
router.use('/users', require('./user'));

// Authenticaion Routes
router.use('/auth', require('./auth'));

module.exports = router;
