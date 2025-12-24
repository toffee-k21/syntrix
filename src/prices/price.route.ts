import {Router }from"express";
import {QueryCommand }from"@aws-sdk/lib-dynamodb";
import { ddb }from"../db/dynamo";

const r =Router();

r.get("/history",async (req, res) => {
const symbol = req.query.symbolasstring;

const result =await ddb.send(new QueryCommand({
TableName:"MarketPrices",
KeyConditionExpression:"symbol = :s",
ExpressionAttributeValues: {":s":symbol },
ScanIndexForward:true
  }));

  res.json(result.Items || []);
});

export default r;

