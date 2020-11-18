const db = require('../../db');

const tableNames = require('../../constants/tableNames');

const fields = [];

module.exports = {
  async get(userId) {
    return db
      .select(
        'tup.ntrp',
        {
          playstyle: 'tup.t_play_style_id',
          forehand: 'tup.t_forehand_style_id',
          backhand: 'tup.t_backhand_style_id',
        }
        // tup.t_forehand_style_id
      )
      .from({ tup: tableNames.userPhysical })
      .leftJoin(
        { tbs: tableNames.backhandStyle },
        'tup.t_backhand_style_id',
        '=',
        'tbs.id'
      )
      .leftJoin(
        { tfs: tableNames.forehandStyle },
        'tup.t_forehand_style_id',
        '=',
        'tfs.id'
      )
      .leftJoin(
        { tps: tableNames.playStyle },
        'tup.t_forehand_style_id',
        '=',
        'tps.id'
      )
      .where('tup.t_user_id', userId);
  },
  async update(physicalData, userId) {
    return db(tableNames.userPhysical)
      .where('t_user_id', userId)
      .update(physicalData);
  },
};
