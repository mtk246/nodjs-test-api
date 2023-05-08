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
    const { price_id }  = req.query;

    let rows = null;

    if (price_id) {
        rows = await query(
            pool,
            `SELECT * FROM sch_stock_management.price_tbl WHERE price_id = $1`,
            [price_id],
        );
    } else {
        rows = await query(
            pool,
            `SELECT * FROM sch_stock_management.price_tbl`,
        );
    }

    response(res, rows);
})

/*
* Description: UPDATE
* Method: @PUT
*/
exports.update = ctrx(async (req, res) => {
    const channel_id = req.user.channel_id;
    const pool = createPool(channel_id);
    const { price_id, price }  = req.body;

    const obj = {
        price_id: price_id,
        price: price,
        user_id: req.user.user_id,
        channel_id: channel_id,
        updated_at: new Date().toISOString(),
    };

    await query(
        pool,
        `UPDATE sch_stock_management.price_tbl SET price=$1, user_id=$2, channel_id=$3, updated_at=$4 WHERE price_id = $5`,
        [
            obj.price,
            obj.user_id,
            obj.channel_id,
            obj.updated_at,
            obj.price_id,
        ],
    );

    response(res, obj);
})