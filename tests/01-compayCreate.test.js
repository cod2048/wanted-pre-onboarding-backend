const request = require('supertest');
const app = require('../app');

const { Apply, Notice, Company, User } = require('../models');
const { sequelize } = require('../models');


beforeAll(async () => {
  await Apply.destroy({ where: {}, truncate: { cascade: true } });
  await Notice.destroy({ where: {}, truncate: { cascade: true } });
  await Company.destroy({ where: {}, truncate: { cascade: true } });
  await User.destroy({ where: {}, truncate: { cascade: true } });
  await sequelize.query(`ALTER SEQUENCE "Notices_id_seq" RESTART WITH 1`);
  await sequelize.query(`ALTER SEQUENCE "Applies_id_seq" RESTART WITH 1`);

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
  const notices = [
    {
      companyId: 1,
      position: "백엔드 주니어 개발자",
      reward: 1000000,
      detail: "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은...",
      skill: "Python"
    },
    {
      companyId: 3,
      position: "Django 백엔드 개발자",
      reward: 1000000,
      detail: "네이버에서 백엔드 개발자를 채용합니다. 자격요건은...",
      skill: "Django"
    },
    {
      companyId: 2,
      position: "프론트엔드 개발자",
      reward: 500000,
      detail: "원티드코리아에서 프론트엔드 개발자를 채용합니다. 자격요건은...",
      skill: "javascript"
    },
    {
      companyId: 4,
      position: "Django 백엔드 개발자",
      reward: 500000,
      detail: "카카오에서 백엔드 개발자를 채용합니다. 자격요건은...",
      skill: "PYTHON"
    },
    {
      companyId: 1,
      position: "프론트엔드 개발자",
      reward: 1000000,
      detail: "원티드랩에서 프론트엔드 개발자를 채용합니다. 자격요건은...",
      skill: "React"
    },
    {
      companyId: 1,
      position: "UI/UX 디자이너",
      reward: 500000,
      detail: "원티드랩에서 ui/ux 디자이너를 채용합니다. 자격요건은...",
      skill: "photoshop",
    },
    {
      companyId: 3,
      position: "서버개발자",
      reward: 1000000,
      detail: "네이버에서 서버개발자를 채용합니다. 자격요건은...",
      skill: "AWS"
    }
  ];
  const users = [
    {
      id: 1,
      name: "junik"
    },
    {
      id: 2,
      name: "messi"
    },
    {
      id: 3,
      name: "john"
    }
  ];

  await Company.bulkCreate(companies);
  await Notice.bulkCreate(notices);
  await User.bulkCreate(users);
});


describe('Multiple Company Creation', () => {
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
