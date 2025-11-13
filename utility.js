
exports.isDevEnv = () =>
  process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development";
