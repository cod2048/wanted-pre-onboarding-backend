const request = require('supertest');
const app = require('../app');

describe('Apply To Notice', () => {
  it('should apply to notice', async () => {
    const response = await request(app)
      .post('/apply')
      .send({
        user_id: 1,
        notice_id: 1
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.noticeId).toBe(1);
    expect(response.body.data.userId).toBe(1);
  });

  it('should not allow duplicate apply', async () => {
    const response = await request(app)
      .post('/apply')
      .send({
        user_id: 1,
        notice_id: 1
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('이미 지원한 채용공고');
  })

  it('should not allow not exist apply', async () => {
    const response = await request(app)
      .post('/apply')
      .send({
        user_id: 1,
        notice_id: 120
      });

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe('insert or update on table \"Applies\" violates foreign key constraint \"Applies_noticeId_fkey\"');
  });

  it('should not allow not exist user', async () => {
    const response = await request(app)
      .post('/apply')
      .send({
        user_id: 20,
        notice_id: 4
      });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('insert or update on table \"Applies\" violates foreign key constraint \"Applies_userId_fkey\"');
  });
});
