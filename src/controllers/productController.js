const { ctrx } = require("../helper/crud");
// const uuid = require("uuid");
require('dotenv').config();
const { createPool, query } = require("../config/pg_connection");
const { response } = require("../helper/response");

/*
* Description: Get List Product (include only product_id and product_name)
* Method: @GET
*/
exports.listProducts = ctrx(async (req,res) => {
    const channel_id = req.user.channel_id;
    const pool = createPool(channel_id);

    const rows = await query(
        pool,
        `SELECT
            p.product_id,
            p.product_name,
            p.init_product_unit,
            p.init_product_qty,
            p.total_product_unit,
            p.total_product_qty,
            p.buy_price,
            p.total_buy_price,
            p.sell_price,
            p.price_id,
            p.cat_id,
            p.packaging_type_id,
            p.price_gp_id,
            p.purchase_shop_id,
            pt.price_type,
            pt.price,
            c.cat_name,
            pack.packaging_type,
            pg.price_gp_name,
            ps.shop_name,
            ps.phone,
            ps.address
        FROM sch_stock_management.product_tbl p
            INNER JOIN sch_stock_management.price_tbl pt ON pt.product_id = p.product_id
            INNER JOIN sch_stock_management.product_category_tbl c ON c.cat_id = p.cat_id
            INNER JOIN sch_stock_management.packaging_type_tbl pack ON pack.packaging_type_id = p.packaging_type_id
            INNER JOIN sch_stock_management.price_gp_tbl pg ON pg.price_gp_id = p.price_gp_id
            INNER JOIN sch_purchase_management.purchase_shop_tbl ps ON ps.purchase_shop_id = p.purchase_shop_id
        ORDER BY p.created_at DESC
        `,
    );

    response(res, rows);
})

/*
* Description: POST Products By Shop
* Method: @POST
*/
exports.getProductsByShop = ctrx(async (req,res) => {
    const channel_id = req.user.channel_id;
    const pool = createPool(channel_id);
    const { shop_id }  = req.body;

    const rows = await query(
        pool,
        `SELECT * FROM sch_stock_management.product_tbl
        INNER JOIN sch_purchase_management.purchase_shop_tbl ON purchase_shop_tbl.purchase_shop_id = product_tbl.purchase_shop_id
        WHERE product_tbl.purchase_shop_id=$1`,
        [shop_id],
    );

    response(res, rows);
})

/*
* Description: Get Product
* Method: @GET
*/
exports.get = ctrx(async (req,res) => {
    const channel_id = req.user.channel_id;
    const pool = createPool(channel_id);
    const { product_id } = req.query;

    let rows = null;

    if (product_id) {
        rows = await query(
            pool,
            `SELECT * FROM sch_stock_management.product_tbl WHERE product_id = $1`,
            [product_id],
        );
    } else {
        rows = await query(
            pool,
            `SELECT * FROM sch_stock_management.product_tbl`,
        );
    }

    response(res, rows);
})

/*
* Description: Update Product
* Method: @PUT
*/
// exports.update = ctrx(async (req,res) => {
//     let {
//         product_id,
//         product_name,
//         product_unit,
//         price_id,
//         price_type,
//         general_price,
//         price_gp_id,
//         price_gp_name,
//         packaging_type_id,
//         packaging_type_name,
//         cat_id,
//         cat_name,
//         user_id,
//         channel_id,
//     } = req.body

//     let new_price_id = null;
//     let new_price_gp_id = null;
//     let new_packaging_type_id = null;
//     let new_cat_id = null;

//     if (price_id === "" || price_id === null) {
//         new_price_id = uuid.v4();
//     }

//     if (price_gp_id === "" || price_gp_id === null) {
//         new_price_gp_id = uuid.v4();
//     }

//     if (packaging_type_id === "" || packaging_type_id === null) {
//         new_packaging_type_id = uuid.v4();
//     }

//     if (cat_id === "" || cat_id === null) {
//         new_cat_id = uuid.v4();
//     }

//     const created_at = new Date().toISOString();
//     const updated_at = new Date().toISOString();

//     if(product_id === "" || product_id === null) {
//         return res.status(400).json({
//             message: "Bad Request"
//         });
//     }

//     let query_1 = null;
//     let result_1 = null;

//     if (price_id === "" || price_id === null) {
//         query_1 = `INSERT INTO sch_stock_management.price_tbl (price_id, product_id, price_type, price, user_id, channel_id, created_at) VALUES (
//             '${new_price_id}',
//             '${product_id}',
//             '${price_type}',
//             '${general_price}',
//             '${user_id}',
//             '${channel_id}',
//             '${created_at}'
//         )`;

//         result_1 = await new DB(req, query_1).insert();

//         if (!result_1) {
//             return res.status(400).json({
//                 message: "Bad Request"
//             });
//         }
//     }

//     let query_2 = null;
//     let result_2 = null;

//     if (price_gp_id === "" || price_gp_id === null) {
//         console.log('price_gp_tbl works');
//         query_2 = `INSERT INTO sch_stock_management.price_gp_tbl (price_gp_id, price_gp_name, user_id, channel_id, created_at) VALUES (
//             '${new_price_gp_id}',
//             '${price_gp_name}',
//             '${user_id}',
//             '${channel_id}',
//             '${created_at}'
//         )`;

//         result_2 = await new DB(req, query_2).insert();

//         if (!result_2) {
//             return res.status(400).json({
//                 message: "Error inserting price_gp_tbl"
//             });
//         }
//     }

//     let query_3 = null;
//     let result_3 = null;

//     if (packaging_type_id === "" || packaging_type_id === null) {
//         query_3 = `INSERT INTO sch_stock_management.packaging_type_tbl (packaging_type_id, packaging_type, user_id, channel_id, created_at) VALUES (
//             '${new_packaging_type_id}',
//             '${packaging_type_name}',
//             '${user_id}',
//             '${channel_id}',
//             '${created_at}'
//         )`;

//         result_3 = await new DB(req, query_3).insert();

//         if (!result_3) {
//             return res.status(400).json({
//                 message: "Error inserting packaging_type_tbl"
//             });
//         }
//     }

//     let query_4 = null;
//     let result_4 = null;

//     if (cat_id === "" || cat_id === null) {
//         query_4 = `INSERT INTO sch_stock_management.product_category_tbl (cat_id, cat_name, user_id, channel_id, created_at) VALUES (
//             '${new_cat_id}',
//             '${cat_name}',
//             '${user_id}',
//             '${channel_id}',
//             '${created_at}'
//         )`;

//         result_4 = await new DB(req, query_4).insert();

//         if (!result_4) {
//             return res.status(400).json({
//                 message: "Error inserting product_category_tbl"
//             });
//         }
//     }

//     let query_5 = null;
//     let result_5 = null;

//     if(price_id === "" || price_id === null) {
//         query_5 = `UPDATE sch_stock_management.product_tbl SET
//             product_name = '${product_name}',
//             product_unit = '${product_unit}',
//             price_id = '${new_price_id}',
//             general_price = '${general_price}',
//             cat_id = '${cat_id}',
//             price_gp_id = '${price_gp_id}',
//             packaging_type_id = '${packaging_type_id}',
//             updated_at = '${updated_at}'
//             WHERE product_id = '${product_id}'
//         `;
//     }

//     if(price_gp_id === "" || price_gp_id === null) {
//         query_5 = `UPDATE sch_stock_management.product_tbl SET
//             product_name = '${product_name}',
//             product_unit = '${product_unit}',
//             price_id = '${price_id}',
//             general_price = '${general_price}',
//             cat_id = '${cat_id}',
//             price_gp_id = '${new_price_gp_id}',
//             packaging_type_id = '${packaging_type_id}',
//             updated_at = '${updated_at}'
//             WHERE product_id = '${product_id}'
//         `;
//     }

//     if(packaging_type_id === "" || packaging_type_id === null) {
//         query_5 = `UPDATE sch_stock_management.product_tbl SET
//             product_name = '${product_name}',
//             product_unit = '${product_unit}',
//             price_id = '${price_id}',
//             general_price = '${general_price}',
//             cat_id = '${cat_id}',
//             price_gp_id = '${price_gp_id}',
//             packaging_type_id = '${new_packaging_type_id}',
//             updated_at = '${updated_at}'
//             WHERE product_id = '${product_id}'
//         `;
//     }

//     if(cat_id === "" || cat_id === null) {
//         query_5 = `UPDATE sch_stock_management.product_tbl SET
//             product_name = '${product_name}',
//             product_unit = '${product_unit}',
//             price_id = '${price_id}',
//             general_price = '${general_price}',
//             cat_id = '${new_cat_id}',
//             price_gp_id = '${price_gp_id}',
//             packaging_type_id = '${packaging_type_id}',
//             updated_at = '${updated_at}'
//             WHERE product_id = '${product_id}'
//         `;
//     }

//     if(price_id !== "" && price_id !== null && price_gp_id !== "" && price_gp_id !== null && packaging_type_id !== "" && packaging_type_id !== null && cat_id !== "" && cat_id !== null) {
//         query_5 = `UPDATE sch_stock_management.product_tbl SET
//             product_name = '${product_name}',
//             product_unit = '${product_unit}',
//             price_id = '${price_id}',
//             general_price = '${general_price}',
//             cat_id = '${cat_id}',
//             price_gp_id = '${price_gp_id}',
//             packaging_type_id = '${packaging_type_id}',
//             updated_at = '${updated_at}'
//             WHERE product_id = '${product_id}'
//         `;
//     }

//     result_5 = await new DB(req, query_5).update();

//     if (result_5) {
//         return res.status(200).json({
//             message: "Success updating product_tbl",
//         });
//     } else {
//         return res.status(400).json({
//             message: "Error updating product_tbl"
//         });
//     }
// })