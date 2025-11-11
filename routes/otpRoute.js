const express = require("express");
const router = express.Router();
const { getOtpEmail } = require("../controllers/otpEmailController");

router.get("/otp/O1", getOtpEmail);

module.exports = router;
