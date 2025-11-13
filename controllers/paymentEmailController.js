// controllers/paymentEmailController.js
const { isDevEnv } = require("../utility.js");

exports.getRegistrationEmail = (req, res) => {
  try {
    console.log("🔍 Current ENV:", process.env.NODE_ENV);
    console.log("HTTP method:", req.method);
    console.log("req.body present?", !!req.body);

    let paymentData;

    if (isDevEnv()) {
      console.log("✅ DEV MODE: Using local paymentPendingdebug.js data");
      paymentData = require("../data/paymentPendingdebug.js").payment;
    } else {
      console.log("🚀 PROD MODE: Using payload data from request body (POST required)");
      if (req.method === "POST") {
        paymentData = req.body && req.body.payload;
      } else {
        if (req.query && req.query.debug === "true") {
          console.log("GET + debug=true -> using local debug data");
          paymentData = require("../data/paymentPendingdebug.js").payment;
        } else {
          return res.status(400).send("Send a POST with JSON payload or add ?debug=true for dev sample.");
        }
      }
    }

    if (!paymentData) {
      console.warn("No payment data found in request");
      return res.status(400).send("❌ No data found in payload");
    }

    if (isDevEnv()) {
      res.render("templates/paymentPending/p1", {
        details: paymentData, // ✅ matches EJS
      });
    } else {
      res.render("templates/paymentPending/p1", {
        details: paymentData, // ✅ matches EJS
      }, (err, html) => {
        if (err) {
          console.error("❌ EJS Render Error:", err);
          return res.status(500).send("EJS Template Render Failed: " + (err.message || err));
        }
        return res.status(200).send(html);
      });
    }
  } catch (error) {
    console.error("💥 Error in getRegistrationEmail (payment):", error);
    res.status(500).send("Internal Server Error: " + (error.message || ""));
  }
};
