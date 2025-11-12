const { isDevEnv } = require("../utility.js");

exports.getHallticketLiveEmail = (req, res) => {
  let data;

  if (isDevEnv()) {
    data = require("../data/hallticketLiveDebug.js").hallticketLive;
    console.log("✅ DEV Mode: Using hallticketLiveDebug.js");
  } else {
    data = req.body.payload;
    console.log("🚀 PROD Mode: Using Request Payload");
  }

  if (isDevEnv()) {
    res.render("templates/live/l1", {
      details: data.details,
      config: data.config,
    });
  } else {
    res.render("templates/live/l1", {
      details: data.details,
      config: data.config,
    }, (err, html) => {
      return res.status(200).send(html);
    });
    // res.render(page, object, cb)
  }
};
