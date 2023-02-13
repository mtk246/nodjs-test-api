const { ctrx } = require("../helper/crud")

/*
* Description: Get List Product (include only product_id and product_name)
* Method: @GET
*/
exports.listProducts = ctrx(async (req,res) => {
    const { ProductTbl } = req.models
    return res.status(200).json({
        message: "Success",
        result: await ProductTbl.query().select("product_id","product_name")
    })
})

/*
* Description: Get Product
* Method: @GET
*/
exports.get = ctrx(async (req,res) => {
    const { ProductTbl } = req.models
    const { product_id } = req.query
    if (product_id) {
        const result = await ProductTbl.query().findById(product_id)
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
    }
    return res.status(200).json({
        message: "Success",
        result: await ProductTbl.query(),
    })
})