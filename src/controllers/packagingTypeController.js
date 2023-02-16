const { ctrx } = require("../helper/crud");

/*
* Description: Get List PackagingType (include only packaging_type_id and packaging_type)
* Method: @GET
*/
exports.listPackagingType = ctrx(async (req,res) => {
    const { PackagingTypeTbl } = req.models
    return res.status(200).json({
        message: "Success",
        result: await PackagingTypeTbl.query().select("packaging_type_id","packaging_type")
    })
})