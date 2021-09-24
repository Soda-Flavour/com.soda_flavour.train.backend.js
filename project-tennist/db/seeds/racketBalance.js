/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */

const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');
/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await knex(tableNames.racketbalance).del();
  const balanceChart = [];

  var heavyChart;

  for (var a = 12; a > 0; a--) {
    var heavyValue = {
      balance: 'HH',
      point: a + '.5',
    };

    balanceChart.push(heavyValue);
    var heavyValue = {
      balance: 'HH',
      point: a,
    };
    balanceChart.push(heavyValue);
  }
  balanceChart.push({
    balance: 'HH',
    point: 0.5,
  });

  balanceChart.push({
    balance: 'Even',
    point: 0,
  });
  balanceChart.push({
    balance: 'HL',
    point: 0.5,
  });

  for (var a = 1; a <= 12; a++) {
    var lightValue = {
      balance: 'HL',
      point: a,
    };
    balanceChart.push(lightValue);
    var lightValue = {
      balance: 'HL',
      point: a + '.5',
    };
    balanceChart.push(lightValue);
  }

  await knex(tableNames.racketbalance).insert(balanceChart);
  console.log('racketbalance created.');
};
