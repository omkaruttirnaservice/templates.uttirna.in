const express = require("express");
const router = express.Router();
const { getHallticketLiveEmail } = require("../controllers/hallticketLiveEmailController");

router.get("/live/l1", getHallticketLiveEmail);
router.post("/live/l1", getHallticketLiveEmail);

module.exports = router;
