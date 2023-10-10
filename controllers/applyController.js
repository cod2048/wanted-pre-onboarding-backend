const { Apply } = require('../models');

const applyController = {};

applyController.applyForJob = async (req, res) => {
  try {
    const { user_id, notice_id } = req.body;

    // 지원 여부 확인
    const existingApply = await Apply.findOne({
      where: { userId: user_id, noticeId: notice_id }
    });

    if (existingApply) {
      return res.status(400).json({ success: false, error: '이미 지원한 채용공고' });
    }

    const newApply = await Apply.create({
      userId: user_id,
      noticeId: notice_id
    });

    res.json({ success: true, data: newApply });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = applyController;
