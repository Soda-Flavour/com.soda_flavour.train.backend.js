const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./user_physical.schema.json');
const DB_PREFIX = require('../../constants/project');

class UserPhysical extends Model {
  static get tableName() {
    return tableNames.userPhysical;
  }

  static get jsonSchema() {
    return schema;
  }

  // static get relationMappings() {
  //   return {
  //     user_id: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: UserModel,
  //       join: {
  //         from: tableNames.userPhysical + '.' + DB_PREFIX + 'user_id',
  //         to: tableNames.user + '.id',
  //       },
  //     },
  //   };
  // }
}

module.exports = UserPhysical;
