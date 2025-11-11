const { isDevEnv } = require("../env.js");

exports.getOtpEmail = (req, res) => {
  let data;

  if (isDevEnv()) {
    data = require("../data/otpDebug.js").otp;
    console.log("✅ DEV mode: Using otpDebug.js");
  } else {
    data = req.body.payload;
    console.log("🚀 PROD mode: Using payload");
  }

  res.render("templates/otp/O1", {
    details: data.details,
    config: data.config,
  });
};
