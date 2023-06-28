const { createPool, query } = require("../config/pg_connection");
const { response } = require("../helper/response");

exports.get = async (req, res) => {
    const table_name = req.params.table_name;
    const { product_id } = req.query;

    if (product_id) {
        const pool = createPool('public_db');

        const rows = `SELECT * FROM ${table_name} WHERE product_id = '${product_id}'`;

        const result = await query(
            pool,
            rows,
        );

        response(res, result);
    } else {
        const pool = createPool('public_db');

        const rows = 'SELECT * FROM ' + table_name;
    
        const result = await query(
            pool,
            rows,
        );
    
        response(res, result);
    }
    
};

exports.update = async (req, res) => {
    const table_name = req.params.table_name;
    const {
        product_id,
        product_name,
        unit_qty,
        packaging_type_name,
        buy_price,
        sell_price,
    } = req.body;

    const pool = createPool('public_db');

    const rows = `UPDATE ${table_name} SET product_name = $1, unit_qty = $2, packaging_type_name = $3, buy_price = $4, sell_price = $5 WHERE product_id = $6`;

    const result = await query(
        pool,
        rows,
        [
            product_name,
            unit_qty,
            packaging_type_name,
            buy_price,
            sell_price,
            product_id
        ]
    );

    response(res, result);
}
