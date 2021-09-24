const { DB_PREFIX } = require('../constants/project');

let tableNames = {
  user: DB_PREFIX + 'user',
  playStyle: DB_PREFIX + 'play_style',
  forehandStyle: DB_PREFIX + 'forehand_style',
  backhandStyle: DB_PREFIX + 'backhand_style',
  racketCompany: DB_PREFIX + 'racket_company',
  racketVersion: DB_PREFIX + 'racket_version',
  racketHeadSize: DB_PREFIX + 'racket_head_size',
  racketPattern: DB_PREFIX + 'racket_pattern',
  racketLength: DB_PREFIX + 'racket_length',
  racketbalance: DB_PREFIX + 'racket_balance',
  gutCompany: DB_PREFIX + 'gut_company',
  gutGauge: DB_PREFIX + 'gut_gauge',
  gutTension: DB_PREFIX + 'gut_tension',
  replacementGrip: DB_PREFIX + 'replacement_grip',

  userPhysical: DB_PREFIX + 'user_physical',
  userImg: DB_PREFIX + 'user_img',
  racket: DB_PREFIX + 'racket',
  gut: DB_PREFIX + 'gut',

  userRacket: DB_PREFIX + 'user_racket',
  userRacketHistory: DB_PREFIX + 'user_racket_history',

  userRacketHistorycoment: DB_PREFIX + 'user_racket_history_coment',

  // country: 't_country',
  // state: 't_state',
  // address: 't_address',
};

module.exports = tableNames;
