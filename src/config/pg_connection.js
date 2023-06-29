const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false, sslmode: 'require' }
});

// Create a database pool to handle connections.
const createPool = (channelId) => {
    return new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: channelId,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        ssl: { rejectUnauthorized: false, sslmode: 'require' }
    });
};
  
  // Query the database and return a promise that resolves with the results.
const query = (pool, sql, values) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.rows);
            }
        });
    });
};

exports.pool = pool;
exports.createPool = createPool;
exports.query = query;