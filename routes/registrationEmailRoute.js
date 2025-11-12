const express = require("express");
const router = express.Router();
const { getRegistrationEmail } = require("../controllers/registrationDoneController");


router.get("/registrationDone/r1", getRegistrationEmail);
router.post("/registrationDone/r1", getRegistrationEmail);

module.exports = router;
