const { ctrx } = require("../helper/crud");
const uuid = require("uuid");
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
    const { balance_type_id } = req.query;

    let rows = null;

    if (balance_type_id) {
        rows = await query(
            pool,
            `SELECT * FROM sch_stock_management.balance_type_tbl WHERE balance_type_id = $1`,
            [balance_type_id],
        );
    } else {
        rows = await query(
            pool,
            `SELECT * FROM sch_stock_management.balance_type_tbl`,
        );
    }

    response(res, rows);
})

/*
* Description: INSERT
* Method: @POST
*/
exports.insert = ctrx(async (req,res) => {
    const { user_id, channel_id} = req.user;
    const pool = createPool(channel_id);

    const {
        balance_type,
        balance_status,
    } = req.body;
    
    const obj = {
        balance_type_id: uuid.v4(),
        balance_type: balance_type,
        status: balance_status,
        user_id: user_id,
        channel_id: channel_id,
        created_at: new Date().toISOString(),
    };

    await query(
        pool,
        `INSERT INTO sch_stock_management.balance_type_tbl (balance_type_id, balance_type, status, user_id, channel_id, created_at) VALUES ($1, $2, $3, $4, $5, $6)`,
        [
            obj.balance_type_id,
            obj.balance_type,
            obj.status,
            obj.user_id,
            obj.channel_id,
            obj.created_at,
        ],
    );

    response(res, obj);
});

/*
* Description: UPDATE
* Method: @PUT
*/
exports.update = ctrx(async (req,res) => {
    const { user_id, channel_id} = req.user;
    const pool = createPool(channel_id);
    const { 
        balance_type_id,
        balance_type,
        status,
    }  = req.body;

    const obj = {
        balance_type_id: balance_type_id,
        balance_type: balance_type,
        status: status,
        updated_at: new Date().toISOString(),
        user_id: user_id,
        channel_id: channel_id,
    };

    await query(
        pool,
        `UPDATE sch_stock_management.balance_type_tbl SET balance_type=$1, status=$2, updated_at=$3, user_id=$4, channel_id=$5 WHERE balance_type_id=$6`,
        [
            obj.balance_type,
            obj.status,
            obj.updated_at,
            obj.user_id,
            obj.channel_id,
            obj.balance_type_id,
        ],
    );

    response(res, obj);
});