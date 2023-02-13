const { ctrx } = require("../helper/crud")

/*
* Description: Get All Or Get One
* Method: @GET
*/
exports.get = ctrx(async (req,res) => {
   const { balance_id }  = req.query
   const {BalanceStockTbl} = req.models
   if (balance_id) {
        const result = await BalanceStockTbl.query().findById(balance_id)
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
            result: await BalanceStockTbl.query(),
        })
    }
})
