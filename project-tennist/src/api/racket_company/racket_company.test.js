const supertest = require('supertest');

const app = require('../../app');

const db = require('../../db');

describe('라켓회사 ', () => {
  test('리스트 가져오기', async () => {
    const response = await supertest(app)
      .get('/api/v1/racket_company')
      .expect('Content-Type', /json/)
      .expect(200);
    console.log('this is racket history list');

    expect(response.body).toHaveProperty('result');

    expect(response.body.result).toHaveProperty('status', 200);
    expect(response.body.result).toHaveProperty('message');
    expect(response.body.result).toHaveProperty('data');
    expect(response.body.result.data).toHaveProperty('list');
    expect(response.body.result.data.list.length).not.toBe(0);
    expect(response.body.result.data.list[0]).toHaveProperty('id');
    expect(response.body.result.data.list[0]).toHaveProperty('name');
    expect(response.body.result.data.list[0]).toHaveProperty('name_kor');

    // expect(response);
  });
});

// describe('회원가입 Validate - 2 - 닉네임', () => {
//   test('필수항목 누락 - 닉네임', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         email: 'axa1000@gmail.com',
//         password: '1Q2w3e!@#',
//         repassword: '1q2w3e!@#',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);

//   });

//   test('닉네임 유효성 - 1 - 특수문자', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         nick: '1000!!!',
//         email: 'axa1000@gmail.com',
//         password: '1Q2w3e!@#',
//         repassword: '1q2w3e!@#',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);
//   });

//   test('닉네임 유효성 - 2 - 최소 글자', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         nick: '1',
//         email: 'axa1000@gmail.com',
//         password: '1Q2w3e!@#',
//         repassword: '1q2w3e!@#',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);
//   });
// });

// describe('회원가입 Validate - 3 - 이메일', () => {
//   test('필수항목 누락 - 이메일', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         nick: '1000',
//         password: '1Q2w3e!@#',
//         repassword: '1Q2w3e!@#',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);
//   });
//   test('이메일 유효성 - 1 - 형식', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         email: 'axa1000gmail.com',
//         nick: '1000',
//         password: '1Q2w3e!@#',
//         repassword: '1Q2w3e!@#',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);
//   });
// });

// describe('회원가입 Validate - 4 - 비밀번호', () => {
//   test('필수항목 누락 - 비밀번호', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         nick: '1000',
//         email: 'axa1000@gmail.com',
//         repassword: '1Q2w3e!@#',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);
//   });

//   test('유효성 - 1 - 최소길이', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         nick: '1000',
//         email: 'axa1000@gmail.com',
//         password: '1Q2w3e',
//         repassword: '1Q2w3e',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);
//   });
//   test('유효성 - 2 - 최대길이', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         nick: '1000',
//         email: 'axa1000@gmail.com',
//         password: '1Q2w3e!@#1q2w3e!@#1q2w3e!@#',
//         repassword: '1Q2w3e!@#1q2w3e!@#1q2w3e!@#',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);
//   });
//   test('유효성 - 3 - 대문자 미포함', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         nick: '1000',
//         email: 'axa1000@gmail.com',
//         password: '1q2w3e!@#',
//         repassword: '1q2w3e!@#',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);
//   });
//   test('유효성 - 4 - 소문자 미포함', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         nick: '1000',
//         email: 'axa1000@gmail.com',
//         password: '1Q@W#E!@#',
//         repassword: '!Q@W#E!@#',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);
//   });

//   test('유효성 - 5 - 숫자 미포함', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         nick: '1000',
//         email: 'axa1000@gmail.com',
//         password: 'qAwsed!@#',
//         repassword: 'qAwsed!@#',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);
//   });

//   test('유효성 - 6 - 특수문자 미포함', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         nick: '1000',
//         email: 'axa1000@gmail.com',
//         password: '1Q2w3eqwe',
//         repassword: '1Q2w3eqwe',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);
//   });

//   test('필수항목 누락 - 비밀번호 확인', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         nick: '1000',
//         email: 'axa1000@gmail.com',
//         password: '1Q2w3e!@#',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);
//   });
// });

// describe('회원가입', () => {
//   test('성공', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         nick: '1000',
//         email: 'axa1000@gmail.com',
//         password: '1Q2w3e!@#',
//         repassword: '1Q2w3e!@#',
//       })
//       .expect('Content-Type', /json/)
//       .expect(200);
//   });
// });

// describe('회원가입 중복 검사', () => {
//   test('닉네임 중복', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         nick: '1000',
//         email: 'axa1001@gmail.com',
//         password: '1Q2w3e!@#',
//         repassword: '1Q2w3e!@#',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);
//   });

//   test('이메일 중복', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         nick: '1001',
//         email: 'axa1000@gmail.com',
//         password: '1Q2w3e!@#',
//         repassword: '1Q2w3e!@#',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);
//   });
// });

// describe('로그인', () => {
//   test('성공', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/login')
//       .send({
//         email: 'axa1000@gmail.com',
//         password: '1Q2w3e!@#',
//       })
//       .expect('Content-Type', /json/)
//       .expect(200);
//   });

//   test('실패 - 비밀번호 불일치', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/login')
//       .send({
//         email: 'axa1000@gmail.com',
//         password: '1Q2w3e!@$',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);
//   });

//   test('로그인 실패 - 없는 아이디', async () => {
//     const response = await supertest(app)
//       .post('/api/v1/auth/login')
//       .send({
//         email: 'axa1001@gmail.com',
//         password: '1Q2w3e!@#',
//       })
//       .expect('Content-Type', /json/)
//       .expect(403);
//   });
// });
