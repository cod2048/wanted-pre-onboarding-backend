const request = require('supertest');
const app = require('../app');

describe('Multiple User Creation', () => {
  //정상 유저 정보
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
  //잘못된 유저 정보
  const wrongUsers = [
    {
      //id누락
      name: "noIdUser"
    },
    {
      //name누락
      id: 1234
    }
  ]
  //정상 생성
  users.forEach((userData) => {
    it(`should create a user named ${userData.name}`, async () => {
      const response = await request(app)
        .post('/user')
        .send(userData);

      expect(response.statusCode).toBe(201);
      expect(response.body.data.name).toBe(userData.name);
    });
  });

  //잘못된 유저 생성 시
  wrongUsers((userData) => {
    it(`should not create a user`, async () => {
      const response = await request(app)
        .post('/user')
        .send(userData);

      expect(response.statusCode).toBe(500);
    })
  })

});

