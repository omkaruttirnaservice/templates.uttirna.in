

const express = require("express");
const router = express.Router();
const { getInterviewCallLetter } = require("../controllers/interview-call-letterController");

router.get("/il/l1",  getInterviewCallLetter);

module.exports = router;
