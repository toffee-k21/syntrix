import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "../db/dynamo";
import { randomUUID } from "crypto";

const TABLE = "Watchlist";

export async function addAlert(req:any,res:any) {
  const { cryptoSymbol, alertPrice } = req.body;

  const watchListId = randomUUID();

  await ddb.send(new PutCommand({
    TableName: TABLE,
    Item: {
      watchListId,
      userId: req.userId,
      cryptoSymbol,
      alertPrice
    }
  }));

  res.json({ success: true });
}

export async function listAlerts(req: any, res: any) {
  try {
    const result = await ddb.send(new QueryCommand({ 
      TableName: "Watchlist", 
      IndexName: "userId-index", 
      KeyConditionExpression: "userId = :u", 
      ExpressionAttributeValues: { ":u": req.userId } }));

    res.json(result.Items || []);
  } catch (err) {
    console.error("listAlerts error:", err);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
}

