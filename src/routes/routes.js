/** Define All Routes In This File */

const helloHandler = require("../controllers/hello_controller");
const { authCheck } = require("../middlewares/jwt_middleware");
const { tenantMiddleware } = require("../middlewares/tenant_middleware");
const productCategoryController = require("../controllers/productCategoryController")
const purchaseController = require("../controllers/purchaseController")
// const purchaseBillController = require("../controllers/purchaseBillController")
// const purchaseTypeController = require("../controllers/purchaseTypeController")

const router = require("express").Router();

 // public Routes
//router.post("/login/:channel_id",userController.login)
router.get("/", helloHandler.hello);

router.use(authCheck)  // Pass through permission handler api!

router.use(tenantMiddleware)

router.get("/product/category", productCategoryController.get)
// router.post("/shop",purchaseShopController.insert)
// router.put("/shop",purchaseShopController.update)

router.get("/purchase",purchaseController.get)
// router.post("/purchase",purchaseController.insert)
// router.put("/purchase",purchaseController.update)

// router.get("/bill",purchaseBillController.get)
// router.post("/bill",purchaseBillController.insert)
// router.put("/bill",purchaseBillController.update)

// router.get("/type",purchaseTypeController.get)
// router.post("/type",purchaseTypeController.insert)
// router.put("/type",purchaseTypeController.update)

exports.api_router = router;
