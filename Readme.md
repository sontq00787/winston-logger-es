## Installation

```bash
npm i sontq00787/winston-logger-es
```

## Example usage

### Error handle & logger

```javascript

const awsConfig = {
    REGION: aws_region,
    AWS_ES_ACCESS_KEY_ID: aws_access_key(with elasticsearch service access),
    AWS_ES_SECRET_ACCESS_KEY: aws_secret_key(with elasticsearch service access),
    AWS_ES_ENDPOINT: 'https://ElasticSearch_Endpoint',
    SERVICE_NAME: service_name (for microservice),
    LOG_LEVEL: info
}

const { ErrorHandler, Logger } = require("winston-logger-es")(awsConfig);

//for express
app.use(ErrorHandler);

Logger.info("some string");
```
