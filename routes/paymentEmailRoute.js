// routes/paymentEmailRoutes.js
const express = require("express");
const router = express.Router();
const { getRegistrationEmail } = require("../controllers/paymentEmailController.js");

router.get("/paymentPending/p1", getRegistrationEmail);

module.exports = router;
