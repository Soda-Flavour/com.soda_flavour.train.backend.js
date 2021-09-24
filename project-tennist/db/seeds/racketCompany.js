/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */

const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');
/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await knex(tableNames.racketCompany).del();

  const racketCompanyChart = [
    {
      name: 'Wilson',
      name_kor: '윌슨',
    },
    {
      name: 'Head',
      name_kor: '헤드',
    },
    {
      name: 'Babolat',
      name_kor: '바볼랏',
    },
    {
      name: 'Yonex',
      name_kor: '요넥스',
    },
    {
      name: 'Dunlop',
      name_kor: '던롭',
    },
    {
      name: 'Prince',
      name_kor: '프린스',
    },
    {
      name: 'Pro Kennex',
      name_kor: '프로케넥스',
    },
  ];

  await knex(tableNames.racketCompany).insert(racketCompanyChart);
  console.log('racketCompany created.');
};
