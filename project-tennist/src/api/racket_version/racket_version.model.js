const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
// const schema = require('./racket_company.schema.json');
const DB_PREFIX = require('../../constants/project');

class RacketVersion extends Model {
  static get tableName() {
    return tableNames.racketVersion;
  }

  // static get jsonSchema() {
  //   return schema;
  // }
}

module.exports = RacketVersion;
