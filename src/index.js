module.exports = (config) => ({
  ErrorHandler: require("./ErrorHandler"),
  Logger: require("./winston-es")(config),
});
