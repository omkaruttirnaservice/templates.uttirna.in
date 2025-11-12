const { isDevEnv } = require("../utility.js");

exports.getOtpEmail = (req, res) => {
  let data;

  if (isDevEnv()) {
    data = require("../data/otpDebug.js").otp;
    console.log("✅ DEV mode: Using otpDebug.js");
  } else {
    data = req.body.payload;
    console.log("🚀 PROD mode: Using payload");
  }

  if (isDevEnv()) {
    res.render("templates/otp/O1", {
      details: data.details,
      config: data.config,
    });
  } else {
    res.render("templates/otp/O1", {
      details: data.details,
      config: data.config,
    }, (err, html) => {
      return res.status(200).send(html);
    });
    // res.render(page, object, cb)
  }
};
