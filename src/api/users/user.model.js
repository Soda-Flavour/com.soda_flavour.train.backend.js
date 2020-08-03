const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./user.schema.json');
const DB_PREFIX = require('../../constants/project');
const { queryBuilder } = require('../../db');
// const { UserPhysical } = require('../user_physical/user_physical.model');

class User extends Model {
  static get tableName() {
    return tableNames.user;
  }

  static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
    const UserPhysical = require('../user_physical/user_physical.model');
    return {
      mypage: {
        relation: Model.HasOneRelation,
        modelClass: UserPhysical,
        // filter: (query) => {
        //   // console.log(query);
        //   let data = query.select(
        //     'weight_kg',
        //     'height_cm',
        //     'handed',
        //     'age',
        //     'sex'
        //   );
        //   console.log('////////////////////');
        //   console.log(data);
        //   console.log('////////////////////');
        //   return query.select('weight_kg', 'height_cm', 'handed', 'age', 'sex');
        // },
        join: {
          from: 't_user.id',
          to: 't_user_physical.t_user_id',
        },
      },
      datata: {
        relation: Model.HasManyRelation,
        modelClass: PlayStyle,
        filter: (query) => {
          // console.log(query);

          console.log('////////////////////');
          console.log('하하하하');
          console.log('////////////////////');
          return query.select('weight_kg', 'height_cm', 'handed', 'age', 'sex');
        },
        join: {
          from: 't_user_physical.t_play_style_id',
          to: 't_play_style.id',
        },
      },
    };
  }

  static async getMyPage(id) {
    return await User.query()
      .select('id', 'email', 'nick')
      .findById(id)
      .first()
      .withGraphFetched('datata');
  }
}

class PlayStyle extends Model {
  static get tableName() {
    return 't_play_style';
  }
}

module.exports = User;
