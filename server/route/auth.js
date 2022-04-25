const express = require("express");
const { upload, requireSignin } = require("./../middleware/index");
const { signUp, signIn, authenticate } = require("../controller/auth");

const router = express.Router();

// Create User
router.post("/register", upload.none(), signUp);
//login
router.post("/login", upload.none(), signIn);

//authenticate
router.post("/auth", requireSignin, authenticate);

module.exports = router;
