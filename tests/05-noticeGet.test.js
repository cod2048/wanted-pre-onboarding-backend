const request = require('supertest');
const app = require('../app');

const { Apply, Notice, Company, User } = require('../models');
const { sequelize } = require('../models');

beforeAll(async () => {
  //필요한 회사 data
  const company =
  {
    id: 103,
    name: "noticeGetCompanyName1",
    country: "noticeGetCompanyCountry1",
    region: "noticeGetCompanyRegion1"
  };

  await Company.create(company);

  //조회될 공고 data
  const notice =
  {
    id: 103,
    companyId: 103,
    position: "GetPosition",
    reward: 1000000,
    detail: "GetDetail",
    skill: "GetSkill"
  };
  await Notice.create(notice);
});

afterAll(async () => {
  await Notice.destroy({ where: { id: 103 } });
  await Company.destroy({ where: { id: 103 } });
  await sequelize.query(`ALTER SEQUENCE "Notices_id_seq" RESTART WITH 1`);
});


describe('Notice Data Check', () => {
  it('should get all notice data', async () => {
    const response = await request(app)
      .get('/notice');

    expect(response.statusCode).toBe(200);
  });
});
