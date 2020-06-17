const tableNames = require('./tableName');

// 의존성을 생각하여 차례대로 배열에 둔다.
module.exports = [
  tableNames.address,
  tableNames.state,
  tableNames.country,
  tableNames.user,
];
