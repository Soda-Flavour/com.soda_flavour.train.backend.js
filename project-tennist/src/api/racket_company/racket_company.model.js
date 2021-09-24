const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
// const schema = require('./racket_company.schema.json');
const DB_PREFIX = require('../../constants/project');

class RacketCompany extends Model {
  static get tableName() {
    return tableNames.racketCompany;
  }

  // static get jsonSchema() {
  //   return schema;
  // }
}

module.exports = RacketCompany;
