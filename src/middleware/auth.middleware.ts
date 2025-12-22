import { verifyToken } from "../auth/jwt";

export function auth(req:any,res:any,next:any) {
const token = req.headers.authorization?.split(" ")[1];
if (!token) return res.sendStatus(401);

const decoded:any = verifyToken(token);
  req.userId = decoded.userId;
next();
}

