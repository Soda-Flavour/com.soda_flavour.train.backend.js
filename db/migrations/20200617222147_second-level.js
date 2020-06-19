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
      table.string('handed');
      references(table, tableNames.playStyle);
      references(table, tableNames.forehandStyle);
      references(table, tableNames.backhandStyle);
      table.integer('age').unsigned();
      table.string('sex');
      addDefaultColumns(table);
      console.log(`${tableNames.userPhysical} 테이블 생성 성공`);
    }),
    knex.schema.createTable(tableNames.userImg, (table) => {
      table.increments('id').notNullable();
      references(table, tableNames.user);
      url(table, 'img_url');
      addDefaultColumns(table);
      console.log(`${tableNames.userImg} 테이블 생성 성공`);
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

      console.log(`${tableNames.racket} 테이블 생성 성공`);
    }),
    createNameTable(knex, tableNames.gut, (table) => {
      references(table, tableNames.gutCompany);
      references(table, tableNames.gutGauge);
      console.log(`${tableNames.gut} 테이블 생성 성공`);
    }),
  ]);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  // await Promise.all(
  //   [
  //     tableNames.userPhysical,
  //     tableNames.userImg,
  //     tableNames.racket,
  //     tableNames.gut,
  //   ].map((tablename) => knex.schema.dropTableIfExists(tablename))
  // );
};
