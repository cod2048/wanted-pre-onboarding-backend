const { Notice, Company } = require('../models');
const Sequelize = require('sequelize');

const noticeController = {};

//채용공고 생성
noticeController.createNotice = async (req, res) => {
  try {
    const notice = await Notice.create(req.body);

    //리턴값에 id/생성날짜/수정날짜 제거
    const returnValue = notice.toJSON();
    delete returnValue.id;
    delete returnValue.createdAt;
    delete returnValue.updatedAt;

    res.status(201).json({ success: true, data: returnValue });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//채용공고 수정
noticeController.updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = req.body;

    //회사id를 수정하려고 할 경우 해당 값은 삭제
    if (updateData.companyId) {
      delete updateData.companyId;
    }

    //수정하려는 채용공고가 없을 경우
    const notice = await Notice.findByPk(id);
    if (!notice) {
      return res.status(404).json({ success: false, error: "Notice not found" });
    }

    await notice.update(updateData);

    //리턴값에서 id/회사id/생성날짜/수정날짜 제거
    const returnValue = notice.toJSON();
    delete returnValue.id;
    delete returnValue.companyId;
    delete returnValue.createdAt;
    delete returnValue.updatedAt;

    res.status(200).json({ success: true, data: returnValue });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//채용공고 삭제
noticeController.deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findByPk(id);

    //삭제하려는 채용공고가 없을 경우
    if (!notice) {
      return res.status(404).json({ success: false, error: "Notice not found" });
    }

    await notice.destroy();
    res.status(204).send();

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
      //회사이름, 지역, 포지션, 스킬 4가지에서만 검색하도록 설정
      whereCondition = {
        [Sequelize.Op.or]: [
          { 'name': { [Sequelize.Op.like]: `%${searchValue}%` } },
          { 'region': { [Sequelize.Op.like]: `%${searchValue}%` } },
          { '$Notice.position$': { [Sequelize.Op.like]: `%${searchValue}%` } },
          { '$Notice.skill$': { [Sequelize.Op.like]: `%${searchValue}%` } }
        ]
      };
    }

    //반환값에 포함돼야하는 값 설정
    const notices = await Notice.findAll({
      attributes: ['id', 'position', 'reward', 'skill'],
      include: [{
        model: Company,
        as: 'company',
        attributes: ['name', 'country', 'region'],
        where: whereCondition
      }]
    });

    //반환형식 요구사항에 맞게 수정
    const formattedNotices = notices.map(notice => ({
      채용공고_id: notice.id,
      회사명: notice.company.name,
      국가: notice.company.country,
      지역: notice.company.region,
      채용포지션: notice.position,
      채용보상금: notice.reward,
      사용기술: notice.skill
    }));

    res.status(200).json(formattedNotices);

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

    //회사가 올린 다른 채용공고 검색
    const otherNotices = await Notice.findAll({
      where: { companyId: notice.companyId, id: { [Sequelize.Op.ne]: noticeId } },
      attributes: ['id']
    });

    //반환값 요구사항에 맞게 수정
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

    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



module.exports = noticeController;
