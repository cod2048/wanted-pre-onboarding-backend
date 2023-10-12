const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

//회사생성
router.post('/', companyController.createCompany);

module.exports = router;
