require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Static assets (CSS, JS, images)
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Set EJS as view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
const hallticketRoutes = require("./routes/hallticketRoutes");
app.use("/api/template", hallticketRoutes);





const registrationEmailRoute = require("./routes/registrationEmailRoute");
app.use("/api/template", registrationEmailRoute);


const interviewCallLetterRoutes = require("./routes/interview-call-letterRoutes");
app.use("/api/template", interviewCallLetterRoutes);

const paymentEmailRoute = require("./routes/paymentEmailRoute");
app.use("/api/template", paymentEmailRoute);

const candidateGuidelinesRoute = require("./routes/candidateGuidelinesRoute");
app.use("/api/template", candidateGuidelinesRoute);

const otpRoute = require("./routes/otpRoute");
app.use("/api/template", otpRoute);

const regSuccessRoute = require("./routes/regSuccessRoute");
app.use("/api/template", regSuccessRoute);

const paymentSuccessRoute = require("./routes/paymentSuccessRoute");
app.use("/api/template", paymentSuccessRoute);

const summaryRoute = require("./routes/summaryRoute");
app.use("/api/template", summaryRoute);

const hallticketLiveRoute = require("./routes/hallticketLiveRoute");
app.use("/api/template", hallticketLiveRoute);



// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
