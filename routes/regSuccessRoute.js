const express = require("express");
const router = express.Router();
const { getRegSuccessEmail } = require("../controllers/regSuccessEmailController");

router.get("/registration-success/r1", getRegSuccessEmail);

module.exports = router;
