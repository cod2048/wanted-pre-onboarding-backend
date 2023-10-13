const request = require('supertest');
const app = require('../app');

const { Apply, Notice, Company, User } = require('../models');
const { sequelize } = require('../models');

beforeAll(async () => {
  //필요한 회사 data
  const company =
  {
    id: 101,
    name: "noticeUpdateCompanyName1",
    country: "noticeUpdateCompanyCountry1",
    region: "noticeUpdateCompanyRegion1"
  };

  await Company.create(company);

  //업데이트할 공고 data
  const notice =
  {
    id: 101,
    companyId: 101,
    position: "beforeUpdatePosition",
    reward: 1000000,
    detail: "beforeUpdateDetail",
    skill: "updateDetail"
  };
  await Notice.create(notice);
});

afterAll(async () => {
  await Notice.destroy({ where: { id: 101 } });
  await Company.destroy({ where: { id: 101 } });
  await sequelize.query(`ALTER SEQUENCE "Notices_id_seq" RESTART WITH 1`);
});

describe('Notice Data Update', () => {
  //업데이트할 내용
  const updateData = {
    position: "afterUpdatePosition",
    detail: "afterUpdateDetail"
  };
  //정상적으로 업데이트 됐을 경우
  it('should update a notice data', async () => {
    const response = await request(app)
      .put('/notice/101')
      .send(updateData);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.position).toBe(updateData.position);
    expect(response.body.data.detail).toBe(updateData.detail);
  });

  //없는 채용공고를 업데이트했을 경우
  it('should not update a notice data', async () => {
    const response = await request(app)
      .put('/notice/999')
      .send(updateData);
    expect(response.statusCode).toBe(404);
  });
});