const request = require('supertest');
const app = require('../app');

describe('Delete Notice Data', () => {
  //정상 삭제
  it('should delete a notice', async () => {
    const response = await request(app)
      .delete('/notice/4');

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('채용공고 삭제 성공');
  });

  //없는 데이터 삭제 시
  it('should not delete a notice', async () => {
    const response = await request(app)
      .delete('/notice/125');

    expect(response.statusCode).toBe(404);
  });
});
