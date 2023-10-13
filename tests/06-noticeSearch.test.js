const request = require('supertest');
const app = require('../app');

const { Apply, Notice, Company, User } = require('../models');
const { sequelize } = require('../models');

beforeAll(async () => {
  //필요한 회사 data
  const companies = [
    {
      id: 104,
      name: "원티드",
      country: "noticeSearchCompanyCountry1",
      region: "noticeSearchCompanyRegion1"
    },
    {
      id: 105,
      name: "noticeSearchCompanyName2",
      country: "noticeSearchCompanyCountry2",
      region: "noticeSearchCompanyRegion2"
    }
  ];

  await Company.bulkCreate(companies);

  //필요한 채용공고 data
  const notices = [
    {
      id: 1001,
      companyId: 104,
      position: "백엔드 주니어 개발자",
      reward: 1000000,
      detail: "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은...",
      skill: "Python"
    },
    {
      id: 1002,
      companyId: 105,
      position: "Django 백엔드 개발자",
      reward: 1000000,
      detail: "네이버에서 백엔드 개발자를 채용합니다. 자격요건은...",
      skill: "Django"
    },
    {
      id: 1003,
      companyId: 104,
      position: "프론트엔드 개발자",
      reward: 500000,
      detail: "원티드코리아에서 프론트엔드 개발자를 채용합니다. 자격요건은...",
      skill: "javascript"
    },
    {
      id: 1004,
      companyId: 105,
      position: "Django 백엔드 개발자",
      reward: 500000,
      detail: "카카오에서 백엔드 개발자를 채용합니다. 자격요건은...",
      skill: "PYTHON"
    },
    {
      id: 1005,
      companyId: 104,
      position: "프론트엔드 개발자",
      reward: 1000000,
      detail: "원티드랩에서 프론트엔드 개발자를 채용합니다. 자격요건은...",
      skill: "React"
    },
    {
      id: 1006,
      companyId: 104,
      position: "UI/UX 디자이너",
      reward: 500000,
      detail: "원티드랩에서 ui/ux 디자이너를 채용합니다. 자격요건은...",
      skill: "photoshop",
    }
  ];
  await Notice.bulkCreate(notices);
});

afterAll(async () => {
  const companyIds = [104, 105];
  const noticeIds = [1001, 1002, 1003, 1004, 1005, 1006];
  await Notice.destroy({ where: { id: noticeIds } });
  await Company.destroy({ where: { id: companyIds } });
  await sequelize.query(`ALTER SEQUENCE "Notices_id_seq" RESTART WITH 1`);
});

describe('Notice Data Search', () => {
  it('should get 원티드 notice data', async () => {
    const response = await request(app)
      .get('/notice?search=' + encodeURIComponent('원티드'));

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(4);
  });

  it('should get Django notice data', async () => {
    const response = await request(app)
      .get('/notice?search=Django');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});

describe('Notice Detail Data Search', () => {
  //채용공고 상세페이지 조회
  it('should get detail notice data', async () => {
    const response = await request(app)
      .get('/notice/1005');

    expect(response.statusCode).toBe(200);
  });

  //없는 채용공고 상세페이지 조회시
  it('should not get detail notice data', async () => {
    const response = await request(app)
      .get('/notice/999');

    expect(response.statusCode).toBe(404);
  });
});
