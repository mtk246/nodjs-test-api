const { ctrx } = require("../helper/crud");

/*
* Description: Get List PriceGroup (include only price_gp_id and price_gp_name)
* Method: @GET
*/
exports.listPriceGroup = ctrx(async (req,res) => {
    const { PriceGroupTbl } = req.models
    return res.status(200).json({
        message: "Success",
        result: await PriceGroupTbl.query().select("price_gp_id","price_gp_name")
    })
})