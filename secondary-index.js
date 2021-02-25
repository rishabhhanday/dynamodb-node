var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-1",
  endpoint: "http://localhost:8000",
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying on index to get highest score for given game.");

var params = {
  TableName: "GameScores",
  IndexName: "GameTitleIndex",
  KeyConditionExpression: "#gtName = :gtValue",
  ExpressionAttributeNames: {
    "#gtName": "GameTitle",
  },
  ExpressionAttributeValues: {
    ":gtValue": "Football",
  },
};

const query = async () => {
  const data = await docClient.query(params).promise();
  console.log(data);
};

query();
