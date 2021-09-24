// Update with your config settings.
require("dotenv").config();
export const knexConfig = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USER,
      password: process.env.MSSQL_PASSWORD,
    },
  },
  test: {
    client: "mysql",
    connection: {
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USER,
      password: process.env.MSSQL_PASSWORD,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
