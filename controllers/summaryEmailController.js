const { isDevEnv } = require("../utility.js");

exports.getSummaryEmail = (req, res) => {
  let data;

  if (isDevEnv()) {
    data = require("../data/summaryDebug.js").summary;
    console.log("✅ DEV Mode: Using summaryDebug.js");
  } else {
    data = req.body.payload;
    console.log("🚀 PROD Mode: Using Request Payload");
  }

  if (isDevEnv()) {
    res.render("templates/summary/s1", {
      details: data.details,
      config: data.config,
    });
  } else {
    res.render("templates/summary/s1", {
      details: data.details,
      config: data.config,
    }, (err, html) => {
      return res.status(200).send(html);
    });
    // res.render(page, object, cb)
  }
};

