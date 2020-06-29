<!-- prettier-ignore -->
# tennist App (backend)

For tennis!

## 1. Database diagram

![tennist_database_v1 0](https://user-images.githubusercontent.com/19925297/86031847-68c47e00-ba71-11ea-9b40-7be80fea8615.png)


## 2. Todo list

### 데이터 베이스

- [x] DB 생성
- [x] knex 기본설정
- [x] 마이그레이션 파일생성
  - [x] 1뎁스 DB 생성
  - [x] 2뎁스 DB 생성
  - [x] 3뎁스 DB 생성
  - [x] 4뎁스 DB 생성
- [x] 시드 파일생성

- [ ] 기본 시드 파일 생성

### SERVER

- [x] Node 서버 생성

- [x] objection js 연동 생성

### AUTH

- [x] auth 라우터 생성

- [x] auth 미들웨어 생성

  - [x] 헤더 토큰 소유 여부확인
  - [x] 토큰기반 로그인 중인지 확인

- [ ] 회원 가입 생성 POST /auth/signup

  - [x] 필수값 유효성 체크
  - [x] 이메일 중복여부 확인 (unique)
  - [x] 닉네임 중복여부 확인 (unique)
  - [x] 비밀번호 암호화
  - [x] 데이터베이스 insert
  - [x] 피지컬 데이터베이스 빈 row insert
  - [x] 인서트 트랜잭션 설정
  - [x] 회원가입 성공시 성공 여부 전달
  - [x] 에러시 코드 전달
  - [ ] 테스트 코드 작성

- [ ] 유저 로그인 POST /auth/signin

  - [x] 필수값 유효성 체크
  - [x] 유저 존재 확인
  - [x] DB 비밀번호 비교 체크 (bcrypt)
  - [x] JWT 토큰 생성
  - [x] 성공시 JWT 토큰값 전달
  - [x] 에러시 코드 전달
  - [ ] 테스트 코드 작성

- [x] user 라우터 생성
  - [x] user 라우터 토큰 체크 연동
- [x] user 모델 생성
- [x] user 스키마 생성

- [ ] 유저 기본정보 요청 GET /user/:id

  - [x] 로그인 확인 미들웨어 연동
  - [x] 필수값 유효성 체크
  - [x] DB의 기본 유저 정보 가져오기
  - [x] 유저 정보 전달
  - [ ] 에러시 코드 전달
  - [ ] 테스트 코드 작성

```diff
- 추가개발시 고려사항.
 유저 기본정보 수정 POST /user/:id
   로그인 확인 미들웨어 연동
   수정 요소값 유효성 체크
   DB의 기본 유저 정보 업데이트
   유저 정보 업데이트 전달
   에러시 코드 전달
   테스트 코드 작성
```

- [x] user physical 라우터 생성
  - [x] user physical 라우터 토큰 체크 연동
- [x] user physical 모델 생성
- [x] user physical 스키마 생성

# - [ ] 유저 피지컬정보 요청 GET /physical/:id

      - [x] 로그인 확인 미들웨어 연동
      - [x] 필수값 유효성 체크 (id)
      - [x] DB의 유저 피지컬 정보 가져오기
      - [x] 유저 피지컬 정보 전달
      - [x] 에러시 코드 전달
      - [ ] 테스트 코드 작성

- [ ] 유저 피지컬정보 수정 POST /physical

  - [x] 로그인 확인 미들웨어 연동
  - [x] 수정 요소값 유효성 체크
  - [x] DB의 유저 피지컬 정보 업데이트
  - [x] 유저 피지컬 업데이트 결과 전달
  - [x] 에러시 코드 전달
  - [ ] 테스트 코드 작성

- [ ] 라켓 회사 리스트 GET /racket_company

  - [x] DB의 라켓 회사 리스트 전송
  - [x] 에러시 코드 전달
  - [ ] 테스트 코드 작성

- [ ] 라켓 버전 리스트 GET /racket_version/:racketCompanyId

  - [x] 페이징 대응 코드 작성
  - [x] DB의 라켓 리스트 전송
  - [x] 에러시 코드 전달
  - [ ] 테스트 코드 작성

- [ ] 라켓 모델 리스트 GET /racket_model

  - [ ] 페이징 대응 코드 작성
  - [ ] DB의 라켓 리스트 전송
  - [ ] 에러시 코드 전달
  - [ ] 테스트 코드 작성

- [ ] 라켓 거트 회사  리스트 GET /racket_gut_company

  - [ ] DB의 거트 회사 리스트 전송
  - [ ] 에러시 코드 전달
  - [ ] 테스트 코드 작성


- [ ] 라켓 거트 회사  리스트 GET /racket_gut

  - [ ] DB의 거트 리스트 전송
  - [ ] 에러시 코드 전달
  - [ ] 테스트 코드 작성


- [ ] 유저 사용라켓 추가 POST /racket/user_racket

  - [ ] 로그인 확인 미들웨어 연동
  - [ ] 요소값 유효성 체크
  - [ ] 유저 라켓 DB에 라켓정보 추가
  - [ ] 유저 피지컬 업데이트 전달
  - [ ] 에러시 코드 전달
  - [ ] 테스트 코드 작성

- [ ] 유저 사용라켓 삭제
- [ ]
- [ ]

```

```
