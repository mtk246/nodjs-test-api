const Joi = require("joi")
const { updateGen, postGen, ctrx } = require("../helper/crud")

/*
* Description: Get All Or Get One
* Method: @GET
*/
exports.get = ctrx(async (req,res) => {
   const { purchase_bill_id }  = req.query
   const {PurchaseBillTbl} = req.models
   if (purchase_bill_id) {
        const result = await PurchaseBillTbl.query().findById(purchase_bill_id)
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
            result: await PurchaseBillTbl.query(),
        })
    }
})

/*
* Description: Add new
* Method: @POST
*/
exports.insert = postGen({
    purchase_total_amount: Joi.number().required(),
    purchase_bill_status: Joi.boolean().required(),
    purchase_shop_id: Joi.string().required(),
    note: Joi.string().optional()
},"PurchaseBillTbl",true,true)

/*
* Description: Update
* Method: @PUT
*/
exports.update = updateGen({
    purchase_bill_id: Joi.string().required(),
    purchase_total_amount: Joi.number().required(),
    purchase_bill_status: Joi.boolean().required(),
    purchase_shop_id: Joi.string().required(),
    note: Joi.string().optional()
},"PurchaseBillTbl",true,true)