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


/*
* Description: UPDATE
* Method: @PUT
*/
exports.update = ctrx(async (req,res) => {
    const { ProductPriceTbl } = req.models;
    const { price_id, price, user_id, channel_id } = req.body;
    const result = await ProductPriceTbl.query().patch({
        price_id: price_id,
        price: price,
        user_id: user_id,
        channel_id: channel_id,
        updated_at: new Date().toISOString(),
    }).findById(price_id);

    return res.status(200).json({
        message: "Success",
        result: result
    });
})