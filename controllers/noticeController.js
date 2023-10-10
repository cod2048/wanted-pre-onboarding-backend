const { Notice } = require('../models');

const noticeController = {};

noticeController.createNotice = async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json({ success: true, data: notice });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = noticeController;
