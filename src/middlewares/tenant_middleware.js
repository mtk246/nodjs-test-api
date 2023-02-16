const { default: knex } = require("knex");
const DbDataTbl = require("../models/super.public/DbDataTbl");
const BalanceStockTbl = require("../models/BalanceStockTbl");
const ProductCategoryTbl = require("../models/ProductCategoryTbl");
const BalanceTypeTbl = require("../models/BalanceTypeTbl");
const ProductStockTbl = require("../models/ProductStockTbl");
const ProductTbl = require("../models/ProductTbl");
const PriceTbl = require("../models/PriceTbl");
const ProductPriceTbl = require("../models/ProductPriceTbl");
const PackagingTypeTbl = require("../models/PackagingTypeTbl");
const PriceGroupTbl = require("../models/PriceGroupTbl");

const knexCache = new Map();

exports.knexCache = knexCache;

async function getKnexForRequest(req, knexCache) {
  let tenantId = req.user.channel_id;
  let knexInstance = knexCache.get(tenantId);
  if (!knexInstance) {
    knexInstance = knex(await knexConfigForTenant(tenantId));
    knexCache.set(tenantId, knexInstance);
  }
  return knexInstance;
}

async function knexConfigForTenant(tenantId) {
  const result = await DbDataTbl.query().where("channel_id",tenantId)
  if (!result.length) throw new Error("Database Connection Not Found!")
  const connection = result[0]
  const {db_host,db_port,db_name,db_user,db_pass} = connection
  return {
    client: 'pg',
    connection: `postgres://${db_user}:${db_pass}@${db_host}:${db_port}/${db_name}`,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
  };
}
exports.getKnexForRequest = getKnexForRequest

exports.tenantMiddleware = async (req, res,next) => {
  try {
    const knexInstance =await  getKnexForRequest(req, knexCache);
    req.knex = knexInstance
    /*================ Define Models Here ================= */
    req.models = {
      BalanceStockTbl: BalanceStockTbl.bindKnex(knexInstance),
      ProductCategoryTbl: ProductCategoryTbl.bindKnex(knexInstance),
      BalanceTypeTbl: BalanceTypeTbl.bindKnex(knexInstance),
      ProductStockTbl: ProductStockTbl.bindKnex(knexInstance),
      ProductTbl: ProductTbl.bindKnex(knexInstance),
      PriceTbl: PriceTbl.bindKnex(knexInstance),
      ProductPriceTbl: ProductPriceTbl.bindKnex(knexInstance),
      PackagingTypeTbl: PackagingTypeTbl.bindKnex(knexInstance),
      PriceGroupTbl: PriceGroupTbl.bindKnex(knexInstance),
    };
    next();
  } catch(e) {
    console.log(e);
    next(e)
  }
};
