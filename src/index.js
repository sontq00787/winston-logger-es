module.exports = (config) => ({
  ErrorHandler: require("./ErrorHandler"),
  Logger: require("./winton-es")(config),
});
