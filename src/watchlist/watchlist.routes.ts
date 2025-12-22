import {Router }from"express";
import { auth }from "../middleware/auth.middleware";
import { addAlert, listAlerts }from "./watchlist.controller";

const r = Router();
r.post("/", auth, addAlert);
r.get("/", auth, listAlerts);

export default r;

