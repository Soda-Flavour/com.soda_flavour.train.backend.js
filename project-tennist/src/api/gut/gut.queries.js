const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = ['id', 'name', 'name_kor'];
module.exports = {
  async gutCompanies() {
    return db(tableNames.gutCompany).select(fields);
  },
  async comapanyGutList(id) {
    return db(tableNames.gutCompany)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
  async listWithCompany() {
    return db
      .select({
        id: 'gt.id',
        gut_name: 'gt.name',
        comapany_name: 'gc.name',
      })
      .from({
        gt: tableNames.gut
      })
      .innerJoin({
          gc: tableNames.gutCompany
        },
        'gc.id',
        '=',
        'gt.t_gut_company_id'
      );
  },
  async gutList(reqParams) {
    return db(tableNames.gut).select(fields).where({
      t_gut_company_id: reqParams.id,
    });
  },
};