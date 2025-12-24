import express from "express";
import path from "path";

import authRoutes from "./auth/auth.routes";
import watchlistRoutes from "./watchlist/watchlist.routes";
import priceRoutes from "./prices/price.routes";

export const app =express();

app.use(express.json());

app.set("view engine","ejs");
app.set("views", path.join(process.cwd(),"views"));

app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/prices", priceRoutes);

app.get("/",(_, res) => res.render("index", {apiKey : process.env.VELYX_API_KEY!}));

