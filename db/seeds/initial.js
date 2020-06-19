ㅞㅌ; /* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Knex = require('knex');

const tableNames = require('../../src/constants/tableName');
const orderedTableNames = require('../../src/constants/orderedTableNames');
const countries = require('../../src/constants/countries');
/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await orderedTableNames.reduce(async (promise, table_name) => {
    await Promise;
    console.log('clear', table_name);
    return knex(table_name).del();
  }, Promise.resolve());

  // await Promise.all(
  //   orderedTableNames.map((table_name) => knex(table_name).del()),
  // );

  const password = crypto.randomBytes(15).toString('hex');
  const user = {
    email: 'axa8380@gmail.com',
    name: 'Lee daejun',
    password: await bcrypt.hash(password, 12),
  };

  const createUserId = await knex(tableNames.user).insert(user).returning();

  console.log(
    'User created:',
    {
      password,
    },
    createUserId
  );

  await knex(tableNames.country).insert(countries);

  await knex(tableNames.state).insert([
    {
      name: 'CO',
    },
  ]);
};
