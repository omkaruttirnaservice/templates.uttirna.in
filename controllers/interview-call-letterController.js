// controllers/interviewCallLetterController.js
const { isDevEnv } = require("../utility.js");

exports.getInterviewCallLetter = (req, res) => {
  try {
    console.log("🔍 Current ENV:", process.env.NODE_ENV);
    console.log("HTTP method:", req.method);
    console.log("req.body present?", !!req.body);

    let letterData;

    if (isDevEnv()) {
      console.log("✅ DEV MODE: Using local interview-call-letterDebug.js data");
      letterData = require("../data/interview-call-letterDebug.js").callLetter;
    } else {
      console.log("🚀 PROD MODE: Using payload data from request body (POST required)");
      if (req.method === "POST") {
        letterData = req.body && req.body.payload;
      } else {
        if (req.query && req.query.debug === "true") {
          console.log("GET + debug=true -> using local debug data");
          letterData = require("../data/interview-call-letterDebug.js").callLetter;
        } else {
          return res.status(400).send("Send a POST with JSON payload or add ?debug=true for dev sample.");
        }
      }
    }

    if (!letterData) {
      console.warn("No interview call letter data found in request");
      return res.status(400).send("❌ No data found in payload");
    }

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
        if (err) {
          console.error("❌ EJS Render Error:", err);
          return res.status(500).send("EJS Template Render Failed: " + (err.message || err));
        }
        return res.status(200).send(html);
      });
    }
  } catch (error) {
    console.error("💥 Error in getInterviewCallLetter:", error);
    res.status(500).send("Internal Server Error: " + (error.message || ""));
  }
};
