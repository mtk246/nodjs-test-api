const { createPool, query } = require("../config/pg_connection");
const { response } = require("../helper/response");

exports.get = async (req, res) => {
    const table_name = req.params.table_name;
    const { product_id } = req.query;

    if (product_id) {
        console.log(product_id)
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
