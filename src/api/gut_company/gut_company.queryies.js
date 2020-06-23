const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = ['id', 'name', 'name_kor'];
module.exports = {
  find() {
    return db(tableNames.gutCompany).select(fields);
  },
  async get(id) {
    return db(tableNames.gutCompany)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
};
