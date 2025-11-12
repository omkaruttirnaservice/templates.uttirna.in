const express = require("express");
const router = express.Router();
const { getApplicationPrint } = require("../controllers/applicationPrintController");

router.get("/applicationStu/a1", getApplicationPrint);
router.post("/applicationStu/a1", getApplicationPrint);

module.exports = router;
