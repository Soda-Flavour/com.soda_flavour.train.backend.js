const supertest = require('supertest');

const app = require('../../app');

describe('POST /api/v1/auth', () => {
  it('유저 생성시 이메일 중복에 걸린다.', async () => {
    const response = await supertest(app)
      .post('/api/v1/auth/signup')
      .send({
        nick: '1000',
        email: 'axa1000@gmail.com',
        password: '1Q2w3e!@#',
      })
      .expect('Content-Type', /json/)
      .expect(403);

    // expect(response.body.length).toBeGreaterThan(0);
  });
});
