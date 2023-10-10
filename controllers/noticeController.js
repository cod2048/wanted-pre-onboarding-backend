const { Notice } = require('../models');

const noticeController = {};

//채용공고 생성
noticeController.createNotice = async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json({ success: true, data: notice });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//채용공고 수정
noticeController.updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = req.body;

    if (updateData.companyId) {
      delete updateData.companyId;
    }

    const notice = await Notice.findByPk(id);
    if (!notice) {
      return res.status(404).json({ success: false, error: "Notice not found" });
    }

    await notice.update(updateData);
    res.json({ success: true, data: notice });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//채용공고 삭제
noticeController.deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findByPk(id);

    if (!notice) {
      return res.status(404).json({ success: false, error: "Notice not found" });
    }

    await notice.destroy();
    res.json({ success: true, message: "채용공고 삭제 성공" });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = noticeController;
