const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/users', () => {
  it('현재 유저 리스트를 돌려주어야 한다', async () => {
    const response = await supertest(app)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });
});
