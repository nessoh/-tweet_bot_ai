const express = require('express');
const router = express.Router();

// Import and use routes
router.use('/autobots', require('./autobot'));

module.exports = router;
