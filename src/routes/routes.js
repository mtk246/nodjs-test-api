/** Define All Routes In This File */

const helloHandler = require("../controllers/hello_controller");
const publicController = require("../controllers/publicController");

const router = require("express").Router();

// public Routes
router.get("/", helloHandler.hello);
router.get('/user', publicController.get);

exports.api_router = router;
