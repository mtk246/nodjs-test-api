const { Model } = require("objection");
const uuid = require("uuid")

const TABLE_NAME = "sch_purchase_management.purchase_bill_tbl";
const TABLE_ID = "purchase_bill_id";

class PurchaseBillTbl extends Model {
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
module.exports = PurchaseBillTbl;