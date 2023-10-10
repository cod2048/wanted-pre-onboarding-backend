const { Notice, Company } = require('../models');
const Sequelize = require('sequelize');

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

//채용공고 목록 조회
noticeController.getNotices = async (req, res) => {
  try {
    const searchValue = req.query.search;

    let whereCondition = {};

    if (searchValue) {
      whereCondition = {
        [Sequelize.Op.or]: [
          { 'name': { [Sequelize.Op.like]: `%${searchValue}%` } },
          { 'region': { [Sequelize.Op.like]: `%${searchValue}%` } },
          { '$Notice.position$': { [Sequelize.Op.like]: `%${searchValue}%` } },
          { '$Notice.skill$': { [Sequelize.Op.like]: `%${searchValue}%` } }
        ]
      };
    }

    const notices = await Notice.findAll({
      attributes: ['id', 'position', 'reward', 'skill'],
      include: [{
        model: Company,
        as: 'company',
        attributes: ['name', 'country', 'region'],
        where: whereCondition
      }]
    });

    const formattedNotices = notices.map(notice => ({
      채용공고_id: notice.id,
      회사명: notice.company.name,
      국가: notice.company.country,
      지역: notice.company.region,
      채용포지션: notice.position,
      채용보상금: notice.reward,
      사용기술: notice.skill
    }));

    res.json({ success: true, data: formattedNotices });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//채용공고 상세 페이지 조회
noticeController.getNoticeDetail = async (req, res) => {
  try {
    const noticeId = req.params.id;

    const notice = await Notice.findOne({
      where: { id: noticeId },
      include: [{
        model: Company,
        as: 'company',
        attributes: ['name', 'country', 'region']
      }]
    });

    if (!notice) {
      return res.status(404).json({ success: false, error: 'Notice not found' });
    }

    const otherNotices = await Notice.findAll({
      where: { companyId: notice.companyId, id: { [Sequelize.Op.ne]: noticeId } },
      attributes: ['id']
    });

    const response = {
      채용공고_id: notice.id,
      회사명: notice.company.name,
      국가: notice.company.country,
      지역: notice.company.region,
      채용포지션: notice.position,
      채용보상금: notice.reward,
      사용기술: notice.skill,
      채용내용: notice.detail,
      회사가올린다른채용공고: otherNotices.map(n => n.id)
    };

    res.json({ success: true, data: response });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



module.exports = noticeController;
