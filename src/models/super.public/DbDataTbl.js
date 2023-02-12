const { Model } = require("objection");
const uuid = require("uuid")

const TABLE_NAME = "public.db_data_tbl";
const TABLE_ID = "db_id";

class DbDataTbl extends Model {
    static get tableName() {
        return TABLE_NAME;
    }
    static get idColumn() {
        return TABLE_ID;
    }
    $beforeInsert() {
        this[TABLE_ID] = uuid.v4()
        this.created_at = new Date().toISOString();
    }
    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }
}
module.exports = DbDataTbl;