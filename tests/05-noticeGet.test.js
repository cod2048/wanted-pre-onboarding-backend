const request = require('supertest');
const app = require('../app');

describe('Notice Data Check', () => {
  it('should get all notice data', async () => {
    const response = await request(app)
      .get('/notice');

    expect(response.statusCode).toBe(200);
  });
});
