const express = require('express');
const router = express.Router();
const auth = require('./../auth');

router.get('/auth', auth);

module.exports = router;