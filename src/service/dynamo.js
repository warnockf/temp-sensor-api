import DynamoDB from 'aws-sdk/clients/dynamodb';

import settings from './settings';

const getParams = (start, end) => ({
  ExpressionAttributeNames: {
    '#TS': 'timestamp',
    '#TMP': 'temperature',
  },
  ProjectionExpression: '#TS, #TMP',
  FilterExpression: '#TS BETWEEN :ts_start AND :ts_end',
  ExpressionAttributeValues: {
    ':ts_start': {
      'S': start,
    },
    ':ts_end': {
      'S': end,
    },
  },
  TableName: 'temperature',
});

const dynamoDb = new DynamoDB({ endpoint: settings.dynamodbEndpoint, region: settings.dynamoDbRegion });
const dynamoService = () => {
  return {
    get: (startTime, endTime) => new Promise((resolve, reject) => {
      // TODO: check param types, should be moment objects
      const start = startTime.valueOf().toString();
      const end = endTime.valueOf().toString();
      dynamoDb.scan(getParams(start, end), (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),
  };
};

export default dynamoService;
