// ----------------------------------------------------
// SIMPLE LOGGER FUNCTION
// ----------------------------------------------------
exports.infoLog = (logObject) => {
  console.log("📌 LOG:", JSON.stringify(logObject, null, 2));
};

// ----------------------------------------------------
// ENVIRONMENT CHECK
// ----------------------------------------------------
exports.isDevEnv = () =>
  process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development";


// ----------------------------------------------------
// STANDARD API RESPONSE CLASS
// ----------------------------------------------------
exports.ApiResponseV2 = class ApiResponseV2 {
  /**
   * @param {number} statusCode
   * @param {string} usrMsg
   * @param {Object|null} data
   */
  constructor(statusCode, usrMsg, data = null) {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.usrMsg = usrMsg;
    this.data = data ?? "";
  }
};


// ----------------------------------------------------
// GLOBAL JSON RESPONSE LOGGER
// Intercepts all res.json()
// ----------------------------------------------------
exports.globalResponseLogger = (req, res, next) => {
  const originalJson = res.json;

  res.json = function (data) {
    try {
      if (data && typeof data === "object") {
        exports.infoLog({
          method: req.method,
          url: req.originalUrl,
          status: res.statusCode,
          apiResponse: data,
        });
      }
    } catch (err) {
      console.error("Response logging failed:", err);
    }

    return originalJson.call(this, data);
  };

  next();
};
