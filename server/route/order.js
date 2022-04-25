const express = require("express");
const { upload, requireSignin } = require("./../middleware/index");
const { getOrders, getOrderBySlug } = require("../controller/order");
const router = express.Router();

router.get("/order", requireSignin, getOrders);
router.get("/order/:id", requireSignin, getOrderBySlug);
module.exports = router;
