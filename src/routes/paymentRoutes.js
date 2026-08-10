const express = require("express");
const router = express.Router();
const paypalController = require("../controllers/paypalController");
const authenticate = require("../middleware/authenticate");
const { rpc } = require("../config/supabase");

router.post("/create", authenticate, paypalController.createPayment)
router.get("/success/:sale_id", authenticate, paypalController.executePayment)

module.exports = router