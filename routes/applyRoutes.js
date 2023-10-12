const express = require('express');
const router = express.Router();
const applyController = require('../controllers/applyController');

//채용공고 생성
router.post('/', applyController.applyForJob);

module.exports = router;