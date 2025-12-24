import { fetchPrices }from"../services/coingecko";
import { saveMarketPrice }from"../services/marketPriceStore";
import { publishPriceEvent, publishUserAlertEvent }from"../services/publisher";
import {QueryCommand }from"@aws-sdk/lib-dynamodb";
import { ddb }from"../db/dynamo";

const WATCHLIST ="Watchlist";

async function poll() {
  const prices:Record<string, number> = await fetchPrices();
  const timestamp = Date.now();

  for (const symbol of Object.keys(prices)) {
    const price = prices[symbol];

    // 1. Save historical price
    await saveMarketPrice(symbol, price);

    // 2. Publish real-time price
    await publishPriceEvent({
      symbol,
      price,
      timestamp
    });

    // 3. Evaluate alerts
    const alerts =await ddb.send(new QueryCommand({
      TableName:WATCHLIST,
      IndexName:"cryptoSymbol-index",
      KeyConditionExpression:"cryptoSymbol = :s",
      ExpressionAttributeValues: {":s":symbol}
    }));

    for (const alert of alerts.Items || []) {
      if (price >= alert.alertPrice) {
        await publishUserAlertEvent(alert.userId, {
        symbol,
        threshold: alert.alertPrice, price, timestamp});
      }
    }
  }
}

poll();
setInterval(poll, 5000);