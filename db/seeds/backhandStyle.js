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

  const backhandStyleChart = [
    {
      name: 'One-Handed ',
      name_kor: '원핸드',
    },
    {
      name: 'Two-Handed',
      name_kor: '투핸드',
    },
  ];

  await knex(tableNames.backhandStyle).insert(backhandStyleChart);
  console.log('Headsize created.');
};
