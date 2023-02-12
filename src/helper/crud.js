const Joi = require("joi")

exports.ctrx = (run)=>{
    return async (req,res,next) => {
        try {
            await run(req,res)
        } catch(e) {
            console.log(e)
            next(e)
        }
    }
}

exports.postGen = (JoiSchema,KnexModal,CreatedBy,ChannelId) => {
    return this.ctrx(async (req,res) => {
        const schema = Joi.object(JoiSchema)
        await schema.validateAsync(req.body)

        if(CreatedBy) {
            req.body.user_id = req.user.user_id
        }
        if(ChannelId) {
            req.body.channel_id = req.user.channel_id
        }
    
        await req.models[KnexModal].query().insert(req.body)
    
        return res.status(200).json({
            message: "Insert Success"
        })       
    })
}

exports.updateGen = (JoiSchema,KnexModal,UpdatedBy,ChannelId) => {
    return this.ctrx(async (req,res) => {
        const schema = Joi.object(JoiSchema)
        await schema.validateAsync(req.body)

        if(UpdatedBy) {
            req.body.user_id = req.user.user_id
        }
        
        if(ChannelId) {
            req.body.channel_id = req.user.channel_id
        }
    
        await req.models[KnexModal].query().upsertGraph(req.body)
    
        return res.status(200).json({
            message: "Update Success"
        })       
    })
}