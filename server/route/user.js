const express = require("express");
const { upload, requireSignin } = require("./../middleware/index");
const { fetchUser, deleteUser } = require("../controller/admin/user");
const router = express.Router();

router.get("/admin/user", requireSignin, fetchUser);

router.post("/admin/delete/:id", requireSignin, deleteUser);

// router.get("//:id", requireSignin, getOrderBySlug);
module.exports = router;
