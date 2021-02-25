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

docClient.query(params, function (err, data) {
  if (err) {
    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
  } else {
    console.log("Query succeeded.");
    console.log(data);

    data.Items.forEach((user) => {
      console.log(`${user["UserId"]} score is ${user["TopScore"]}`);
    });
  }
});
