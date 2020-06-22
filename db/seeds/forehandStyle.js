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

  const forehandStyleChart = [
    {
      name: 'Flat',
      name_kor: '플랫',
    },
    {
      name: 'Top spin',
      name_kor: '탑스핀',
    },
  ];

  await knex(tableNames.forehandStyle).insert(forehandStyleChart);
  console.log('forehandStyle created.');
};
