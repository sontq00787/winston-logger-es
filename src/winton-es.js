const winston = require("winston");
const { ElasticsearchTransport } = require("winston-elasticsearch");

var AWS = require("aws-sdk");
const { Client } = require("@elastic/elasticsearch");

const createAwsElasticsearchConnector = require("aws-elasticsearch-connector");

/**
 *
 * @param {JSON} awsConfig
 * @returns {winston.Logger}
 */
module.exports = (awsConfig) => {
  const logger = new winston.createLogger({
    transports: [
      new winston.transports.Console({
        timestamp: true,
        colorize: true,
      }),
    ],

    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.json()
    ),
  });

  logger.level = process.env.LOG_LEVEL || "info";

  if (process.env.NODE_ENV.toLowerCase() === "development") return logger;

  const config = new AWS.Config({
    region: awsConfig.REGION,
    accessKeyId: awsConfig.AWS_ES_ACCESS_KEY_ID,
    secretAccessKey: awsConfig.AWS_ES_SECRET_ACCESS_KEY,
  });

  const client = new Client({
    ...createAwsElasticsearchConnector(config),
    node: awsConfig.AWS_ES_ENDPOINT || "http://localhost:9200",
  });

  // client.on("response", (err, res) => {
  //   if (err) {
  //     console.error("Error:", err);
  //   } else {
  //     console.log("Request:", res.meta.request);
  //     console.log("Response:", res.statusCode, res.body);
  //   }
  // });

  const esTransportOpts = {
    level: "info",
    client: client,
    source: awsConfig.SERVICE_NAME || "SERVICE_NAME_NOT_SET",
  };

  const esTransport = new ElasticsearchTransport(esTransportOpts);

  if (process.env.NODE_ENV.toLowerCase() !== "development")
    logger.add(esTransport, config);

  // error
  logger.on("error", (error) => {
    console.error("Error caught", error);
  });

  esTransport.on("warning", (error) => {
    console.error("Error/WARNING caught", error);
  });

  return logger;
};
