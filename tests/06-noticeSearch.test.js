const request = require('supertest');
const app = require('../app');

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
    expect(response.body).toHaveLength(1);
  });
});
