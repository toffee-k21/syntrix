import {Router }from"express";
import { signup, signin }from"./auth.controller";

const r = Router();
r.post("/signup", signup);
r.post("/signin", signin);

export default r;

