/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */

const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');
/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await knex(tableNames.backhandStyle).del();
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
