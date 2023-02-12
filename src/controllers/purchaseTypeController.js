const Joi = require("joi")
const { updateGen, postGen, ctrx } = require("../helper/crud")

/*
* Description: Get All Or Get One
* Method: @GET
*/
exports.get = ctrx(async (req,res) => {
   const { purchase_type_id }  = req.query
   const {PurchaseTypeTbl} = req.models
   if (purchase_type_id) {
        const result = await PurchaseTypeTbl.query().findById(purchase_type_id)
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
            result: await PurchaseTypeTbl.query(),
        })
    }
})

/*
* Description: Add new
* Method: @POST
*/
exports.insert = postGen({
    purchase_type_name: Joi.string().required(),
    purchase_type_status: Joi.boolean().required()
},"PurchaseTypeTbl",true,true)

/*
* Description: Update
* Method: @PUT
*/
exports.update = updateGen({
    purchase_type_id: Joi.string().required(),
    purchase_type_name: Joi.string().required(),
    purchase_type_status: Joi.boolean().required()
},"PurchaseTypeTbl",true,true)