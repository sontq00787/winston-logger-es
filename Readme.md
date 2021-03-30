## Installation

```bash
npm i git_url_to_be_update
```
### Define `.env` variables

```
REGION = aws_region
AWS_ES_ACCESS_KEY_ID = aws_access_key(with elasticsearch service access)
AWS_ES_SECRET_ACCESS_KEY = aws_secret_key(with elasticsearch service access)
AWS_ES_ENDPOINT = https://ElasticSearch_Endpoint
SERVICE_NAME = service_name (for microservice)
LOG_LEVEL = info
```

## Example usage

### Error handle & logger

```javascript
const { ErrorHandler, Logger } = require("");

//for express
app.use(ErrorHandler);

Logger.info("some string");
```
