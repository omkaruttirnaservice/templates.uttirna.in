const { isDevEnv } = require("../env.js");

exports.getSummaryEmail = (req, res) => {
  let data;

  if (isDevEnv()) {
    data = require("../data/summaryDebug.js").summary;
    console.log("✅ DEV Mode: Using summaryDebug.js");
  } else {
    data = req.body.payload;
    console.log("🚀 PROD Mode: Using Request Payload");
  }

  res.render("templates/summary/s1", {
    details: data.details,
    config: data.config,
  });
};

