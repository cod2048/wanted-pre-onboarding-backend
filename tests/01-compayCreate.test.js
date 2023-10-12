const request = require('supertest');
const app = require('../app');

//여러개 회사 생성
describe('Multiple Company Creation', () => {
  //옳은 회사정보
  const companies = [
    {
      id: 10,
      name: "testCompany1",
      country: "testCountry1",
      region: "testRegion1"
    },
    {
      id: 11,
      name: "testCompany2",
      country: "testCountry2",
      region: "testCountry2"
    },
    {
      id: 12,
      name: "testCompany3",
      country: "testCountry3",
      region: "testCountry3"
    }
  ];
  //잘못된 회사정보
  const wrongCompanies = [
    {
      //회사 id/이름 누락
      country: "Korea",
      region: "Seoul"
    },
    {
      //회사 id/국가 누락
      name: "LG",
      region: "California"
    },
    {
      //회사 id/지역 누락
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
