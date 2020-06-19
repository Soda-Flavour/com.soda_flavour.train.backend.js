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
function references(table, tableName, notNullable = true, columnName = '') {
  const definition = table
    .integer(`${columnName || tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');

  if (notNullable) {
    definition.notNullable();
  }
  return definition;
}

module.exports = {
  addDefaultColumns,
  createNameTable,
  url,
  email,
  references,
};
