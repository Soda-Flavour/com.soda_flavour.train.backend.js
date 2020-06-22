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

  const headSizeChart = [
    {
      centimeter: 645,
      inch: 100,
    },
    {
      centimeter: 670,
      inch: 104,
    },
    {
      centimeter: 740,
      inch: 115,
    },
    {
      centimeter: 632,
      inch: 98,
    },
  ];

  await knex(tableNames.racketHeadSize).insert(headSizeChart);
  console.log('Headsize created.');
};
