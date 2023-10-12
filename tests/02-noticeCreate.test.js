const request = require('supertest');
const app = require('../app');

describe('Multiple Notice Creation', () => {
  //정상 채용공고 데이터
  const notices = [
    {
      companyId: 1,
      position: "testPosition1",
      reward: 1000000,
      detail: "testDetail1",
      skill: "testSkill1"
    },
    {
      companyId: 1,
      position: "testPosition2",
      reward: 1000000,
      detail: "testDetail2",
      skill: "testSkill2"
    },
    {
      companyId: 2,
      position: "testPosition3",
      reward: 500000,
      detail: "testDetail3",
      skill: "testSkill3"
    },
    {
      companyId: 2,
      position: "testPosition4",
      reward: 500000,
      detail: "testDetail4",
      skill: "testSkill4"
    },
    {
      companyId: 3,
      position: "testPosition5",
      reward: 1000000,
      detail: "testDetail5",
      skill: "testSkill5"
    },
    {
      companyId: 3,
      position: "testPosition6",
      reward: 500000,
      detail: "testDetail6",
      skill: "testSkill6",
    },
    {
      companyId: 4,
      position: "testPosition7",
      reward: 1000000,
      detail: "testDetail7",
      skill: "testDetail8"
    }
  ];
  //잘못된 채용공고 데이터
  const wrongNotices = [
    //없는 회사 id
    {
      companyId: 20,
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