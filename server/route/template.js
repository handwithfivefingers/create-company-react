const express = require("express");
const { upload, requireSignin } = require("./../middleware/index");
const { fetchTemplate } = require("../controller/admin/template");
const router = express.Router();

router.get("/admin/template", requireSignin, fetchTemplate);

// router.get("//:id", requireSignin, getOrderBySlug);
module.exports = router;
