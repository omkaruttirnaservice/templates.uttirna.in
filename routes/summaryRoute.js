const express = require("express");
const router = express.Router();
const { getSummaryEmail } = require("../controllers/summaryEmailController");

router.get("/summary/s1", getSummaryEmail);
router.post("/summary/s1", getSummaryEmail);

module.exports = router;
        