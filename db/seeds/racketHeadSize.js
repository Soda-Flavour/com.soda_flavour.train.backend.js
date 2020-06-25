/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */

const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');
/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await knex(tableNames.racketHeadSize).del();

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
  console.log('racketHeadSize created.');
};
