const { ctrx } = require("../helper/crud")
const { DB } = require("../helper/db_helper");
const uuid = require("uuid");

/*
* Description: Get All Or Get One
* Method: @GET
*/
exports.get = ctrx(async (req,res) => {
   const { purchase_id }  = req.query
   const {PurchaseTbl} = req.models
   if (purchase_id) {
        const result = await PurchaseTbl.query().findById(purchase_id)
        if(!result) {
            return res.status(404).json({
                message: "Not Found!"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                result: result
            })
        }
    } else {
        return res.status(200).json({
            message: "Success",
            result: await new DB(req,`SELECT *, sch_stock_management.balance_type_tbl.status AS balance_type_status FROM sch_purchase_management.purchase_tbl
                INNER JOIN sch_purchase_management.purchase_shop_tbl ON purchase_tbl.purchase_shop_id = purchase_shop_tbl.purchase_shop_id
                INNER JOIN sch_purchase_management.purchase_bill_tbl ON purchase_tbl.purchase_bill_id = purchase_bill_tbl.purchase_bill_id
                INNER JOIN sch_purchase_management.purchase_type_tbl ON purchase_type_tbl.purchase_type_id = purchase_bill_tbl.purchase_type_id
                INNER JOIN sch_stock_management.balance_type_tbl ON balance_type_tbl.balance_type_id = purchase_tbl.balance_type_id
                INNER JOIN sch_stock_management.product_tbl ON purchase_tbl.product_id = product_tbl.product_id
                INNER JOIN sch_stock_management.product_stock_tbl ON product_stock_tbl.product_id = purchase_tbl.product_id AND product_stock_tbl.balance_type_id = purchase_tbl.balance_type_id
                INNER JOIN sch_stock_management.balance_stock_tbl ON balance_stock_tbl.balance_type_id = purchase_tbl.balance_type_id AND balance_stock_tbl.product_id = purchase_tbl.product_id
                INNER JOIN sch_stock_management.product_category_tbl ON product_category_tbl.cat_id = product_tbl.cat_id
                INNER JOIN sch_user.user ON purchase_tbl.user_id = sch_user.user.user_id
            `).find()
        })
    }
})

/*
* Description Purchase API
* Method @POST
*/

exports.insert = ctrx(async (req,res)=> {
    const purchase_id = uuid.v4()
    const purchase_bill_id = uuid.v4()
    const product_id = uuid.v4()
    const product_stock_id = uuid.v4()
    const balance_id = uuid.v4()
    const price_id = uuid.v4()
    const purchase_type_id = uuid.v4()
    const purchase_type_id_exist = req.body.purchase_type_id
    const cat_id = uuid.v4()  // if user sending empty value
    const cat_id_exist = req.body.cat_id_exist // user sending existing value
    const balance_type_id = uuid.v4() // if user sending empty value
    const balance_type_id_exist = req.body.balance_type_id // user sending existing value
    const purchase_bill_status = req.body.purchase_bill_status //pending,processing,finished,refun.. etc
    const purchase_shop_id = req.body.purchase_shop_id
    const product_name = req.body.product_name
    const purchase_qty = req.body.purchase_qty
    const purchase_unit = req.body.purchase_unit
    const purchase_total_qty = req.body.purchase_total_qty // Total unit
    const product_price = req.body.product_price // Each product amount
    const purchase_amount = req.body.purchase_amount // Total purchase amount
    const purchase_type_name = req.body.purchase_type_name
    const purchase_type_status = req.body.purchase_type_status
    const note = req.body.note
    const user_id = req.body.user_id
    const channel_id = req.body.channel_id
    const instock_date = req.body.instock_date
    const balance_type = req.body.balance_type
    const balance_status = req.body.balance_status
    const price_type = req.body.price_type
    const cat_name = req.body.cat_name
    const created_at = new Date().toISOString()

    /* Method @POST to purchase_bill_tbl */

    let result_1 = null

    if(purchase_type_id_exist !== '') {
        const query_1 = `INSERT INTO sch_purchase_management.purchase_bill_tbl (purchase_bill_id, purchase_total_amount, purchase_bill_status, purchase_shop_id, created_at, user_id, channel_id, note, purchase_type_id) VALUES ('${purchase_bill_id}', '${purchase_amount}', '${purchase_bill_status}', '${purchase_shop_id}', '${created_at}', '${user_id}', '${channel_id}', '${note}', '${purchase_type_id_exist}')`;

        result_1 = await new DB(req,query_1).insert()
    }

    if(purchase_type_id_exist === '') {
        const query_1 = `INSERT INTO sch_purchase_management.purchase_bill_tbl (purchase_bill_id, purchase_total_amount, purchase_bill_status, purchase_shop_id, created_at, user_id, channel_id, note, purchase_type_id) VALUES ('${purchase_bill_id}', '${purchase_amount}', '${purchase_bill_status}', '${purchase_shop_id}', '${created_at}', '${user_id}', '${channel_id}', '${note}', '${purchase_type_id}')`;

        result_1 = await new DB(req,query_1).insert()
    }

    /* Method @POST to product_stock_tbl */

    let query_2 = null
    let result_2 = null

    if(result_1) {
        if(balance_type_id_exist === '') {
            query_2 = `INSERT INTO sch_stock_management.product_stock_tbl (product_stock_id, product_id, instock, instock_date, created_at, user_id, channel_id, balance_type_id) VALUES ('${product_stock_id}', '${product_id}', '${purchase_total_qty}', '${instock_date}', '${created_at}', '${user_id}', '${channel_id}', '${balance_type_id}')`;
        }
        
        if(balance_type_id_exist !== '') {
            query_2 = `INSERT INTO sch_stock_management.product_stock_tbl (product_stock_id, product_id, instock, instock_date, created_at, user_id, channel_id, balance_type_id) VALUES ('${product_stock_id}', '${product_id}', '${purchase_total_qty}', '${instock_date}', '${created_at}', '${user_id}', '${channel_id}', '${balance_type_id_exist}')`;
        }

        result_2 = await new DB(req,query_2).insert()
    }

    /* Method @POST to balance_stock_tbl */

    let query_3 = null
    let result_3 = null

    if(result_2) {
        query_3 = `INSERT INTO sch_stock_management.balance_stock_tbl (balance_id, product_id, balance, created_at, user_id, note, balance_type_id, channel_id) VALUES ('${balance_id}', '${product_id}', '${purchase_amount}', '${created_at}', '${user_id}', '${note}', '${balance_type_id}', '${channel_id}')`;

        result_3 = await new DB(req,query_3).insert()
    }

    /* Method @POST to price_tbl */
    
    let query_4 = null
    let result_4 = null

    if(result_3) {
        query_4 = `INSERT INTO sch_stock_management.price_tbl (price_id, product_id, price_type, price, created_at, user_id, channel_id) VALUES ('${price_id}', '${product_id}', '${price_type}', '${product_price}', '${created_at}', '${user_id}', '${channel_id}')`;

        result_4 = await new DB(req,query_4).insert()
    }

    /* Method @POST to product_category_tbl */

    let query_5 = null

    if(result_4) {
        if(cat_id_exist === '') {
            query_5 = `INSERT INTO sch_stock_management.product_category_tbl (cat_id, cat_name, created_at, user_id, channel_id) VALUES ('${cat_id}', '${cat_name}', '${created_at}', '${user_id}', '${channel_id}')`;

            await new DB(req,query_5).insert()
        }
    }

    /* Method @POST to product_tbl */

    let query_6 = null
    let result_6 = null

    if(cat_id_exist !== '') {
        query_6 = `INSERT INTO sch_stock_management.product_tbl (product_id, product_name, product_unit, created_at, user_id, price_id, general_price, channel_id, cat_id) VALUES ('${product_id}', '${product_name}', '${purchase_total_qty}', '${created_at}', '${user_id}', '${price_id}', '${purchase_amount}', '${channel_id}', '${cat_id_exist}')`;
    }

    if(cat_id_exist === '') {
        query_6 = `INSERT INTO sch_stock_management.product_tbl (product_id, product_name, product_unit, created_at, user_id, price_id, general_price, channel_id, cat_id) VALUES ('${product_id}', '${product_name}', '${purchase_total_qty}', '${created_at}', '${user_id}', '${price_id}', '${purchase_amount}', '${channel_id}', '${cat_id}')`;
    }

    result_6 = await new DB(req,query_6).insert()

    /* Method @POST to balance_type_tbl */

    let query_7 = null
    let result_7 = null

    if(result_6) {
        if(balance_type_id_exist === '') {
            query_7 = `INSERT INTO sch_stock_management.balance_type_tbl (balance_type_id, balance_type, status, created_at, user_id, channel_id) VALUES ('${balance_type}', '${balance_type}', '${balance_status}', '${created_at}', '${user_id}', '${channel_id}')`;

            result_7 = await new DB(req,query_7).insert()
        }
    }

    /* Method @POST to purchase_type_tbl */

    let query_8 = null
    let result_8 = null

    if(result_7) {
        if(purchase_type_id_exist === '') {
            query_8 = `INSERT INTO sch_purchase_management.purchase_type_tbl (purchase_type_id, purchase_type_name, purchase_type_status, created_at, user_id, channel_id) VALUES ('${purchase_type_id}', '${purchase_type_name}', '${purchase_type_status}', '${created_at}', '${user_id}', '${channel_id}')`;

            result_8 = await new DB(req,query_8).insert()
        }
    }

    /* Method @POST to purchase_tbl */

    let query_9 = ''
    let result_9 = ''

    if(result_8) {
        query_9 = `INSERT INTO sch_purchase_management.purchase_tbl (purchase_id, purchase_bill_id, purchase_shop_id, product_id, product_name, purchase_qty, purchase_unit, purchase_total_qty, product_price, purchase_amount, user_id, note, channel_id, created_at) VALUES ('${purchase_id}', '${purchase_bill_id}', '${purchase_shop_id}', '${product_id}','${product_name}', '${purchase_qty}', '${purchase_unit}', '${purchase_total_qty}', '${product_price}', '${purchase_amount}', '${user_id}', '${note}', '${channel_id}', '${created_at}'})`;

        result_9 = await new DB(req,query_9).insert()
    }

    try {
        if(result_9) {
            return res.status(200).json({
                message: "Success",
                statusCode: 200,
            })
        }
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message,
            statusCode: error.statusCode,
        })
    }
})

/*
* Description: Update
* Method: @PUT
*/
exports.update = ctrx(async (req, res) => {
    const purchase_id = req.body.purchase_id
    const purchase_bill_id = req.body.purchase_bill_id
    const purchase_shop_id = req.body.purchase_shop_id
    const purchase_shop_name = req.body.purchase_shop_name
    const product_id = req.body.product_id
    const product_stock_id = req.body.product_stock_id
    const balance_id = req.body.balance_id
    const balance_type_id = req.body.balance_type_id
    const purchase_type_id = uuid.v4()
    const purchase_type_id_exist = req.body.purchase_type_id_exist
    const purchase_type_name = req.body.purchase_type_name
    const purchase_type_status = req.body.purchase_type_status
    const price_id = req.body.price_id
    const cat_id = uuid.v4()
    const cat_id_exist = req.body.cat_id_exist
    const cat_name = req.body.cat_name
    const product_name = req.body.product_name
    const purchase_qty = req.body.purchase_qty
    const purchase_unit = req.body.purchase_unit
    const purchase_total_qty = req.body.purchase_total_qty
    const product_price = req.body.product_price
    const purchase_amount = req.body.purchase_amount
    const balance_type = req.body.balance_type
    const balance_status = req.body.balance_status  // similar with balance_type_status
    const user_id = req.body.user_id
    const note = req.body.note
    const channel_id = req.body.channel_id
    const purchase_bill_status = req.body.purchase_bill_status
    const instock_date = req.body.instock_date
    const created_at = new Date().toISOString()
    const updated_at = new Date().toISOString()

    /* Method @PUT to purchase_shop_tbl */
    let query = `UPDATE sch_purchase_management.purchase_shop_tbl SET shop_name = '${purchase_shop_name}', updated_at = '${updated_at}' WHERE purchase_shop_id = '${purchase_shop_id}'`;
    await new DB(req,query).update()

    /* Method @PUT to purchase_bill_tbl */

    let query_1 = null
    let result_1 = null

    if(purchase_type_id_exist != '') {
        query_1 = `UPDATE sch_purchase_management.purchase_bill_tbl SET purchase_total_amount = '${purchase_amount}', purchase_bill_status = '${purchase_bill_status}', user_id = '${user_id}', note = '${note}', channel_id = '${channel_id}', updated_at = '${updated_at}', purchase_type_id = '${purchase_type_id_exist}' WHERE purchase_bill_id = '${purchase_bill_id}' AND purchase_shop_id = '${purchase_shop_id}'`;

        result_1 = await new DB(req,query_1).update()
    }

    if(purchase_type_id_exist === '') {
        query_1 = `INSERT INTO sch_purchase_management.purchase_bill_tbl (purchase_bill_id, purchase_total_amount, purchase_bill_status, purchase_shop_id, created_at, user_id, channel_id, note, purchase_type_id) VALUES ('${purchase_bill_id}', '${purchase_amount}', '${purchase_bill_status}', '${purchase_shop_id}', '${created_at}', '${user_id}', '${channel_id}', '${note}', '${purchase_type_id}')`;

        result_1 = await new DB(req,query_1).insert()
    }

    /* Method @PUT to product_stock_tbl */

    let query_2 = null
    let result_2 = null

    if(result_1) {
        query_2 = `UPDATE sch_stock_management.product_stock_tbl SET instock = '${purchase_total_qty}', instock_date = '${instock_date}', user_id = '${user_id}', channel_id = '${channel_id}', updated_at = '${updated_at}' WHERE product_id = '${product_id}' AND product_stock_id = '${product_stock_id}' AND balance_type_id = '${balance_type_id}'`;

        result_2 = await new DB(req,query_2).update()
    }

    /* Method @PUT to balance_stock_tbl */

    let query_3 = null
    let result_3 = null

    if(result_2) {
        query_3 = `UPDATE sch_stock_management.balance_stock_tbl SET balance = '${purchase_total_qty}', user_id = '${user_id}', channel_id = '${channel_id}', updated_at = '${updated_at}' WHERE product_id = '${product_id}' AND balance_id = '${balance_id}' AND balance_type_id = '${balance_type_id}'`;

        result_3 = await new DB(req,query_3).update()
    }

    /* Method @PUT to price_tbl */

    let query_4 = null
    let result_4 = null

    if(result_3) {
        query_4 = `UPDATE sch_stock_management.price_tbl SET price = '${product_price}', user_id = '${user_id}', channel_id = '${channel_id}', updated_at = '${updated_at}' WHERE product_id = '${product_id}' AND price_id = '${price_id}'`;

        result_4 = await new DB(req,query_4).update()
    }

    /* Method @PUT to product_category_tbl */

    let query_5 = null
    let result_5 = null

    if(result_4) {
        if(cat_id_exist !== '') {
            query_5 = `UPDATE sch_stock_management.product_category_tbl SET cat_name = '${cat_name}', user_id = '${user_id}', channel_id = '${channel_id}', updated_at = '${updated_at}' WHERE cat_id = '${cat_id_exist}'`;

            result_5 = await new DB(req,query_5).update()
        }

        if(cat_id_exist === '') {
            query_5 = `INSERT INTO sch_stock_management.product_category_tbl (cat_id, cat_name, created_at, user_id, channel_id) VALUES ('${cat_id}', '${cat_name}', '${created_at}', '${user_id}', '${channel_id}')`;

            result_5 = await new DB(req,query_5).insert()
        }
    }

    /* Method @PUT to product_tbl */

    let query_6 = null
    let result_6 = null

    if(result_5) {
        if(cat_id_exist !== '') {
            query_6 = `UPDATE sch_stock_management.product_tbl SET product_name = '${product_name}', product_unit = '${purchase_total_qty}', general_price = '${purchase_amount}', user_id = '${user_id}', channel_id = '${channel_id}', updated_at = '${updated_at}' WHERE product_id = '${product_id}' AND price_id = '${price_id}' AND cat_id = '${cat_id_exist}'`;

            result_6 = await new DB(req,query_6).update()
        }

        if(cat_id_exist === '') {
            query_6 = `INSERT INTO sch_stock_management.product_tbl (product_id, product_name, product_unit, created_at, user_id, price_id, general_price, channel_id, cat_id) VALUES ('${product_id}', '${product_name}', '${purchase_total_qty}', '${created_at}', '${user_id}', '${price_id}', '${purchase_amount}', '${channel_id}', '${cat_id}')`;

            result_6 = await new DB(req,query_6).insert()
        }
    }

    /* Method @PUT to balance_type_tbl */

    let query_7 = null
    let result_7 = null

    if(result_6) {
        query_7 = `UPDATE sch_stock_management.balance_type_tbl SET balance_type = '${balance_type}', status = '${balance_status}', user_id = '${user_id}', channel_id = '${channel_id}', updated_at = '${updated_at}' WHERE balance_type_id = '${balance_type_id}'`;

        result_7 = await new DB(req,query_7).update()
    }

    /* Method @PUT to purchase_type_tbl */

    let query_8 = null

    if(result_7) {
        if(purchase_type_id_exist === '') {
            query_8 = `INSERT INTO sch_purchase_management.purchase_type_tbl (purchase_type_id, purchase_type_name, purchase_type_status, created_at, user_id, channel_id) VALUES ('${purchase_type_id}', '${purchase_type_name}', '${purchase_type_status}', '${created_at}', '${user_id}', '${channel_id}')`;

            await new DB(req,query_8).insert()
        }
    }

    /* Method @PUT to purchase_tbl */

    let query_9 = null
    let result_9 = null

    
    query_9 = `UPDATE sch_purchase_management.purchase_tbl SET purchase_bill_id = '${purchase_bill_id}', purchase_shop_id = '${purchase_shop_id}', product_id = '${product_id}', product_name = '${product_name}', purchase_qty = '${purchase_qty}', purchase_unit = '${purchase_unit}', purchase_total_qty = '${purchase_total_qty}', product_price = '${product_price}', purchase_amount = '${purchase_amount}', user_id = '${user_id}', note = '${note}', channel_id = '${channel_id}', updated_at = '${updated_at}' WHERE purchase_id = '${purchase_id}'`;

    result_9 = await new DB(req,query_9).update()

    try {
        if(result_9) {
            return res.status(200).json({
                message: "Success",
                statusCode: 200
            })
        }
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message,
            statusCode: error.statusCode,
        })
    }
})