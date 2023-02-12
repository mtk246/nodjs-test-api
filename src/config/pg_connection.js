const { default: knex } = require("knex");
const { Model } = require("objection");

function pg_connect() {
  const knexConfig = require("../../knexfile").development;
  const knexConnection = knex(knexConfig);
  Model.knex(knexConnection);
}
exports.pg_connect = pg_connect;
