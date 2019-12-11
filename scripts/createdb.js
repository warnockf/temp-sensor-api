import DynamoDB from 'aws-sdk/clients/dynamodb';
import moment from 'moment';
import uuidv4 from 'uuid/v4';

const dynamoDb = new DynamoDB({ endpoint: 'http://localstack:4000', region: 'us-east-1' });

const bootstrapDynamoDbTable = async () => {
  try {
    await asyncDeleteTable();
    console.log('Successfully deleted table');
  } catch (e) {
    console.log('Failed to delete table', e);
  }

  try {
    await asyncCreateTable();
    console.log('Successfully created table');
  } catch (e) {
    console.log('Failed to create table', e);
  }

  const startTime = moment().subtract(60 * 1000, 'ms');
  for (let i = 0; i < 60; i++) {
    const temp = Number.parseFloat(Math.random() * 2 + 20).toFixed(3);
    const timestamp = startTime.add(i * 1000);
    const putParams = {
      Item: {
        'uuid': {
          S: uuidv4(),
        },
        'timestamp': {
          S: timestamp.valueOf().toString(),
        },
        'temperature': {
          N: temp,
        },
      },
      // ReturnConsumedCapacity: 'TOTAL',
      TableName: 'temperature',
    };

    try {
      await asyncPut(putParams);
    } catch (e) {
      console.log('Failed to put record', e);
      return;
    }
  };

  console.log('Successfully populated table');
};

const asyncPut = async (params) => {
  return new Promise((resolve, reject) => {
    dynamoDb.putItem(params, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const asyncCreateTable = async () => {
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: 'uuid',
        AttributeType: 'S',
      },
      {
        AttributeName: 'timestamp',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'uuid',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'timestamp',
        KeyType: 'RANGE',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    TableName: 'temperature',
  };

  return new Promise((resolve, reject) => {
    dynamoDb.createTable(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const asyncDeleteTable = async () => {
  // TODO: Check if table already exists
  const params = {
    TableName: 'temperature',
  };

  return new Promise((resolve, reject) => {
    dynamoDb.deleteTable(params, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

bootstrapDynamoDbTable();
