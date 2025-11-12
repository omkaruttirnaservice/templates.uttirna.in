// controllers/hallticketController.js
const { isDevEnv } = require("../utility.js");

exports.getHallticket = (req, res) => {
  let htDetails;

  if (isDevEnv()) {
    htDetails = require("../data/hallticket_debug.js").htDetails;
      console.log("Hallticket Details:", htDetails);

    console.log("✅ DEV mode: Using local hallticket_debug.js 1 data");
  } else {
    htDetails = req.body.payload;
    console.log("🚀 PROD mode: Using data from payload");
  }

  if (isDevEnv()) {
    res.render("templates/ht/t1", {
      ht: htDetails.ht,
      ca: htDetails.ca,
      slot: htDetails.slot,
      s3BucketUrl: htDetails.s3BucketUrl,
      rulesList: htDetails.rulesList,
      p: htDetails.p,
      htConfig: htDetails.htConfig  ,
      
    });
  } else {
    res.render("templates/ht/t1", {
      ht: htDetails.ht,
      ca: htDetails.ca,
      slot: htDetails.slot,
      s3BucketUrl: htDetails.s3BucketUrl,
      rulesList: htDetails.rulesList,
      p: htDetails.p,
      htConfig: htDetails.htConfig  ,
    }, (err, html) => {
      return res.status(200).send(html);
    });
    // res.render(page, object, cb)
  }
};
