const { ctrx } = require("../helper/crud");
require('dotenv').config();
const { createPool, query } = require("../config/pg_connection");
const { response } = require("../helper/response");

/*
* Description: Get All Or Get One
* Method: @GET
*/
exports.get = ctrx(async (req,res) => {
    const channel_id = req.user.channel_id;
    const pool = createPool(channel_id);
    const { product_stock_id }  = req.query;

    let rows = null;

    if (product_stock_id) {
        rows = await query(
            pool,
            `SELECT * FROM sch_stock_management.product_stock_tbl WHERE product_stock_id = $1`,
            [product_stock_id],
        );
    } else {
        rows = await query(
            pool,
            `SELECT * FROM sch_stock_management.product_stock_tbl`,
        );
    }

    response(res, rows);
})
