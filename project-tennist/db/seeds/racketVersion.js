/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */

const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');
/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await knex(tableNames.racketVersion).del();

  const racketVersionChart = [
    {
      name: 'Graphene 360+ Gravity',
      name_kor: '그라핀 360+ 그래비티',
    },
    {
      name: 'Graphene 360+ Speed',
      name_kor: '그라핀 360+ 스피드',
    },
    {
      name: 'Blade V7',
      name_kor: '블레이드 V7',
    },
  ];

  await knex(tableNames.racketVersion).insert(racketVersionChart);
  console.log('racketVersion created.');
};
