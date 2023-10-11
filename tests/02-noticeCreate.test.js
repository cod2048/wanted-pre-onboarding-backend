const request = require('supertest');
const app = require('../app');

describe('Multiple Notice Creation'), () => {
  //정상 채용공고 데이터
  const notices = [
    {
      companyId: 1,
      position: "Backend Developer",
      reward: 1000000,
      detail: "Looking for a backend developer...",
      skill: "Node.js"
    },
    {
      companyId: 1,
      position: "Fronted Developer",
      reward: 150000,
      detail: "Looking for a frontend developer...",
      skill: "React"
    },
    {
      companyId: 2,
      position: "Fronted Engineer",
      reward: 1000000,
      detail: "Looking for a frontend engineer",
      skill: "HTML"
    },
    {
      companyId: 2,
      position: "Backend Engineer",
      reward: 500000,
      detail: "Looking for a backend engineer",
      skill: "PYTHON"
    },
    {
      companyId: 3,
      position: "Designer",
      reward: 1000000,
      detail: "Looking for a designer",
      skill: "Photoshop"
    },
    {
      companyId: 3,
      position: "Product Manager",
      reward: 1200000,
      detail: "Looking for a product manager",
      skill: "Listening",
    },
    {
      companyId: 3,
      position: "Backend Developer",
      reward: 1300000,
      detail: "Looking for a backend developer",
      skill: "PYTHON"
    }
  ];
  //잘못된 채용공고 데이터
  const wrongNotices = [
    //없는 회사 id
    {
      companyId: 4,
      position: "Backend Developer",
      reward: 1300000,
      detail: "Looking for a backend developer",
      skill: "PYTHON"
    },
    //회사 id 누락
    {
      position: "Backend Developer",
      reward: 1300000,
      detail: "Looking for a backend developer",
      skill: "PYTHON"
    },
    //포지션 누락
    {
      companyId: 3,
      reward: 1300000,
      detail: "Looking for a backend developer",
      skill: "PYTHON"
    },
    //채용보상금 누락
    {
      companyId: 2,
      position: "Backend Developer",
      detail: "Looking for a backend developer",
      skill: "PYTHON"
    },
    //채용상세내용 누락
    {
      companyId: 3,
      position: "Backend Developer",
      reward: 1300000,
      skill: "PYTHON"
    },
    //사용기술 누락
    {
      companyId: 3,
      position: "Backend Developer",
      reward: 1300000,
      detail: "Looking for a backend developer",
    }
  ];
  notices.forEach((noticeData) => {
    it(`should create a notice position : ${noticeData.position}`, async () => {
      const response = await request(app)
        .post('/notice')
        .send(noticeData);
      expect()
    })
  })

}

describe('Job Notice Creation', () => {
  it('should create a job notice', async () => {
    const response = await request(app)
      .post('/notice')
      .send(noticeData);

    expect(response.statusCode).toBe(200);
    expect(response.body.position).toBe(noticeData.position);
  });
});
