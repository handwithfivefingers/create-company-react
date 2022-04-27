const express = require("express");
const { upload, requireSignin } = require("./../middleware/index");
const { getOrders, getOrderBySlug } = require("../controller/order");
const { createOrders, getOrdersFromUser, orderWithPayment } = require("../controller/admin/order");

const router = express.Router();
// admin
router.post("/admin/order", requireSignin, upload.none(), getOrders);

router.get("/admin/order/:id", requireSignin, upload.none(), getOrderBySlug);

//create and payment
router.post("/order/create/payment", requireSignin, upload.none(), orderWithPayment);
//create
router.post("/order/create", requireSignin, upload.none(), createOrders);
//get
router.get("/order", requireSignin, upload.none(), getOrdersFromUser);

module.exports = router;
