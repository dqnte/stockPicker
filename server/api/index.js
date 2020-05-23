const router = require('express').Router();

// User Routes
router.use('/users', require('./users'));

module.exports = router;
