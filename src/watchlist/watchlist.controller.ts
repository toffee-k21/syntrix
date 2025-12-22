import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "../db/dynamo";

const TABLE = "Watchlist";

export async function addAlert(req:any,res:any) {
const { cryptoSymbol, alertPrice } = req.body;

await ddb.send(new PutCommand({
TableName:TABLE,
Item: {
userId: req.userId,
      cryptoSymbol,
      alertPrice
    }
  }));

  res.json({success:true });
}

export async function listAlerts(req:any,res:any) {
const result = await ddb.send(new QueryCommand({
TableName:TABLE,
KeyConditionExpression:"userId = :u",
ExpressionAttributeValues: {":u": req.userId }
  }));

  res.json(result.Items || []);
}

