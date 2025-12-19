import {DynamoDBClient }from"@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient }from"@aws-sdk/lib-dynamodb";

const client =newDynamoDBClient({
region: process.env.AWS_REGION
});

export const ddb = DynamoDBDocumentClient.from(client);

