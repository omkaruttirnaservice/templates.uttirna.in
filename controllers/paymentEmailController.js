// controllers/paymentEmailController.js
const { isDevEnv } = require("../env.js");

exports.getRegistrationEmail = (req, res) => {
  let paymentData;

  if (isDevEnv()) {
    paymentData = require("../data/paymentPendingdebug.js").payment;
    console.log("✅ DEV mode: Using paymentPendingdebug.js data");
  } else {
    paymentData = req.body.payload;
    console.log("🚀 PROD mode: Using data from payload");
  }

  res.render("templates/paymentPending/p1", {
    details: paymentData, // ✅ matches EJS
  });
};
