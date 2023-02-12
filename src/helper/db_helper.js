class DB {
    constructor(req,query) {
        this.query = query
        this.req = req
        console.log("Query >> ",query)
    }
    // find only one if not found return null
    async findOne() {
        const data = await this.req.knex.raw(this.query)
        return data.rows[0] || null
    }
    // find only one 
    async find() {
        const data = await this.req.knex.raw(this.query)
        return data.rows
    }
    async insert() {
        // TODO: return true or false to check if successfully inserted
        const data = await this.req.knex.raw(this.query)
        return data.rows
    }
    async update() {
        // TODO: return updated count
        const data = await this.req.knex.raw(this.query)
        return data.rows
    }
}
exports.DB = DB
