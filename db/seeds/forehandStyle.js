/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */

const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');
/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await knex(tableNames.forehandStyle).del();
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
