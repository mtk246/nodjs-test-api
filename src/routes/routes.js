/** Define All Routes In This File */

const helloHandler = require("../controllers/hello_controller");
const { authCheck } = require("../middlewares/jwt_middleware");
const productCategoryController = require("../controllers/productCategoryController");
const productPriceController = require("../controllers/productPriceController");
const productController = require("../controllers/productController");
const productStockController = require("../controllers/productStockController");
const balanceTypeController = require("../controllers/balanceTypeController");
const balanceStockController = require("../controllers/balanceStockController");
const packagingTypeController = require("../controllers/packagingTypeController");
const priceGroupController = require("../controllers/priceGroupController");
const excelController = require("../controllers/excelController");
const publicController = require("../controllers/publicController");

const router = require("express").Router();

 // public Routes
//router.post("/login/:channel_id",userController.login)
router.get("/", helloHandler.hello);
router.post('/public/upload/:table_name', excelController.publicStock);
router.get('/public/:table_name', publicController.get);
router.put('/public/:table_name', publicController.update);

router.use(authCheck);  // Pass through permission handler api!

router.get("/list/product", productController.listProducts);
router.get("/list/packagingType", packagingTypeController.listPackagingType);
router.get("/list/priceGroup", priceGroupController.listPriceGroup);

router.get("/product/category", productCategoryController.get);
router.post("/product/categoryByShop", productCategoryController.getCategoryByShop);
router.post("/product/category", productCategoryController.insert);
router.put("/product/category", productCategoryController.update);

router.get("/product/price", productPriceController.get);
router.put("/product/price", productPriceController.update);

router.get("/product", productController.get);
// router.put("/product", productController.update);
router.post("/product/productsByShop", productController.getProductsByShop);

router.get("/product/stock", productStockController.get);

router.get("/balance/type", balanceTypeController.get);
router.post("/balance/type", balanceTypeController.insert);
router.put("/balance/type", balanceTypeController.update);

router.get("/balance/stock", balanceStockController.get);

exports.api_router = router;
