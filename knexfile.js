// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
  },
};

