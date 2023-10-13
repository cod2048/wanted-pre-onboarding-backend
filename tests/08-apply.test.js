const request = require('supertest');
const app = require('../app');

const { Apply, Notice, Company, User } = require('../models');
const { sequelize } = require('../models');

beforeAll(async () => {
  await Apply.destroy({ where: {}, truncate: { cascade: true } });
  await sequelize.query(`ALTER SEQUENCE "Applies_id_seq" RESTART WITH 1`);
  //필요한 회사 data
  const company =
  {
    id: 200,
    name: "ApplyCompanyName1",
    country: "ApplyCompanyCountry1",
    region: "ApplyCompanyRegion1"
  };

  await Company.create(company);

  //필요한 공고 data
  const notice =
  {
    id: 200,
    companyId: 200,
    position: "ApplyPosition",
    reward: 1000000,
    detail: "ApplyDetail",
    skill: "ApplySkill"
  };
  await Notice.create(notice);

  //필요한 user data
  const user =
  {
    id: 200,
    name: "applyTestUser"
  };
  await User.create(user);
});

afterAll(async () => {
  await Apply.destroy({ where: { id: 1 } });
  await Notice.destroy({ where: { id: 200 } });
  await User.destroy({ where: { id: 200 } });
  await Company.destroy({ where: { id: 200 } });
  await sequelize.query(`ALTER SEQUENCE "Notices_id_seq" RESTART WITH 1`);
  await sequelize.query(`ALTER SEQUENCE "Applies_id_seq" RESTART WITH 1`);
});

describe('Apply To Notice', () => {
  //정상 지원시
  it('should apply to notice', async () => {
    const response = await request(app)
      .post('/apply')
      .send({
        user_id: 200,
        notice_id: 200
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.noticeId).toBe(200);
    expect(response.body.data.userId).toBe(200);
  });

  //중복지원시
  it('should not allow duplicate apply', async () => {
    const response = await request(app)
      .post('/apply')
      .send({
        user_id: 200,
        notice_id: 200
      });

    expect(response.statusCode).toBe(403);
    expect(response.body.error).toBe('이미 지원한 채용공고');
  })

  //없는 채용공고에 지원시
  it('should not allow not exist apply', async () => {
    const response = await request(app)
      .post('/apply')
      .send({
        user_id: 200,
        notice_id: 999
      });

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('insert or update on table \"Applies\" violates foreign key constraint \"Applies_noticeId_fkey\"');
  });

  //없는 user일 경우
  it('should not allow not exist user', async () => {
    const response = await request(app)
      .post('/apply')
      .send({
        user_id: 999,
        notice_id: 200
      });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('insert or update on table \"Applies\" violates foreign key constraint \"Applies_userId_fkey\"');
  });
});
