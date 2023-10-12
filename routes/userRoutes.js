const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//유저 생성
router.post('/', userController.createUser);

module.exports = router;