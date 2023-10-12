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
      name: "Company 1",
      country: "Korea",
      region: "Seoul"
    },
    {
      id: 2,
      name: "Company 2",
      country: "USA",
      region: "California"
    },
    {
      id: 3,
      name: "Company 3",
      country: "Japan",
      region: "Tokyo"
    }
  ];
  const wrongCompanies = [
    {
      country: "Korea",
      region: "Seoul"
    },
    {
      name: "Company 4",
      region: "California"
    },
    {
      name: "Company 5",
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
    it(`should not create a user with invalid data`, async () => {
      const response = await request(app)
        .post('/company')
        .send(companyData);

      expect(response.statusCode).toBe(500);
    })
  })
});
