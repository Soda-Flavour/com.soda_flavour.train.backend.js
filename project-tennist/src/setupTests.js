const db = require('./db');
const tableNames = require('./constants/tableNames');

module.exports = async () => {
  console.log('    ** <OK..)');
  console.log('테스트 할 계정을 삭제합니다.');
  await db(tableNames.user).where('nick', '1000').del();
  await db(tableNames.user).where('nick', '1001').del();
  console.log('...성공');
};
