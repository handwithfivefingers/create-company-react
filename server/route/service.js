const express = require("express");

const { upload, requireSignin } = require("../middleware/index");
const { sendmailWithAttachments } = require("../controller/sendmail");
const router = express.Router();

router.post("/sendmail", upload.array("attachments", 5), sendmailWithAttachments);

module.exports = router;
