const { ctrx } = require("../helper/crud")

/*
* Description: Get All Or Get One
* Method: @GET
*/
exports.get = ctrx(async (req,res) => {
    const { BalanceTypeTbl } = req.models
    const { balance_type_id } = req.query
    if (balance_type_id) {
        const result = await BalanceTypeTbl.query().findById(balance_type_id)
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
        result: await BalanceTypeTbl.query(),
    })
})
