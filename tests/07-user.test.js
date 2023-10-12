const request = require('supertest');
const app = require('../app');

describe('Multiple User Creation', () => {

  const users = [
    {
      id: 10,
      name: "testUser1"
    },
    {
      id: 11,
      name: "testUser2"
    },
    {
      id: 12,
      name: "testUser3"
    }
  ];

  users.forEach((userData) => {
    it(`should create a user named ${userData.name}`, async () => {
      const response = await request(app)
        .post('/user')
        .send(userData);

      expect(response.statusCode).toBe(201);
      expect(response.body.data.name).toBe(userData.name);
    });
  });

  it('should not create a user with invalid data', async () => {
    const userData = {

    };

    const response = await request(app)
      .post('/user')
      .send(userData);

    expect(response.statusCode).toBe(500);
  });
});

