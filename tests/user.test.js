const request = require('supertest');
const app = require('../app');

describe('Multiple User Creation', () => {

  const users = [
    {
      name: "User 1"
    },
    {
      name: "User 2"
    },
    {
      name: "User 3"
    }
  ];

  users.forEach((userData) => {
    it(`should create a user named ${userData.name}`, async () => {
      const response = await request(app)
        .post('/user')
        .send(userData);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.name).toBe(userData.name);
    });
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

