const Joi = require("joi")
const { updateGen, postGen, ctrx } = require("../helper/crud")
const { DB } = require("../helper/db_helper");

/*
* Description: Get All Or Get One
* Method: @GET
*/
exports.get = ctrx(async (req,res) => {
   const { cat_id }  = req.query
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
        })
    }
})

/*
* Description: Add new
* Method: @POST
*/
exports.insert = postGen({
    shop_name: Joi.string().required(),
    township_id: Joi.string().required(),
    city_id: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    note: Joi.string().optional(),
    status: Joi.boolean().required()
},"PurchaseShopTbl",true,true)

/*
* Description: Update
* Method: @PUT
*/
exports.update = updateGen({
    purchase_shop_id: Joi.string().required(),
    shop_name: Joi.string().required(),
    township_id: Joi.string().required(),
    city_id: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    note: Joi.string().optional(),
    status: Joi.boolean().required()
},"PurchaseShopTbl",true,true)