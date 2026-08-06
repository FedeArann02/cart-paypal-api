const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController.js");
const saleDetailController = require("../controllers/saleDetailController.js");
const authenticate = require("../middleware/authenticate.js")

router.post("/", authenticate, saleController.createSale)
router.post("/item", authenticate, saleDetailController.createSaleDetail)

module.exports = router;