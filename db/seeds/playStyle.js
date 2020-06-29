const { playStyle } = require('../../src/constants/tableNames');
console.log('시드시드');
console.log(playStyle);
exports.seed = async (knex) => {
  await knex(playStyle).del();
  const playStyleChart = [
    { name: 'Baseliner', name_kor: '베이스라이너' },
    { name: 'Serve and Volley', name_kor: '서비스 앤 발리' },
    { name: 'All-Court Player', name_kor: '올라운더' },
    { name: 'Counterpuncher', name_kor: '카운터펀처' },
    { name: 'Big-Server', name_kor: '빅서버' },
    { name: 'Junk Baller', name_kor: '정크볼러' },
  ];
  await knex(playStyle).insert(playStyleChart);
  console.log('playStyle created.');
};
