const request = require('supertest');
const app = require('../app');

describe('User Creation', () => {

  it('should create a new user', async () => {
    const userData = {
      name: 'Test User'
    };

    const response = await request(app)
      .post('/user')
      .send(userData);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.name).toBe(userData.name);
  });

  it('should not create a user with invalid data', async () => {
    const userData = {

    };

    const response = await request(app)
      .post('/user')
      .send(userData);

    expect(response.statusCode).toBe(400);
  });
});

