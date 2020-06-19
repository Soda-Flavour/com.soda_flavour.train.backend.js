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
const tableNames = require('../../src/constants/tableName');

/**
 * @param {Knex} knex
 * @param {table} knex.CreateTableBuilder
 */
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.userPhysical, (table) => {
      table.increments('id').notNullable();
      references(table, tableNames.user);
      table.integer('weight_kg').unsigned();
      table.integer('height_cm').unsigned();
      table.charset('handed');
      references(table, tableNames.playStyle);
      references(table, tableNames.forehandStyle);
      references(table, tableNames.backhandStyle);
      table.integer('age').unsigned();
      table.charset('sex');
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.userImg, (table) => {
      table.increments('id').notNullable();
      references(table, tableNames.user);
      url(table, 'img_url');
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.racket, (table) => {
      table.increments('id').notNullable();
      table.string('model').notNullable();
      table.integer('weight_ungut').notNullable();
      references(table, tableNames.racketCompany);
      references(table, tableNames.racketVersion);
      references(table, tableNames.racketHeadSize);
      references(table, tableNames.racketPattern);
      references(table, tableNames.racketLength);
      references(table, tableNames.racketbalance);
      addDefaultColumns(table);
    }),
    createNameTable(knex, tableNames.gut, (table) => {
      references(table, tableNames.gutCompany);
      references(table, tableNames.gutGauge);
      addDefaultColumns(table);
    }),
  ]);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.userPhysical,
      tableNames.userImg,
      tableNames.racket,
      tableNames.gut,
    ].map((tablename) => knex.schema.dropTableIfExists(tablename))
  );
};
