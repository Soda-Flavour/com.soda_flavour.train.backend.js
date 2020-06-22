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

  const lengthChart = [
    {
      milimeter: 685,
      inch: 27,
    },
    {
      milimeter: 696,
      inch: 27.4,
    },
    {
      milimeter: 700,
      inch: 27.5,
    },
  ];

  await knex(tableNames.racketLength).insert(lengthChart);
  console.log('Headsize created.');
};
