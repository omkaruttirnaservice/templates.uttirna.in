const { isDevEnv } = require("../env.js");

exports.getRegSuccessEmail = (req, res) => {
  let data;

  if (isDevEnv()) {
    data = require("../data/regSuccessDebug.js").regSuccess;
    console.log("✅ DEV Mode: Using regSuccessDebug.js");
  } else {
    data = req.body.payload;
    console.log("🚀 PROD Mode: Using Request Payload");
  }

  res.render("templates//registration-success/r1", {
    details: data.details,
    config: data.config,
  });
};
