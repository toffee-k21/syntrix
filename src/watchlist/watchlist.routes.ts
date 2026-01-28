import {Router }from"express";
import { authMiddleware }from "../middleware/auth.middleware";
import { addAlert, listAlerts }from "./watchlist.controller";

const r = Router();
r.post("/add", authMiddleware, addAlert);
r.get("/list", authMiddleware, listAlerts);

export default r;