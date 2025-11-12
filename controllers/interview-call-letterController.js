// controllers/interviewCallLetterController.js
const { isDevEnv } = require("../utility.js");

exports.getInterviewCallLetter = (req, res) => {
  let letterData;

  if (isDevEnv()) {
    // In dev mode: use local debug data file
    letterData = require("../data/interview-call-letterDebug.js").callLetter;
    console.log("Interview Call Letter Details:", letterData);
    console.log("✅ DEV mode: Using local interview-call-letterDebug.js data");
  } else {
    // In production: take data from request payload
    letterData = req.body.payload;
    console.log("🚀 PROD mode: Using data from payload");
  }

  // Render the EJS template — adjust the path to match your file inside /views
  // Example: views/l1.ejs or views/templates/il/l1.ejs
  if (isDevEnv()) {
    res.render("templates/il/l1", {
      config: letterData.config,
      details: letterData.details,
      s3BucketUrl: letterData.s3BucketUrl,
    });
  } else {
    res.render("templates/il/l1", {
      config: letterData.config,
      details: letterData.details,
      s3BucketUrl: letterData.s3BucketUrl,
    }, (err, html) => {
      return res.status(200).send(html);
    });
    // res.render(page, object, cb)
  }
};
