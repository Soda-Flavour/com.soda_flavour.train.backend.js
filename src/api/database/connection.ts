import Knex from "knex";

import { knexConfig } from "../../../knexfile";

const environment = process.env.NODE_ENV || "development";
console.log("asdfasdf", knexConfig[environment]);
const connection = Knex(knexConfig[environment]);

export default connection;
