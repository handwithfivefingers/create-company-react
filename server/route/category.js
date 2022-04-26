const express = require("express");
const { upload, requireSignin } = require("../middleware/index");
const { getCategories } = require("../controller/category");

const router = express.Router();

//Get
router.get("/category", requireSignin, upload.none(), getCategories);


// get by ID
// router.get("/product/:id", requireSignin, upload.none(), getProductById);

module.exports = router;
