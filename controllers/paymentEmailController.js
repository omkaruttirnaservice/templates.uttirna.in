// controllers/paymentEmailController.js
const { isDevEnv } = require("../utility.js");

exports.getRegistrationEmail = (req, res) => {
  let paymentData;

  if (isDevEnv()) {
    paymentData = require("../data/paymentPendingdebug.js").payment;
    console.log("✅ DEV mode: Using paymentPendingdebug.js data");
  } else {
    paymentData = req.body.payload;
    console.log("🚀 PROD mode: Using data from payload");
  }

  if (isDevEnv()) {
    res.render("templates/paymentPending/p1", {
      details: paymentData, // ✅ matches EJS
    });
  } else {
    res.render("templates/paymentPending/p1", {
      details: paymentData, // ✅ matches EJS
    }, (err, html) => {
      return res.status(200).send(html);
    });
    // res.render(page, object, cb)
  }
};
