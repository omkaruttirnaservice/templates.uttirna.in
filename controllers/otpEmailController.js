const { isDevEnv } = require("../utility.js");

exports.getOtpEmail = (req, res) => {
  try {
    console.log("🔍 Current ENV:", process.env.NODE_ENV);
    console.log("HTTP method:", req.method);
    console.log("req.body present?", !!req.body);

    let data;

    if (isDevEnv()) {
      console.log("✅ DEV MODE: Using local otpDebug.js data");
      data = require("../data/otpDebug.js").otp;
    } else {
      console.log("🚀 PROD MODE: Using payload data from request body (POST required)");
      if (req.method === "POST") {
        data = req.body && req.body.payload;
      } else {
        if (req.query && req.query.debug === "true") {
          console.log("GET + debug=true -> using local debug data");
          data = require("../data/otpDebug.js").otp;
        } else {
          return res.status(400).send("Send a POST with JSON payload or add ?debug=true for dev sample.");
        }
      }
    }

    if (!data) {
      console.warn("No OTP data found in request");
      return res.status(400).send("❌ No data found in payload");
    }

    if (isDevEnv()) {
      res.render("templates/otp/O1", {
        details: data.details,
        config: data.config,
      });
    } else {
      res.render("templates/otp/O1", {
        details: data.details,
        config: data.config,
      }, (err, html) => {
        if (err) {
          console.error("❌ EJS Render Error:", err);
          return res.status(500).send("EJS Template Render Failed: " + (err.message || err));
        }
        return res.status(200).send(html);
      });
    }
  } catch (error) {
    console.error("💥 Error in getOtpEmail:", error);
    res.status(500).send("Internal Server Error: " + (error.message || ""));
  }
};
