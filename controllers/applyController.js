const { Apply } = require('../models');

const applyController = {};

//채용공고 지원 함수
applyController.applyForJob = async (req, res) => {
  try {
    const { user_id, notice_id } = req.body;

    // 지원 여부 확인
    const existingApply = await Apply.findOne({
      where: { userId: user_id, noticeId: notice_id }
    });

    //이미 지원했을 경우
    if (existingApply) {
      return res.status(400).json({ success: false, error: '이미 지원한 채용공고' });
    }

    //채용공고 정상 생성
    const newApply = await Apply.create({
      noticeId: notice_id,
      userId: user_id
    });

    //리턴값에 생성날짜, 수정날짜 제외
    const returnValue = newApply.toJSON();
    delete returnValue.updatedAt;
    delete returnValue.createdAt;

    res.json({ success: true, data: returnValue });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = applyController;
