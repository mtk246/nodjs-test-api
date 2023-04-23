const { ctrx } = require("../helper/crud")
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
    const { balance_id } = req.query;
    
    let rows = null;

    if (balance_id) {
        rows = await query(
            pool,
            `SELECT * FROM sch_stock_management.balance_stock_tbl WHERE balance_id = $1`,
            [balance_id],
        );
    } else {
        rows = await query(
            pool,
            `SELECT * FROM sch_stock_management.balance_stock_tbl`,
        );
    }

    response(res, rows);
})