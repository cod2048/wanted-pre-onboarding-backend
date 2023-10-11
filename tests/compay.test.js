const request = require('supertest');
const app = require('../app');

describe('Multiple Company Creation', () => {
  const companies = [
    {
      name: "Company 1",
      country: "Korea",
      region: "Seoul"
    },
    {
      name: "Company 2",
      country: "USA",
      region: "California"
    },
    {
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
      region: "Tokyo"
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
