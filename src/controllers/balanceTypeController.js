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

/*
* Description: INSERT
* Method: @POST
*/
exports.insert = ctrx(async (req,res) => {
    const { BalanceTypeTbl } = req.models
    const {
        balance_type,
        balance_status,
        user_id,
        channel_id,
    } = req.body
    const result = await BalanceTypeTbl.query().insert({
        balance_type: balance_type,
        status: balance_status,
        user_id: user_id,
        channel_id: channel_id,
        updated_at: new Date().toISOString(),
    })
    return res.status(200).json({
        message: "Success",
        result: result
    })
});

/*
* Description: UPDATE
* Method: @PUT
*/
exports.update = ctrx(async (req,res) => {
    const { BalanceTypeTbl } = req.models
    const {
        balance_type_id,
        balance_type,
        balance_status,
        user_id,
        channel_id,
    } = req.body
    const result = await BalanceTypeTbl.query().patch({
        balance_type: balance_type,
        status: balance_status,
        user_id: user_id,
        channel_id: channel_id,
        updated_at: new Date().toISOString(),
    }).findById(balance_type_id);

    return res.status(200).json({
        message: "Success",
        result: result
    })
});