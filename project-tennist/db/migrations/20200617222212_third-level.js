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
    knex.schema.createTable(tableNames.userRacket, (table) => {
      table.increments('id').notNullable();
      references(table, tableNames.user);
      references(table, tableNames.racket);
      table.integer('seq').unsigned();
      table.integer('grip_size').unsigned();
      addDefaultColumns(table);
    }),
  ]);
};

exports.down = async (knex) => {
  await Promise.all(
    [tableNames.userRacket].map((tablename) =>
      knex.schema.dropTableIfExists(tablename)
    )
  );
};
