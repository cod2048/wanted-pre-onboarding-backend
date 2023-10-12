const request = require('supertest');
const app = require('../app');
const notice = require('../models/notice');

describe('Multiple Notice Creation', () => {
  //정상 채용공고 데이터
  const notices = [
    {
      companyId: 1,
      position: "백엔드 주니어 개발자",
      reward: 1000000,
      detail: "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은...",
      skill: "Python"
    },
    {
      companyId: 3,
      position: "Django 백엔드 개발자",
      reward: 1000000,
      detail: "네이버에서 백엔드 개발자를 채용합니다. 자격요건은...",
      skill: "Django"
    },
    {
      companyId: 2,
      position: "프론트엔드 개발자",
      reward: 500000,
      detail: "원티드코리아에서 프론트엔드 개발자를 채용합니다. 자격요건은...",
      skill: "javascript"
    },
    {
      companyId: 4,
      position: "Django 백엔드 개발자",
      reward: 500000,
      detail: "카카오에서 백엔드 개발자를 채용합니다. 자격요건은...",
      skill: "PYTHON"
    },
    {
      companyId: 1,
      position: "프론트엔드 개발자",
      reward: 1000000,
      detail: "원티드랩에서 프론트엔드 개발자를 채용합니다. 자격요건은...",
      skill: "React"
    },
    {
      companyId: 1,
      position: "UI/UX 디자이너",
      reward: 500000,
      detail: "원티드랩에서 ui/ux 디자이너를 채용합니다. 자격요건은...",
      skill: "photoshop",
    },
    {
      companyId: 3,
      position: "서버개발자",
      reward: 1000000,
      detail: "네이버에서 서버개발자를 채용합니다. 자격요건은...",
      skill: "AWS"
    }
  ];
  //잘못된 채용공고 데이터
  const wrongNotices = [
    //없는 회사 id
    {
      companyId: 6,
      position: "Backend Developer",
      reward: 1300000,
      detail: "Looking for a backend developer",
      skill: "PYTHON"
    },
    //회사 id 누락
    {
      position: "Backend Developer",
      reward: 1300000,
      detail: "Looking for a backend developer",
      skill: "PYTHON"
    },
    //포지션 누락
    {
      companyId: 3,
      reward: 1300000,
      detail: "Looking for a backend developer",
      skill: "PYTHON"
    },
    //채용보상금 누락
    {
      companyId: 2,
      position: "Backend Developer",
      detail: "Looking for a backend developer",
      skill: "PYTHON"
    },
    //채용상세내용 누락
    {
      companyId: 3,
      position: "Backend Developer",
      reward: 1300000,
      skill: "PYTHON"
    },
    //사용기술 누락
    {
      companyId: 3,
      position: "Backend Developer",
      reward: 1300000,
      detail: "Looking for a backend developer",
    }
  ];
  notices.forEach((noticeData) => {
    it(`should create a notice data : ${noticeData.position}`, async () => {
      const response = await request(app)
        .post('/notice')
        .send(noticeData);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.companyId).toBe(noticeData.companyId);
      expect(response.body.data.position).toBe(noticeData.position);
      expect(response.body.data.reward).toBe(noticeData.reward);
      expect(response.body.data.detail).toBe(noticeData.detail);
    });
  });

  wrongNotices.forEach((noticeData) => {
    it(`should not create a notice data`, async () => {
      const response = await request(app)
        .post('/notice')
        .send(noticeData);
      expect(response.statusCode).toBe(500);
    });
  });
});