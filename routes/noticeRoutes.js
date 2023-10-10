const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

router.post('/', noticeController.createNotice);
router.put('/:id', noticeController.updateNotice);
router.delete('/:id', noticeController.deleteNotice);
router.get('/', noticeController.getNotices);
router.get('/:id', noticeController.getNoticeDetail);

module.exports = router;
