const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

router.post('/notices', noticeController.createNotice);
router.put('/notices/:id', noticeController.updateNotice);

module.exports = router;
