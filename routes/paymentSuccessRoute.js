const express = require("express");
const router = express.Router();
const { getPaymentSuccessEmail } = require("../controllers/paymentSuccessEmailController");

router.get("/paymentsuccess/p1", getPaymentSuccessEmail);

module.exports = router;
