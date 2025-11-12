const { isDevEnv } = require("../utility.js");

exports.getApplicationPrint = (req, res) => {
  let data;

  if (isDevEnv()) {
    data = require("../data/applicationPrintDebug.js").applicationPrint;
    console.log("✅ DEV Mode: Using applicationPrintDebug.js");
  } else {
    data = req.body.payload;
    console.log("🚀 PROD Mode: Using Request Payload");
  }

  if (isDevEnv()) {
    res.render("templates/applicationStu/a1", {
      preview_data: data.preview_data,
      p: data.p,
      todaysDate: data.todaysDate,
      s3BucketUrl: data.s3BucketUrl,
    });
  } else {
    res.render(
      "templates/applicationStu/a1",
      {
        preview_data: data.preview_data,
        p: data.p,
        todaysDate: data.todaysDate,
        s3BucketUrl: data.s3BucketUrl,
      },
      (err, html) => {
        if (err) {
          
          return res.status(500).send("Render failed");
        }
        return res.status(200).send(html);
      }
    );
  }
};
