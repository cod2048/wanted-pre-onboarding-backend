const request = require('supertest');
const app = require('../app');

describe('Company Creation', () => {
  it('should create a new company', async () => {
    const companyData = {
      name: "Test Company",
      country: "Korea",
      region: "Seoul"
    };

    const response = await request(app)
      .post('/company')
      .send(companyData);

    expect(response.statusCode).toBe(201);
    expect(response.body.data.name).toBe(companyData.name);
    expect(response.body.data.country).toBe(companyData.country);
    expect(response.body.data.region).toBe(companyData.region);
  });
});
