const request = require('supertest');
const app = require('../app');

const { Apply, Notice, Company, User } = require('../models');
const { sequelize } = require('../models');

beforeAll(async () => {
  //필요한 회사 data
  const company =
  {
    id: 102,
    name: "noticeDeleteCompanyName1",
    country: "noticeDeleteCompanyCountry1",
    region: "noticeDeleteCompanyRegion1"
  };

  await Company.create(company);

  //지워질 공고 data
  const notice =
  {
    id: 102,
    companyId: 102,
    position: "deletePosition",
    reward: 1000000,
    detail: "deleteDetail",
    skill: "deleteSkill"
  };
  await Notice.create(notice);
});

afterAll(async () => {
  await Company.destroy({ where: { id: 102 } });
  await sequelize.query(`ALTER SEQUENCE "Notices_id_seq" RESTART WITH 1`);
});

describe('Delete Notice Data', () => {
  //정상 삭제
  it('should delete a notice', async () => {
    const response = await request(app)
      .delete('/notice/102');

    expect(response.statusCode).toBe(204);
  });

  //없는 데이터 삭제 시
  it('should not delete a notice', async () => {
    const response = await request(app)
      .delete('/notice/999');

    expect(response.statusCode).toBe(404);
  });
});
