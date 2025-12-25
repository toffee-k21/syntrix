import {PutCommand} from "@aws-sdk/lib-dynamodb";
import { ddb } from "../db/dynamo";
import { randomUUID } from "crypto";

export async function saveMarketPrice(
    symbol:string,
    price:number
) {
    await ddb.send(new PutCommand({
        TableName:"MarketPrices",
        Item: {
            priceId: randomUUID(),
            symbol,
            timestamp:Date.now(),
            price
        }
  }));
}

