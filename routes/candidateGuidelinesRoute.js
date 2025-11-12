const express = require("express");
const router = express.Router();
const { getCandidateGuidelinesEmail } = require("../controllers/candidateGuidelinesEmailController");

router.get("/candidate-guidelines/c1", getCandidateGuidelinesEmail);
router.post("/candidate-guidelines/c1", getCandidateGuidelinesEmail);

module.exports = router;
