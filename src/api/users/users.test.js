const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/users', () => {
  it('로그인이 되어있는 상태에서 기본 본인의 정보를 불러올시 가져울수 있어야 한다.', async () => {
    const response = await supertest(app)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });
});
