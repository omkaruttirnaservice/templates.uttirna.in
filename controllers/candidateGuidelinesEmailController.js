// controllers/candidateGuidelinesEmailController.js
const { isDevEnv } = require("../env");

exports.getCandidateGuidelinesEmail = (req, res) => {
  let letterData;

  if (isDevEnv()) {
    // DEV MODE → Use local debug data
    letterData = require("../data/candidateGuidelinesdebug.js").candidateGuidelines;
    console.log("✅ DEV mode: Using candidateGuidelinesdebug.js data");
  } else {
    // PROD MODE → Use payload data
    letterData = req.body.payload;
    console.log("🚀 PROD mode: Using data from payload");
  }

  // Render EJS
  res.render("templates/candidate-guidelines/c1", {
    details: letterData.details,
    config: letterData.config,
  });
};
