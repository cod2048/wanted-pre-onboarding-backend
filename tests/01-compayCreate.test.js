const request = require('supertest');
const app = require('../app');

const { Apply, Notice, Company, User } = require('../models');
const { sequelize } = require('../models');


beforeAll(async () => {
  await Apply.destroy({ where: {}, truncate: { cascade: true } });
  await Notice.destroy({ where: {}, truncate: { cascade: true } });
  await Company.destroy({ where: {}, truncate: { cascade: true } });
  await User.destroy({ where: {}, truncate: { cascade: true } });
  await sequelize.query(`ALTER SEQUENCE "Users_id_seq" RESTART WITH 1`);
  await sequelize.query(`ALTER SEQUENCE "Notices_id_seq" RESTART WITH 1`);
  await sequelize.query(`ALTER SEQUENCE "Applies_id_seq" RESTART WITH 1`);
});


describe('Multiple Company Creation', () => {
  const companies = [
    {
      id: 1,
      name: "원티드랩",
      country: "한국",
      region: "서울"
    },
    {
      id: 2,
      name: "원티드코리아",
      country: "한국",
      region: "부산"
    },
    {
      id: 3,
      name: "네이버",
      country: "한국",
      region: "판교"
    },
    {
      id: 4,
      name: "카카오",
      country: "한국",
      region: "판교"
    }
  ];
  const wrongCompanies = [
    {
      country: "Korea",
      region: "Seoul"
    },
    {
      name: "LG",
      region: "California"
    },
    {
      name: "Sony",
      country: "Japan"
    }
  ];

  companies.forEach((companyData) => {
    it(`should create a company named ${companyData.name}`, async () => {
      const response = await request(app)
        .post('/company')
        .send(companyData);

      expect(response.statusCode).toBe(201);
      expect(response.body.data.name).toBe(companyData.name);
      expect(response.body.data.country).toBe(companyData.country);
      expect(response.body.data.region).toBe(companyData.region);
    });
  });

  wrongCompanies.forEach((companyData) => {
    it(`should not create a company with invalid data`, async () => {
      const response = await request(app)
        .post('/company')
        .send(companyData);

      expect(response.statusCode).toBe(500);
    });
  });
});
