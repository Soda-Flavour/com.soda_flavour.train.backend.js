function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.datetime('deleted_at');
}

function createNameTable(knex, table_name, callback = null) {
  return knex.schema.createTable(table_name, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    table.string('name_kor').notNullable().unique();
    if (callback) callback(table);
    addDefaultColumns(table);
  });
}

function url(table, columnName) {
  table.string(columnName, 2000);
}

function email(table, columnName) {
  return table.string(columnName, 254);
}
/**
 * @param {knex.CreateTableBuilder} table
 * @param {string} tableName
 */
function references(table, tableName) {
  table
    .integer(`${tableName}_id`)
    .unsigned()
    .inTable(tableName)
    .references('id')
    .onDelete('cascade');
}

module.exports = {
  addDefaultColumns,
  createNameTable,
  url,
  email,
  references,
};
