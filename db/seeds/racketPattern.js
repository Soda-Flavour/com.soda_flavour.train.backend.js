/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */

const Knex = require('knex');
const tableNames = require('../../src/constants/tableName');
/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  // await orderedTableNames.reduce(async (promise, table_name) => {
  //   await Promise;
  //   console.log('clear', table_name);
  //   return knex(table_name).del();
  // }, Promise.resolve());

  const patternChart = [
    {
      name: '덴스'
      main: 18,
      cross: 20,
    },
    {
      name: '오픈'
      main: 16,
      cross: 20,
    },
    {
      name: '오픈'
      main: 16,
      cross: 19,
    },
    {
      name: '오픈'
      main: 16,
      cross: 18,
    },
  ];

  await knex(tableNames.racketPattern).insert(patternChart);
  console.log('Headsize created.');
};
