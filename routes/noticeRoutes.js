const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

//채용공고 생성
router.post('/', noticeController.createNotice);
//채용공고 수정
router.put('/:id', noticeController.updateNotice);
//채용공고 삭제
router.delete('/:id', noticeController.deleteNotice);
//채용공고 목록 전체 조회
router.get('/', noticeController.getNotices);
//채용공고 상세 페이지 조회
router.get('/:id', noticeController.getNoticeDetail);

module.exports = router;
