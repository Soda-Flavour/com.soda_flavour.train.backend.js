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
    knex.schema.createTable(tableNames.userRacketHistory, (table) => {
      table.increments('id').notNullable();
      references(table, tableNames.userRacket);
      table.integer('weight_tune').unsigned();
      references(table, tableNames.replacementGrip);
      table.integer('overgrip_num').unsigned();
      references(table, tableNames.racketbalance);
      references(table, tableNames.gut);
      references(table, tableNames.gutTension, false, 'main_gut_tension_id');
      references(table, tableNames.gutTension, false, 'cross_gut_tension_id');
      addDefaultColumns(table);
    }),
  ]);
};

exports.down = async (knex) => {
  await Promise.all(
    [tableNames.userRacketHistory].map((tablename) =>
      knex.schema.dropTableIfExists(tablename)
    )
  );
};
