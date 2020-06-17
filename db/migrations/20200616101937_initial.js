/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const Knex = require('knex');
const tableNames = require('../../src/constants/tableName');
const {
  addDefaultColumns,
  createNameTable,
  url,
  email,
  references,
} = require('../../src/lib/tableUtils');

/**
 * @param {Knex} knex
 */

exports.up = async (knex) => {
  // Start of First Tables Generation
  await Promise.all([
    knex.schema.createTable(tableNames.user, (table) => {
      table.increments('id').notNullable();
      email(table, 'email').notNullable().unique();
      table.string('nick').notNullable();
      table.string('password', 127).notNullable();
      // table.string('salt', 127).notNullable();
      table.string('phone');
      table.datetime('last_login');
      addDefaultColumns(table);
    }),
    createNameTable(knex, tableNames.playStyle),
    createNameTable(knex, tableNames.forehandStyle),
    createNameTable(knex, tableNames.backhandStyle),
    createNameTable(knex, tableNames.racketCompany),
    createNameTable(knex, tableNames.racketVersion),
    knex.schema.createTable(tableNames.racketHeadSize, (table) => {
      table.increments('id').notNullable();
      table.integer('centimeter').unsigned().notNullable();
      table.float('inch').unsigned().notNullable();
    }),
    knex.schema.createTable(tableNames.racketPattern, (table) => {
      table.increments('id').notNullable();
      table.string('name').notNullable();
      table.integer('main').unsigned().notNullable();
      table.integer('cross').unsigned().notNullable();
    }),
    knex.schema.createTable(tableNames.racketLength, (table) => {
      table.increments('id').notNullable();
      table.integer('milimeter').unsigned().notNullable();
      table.float('inch').unsigned().notNullable();
    }),
    knex.schema.createTable(tableNames.racketbalance, (table) => {
      table.increments('id').notNullable();
      table.integer('milimeter').unsigned().notNullable();
      table.float('point').unsigned().notNullable();
      table.charset('gravity').unsigned().notNullable();
    }),
    createNameTable(knex, tableNames.gutCompany),
    knex.schema.createTable(tableNames.gutGauge, (table) => {
      table.increments('id').notNullable();
      table.integer('value').unsigned().notNullable();
    }),
    knex.schema.createTable(tableNames.gutTension, (table) => {
      table.increments('id').notNullable();
      table.float('lb').unsigned().notNullable();
      table.float('kg').unsigned().notNullable();
    }),
    createNameTable(knex, tableNames.gutCompany, (table) => table.string('type').notNullable()),
  ]);

  // Start of Second Tables Generation
  await Promise.all([

  ]);

  // await knex.schema.createTable(tableNames.address, (table) => {
  //   table.increments('id').notNullable();
  //   table.string('street_address_1', 100).notNullable();
  //   table.string('street_address_2', 100);
  //   table.string('city', 50).notNullable();
  //   table.string('zipcode', 15).notNullable();
  //   table.float('longitude').notNullable();
  //   table.float('latitude').notNullable();
  //   references(table, tableNames.state);
  //   references(table, tableNames.country);
  // });
};

exports.down = async (knex) => {
  await Promise.all(
    [tableNames.user, tableNames.country, tableNames.state].map((tablename) =>
      knex.schema.dropTableIfExists(tablename)

    )
  );
};
