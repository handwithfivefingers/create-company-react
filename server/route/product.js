const express = require("express");
const { upload, requireSignin } = require("../middleware/index");
const { getProductById, createProduct, editProduct, fetchProduct, deleteProduct } = require("../controller/product");

const router = express.Router();

// Create
router.post("/product/create", requireSignin, upload.none(), createProduct);

//Edit
router.post("/product/edit/:id", requireSignin, upload.none(), editProduct);

//Get
router.get("/product", requireSignin, upload.none(), fetchProduct);

// Delete
router.delete("/product/:id", requireSignin, upload.none(), deleteProduct);

// get by ID
// router.get("/product/:id", requireSignin, upload.none(), getProductById);

module.exports = router;
