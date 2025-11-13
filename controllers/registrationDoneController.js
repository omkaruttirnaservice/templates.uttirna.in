// controllers/registrationEmailController.js
const { isDevEnv } = require("../utility.js");

exports.getRegistrationEmail = (req, res) => {
  try {
    console.log("🔍 Current ENV:", process.env.NODE_ENV);
    console.log("HTTP method:", req.method);
    console.log("req.body present?", !!req.body);

    let emailData;

    if (isDevEnv()) {
      console.log("✅ DEV MODE: Using local registrationDoneDebug.js data");
      emailData = require("../data/registrationDoneDebug.js");
    } else {
      console.log("🚀 PROD MODE: Using payload data from request body (POST required)");
      if (req.method === "POST") {
        emailData = req.body && req.body.payload;
      } else {
        if (req.query && req.query.debug === "true") {
          console.log("GET + debug=true -> using local debug data");
          emailData = require("../data/registrationDoneDebug.js");
        } else {
          return res.status(400).send("Send a POST with JSON payload or add ?debug=true for dev sample.");
        }
      }
    }

    if (!emailData) {
      console.warn("No registration email data found in request");
      return res.status(400).send("❌ No data found in payload");
    }

    if (isDevEnv()) {
      res.render("templates/registrationDone/r1", {
        details: emailData.details, // Name & credentials
        s3BucketUrl: emailData.s3BucketUrl, // optional
      });
    } else {
      res.render("templates/registrationDone/r1", {
        details: emailData.details, // Name & credentials
        s3BucketUrl: emailData.s3BucketUrl, // optional
      }, (err, html) => {
        if (err) {
          console.error("❌ EJS Render Error:", err);
          return res.status(500).send("EJS Template Render Failed: " + (err.message || err));
        }
        return res.status(200).send(html);
      });
    }
  } catch (error) {
    console.error("💥 Error in getRegistrationEmail (registrationDone):", error);
    res.status(500).send("Internal Server Error: " + (error.message || ""));
  }
};
