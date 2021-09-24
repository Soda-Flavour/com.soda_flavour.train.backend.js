const db = require('../../db');

const tableNames = require('../../constants/tableNames');


module.exports = {
  async getList(racketCompanyId) {
    return db
      .select('*')
      .from(tableNames.racketData)
      .where('t_racket_company_id', racketCompanyId);
  },

  async ckeckRacketNickName(data) {
    return db
      .select('id')
      .from(tableNames.userRacket)
      .where({
        t_user_id: data.id,
        racket_nickname: data.racket_nickname
      })
      .first();
  },
  async insertRacket(data) {
    return db(tableNames.userRacket).insert({
      t_user_id: data.id,
      t_racket_id: data.racket_id,
      racket_nickname: data.racket_nickname,
    });
  },
};