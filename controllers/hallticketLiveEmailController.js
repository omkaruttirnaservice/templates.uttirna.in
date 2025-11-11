const { isDevEnv } = require("../env.js");

exports.getHallticketLiveEmail = (req, res) => {
  let data;

  if (isDevEnv()) {
    data = require("../data/hallticketLiveDebug.js").hallticketLive;
    console.log("✅ DEV Mode: Using hallticketLiveDebug.js");
  } else {
    data = req.body.payload;
    console.log("🚀 PROD Mode: Using Request Payload");
  }

  res.render("templates/live/l1", {
    details: data.details,
    config: data.config,
  });
};
