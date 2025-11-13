// controllers/candidateGuidelinesEmailController.js
const { isDevEnv } = require("../utility.js");

exports.getCandidateGuidelinesEmail = (req, res) => {
  try {
    console.log("🔍 Current ENV:", process.env.NODE_ENV);
    console.log("HTTP method:", req.method);
    console.log("req.body present?", !!req.body);

    let letterData;

    if (isDevEnv()) {
      console.log("✅ DEV MODE: Using local candidateGuidelinesdebug.js data");
      letterData = require("../data/candidateGuidelinesdebug.js").candidateGuidelines;
    } else {
      console.log("🚀 PROD MODE: Using payload data from request body (POST required)");
      if (req.method === "POST") {
        letterData = req.body && req.body.payload;
      } else {
        if (req.query && req.query.debug === "true") {
          console.log("GET + debug=true -> using local debug data");
          letterData = require("../data/candidateGuidelinesdebug.js").candidateGuidelines;
        } else {
          return res.status(400).send("Send a POST with JSON payload or add ?debug=true for dev sample.");
        }
      }
    }

    if (!letterData) {
      console.warn("No candidate guidelines data found in request");
      return res.status(400).send("❌ No data found in payload");
    }

    if (isDevEnv()) {
      res.render("templates/candidate-guidelines/c1", {
        details: letterData.details,
        config: letterData.config,
      });
    } else {
      res.render("templates/candidate-guidelines/c1", {
        details: letterData.details,
        config: letterData.config,
      }, (err, html) => {
        if (err) {
          console.error("❌ EJS Render Error:", err);
          return res.status(500).send("EJS Template Render Failed: " + (err.message || err));
        }
        return res.status(200).send(html);
      });
    }
  } catch (error) {
    console.error("💥 Error in getCandidateGuidelinesEmail:", error);
    res.status(500).send("Internal Server Error: " + (error.message || ""));
  }
};
