const { Company } = require('../models');

const companyController = {};

//회사 생성 함수
companyController.createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = companyController;