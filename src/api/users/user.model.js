const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./user.schema.json');
const DB_PREFIX = require('../../constants/project');
const UserPhysicalModel = require('../user_physical/user_physical.model');

class User extends Model {
  static get tableName() {
    return tableNames.user;
  }

  static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
    return {
      physical_id: {
        relation: Model.HasOneRelation,
        modelClass: UserPhysicalModel,
        join: {
          from: tableNames.user + '.id',
          to: tableNames.userPhysical + '.' + DB_PREFIX + 'user_id',
        },
      },
    };
  }
}

module.exports = User;
