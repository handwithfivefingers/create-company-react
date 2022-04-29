const express = require("express");

const { upload, requireSignin } = require("../middleware/index");
const { sendmailWithAttachments } = require("../controller/sendmail");
const { handlePayment } = require("../controller/service/payment");
const router = express.Router();

router.post("/sendmail", upload.array("attachments", 5), sendmailWithAttachments);

router.post("/payment", upload.none(), handlePayment);

module.exports = router;
