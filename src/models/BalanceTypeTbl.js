const { Model } = require("objection");
const uuid = require("uuid")

const TABLE_NAME = "sch_stock_management.balance_type_tbl";
const TABLE_ID = "balance_type_id";

class BalanceTypeTbl extends Model {
    static get tableName() {
        return TABLE_NAME;
    }
    static get idColumn() {
        return TABLE_ID;
    }
    $beforeInsert() {
        if(!this[TABLE_ID]) {
            this[TABLE_ID] = uuid.v4()
        }
        this.created_at = new Date().toISOString();
    }
    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }
}
module.exports = BalanceTypeTbl;