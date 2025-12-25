import {PutCommand} from "@aws-sdk/lib-dynamodb";
import { ddb } from "../db/dynamo";

export async function saveMarketPrice(
    symbol:string,
    price:number
) {
    await ddb.send(new PutCommand({
        TableName:"MarketPrices",
        Item: {
            priceId: symbol,
            symbol,
            timestamp:Date.now(),
            price
        }
  }));
}

