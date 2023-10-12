const request = require('supertest');
const app = require('../app');
describe('Notice Data Update', () => {
  //업데이트할 내용
  const updateData = {
    reward: 1500000,
    detail: "원티드랩에서 백엔드 주니어 개발자를 '적극' 채용합니다. 자격요건은.."
  }
  //정상적으로 업데이트 됐을 경우
  it('should update a notice data', async () => {
    const response = await request(app)
      .put('/notice/1')
      .send(updateData);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.reward).toBe(updateData.reward);
    expect(response.body.data.detail).toBe(updateData.detail);
  });

  //없는 채용공고를 업데이트했을 경우
  it('should not update a notice data', async () => {
    const response = await request(app)
      .put('/notice/124')
      .send(updateData);
    expect(response.statusCode).toBe(404);
  });
});