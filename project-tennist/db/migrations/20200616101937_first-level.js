/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');
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
      table.string('nick').notNullable().unique();
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
    knex.schema.createTable(tableNames.racketHeadSize, (table) => {
      table.increments('id').notNullable();
      table.integer('centimeter').unsigned().notNullable();
      table.float('inch', 8, 1).unsigned().notNullable();
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
      table.float('inch', 8, 1).unsigned().notNullable();
    }),
    knex.schema.createTable(tableNames.racketbalance, (table) => {
      table.increments('id').notNullable();
      table.string('balance').notNullable();
      table.integer('milimeter').unsigned().notNullable();
      table.float('point', 8, 1).unsigned().notNullable();
    }),
    createNameTable(knex, tableNames.gutCompany),
    knex.schema.createTable(tableNames.gutGauge, (table) => {
      table.increments('id').notNullable();
      table.integer('value').unsigned().notNullable();
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.gutTension, (table) => {
      table.increments('id').notNullable();
      table.float('lb', 8, 1).unsigned().notNullable();
      table.float('kg', 8, 1).unsigned().notNullable();
    }),
    createNameTable(knex, tableNames.replacementGrip, (table) =>
      table.string('type').notNullable()
    ),
  ]);

  /* CAUTION: 이 테이블은 racketCompany 테이블과 관계에 있다 */
  await createNameTable(knex, tableNames.racketVersion, (table) => {
    references(table, tableNames.racketCompany, false);
  });

  // await knex.schema.createTable(tableNames.address, (table) => {
  //   table.increments('id').notNullable();
  //   table.string('street_address_1', 100).notNullable();
  //   table.string('street_address_2', 100);
  //   table.string('city', 50).notNullable();
  //   table.string('zipcode', 15).notNullable();
  //   table.double('longitude').notNullable();
  //   table.double('latitude').notNullable();
  //   references(table, tableNames.state);
  //   references(table, tableNames.country);
  // });
};

exports.down = async (knex) => {
  await Promise.all(
    Object.values(tableNames)
      .reverse()
      .map((tablename) => knex.schema.dropTableIfExists(tablename))
  );
};
