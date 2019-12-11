import DotEnv from 'dotenv';

DotEnv.config();

const isDevelopment = process.env.NODE_ENV == 'development';

export default {
  dynamodbEndpoint: isDevelopment ? process.env.DYNAMODB_ENDPOINT_DEV : undefined,
  dynamoDbRegion: process.env.DYNAMODB_REGION,
  expressPort: process.env.EXPRESS_PORT,
};
