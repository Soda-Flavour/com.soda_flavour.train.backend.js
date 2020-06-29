/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */

const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');
/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await knex(tableNames.racketPattern).del();
  const patternChart = [
    {
      name: '덴스',
      main: 18,
      cross: 20,
    },
    {
      name: '오픈',
      main: 16,
      cross: 20,
    },
    {
      name: '오픈',
      main: 16,
      cross: 19,
    },
    {
      name: '오픈',
      main: 16,
      cross: 18,
    },
    {
      name: '오픈',
      main: 18,
      cross: 16,
    },
  ];

  await knex(tableNames.racketPattern).insert(patternChart);
  console.log('racketPattern created.');
};
