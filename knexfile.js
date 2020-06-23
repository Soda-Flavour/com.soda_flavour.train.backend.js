// Update with your config settings.

require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USER,
      password: process.env.MSSQL_PASSWORD,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  test: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USER,
      password: process.env.MSSQL_PASSWORD,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
