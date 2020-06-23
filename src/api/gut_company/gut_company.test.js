const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/gut_company', () => {
  it('스트링 회사의 리스트를 배열로 반환해야한다.', async () => {
    const response = await supertest(app)
      .get('/api/v1/gut_company')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });

  it('스트링 회사를 하나 반환해야한다.', async () => {
    const response = await supertest(app)
      .get('/api/v1/gut_company/2')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.id).toBe(2);
  });

  it('해당 아이디의 스트링 회사가 없다면 404', async () => {
    const response = await supertest(app)
      .get('/api/v1/gut_company/39099')
      .expect('Content-Type', /json/)
      .expect(404);
  });

  it('허용되지 않은 아이디 값(숫자가 아닌)이 들어온다면  422', async () => {
    const response = await supertest(app)
      .get('/api/v1/gut_company/asdfdsa')
      .expect('Content-Type', /json/)
      .expect(422);
  });
});
