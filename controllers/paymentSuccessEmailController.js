const { isDevEnv } = require("../utility.js");

exports.getPaymentSuccessEmail = (req, res) => {
  let data;

  if (isDevEnv()) {
    data = require("../data/paymentSuccessDebug.js").paymentSuccess;
    console.log("✅ DEV Mode: Using paymentSuccessDebug.js");
  } else {
    data = req.body.payload;
    console.log("🚀 PROD Mode: Using Request Payload");
  }

  if (isDevEnv()) {
    res.render("templates/paymentsuccess/p1", {
      details: data.details,
      config: data.config,
    });
  } else {
    res.render("templates/paymentsuccess/p1", {
      details: data.details,
      config: data.config,
    }, (err, html) => {
      return res.status(200).send(html);
    });
    // res.render(page, object, cb)
  }
};
