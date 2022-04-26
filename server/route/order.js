const express = require("express");
const { upload, requireSignin } = require("./../middleware/index");
const { getOrders, getOrderBySlug } = require("../controller/order");
const { createOrders, getOrdersFromUser } = require("../controller/admin/order");

const router = express.Router();
// admin
router.get("/admin/order", requireSignin, upload.none(), getOrders);

router.get("/admin/order/:id", requireSignin, upload.none(), getOrderBySlug);

//create
router.get("/order/create", requireSignin, upload.none(), createOrders);
//get
router.get("/order", requireSignin, upload.none(), getOrdersFromUser);

module.exports = router;
