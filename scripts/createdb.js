import DynamoDB from 'aws-sdk/clients/dynamodb';

const dynamoDb = new DynamoDB({ endpoint: 'http://localhost:4000', region: 'us-east-1' });

const params = {
  AttributeDefinitions: [
    {
      AttributeName: 'timestamp',
      AttributeType: 'S',
    },
    {
      AttributeName: 'temperature',
      AttributeType: 'S',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'timestamp',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'temperature',
      KeyType: 'RANGE',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  TableName: 'temperature',
};

dynamoDb.createTable(params, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log(`Table created successfully`);
  }
});
