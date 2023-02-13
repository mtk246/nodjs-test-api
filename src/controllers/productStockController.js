const { ctrx } = require("../helper/crud")

/*
* Description: Get All Or Get One
* Method: @GET
*/
exports.get = ctrx(async (req,res) => {
   const { product_stock_id }  = req.query
   const {ProductStockTbl} = req.models
   if (product_stock_id) {
        const result = await ProductStockTbl.query().findById(product_stock_id)
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
            result: await ProductStockTbl.query(),
        })
    }
})
