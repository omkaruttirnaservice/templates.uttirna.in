require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan");

const { ApiResponseV2, infoLog, globalResponseLogger } = require("./utility");

const app = express();

const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: message => {
        const parts = message.trim().split(" ");

        const logObject = {
          method: parts[0],
          url: parts[1],
          status: parts[2],
          responseTime: parts[3],
        };

        infoLog(logObject);
      },
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.use(globalResponseLogger);


app.use("/assets", express.static(path.join(__dirname, "public/assets")));


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


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

const applicationPrintRoute = require("./routes/applicationPrintRoute");
app.use("/api/template", applicationPrintRoute);

const summaryRoute = require("./routes/summaryRoute");
app.use("/api/template", summaryRoute);

const hallticketLiveRoute = require("./routes/hallticketLiveRoute");
app.use("/api/template", hallticketLiveRoute);


app.get('/api/health', (_, res) => {
  return res.status(200).send("server is up and running...");
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
