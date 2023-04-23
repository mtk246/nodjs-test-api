const { ctrx } = require("../helper/crud");
require('dotenv').config();
const { createPool, query } = require("../config/pg_connection");
const { response } = require("../helper/response");

/*
* Description: Get List PriceGroup (include only price_gp_id and price_gp_name)
* Method: @GET
*/
exports.listPriceGroup = ctrx(async (req,res) => {
    const channel_id = req.user.channel_id;
    const pool = createPool(channel_id);

    const rows = await query(
        pool,
        `SELECT price_gp_id, price_gp_name FROM sch_stock_management.price_gp_tbl`,
    );

    response(res, rows);
})