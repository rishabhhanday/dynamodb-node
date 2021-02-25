var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-1",
  endpoint: "http://localhost:8000",
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "GameScores";
var year = 2015;
var title = "The Big New Movie";

var params = {
  TableName: table,
  Item: {
    UserId: "3",
    GameTitle: "Football",
    TopScore: 495,
  },
};

console.log("Adding a new item...");
docClient.put(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to add item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("Added item:", JSON.stringify(data, null, 2));
  }
});
