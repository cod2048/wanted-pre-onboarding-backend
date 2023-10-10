const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

router.post('/notices', noticeController.createNotice);
router.put('/notices/:id', noticeController.updateNotice);
router.delete('/notices/:id', noticeController.deleteNotice);
router.get('/notices', noticeController.getNotices);
router.get('/notices/:id', noticeController.getNoticeDetail);

module.exports = router;
