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

  const replacementGripChart = [
    {
      name: 'Leacher Grip',
      name_kor: '가죽그립',
      type: 'leather',
    },
    {
      name: 'Cousion Grip',
      name_kor: '쿠션 그립',
      type: 'cousion',
    },
  ];

  await knex(tableNames.replacementGrip).insert(replacementGripChart);
  console.log('Headsize created.');
};
