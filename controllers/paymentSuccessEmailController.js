const { isDevEnv } = require("../env.js");

exports.getPaymentSuccessEmail = (req, res) => {
  let data;

  if (isDevEnv()) {
    data = require("../data/paymentSuccessDebug.js").paymentSuccess;
    console.log("✅ DEV Mode: Using paymentSuccessDebug.js");
  } else {
    data = req.body.payload;
    console.log("🚀 PROD Mode: Using Request Payload");
  }

  res.render("templates/paymentsuccess/p1", {
    details: data.details,
    config: data.config,
  });
};
