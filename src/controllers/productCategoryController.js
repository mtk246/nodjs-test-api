const { ctrx } = require("../helper/crud")
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
    const { cat_id }  = req.query;

    let result = null;

    if (cat_id) {
        result = await query(
            pool,
            `SELECT * FROM sch_stock_management.product_category_tbl WHERE cat_id = $1`,
            [cat_id],
        );
    } else {
        result = await query(
            pool,
            `SELECT * FROM sch_stock_management.product_category_tbl`,
        );
    }

    response(res, result);
});

/*
* Description: POST Category By Shop
* Method: @POST
*/
exports.getCategoryByShop = ctrx(async (req,res) => {
    const channel_id = req.user.channel_id;
    const pool = createPool(channel_id);
    const { shop_id }  = req.body;
    
    await query(
        pool,
        `SELECT * FROM sch_stock_management.product_category_tbl
        INNER JOIN sch_purchase_management.purchase_shop_tbl ON purchase_shop_tbl.purchase_shop_id = product_category_tbl.purchase_shop_id
        WHERE product_category_tbl.purchase_shop_id=$1`,
        [shop_id],
    );

    response(res, shop_id);
})

/*
* Description: Add new
* Method: @POST
*/
exports.insert = ctrx(async (req,res) => {
    const channel_id = req.user.channel_id;
    const pool = createPool(channel_id);
    const { cat_name } = req.body;
    const { user_id } = req.user;

    const obj = {
        cat_id: uuid.v4(),
        cat_name: cat_name,
        user_id: user_id,
        channel_id: channel_id,
        created_at: new Date().toISOString(),
    }

    await query(
        pool,
        `INSERT INTO sch_stock_management.product_category_tbl (cat_id, cat_name, user_id, channel_id, created_at) VALUES ($1, $2, $3, $4, $5)`,
        [
            obj.cat_id,
            obj.cat_name,
            obj.user_id,
            obj.channel_id,
            obj.created_at,
        ],
    );
    
    response(res, obj);
})

/*
* Description: Update
* Method: @PUT
*/
exports.update = ctrx(async (req,res) => {
    const channel_id = req.user.channel_id;
    const pool = createPool(channel_id);
    const { cat_id, cat_name } = req.body;
    const { user_id } = req.user;

    const obj = {
        cat_id: cat_id,
        cat_name: cat_name,
        user_id: user_id,
        channel_id: channel_id,
        updated_at: new Date().toISOString(),
    };

    await query(
        pool,
        `UPDATE sch_stock_management.product_category_tbl SET cat_name = $1, user_id = $2, channel_id = $3, updated_at = $4 WHERE cat_id = $5`,
        [
            obj.cat_name,
            obj.user_id,
            obj.channel_id,
            obj.updated_at,
            obj.cat_id,
        ],
    );

    response(res, obj);
})