import {Router }from"express";
import { authMiddleware }from "../middleware/auth.middleware";
import { addAlert, listAlerts }from "./watchlist.controller";

const r = Router();
r.post("/", authMiddleware, addAlert);
r.get("/", authMiddleware, listAlerts);

export default r;

