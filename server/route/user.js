const express = require("express");
const { upload, requireSignin } = require("./../middleware/index");
const { fetchUser } = require("../controller/admin/user");
const router = express.Router();

router.get("/admin/user", requireSignin, fetchUser);

// router.get("//:id", requireSignin, getOrderBySlug);
module.exports = router;
