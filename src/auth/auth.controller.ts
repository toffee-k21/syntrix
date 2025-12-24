import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";
import { ddb } from"../db/dynamo";
import { signToken } from"./jwt";

const USERS = "Users";

export async function signup(req:any,res:any) {
const { email, password } = req.body;
const userId = crypto.randomUUID();

await ddb.send(new PutCommand({
TableName:USERS,
Item: { userId, email, password }
  }));

  res.json({token:signToken({ userId }) });
}

export async function signin(req:any,res:any) {
const { userId, password } = req.body;

const result = await ddb.send(new GetCommand({
TableName:USERS,
Key: { userId }
  }));

if (!result.Item || result.Item.password !== password) {
return res.sendStatus(401);
  }

  res.json({token:signToken({ userId }) });
}

