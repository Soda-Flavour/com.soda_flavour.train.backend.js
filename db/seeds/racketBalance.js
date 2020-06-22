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

  const balanceChart = [];

  var heavyChart;

  for (var a = 12; a > 0; a--) {
    var heavyValue = {
      balance: 'HH',
      point: a,
    };
    balanceChart.push(heavyChart);
  }

  balanceChart.push({
    balance: 'Even',
    point: 0,
  });

  for (var a = 1; a <= 12; a++) {
    var lightValue = {
      balance: 'HL',
      point: a,
    };
    balanceChart.push(lightValue);
  }

  await knex(tableNames.racketbalance).insert(balanceChart);
  console.log('balance chart created.');
};
