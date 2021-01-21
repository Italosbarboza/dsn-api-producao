const dynamoose = require('dynamoose');
const uuid = require('uuid');

const ddb = new dynamoose.aws.sdk.DynamoDB({
  accessKeyId: 'AKIAZJR6O3IOKOA2ATUW',
  secretAccessKey: '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',
  region: 'us-east-1',
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

// dynamoose.local();
const validationSchema = new dynamoose.Schema(
{
  id: {
    type: String,
    hashKey: true,
    default: uuid.v1(),
  },
  file: {
    type: String,
  },
  hash: {
    type: String,
  },
  motivation:{
    type: String,
  },
  validation: {
    type: String,	
  }
},
{
timestamps: true,
}
);
module.exports = dynamoose.model('validation', validationSchema);