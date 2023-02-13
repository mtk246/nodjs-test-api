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
