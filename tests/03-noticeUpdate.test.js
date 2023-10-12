const request = require('supertest');
const app = require('../app');
const { Apply, Notice, Company, User } = require('../models');
const { sequelize } = require('../models');

describe('Notice Data Update', () => {
  const updateData = {
    reward: 1500000,
    detail: "원티드랩에서 백엔드 주니어 개발자를 '적극' 채용합니다. 자격요건은.."
  }

  it('should update a notice data', async () => {
    const response = await request(app)
      .put('/notice/1')
      .send(updateData);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.reward).toBe(updateData.reward);
    expect(response.body.data.detail).toBe(updateData.detail);
  });
});