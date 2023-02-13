const { ctrx } = require("../helper/crud")

/*
* Description: Get All Or Get One
* Method: @GET
*/
exports.get = ctrx(async (req,res) => {
   const { price_id }  = req.query
   const {ProductPriceTbl} = req.models
   if (price_id) {
        const result = await ProductPriceTbl.query().findById(price_id)
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
            result: await ProductPriceTbl.query(),
        })
    }
})
