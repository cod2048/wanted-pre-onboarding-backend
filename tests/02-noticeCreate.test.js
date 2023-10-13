const request = require('supertest');
const app = require('../app');
const { Apply, Notice, Company, User } = require('../models');
const { sequelize } = require('../models');


beforeAll(async () => {
  //필요한 회사 data
  const companies = [
    {
      id: 1,
      name: "noticeCreateCompanyName1",
      country: "noticeCreateCompanyCountry1",
      region: "noticeCreateCompanyRegion1"
    },
    {
      id: 2,
      name: "noticeCreateCompanyName2",
      country: "noticeCreateCompanyCountry2",
      region: "noticeCreateCompanyRegion2"
    },
    {
      id: 3,
      name: "noticeCreateCompanyName3",
      country: "noticeCreateCompanyCountry3",
      region: "noticeCreateCompanyRegion3"
    },
    {
      id: 4,
      name: "noticeCreateCompanyName4",
      country: "noticeCreateCompanyCountry4",
      region: "noticeCreateCompanyRegion4"
    }
  ];
  await Company.bulkCreate(companies);
});

afterAll(async () => {
  const companyIds = [1, 2, 3, 4];
  const notices = [1111, 2222, 3333, 4444, 5555, 6666, 7777];
  await Notice.destroy({ where: { id: notices } });
  await Company.destroy({ where: { id: companyIds } });
  await sequelize.query(`ALTER SEQUENCE "Notices_id_seq" RESTART WITH 1`);
});

describe('Multiple Notice Creation', () => {
  //정상 채용공고 데이터
  const notices = [
    {
      id: 1111,
      companyId: 1,
      position: "testPosition1",
      reward: 1000000,
      detail: "testDetail1",
      skill: "testSkill1"
    },
    {
      id: 2222,
      companyId: 1,
      position: "testPosition2",
      reward: 1000000,
      detail: "testDetail2",
      skill: "testSkill2"
    },
    {
      id: 3333,
      companyId: 2,
      position: "testPosition3",
      reward: 500000,
      detail: "testDetail3",
      skill: "testSkill3"
    },
    {
      id: 4444,
      companyId: 2,
      position: "testPosition4",
      reward: 500000,
      detail: "testDetail4",
      skill: "testSkill4"
    },
    {
      id: 5555,
      companyId: 3,
      position: "testPosition5",
      reward: 1000000,
      detail: "testDetail5",
      skill: "testSkill5"
    },
    {
      id: 6666,
      companyId: 3,
      position: "testPosition6",
      reward: 500000,
      detail: "testDetail6",
      skill: "testSkill6",
    },
    {
      id: 7777,
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
      companyId: 999,
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

  //채용공고 정상 생성
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

  //채용공고 생성 실패
  wrongNotices.forEach((noticeData) => {
    it(`should not create a notice data`, async () => {
      const response = await request(app)
        .post('/notice')
        .send(noticeData);
      expect(response.statusCode).toBe(500);
    });
  });
});