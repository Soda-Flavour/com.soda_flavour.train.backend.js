/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
const Knex = require('knex');
const {
  addDefaultColumns,
  createNameTable,
  url,
  email,
  references,
} = require('../../src/lib/tableUtils');
const tableNames = require('../../src/constants/tableNames');

exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.userRacketHistorycoment, (table) => {
      table.increments('id').notNullable();
      references(table, tableNames.userRacketHistory);
      table.text('comment').notNullable();
      addDefaultColumns(table);
    }),
  ]);
};

exports.down = async (knex) => {
  await Promise.all(
    [tableNames.userRacketHistorycoment].map((tablename) =>
      knex.schema.dropTableIfExists(tablename)
    )
  );
};
