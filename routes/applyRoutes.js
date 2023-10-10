const express = require('express');
const router = express.Router();
const applyController = require('../controllers/applyController');

router.post('/', applyController.applyForJob);

module.exports = router;