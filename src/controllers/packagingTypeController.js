const { ctrx } = require("../helper/crud");
require('dotenv').config();
const { createPool, query } = require("../config/pg_connection");
const { response } = require("../helper/response");

/*
* Description: Get List PackagingType (include only packaging_type_id and packaging_type)
* Method: @GET
*/
exports.listPackagingType = ctrx(async (req,res) => {
    const channel_id = req.user.channel_id;
    const pool = createPool(channel_id);

    const rows = await query (
        pool,
        `SELECT packaging_type_id, packaging_type FROM sch_stock_management.packaging_type_tbl`,
    );
    
    response(res, rows);
})