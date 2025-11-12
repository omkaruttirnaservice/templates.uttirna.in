// controllers/registrationEmailController.js
const { isDevEnv } = require("../utility.js");

exports.getRegistrationEmail = (req, res) => {
  let emailData;

  if (isDevEnv()) {
    // DEV mode mein local testing data use hoga
    emailData = require("../data/registrationDoneDebug.js");

    console.log("Registration Email Details:", emailData);
    console.log("✅ DEV mode: Using local registrationEmailDebug.js data");
  } else {
    // PROD mode mein request ke payload se data aayega
    emailData = req.body.payload;
    console.log("🚀 PROD mode: Using data from payload");
  }

  // Render EJS template
  if (isDevEnv()) {
    res.render("templates/registrationDone/r1", {
      details: emailData.details,     // Name & credentials
      s3BucketUrl: emailData.s3BucketUrl, // optional (if needed)
    });
  } else {
    res.render("templates/registrationDone/r1", {
      details: emailData.details,     // Name & credentials
      s3BucketUrl: emailData.s3BucketUrl, // optional (if needed)
    }, (err, html) => {
      return res.status(200).send(html);
    });
    // res.render(page, object, cb)
  }
};
