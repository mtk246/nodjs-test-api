const { ctrx } = require("../helper/crud")
const { DB } = require("../helper/db_helper");
const uuid = require("uuid");

/*
* Description: Get All Or Get One
* Method: @GET
*/
exports.get = ctrx(async (req,res) => {
   const { cat_id }  = req.query;
   const {ProductCategoryTbl} = req.models
    if (cat_id) {
        const result = await ProductCategoryTbl.query().findById(cat_id)
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
            result: await new DB(req, `SELECT * FROM sch_stock_management.product_category_tbl`).find()
        });
    }
});

/*
* Description: POST Category By Shop
* Method: @POST
*/
exports.getCategoryByShop = ctrx(async (req,res) => {
    const { shop_id }  = req.body;
    const query = await new DB(req,
        `SELECT * FROM sch_stock_management.product_category_tbl
        INNER JOIN sch_purchase_management.purchase_shop_tbl ON purchase_shop_tbl.purchase_shop_id = product_category_tbl.purchase_shop_id
        WHERE product_category_tbl.purchase_shop_id='${shop_id}'`).find();
    
    return res.status(200).json({
        message: "Success",
        result: await query,
    });
})

/*
* Description: Add new
* Method: @POST
*/
exports.insert = ctrx(async (req,res) => {
    const { ProductCategoryTbl } = req.models
    const { cat_name, user_id, channel_id} = req.body
    const result = await ProductCategoryTbl.query().insert({
        cat_id: uuid.v4(),
        cat_name: cat_name,
        user_id: user_id,
        channel_id: channel_id,
        created_at: new Date().toISOString()
    })

    return res.status(200).json({
        message: "Success",
        result: result
    })
})

/*
* Description: Update
* Method: @PUT
*/
exports.update = ctrx(async (req,res) => {
    const { ProductCategoryTbl } = req.models
    const { cat_id, cat_name, user_id, channel_id} = req.body
    const result = await ProductCategoryTbl.query().patch({
        cat_name: cat_name,
        user_id: user_id,
        channel_id: channel_id,
        updated_at: new Date().toISOString()
    }).findById(cat_id);

    return res.status(200).json({
        message: "Success",
        result: result
    })
})