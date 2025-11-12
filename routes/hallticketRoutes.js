// routes/hallticketRoutes.js
const express = require("express");
const router = express.Router();
const { getHallticket } = require("../controllers/hallticketController");

router.get("/ht/t1", getHallticket);
router.post("/ht/t1", getHallticket);

module.exports = router;
