const { createPool, query } = require("../config/pg_connection");
const { response } = require("../helper/response");

exports.get = async (req, res) => {
    const table_name = req.params.table_name;

    const pool = createPool('public_db');

    const rows = 'SELECT * FROM ' + table_name;

    const result = await query(
        pool,
        rows,
    );

    response(res, result);
};

exports.getProduct = async (req, res) => {
    const table_name = req.params.table_name;
    const product_id = req.params.product_id;

    const pool = createPool('public_db');

    const rows = 'SELECT * FROM ' + table_name + ' WHERE product_id = ' + product_id;

    const result = await query(
        pool,
        rows,
    );

    response(res, result);
};