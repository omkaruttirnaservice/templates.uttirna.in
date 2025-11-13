// controllers/hallticketController.js
const { isDevEnv } = require("../utility.js");

exports.getHallticket = (req, res) => {
  try {
    console.log("🔍 Current ENV:", process.env.NODE_ENV);
    console.log("HTTP method:", req.method);
    console.log("req.body present?", !!req.body);

    let htDetails;

    if (isDevEnv()) {
      console.log("✅ DEV MODE: Using local hallticket_debug.js data");
      htDetails = require("../data/hallticket_debug.js").htDetails;
    } else {
      console.log("🚀 PROD MODE: Using payload data from request body (POST required)");
      // for POST use body; for GET allow query.debug to render dev sample
      if (req.method === "POST") {
        htDetails = req.body && req.body.payload;
      } else {
        // GET: no body — show helpful message or allow debug query
        if (req.query && req.query.debug === "true") {
          console.log("GET + debug=true -> using local debug data");
          htDetails = require("../data/hallticket_debug.js").htDetails;
        } else {
          return res.status(400).send("Send a POST with JSON payload or add ?debug=true for dev sample.");
        }
      }
    }

    if (!htDetails) {
      console.warn("No htDetails found in request");
      return res.status(400).send("❌ No hallticket data found in payload");
    }

    // Ensure p is an array and pick first element
    const pObj = Array.isArray(htDetails.p) ? htDetails.p[0] : htDetails.p || {};

    // safety: fallback htConfig
    const htConfig = htDetails.htConfig || {
      isShowQR: false,
      isShowAdhaar: false,
      isShowPhoto: true,
      isShowSign: true,
      isShowPastePhoto: false
    };

    // debug logs before render
    console.log("Rendering with:", {
      htExists: !!htDetails.ht,
      caExists: !!htDetails.ca,
      slotExists: !!htDetails.slot,
      pObjExists: !!pObj,
      htConfig
    });

    res.render(
      "templates/ht/t1",
      {
        ht: htDetails.ht,
        ca: htDetails.ca,
        slot: htDetails.slot,
        s3BucketUrl: htDetails.s3BucketUrl,
        rulesList: htDetails.rulesList,
        p: pObj,
        htConfig
      },
      (err, html) => {
        if (err) {
          console.error("❌ EJS Render Error:", err);
          // return the error message to Postman/browser for debugging
          return res.status(500).send("EJS Template Render Failed: " + (err.message || err));
        }
        res.status(200).send(html);
      }
    );
  } catch (error) {
    console.error("💥 Error in getHallticket:", error);
    res.status(500).send("Internal Server Error: " + (error.message || ""));
  }
};
